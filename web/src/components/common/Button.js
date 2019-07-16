import React from 'react';


const Button = ({type, label, className, onClick, disabled, link}) => (
    link
    ?
    <a href={link} className={className} disabled={disabled} onClick={onClick}>
        <span>{label}</span>
    </a>
    :
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
        <span>{label}</span>
    </button>
);


export default Button;
