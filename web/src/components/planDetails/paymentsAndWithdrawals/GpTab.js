import React, { PropTypes } from 'react';
import {get} from 'lodash';
import Currency from '../../common/Currency';

class PensionTab extends React.Component {    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    displayCurrentPayments(currentContributions, tabContent){
        
        const currentPayment = (
            <div className='pes-table-area'>
                <div className='pes-table-list pes-summary-table'>
                    <div className='tlhead'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3'>{tabContent.gpTabPayment}</div>
                            <div className='tlcell col-xs-9'>
                                <div className='row'>
                                    <div className='col-xs-2'>{tabContent.gpTabAmount}</div>
                                    <div className='col-xs-2'>{tabContent.gpTabFrequency}</div>
                                    <div className='col-xs-2'>{tabContent.gpTabPayer}</div>
                                    <div className='col-xs-2'>{tabContent.gpTabIndexation}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tlbody'>
                        {                            
                            currentContributions.map((childContribution, index) =>
                                (
                                    <div className='tlrow' key={index}>
                                        <div className='tlcell col-xs-3'>
                                            {childContribution.contribution}
                                        </div>
                                        <div className='tlcell col-xs-9'>
                                            <div className='row'>
                                                <div className='col-xs-2'>                                                 
                                                    <Currency>{childContribution.amount}</Currency>
                                                </div>
                                                <div className='col-xs-2'>
                                                    {childContribution.frequency}
                                                </div>
                                                <div className='col-xs-2'>
                                                    {childContribution.payer}
                                                </div>
                                                <div className='col-xs-2'>
                                                    {childContribution.indexation}
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

        const noCurrentPayment = ( 
                                    <div className='pes-table-area'>
                                        <div className='pes-table-list'>
                                            <div className='tlbody'>
                                                <div className='tlrow row'>
                                                    <div className='tlcell col-xs-11'>{tabContent.gpTabNoCurrentPayment}</div>
                                                </div>
                                            </div>
                                        </div>
                                     </div>    
                                );

        return (currentContributions && currentContributions.length > 0) ? currentPayment : noCurrentPayment;
    }
    
    render(){
        const currentContributions = get(this.context, 'plan.planDetail.currentContributions');
        const tabContent = get(this.context, 'content.currentPaymentTab');

        return(               
            <div className='pes-table-area'>
                <div className='pes-table-list'>                   
                    {
                        this.displayCurrentPayments(currentContributions, tabContent)
                    }     
                </div>
            </div>
        );
    }   
}

export default PensionTab;