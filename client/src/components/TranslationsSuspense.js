import React from 'react';
import { withTranslation } from 'react-i18next';


const TranslationsSuspense = (props) =>
  props.tReady ? <>{props.children}</> : null;
export default withTranslation()(TranslationsSuspense);
