import React from 'react';

import PatientBoard from './PatientBoard';
import TranslationsSuspense from '../components/TranslationsSuspense';

const App = () => (
  <TranslationsSuspense>
    <PatientBoard />
  </TranslationsSuspense>
);
export default App;
