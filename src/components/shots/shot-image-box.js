import React, {Component} from "react";
import Alert from 'react-s-alert';
import {Row, Col, Image} from "react-bootstrap";
import * as shotService from "../../services/shotsService";
import Lightbox from "react-image-lightbox";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class ShotImageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attachments: [],
            photoIndex: 0,
            isOpen: false
        }
    }

    componentDidMount() {
        this.getAttachments();
    }

    getAttachments() {
        const shotId = this.props.shotId;

        shotService.getShotAttachments(shotId)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    this.setState({attachments: response.data});
                }
                else {
                    throw response.data;
                }
            })
            .catch((error) => {
                Alert.info('Erro ao buscar anexos. Atualize a página', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 'none'
                });
            });
    }

    onCloseRequest() {
        this.setState({isOpen: false});
    }

    onMovePrevRequest() {
        this.setState({
            photoIndex: (this.state.photoIndex + this.state.attachments.length - 1) % this.state.attachments.length,
        })
    }

    onMoveNextRequest() {
        this.setState({
            photoIndex: (this.state.photoIndex + 1) % this.state.attachments.length
        })
    }

    render() {
        const listOfAttachments = this.state.attachments.map((attachment) =>
            <li key={attachment.id}>
                <Image src={attachment.thumbnail_url} onClick={() => this.setState({isOpen: true})}/>
            </li>
        );

        const {photoIndex, isOpen} = this.state;

        return (
            <Row className="shot-image-box">
                <Col xs={12}>
                    <Image src={this.props.images.normal} className="main-image"/>
                </Col>

                <Col xs={12}>
                    <ul>
                        {listOfAttachments}
                    </ul>
                    {
                        isOpen && <Lightbox mainSrc={this.state.attachments[photoIndex].url}
                                            nextSrc={this.state.attachments[(photoIndex + 1) % this.state.attachments.length].url}
                                            prevSrc={this.state.attachments[(photoIndex + this.state.attachments.length - 1) % this.state.attachments.length].url}
                                            onCloseRequest={this.onCloseRequest.bind(this)}
                                            onMovePrevRequest={this.onMovePrevRequest.bind(this)}
                                            onMoveNextRequest={this.onMoveNextRequest.bind(this)}/>
                    }
                </Col>
            </Row>
        )
    }
}
