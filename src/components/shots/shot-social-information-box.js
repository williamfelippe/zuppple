import React, {Component} from 'react';
import {Row, Col, Glyphicon} from "react-bootstrap";

export default class ShotSocialInformationBox extends Component {
    render() {
        return (
            <ul className="shot-social-information">
                <li>
                    <Row>
                        <Col xs={6}>
                            <Glyphicon glyph="heart"/>
                        </Col>
                        <Col xs={6} className="text-right">
                            { this.props.likes }
                        </Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col xs={6}>
                            <Glyphicon glyph="share-alt"/>
                        </Col>
                        <Col xs={6} className="text-right">
                            { this.props.rebounds }
                        </Col>
                    </Row>

                </li>
                <li>
                    <Row>
                        <Col xs={6}>
                            <Glyphicon glyph="folder-open"/>
                        </Col>
                        <Col xs={6} className="text-right">
                            { this.props.buckets }
                        </Col>
                    </Row>

                </li>
            </ul>
        )
    }
}