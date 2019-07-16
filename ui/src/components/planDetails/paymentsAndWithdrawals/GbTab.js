import React, {PropTypes} from 'react';

import Currency from '../../common/Currency';

import {get} from 'lodash';

class GbTab extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render() {
        const content = get(this.context, 'content.investmentAndWithdrawalsTab');
        let totalContributions = get(this.context, 'plan.planDetail.totalContribution');
        let withdrawalInformation = get(this.context, 'plan.planDetail.withdrawalsInformation');

        let isShowContributions = false;
        let isShowWithdrawalInformation = false;

        if(totalContributions != undefined && totalContributions != null){
            isShowContributions = true;
        }        
        
        if(withdrawalInformation != undefined){
            if(withdrawalInformation.length > 0){
               isShowWithdrawalInformation = true;
            }
        }

        return (<div>
            {isShowContributions && 
                <div className='pes-table-list'>
                    <div className='tlbody'>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-4 text-capitalize'>{content.totalPayments}</div>
                            <div className='tlcell col-xs-8'>
                                <span className='has-icon-currency-before'>
                                    {/*StringUtils.numberWithCommas(totalContributions)*/}
                                    <Currency prefix='' digits={2}>{totalContributions}</Currency>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isShowWithdrawalInformation && 
                <div className='pes-table-list'>
                    <div className='tlbody'>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-4 text-capitalize'>{content.withdrawalInformation}</div>
                            <div className='tlcell col-xs-8'>
                                {
                                    withdrawalInformation.map((item, index) => {
                                        return (<div key={index}>{item}</div>);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>);
    }
}

export default GbTab;