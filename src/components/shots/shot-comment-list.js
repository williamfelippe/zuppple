import React, {Component} from "react";
import ShotCommentItem from "./shot-comment-item";

export default class ShotCommentList extends Component {
    render() {
        const comments = this.props.comments.map((comment) =>
            <ShotCommentItem comment={ comment } key={comment.id}/>
        );

        return (
            <div>
                <p>
                    {this.props.comments.length} Comentários
                </p>

                <br />

                <div className="shot-comments">
                    {comments}
                </div>
            </div>
        )
    }
}