import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass, { faPhone, faLocationArrow, faClock, faEnvelope } from '@fortawesome/fontawesome-free-solid';

class Footer extends Component {
    render() {
        return (
            <footer className="bck_b_dark">
                <div className="container">
                    <div className="logo">
                        urbanitas
                    </div>
                    <div className="wrapper">
                        <div className="left">
                            <h2>contact Information</h2>
                            <div className="business_nfo">
                                <div className="tag">
                                    <FontAwesomeIcon
                                    icon={faLocationArrow}
                                    className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Location</div>
                                        <div>XXXX-XXX-XXX</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                    icon={faPhone}
                                    className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Care-Support</div>
                                        <div>+91xxxxxxxx</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                    icon={faClock}
                                    className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Working Hours</div>
                                        <div>we never stop</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Contact</div>
                                        <div>urbanitas@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="left">
                            <h2>get all the Information here!</h2>
                            <div>we are everywhere!!!</div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;