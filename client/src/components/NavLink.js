import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import styles from '../styles/NavLink.css';

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
    return (
      <div>
        <Button id="menu" className="ui icon button" onClick={this.showMenu}>
          {' '}
          <i
            className={`bars icon ${this.props.lightMenu ? 'light' : ''}`}
            onClick={this.showMenu}
          />
        </Button>

        {this.state.showMenu ? (
          <div className="menu">
            <div
              className={`ui visible right demo vertical sidebar labeled icon menu ${styles.NavLink}`}
            >
              <nav>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://about.askco19.com/#lp-pom-block-118"
                    >
                      ABOUT
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://about.askco19.com/"
                    >
                      PHYSICIANS
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href=" https://github.com/nthopinion/covid19/blob/master/README.md"
                    >
                      DEVELOPERS
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://video.askco19.com/dxyopencourse/"
                    >
                      VIDEO COURSE
                    </a>
                  </li>
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
                      Our Sponsors{' '}
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
                      Our Contributors{' '}
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

export default NavMenu;
