import React, {Component} from "react";
import {Link} from "react-router";

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <Link to="/">
                        zuppple
                    </Link>
                </div>
            </header>
        )
    }
}
