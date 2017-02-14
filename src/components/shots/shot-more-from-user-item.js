import React, {Component} from "react";
import {Link} from "react-router";

export default class ShotMoreFromUserItem extends Component {
    render() {
        let image = (this.props.view === 1)
            ? this.props.shot.images.teaser
            : this.props.shot.images.normal;

        const photoStyle = {
            backgroundImage: 'url(' + image + ')'
        };

        return (
            <div className="shot-item">
                <div className="shot-item-box">
                    <Link to={`/shot/${this.props.shot.id}`}>
                        <div style={photoStyle} className="photo"/>
                    </Link>
                </div>
            </div>
        )
    }
}
