import React from 'react';


function Button(props) {
    return (
        props.dis ? <button><a href={props.link} className='btn' target='_blank' rel="noreferrer">{props.text}</a></button> :
            <button className='btn btn_off' disabled>{props.text}</button>
    )
}

export default Button;
