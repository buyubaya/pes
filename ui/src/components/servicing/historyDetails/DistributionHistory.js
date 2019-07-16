import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';
import PaymentTypes from '../../../constants/PaymentTypes';
import ServicingTypes  from '../../../constants/ServicingTypes';
import {get as _get} from 'lodash';
import PayeeDetailsHistory from './PayeeDetailsHistory';


class DistributionHistory extends React.Component {
    constructor(){
        super();
    }

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };
    _getDistributionPaymentType=(distributionPaymentType)=>{
        let _value = '';
        switch(distributionPaymentType){
            case PaymentTypes.IMMEDIATELY:
                _value ='Immediately';
                break;
            case PaymentTypes.AFTERNEXT:
                _value = 'After the next distribution';
                break;
        }
        return _value;
    }
    render(){
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.distribution`);
        const servicingActionName = _get(this.context, 'historyDetails.servicingActionName');
        //let distributionOption = this._getDistributionOptionOptionType(servicingActionName);
        let details = JSON.parse(this.context.historyDetails.details);
        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div>
                    <div className='pes-page-title text-capitalize'>
                        {_get(content, 'servicingRequestDetails')}
                    </div>
                    <div className='pes-table-list'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'distributionChangeOption')}
                            </div>
                            <div className='tlcell col-xs-8'>{details.distributionChangeType}</div>
                        </div>
                        {servicingActionName !== ServicingTypes.STOP_DISTRIBUTION && <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize'>
                                {_get(content, 'distributionPaymentOption')}
                            </div>
                            <div className='tlcell col-xs-8'>{this._getDistributionPaymentType(details.distributionPaymentType)}</div>
                        </div>}
                    </div>
                </div>

                {servicingActionName !== ServicingTypes.STOP_DISTRIBUTION && <PayeeDetailsHistory/>}
            </div> 
        );
    }
}

export default DistributionHistory;