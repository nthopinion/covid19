import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import '../styles/NavLink.css';

class NavMenu extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Button id="menu" className="ui icon button" onClick={this.showMenu}>
          {' '}
          <i className="bars icon" onClick={this.showMenu} />
        </Button>

        {this.state.showMenu ? (
          <div className="menu-wrapper">
            <div className="ui visible right demo vertical sidebar labeled icon menu">
              <nav>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://about.askco19.com/#lp-pom-block-118"
                    >
                      {t('navLink:about')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://about.askco19.com/"
                    >
                      {t('navLink:physicians')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href=" https://github.com/nthopinion/covid19/blob/master/README.md"
                    >
                      {t('navLink:developers')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://video.askco19.com/dxyopencourse/"
                    >
                      {t('navLink:videoCourse')}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://nquestionblob.blob.core.windows.net/images/Full%20Disclaimer%20_%20Legal%20Information%20and%20Disclosures_%20Nth%20Opinion.pdf"
                    >
                      {t('navLink:disclaimer')}
                    </a>
                  </li>
                  <div>
                    {this.props.account ? (
                      <Button
                        onClick={this.props.onSignOut}
                        className="logInlogOut"
                      >
                        {t('navLink:logOut')}
                      </Button>
                    ) : (
                      <Button
                        target="_blank"
                        onClick={() =>
                          this.props.history.push('/bIiOOIIqgwEXwUU3SaD0F9')
                        }
                        className="logInlogOut"
                      >
                        {t('navLink:logIn')}
                      </Button>
                    )}
                  </div>
                </ul>
                <div>
                  <div>
                    <Button
                      id="sponsors"
                      href="https://about.askco19.com/sponsors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      {t('navLink:ourSponsors')}{' '}
                    </Button>
                  </div>
                  <div>
                    <Button
                      id="contributors"
                      href="https://about.askco19.com/contributors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      {t('navLink:ourContributors')}{' '}
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withTranslation()(withRouter(NavMenu));
