import React, {PropTypes} from 'react';
import moment from 'moment';

const DateFormat = ({children, format}) => (
    <span>{moment(children).format(format)}</span>
);

DateFormat.propTypes = {
    format: PropTypes.string.isRequired
};

DateFormat.defaultProps = {
    format: 'DD/MM/YYYY'
};

export default DateFormat;