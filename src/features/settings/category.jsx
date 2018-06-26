import PropTypes from 'prop-types';
import React from 'react';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px`,
    },
});


const Category = ({ children, classes, title }) => (
    <div>
        <Typography variant="title" className={classes.title}>
            {title}
        </Typography>
        <List component="nav">
            <Paper>
                { children }
            </Paper>
        </List>
    </div>
);


Category.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    title: PropTypes.string.isRequired,
};


export default withStyles(styles)(Category);

