// @ts-check

//import { v4 as uuidv4 } from 'uuid';

const CosmosClient = require('@azure/cosmos').CosmosClient
const debug = require('debug')('questionList:questionDao')
const uuid = require("uuid");

// For simplicity we'll set a constant partition key
const partitionKey = '0'
class PostDao {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} questionContainerId
   * @param {string} answerContainerId
   */
  constructor (cosmosClient, databaseId, questionContainerId, answerContainerId) {
    this.client = cosmosClient
    this.databaseId = databaseId
    this.collections = {
      questionContainerId: questionContainerId,
      answerContainerId: answerContainerId
    }

    this.database = null
    this.containers = {}
  }

  async init () {
    debug('Setting up the database...')
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    })
    this.database = dbResponse.database
    debug('Setting up the database...done!')
    debug('Setting up the container...')
    const qResponse = await this.database.containers.createIfNotExists({
      id: this.collections.questionContainerId
    })
    this.containers.questions = qResponse.container
    const aResponse = await this.database.containers.createIfNotExists({
      id: this.collections.answerContainerId
    })
    this.containers.answers = aResponse.container
    debug('Setting up the container...done!')
  }

  async find (querySpec, containerName) {
    debug('Querying for items from the database')
    const container = this.containers[containerName]
    if (!container) {
      throw new Error('Collection is not initialized.')
    }
    const { resources } = await container.items.query(querySpec).fetchAll()
    //console.log(resources)
    return resources
  }

  async addItem (item, containerName) {
    debug('Adding an item to the database')
    const container = this.containers[containerName]
    item.date = Date.now()
    console.log(JSON.stringify(item))
    if (item.id === undefined || item.id === "") {
      item.id = uuidv4();
    }
    const { resource: doc } = await container.items.create(item)
    return doc
  }

  async addItems (items, containerName) {
    debug('Adding an item to the database')
    const container = this.containers[containerName]
    Promise.all(items.map(async (item) => {
      item.date = Date.now()
      item.answered = !!(item.answers)
      const { resource: doc } = await container.items.create(item)
    }))
    return 'ok'
  }

  async updateItem (item, containerName) {
    debug('Update an item in the database', item, item.id)
    const container = this.containers[containerName]
    const doc = await this.getItem(item.id)
    debug('getting an item in the database', doc)

    const { resource: replaced } = await container
      .item(item.id)
      .replace(doc)
    return replaced
  }

  async addAnswer (item) {
    debug('Update an item in the database with new answer', item, item.id)
    const querySpec = `select * from c where c.id = '${item.questionId}'`
    const [ question ] = await this.find(querySpec, 'questions')
    if (!question.answered) {
      question.answered = !!(item)
    }
    question.answers.push(item.id)
    const { resource: replaced } = await this.containers.questions
      .item(question.id)
      .replace(question)
    const result = await this.addItem(item, 'answers')
    debug('result', result)
    return {question: replaced, answer: result}
  }

  async editAnswer (item) {
    debug('Update an item in the database', item, item.id)
    const { resource: replaced } = await this.containers.answers
      .item(item.id)
      .replace(item)
    return replaced
  }

  async reportQuestion (itemId) {
    debug('likeIncrease an item in the database', itemId)
    const doc = await this.getItem(itemId)
    debug('likeIncrease an item in the database', doc)

    doc.flagIssue = (doc.flagIssue || 0) + 1

    const { resource: replaced } = await this.containers.questions
      .item(itemId)
      .replace(doc)
    return replaced
  }

  async updateLike (itemId, containerName) {
    debug('updateLike an item in the database', itemId)
    const container = this.containers[containerName]
    const doc = await this.getItem(itemId)
    debug('updateLike an item in the database', doc)

    doc.like = (doc.like || 0) + 1

    const { resource: replaced } = await container
      .item(itemId)
      .replace(doc)
    return replaced
  }

  // this doesn't work for me when trying to retrieve questions by id with the new container setup.
  async getItem (itemId, containerName) {
    debug('Getting an item from the database')
    const container = this.containers[containerName]
    const resp = await container.item(itemId).read()
    console.log(resp)
    return resp
  }

  async deleteItem (itemId, containerName) {
    debug('Delete an item from the database', itemId)
    const container = this.containers[containerName]
    const doc = await this.getItem(itemId)
    const result = await container.item(itemId).delete()
    console.log(result)
    return result
  }
}

module.exports = PostDao
