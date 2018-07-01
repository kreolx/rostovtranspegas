import React, {Component} from 'react';
import './header.css';

export class Header extends Component {
    render () {
        return (
            <div className="header">
                <div className="logo"><h1>РостовТрансПегас</h1></div>
                <div className="phone"><span>+7&nbsp;(999)&nbsp;999&nbsp;99&nbsp;99</span></div>
            </div>
        )
    }
}
