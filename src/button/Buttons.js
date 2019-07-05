import React, { Component } from 'react';


class Button extends Component {
    
    
    render() {
        return (
            <div className={this.props.class?'button ' + this.props.class:'button'} 
            onClick={this.props.stateButton ==='OPEN' ? this.props.chooseWeight:this.props.changeStateButton}>
                <p>{this.props.stateButton}</p>
            </div>
        )
    }
}

export default Button;