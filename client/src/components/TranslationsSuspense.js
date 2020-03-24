import React from 'react';
import { withTranslation } from 'react-i18next';
import Loader from '../components/Loader'

const TranslationsSuspense = props => (
  props.tReady
    ? <>{props.children}</>
    : <Loader />
);
export default withTranslation()(TranslationsSuspense);
