import _ from 'lodash'
import React, { Component } from 'react'
import AddQuestion from '../containers/AddQuestion'
import AnswerItem from '../components/AnswerItem'
import CardLeftPanel from '../components/CardLeftPanel'
import SearchBar from '../components/SearchBar'

import { Card, Grid, Segment, List, Search } from 'semantic-ui-react'
import '../styles/QuestionBoard.css'


const colors = ['red', 'orange', 'yellow']
export default class QuestionBoard extends Component {

  render() {
    const {results, isLoading, searchTerm} = this.props
    console.log(this.props)
    return (
      <div className="container">
          <SearchBar
          isLoading={isLoading}
          results={results}
          value={searchTerm}
          handleResultSelect={this.props.handleResultSelect}
          handleSearchChange={this.props.handleSearchChange}/>
          <Card.Group>
        {
          results.map( (question, i) => {
            const idx = (i + 1) % colors.length;
            return (
            <Card fluid color={colors[idx]} className="qCard" key={i}>
              <Grid columns='equal' stackable>
                <Grid.Row>
                <Grid.Column width={7}>
                  <CardLeftPanel title={question.title} tags={question.tags} questionNumber={i}/>
                  </Grid.Column>
                  <Grid.Column width={9}>
                  <List>

                    {question.answers.map( (answer, idx) => {
                      return <AnswerItem answer={answer} key={idx}/>
                    })}
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card>
          )
            })
          }
        </Card.Group>
      </div>
    )
  }
}
