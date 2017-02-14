import React, {Component} from "react";
import Alert from 'react-s-alert';
import {Row, Col} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";
import Loader from "../components/utils/loader";
import ShotsList from "../components/shots/shot-list";
import ShotsFilter from "../components/shots/shot-filter";
import ShotsSearch from "../components/shots/shot-search";
import * as shotsService from "../services/shotsService";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class Shots extends Component {
    constructor() {
        super();
        this.state = {
            shots: [],
            page: 1,
            perPage: 30,
            hasMore: false,
            valueToSearchBy: '',
            view: 1
        };
    }

    componentDidMount() {
        this.listShots();

    }

    listShots() {
        this.setState({hasMore: false});

        if (this.state.valueToSearchBy === '') {
            shotsService.getListOfShots(this.state.page, this.state.perPage)
                .then((response) => {
                    const statusCode = response.status;
                    if (statusCode === 200) {
                        let shots = this.state.shots;
                        this.setState({shots: shots.concat(response.data), hasMore: true});
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
                })
        }
    }

    listMoreShots() {
        let page = this.state.page;
        this.setState({page: ++page, perPage: 10});

        this.listShots();
    }

    onChangeSearchInput(event) {
        this.setState({valueToSearchBy: event.target.value});
    }

    searchOnSubmit(event) {
        event.preventDefault();

        const valueToSearchBy = this.state.valueToSearchBy.toLowerCase();

        if (valueToSearchBy !== '') {
            let shots = _.filter(this.state.shots, (shot) => {
                return _.includes(shot.title.toLowerCase(), valueToSearchBy);
            });

            this.setState({shots: shots});
        }
        else {
            this.setState({page: 1, perPage: 30, shots: []});
            this.listShots();
        }
    }

    changeToLargeView() {
        this.setState({view: 2});
    }

    changeToSmallView() {
        this.setState({view: 1});
    }

    render() {
        return (
            <div className="large-container">
                <Row>
                    <Col xs={12} md={4} mdOffset={2}>
                        <ShotsFilter changeToSmallView={this.changeToSmallView.bind(this)}
                                     changeToLargeView={this.changeToLargeView.bind(this)}/>
                    </Col>

                    <Col xs={12} md={4}>
                        <ShotsSearch onChangeSearchInput={this.onChangeSearchInput.bind(this)}
                                     searchOnSubmit={this.searchOnSubmit.bind(this)}/>
                    </Col>
                </Row>

                <Row>
                    <InfiniteScroll pageStart={0} loadMore={this.listMoreShots.bind(this)}
                                    hasMore={this.state.hasMore}
                                    loader={<Loader />}>
                        <ShotsList shots={this.state.shots} view={this.state.view}/>
                    </InfiniteScroll>
                </Row>
            </div>
        )
    }
}