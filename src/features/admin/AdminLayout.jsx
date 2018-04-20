import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import NavBar from '../../components/NavBar';
import createTheme from './theme';

const theme = createTheme();


class AdminLayout extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <NavBar title="KMail - Admin" titleUrl="/admin"/>
            </MuiThemeProvider>
        );
    }
}


AdminLayout.propTypes = {

};


export default connect()(AdminLayout);
