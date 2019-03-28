import PropTypes from 'prop-types';
import React from 'react';
import HistoryContext from './HistoryContext';


const isLeftClickEvent = event => event.button === 0;

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);


class Link extends React.PureComponent {
    static contextType = HistoryContext;

    handleClick = event => {
        const { href, onClick, replace, target } = this.props;

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
            this.context.history.replace(href);
        } else {
            this.context.history.push(href);
        }
    };


    render() {
        // eslint-disable-next-line no-unused-vars
        const { children, replace, ...props } = this.props;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <a {...props} onClick={this.handleClick}>
                { children }
            </a>
        );
    }
}


Link.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    target: PropTypes.string,
};


Link.defaultProps = {
    onClick: null,
    replace: false,
    target: null,
};


export default Link;
