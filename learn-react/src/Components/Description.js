import React from 'react';
import PropTypes from 'prop-types';
import '../App.css'

Description.propTypes = {
    description: PropTypes.string
};

function Description(props) {
    return (
        <div id='description' className='description'>
            <q>practice makes perfect</q>
            <h2>{props.description}</h2>
        </div>
    );
}

export default Description;
