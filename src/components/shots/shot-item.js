import React, {Component} from "react";
import {Link} from "react-router";
import {Glyphicon, Image} from "react-bootstrap";
import ShotDescription from "./shot-description";
import * as shotsService from "../../services/shotsService";
import * as dateFormat from '../../utils/date-format';

export default class ShotItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        }
    }

    likeShot() {
        shotsService
            .likeShot(this.props.shot.id)
            .then((response) => {
                this.state({liked: true});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let image = (this.props.view === 1)
            ? this.props.shot.images.teaser
            : this.props.shot.images.normal;

        const photoStyle = {
            backgroundImage: 'url(' + image + ')'
        };

        return (
            <div className="shot-item">
                <div
                    className={this.props.view === 1 ? 'shot-item-box' : 'shot-item-box larger'}>
                    <Link to={`/shot/${this.props.shot.id}`}>
                        <div style={photoStyle} className="photo">
                            <div className="informations">
                                <strong>
                                    {this.props.shot.title}
                                </strong>

                                <ShotDescription description={this.props.shot.description}/>

                                <span className="date">
                                    {dateFormat.format(this.props.shot.created_at)}
                                </span>
                            </div>
                        </div>
                    </Link>
                    <ul className="count">
                        {
                            this.props.shot.attachments_count > 0 &&
                            <li>
                                <Glyphicon glyph="paperclip"/>
                            </li>
                        }
                        <li>
                            <Glyphicon glyph="eye-open"/>
                            <sub>{this.props.shot.views_count}</sub>
                        </li>
                        <li>
                            <Glyphicon glyph="comment"/>
                            <sub>{this.props.shot.comments_count}</sub>
                        </li>
                        <li>
                            <Glyphicon glyph="heart" className={this.state.liked ? 'like active' : 'like'}
                                       onClick={this.likeShot.bind(this)}/>
                            <sub>
                                {
                                    this.state.liked
                                        ? this.props.shot.likes_count++
                                        : this.props.shot.likes_count
                                }
                            </sub>
                        </li>
                    </ul>
                </div>

                {
                    this.props.shot.user &&
                    <Link to={`/user/${this.props.shot.user.id}`}>
                        <ul className="avatar">
                            <li>
                                <Image src={this.props.shot.user.avatar_url} circle/>
                            </li>
                            <li>
                                {this.props.shot.user.name}
                            </li>
                        </ul>
                    </Link>
                }
            </div>
        )
    }
}