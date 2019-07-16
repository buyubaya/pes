import React, { PropTypes } from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FormSection, reduxForm, formValueSelector, change, SubmissionError, reset, getFormError} from 'redux-form';

import * as ContentTypes from '../../constants/ContentTypes';

import PayeeDetails from '../../components/servicing/PayeeDetails';
import ButtonGroup from '../../components/servicing/ButtonGroup';
import RegularWithdrawalSection from '../../components/servicing/regularWithdrawal/RegularWithdrawalSection';
import RegularWithdrawalTypeSection from '../../components/servicing/regularWithdrawal/RegularWithdrawalTypeSection';
import RegularWithdrawalUtils from './RegularWithdrawalUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import FormErrorArea from '../../components/common/FormErrorArea';
import * as ServicingApi from '../../api/ServicingApi';
import _ from 'lodash';

class ServicingRegularWithdrawalPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.onWithdrawalChange = this.onWithdrawalChange.bind(this);
        this.state = {
            isInitialized: false
        };
    }

    static propTypes = {
        api: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        content: PropTypes.object,
        funds: PropTypes.array,
        withdrawalOption: PropTypes.string,
        withdrawalType: PropTypes.string,
        regularWithdrawalType: PropTypes.string,
        amountEachYear: PropTypes.string,
        withdrawalIncrease: PropTypes.string,
        sortCode: PropTypes.string,
        accountNo: PropTypes.string,
        productGroupType: PropTypes.string,
        searchFormError: PropTypes.string
    };

    static childContextTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func,
        funds: PropTypes.array,
        withdrawalOption: PropTypes.string,
        withdrawalType: PropTypes.string,
        regularWithdrawalType: PropTypes.string,
        handleSearch: PropTypes.func,
        onWithdrawalChange: PropTypes.func,
        amountEachYear: PropTypes.string,
        totalFunds: PropTypes.number,
        withdrawalIncrease: PropTypes.string,
        productGroupType: PropTypes.string
    };

    getChildContext(){
        const totalFundsVal = Number(RegularWithdrawalUtils.sumArrayValues(this.props.funds, 'value'));

        return({
            content: this.props.content && this.props.content[ContentTypes.SERVICING_REGULAR_WITHDRAWAL],
            dispatch: this.props.dispatch,
            funds: this.props.funds,
            withdrawalOption: this.props.withdrawalOption,
            withdrawalType: this.props.withdrawalType,
            regularWithdrawalType: this.props.regularWithdrawalType,
            handleSearch: this.handleSearch,
            onWithdrawalChange: this.onWithdrawalChange,
            amountEachYear: this.props.amountEachYear,
            totalFunds: totalFundsVal,
            withdrawalIncrease: this.props.withdrawalIncrease,
            productGroupType: this.props.productGroupType
        });
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isUndefined(this.props.funds) && !_.isNull(this.props.funds) && this.props.funds.length>0 && !this.state.isInitialized){
            this.setState({isInitialized: true});
            this.props.dispatch(change('servicingRegularWithdrawal', 'funds', this.props.funds));
        }
    }

    handleSearch()
    {
        let data = {sortCode: this.props.sortCode, bankName:this.props.accountNo}; 
        return new Promise((resolve, reject) => {
            this.props.api.searchBankDetails(data).then((res) => {
                let data = _.assign({},{formName: this.props.form, res: res});
                resolve(data);
            },(err)=>{
                reject(err);
            });
        });
    }

    onWithdrawalChange(ele, value) {
        //debugger;
        const form = window.PES.store.getState().form["servicingRegularWithdrawal"].values;
        const funds = form.funds;
        const totalFunds = RegularWithdrawalUtils.sumArrayValues(funds, 'value');
        const currentWithdrawalAmount = RegularWithdrawalUtils.sumArrayValues(funds, 'withrawalAmount');
        let totalWithdrawalAmount = 0;
        const name = ele.target.name;
        const index = name.match(/\d+(\.\d+)?/)[0];
        const isPercentage = name.split('.')[1] === 'withrawalAmountPer';
        if (isPercentage) {
            const v = Number.isNaN(Number(value))? 0 : value;
            const withrawalAmount = (funds[index].value * v) / 100;
            totalWithdrawalAmount = currentWithdrawalAmount - funds[index].withrawalAmount + withrawalAmount;
            this.props.dispatch(change('servicingRegularWithdrawal', `funds.${index}.withrawalAmount`, withrawalAmount));
        }
        else {
            totalWithdrawalAmount = currentWithdrawalAmount;
        }

        const totalWithdrawalAmountPer = Number(((totalWithdrawalAmount / totalFunds) * 100).toFixed(1));
        this.props.dispatch(change('servicingRegularWithdrawal', 'totalWithdrawalAmount', totalWithdrawalAmount));
        this.props.dispatch(change('servicingRegularWithdrawal', 'totalWithdrawalAmountPer', totalWithdrawalAmountPer));
    }

    _submit() {
        const form = window.PES.store.getState().form["servicingRegularWithdrawal"].values;
        const plan = window.PES.store.getState().plan;
        const requestData = RegularWithdrawalUtils.regularWithdrawalDataRequest(form, plan);

        this.props.api.submitRegularWithdrawal(form.withdrawalOption, requestData).then(() => {        
            const url = `/plan-details/${plan.planDetail.planNumber}#servicing-history`;
            TransitionUtils.transitionTo(url); 
        });
    }
    _checkShowSubmitB34=(withdrawalOption,regularWithdrawalType,withdrawalType)=>{
        let flag = false;
        if(!_.isUndefined(withdrawalOption)){
            if(withdrawalOption === 'remove'){
                flag = true;
            }else if(!_.isUndefined(withdrawalType)){
                if(withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE'){
                    flag = true;
                }else if(withdrawalType === 'AMOUNT_EACH_YEAR' && (!_.isUndefined(regularWithdrawalType) && !_.isNull(regularWithdrawalType) && regularWithdrawalType.length > 0)){
                    flag = true;
                }
            }
        }
        return flag;
    }
    _checkShowSubmitGMFAndTip=(withdrawalOption,regularWithdrawalType)=>{
        let flag = false;
        if(!_.isUndefined(withdrawalOption)){
            if(withdrawalOption === 'remove'){
                flag = true;
            }else if(!_.isUndefined(regularWithdrawalType) && !_.isNull(regularWithdrawalType) && regularWithdrawalType.length > 0){
                flag = true;
            }
        }
        return flag;
        
    }
    render(){
        const {withdrawalOption, withdrawalType, regularWithdrawalType, dirty, valid, submitSucceeded, totalWithrawalAmount, productGroupType, totalFunds} = this.props;
        const {handleSubmit, error, searchFormError} = this.props;
        const totalFundsVal = Number(RegularWithdrawalUtils.sumArrayValues(this.props.funds, 'value'));
        // let showSubmit = productGroupType === 'GMF' ? 
        //     (withdrawalOption === 'remove'||!_.isUndefined(regularWithdrawalType)) : 
        //     this._checkShowSubmitB34(withdrawalOption,regularWithdrawalType,withdrawalType);
        //const isAllowed = (productGroupType === 'TIP' && withdrawalOption === 'add' && totalFundsVal < 50000) ? false : true;
        
        let showSubmit = (productGroupType === 'GMF' || productGroupType === 'TIP') ? 
            this._checkShowSubmitGMFAndTip(withdrawalOption,regularWithdrawalType) : 
            this._checkShowSubmitB34(withdrawalOption,regularWithdrawalType,withdrawalType);
        let _error = error || searchFormError;
        
        return(
            <form onSubmit={handleSubmit}>
                <div className='pes-servicing-regular-withdrawal pes-bg-grey'>
                    { 
                        !_.isUndefined(_error) && !_.isNull(_error) &&
                        <FormErrorArea title='Please correct the following' error={_error} />
                    }
                    
                    <RegularWithdrawalSection />

                    {
                        withdrawalOption &&
                        withdrawalOption !== 'remove' &&
                        ((withdrawalType === 'AMOUNT_EACH_YEAR' && productGroupType === 'B34') ||
                        (withdrawalType && (productGroupType === 'GMF' || productGroupType === 'TIP'))) &&
                        <RegularWithdrawalTypeSection />
                    }
                    
                    {
                        withdrawalOption &&
                        withdrawalOption !== 'remove' &&
                        (((withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE' || regularWithdrawalType) && productGroupType === 'B34') ||
                        (withdrawalType && regularWithdrawalType && (productGroupType === 'GMF' || productGroupType === 'TIP'))) &&
                        <FormSection name='payeeDetails'>
                            <PayeeDetails productType={productGroupType}  />
                        </FormSection>
                    }
                
                    <ButtonGroup 
                        className='pes-btn-bottom-area' 
                        //showSubmit={!_.isUndefined(regularWithdrawalType) && dirty}
                        showSubmit={showSubmit && dirty}
                        isFormValid={valid} 
                        onSubmit={::this._submit}
                        modalCancelTitle={_.get(this.props, `content[${ContentTypes.SERVICING_REGULAR_WITHDRAWAL}].RegularWithdrawal`)}
                        modalSubmitTitle={_.get(this.props, `content[${ContentTypes.SERVICING_REGULAR_WITHDRAWAL}].RegularWithdrawal`)}
                    />
                </div>
            </form>
        );
    }
}

const selector = formValueSelector('servicingRegularWithdrawal');
const formSelector = formValueSelector('searchForm');

function mapStateToProps(state, ownProps) {
    let funds;

    if (state.plan.productGroupType === 'TIP') {
        funds = state.plan.planDetail ? state.plan.planDetail.protectedFunds.concat(state.plan.planDetail.nonProtectedFunds) : [];
    }
    else {
        funds = state.plan.planDetail ? state.plan.planDetail.funds : [];
    }

    funds && funds.map((fund) => {
        fund.withrawalAmount = 0;
        fund.withrawalAmountPer = 0;
        return fund;
    });

    return {
        content: state.content,
        withdrawalOption : selector(state, 'withdrawalOption'),
        withdrawalType: selector(state, 'withdrawalType'),
        regularWithdrawalType : selector(state, 'regularWithdrawalType'),
        amountEachYear: selector(state, 'amountEachYear'),
        funds: funds,
        withdrawalIncrease: selector(state, 'withdrawalIncrease'),
        submitSucceeded: selector(state, 'submitSucceeded'),
        totalWithdrawalAmount: selector(state, 'totalWithdrawalAmount'),
        sortCode: formSelector(state, 'searchSortCode'),
        accountNo: formSelector(state, 'searchAccountNumber'),
        productGroupType: state.plan ? state.plan.productGroupType: '',
        searchFormError: getFormError('searchForm')(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
        api: bindActionCreators(ServicingApi, dispatch),
        dispatch: dispatch
	};
}

const validate = (values, props) => {
    const regularWithdrawalType = values.regularWithdrawalType;
    const errors = {};
    try{
        
        const isPercentageFund = (props.productGroupType === 'GMF' ||  props.productGroupType === 'TIP') 
            && values.withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE' 
            && values.regularWithdrawalType === 'FROM_SPECIFIC_FUNDS';
        if(props.productGroupType == 'TIP'&& props.withdrawalOption === 'add'){
            const totalFunds = RegularWithdrawalUtils.sumArrayValues(values.funds, 'value');
            if(totalFunds < 50000){
                errors._error = 'It is not possible to set up regular withdrawals as the current plan value is less than £50,000';
            }
        }
        if (regularWithdrawalType === 'FROM_SPECIFIC_FUNDS') {
            //validate with amount
            const funds = values.funds;
            const totalWithdrawal = RegularWithdrawalUtils.sumArrayValues(funds, 'withrawalAmount');

            if (isPercentageFund) {
                const totalFunds = RegularWithdrawalUtils.sumArrayValues(funds, 'value');
                const totalWithdrawalAmountPer = ((totalWithdrawal / totalFunds) * 100).toFixed(2);

                if (totalWithdrawalAmountPer < 0.1 || totalWithdrawalAmountPer > 7.5) {
                    errors.totalWithdrawalAmountPer = 'Please amend the withdrawal amount as it exceeds the maximum of 7.5% of the plan value';
                }
            }
            else {
                const amount = Number(values.amountEachYear);
                
                if (amount !== totalWithdrawal) { 
                    errors.totalWithdrawalAmount = 'The total amount taken from the funds must equal the \'amount each year\'';
                }
            }
        }
        
        // if (props.productGroupType === 'GMF' && values.withdrawalFrequency) {
        //     let min = 50;
        //     switch (values.withdrawalFrequency) {
        //         case 'EVERY_MONTH':
        //             min = 50 * 12;
        //             break;
        //         case 'EVERY_3_MONTHS':
        //             min = 50 * 4;
        //             break;
        //         case 'EVERY_4_MONTHS':
        //             min = 50 * 3;
        //             break;
        //         case 'EVERY_6_MONTHS':
        //             min = 50 * 2;
        //             break;
        //         default:
        //             break;
        //     }

        //     if (values.amountEachYear < min) {
        //         errors.amountEachYear = 'Please check and amend the Withdrawal Amount - each payment must be at least £50';
        //     }
        // }
    }catch(ex){
        console.log(ex);
    }
    return errors;
}; 

const submit = values => {};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'servicingRegularWithdrawal',
        validate: validate,
        onSubmit: submit
    })
)(ServicingRegularWithdrawalPage);