import React from 'react';
import { withTranslation } from 'react-i18next';

import config from '../../config/index';

import '../../styles/AboutUs.css';

const AboutUs = (props) => {
  return (
    <a
      className="about-us-wrapper"
      href={config.aboutURL}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="faq-wrapper">
        <p>{props.t('patientBoard:banner.faq')}</p>
      </div>
      <div className="image-container">
        <ul>
          <li>
            <img src="advice.svg" alt="advice" />
          </li>
          <li>
            <img src="question.svg" alt="question" />
          </li>
          <li>
            <img src="support.svg" alt="support" />
          </li>
        </ul>
      </div>
      <div className="about-us-content">
        <p>{props.t('patientBoard:banner.aboutUs')}</p>
      </div>
    </a>
  );
};

export default withTranslation()(AboutUs);
