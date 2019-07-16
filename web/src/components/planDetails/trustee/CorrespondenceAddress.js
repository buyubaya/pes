import React, {PropTypes} from 'react';
import {get} from 'lodash';

class CorrespondenceAddress extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const content = get(this.context, 'content.trusteesTab');
        const item = this.props.item;
        
        return (<div>
            {
                item.addressLine1 && <div className='tlrow row'>
                    <div className='tlcell col-xs-4 text-capitalize'>{content.correspondenceAddress}</div>
                    <div className='tlcell col-xs-4'>{item.addressLine1}</div>
                </div>
            }
            {
                item.addressLine2 && <div className='tlrow row'>
                    <div className='tlcell col-xs-4'></div>
                    <div className='tlcell col-xs-4'>{item.addressLine2}</div>
                </div>
            }
            {
                item.addressLine3 && <div className='tlrow row'>
                    <div className='tlcell col-xs-4'></div>
                    <div className='tlcell col-xs-4'>{item.addressLine3}</div>
                </div>
            }
            {
                item.addressLine4 && <div className='tlrow row'>
                    <div className='tlcell col-xs-4'></div>
                    <div className='tlcell col-xs-4'>{item.addressLine4}</div>
                </div>
            }
            {
                item.postCode && <div className='tlrow row'>
                    <div className='tlcell col-xs-4'></div>
                    <div className='tlcell col-xs-4'>{item.postCode}</div>
                </div>
            }
        </div>);
    }
}

export default CorrespondenceAddress;