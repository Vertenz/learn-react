import React from 'react';
import '../App.css'
import PropTypes from 'prop-types';
import Button from "./Ui/Button";

ProjectBlock.propTypes = {
    project: PropTypes.object
};

function ProjectBlock(props) {
    return (
        <div className='project-block'>
            <h2 className='project-block__h'>{props.project.name}</h2>
            <i className='project-block__year'>{props.project.year}</i>
            <p className='project-block__description'>{props.project.description}</p>
            <div className="button-section">
                <Button text='Open Github' link={props.project.link} dis={true} />
                <Button text='Open demo' link={props.project.page} dis={props.project.page} />
            </div>
        </div>
    );
}

export default ProjectBlock;
