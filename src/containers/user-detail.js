import React, {Component} from 'react';
import Alert from 'react-s-alert';
import {Row, Col, Label, Grid, Image} from "react-bootstrap";
import ShotsList from "../components/shots/shot-list";
import ShotsDescription from "../components/shots/shot-description";
import Loader from '../components/utils/loader';
import * as userService from '../services/userService';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false,
            userShots: [],
        }
    }

    componentDidMount() {
        this.getUser();
        this.getUserShots();
    }

    getUser() {
        const userId = this.props.params.userId;

        this.setState({loading: true});

        userService
            .getUserById(userId)
            .then((response) => {
                const statusCode = response.status;
                if (statusCode === 200) {
                    this.setState({user: response.data});
                }
                else {
                    throw response.data;
                }

                this.setState({loading: false});

            })
            .catch((error) => {
                Alert.info('Erro ao buscar usuário. Atualize a página', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 'none'
                });

                this.setState({loading: false});
            })
    }

    getUserShots() {
        const userId = this.props.params.userId;
        userService.getUserShots(userId)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    this.setState({userShots: response.data});
                }
                else {
                    throw response.data;
                }
            })
            .catch((error) => {
                Alert.info('Erro ao buscar shots. Atualize a página', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 'none'
                });
            });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        {
                            this.state.user &&
                            <div className="user-detail-box">
                                <Image src={this.state.user.avatar_url} circle/>
                                <h3>
                                    { this.state.user.name }
                                    { this.state.user.pro && <sup><Label bsStyle="info">Pro</Label></sup> }
                                </h3>
                                <h5>
                                    {this.state.user.location}
                                </h5>

                                <hr />

                                <ShotsDescription description={this.state.user.bio}/>
                            </div>
                        }
                    </Col>

                    <Col xs={12} className="user-detail-shots-list">
                        <ShotsList shots={this.state.userShots} view={1}/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        {this.state.loading && <Loader /> }
                    </Col>
                </Row>
            </Grid>
        )
    }
}
