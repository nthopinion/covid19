import React from 'react'

import PatientBoard from './PatientBoard'
import TranslationsSuspense from "../components/TranslationsSuspense";
import LanguageSelector from "../components/LanguageSelector";

const App = () => (
  <TranslationsSuspense>
    {/* @TODO remove LanguageSelector, for test i18next purposes only */}
    <LanguageSelector />
    <PatientBoard />
  </TranslationsSuspense>
);
export default App
