import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import ZupLogo from '../../../public/images/zup-logo.png';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col xs={12} md={6}>
                        <img src={ZupLogo} alt="Zup IT Innovation"
                             className="img-responsive pull-right zup-logo"/>
                    </Col>
                    <Col xs={12} md={4}>
                        <p className="description">
                            Desenvolver uma aplicação web contendo as principais funcionalidades do website
                            dribbble.com utilizando sua API Pública.
                        </p>
                    </Col>
                </Row>
            </footer>
        )
    }
}