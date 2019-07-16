import React, {PropTypes} from 'react';
import {get} from 'lodash';
import Currency from '../../../common/Currency';
import LinkAuthority from '../../../common/LinkAuthority';
import ServicingUrls from '../../../../constants/ServicingUrls';
import StringUtils from '../../../../utils/StringUtils';
import {UserGroups} from '../../../../constants/UserGroups';

class Bond34FundSummary extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        userinfo: PropTypes.object
    }

    render(){
        const planId = get(this.context, 'plan.planDetail.planNumber');
        const tabContent = get(this.context, 'content.summaryTab');
        const funds = get(this.context, 'plan.planDetail.funds');
        const clientAuthorised = get(this.context, 'plan.clientAuthorised');
        let userGroups = get(this.context, 'userinfo.userGroups');
        let isServicingRole;
        if(userGroups){
            isServicingRole = userGroups.includes(UserGroups.SERVICING);
        } 


        return(
            (funds && funds.length > 0)
            ?
            (<div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 cell-fundname'>{tabContent.fund}</div>
                            <div className='tlcell col-xs-9 cell-funddetails'>
                                <div className='row'>
                                    <div className='col-xs-3 text-right cell-units'>{tabContent.units}</div>
                                    <div className='col-xs-2 text-right cell-unitprice'>{tabContent.unitPrice}</div>
                                    <div className='col-xs-2 text-right cell-value'>{tabContent.value}</div>
                                    {
                                        isServicingRole &&
                                        [
                                            <div className='col-xs-2 text-normal text-center cell-switchfund' key={0}>
                                                <LinkAuthority 
                                                    link={StringUtils.format(ServicingUrls.switchFund, planId)}
                                                    authority={clientAuthorised}
                                                    btnClassName='has-icon-arrow-right'
                                                    modalClassName='pes-modal pes-authority-modal'>
                                                    {tabContent.switchFunds}
                                                </LinkAuthority>
                                            </div>
                                            ,
                                            <div className='col-xs-2 text-normal text-center cell-surrender' key={1}>
                                                <LinkAuthority 
                                                    link={StringUtils.format(ServicingUrls.surrender, planId)}
                                                    authority={clientAuthorised}
                                                    btnClassName='has-icon-arrow-right'
                                                    modalClassName='pes-modal pes-authority-modal'>
                                                    {tabContent.surrender}
                                                </LinkAuthority>
                                            </div>
                                        ]
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='tlbody'>
                        {
                            funds.map((item, index) => (
                                <div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-3 cell-fundname'>
                                        {item.name}
                                    </div>
                                    <div className='tlcell col-xs-9 cell-funddetails'>
                                        <div className='row'>
                                            <div className='col-xs-3 text-right cell-units'>
                                                {Number(item.noOfUnits).toFixed(3)}
                                            </div>
                                            <div className='col-xs-2 text-right cell-unitprice'>
                                                <Currency digits={3}>{item.unitPrice}</Currency>
                                            </div>
                                            <div className='col-xs-2 text-right cell-value'>
                                                <Currency>{item.value}</Currency>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>)
            :
            null
        );
    }
}

export default Bond34FundSummary;