import React, {Component} from "react";
import ShotDescription from "../shots/shot-description";
import {Image, Media} from "react-bootstrap";

export default class ShotCommentItem extends Component {
    render() {
        return (
            <Media>
                <Media.Left align="middle">
                    <Image src={this.props.comment.user.avatar_url} circle className="avatar"/>
                </Media.Left>
                <Media.Body>
                    <Media.Heading>{this.props.comment.user.name}</Media.Heading>
                    <ShotDescription description={this.props.comment.body}/>
                </Media.Body>
            </Media>
        )
    }
}