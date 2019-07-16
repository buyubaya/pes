import moment from 'moment';
import ProductGroups from '../../constants/ProductGroups';
import _ from 'lodash';
export default class SwitchFundUtils {
    static sumArrayValues(items, prop) {
        if (items) {
            if (items.length === 0) {
                return 0;
            }

            return items.reduce(function(a, b) {
                return a + Number.parseFloat(b[prop]);
            }, 0);
        }

        return 0;
    }
    static DataRequest(form, plan) {
        const planInfoTypeDataRequest = this.planInfoTypeDataRequest(plan);
        let productGroupType = plan.productGroupType.toLowerCase();
        let dataRequest = {
            planInfoType: planInfoTypeDataRequest,
            continueRegularContributions: (productGroupType === ProductGroups.B34.toLowerCase() || productGroupType === ProductGroups.TIP.toLowerCase()) ? null : 
                (form.continueRegularContributions == true ? 'Yes':null)
        };
        if(form.switchFundOption === 'fromSpecifiedFunds'){
            _.assign(dataRequest,{
                switchFromType: this.switchFromType(productGroupType, form.funds),
                currentFunds: this.currentValue(form.funds),
                switchToType: this.switchToType(productGroupType, _.isUndefined(form.selectedFunds)? [] : form.selectedFunds)                 
            }); 
            dataRequest = {
                fundSwitchRequestInputType: dataRequest,
                iSINCode: this.iSINCode(_.isUndefined(form.selectedFunds)?[]:form.selectedFunds),
                fundCode: this.fundCode(form.funds)
            };          
        }else{
            _.assign(dataRequest,{
                rebalanceType: this.rebalanceType(productGroupType, form.funds)
            });
            dataRequest = {
                rebalanceFundsRequestInputType: dataRequest,
                productVariantName: plan.planDetail.productVariantName
            };
        }
        return dataRequest;
    }
    
    static switchFromType(productGroupType, funds){
        let _switchFromType = [];        
        funds.forEach(function(item, idx){
            _switchFromType.push({
                fundName: item.name,
                switchPercentage: (!_.isUndefined(item.switch) && !_.isEmpty(item.switch)) ?
                    (productGroupType === ProductGroups.B34.toLowerCase() ? Number(item.switch|0) : Number.parseFloat(item.switch)) : 0,
                currentValue: item.value,
                fundCode: item.fundCode
            });
        });
        return _switchFromType;
    }
    static currentValue(funds){
        let _currentValue = [];
        funds.forEach(function(item, idx){
            _currentValue.push({
                fundName: item.name,
                currentValue: item.value,
                fundCode: item.fundCode
            });
        });
        return _currentValue;
    }
    static switchToType(productGroupType, funds){
        let _switchToType = [];
        funds.forEach(function(item, idx){
            _switchToType.push({
                fundName: item.fundName,
                percentInvested: (!_.isUndefined(item.percentInv) && !_.isEmpty(item.percentInv)) ? 
                    (productGroupType === ProductGroups.B34.toLowerCase() ? Number(item.percentInv|0) : Number.parseFloat(item.percentInv)) : 0,
                fundCode: item.iSINCodes
            });
        });
        return _switchToType;
    }
    static iSINCode(funds){
        let _iSINCode=[];
        funds.forEach(function(item, idx){
            _iSINCode.push(_.isEmpty(item.iSINCodes) ? null : item.iSINCodes);
        });
        return _iSINCode;
    }
    static fundCode(funds){
        let _fundCode=[];
        funds.forEach(function(item, idx){
            _fundCode.push(_.isEmpty(item.fundCode) ? null : item.fundCode);
        });
        return _fundCode;
    }
    static rebalanceType(productGroupType,funds){
        let _rebalanceType=[];
        const totalFunds = this.sumArrayValues(funds, 'value');
        funds.forEach(function(item, idx){            
            let v = _.isUndefined(item.value) || _.isNull(item.value) ? 0 : item.value;
            _rebalanceType.push({
                fundName: item.name,
                currentValue: v,
                currentInvestment: v * 100 / totalFunds,
                newInvestment: (!_.isUndefined(item.newInvestment) && !_.isEmpty(item.newInvestment)) ? 
                    (productGroupType === ProductGroups.B34.toLowerCase() ? Number(item.newInvestment|0) : Number.parseFloat(item.newInvestment)) : 0,
                fundCode: item.fundCode
            });
        });
        return _rebalanceType;
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
            fullPlanName: plan.productGroupType === ProductGroups.TIP ? 'Zurich Trustee Investment Plan' : planDetail.productFullName,
            planStatus: planDetail.planStatus,
            planStartDate: startDate,
            planStartTime: startTime,
            planValuationDate: valuationDate,
            planValuationTime: valuationTime
        };
    
        return planInfoType;
    }
}