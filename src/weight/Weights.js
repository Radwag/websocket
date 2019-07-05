import React, { Component } from 'react';
import allIcon from '../img/all-icon.png';
import oneIcon from '../img/one-icon.png'

class Weights extends Component {
    render() {
        const {allScales} = this.props;
        return (
            <div className="weights">
                <ol>
                    {allScales.map(scale => 
                        <li key={scale.PlatformIndex} className="weight" onClick={() => this.props.showScales(scale.PlatformIndex)}>
                            <p>{scale.PlatformIndex +1}</p>
                        </li>
                    )}
                <img src={!this.props.all?allIcon:oneIcon} alt="icon" onClick={this.props.showAll}/>
                </ol>
            </div>
        )
    }
}

export default Weights