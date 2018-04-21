import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { MuiThemeProvider } from 'material-ui/styles';

import NavBar from '../../components/NavBar';
import createTheme from './theme';

import { logout } from '../auth/actions';

const theme = createTheme();


class AdminLayout extends React.PureComponent {
    render() {
        const { dispatch } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <NavBar title="KMail - Admin Panel" titleUrl="/admin">
                    <Tooltip id="tooltip-logout" title="Logout">
                        <IconButton color="inherit" onClick={() => dispatch(logout())}>
                            <Icon>exit_to_app</Icon>
                        </IconButton>
                    </Tooltip>
                </NavBar>
            </MuiThemeProvider>
        );
    }
}


AdminLayout.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(AdminLayout);
