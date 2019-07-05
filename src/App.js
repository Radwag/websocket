import React, { Component } from 'react';

import Header from './header/Header'
import Details from './details/Details'
import serializeForm from 'form-serialize'
import './header/Header.scss'
import './App.scss';
import './details/Details.scss'

class App extends Component {
    state = {
        weights: [],
        data: false,
        platformIndex: 0,
        connection: {},
        stateButton: 'OPEN',
        interval:{},
        all:false
    }

    chooseScales = (e) => {
        e.preventDefault()
        let target = document.querySelector('.ipForm')
        const values = serializeForm(target, {hash: true })
    
        const regIp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        let ipCheck = regIp.test(values.ip)
        
        if (this.state.connection.readyState) {
            this.state.connection.close()
        }

        if (ipCheck) {
            const connection = new WebSocket(`ws://${values.ip}:7000/status`)
            
            this.setState({connection})
            
            this.state.stateButton === 'OPEN'? this.setState({stateButton:'CLOSE'}): this.setState({stateButton:'OPEN'})
            connection.onopen = () => {
                var msg = {COMMAND: "GET_MOD_INFO"};
                connection.send(JSON.stringify(msg));
                
            }

            connection.onmessage = (e) => {
                let data = e.data;
                const weights = JSON.parse(data) ;
                if (weights.Data.Mass) {
                    this.setState({weights:weights.Data.Mass, data:true});

                }
            }

            connection.onerror = (e) => {
                this.changeStateButton()
            }
            target.firstChild.disabled =true
            connection.onclose = () => {
                this.setState({data:false})
            }
            
            this.showWeight(0)

            let allWeights = document.querySelectorAll('.weight')
            if (allWeights.length > 0) {
                this.changeColor(allWeights, 0)
            } 
        }
    }

    showWeight = (platformIndex) => {
        if(this.state.interval) {
            clearInterval(this.state.interval)
        }
        if (this.state.connection.readyState === 1) {
            this.setState({platformIndex:platformIndex})
            let msg = {
                COMMAND: "EXECUTE_ACTION",
                PARAM: `actSelPlatf${platformIndex + 1}`
            };

            this.state.connection.send(JSON.stringify(msg));
        }
        

        const interval = setInterval(() => {
            const myBar = document.querySelector('.myBar');
            let width = 0;
            if(this.state.weights[platformIndex] && this.state.connection.readyState === 1) {
                this.setState({data:true})
                width = (this.state.weights[platformIndex].Max ) * parseFloat(this.state.weights[platformIndex].NetAct.Value.replace(',','.'));
                let msg = {COMMAND: "GET_MOD_INFO"};
                this.state.connection.send(JSON.stringify(msg));
            }
            if(myBar && this.state.weights[platformIndex].NetAct.Value !== 'nie jest liczbą') {
                myBar.style.width = width  * 11.2 + '%'
            } else if (myBar) {
                
                myBar.style.width = 0
            }
            let allWeights = document.querySelectorAll('.weight')
            if (allWeights.length > 0) {
                this.changeColor(allWeights, platformIndex)
            } 
            
        },250)

        this.setState({interval})
    }

    changeStateButton = () => {
        this.state.stateButton === 'OPEN'? this.setState({stateButton:'CLOSE'}): this.setState({stateButton:'OPEN'})
        let target = document.querySelector('.ipForm').firstChild
        target.disabled = false
        target.value = ''
        clearInterval(this.state.interval)
        this.state.connection.close()
        this.setState({connection:{}})
    }

    changeColor = (arr, indx) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.backgroundColor = '#1474e0'
        }
        arr[indx].style.backgroundColor = '#0f57a8'
    }

    setTare = (platformIndex) => {

        if (this.state.connection.readyState === 1) {
            let msg = {
                COMMAND: "EXECUTE_ACTION",
                PARAM: `actSelPlatf${platformIndex + 1}`
            };

            this.state.connection.send(JSON.stringify(msg));
        }

        let msg = {
            COMMAND: "EXECUTE_ACTION",
            PARAM: 'actTarring'
        };
        this.state.connection.send(JSON.stringify(msg));
    }

    setZero = (platformIndex) => {
        if (this.state.connection.readyState === 1) {
            let msg = {
                COMMAND: "EXECUTE_ACTION",
                PARAM: `actSelPlatf${platformIndex + 1}`
            };
            this.state.connection.send(JSON.stringify(msg));
        }
        var msg = {
            COMMAND: "EXECUTE_ACTION",
            PARAM: 'actZeroing'
        };
        this.state.connection.send(JSON.stringify(msg));
    }

    // Display all weights
    showAll = () => {
        if (!this.state.all) {
            this.setState({all:true})
        } else {
            this.setState({all:false})
        }
    };

    // Displaying the right value precision 
    precision = (str, precision) => {
        return parseFloat(str.replace(',','.')).toFixed(precision).replace('.',',');
    };

    render() {
        return (
        <div className="App">
            <Header
                weights={this.state.weights}
                data={this.state.data}
                showWeight={this.showWeight}
                chooseScales={this.chooseScales}
                stateButton={this.state.stateButton}
                changeStateButton={this.changeStateButton}
                showAll={this.showAll}
                all={this.state.all}
            />
            
            {this.state.data&&!this.state.all&&<Details
                platformIndex={this.state.platformIndex}
                weights={this.state.weights}
                data={this.state.data}
                setTare={this.setTare}
                setZero={this.setZero}
                precision={this.precision}
            />}

            {this.state.data&&this.state.all&&
            <div className="all">
                <ol>
                    {this.state.weights.map(weight => 
                    <li key={weight.PlatformIndex} className="test">
                        <Details
                            platformIndex={weight.PlatformIndex}
                            weights={this.state.weights}
                            data={this.state.data}
                            setTare={this.setTare}
                            setZero={this.setZero}
                            all={this.state.all}
                            precision={this.precision}
                        />
                    </li>
                        
                    )}
                </ol>

            </div>
            }
        </div>
        );

    }
}

export default App;
