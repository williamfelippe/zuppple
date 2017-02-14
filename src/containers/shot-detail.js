import React, {Component} from "react";
import Alert from 'react-s-alert';
import Loader from "../components/utils/loader";
import ShotTags from "../components/shots/shot-tags";
import ShotUserInfo from "../components/shots/shot-user-info";
import ShotCommentList from "../components/shots/shot-comment-list";
import ShotImageBox from "../components/shots/shot-image-box";
import ShotDescription from "../components/shots/shot-description";
import ShotSocialInformationBox from "../components/shots/shot-social-information-box";
import ShotMoreFromUser from "../components/shots/shot-more-from-user";
import {Grid, Row, Col} from "react-bootstrap";
import * as shotsService from "../services/shotsService";
import * as userService from "../services/userService";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class ShotDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shot: null,
            loading: false,
            userShots: [],
            comments: []
        }
    }

    componentDidMount() {
        this.getShot();
        this.getShotComments();

        Alert.info('Uhull', {
            position: 'top-right',
            effect: 'jelly',
            timeout: 'none'
        });
    }

    getShot() {
        const shotId = this.props.params.shotId;

        this.setState({loading: true});

        shotsService
            .getShotById(shotId)
            .then((response) => {
                this.setState({loading: false});

                const statusCode = response.status;
                if (statusCode === 200) {
                    this.setState({shot: response.data});
                    this.getUserShots();
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

                this.setState({loading: false});
            });
    }

    getUserShots() {
        const userId = this.state.shot.user.id;
        userService.getUserShots(userId)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    const data = response.data;

                    if (data.length > 3) {
                        this.setState({userShots: data.slice(1, 3)});
                    }
                    else {
                        this.setState({userShots: data});
                    }
                }
                else {
                    throw response;
                }
            })
            .catch((error) => {
                Alert.info('Erro ao buscar shots do usuário. Atualize a página', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 'none'
                });
            });
    }

    getShotComments() {
        const shotId = this.props.params.shotId;

        shotsService
            .getShotComments(shotId)
            .then((response) => {
                const statusCode = response.status;

                if (statusCode === 200) {
                    this.setState({comments: response.data});
                }
            })
            .catch((error) => {
                Alert.info('Erro ao buscar comentários. Atualize a página', {
                    position: 'top-right',
                    effect: 'jelly',
                    timeout: 'none'
                });
            })
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid shot-detail">
                    <Col xs={12} lg={11} lgOffset={1}>
                        {
                            /* Informação do usuário criador do shot */
                            this.state.shot && <ShotUserInfo shot={this.state.shot}/>
                        }
                    </Col>

                    <Col xs={12} md={8} lg={6} lgOffset={1}>
                        {
                            /* Box com imagem principal e anexos do shot */
                            this.state.shot &&
                            <ShotImageBox shotId={this.state.shot.id} images={this.state.shot.images}/>
                        }

                        {
                            /* Descrição do shot */
                            this.state.shot && <ShotDescription description={this.state.shot.description}/>
                        }

                        <hr />

                        {
                            /* Comentários sobre o shot */
                            this.state.shot && <ShotCommentList comments={this.state.comments}/>
                        }
                    </Col>
                    <Col xs={12} md={4} lg={3} lgOffset={1}>
                        {
                            /* Informações sobre os likes, rebounds e buckets */
                            this.state.shot && <ShotSocialInformationBox
                                likes={this.state.shot.likes_count}
                                rebounds={this.state.shot.rebounds_count}
                                buckets={this.state.shot.buckets_count}/>
                        }

                        {
                            /* Listagem de mais shots do usuário */
                            this.state.shot &&
                            <ShotMoreFromUser userShots={this.state.userShots} user={this.state.shot.user}/>
                        }
                        <hr />

                        {
                            /* Listagem de TAGAS */
                            this.state.shot && <ShotTags tags={this.state.shot.tags}/>
                        }
                    </Col>
                </Row>

                <Row>
                    {/* Loader */}
                    <Col xs={12}>
                        {this.state.loading && <Loader /> }
                    </Col>
                </Row>
            </Grid>
        )
    }
}