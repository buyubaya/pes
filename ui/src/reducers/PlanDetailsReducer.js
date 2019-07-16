import _ from 'lodash';
import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function PlanDetailsReducer(state = InitialState.plan, action) {
	switch (action.type) {
		case types.PLAN_GET_SUCCESS:
			return action.payload;
		case types.WITHDRAWAL_GET_SUCCESS:
			const previousStateClone = _.cloneDeep(state);
			const newWithdrawalPaymentPlans = action.payload;

			previousStateClone.planDetail.investmentAndWithdrawal.withdrawalPaymentPlans = newWithdrawalPaymentPlans;
			return previousStateClone;
		default:
			return state;
	}
}
