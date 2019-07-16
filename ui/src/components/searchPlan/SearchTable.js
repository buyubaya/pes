import React from 'react';

import StringUtils from '../../utils/StringUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';
import PdfStatement from '../common/PdfStatement';

import ProductGroups from '../../constants/ProductGroups';

import TabIDs from '../../constants/PlanDetailTabs';
import ServicingUrls from '../../constants/ServicingUrls';
import SecurityUtils from '../../utils/SecurityUtils';
import UrlUtils from '../../utils/UrlUtils';
import AuthUtils from '../../utils/AuthUtils';
import CurtisBankDialog from './CurtisBankDialog';
import TransitionUtils from '../../utils/TransitionUtils';
import IconInfo from '../common/IconInfo';

const displayErrorRow = function(plan){
    return (
        <tr key={plan.planID} className='is-error'>
            <td>{plan.planID}</td>
            <td colSpan='6'>{plan.errorMessage}</td>
        </tr>
    );
};

const displayDetail = function(plan, content, showsummary, showdetailswarning){
    let url = StringUtils.format(ServicingUrls.planDetails, plan.planID, '#' + TabIDs.summary);
    url = UrlUtils.getActualLink(url);
    if(!plan.warning){
        //show summary
        return <li><a href={url}>{content.details}</a></li>;
    }
    else{
        //show details warning
        return <li><a href='#' onClick={() => showdetailswarning(plan)}>{content.details}</a></li>;
    }
};

const dipslayServicing = function(plan, content, showservicing, showservicingwarning){
    let isUserBelongServicing = SecurityUtils.isServicingRole();
    let url = StringUtils.format(ServicingUrls.planDetails, plan.planID, '#' + TabIDs.servicing);
    url = UrlUtils.getActualLink(url);
    //let url = '#';
    if(!plan.warning) {        
        if (plan.productGroup.toUpperCase() != ProductGroups.IPB && isUserBelongServicing /* && user belong to servicing role*/){
            return <li><a href={url}>{content.servicing}</a></li>;
        }
    }
    else {
        if (plan.productGroup.toUpperCase() != ProductGroups.IPB && isUserBelongServicing /* && user belong to servicing role*/){
            return <li><a href='#' onClick={() => showservicingwarning(plan)}>{content.servicing}</a></li>;
        }
    }    
};

const displayNormalRow = function(plan, content, showsummary, showdetailswarning, showservicing, showservicingwarning) {
    return (
        <tr key={plan.planID}>
            <td>{plan.planID}</td>
            <td>{plan.planHolder}</td>
            <td>{plan.productName}</td>
            <td>{plan.currencyCode}</td>
            <td>{StringUtils.numberWithCommas(plan.currentValue)}</td>
            <td>{StringUtils.numberWithCommas(plan.cashinTransfer)}</td>
            <td className='col-details'>
                <ul className='details-list'>
                    {displayDetail(plan, content, showsummary, showdetailswarning)}
                    {dipslayServicing(plan, content, showservicing, showservicingwarning)}
                    <li><PdfStatement plan={plan}>{content.planStatement}</PdfStatement></li>
                </ul>
            </td>
        </tr>
    );
};

class SearchTable extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showCurtisBankDialog: false,
            selectedPlannumber: null
        };             
    }

    submitToCurtisBank(){
        this.setState({showCurtisBankDialog: false});
        let environment = EnvironmentUtils.get('environment');  
        let curtisBankPortalUrl = environment.curtisBankPortalUrl;
        let userInfo = AuthUtils.getUserInfo();
        
        curtisBankPortalUrl = StringUtils.format(environment.curtisBankPortalUrl, (userInfo.fsaNumber? userInfo.fsaNumber: ""), this.state.selectedPlannumber);
        TransitionUtils.navigateTo(curtisBankPortalUrl,'_blank');
    }
    
    openCurtisBankDialog(plan){
        this.setState({showCurtisBankDialog: true});
        this.setState({selectedPlannumber: plan.planID});
    }

    closeCurtisBankDialog(){
        this.setState({showCurtisBankDialog: false});
    }
    
    displaySIP(plan){
        return (
            <tr key={plan.planID} className='is-link'>
                <td>{plan.planID}</td>
                <td colSpan='6'>
                    <a href='#' onClick={() => this.openCurtisBankDialog(plan)} className='has-icon-arrow-right'>
                        {plan.warningMessages[0]}
                    </a>
                </td>
            </tr>
        );
    };

    render() {
        const { plans, content, showsummary, showdetailswarning, showservicing, showservicingwarning } = this.props;
        let isStaff = AuthUtils.isStaff();    

        return (
            <div className='pes-table-area'>
                {<CurtisBankDialog show={this.state.showCurtisBankDialog} 
                                onSubmit={::this.submitToCurtisBank}
                                onClose={::this.closeCurtisBankDialog} 
                                isStaff={isStaff} />}
                <table className='pes-table pes-search-table'>
                    <thead>
                        <tr>
                            <th>
                                <div className='text-capitalize'>{content.planNumber}</div>
                            </th>
                            <th>
                                <div className='text-capitalize'>{content.planHolder}</div>
                            </th>
                            <th>
                                <div className='text-capitalize'>{content.product}</div>
                            </th>
                            <th className='pr-0'>
                                <div className='text-capitalize'>{content.currentValue}</div>
                            </th>
                            <th className='pl-0'><div></div></th>
                            <th>
                                <div>
                                    <span className='d-inline-block text-capitalize'>{content.cashIn} /<br />{content.transferValue}</span>
                                    <span className='d-inline-block align-top ml-10'><IconInfo section='#IPB2' /></span>
                                </div>
                            </th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            plans.map((plan, index) =>
                                {
                                    if (plan.error == true) {
                                        return displayErrorRow(plan);
                                    }
                                    else if (plan.productGroup.toUpperCase() == ProductGroups.SIP) {
                                        return this.displaySIP(plan);
                                    }
                                    else {
                                        return displayNormalRow(plan, content, showsummary, showdetailswarning, showservicing, showservicingwarning);
                                    }
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }    
};

export default SearchTable;
