import PropTypes from 'prop-types';
import React from 'react';

import history from '../history';


const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);


class Link extends React.PureComponent {
    handleClick = (event) => {
        const { onClick, replace, target, to } = this.props;

        if (onClick) {
            onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        if (target) {
            return;
        }

        event.preventDefault();

        if (replace) {
            history.replace(to);
        } else {
            history.navigate(to);
        }
    };


    render() {
        const { to, children, replace, ...props } = this.props; // eslint-disable-line no-unused-vars

        return (
            <a href={to} {...props} onClick={this.handleClick}>
                { children }
            </a>
        );
    }
}


Link.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    target: PropTypes.string,
    to: PropTypes.string.isRequired,
};


Link.defaultProps = {
    onClick: null,
    replace: false,
    target: null,
};


export default Link;
