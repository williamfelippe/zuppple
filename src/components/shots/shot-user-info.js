import React, {Component} from 'react';
import {Image, Media} from "react-bootstrap";
import {Link} from "react-router";
import * as dateFormat from '../../utils/date-format';

export default class ShotUserInfo extends Component {
    render() {
        return (
            <div className="user-info">
                <Media>
                    <Media.Left align="middle">
                        <Image src={this.props.shot.user.avatar_url} circle/>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{this.props.shot.title}</Media.Heading>
                        <div>
                            por <Link to={`/user/${this.props.shot.user.id}`}>
                            {this.props.shot.user.name}
                        </Link> há {dateFormat.format(this.props.shot.created_at)}
                        </div>
                    </Media.Body>
                </Media>
            </div>
        )
    }
}