import React, { Component, createRef } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Ref } from "semantic-ui-react";

import {
  fetchQuestions,
  setLoading,
  searchQuestions,
  resetSearchResult,
  setSearchTerm,
  postQuestion,
  clickLikeQuestion
} from "../actions";

import "../styles/PatientBoard.css";
import QuestionBoard from "../components/QuestionBoard";
import StickyHeader from "../components/StickyHeader";

class PatientBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processSumited: false
    };
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }
  handleClickLike = (id, index) => {
    this.props.clickLikeQuestion(id, index);
  };
  handleResultSelect = (e, { result }) => {
    this.props.searchQuestions(this.props.questions, result.title);
  };
  handleSearchChange = (e, { value }) => {
    this.props.setLoading(false);
    console.log(value);
    this.props.setSearchTerm(value);

    setTimeout(() => {
      if (this.props.searchTerm && this.props.searchTerm.length < 1) {
        this.props.resetSearchResult();
      }
      this.props.searchQuestions(this.props.questions, this.props.searchTerm);
    }, 500);

    // submit question
    if (this.props.results.length != 0) return;
    // var self = this
    if (
      this.props.searchTerm &&
      this.state.prevSearchTerm !== this.props.searchTerm &&
      this.props.searchTerm.length > 10
    ) {
      console.log("handleSubmitNewQuestion");
      // _.throttle(this.handleSubmitNewQuestion, 1000)()
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.handleSubmitNewQuestion();
      }, 1000);
    }
  };
  handleSubmitNewQuestion = () => {
    console.log("handleSubmitNewQuestion -- inner");

    const { dispatch } = this.props;
    this.props.postQuestion(this.props.searchTerm);

    this.setState({ prevSearchTerm: this.props.searchTerm });
    // dispatch(resetSearchResult());
    // dispatch(searchQuestions(this.props.questions, this.props.searchTerm))
  };
  contextRef = createRef();

  render() {
    return (
      <>
        <StickyHeader
          contextRef={this.contextRef}
          isLoading={this.props.isLoading}
          results={this.props.results}
          searchTerm={this.props.searchTerm}
          handleResultSelect={this.handleResultSelect}
          handleSearchChange={this.handleSearchChange}
          addSuccess={this.props.addSuccess}
          messageActive={this.props.messageActive}
          newQ={this.props.newQ}
        />
        <div className="containerDiv">
          <Grid centered columns={2} stackable>
            <Grid.Column>
              {/*    <Rail position='left'>
           <Sticky context={this.contextRef}>
           <MailForm/>
           </Sticky>
         </Rail> */}
              <Ref innerRef={this.contextRef}>
                <div>
                  <QuestionBoard
                    handleClickLike={this.handleClickLike}
                    results={this.props.results}
                  />

                  {/*<Rail size='mini' position='left'>
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
      */}
                </div>
              </Ref>
            </Grid.Column>
            {/*

   <Grid.Column>
   <Iframe
   src={'https://webchat.botframework.com/embed/ntozwu-qna-wellspring-bot?s=inVtGkA7vCM.w7KrGgKpZeqVW9HhSX8KcdjJD6sNOAvOP_EIeUiC5g4'}
   style={'min-width: 400px; width: 100%; min-height: 500px;'}></Iframe>

   </Grid.Column>
   */}
          </Grid>
          {/*<FloatingMenu/> */}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.questionBoard
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchQuestions,
      setLoading,
      searchQuestions,
      resetSearchResult,
      setSearchTerm,
      postQuestion,
      clickLikeQuestion
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PatientBoard);
