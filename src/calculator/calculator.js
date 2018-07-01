import React, { Component }  from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { YMaps, Map } from 'react-yandex-maps';
import './calculator.css';

export class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            car: 0,
            way: 0,
            toWay: 'Хабаровск, Стрельникова 27',
            fromWay: 'Хабаровск, Ленина 10 ',
            mapState: {
                center: [55.76, 37.64], 
                zoom: 10,
            },
            mapApi: null,
            pending: false,
        }
    }
    carrList = [1, 2, 3]
    handleClick(i) {
        this.setState({
            ...this.state,
            car: i
        }, () => {console.log(this.state)})
        
    }
    onChangeTo = (e) => {
        this.setState({
            ...this.state,
            toWay: e.target.value
        })
    }
    onChangeFrom = (e) => {
        this.setState({
            ...this.state,
            fromWay: e.target.value
        })
    }
    getRoute(ymaps) {
        let length;
        this.setState({
            ...this.state,
            pending: true
        })
        ymaps.route([
            this.state.fromWay,
            this.state.toWay
        ]).then( route => {
            length = Math.round(route.getLength()/1000)
            if (length < 0) {
                length = 1
            }
            this.setState({
                ...this.state,
                way: length,
                pending: false
            })
        })
    }
    setMapApi(ymaps) {
        this.setState({
            ...this.state,
            mapApi: ymaps
        })
    }
    clickSubmit = (e) => {
        e.preventDefault()
        if (this.state.mapApi !== null) {
            this.getRoute(this.state.mapApi);
        } else {
            console.log(this.state)
        }
    }
    render() {
     
        return (
            <div className="col-12">
                <form className="form">
                    <ButtonToolbar className="justify-content-center">
                        <ToggleButtonGroup
                        type="radio"
                        name="options"
                        defaultValue={1}
                        onChange={this.handleClick}
                        >
                            {
                                this.carrList.map(elem => {
                                    return (
                                        <ToggleButton 
                                            bsStyle="primary"
                                            bsSize="large"
                                            key={elem} 
                                            value={elem}
                                            >
                                                {elem}
                                        </ToggleButton>
                                    )
                                })
                            }
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    <FormGroup
                        controlId={'1'}
                    >
                        <ControlLabel>
                            Откуда
                        </ControlLabel>
                        <FormControl
                            type="text"
                            defaultValue={this.state.fromWay}
                            placeholder="Откуда"
                            onChange={this.onChangeFrom}
                        >
                        </FormControl>
                    </FormGroup>
                    <FormGroup
                        controlId={'2'}
                    >
                        <ControlLabel>
                            Куда
                        </ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.toWay}
                            placeholder="Куда"
                            onChange={this.onChangeTo}
                        >
                        </FormControl>
                    </FormGroup>
                    {this.state.mapApi !== null && !this.state.pending &&
                        <FormGroup controlId={'3'}>
                            <FormControl
                                type="submit"
                                onClick={this.clickSubmit}
                                >
                            </FormControl>
                         </FormGroup>
                    }
                    
                    <YMaps onApiAvaliable={ (ymaps) => {
                            console.log(ymaps)
                            this.setMapApi(ymaps)
                        }
                    }>
                        <Map state={this.state.mapState} width="960px" height="0">
                        </Map>
                    </YMaps>
                </form>
                
                    { this.state.way > 0 &&
                        <div className="text-center">
                            <h2>{this.state.way} км. </h2>
                            <h3>{this.state.way * 500} рублей</h3>
                         </div>
                    }
                
               
            </div>
        )
    }
}