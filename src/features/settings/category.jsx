import PropTypes from 'prop-types';
import React from 'react';

import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';


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

