import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import styles from "../styles/NavLink.css";

class NavMenu extends Component {
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
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  render() {
    return (
      <div>
        <Button id="menu" class="ui icon button" onClick={this.showMenu}>
          {" "}
          <i
            class={`bars icon ${this.props.lightMenu ? "light" : ""}`}
            onClick={this.showMenu}
          ></i>
        </Button>

        {this.state.showMenu ? (
          <div className="menu">
            <div
              className={styles.NavLink}
              class="ui visible right demo vertical sidebar labeled icon menu"
            >
              <nav>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://about.covid19webapp.com/#lp-pom-block-118"
                    >
                      ABOUT
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://about.covid19webapp.com/"
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
                      href="https://video.covid19webapp.com/dxyopencourse/"
                    >
                      VIDEO COURSE
                    </a>
                  </li>
                </ul>
                <Button
                  id="sponsors"
                  color="#304FFE"
                  href="https://about.covid19webapp.com/sponsors/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Our Sponsors{" "}
                </Button>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default NavMenu;
