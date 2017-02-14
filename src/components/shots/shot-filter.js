import React, {Component} from "react";
import {Button, ButtonToolbar, ButtonGroup, Glyphicon, OverlayTrigger, Popover} from "react-bootstrap";

export default class ShotFilter extends Component {
    render() {
        const smallViewPopover = (
            <Popover id="small-view-popover" title="Visualização em miniaturas">
                <strong>Miniaturas</strong>
            </Popover>
        );

        const largeViewPopover = (
            <Popover id="large-view-popover" title="Visualização grande">
                <strong>Normal</strong>
            </Popover>
        );

        return (
            <ButtonToolbar className="change-layout-list-buttons">
                <ButtonGroup>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={smallViewPopover}>
                        <Button onClick={this.props.changeToSmallView}>
                            <Glyphicon glyph="th" data-key='1'/>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={largeViewPopover}>
                        <Button onClick={this.props.changeToLargeView}>
                            <Glyphicon glyph="th-large" data-key='2'/>
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
}