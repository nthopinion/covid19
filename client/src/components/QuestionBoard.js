import _ from 'lodash'
import React, { Component } from 'react'
import AnswerItem from '../components/AnswerItem'
import CardLeftPanel from '../components/CardLeftPanel'

import { Card, Grid, Segment, List, Search, Image, Label, Button, Icon } from 'semantic-ui-react'
import '../styles/QuestionBoard.css'
import config from '../config'


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
            <Card fluid color={colors[idx]} className="qCard" key={i} id={'q_'+question.id}>
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

                {question.youtubeLinks && question.youtubeLinks.map((y,idx) => {
                  const videoSrc = "https://www.youtube.com/embed/" +
                   (y.video || 'mYFaghHyMKc')+ "?autoplay=false";
                  return (
                    <iframe className="player" type="text/html" width="100%" height="400px"
                    src={videoSrc}
                    frameborder="0"/>)

                })

              }
              <div className='qPanelBottom'>
              <div className='qTag' >

                {question.tags && question.tags.map((tag, i) => {
                  return <Label color='blue' key={i}>
                    {tag}
                    </Label>
                })}
                </div>

                <div>
                {/*<a color='facebook' href="https://twitter.com/intent/tweet?text=My%20aura%20is%20blue.%20Discover%20your%20aura%20at%20http://www.carolynmcneillie.com/colours%20pic.twitter.com/E3SdsiIqPr%20@carolynalive" target="_blank">
                <Icon name='facebook'></Icon>

                </a>*/}
                <a color='twitter'
                href={`https://twitter.com/intent/tweet?text=${question.title}%20answer:%20${question.answers && question.answers[0].split(" ").slice(0,10).join(' ')}...%20at%20${config.domainURL+'%23q_'+question.id}%20https://twitter.com/TheNthOpinion`}  target="_blank">
                <Icon name='twitter'></Icon>

                </a>

                </div>
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
