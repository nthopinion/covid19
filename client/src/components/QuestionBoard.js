import _ from 'lodash'
import React, { Component } from 'react'
import AnswerItem from '../components/AnswerItem'
import CardLeftPanel from '../components/CardLeftPanel'

import { Card, Grid, Segment, List, Search, Image, Label } from 'semantic-ui-react'
import '../styles/QuestionBoard.css'


const colors = ['red', 'orange', 'yellow']
export default class QuestionBoard extends Component {

  render() {
    const {results, isLoading, searchTerm} = this.props
    console.log(this.props)
    return (
      <div className="container">

          <Card.Group>
        {
          results.map( (question, i) => {
            if(!question.answers) return;
            const idx = (i + 1) % colors.length;
            return (
            <Card fluid color={colors[idx]} className="qCard" key={i}>
            <CardLeftPanel title={question.title} questionNumber={i}/>

            <List>

              {question.answers.map( (answer, idx) => {
                return <AnswerItem answer={answer} key={idx}/>
              })}

              {question.images && question.images.map((image,idx) =>
                <Image src={image} key={idx} fluid className='answer-image'/>

              )}

              {question.links && question.links.map((link,idx) =>
                <List.Item>
                  <List.Icon name='linkify' />
                  <List.Content>
                    <a href={link.url}>{link.title} other resources</a>
                  </List.Content>
                </List.Item>
              )}
              </List>
              <div className='qTag'>
                {question.tags && question.tags.map((tag, i) => {
                  return <Label color='blue' key={i}>
                    {tag}
                    </Label>
                })}
              </div>
            </Card>
          )
            })
          }
        </Card.Group>
      </div>
    )
  }
}
