import _ from 'lodash'
import React, { Component } from 'react'
import AddQuestion from '../containers/AddQuestion'
import AnswerItem from '../components/AnswerItem'
import CardLeftPanel from '../components/CardLeftPanel'
import SearchBar from '../components/SearchBar'

import { Card, Grid, Segment, List, Search } from 'semantic-ui-react'
import '../styles/QuestionBoard.css'


//toDo: need to be replaced to redux
import questions from '../data/questions'
const colors = ['red', 'orange', 'yellow']
const initialState = { isLoading: false, results: questions, value: '' }
export default class QuestionBoard extends Component {
    state = initialState
    handleResultSelect = (e, { result }) => this.setState({ value: result.title })
    handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(questions, isMatch),
      })
    }, 300)
  }

  render() {
    const {results} = this.state
    return (
      <div className="container">
          <SearchBar {...this.state} handleResultSelect={this.handleResultSelect} handleSearchChange={this.handleSearchChange}/>
          <Card.Group>
        {
          results.map( (question, i) => {
            const idx = (i + 1) % colors.length;
            return (
            <Card fluid color={colors[idx]} className="qCard">
              <Grid columns='equal' stackable>
                <Grid.Row>
                <Grid.Column width={7}>
                  <CardLeftPanel title={question.title} tags={question.tags} questionNumber={i}/>
                  </Grid.Column>
                  <Grid.Column width={9}>
                  <List>

                    {question.answers.map( answer => {
                      return <AnswerItem answer={answer}/>
                    })}
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>)
            })
          }
        </Card.Group>
      </div>
    )
  }
}
