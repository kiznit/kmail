import PropTypes from 'prop-types';
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Link from './Link';


const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    list: {
        width: 250,
    },
    flex: {
        flex: 1,
    },
});


class NavBar extends React.PureComponent {
    render() {
        const { children, classes, title, titleUrl } = this.props;

        return (
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit">
                        <Icon>menu</Icon>
                    </IconButton>

                    <Typography variant="title" color="inherit" component={Link} to={titleUrl} style={{ textDecoration: 'none' }}>
                        { title }
                    </Typography>

                    <div className={classes.flex} />
                    {children}
                </Toolbar>
            </AppBar>
        );
    }
}


NavBar.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    classes: PropTypes.shape({}).isRequired,
    title: PropTypes.string.isRequired,
    titleUrl: PropTypes.string,
};


NavBar.defaultProps = {
    children: [],
    titleUrl: '/',
};


export default withStyles(styles)(NavBar);
