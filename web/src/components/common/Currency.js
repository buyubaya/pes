import React, {PropTypes} from 'react';

const Currency = ({children, prefix, digits}) => {
    children = children && children.toString().replace(/,/g, '');

    return(
        isNaN(children)
        ?
        null
        :
        (<span>
            {prefix + Number(children).toLocaleString(navigator.language, {minimumFractionDigits: digits})}
        </span>)
    );
};

Currency.propTypes = {
    prefix: PropTypes.string,
    digits: PropTypes.number
};

Currency.defaultProps = {
    prefix: '£',
    digits: 2
};

export default Currency;