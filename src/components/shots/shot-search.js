import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';

export default class ShotSearch extends Component {
    render() {
        return (
            <form className="shots-search-bar" onSubmit={this.props.searchOnSubmit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="Pesquise por shots" onChange={this.props.onChangeSearchInput}/>
                        <InputGroup.Button>
                            <Button type="submit">
                                <Glyphicon glyph="search"/>
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        )
    }
}