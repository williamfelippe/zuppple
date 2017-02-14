import React, {Component} from 'react';
import ShotMoreFromUserItem from './shot-more-from-user-item';

export default class ShotMoreFromUser extends Component {
    render() {
        const listOfShots = this.props.userShots.map((shot) =>
            <li key={shot.id}>
                <ShotMoreFromUserItem shot={shot}/>
            </li>
        );

        return (
            <div>
                <h4>Mais de {this.props.user.name}</h4>

                <ul className="shots-from-user">
                    {listOfShots}
                </ul>
            </div>
        )
    }
}
