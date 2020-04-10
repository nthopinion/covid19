import React from 'react';

import '../styles/Footer.css';

const Footer = () => {
  const disclaimerLink =
    'https://nquestionblob.blob.core.windows.net/images/' +
    'Full%20Disclaimer%20_%20Legal%20Information%20and%20Disclosures_%20Nth%20Opinion.pdf';

  return (
    <div className="footer">
      <p>Powered by Nth Opinion. </p>
      <p>AskCo19.com does not provide medical advice,</p>
      <p>
        diagnosis or treatment. See{' '}
        <a href={disclaimerLink}>additional information.</a>
      </p>
    </div>
  );
};

export default Footer;
