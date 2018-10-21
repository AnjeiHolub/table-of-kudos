import React, {Component as ReactComponent} from 'react';

export default (OriginalComponent) => class Accordion extends ReactComponent {

    state = {
        openItemId: null
    }

    render () {
        return (
            <div>
                <OriginalComponent 
                    {...this.props} 
                    toggleOpenItem = {this.toggleOpenItem} 
                    openItemId = {this.state.openItemId}
                />
            </div>
        )
    }

    toggleOpenItem = (openItemId) => {
        this.setState({
            openItemId: openItemId === this.state.openItemId ? null : openItemId
        });
    }
}