import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import styles from '../styles/NavLink.css';

class NavMenu extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };

    this.showmenu = this.showmenu.bind(this);
    this.WrapperRef = this.WrapperRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown ', this.handleClick);
  }

  WrapperRef(node) {
    this.wrapperRef = node;
  }

  showmenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  handleClick(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.showmenu();
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Button id="menu" className="ui icon button" onClick={this.showmenu}>
          {' '}
          <i className="bars icon" onClick={this.showmenu} />
        </Button>

        {this.state.showMenu ? (
          <div className="menu" ref={this.WrapperRef}>
            <div
              className={`ui visible right demo vertical sidebar labeled icon menu ${styles.NavLink}`}
            >
              <nav>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.askco19.com/"
                    >
                      {t('navLink:about')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.askco19.com/contributors"
                    >
                      {t('navLink:getInvolved')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.askco19.com/sponsors"
                    >
                      {t('navLink:ourSponsors')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.askco19.com/dxyopencourse/"
                    >
                      {t('navLink:partners')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://nquestionblob.blob.core.windows.net/images/Full%20Disclaimer%20_%20Legal%20Information%20and%20Disclosures_%20Nth%20Opinion.pdf"
                    >
                      {t('navLink:contactUs')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.askco19.com/login"
                    >
                      {t('navLink:logIn')}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withTranslation()(withRouter(NavMenu));
