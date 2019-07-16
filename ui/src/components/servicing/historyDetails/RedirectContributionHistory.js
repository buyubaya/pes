import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';
import _ from 'lodash';


class RedirectContributionHistory extends React.Component {
    constructor(){
        super();
    }

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };
    _renderFunds=(funds)=>{
        let totalPercentInvestment = funds.reduce(function(a, b) {
            return a + Number.parseFloat(b['percentageInvested']);
        }, 0);
        return(
            <div>
                <div className='tlhead'>   
                    <div className='tlrow'>
                        <div className='tlcell col-xs-10 align-middle text-capitalize'>Fund name</div>
                        {/* <div className='tlcell col-xs-2 text-center align-middle cell-sedol text-capitalize'>SEDOL</div>
                        <div className='tlcell col-xs-2 text-center align-middle cell-panelfund text-capitalize'>Panel fund</div> */}
                        <div className='tlcell col-xs-2 align-middle cell-percentinvested text-capitalize'>Percent invested</div>
                    </div>
                </div> 
                <div className='tlbody'>
                    {funds.map((item, index) => (
                        <div className='tlrow' key={index+1}>
                            <div className='tlcell col-xs-10 input-label text-capitalize'>{item.fundName}</div>
                            {/* <div className='tlcell col-xs-2 text-center cell-sedol'>{item.sedol}</div>}
                            <div className='tlcell col-xs-2 text-center cell-panelfund'>{item.panelFund}</div> */}
                            <div className='tlcell col-xs-2 cell-percentinvestted'>{item.percentageInvested}</div>
                        </div>
                    ))}
                    <div className='tlrow'>
                        <div className='tlcell col-xs-10 input-label text-bold text-capitalize'>Total invested</div>
                        <div className='tlcell col-xs-2 text-bold cell-percentinvestted'>{totalPercentInvestment} %</div>
                    </div>
                </div>
            </div>
        );
    }
    render(){
        const content = _.get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.redirectContribution`);
        let details = JSON.parse(this.context.historyDetails.details);
        
        return (
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div>
                    <div className='pes-page-title text-capitalize'>
                        {_.get(content, 'redirectContributionTitle')}
                    </div>
                    <div className='pes-table-list'>
                        {/* <div className='tlrow'>
                            <div className='tlcell col-xs-12 text-capitalize'>
                                {_.get(content, 'specifyNewContributionAllocation')}<br/>
                                {_.get(content, 'specifyNewContributionAllocationDesc')}
                            </div>
                        </div> */}
                        {!_.isUndefined(details.mfFund) && this._renderFunds(details.mfFund)}
                    </div>
                </div>
            </div>
        );
    }
}


export default RedirectContributionHistory;