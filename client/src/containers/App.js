import React, { Suspense } from 'react'

import PatientBoard from './PatientBoard'
import Loader from '../components/Loader'
import LanguageSelector from "../components/LanguageSelector";

const App = () => (
  <Suspense fallback={Loader}>
    {/* @TODO remove LanguageSelector, for test i18next purposes only*/}
    <LanguageSelector />
    <PatientBoard />
  </Suspense>
)
export default App
