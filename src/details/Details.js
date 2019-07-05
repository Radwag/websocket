import React, { Component } from 'react';
import check from '../img/check.png';
import redXicon from '../img/redXicon.png'

class Details extends Component {
    render () {
        return (
            <div className="details1">
                
                <div className={this.props.all?"details all":"details"}>
                    {this.props.data&&this.props.platformIndex>-1&&<div>
                        {!this.props.all&&<div className="myProgress">
                            <div className="myBar"></div>
                        </div>}
                        <p className='weightValue'>
                            {this.props.weights[this.props.platformIndex].NetAct.Value!=='nie jest liczbą'?
                            <span>{this.props.precision(this.props.weights[this.props.platformIndex].NetAct.Value, 3)} kg</span>:<span>- - -</span>
                            }
                        </p>

                        <hr/>
                        <p >
                            Tare: {this.props.weights[this.props.platformIndex].Tare}
                        </p>
                        <hr/>
                        <p >
                            Stab: {this.props.weights[this.props.platformIndex].isStab?<img src={check} alt="check" width="24px"/>:<img src={redXicon} alt="redIcon" width="24px"/>}
                        </p>
                        <hr/>
                        <div className="option">
                            <p >
                                Tare: {this.props.weights[this.props.platformIndex].isTare?<img src={check} alt="check" width="24px"/>:<img src={redXicon} alt="redIcon" width="24px"/>} 
                            </p>
                            <div className="setButton" onClick={() => this.props.setTare(this.props.platformIndex)}>
                                Set tare
                            </div>
                        </div>
                        <hr/>
                        <div className="option">
                            <p >
                                Zero: {this.props.weights[this.props.platformIndex].isZero?<img src={check} alt="check" width="24px"/>:<img src={redXicon} alt="redIcon" width="24px"/>}
                            </p>
                            <div className="setButton" onClick={() => this.props.setZero(this.props.platformIndex)}>
                                Set zero
                            </div>
                        </div>
                        <hr/>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Details