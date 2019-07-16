import React, {PropTypes} from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';

import _, {get as _get} from 'lodash';

import ServicingTypes from '../../../constants/ServicingTypes';
import StringUtils from '../../../utils/StringUtils';
import ProductGroups from '../../../constants/ProductGroups';


class SwitchFundHistory extends React.Component {
    constructor(){
        super();
    }

    static contextTypes = {
        content: PropTypes.object,        
        historyDetails: PropTypes.object
    };

  
    displaySwitchFromTypeRow(item, index){
        return (
            <div className='tlbody' key={index}>
                <div className='tlrow'>
                    <div className='tlcell col-xs-6'>{item.fundName}</div>
                    <div className='tlcell col-xs-6'>{item.switchPercentage}</div>
                </div>
            </div>
        );
    }

    displaySwitchFromTypeRowB34(item, index, length, totalCurrentVaue, content){
        return (
            <div className='tlbody' key={index}>  
                <div className='tlcell col-xs-5'>
                    {item.fundName}
                </div>
                <div className='tlcell col-xs-7'>
                    <div className='row'>
                        <div className='col-xs-6'>
                            {item.currentValue ? StringUtils.numberWithCommas(item.currentValue.toFixed(2)) : ''}
                        </div>                          
                        <div className='col-xs-6'>
                            {item.switchPercentage}
                        </div>
                    </div>
                </div>

                {
                (index == length - 1) ?   
                (
                    <div>
                    <div className='tlrow bg-grey-dark'>
                                <div className='tlcell col-xs-5 text-bold text-capitalize'>
                                    {_get(content, 'totalCurrentValueB34')}
                                </div>
                                <div className='tlcell col-xs-7 text bold'>
                                    {StringUtils.numberWithCommas(totalCurrentVaue.toFixed(2))}
                                </div>
                    </div> 
                    <div className='tlrow empty'></div>   
                    </div>                    
                )
                : null                    
            }    
            </div>
        );
    }

    displaySwitchToTypeRow(item, index, length, content, totalInvested){
               
        return (

            <div className='tlbody' key={index}>
                <div className='tlrow'>
                    <div className='tlcell col-xs-5'>{item.fundName}</div>
                    <div className='tlcell col-xs-7'>{item.percentInvested}</div>
                </div>          

                {
                    (index == length - 1) ?   
                    (
                        <div className='tlrow text-bold pes-bg-grey-dark'>
                                    <div className='tlcell col-xs-5 text-bold text-capitalize'>
                                        {_get(content, 'totalInvested')}
                                    </div>
                                    <div className='tlcell col-xs-7 text bold'>{totalInvested + ' %'}</div>
                        </div>
                    )
                    : null                    
                }     
            </div>
        );
    }

    displayRebalanceRow(item, index, length, content, totalCurrentValue, totalNewInvestment, productGroup){
               
        return (

            <div className='tlbody' key={index}>
                <div className='tlrow'>
                    <div className='tlcell col-xs-5'>
                        {item.fundName}
                    </div>
                    <div className='tlcell col-xs-7'>
                        <div className='row'>
                            <div className='col-xs-4'>
                                {item.currentValue}
                            </div>
                            <div className='col-xs-4'>                                
                                {StringUtils.numberWithCommas(item.currentInvestment.toFixed(2))}
                            </div>
                            <div className='col-xs-4'>
                                {item.newInvestment}
                            </div>
                        </div>
                    </div>
                </div>          

                {
                    (index == length - 1) ?   
                    (
                        
                        <div className='tlrow text-bold pes-bg-grey-dark'>
                            <div className='tlcell col-xs-5 text-capitalize'>
                                {   
                                    productGroup.toLowerCase() == ProductGroups.B34.toLowerCase() ? 
                                                                    _get(content, 'totalCurrentValue') :
                                                                    _get(content, 'totalPlanValue')
                                }
                            </div>
                            <div className='tlcell col-xs-7'>
                                <div className='row'>
                                    <div className='col-xs-4'>   
                                        {StringUtils.numberWithCommas(totalCurrentValue.toFixed(2))}
                                    </div>
                                    <div className='col-xs-4 text-capitalize'>
                                        {_get(content, 'totalInvested')}
                                    </div>
                                    <div className='col-xs-4'>
                                        {totalNewInvestment + ' %'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : null                    
                }     
            </div>
        );
    }
    _isContinueRegularContributions(historyDetails){
        let obj = !_.isUndefined(historyDetails.rebalanceFundsRequestInputType) ? historyDetails.rebalanceFundsRequestInputType : historyDetails.fundSwitchRequestInputType;
        return obj.continueRegularContributions == "Yes" || obj.continueRegularContributions == "yes";
    }
    renderSwitchFund(_, content, historyDetails){
        const switchFromType = historyDetails.fundSwitchRequestInputType.switchFromType;
        const switchToType = historyDetails.fundSwitchRequestInputType.switchToType;
        const totalInvested = switchToType.reduce(function (accumulator, item) {
            return accumulator + parseFloat(item.percentInvested);
          }, 0);
        let isContinueRegularContributions = this._isContinueRegularContributions(historyDetails);
        
        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div className='pes-page-title text-capitalize no-line'>
                    {_get(content, 'fundSwitch')}
                </div>
                <div className='pes-section-title text-capitalize mt-0'>
                    {_get(content, 'fundsPercentageForSwitch')}
                </div>
            
                <div className='pes-table-area'>
                    <div className='pes-table-list'>

                        <div className='tlhead'>
                            <div className='tlrow row text-capitalize'>
                                <div className='tlcell col-xs-6'>
                                    {_get(content, 'fundName')}
                                </div>                           
                                <div className='tlcell col-xs-6'>
                                    {_get(content, 'percentSwitch')}
                                </div>
                            </div>
                        </div>

                        {/* To do render switch fund from type row */}
                        {
                            switchFromType ? 
                            switchFromType.map((row, index) => {                               
                                    return this.displaySwitchFromTypeRow (row, index);
                            }) : null
                        }
                    </div>
                </div> 

                <div className='pes-table-area'>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'percentageOfInvestment')}
                    </div>
                    <div className='pes-table-list'>
                        <div className='tlhead'>
                            <div className='tlrow row text-capitalize'>
                                <div className='tlcell col-xs-6'>
                                    {_get(content, 'fundName')}
                                </div>
                                <div className='tlcell col-xs-6'>
                                    {_get(content, 'percentInvested')}
                                </div>
                            </div>
                        </div>


                        {/* To do - render SwitchTotype Row */}
                        {/* {
                            switchToType ? 
                            switchToType.map((row, index) => {
                                return this.displaySwitchToTypeRow (row, index, switchToType.length, content,totalInvested);

                            }) : null
                        } */}


                        {
                             switchToType ? 
                             switchToType.map((row, index) => {
                                 return(                                 
                                    <div className='tlbody' key={index}>
                                    <div className='tlrow'>
                                        <div className='tlcell col-xs-6'>{row.fundName}</div>
                                        <div className='tlcell col-xs-6'>{row.percentInvested}</div>
                                    </div>          
        
                                    {
                                        (index == switchToType.length - 1) ?   
                                        (
                                            <div className='tlrow'>
                                                        <div className='tlcell col-xs-6 text-bold text-capitalize'>
                                                            {_get(content, 'totalInvested')}
                                                        </div>
                                                        <div className='tlcell col-xs-6 text bold'>{totalInvested + ' %'}</div>
                                            </div>
                                        )
                                        : null                    
                                    }     
                                    </div>
                                    );
                             }) : null

                        }
                        
                        
                        {isContinueRegularContributions&&[
                            <div className='tlrow empty pes-text-belt' key={0}></div>,
                            <div className='tlrow' key={1}>
                                <div className='tlcell col-xs-12'>
                                    {_get(content, 'regularContributionText')}
                                </div>
                            </div>
                        ]}
                    </div>
                </div>           
            </div> 
        );
    }

    renderSwitchFundB34(_, content, historyDetails){
        const switchFromType = historyDetails.fundSwitchRequestInputType.switchFromType;
        const switchToType = historyDetails.fundSwitchRequestInputType.switchToType;
        const totalCurrentValue = switchFromType.filter(({currentValue}) => currentValue)        
                                        .reduce(function (accumulator, item) {
                                            return  accumulator + parseFloat(item.currentValue);
                                        }, 0);

        const totalInvested = switchToType.reduce(function (accumulator, item) {
        return accumulator + parseFloat(item.percentInvested);
        }, 0);

        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div className='pes-page-title text-capitalize no-line'>
                    {_get(content, 'fundSwitch')}
                </div>
                <div className='pes-section-title text-normal text-capitalize mt-0'>
                    {_get(content, 'fundsPercentageForSwitch')}
                </div>
            
                <div className='pes-table-area'>
                    <div className='pes-table-list'>

                        <div className='tlhead'>
                            <div className='tlrow row text-capitalize'>
                                <div className='tlcell col-xs-5'>
                                    {_get(content, 'fundName')}
                                </div>    

                                <div className='tlcell col-xs-7'>
                                    <div className='row'>
                                        <div className='col-xs-6'>
                                            {_get(content, 'currentValueSF')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(content, 'percentSwitch')}
                                        </div>                                      
                                    </div>
                                </div>                              
                            </div>
                        </div>

                        {/* To do render switch fund from type row */}
                        {
                            switchFromType ? 
                            switchFromType.map((row, index) => {                               
                                    return this.displaySwitchFromTypeRowB34 (row, index, switchFromType.length, totalCurrentValue, content);
                            }) : null
                        }
                    </div>
                </div> 

                <div className='pes-table-area'>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'percentageOfInvestment')}
                    </div>
                    <div className='pes-table-list'>
                        <div className='tlhead'>
                            <div className='tlrow row text-capitalize'>
                                <div className='tlcell col-xs-5'>
                                    {_get(content, 'fundName')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    {_get(content, 'percentInvestedB34')}
                                </div>
                            </div>
                        </div>


                        {/* To do - render SwitchTotype Row */}
                        {
                            switchToType ? 
                            switchToType.map((row, index) => {
                                return this.displaySwitchToTypeRow (row, index, switchToType.length, content, totalInvested);

                            }) : null
                        }    
                    </div>
                </div>           
            </div> 
        );
    }

    renderRebalanceFund(_, content, historyDetails, productGroup){

        const rebalanceType =  historyDetails.rebalanceFundsRequestInputType.rebalanceType;
        const totalCurrentValue = rebalanceType.reduce(function (sum, item) {
            return sum + parseFloat(item.currentValue);
          }, 0);

        const totalNewInvestment = rebalanceType.reduce(function (sum, item) {
        return sum + parseFloat(item.newInvestment);
        }, 0); 
        let isContinueRegularContributions = this._isContinueRegularContributions(historyDetails);
        return(
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div className='pes-page-title text-capitalize'>
                    {_get(content, 'rebalanceFund')}
                </div>
               
                <div className='pes-table-area'>
                    <div className='pes-table-list'>
                        <div className='tlbody'>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-12'>
                                    {_get(content, 'rebalanceFundInvestment')}  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className='pes-table-area'>
                    <div className='pes-table-list'>

                        <div className='tlhead'>
                            <div className='tlrow row text-capitalize'>
                                <div className='tlcell col-xs-5'>
                                    {_get(content, 'fundName')}
                                </div>
                                <div className='tlcell col-xs-7'>
                                    <div className='row'>
                                        <div className='col-xs-4'>
                                            {_get(content, 'currentValue')}
                                        </div>
                                        <div className='col-xs-4'>
                                            {_get(content, 'currentInvestment')}
                                        </div>
                                        <div className='col-xs-4'>
                                            {
                                                productGroup.toLowerCase() == ProductGroups.B34.toLowerCase() ? 
                                                                                _get(content, 'percentSwitchB34') :
                                                                                _get(content, 'newInvestment')
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* To do render rebalance row */}
                        {
                            rebalanceType ? 
                            rebalanceType.map((row, index) => {
                                return this.displayRebalanceRow (row, index, rebalanceType.length, content, totalCurrentValue, totalNewInvestment, productGroup);

                            }) : null
                        }

                        {
                            productGroup.toLowerCase() != ProductGroups.B34.toLowerCase() && isContinueRegularContributions &&
                            <div>
                                <div className='tlrow empty pes-text-belt'></div>
                                <div className='tlrow'>
                                    <div className='tlcell col-xs-12'>
                                        {_get(content, 'regularContributionText')}
                                    </div>
                                </div>
                            </div>
                        }                       

                    </div>     
                </div>     
            </div> 
        );
    }

    render(){
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.switchFund`);
        let details = _get(this.context, 'historyDetails.details');
        details = details && JSON.parse(details);
        const isSwitchFund = _get(this.context, 'historyDetails.servicingActionName') == ServicingTypes.SWITCH_FUND ? 1 : 0;
        
        if(isSwitchFund) 
        {            
            const productGroup = details.fundSwitchRequestInputType.planInfoType.productGroup;
            if(productGroup.toLowerCase() == ProductGroups.B34.toLowerCase())
                return this.renderSwitchFundB34(_, content, details);
            else 
                return this.renderSwitchFund(_, content, details);
        }            
        else    
        {
            const productGroup = details.rebalanceFundsRequestInputType.planInfoType.productGroup;
            return this.renderRebalanceFund(_, content, details, productGroup);
        }    
    }
}


export default SwitchFundHistory;