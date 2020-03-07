import React, { Component, createRef } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchQuestions, setLoading, searchQuestions, resetSearchResult, setSearchTerm } from '../actions'
import QuestionBoard from '../components/QuestionBoard'
import SearchBar from '../components/SearchBar'
import '../styles/PatientBoard.css'
import AddQuestionForm from '../containers/AddQuestionForm'


import {
  Grid,
  Header,
  Image,
  Rail,
  Ref,
  Segment,
  Sticky,
  Item,
  Search
} from 'semantic-ui-react'

class PatientBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchQuestions())
  }

  handleResultSelect = (e, {result}) => {
    const { dispatch } = this.props
    dispatch(setSearchTerm(result.title))
  }
  handleSearchChange = (e, { value }) => {
    const { dispatch } = this.props

  dispatch(setLoading(false))
  dispatch(setSearchTerm(value))
  setTimeout(() => {
    if (this.props.searchTerm.length < 1) return dispatch(resetSearchResult())
    dispatch(searchQuestions(this.props.questions, this.props.searchTerm))

  }, 300)
}
contextRef = createRef()

  render() {
    return (
<div className='containerDiv'>
<Grid centered columns={2} stackable>
   <Grid.Column>
     <Ref innerRef={this.contextRef}>
       <div>
       <Sticky context={this.contextRef}>
       <div className='sticky-top'>
         <SearchBar
         isLoading={this.props.isLoading}
         results={this.props.results}
         value={this.props.searchTerm}
         handleResultSelect={this.handleResultSelect}
         handleSearchChange={this.handleSearchChange}/>
         <AddQuestionForm/>
         </div>
         </Sticky>
       <QuestionBoard
         results={this.props.results}
       />

       <Rail position='left'>
         <Sticky context={this.contextRef}>
           <Item.Group divided>
             {_.times(12, (i) => (
               <Item key={i}>

                 <Item.Content>
                   <Item.Header as='a'>Docter Algorithm</Item.Header>
                   <Item.Meta>Links</Item.Meta>
                 </Item.Content>
               </Item>
             ))}
           </Item.Group>
         </Sticky>
       </Rail>

       </div>
     </Ref>
   </Grid.Column>
 </Grid>
 </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    ...state.questionBoard
  }
}

export default connect(mapStateToProps)(PatientBoard)
