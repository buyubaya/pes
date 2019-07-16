import moment from 'moment';
import _ from 'lodash';
export default class IncomePaymentUtils {
    static DataRequest(form, plan) {
        const planInfoTypeDataRequest = this.planInfoTypeDataRequest(plan);
        let dataRequest = {
            planInfoType: planInfoTypeDataRequest,
            distributionChangeType: form.incomeOption            
        };
        if(form.incomeOption !== 'REINVEST_INCOME'){
            _.assign(dataRequest,{                
                paymentType: form.paymentType
            });
            if (form.paymentType === 'CHEQUE') {
                _.assign(dataRequest,{
                    bankDetails: {  
                        buildingSocietyRollNumber: null,
                        bankNameType: null,
                        sortCodeType: null,
                        accountNumberType: null,
                        branchNameType: null,
                        accountHolderName: null
                    },
                    payeeName: form.chequePayeeDetail.payableTo,
                    paymentToOthers: form.chequePayeeDetail.notPlanHolder
                });
            }
            else {
                const bankInfo = this.bankInfoDataRequest(form.payeeDetails);
                _.assign(dataRequest,{
                    planInfoType: planInfoTypeDataRequest,
                    bankDetails: bankInfo,
                    payeeName:null,
                    paymentToOthers:form.payeeDetails.notPlanHolder 
                });
            }
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
            fullPlanName: planDetail.productFullName,
            planStatus: planDetail.planStatus,
            planStartDate: startDate,
            planStartTime: startTime,
            planValuationDate: valuationDate,
            planValuationTime: valuationTime
        };
    
        return planInfoType;
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
}