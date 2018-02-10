import React from 'react';
import { connect } from 'react-redux';


const App = ({ dummy }) => (
    <div>
        <h1>This is the App component {dummy}!!!</h1>
    </div>
);


const mapStateToProps = (state) => ({
    dummy: state.dummy,
});


export default connect(mapStateToProps)(App);
