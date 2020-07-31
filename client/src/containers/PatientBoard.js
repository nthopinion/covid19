import React, { Component, createRef } from 'react';
import Pusher from 'pusher-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Ref } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  fetchQuestions,
  setLoading,
  searchQuestions,
  resetSearchResult,
  setSearchTerm,
  postQuestion,
  clickLikeQuestion,
  handleAnswerLike,
  handleNewQuestionAnswered,
  changeLanguage,
} from '../actions';

import config from '../config';
import '../styles/PatientBoard.css';

import Footer from '../components/Footer';
import StickyHeader from '../components/StickyHeader';
import QuestionBoard from '../components/QuestionBoard';
import HeaderWithLink from '../components/HeaderWithLink';
import TranslationsSuspense from '../components/TranslationsSuspense';

import { loginPath } from '../helpers/urls';
import { normalizeResults } from '../helpers/normalizeResults';

class PatientBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNewQuestion: false,
    };
  }

  componentDidMount() {
    this.props.fetchQuestions();

    this.subscribeToNewQuestions();
  }

  subscribeToNewQuestions = () => {
    const { key, cluster, channel } = config.pusher;
    const pusher = new Pusher(key, {
      cluster,
      encrypted: true,
    });

    pusher.subscribe(channel).bind('answer-question', async (data) => {
      await this.props.handleNewQuestionAnswered(data.question);
      this.setState({ displayNewQuestion: true });
    });
  };

  handleDisplayNewQuestion = () => {
    this.setState({
      displayNewQuestion: false,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  handleAnswerLike = (questionId, answerId) => {
    this.props.handleAnswerLike(questionId, answerId);
  };

  handleClickLike = (id, index) => {
    return () => this.props.clickLikeQuestion(id, index);
  };

  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  handleResultSelect = (e, { result }) => {
    this.props.searchQuestions(this.props.questions, result.title);
  };

  handleSearchChange = (e, { value }) => {
    this.props.setLoading(false);
    this.props.setSearchTerm(value);

    setTimeout(() => {
      if (this.props.searchTerm && this.props.searchTerm.length < 1) {
        this.props.resetSearchResult();
      }
      this.props.searchQuestions(this.props.questions, this.props.searchTerm);
    }, 500);

    /*     // submit question
    if (this.props.results.length !== 0) return;
    // var self = this
    if (
      this.props.searchTerm &&
      this.state.prevSearchTerm !== this.props.searchTerm &&
      this.props.searchTerm.length > 10
    ) {
      // _.throttle(this.handleSubmitNewQuestion, 1000)()
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.handleSubmitNewQuestion();
      }, 1000);
    }
 */
  };

  handleSubmitNewQuestion = () => {
    this.props.postQuestion(this.props.searchTerm);

    // this.setState({ prevSearchTerm: this.props.searchTerm });
    // dispatch(resetSearchResult());
    // dispatch(searchQuestions(this.props.questions, this.props.searchTerm))
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.resetSearchResult();
    }
  };

  contextRef = createRef();

  render() {
    return (
      <TranslationsSuspense>
        <StickyHeader
          contextRef={this.contextRef}
          isLoading={this.props.isLoading}
          results={normalizeResults(this.props.results)}
          searchTerm={this.props.searchTerm}
          handleResultSelect={this.handleResultSelect}
          handleSearchChange={this.handleSearchChange}
          addSuccess={this.props.addSuccess}
          messageActive={this.props.messageActive}
          newQ={this.props.newQ}
          handleKeyPress={this.handleKeyPress}
          account={this.props.account}
          onSignOut={this.props.onSignOut}
          handleChangeLanguage={this.handleChangeLanguage}
        />
        <div className="containerDiv">
          <div className="banner clearfix">
            <img
              src="health-care.svg"
              className="health-care"
              alt="health-care"
            />
            <div className="banner-text">
              {this.props.t('patientBoard:banner.text')}
            </div>
            <div className="banner-subtext">
              {this.props.t('patientBoard:banner.subText')}
            </div>
          </div>
          <div className="header-with-link-wrapper">
            <HeaderWithLink
              buttonLabel={this.props.t('patientBoard:addQuestion.askADoctor')}
            />
          </div>

          {this.state.displayNewQuestion && (
            <div
              className="new-answers"
              onClick={this.handleDisplayNewQuestion}
            >
              {this.props.t('patientBoard:answers.seeNew')}
            </div>
          )}
          <Grid centered columns={2} stackable>
            <Grid.Column>
              <div className="patient-header-wrapper">
                {
                  // Visibility is set to hidden for this component.
                  // Please remove visibility:hidden from css while implementing filtering
                  //  <div className="filter-wrapper">
                  //   <div className="button-wrapper">
                  //     <button>filer all</button>
                  //     <button>popular</button>
                  //   </div>
                  // </div>
                }
                <div className="header-container">
                  <div className="board-title">
                    {this.props.t(
                      'patientBoard:questionBoard.answersFromFrontline'
                    )}
                  </div>
                  <div className="board-link">
                    <Link to={loginPath}>
                      {this.props.t('patientBoard:addQuestion.areyouphysician')}
                    </Link>
                  </div>
                </div>
              </div>

              <Ref innerRef={this.contextRef}>
                <div>
                  <QuestionBoard
                    handleClickLike={this.handleClickLike}
                    handleAnswerLike={this.props.handleAnswerLike}
                    results={this.props.results}
                  />

                  {/* <Rail size='mini' position='left'>
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
          {/* <FloatingMenu/> */}
          <Footer />
        </div>
      </TranslationsSuspense>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.questionBoard,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchQuestions,
      setLoading,
      searchQuestions,
      resetSearchResult,
      setSearchTerm,
      postQuestion,
      clickLikeQuestion,
      handleAnswerLike,
      handleNewQuestionAnswered,
      changeLanguage,
    },
    dispatch
  );

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PatientBoard)
);
