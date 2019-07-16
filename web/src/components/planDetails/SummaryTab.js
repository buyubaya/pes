import React, { PropTypes } from 'react';

import ValuationSummary from './summary/ValuationSummary';
import FundSummary from './summary/FundSummary';
import AssetDetails from './summary/AssetDetails';
import DepositAccounts from './summary/DepositAccounts';
import TradingCashAccount from './summary/TradingCashAccount';
import TransactionAccount from './summary/TransactionAccount';

import {get} from 'lodash';


class SummaryTab extends React.Component {    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render() {
        const productGroup = get(this.context, 'plan.productGroupType');
        const depositAccounts = get(this.context, 'plan.planDetail.depositAccounts');
        const tradingCashTransactions = get(this.context, 'plan.planDetail.tradingCashTransactions');
        const transactionAccounts = get(this.context, 'plan.planDetail.transactionAccounts');

		return (
            <div>
                <ValuationSummary />

                {
                    productGroup === 'IPB' && <AssetDetails />
                }
                <FundSummary />
                {
                    depositAccounts && 
                    depositAccounts.length > 0 && 
                    <DepositAccounts />
                }
                {
                    tradingCashTransactions && 
                    tradingCashTransactions.length > 0 &&
                    <TradingCashAccount />
                }
                {
                    transactionAccounts && 
                    transactionAccounts.length > 0 && 
                    <TransactionAccount />
                }
            </div>
		);
	}
}


export default SummaryTab;