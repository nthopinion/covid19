import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import '../../styles/AboutUs.css';

const AboutUs = (props) => {
  return (
    <Link className="about-us-wrapper" to="/about">
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
    </Link>
  );
};

export default withTranslation()(AboutUs);
