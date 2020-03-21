import React, { Component } from 'react';
import { Grid, List, Button, Icon } from 'semantic-ui-react';

import styles from '../styles/NavLink.css';

class Menu extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
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
          <i className="bars icon" onClick={this.showMenu}></i>
        </Button>

        {this.state.showMenu ? (
          <div className="menu">
            <div
              className={styles.NavLink}
              class="ui visible right overlay demo vertical inverted sidebar labeled icon menu sidebar"
              id="nav"
            >
              <Grid rows={3} class="sidebar">
                <Grid.Column className="side-nav">
                  <Grid.Row class="side-nav__item">
                    <a
                      href="https://about.covid19webapp.com/#lp-pom-block-118"
                      class="side-nav__link"
                      target="_blank"
                    >
                      About
                    </a>
                  </Grid.Row>

                  <Grid.Row class="side-nav__item">
                    <a
                      href="https://about.covid19webapp.com/"
                      class="side-nav__link"
                      target="_blank"
                    >
                      Physicians
                    </a>
                  </Grid.Row>

                  <Grid.Row class="side-nav__item">
                    <a
                      href="https://github.com/nthopinion/covid19/blob/master/README.md"
                      class="side-nav__link"
                      target="_blank"
                    >
                      Developers
                    </a>
                  </Grid.Row>

                  <Grid.Row class="side-nav__item">
                    <a
                      href="https://video.covid19webapp.com/dxyopencourse/"
                      target="_blank"
                      class="side-nav__link"
                    >
                      Resources
                    </a>
                  </Grid.Row>

                  <Grid.Row id="sponsors" class="side-nav__item">
                    <a
                      href="https://about.covid19webapp.com/sponsors/"
                      target="_blank"
                      class="side-nav__link"
                    >
                      Our Sponsors{' '}
                    </a>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Menu;
