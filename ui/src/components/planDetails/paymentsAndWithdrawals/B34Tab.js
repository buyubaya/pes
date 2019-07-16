import React, {PropTypes} from 'react';

import LinkAuthority from '../../common/LinkAuthority';
import Currency from '../../common/Currency';

import StringUtils from '../../../utils/StringUtils';
import ServicingUrls from '../../../constants/ServicingUrls';

import {get} from 'lodash';
import SecurityUtils from '../../../utils/SecurityUtils';

class B34Tab extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){
        const content = get(this.context, 'content.investmentAndWithdrawalsTab');
        let clientAuthorised = get(this.context, 'plan.clientAuthorised');
        let isServicingRole = SecurityUtils.isServicingRole();

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

        const planNumber = get(this.context, 'plan.planDetail.planNumber');
        let regularWithdrawalUrl = StringUtils.format(ServicingUrls.regularWithdrawal, planNumber);
        let distributionUrl = StringUtils.format(ServicingUrls.distribution, planNumber);

        return (<div>
            {isShowContributions && 
                <div className='pes-table-list'>
                    <div className='tlbody'>
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-4 text-capitalize'>{content.totalPayments}</div>
                            <div className='tlcell col-xs-5'>
                                <span className='has-icon-currency-before'>
                                    {/*StringUtils.numberWithCommas(totalContributions)*/}
                                    <Currency prefix='' digits={2}>{totalContributions}</Currency>
                                </span>
                            </div>
                            {
                                isServicingRole && 
                                <div className='tlcell col-xs-3 text-capitalize'>
                                    <LinkAuthority 
                                        link={distributionUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.amendDistributions}
                                    </LinkAuthority>
                                </div>
                            }
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
                            <div className='tlcell col-xs-5'>
                                {
                                    withdrawalInformation.map((item, index) => {
                                        return (<div key={index}>{item}</div>);
                                    })
                                }
                            </div>
                            {
                                isServicingRole && 
                                <div className='tlcell col-xs-3 text-capitalize'>
                                    <LinkAuthority 
                                        link={regularWithdrawalUrl} 
                                        authority={clientAuthorised}
                                        btnClassName='has-icon-arrow-right'
                                        modalClassName='pes-modal pes-authority-modal'>
                                        {content.regularWithdrawals}
                                    </LinkAuthority>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>);
    }
}

export default B34Tab;