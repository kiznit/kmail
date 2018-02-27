import PropTypes from 'prop-types';
import React from 'react';

import history from '../history';


const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);


class Link extends React.Component {

    handleClick = event => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();
        history.push(this.props.to);
    };


    render() {
        const { to, children, ...props } = this.props;

        return (
            <a href={to} {...props} onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}


Link.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
};


Link.defaultProps = {
    onClick: null,
};


export default Link;
