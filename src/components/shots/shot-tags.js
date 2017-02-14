import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export default class ShotTags extends Component {
    render() {
        const tags = this.props.tags.map((tag, index) =>
            <li key={index}>
                { tag }
            </li>
        );

        return (
            <Row className="show-grid">
                <Col xs={12} className="tags">
                    <h4>Tags</h4>

                    <ul>
                        {tags}
                    </ul>
                </Col>
            </Row>
        )
    }
}