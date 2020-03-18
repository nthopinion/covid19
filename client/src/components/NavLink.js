import React, { Component } from 'react';
import { Grid,List, Button, Icon } from 'semantic-ui-react'

import styles from '../styles/NavLink.css'

class Menu extends Component {
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
        <Button class="ui labeled icon button" onClick={this.showMenu}> <i class="bars icon" onClick={this.showMenu}></i>  
      </Button>
      
      {
          this.state.showMenu
            ? (
                <div className="menu">
                <div className = {styles.NavLink} class="ui visible left demo vertical inverted sidebar labeled icon menu">
                    <Grid rows={3}>
                        
                        <Grid.Column>
        
                        <Grid.Row>
                        <Button floated="right"  color='teal' href="https://nonprofit.covid19webapp.com/about/#lp-pom-text-104" target="_blank"> About </Button>
                        </Grid.Row>
        
                        <Grid.Row>
                        <Button floated="right"  color='teal' href=" https://nonprofit.covid19webapp.com/about/#lp-pom-text-90" target="_blank"> Are you a physcian? </Button>
                        </Grid.Row>
                        
                        <Grid.Row>
                        <Button floated="right"  color='teal' href=" https://nonprofit.covid19webapp.com/about/#lp-pom-text-26" target="_blank"> Are you a developer? </Button>
                        </Grid.Row>
                        
                        </Grid.Column> 
        
                    </Grid>
                </div>
                </div>
            )
            : (
              null
            )
        }
        
      </div>
    );
  }
}

export default Menu;