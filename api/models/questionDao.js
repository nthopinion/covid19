// @ts-check


const CosmosClient = require('@azure/cosmos').CosmosClient
const debug = require('debug')('questionList:questionDao')
var uuid = require("express");

// For simplicity we'll set a constant partition key
const partitionKey = '0'
class PostDao {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} questionContainerId
   * @param {string} answerContainerId
   * @param {string} userContainerId
   */
  constructor (cosmosClient, databaseId, questionContainerId, answerContainerId, userContainerId) {
    this.client = cosmosClient
    this.databaseId = databaseId
    this.collections = {
      questionContainerId: questionContainerId,
      answerContainerId: answerContainerId,
      userContainerId: userContainerId
    }
    this.containerIds = {
      questionContainerId: questionContainerId,
      answerContainerId: answerContainerId,
      userContainerId: userContainerId
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
    this.containers.users = qResponse.container
    const uResponse = await this.database.containers.createIfNotExists({
      id: this.collections.userContainerId
    })
    this.containers.users = uResponse.container
    debug('Setting up the container...done!')
  }

  async changeQnAcontainer(language){
      if (language === 'English')
      {
        this.collections.questionContainerId = this.containerIds.questionContainerId
        this.collections.answerContainerId = this.containerIds.answerContainerId
      }
      else {
        this.collections.questionContainerId = this.containerIds.questionContainerId + "_" + language
        this.collections.answerContainerId = this.containerIds.answerContainerId + "_" + language
      }
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
      return 'ok'
  }


  async find (querySpec, containerName) {
    debug('Querying for items from the database')
    const container = this.containers[containerName]
    if (!container) {
      throw new Error('Collection is not initialized.')
    }
    const { resources } = await container.items.query(querySpec).fetchAll()
    
    return resources
  }

  async addItem (item, containerName) {
    debug('Adding an item to the database')
    const container = this.containers[containerName]
    var date = new Date();
    var timestamp = Math.floor(date.getTime()/1000.0);
    item.date = timestamp;
    console.log(JSON.stringify(item))
    const uuid = require("uuid");
    item.id = uuid.v4();
/*     if (item.id === undefined || item.id === "") {
      item.id = uuid4();
    } */
    const { resource: doc } = await container.items.create(item, item.id)

    return doc
  }

  async addItems (items, containerName) {
    debug('Adding an item to the database')
    const container = this.containers[containerName]
    var date = new Date();
    var timestamp = Math.floor(date.getTime()/1000.0);

    Promise.all(items.map(async (item) => {
      item.date = timestamp
      item.answered = !!(item.answers)
      const { resource: doc } = await container.items.create(item)
    }))
    return 'ok'
  }

  async updateQuestion (item, containerName) {
    debug('Update an item in the database', item, item.id)
    const container = this.containers[containerName]
    const doc = await this.getItem(item.id, containerName)
    doc.title = item.title;
    if (item.like !== undefined){
      doc.like = item.like;
    }
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
    item.like = 0;
    item.flag = 0;
    item.deleted = false;
    const result = await this.addItem(item, 'answers')
    debug('result', result)
    question.answers.push(result.id)
    const { resource: replaced } = await this.containers.questions
      .item(question.id)
      .replace(question)
    return {question: replaced, answer: result}
  }

  async editAnswer (item) {
    debug('Update an item in the database', item, item.id)
    const { resource: replaced } = await this.containers.answers
      .item(item.id)
      .replace(item)
    return replaced
  }

/*   async reportQuestion (itemId) {
    debug('likeIncrease an item in the database', itemId)
    const doc = await this.getItem(itemId, 'questions')
    debug('likeIncrease an item in the database', doc)

    doc.flagIssue = (doc.flagIssue || 0) + 1

    const { resource: replaced } = await this.containers.questions
      .item(itemId)
      .replace(doc)
    return replaced
  } */

  async updateLike (itemId, containerName) {
    debug('updateLike an item in the database', itemId)
    const container = this.containers[containerName]
    const doc = await this.getItem(itemId, containerName)
    debug('updateLike an item in the database', doc)

    doc.like = (doc.like || 0) + 1

    const { resource: replaced } = await container
      .item(itemId)
      .replace(doc)
    return replaced
  }

  async reportAnswer (itemId, containerName) {
    debug('reportAnswer an item in the database', itemId)
    const container = this.containers[containerName]
    const doc = await this.getItem(itemId, containerName)
    debug('reportAnswer an item in the database', doc)

    doc.flag = (doc.flag || 0) + 1

    const { resource: replaced } = await container
      .item(itemId)
      .replace(doc)
    return replaced
  }
 
  async deleteAnswer (itemId, containerName) {
    debug('deleteAnswer an item in the database', itemId)
    const container = this.containers[containerName]
    const doc = await this.getItem(itemId, containerName)
    debug('deleteAnswer an item in the database', doc)

    doc.deleted = true;
    const { resource: replaced } = await container
      .item(itemId)
      .replace(doc)
    return replaced
  }
 
  async getItem (itemId, containerName) 
  {
    debug('Getting an item from the database')
    const querySpec = {
      query: "SELECT * from c WHERE c.id = @id",
      parameters: [
        {
          name: '@id',
          value: itemId
        }
      ]
    };
    const results = await this.find(querySpec, containerName);
    const item =  results[0];
    return item
  }

  // this doesn't work for me when trying to retrieve questions by id with the new container setup.
/*  async getItem (itemId, partitionId, containerName) {
    debug('Getting an item from the database')
    const container = this.containers[containerName]
    //const resp = await container.item(itemId).read()
    const resp = await container.item(itemId, partitionId).read();
    console.log(resp)
    return resp
  } */

  async deleteItem (itemId, containerName) {
    debug('Delete an item from the database', itemId)
    const container = this.containers[containerName]
    const doc = await this.getItem(itemId, containerName)
    const answers = await this.deleteAnswersfortheQuestion(itemId, "answers")
    const result = await container.item(itemId, itemId).delete()
    console.log(result)
    return result
  }

  async deleteAnswersfortheQuestion (questionId, containerName) {
    debug('Getting answers from the database')
    const querySpec = {
      query: "SELECT * from c WHERE c.questionId= @questionId",
      parameters: [
        {
          name: '@questionId',
          value: questionId
        }
      ]
    };
    const results = await this.find(querySpec, containerName);
    const container = this.containers[containerName];
    //results.array.forEach(answer => {
    for (const answer of results){  
      debug('Delete an item from the database', answer.id)
      const result = await container.item(answer.id, questionId).delete()
      console.log(result)
    }
    return results
  }

  async addUser (user) {
    debug('Adding a user to the database')
    const container = this.containers["users"]
    const uuid = require("uuid");
    user.id = uuid.v4();
    const { resource: doc } = await container.items.create(user);

    return doc
  }

  async editUser (user) {
    debug('Update a user in the database', user, user.id)
    const doc = await this.getItem(user.id, "users");
    doc.npiidentifier = user.xnpiidentifier;
    doc.role = user.role;
    doc.country = user.country;
    doc.profilelink = user.profilelink;
    doc.anonymous = user.anonymous;
    doc.profilestatus = "level 0";
    if (user.role.toLowerCase() !== "other")
    {
      user.profilestatus = "level 1";
    }    
    doc.email = user.email;
    const { resource: replaced } = await this.containers.users
      .item(doc.id)
      .replace(doc)
    return replaced
  }

  async deleteUser (userId) {
    debug('Delete an item from the database', userId);
    const container = this.containers["users"];
    const result = await container.item(userId).delete();
    console.log(result);
    return result
  }

  async getUser (email) 
  {
    debug('Getting the user from the database')
    const querySpec = {
      query: "SELECT * from c WHERE c.email = @email",
      parameters: [
        {
          name: '@email',
          value: email
        }
      ]
    };
    const results = await this.find(querySpec, "users");
    var user =  undefined;
    if (results[0] !== undefined)
    {
      user =  results[0];
    }
    return user
  }

  async updatesignintime (user) {
    debug('Update a user in the database', user, user.id)
    const { resource: replaced } = await this.containers.users
      .item(user.id)
      .replace(user)
    return replaced
  }
    
}

module.exports = PostDao
