import React, {PropTypes} from 'react';
import {map as _map, isArray as _isArray, isString as _isString, isEmpty as _isEmpty} from 'lodash';


const FormErrorArea = ({title, error, className}) => {
    let content = null;

    if(error){
        if(_isString(error) && !_isEmpty(error)){
            content = (
                <ul className={className ? 'pes-error-area' + className : 'pes-error-area'}>
                    <li>{error}</li>
                </ul>
            );
        }

        if(_isArray(error) && !_isEmpty(error)){
            content = (
                <ul className={className ? 'pes-error-area' + className : 'pes-error-area'}>
                    {
                        _map(error, (item, index) =>
                            <li key={index}>{item}</li>
                        )
                    }
                </ul>
            );
        } 
    }

    content = content 
    ?
    (
        <div className={className}>
            {title && <div className='pes-text-belt color-error'>{title}</div>}
            {content}
        </div>
    )
    :
    null;

    return content;
};


PropTypes.propTypes = {
    error: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
    className: PropTypes.string
};


export default FormErrorArea;