import _ from 'lodash';
//import { get } from 'https';
import RegularWithdrawalUtils from '../pages/servicing/RegularWithdrawalUtils';
export const isBlank = msg => value => value ? undefined : msg;
export const isBlankAmountEachYear = value => value ? undefined : 'Amount each year has been selected but no amount has been input';
export const isNotNumberic = value => isNaN(Number(value)) ? 'This field must be numeric' : undefined;
export const isNotNumbericTIP = value => isNaN(Number(value)) ? 'Amount each year must be numeric' : undefined;

export const equalTotalFunds = (amountEachYear, totalFunds) => value => value === (amountEachYear / totalFunds) * 100 ? undefined : 'Percentage each year is invalid';

export const notInRange = (start, end, msg) => value => value >= start && value <= end ? undefined : msg;

export const notInRange075 = notInRange(0.1, 7.5, 'The amount requested must be between 0.1% and 7.5% of the total plan value');
export const notInRange010 = notInRange(0.1, 10, 'Please enter annual percentage increase between 0% and 10%');
export const notInRange010GMF = notInRange(0.1, 10, 'Please enter an Annual percentage increase amount between 0.1% and 10%');
export const notInRangeDef = notInRange(0.1, 99.9, 'Please enter annual percentage increase between 0.1% and 100%');
export const notInRangeDefFund = notInRange(0, 100, 'Withdrawal amount must not exceed the total value of the fund.');

// export const amountExceedsMax = (totalFunds) => value => {
//     const per = (value / totalFunds) * 100;
//     return per >= 0 && per <= 7.5 ? undefined : 'Please enter a lower amount as the amount entered exceeds the maximum allowed.';
// };
export const amountExceedsMax = (value, allValues, props, name) => {
    const totalFunds = RegularWithdrawalUtils.sumArrayValues(allValues.funds, 'value');
    const per = (value / totalFunds) * 100;    
    return per >= 0.1 && per <= 7.5 ? undefined : 'The amount requested must be between 0.1% and 7.5% of the total plan value';
};
// export const amountExceedsMaxTIP = (totalFunds) => value => {
//     const per = (value / totalFunds) * 100;
//     return per >= 0.1 && per <= 7.5 ? undefined : 'The amount requested must be between 0.1% and 7.5% of the total plan value';
// };
export const amountExceedsMaxTIP = (value, allValues, props, name) => {
    const totalFunds = RegularWithdrawalUtils.sumArrayValues(allValues.funds, 'value');
    const per = (value / totalFunds) * 100;
    return per >= 0.1 && per <= 7.5 ? undefined : 'The amount requested must be between 0.1% and 7.5% of the total plan value';
};
// export const amountExceedsMaxFund = (max) => value => {
//     console.log(max);
//     if (!!value) {
//         return (value.length === 0 || (value >= 0 && value <= max)) ? undefined : 'Withdrawal amount must not exceed the total value of the fund.';
//     }
// };
export const amountExceedsMaxFund = (value, allValues, props, name) =>{
    if (!!value) {        
        let max = _.get(allValues,name.split('.')[0]).value;
        return (value.length === 0 || (value >= 0 && value <= max)) ? undefined : 'Withdrawal amount must not exceed the total value of the fund.';
    }
}

export const amountExceedsMaxFundTIP = (value, allValues, props, name) =>{
    if (!!value) {
        let max = _.get(allValues,name.split('.')[0]).value;
        return (value.length === 0 || (value >= 0 && value <= max)) ? undefined : 'Withdrawal Amount must be between 0 and total fund value.';
    }
}

export const notSelected = msg => value => value && value.length > 0 ? undefined : msg;

function GetNextDayWorking(afterDay){
    const date = new Date();
    let nextWorkingDate = "", count = 0;

    while(count < afterDay){
        nextWorkingDate = new Date(date.setDate(date.getDate() + 1));
        if(nextWorkingDate.getDay() != 0 && nextWorkingDate.getDay() != 6){
            count++;
        }
    }
    return nextWorkingDate;
}
export const startDateInRange = value => {
    if (!value) {
        return 'Start date must be entered';
    }
    const temp = value.split('/');
    const inputDate =  new Date(temp[2], Number(temp[1]) - 1, temp[0]);
    let startDate = GetNextDayWorking(5);    
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const endDate = new Date(y + 1, m, d);
    
    if (startDate < inputDate && inputDate < endDate) {
        return undefined;
    }
    else {
        return 'The Start Date must be between 5 working days and one year in advance of today\'s date';
    }
};
