import PropTypes from 'prop-types';
import React from 'react';
import { Provider as Redux } from 'react-redux';


class App extends React.Component {
    getChildContext() {
        const { history } = this.props;
        return { history };
    }

    render() {
        const { children, store } = this.props;
        return (
            <Redux store={store}>
                { children }
            </Redux>
        );
    }
}


App.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object, // eslint-disable-line
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
};


export default App;
