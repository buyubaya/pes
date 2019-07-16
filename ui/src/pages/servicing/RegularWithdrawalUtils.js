import React from 'react';
import moment from 'moment';

export default class RegularWithdrawalUtils {

    static regularWithdrawalDataRequest(form, plan) {
        const planInfoTypeDataRequest = this.planInfoTypeDataRequest(plan);
        let dataRequest = null;

        if (form.withdrawalOption === 'remove') {
            dataRequest = {
                planInfoType: planInfoTypeDataRequest,
                dateSubmitted: null,// current date
            };
        }
        else {
            const isPercentageFund = plan.productGroupType === 'GMF' && form.withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE' && form.regularWithdrawalType === 'FROM_SPECIFIC_FUNDS';
            const regularWithdrawalDetailsTypeDataRequest = this.regularWithdrawalDetailsTypeDataRequest(form, isPercentageFund);
            const bankInfo = this.bankInfoDataRequest(form.payeeDetails);

            dataRequest = {
                planInfoType: planInfoTypeDataRequest,
                regularWithdrawalType: form.regularWithdrawalType,
                regularWithdrawalDetailsType: regularWithdrawalDetailsTypeDataRequest,
                dateSubmitted: null,// current date
                bankAccountType: bankInfo
            };
        }
    
        return dataRequest;
    }

    static planInfoTypeDataRequest(plan) {
        const planDetail = plan.planDetail;
        const startDateFull = planDetail.planStartDate || null;
        const valuationDateFull = planDetail.statementValuationDate || null;
        let startDate = null;
        let startTime = null;
        let valuationDate = null;
        let valuationTime = null;

        if (startDateFull) {
            startDate = moment(startDateFull).format('DD/MM/YYYY');
            startTime = moment(startDateFull).format('HH:mm');
        }

        if (valuationDateFull) {
            valuationDate = moment(valuationDateFull).format('DD/MM/YYYY');
            valuationTime = moment(valuationDateFull).format('HH:mm');
        }

        const planInfoType = {
            planID: planDetail.planNumber,
            productGroup: plan.productGroupType,
            productType: plan.productType,
            planHolderName: planDetail.planHolders.length > 1 ? planDetail.firstPlanHolderName : planDetail.planHolders[0].name,
            firstPlanHolderName: planDetail.planHolders.length > 1 ? planDetail.firstPlanHolderName : null,
            fullPlanName: plan.productGroupType === 'TIP'? 'Zurich Trustee Investment Plan' : planDetail.productFullName,
            planStatus: planDetail.planStatus,
            planStartDate: startDate,
            planStartTime: startTime,
            planValuationDate: valuationDate,
            planValuationTime: valuationTime
        };
    
        return planInfoType;
    }

    static regularWithdrawalDetailsTypeDataRequest(form, isPercentageFund) {
        const funds = form.funds.map(fund => ({
                currentFundName: fund.name,
                currentValue: fund.value,
                withdrawal: isPercentageFund ? fund.withrawalAmountPer : fund.withrawalAmount 
        }));
        const dataRequest = {
            amountEachPayment: form.amountEachYear,
            percentageFundValue: isPercentageFund ? form.totalWithdrawalAmountPer : form.percentageEachYear,
            increasePercentage: form.annualPerIncrease,
            startDate: form.startDate ? form.startDate : null,
            fundSpecificWithdrawalType: funds,
            payeeDetailsType: form.payeeDetails.notPlanHolder,
            typeOfWithdrawal: form.withdrawalType,
            frequencyOfWithdrawal: form.withdrawalFrequency,
            firstMonthOfPayment: form.monthOfFirstPayment ? form.monthOfFirstPayment : null,
            increaseBasis: form.withdrawalIncrease
        };

        return dataRequest;
    }

    static bankInfoDataRequest(data) {
        const bankInfo = {
            buildingSocietyRollNumber: data.buildingNumber,
            bankNameType: data.bankName,
            sortCodeType: data.sortCode,
            accountNumberType: data.accountNumber,
            branchNameType: data.branchName,
            accountHolderName: data.accountHolderName
        };

        return bankInfo;
    }

    static sumArrayValues(items, prop) {
        if (items) {
            if (items.length === 0) {
                return 0;
            }

            return items.reduce(function(prev, curr) {
                if (Number.isNaN(prev) || Number.isNaN(curr[prop])) {
                    return 0;
                }
                const val = prev + Number.parseFloat(curr[prop]);

                return val;
            }, 0);
        }

        return 0;
    }
}