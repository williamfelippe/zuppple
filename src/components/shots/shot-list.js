import React, {Component} from 'react';
import ShotItem from './shot-item';

export default class ShotList extends Component {
    render() {
        const shots = this.props.shots.map((shot, index) =>
            <li key={index}>
                <ShotItem shot={shot} view={this.props.view} />
            </li>
        );

        return (
            <ol className="shots-list">
                {shots}
            </ol>
        )
    }
}
