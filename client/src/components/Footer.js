import React from 'react';

import '../styles/Footer.css';
import { withTranslation, Trans } from 'react-i18next';

const Footer = () => {
  const disclaimerLink =
    'https://nquestionblob.blob.core.windows.net/images/' +
    'Full%20Disclaimer%20_%20Legal%20Information%20and%20Disclosures_%20Nth%20Opinion.pdf';

  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <div className="footer-wrapper">
      <p>
        <Trans i18nKey="patientBoard:footer">
          <br />
          <br />
          <a href={disclaimerLink} />
        </Trans>
      </p>
    </div>
  );
};

export default withTranslation()(Footer);
