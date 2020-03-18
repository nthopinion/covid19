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
        <Button id="menu" class="ui icon button" onClick={this.showMenu}> <i class="bars icon" onClick={this.showMenu}></i>  
      </Button>
      
      {
          this.state.showMenu
            ? (
                <div className="menu">
                <div className = {styles.NavLink} class="ui visible left demo vertical inverted sidebar labeled icon menu">
                    <Grid rows={3}>
                        
                        <Grid.Column>
        
                        <Grid.Row>
                        <Button floated="left"  color='#304FFE' href="https://about.covid19webapp.com/" target="_blank"> About </Button>
                        </Grid.Row>
        
                        <Grid.Row>
                        <Button floated="left"  color='#304FFE' href="https://about.covid19webapp.com/#lp-pom-block-118" target="_blank"> Physicians </Button>
                        </Grid.Row>
                        
                        <Grid.Row>
                        <Button floated="left"  color='#304FFE' href=" https://github.com/nthopinion/covid19/blob/master/README.md" target="_blank"> Developers </Button>
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