import moment from 'moment';
export default class SwitchFundUtils {
    static DataRequest(form, plan) {
        const planInfoTypeDataRequest = this.planInfoTypeDataRequest(plan);        
        let dataRequest = {
            planInfoType: planInfoTypeDataRequest
        };
        _.assign(dataRequest,{
            mfFund: this.fmFund(form.selectedFunds)            
        }); 
        return dataRequest;
    }
    
    static fmFund(funds){
        let _mfFunds = [];
        funds.forEach(function(item, idx){            
            _mfFunds.push({
                fundName: item.fundName,
                percentageInvested: (!_.isUndefined(item.percentInv) && !_.isEmpty(item.percentInv)) ? Number.parseFloat(item.percentInv) : 0,
                amount: 0,/*Number(item.value|0),*/
                sedol: item.sedolCode,
                panelFund: item.isPanelFund
            });
        });
        return _mfFunds;
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
}