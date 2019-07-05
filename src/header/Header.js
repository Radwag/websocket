import React, { Component } from 'react';
import AllScales from '../scales/AllScales'
import Button from '../button/Buttons'

import '../scales/AllScales.scss'
import '../button/Button.scss'

class Header extends Component {
    render () {
      return (
        <header className="Header">
            <form onSubmit={this.props.chooseScales} className="ipForm">
                <input type="text" placeholder="Type ip:" name="ip" autoComplete="off"></input>
            </form>
            <Button
                class={'open'}
                chooseScales={this.props.chooseScales}
                stateButton={this.props.stateButton}
                changeStateButton={this.props.changeStateButton}
            />
            
            {this.props.data&&this.props.allScales.length>0&&
            <AllScales
                allScales={this.props.allScales}
                showScales={this.props.showScales}
                showAll={this.props.showAll}
                all={this.props.all}
            />}
          
          
        </header>
      );
    };
  };
  
  export default Header