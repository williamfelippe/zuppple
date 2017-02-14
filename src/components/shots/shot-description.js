import React, {Component} from "react";
import sanitizeHtml from "sanitize-html";

export default class ShotDescription extends Component {
    sanitizeHtmlDescription(description) {
        if (!description) {
            return '';
        }
        else {
            const markup = {__html: sanitizeHtml(description)};
            return <span dangerouslySetInnerHTML={markup}/>;
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.sanitizeHtmlDescription(this.props.description)}
            </div>
        )
    }
}