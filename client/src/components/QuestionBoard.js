import _ from 'lodash'
import React, { Component } from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import AnswerItem from '../components/AnswerItem'
import CardLeftPanel from '../components/CardLeftPanel'


import { Modal, Card, Grid, Segment, List, Search, Image, Label, Button, Icon, Message } from 'semantic-ui-react'
import '../styles/QuestionBoard.css'
import config from '../config'

const colors = ['red', 'orange', 'yellow']
export default class QuestionBoard extends Component {
  constructor(props) {
    super(props)
    this.state={open: false, reportQuestion: null}

  }
  handleReportIssue (q) {
    this.setState({open: true, reportQuestion: q})
  }
  async handleSubmitReportIssue () {
    await this.reportQuestionFlag(this.state.reportQuestion)
    this.setState({open: false, reportQuestion: null})
  }

  reportQuestionFlag = (question) => {
      return fetch(`${config.domainURL}/api/question/report`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({id: question.id})
       })
       .then(response => console.log(response))
       .catch(error => console.log(error))
    }

  close = () => this.setState({ open: false })

  render () {
    const { results, isLoading, searchTerm } = this.props
    console.log(this.props)
    return (
      <div className='container'>

        <Card.Group>
          {
            results.map((question, i) => {
              if (!question.answers) return
              const idx = (i + 1) % colors.length
              return (
                <Card fluid color={colors[idx]} className='qCard' key={i} id={'q_' + question.id}>
                  <CardLeftPanel  title={question.title} questionNumber={i} />

                  <List>

                    {question.answers.map((answer, index) => {
                      return <AnswerItem answer={answer} key={index} />
                    })}

                    {question.images && question.images.map((image, index) =>
                      <Image src={image} key={index} fluid className='answer-image' />

                    )}

                    {question.links && question.links.map((link, index) =>
                      <List.Item key={index}>
                        <List.Icon name='linkify' />
                        <List.Content>
                        { link && <ReactTinyLink cardSize="small" showGraphic={true} maxLine={2} minLine={1} url={link} /> }
                        </List.Content>
                      </List.Item>
                    )}
                    {question.sources && question.sources.map((source, index) =>
                      <List.Item key={index}>
                        <List.Icon name='linkify' />
                        <List.Content>
                          { source && <ReactTinyLink cardSize="small" showGraphic={true} maxLine={2} minLine={1} url={source} /> }
                        </List.Content>
                      </List.Item>
                    )}
                  </List>

                  {question.youtubeLinks && question.youtubeLinks.map((y, index) => {
                    const videoSrc = 'https://www.youtube.com/embed/' +
                   (y.video) + '?autoplay=false'
                    return y.video && (
                      <iframe
                        className='player' type='text/html' width='100%' height='400px'
                        src={videoSrc}
                        key={index}
                        frameborder='0'
                      />)
                  })}
                  <div className='qPanelBottom'>
                    <div className='qTag'>

                      {question.tags && question.tags.map((tag, index) => {
                        return <Label color='blue' key={index}>
                          {tag}
                        </Label>
                      })}
                    </div>

                    <div>
                      {/* <a color='facebook' href="https://twitter.com/intent/tweet?text=My%20aura%20is%20blue.%20Discover%20your%20aura%20at%20http://www.carolynmcneillie.com/colours%20pic.twitter.com/E3SdsiIqPr%20@carolynalive" target="_blank">
                <Icon name='facebook'></Icon>

                </a> */}
                      <div>

                        <Button as='div' labelPosition='right'>
                          <Button color='red' onClick={() => this.props.handleClickLike(question.id, i)}>
                            <Icon name='heart' />
                        Like
                          </Button>
                          <Label as='a' basic color='red' pointing='left'>
                            {question.like || 0}
                          </Label>
                        </Button>
                        <Button animated='vertical' color='twitter'>
                          <a
                            style={{ color: 'white' }}
                            href={`https://twitter.com/intent/tweet?text=${question.title}%20Answer:%20${question.answers &&question.answers.length > 0 && question.answers[0].split(' ').slice(0, 10).join(' ')}...%20at%20${config.domainURL + '?qid=' + question.id}%20@thenthopinion`}
                            target='_blank'
                          >

                            <Button.Content visible>

                              <Icon name='twitter' /> Tweet

                            </Button.Content>

                          </a>
                        </Button>
                        <Button icon='flag' color='red' basic title='report an issue' onClick={() => this.handleReportIssue(question)} />

                      </div>

                    </div>
                  </div>

                </Card>
              )
            })
          }
        </Card.Group>
        <Modal
          open={this.state.open}
          onClose={this.close}
        >
          <Modal.Header>Are you sure you want to report this question?</Modal.Header>
          <Modal.Content>
              <p>{this.state.reportQuestion?.title}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={() => this.handleSubmitReportIssue()}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
