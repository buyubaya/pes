import React, { PropTypes } from 'react';
import ProductGroups from '../../../constants/ProductGroups';
import IconInfo from '../../common/IconInfo';
import DateFormat from '../../common/DateFormat';
import Currency from '../../common/Currency';

const GetHelpLink = (planDetail, contributionDetail, z016Warning) => {
    let helpLink = '#A9';

    if (planDetail.productName.toLowerCase() === 'zurich personal pension transfer plan') {
        helpLink = '#A8';
    }
    else {
        let compare = contributionDetail.transferValue.toString().localeCompare(contributionDetail.currentValue.toString());

        if (compare === 0 && z016Warning && planDetail.originalXMLProductProviderName === 'Eagle Star' && planDetail.schemeMatch) {
            helpLink = '#C7';
        }
        else if (compare !== 0 && z016Warning && planDetail.originalXMLProductProviderName === 'Eagle Star' && planDetail.schemeMatch) {
            helpLink = '#C9';
        }
        else if (compare >= 0 && !z016Warning && planDetail.originalXMLProductProviderName === 'Eagle Star') {
            helpLink = '#C5';
        }
        else if (compare === -1 && !z016Warning && planDetail.originalXMLProductProviderName === 'Eagle Star') {
            helpLink = '#C6';
        }
        else if (compare >= 0 && !z016Warning) {
            helpLink = '#B1';
        }
        else if (compare === -1 && !z016Warning) {
            helpLink = '#B2';
        }
        else if (compare === 0 && z016Warning) {
            helpLink = '#C8';
        }
        else if (compare !== 0 && z016Warning) {
            helpLink = '#A1';
        }
    }

    return helpLink;
};

const RetirementSection = (props) => {
    const {content, plan} = props.context;
    const planDetail = plan.planDetail;
    
    let isVisible = false;
    if (!!planDetail.retirementAge && planDetail.retirementAge !== '0') {
        isVisible = true;
        // switch (plan.productGroupType) {
        //     case ProductGroups.GP:
        //     case ProductGroups.TIP:
        //         isVisible = true;
        //         break;
        // }
    }

    if (isVisible) {
        return (
            <li className='row mx-0'>
                <div className='col-xs-3 valuation-title'>
                    {content.summaryTab.retirementAge}
                    {/* {(plan.productGroupType === ProductGroups.TIP) && 
                        <IconInfo tooltip={content.summaryTab.toolTip} section='#A010' className='ml-20' />
                    } */}
                </div>
                <div className='col-xs-9 valuation-value'>
                    <span>{planDetail.retirementAge}</span>
                </div>
            </li>
        );
    }
    
    return null;
};

const ValidationSection= (props) => {
    const {content, plan} = props.context;
    
    const planDetail = plan.planDetail;
    let valuationDateValue = null;
    switch (plan.productGroupType) {
        case ProductGroups.B34:
        case ProductGroups.GB:
            valuationDateValue = planDetail.valuationDate !== null ? planDetail.valuationDate : Date.now();
            break;
        case ProductGroups.GP:
        case ProductGroups.TAI:
        case ProductGroups.TIP:
        case ProductGroups.GMF:
            valuationDateValue = planDetail.valuationDate !== null ? planDetail.valuationDate : null;
            break;
    }
    if (valuationDateValue) {
        return (
            <li className='row mx-0'>
                <div className='col-xs-3 valuation-title'>
                    {content.summaryTab.valuationDate}
                </div>
                <div className='col-xs-9 valuation-value'>
                    <DateFormat>{valuationDateValue}</DateFormat>
                </div>
            </li>
        );
    }
    
    return null;
};

const CurrentValueSection = (props) => {
    const {content, plan} = props.context;
    
    const planDetail = plan.planDetail;
    if (planDetail.currentValue !== null) {
        let toolTipTitle = '';
        let helpLink = '';
        let isVisible = false;
        let isCurrencyAvailable = false;
        switch (plan.productGroupType) {
            case ProductGroups.B34:
            case ProductGroups.GB:
            case ProductGroups.GMF:
                toolTipTitle = content.summaryTab.toolTip;
                helpLink = '#A4';
                if (planDetail.originalProductProviderName && planDetail.originalProductProviderName.startsWith('Sterling')) {
                    helpLink = '#A3';    
                }
                isVisible = true;
                break;
            case ProductGroups.IPB:
                toolTipTitle = content.summaryTab.ipbToolTip;
                helpLink = '#IPB3';
                isVisible = true;
                isCurrencyAvailable = true;
                break;
        }
        if (isVisible) {
            return (
                (isCurrencyAvailable &&
                    <li className='row mx-0'>
                        <div className='col-xs-2 valuation-title'>
                            {content.summaryTab.currentValue}
                            <IconInfo tooltip={toolTipTitle} section={helpLink} className='ml-20' />
                        </div>
                        <div className='col-xs-1 valuation-title'>
                            <span>{planDetail.planCurrency}</span>
                        </div>
                        <div className='col-xs-9 valuation-value'>
                            <Currency prefix='' digits={2}>{planDetail.currentValue}</Currency>
                        </div>
                    </li>
                ) ||
                <li className='row mx-0'>
                    <div className='col-xs-3 valuation-title'>
                        {content.summaryTab.currentValue}
                        <IconInfo tooltip={toolTipTitle} section={helpLink} className='ml-20' />
                    </div>
                    <div className='col-xs-9 valuation-value'>
                        <Currency digits={2}>{planDetail.currentValue}</Currency>
                    </div>
                </li>
            );
        }
    }
    
    return null;
};

const CashInValueSection = (props) => {
    const {content, plan} = props.context;
    
    const planDetail = plan.planDetail;
    if (planDetail.currentValue !== null) {
        let helpLink = '';
        let cashInValue = '';
        let isVisible = false;
        let isIconVisible = false;
        switch (plan.productGroupType) {
            case ProductGroups.B34:
            case ProductGroups.GB:
                if (planDetail.surrenderValue) {
                    if (planDetail.surrenderValue !== planDetail.currentValue) {
                        helpLink = '#A6';
                        isIconVisible = true;
                    }
                    cashInValue = planDetail.surrenderValue;
                    isVisible = true;
                }                
                break;
            case ProductGroups.GMF:
                if (planDetail.currentValue) {
                    if (planDetail.warning) {
                        planDetail.warning.map(item => {
                            if (item.code) {
                                if (item.code.toLowerCase() !== 'z016') {
                                    isIconVisible = true;
                                }                                
                                else {
                                    isIconVisible = false;
                                    return;
                                }
                            }
                        });
                    }

                    if (isIconVisible) {    
                        helpLink = '#A5';
                    }
                    cashInValue = planDetail.currentValue;
                    isVisible = true;
                }
                break;
        }
        if (isVisible) {
            return (
                <li className='row mx-0'>
                    <div className='col-xs-3 valuation-title'>
                        {content.summaryTab.cashinValue}
                        {/* {isIconVisible &&
                            <IconInfo tooltip={content.summaryTab.toolTip} section={helpLink} className='ml-20' />
                        } */}
                    </div>
                    <div className='col-xs-9 valuation-value'>
                        <Currency digits={2}>{cashInValue}</Currency>
                    </div>
                </li>
            );
        }
    }
    
    return null;
};

const ContributionDetailSection = (props) => {
    const {content, plan} = props.context;
    
    const planDetail = plan.planDetail;    
    let valueDetails;
    let isVisible = false;
    switch (plan.productGroupType) {
        case ProductGroups.GP:
        case ProductGroups.TAI:
            if (planDetail.contributionDetail && planDetail.contributionDetail.length > 0) {
                let z016Warning = false;
                if (planDetail.warning) {
                    planDetail.warning.map(item => {
                        if (item.code) {
                            if (item.code.toLowerCase() === 'z016') {
                                z016Warning = true;
                                return;
                            }
                        }
                    });
                }

                valueDetails = planDetail.contributionDetail.map(itemDetail => ({
                    type: itemDetail.type,
                    currentValue: itemDetail.currentValue,
                    transferValue: itemDetail.transferValue,
                    helpLink: GetHelpLink(planDetail, itemDetail, z016Warning)
                }));
                isVisible = true;
            }
            break;
        case ProductGroups.TIP:
            if (planDetail.fundEquity && planDetail.fundEquity.length > 0) {
                valueDetails = planDetail.fundEquity.map(itemDetail => ({
                    type: itemDetail.fundType,
                    currentValue: itemDetail.totalCurrentValue,
                    transferValue: itemDetail.totalTransferValue,
                    helpLink: '/tip#A001'
                }));
                isVisible = true;
            }
            break;
    }
    if (isVisible) {
        return (
            <div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3'></div>
                            <div className='tlcell col-xs-9'>
                                <div className='row list-of-5'>
                                    <div className='col-xs-2'>
                                        {content.summaryTab.currentValue}
                                    </div>
                                    <div className='col-xs-2'>
                                        {content.summaryTab.transferValue}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='tlbody'>
                    {
                        valueDetails.map((item, index) => (
                            <div className='tlrow' key={index}>
                                <div className='tlcell col-xs-3 clearfix'>
                                    {item.type === 'Protected Rights' ? 'Former Protected Rights' : item.type}
                                    <IconInfo 
                                        tooltip={content.summaryTab.toolTip} 
                                        section={item.helpLink} 
                                        className='pull-right' 
                                    />
                                </div>
                                <div className='tlcell col-xs-9'>
                                    <div className='row list-of-5'>
                                        <div className='col-sm-2 col-xs-3'>
                                            <Currency digits={2}>{item.currentValue}</Currency>
                                        </div>
                                        <div className='col-sm-2 col-xs-3'>
                                            <Currency digits={2}>{item.transferValue}</Currency>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )   
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
    
    return null;
};

class ValuationSummary extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render() {
        if (this.context.plan.planDetail === undefined) return null;

        return(
            <div className='pes-valuation-area ovf-h'>
                <ul className='pes-valuation-list list-none pes-summary-table'>
                    <RetirementSection context={this.context} />
                    <ValidationSection context={this.context} />
                    <CurrentValueSection context={this.context} />
                    <CashInValueSection context={this.context} />
                    <ContributionDetailSection context={this.context} />
                </ul>
            </div>
        );
    }
}

export default ValuationSummary;