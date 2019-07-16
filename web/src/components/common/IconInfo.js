import React, {PropTypes} from 'react';
// import {Link} from 'react-router';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

const IconInfo = ({className, section, target, children, tooltip, isLink=true}) => {

    const environment = EnvironmentUtils.get('environment');
    const helpPage = section ? environment.helpPage + section : environment.helpPage;

    return (
    isLink 
    ?
    // <Link 
    //     to={helpPage} 
    //     target={target || '_blank'} 
    //     className={className} 
    //     title={tooltip || 'Click here for further information'}
    // >
    //     <img src={require('../../../assets/images/icon_info.png')} className='pes-icon icon-info' />
    //     {children}
    // </Link> 
    <a 
        target={target || '_blank'} 
        className={className} 
        title={tooltip || 'Click here for further information'}
        href={helpPage}>
        <img src={require('../../../assets/images/icon_info.png')} className='pes-icon icon-info' />
        {children}
    </a>
    : 
    <img className={className ? className + ' pes-icon icon-info' : 'pes-icon icon-info'} src={require('../../../assets/images/icon_info.png')} />
    );
};

IconInfo.propTypes = {
    className: PropTypes.string,
    section: PropTypes.string
};


export default IconInfo;