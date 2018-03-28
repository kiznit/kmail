import PropTypes from 'prop-types';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';


const NoScript = (props) => (
    <noscript dangerouslySetInnerHTML={{ __html: renderToStaticMarkup(props.children) }} />
);


NoScript.propTypes = {
    children: PropTypes.node.isRequired,
};


export default NoScript;
