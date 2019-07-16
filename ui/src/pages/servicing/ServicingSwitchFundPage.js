import React, { PropTypes } from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector, change, reset, untouch, SubmissionError} from 'redux-form';
import {renderCheckbox} from '../../validations/FieldRendering';
import _ from 'lodash';
import * as ServicingApi from '../../api/ServicingApi';
import ButtonGroup from '../../components/servicing/ButtonGroup';
import FundSwitchSection from '../../components/servicing/switchFund/FundSwitchSection';
import SpecifyFundToSwitchSection from '../../components/servicing/switchFund/SpecifyFundToSwitchSection';
import SpecifyPercentageOfInvestmentSection from '../../components/servicing/switchFund/SpecifyPercentageOfInvestmentSection';
import SwitchFundUtils from './SwitchFundUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import ProductGroups from '../../constants/ProductGroups';
import FormErrorArea from '../../components/common/FormErrorArea';


class ServicingSwitchFundPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isInitialized: false,
            allFund:[],
            investmentFunds: []
        };
        this.onSearchFunds = this.onSearchFunds.bind(this);
        this.onAddFunds = this.onAddFunds.bind(this);
        this.onDeleteFunds = this.onDeleteFunds.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.onChangeSwitchFundOption = this.onChangeSwitchFundOption.bind(this);
    }

    static propTypes = {
        switchFundOption: PropTypes.string
    };
    static childContextTypes = {
        dispatch: PropTypes.any,
        switchFundOption: PropTypes.string,
        productGroupType: PropTypes.string,
        investmentFunds: PropTypes.array,
        selectedFunds: PropTypes.array,
        onSearchFunds: PropTypes.func,
        onAddFunds: PropTypes.func,
        onDeleteFunds: PropTypes.func,
        onChangeSwitchFundOption: PropTypes.func
    };
    getChildContext(){
        return({
            dispatch: this.props.dispatch,
            onSearchFunds: this.onSearchFunds,
            onAddFunds: this.onAddFunds,
            onDeleteFunds: this.onDeleteFunds,
            onChangeSwitchFundOption: this.onChangeSwitchFundOption,
            productGroupType: this.props.productGroupType,
            switchFundOption: this.props.switchFundOption,
            investmentFunds: this.state.investmentFunds,
            selectedFunds: this.props.selectedFunds            
        });
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.funds.length>0 && !this.state.isInitialized){     
            this.setState({isInitialized: true});
            this.props.dispatch(change(this.props.form, 'funds', this.props.funds));
            let productGroupType = this.props.productGroupType;
            if(productGroupType === ProductGroups.B34 || productGroupType === ProductGroups.TIP){
                let productType = window.PES.store.getState().plan.productType;
                this.props.api.searchFunds({productType: productType}).then((res) => {
                    if(res.length > 0){                    
                        let invFunds = this.handleResultSearch(res,productGroupType.toLowerCase());
                        let funds = this.props.funds;
                        let investmentFunds = invFunds.filter(function(item){
                            let itm = _.find(funds, function(f,i){
                                return f.name == item.fundName;
                            });
                            return _.isUndefined(itm);
                        });
                        let selectedFunds = this.props.selectedFunds;
                        investmentFunds = investmentFunds.filter(function(item){
                            let itm = _.find(selectedFunds, function(f,i){
                                return f.value == item.value;
                            });
                            return _.isUndefined(itm);
                        });
                        this.setState({investmentFunds: investmentFunds, holdInvesFund: invFunds});                   
                    }
                });
            }
        }
    }
    onChangeSwitchFundOption(e){
        if(e.target.value == "fromSpecifiedFunds"){
            let formValues = window.PES.store.getState().form[this.props.form].values;
            let selectedFunds = (_.isUndefined(formValues) || _.isUndefined(formValues.selectedFunds)) ? [] : formValues.selectedFunds;
            this.props.dispatch(change(this.props.form, 'totalPercentInvestment', this._getTotalFunds(selectedFunds)));
        }
    }
    
    onSearchFunds(values){
        let productGroupType = this.props.productGroupType.toLowerCase();
        let productType = window.PES.store.getState().plan.productType;
        return new Promise((resolve, reject) => {
            this.props.api.searchFunds({productType: productType, fundName: values.searchText}).then((res) => {
                if(res.length > 0){                    
                    let invFunds = this.handleResultSearch(res,productGroupType);
                    let funds = this.props.funds;
                    let investmentFunds = invFunds.filter(function(item){
                        let itm = _.find(funds, function(f,i){
                            return f.name == item.fundName;
                        });
                        return _.isUndefined(itm);
                    });
                    let selectedFunds = this.props.selectedFunds;
                    investmentFunds = investmentFunds.filter(function(item){
                        let itm = _.find(selectedFunds, function(f,i){
                            return f.value == item.value;
                        });
                        return _.isUndefined(itm);
                    });
                    if(investmentFunds.length==0){
                        reject({'message': 'Fund(s) you are searching for is/are are already added to your contribution list'});
                    }else{
                        this.setState({investmentFunds: investmentFunds, holdInvesFund: invFunds});
                        resolve(res);
                    }                    
                }else{
                    this.setState({investmentFunds: [], holdInvesFund: []});
                    reject({'message': 'No fund found with the given search criteria. Please try again.'});
                }
            });
        });
    }
    handleResultSearch(res, productGroupType){
        let invFunds = res.map((itm,idx)=>{
            let label, value;
            if(productGroupType !== ProductGroups.B34.toLowerCase() && productGroupType !== ProductGroups.TIP.toLowerCase()){
                let whitespaces = _.replace(itm.blankStringForPadding, /&nbsp;/g, '\u00A0');
                value = `${itm.fundName.toLowerCase().replace(/[ ]/g,'_')}_${itm.sedolCode}`;
                label = `${itm.fundName} ${whitespaces} ${itm.sedolCode}\u00A0\u00A0${itm.isPanelFund}`;
            }else{
                value = `${itm.fundName.toLowerCase().replace(/[ ]/g,'_')}`;
                label = itm.fundName;
            }
            return _.merge({}, itm, 
            {
                label: label,
                value: value,
                percentInv: 0,
            });
        });
        return invFunds;
    }
   
    onAddFunds(items){
        if(items.investmentFunds.length > 0){
            let investmentFunds = this.state.investmentFunds;
            let invesFund = investmentFunds.filter(function(item){
                return items.investmentFunds.indexOf(item.value) === -1;
            });

            let selectedFunds = investmentFunds.filter(function(item){
                return items.investmentFunds.indexOf(item.value) > -1;
            });
            
            selectedFunds = _.isUndefined(this.props.selectedFunds)? selectedFunds : [...this.props.selectedFunds, ...selectedFunds];
            
            this.setState({investmentFunds: invesFund});
            this.props.dispatch(change(this.props.form, 'selectedFunds', selectedFunds));
            this.props.dispatch(change(this.props.form, 'totalPercentInvestment', this._getTotalFunds(selectedFunds)));
            this.props.dispatch(change('fundListAddRow','investmentFunds', null));
            this.props.dispatch(untouch('fundListAddRow','investmentFunds'));
        }else{
            throw new SubmissionError({ investmentFunds: 'Add is requested but no fund is selected. Please select at least one fund to add to the contribution list'});
        }
    }
    _onSubmit(){
        const form = window.PES.store.getState().form[this.props.form].values;
        const plan = window.PES.store.getState().plan;
        const requestData = SwitchFundUtils.DataRequest(form, plan);
        this.props.api.submitSwitchFund(form.switchFundOption, requestData).then((result) => {        
            let url = `/plan-details/${plan.planDetail.planNumber}#servicing-history`;
            TransitionUtils.transitionTo(url);
        });
    }
    onDeleteFunds(e){
        let formValues = window.PES.store.getState().form[this.props.form].values;     
        let keepFunds = formValues.selectedFunds.filter(function(item){
            return item['checkInput']!==true;
        });
        let holdInvesFund = this.state.holdInvesFund;
        let selected=[];
        _.forEach(keepFunds, function(item){
            selected.push(item.value);
        });
        let invesFund = holdInvesFund.filter(function(item){
            return selected.length > 0 ? selected.indexOf(item.value) === -1 : true;
        });
        this.setState({investmentFunds: invesFund});
        this.props.dispatch(change(this.props.form, 'selectedFunds', keepFunds));
        this.props.dispatch(change(this.props.form, 'totalPercentInvestment', this._getTotalFunds(keepFunds)));
    }
    _getTotalFunds(arr){
        let total = 0;
        _.forEach(arr, function(item){
            total += Number.isNaN(Number(item['percentInv'])) ? 0 : Number.parseFloat(item['percentInv']);
        });
        return total;
    }
    render(){
        let {switchFundOption, productGroupType} = this.props;
        const {handleSubmit, valid, dirty, submitFailed} = this.props;       
        productGroupType = _.isUndefined(productGroupType)?'':productGroupType.toLowerCase();
        let modalSubmitTitle =  'Fund Switch/Rebalance Funds';
        let showSubmit=true;
        if(productGroupType ==  ProductGroups.B34.toLowerCase() && switchFundOption !== 'rebalanceExistingFunds'){
            showSubmit =  (!_.isUndefined(this.props.selectedFunds) && this.props.selectedFunds.length > 0) ? true : false;
        }
        return(
            <form onSubmit={handleSubmit}>
                <div className={`pes-servicing-switch-fund-page pes-bg-grey switch-fund-${productGroupType}`}>
                    {
                        submitFailed && 
                        <FormErrorArea title='Please correct the following' error={this.props.error} />
                    }
                    
                    <FundSwitchSection {...this.props}/>
                    {
                        switchFundOption && switchFundOption === 'fromSpecifiedFunds' &&
                        [
                            <SpecifyFundToSwitchSection key='specify-fund-to-switch-seciton'/>,
                            <SpecifyPercentageOfInvestmentSection key='specify-percentage-of-investment-section'
                            hasCheckAllowFund={true}
                            hasCheckSodolCodeFund={true}
                            formName={this.props.form}/>
                        ]
                    }

                    {
                        switchFundOption && productGroupType !== ProductGroups.B34.toLowerCase() && productGroupType !== ProductGroups.TIP.toLowerCase() &&
                        <div className='pes-table-area'>
                            <div className='pes-table-list'>
                                <div className='tlbody'>    
                                    <div className='tlrow empty pes-bg-grey-dark'></div>
                                    <div className='tlrow'>
                                        <div className='tlcell col-xs-12'>
                                            <div className='row'>
                                                <div className='d-inline-block align-middle col-xs-8'>
                                                    If you have regular contributions on this plan and do not want future contributions to be redirected in line with this change, please tick this box.
                                                </div>
                                                <div className='d-inline-block align-middle col-xs'>
                                                    <Field 
                                                        name='continueRegularContributions'
                                                        component={renderCheckbox}
                                                    />
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tlrow empty pes-bg-grey-dark'></div>
                                </div>  
                            </div>
                        </div>
                    }
                    <ButtonGroup 
                        className='pes-btn-bottom-area' 
                        showSubmit={dirty&&showSubmit} 
                        isFormValid={valid} 
                        onSubmit={::this._onSubmit}
                        modalCancelTitle={modalSubmitTitle}
                        modalSubmitTitle={modalSubmitTitle}
                        servicingType={`${switchFundOption === 'fromSpecifiedFunds'? 'switch-fund':'switch-fund-rebalance'}`}
                    />
                </div> 
            </form>
        );
    }
}
const validate= (values, props) => {
    const errors = {};
    const funds = _.isUndefined(values.funds) ? [] : values.funds;
    const _iSINcode=['GB00B0PMPN82', 'GB00B1W5J356'];
    //const _iSINcode=['B0PMPN8', 'B1W5J35', 'A041','B039'];
    const _fundCode= ['A041','B039'];
    const selectedFunds = _.isUndefined(values.selectedFunds)? [] : values.selectedFunds;
    let productGroupType =  _.isUndefined(props.productGroupType) ? '' : props.productGroupType.toLowerCase();
    let countPercentInv = selectedFunds.length <= 0 ? 0
        :(productGroupType !== ProductGroups.B34.toLowerCase() ? selectedFunds.reduce(function(a, b) {
            return a + (Number(b.percentInv) > 0 ? 1 : 0);
        }, 0) : selectedFunds.length);
    let countSwitch = funds.reduce(function(a,b){
        return a + (Number(b.switch) == 100 ? 1 : 0);
    },0);
    let fundLength =  funds.length;
    if(props.switchFundOption === 'fromSpecifiedFunds'){
        if(productGroupType === ProductGroups.B34.toLowerCase()){
            if((fundLength - countSwitch + countPercentInv)>20){
                errors._error='It is not possible to invest in more than 20 funds at any one time';
            }
        }else if((productGroupType !== ProductGroups.TIP.toLowerCase()) && ((fundLength - countSwitch + countPercentInv)>100)){
            errors._error='It is not possible to invest in more than 100 funds at any one time';
        }
        let totalSwitch = !_.isUndefined(values) && !_.isUndefined(values.totalSwitch) ? values.totalSwitch : 0;
        if(!_.isNull(totalSwitch)){
            if(totalSwitch == 0){
                if(productGroupType !== ProductGroups.TIP.toLowerCase()){
                    errors.totalSwitch="You must enter a percentage to be switched out from at least one fund";
                }else{
                    errors.totalSwitch="You must enter a percentage to be switched out from at least one fund";
                }
            }
        }
        let totalPercentInvestment = !_.isUndefined(values) && !_.isUndefined(values.totalPercentInvestment) ? values.totalPercentInvestment : 0;
        if(!_.isNull(totalPercentInvestment) && totalPercentInvestment != 100){
            if(!_.isUndefined(values.totalPercentInvestment) && productGroupType !== ProductGroups.B34.toLowerCase()){
                if(productGroupType === ProductGroups.TIP.toLowerCase()){
                    errors.totalPercentInvestment="The total percentage for all funds must add up to 100%";
                }else{
                    errors.totalPercentInvestment="The total percentage for all funds must add up to 100%";
                }
            }else{
                //errors._error="The total percentage for all funds must add up to 100%";
                errors._error="The New Invest % for a fund must be between 1 and 100 and the percentages for all funds must add up to 100(%)";
            }
        }
        
        if(productGroupType === ProductGroups.B34.toLowerCase() && _.isEmpty(errors) && selectedFunds.length > 0){
            const fundErrs = [];
            let sf = selectedFunds.find(x=> _iSINcode.includes(x.iSINCodes));
            let f = funds.find(x=>_fundCode.includes(x.fundCode));
            if(!_.isUndefined(sf) && !_.isNull(sf)){
                if(selectedFunds.length > 1){
                    errors._error='If you are switching into the Distribution fund, you cannot invest in other funds.';
                }
                else{
                    funds.forEach((itm,idx)=>{
                        if(Number(itm.switch|0)!=100){
                            const _err={switch:{_error:'As you are switching into the distribution fund, you must switch 100% of units from all existing funds.'}};
                            fundErrs[idx]=_err;
                        }
                    });
                }
            }else if(!_.isUndefined(f) && !_.isNull(f)){
                funds.forEach((itm,idx)=>{
                    if(Number(itm.switch|0)!=100){
                        const _err={switch:{_error:'As you are switching into the non distribution funds, you must switch 100% of units from the existing distribution fund.'}};
                        fundErrs[idx]=_err;
                    }
                });
            }
            if(fundErrs.length > 0){
                errors.funds = fundErrs;
                //errors._error='If you are switching into the Distribution fund, you cannot invest in other funds.';
            }
        }
    }else{
        let totalInvestment = !_.isUndefined(values) && !_.isUndefined(values.totalInvestment) ? values.totalInvestment : 0;
        if(!_.isNull(totalInvestment) && totalInvestment != 100){
            if(productGroupType === ProductGroups.TIP.toLowerCase()){
                errors.totalInvestment="Total invested should be 100%";
            }else{
                errors.totalInvestment="The total percentage for all funds must add up to 100%";
            }
        }
    }    
    return errors;
};
const selector = formValueSelector('servicingSwitchFund');
function mapStateToProps(state, ownProps) {
    let funds = [];
    if(state.plan.productGroupType === ProductGroups.TIP){
        funds = _.concat(funds, state.plan.planDetail.protectedFunds);
        funds = _.concat(funds, state.plan.planDetail.nonProtectedFunds);
    }else{
        funds = state.plan.planDetail ? state.plan.planDetail.funds : [];
    }
    funds.map((fund) => {
        fund.newInvestment = 0;
        fund.switch = 0;
        return fund;
    });
    return {
        productGroupType: state.plan.productGroupType,
        funds: funds,
        switchFundOption: selector(state, 'switchFundOption'),
        selectedFunds: selector(state, 'selectedFunds')
	};
}
function mapDispatchToProps(dispatch) {
	return {
        api: bindActionCreators(ServicingApi, dispatch),
        dispatch:dispatch
	};
}
const submit = values => {};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'servicingSwitchFund',
        validate:validate,
        onSubmit: submit
    })
)(ServicingSwitchFundPage);