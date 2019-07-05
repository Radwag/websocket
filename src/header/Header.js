import React, { Component } from 'react';
import Weight from '../weight/Weights'
import Button from '../button/Buttons'

import '../weight/Weight.scss'
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
            
            {this.props.data&&this.props.weights.length>0&&
            <Weight
                weights={this.props.weights}
                showWeight={this.props.showWeight}
                showAll={this.props.showAll}
                all={this.props.all}
            />}
          
          
        </header>
      );
    };
  };
  
  export default Header