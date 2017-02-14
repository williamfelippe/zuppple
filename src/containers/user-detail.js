import React, {Component} from 'react';
import Loader from '../components/utils/loader';
import * as userService from '../services/userService';

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false
        }
    }

    componentDidMount() {
        this.getUser();
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

                this.setState({loading: false});

            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                {this.state.loading && <Loader /> }
            </div>
        )
    }
}