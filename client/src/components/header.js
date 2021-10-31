import React from 'react';

import './header.css';
// import emblem from '../assets/emblem.svg'
import LandRegLogo from '../assets/Land_Registration_Authority.svg'


class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="emblem-text">
                    <img src={LandRegLogo} alt="Emblem" height={45} />
                    <div className="text-wrap">
                        <h1>Land Registry System Using Blockchain</h1>
                        <p></p>
                    </div>
                </div>
                {/* <img src={LandRegLogo} alt="Emblem" height={45} /> */}
            </header>
        )
    }
}

export default Header