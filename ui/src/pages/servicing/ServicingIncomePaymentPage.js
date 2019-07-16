import React, { PropTypes } from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';

import ButtonGroup from '../../components/servicing/ButtonGroup';
import IncomePaymentsSection from '../../components/servicing/incomePayment/IncomePaymentsSection';
import PayeDetailsSection from '../../components/servicing/incomePayment/PayeeDetailsSection';
import IncomePaymentUtils from './IncomePaymentUtils';
import * as ServicingApi from '../../api/ServicingApi';
import TransitionUtils from '../../utils/TransitionUtils';
class ServicingIncomePaymentPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
    }
    /*
    static propTypes = {
        paymentType: PropTypes.string,
        incomeOption: PropTypes.string
    };*/

    static childContextTypes = {
        paymentType: PropTypes.string,
        incomeOption: PropTypes.string,
        handleSearch: PropTypes.func
    };

    getChildContext(){
        return({
            paymentType: this.props.paymentType,
            incomeOption: this.props.incomeOption,
            handleSearch: this.handleSearch
        });
    }
  
    handleSearch(values)
    {
        let data = {sortCode: values.searchSortCode, bankName: values.searchAccountNumber}; 
        return new Promise((resolve, reject) => {
            this.props.api.searchBankDetails(data).then((res) => {
                let data = _.assign({},{formName: this.props.form, res: res});
                resolve(data);
            },(err)=>{
                reject(err);
            });
        });
    }
    _submit() {
        const form = window.PES.store.getState().form["servicingIncomePayment"].values;
        const plan = window.PES.store.getState().plan;
        const requestData = IncomePaymentUtils.DataRequest(form, plan);
        this.props.api.submitIncomePayment(requestData).then(() => {        
            let url = `/plan-details/${plan.planDetail.planNumber}#servicing-history`;
            TransitionUtils.transitionTo(url);
        });
    }
    render(){
        const {incomeOption} = this.props;
        const {handleSubmit, valid} = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <div className='pes-servicing-income-payment-page pes-bg-grey'>
                    <IncomePaymentsSection />                    
                    {
                        incomeOption !== 'REINVEST_INCOME' && <PayeDetailsSection />
                    }
                
                    <ButtonGroup className='pes-btn-bottom-area' 
                        isFormValid={valid}  
                        onSubmit={::this._submit}
                        modalCancelTitle='Income payments'
                        modalSubmitTitle='Income payments'
                        servicingType='income-payment'
                    />
                </div> 
            </form>
        );
    }
}
const validate = (values, props) => {
    const errors = {};
    const accountHolderNamePattern=/^[a-zA-Z0-9 ]{0,40}$/;
    const accountNumberPattern = /^\d{8}$/;
    const numberPattern = /^\d+$/;
    const charPattern = /^[a-zA-Z '\-\.]*$/;
    const numberAndCharPattern = /^[a-zA-Z0-9]*$/;
    let accountHolderName = !_.isUndefined(values.payeeDetails) ? values.payeeDetails.accountHolderName : null;
    errors.payeeDetails = {};
    errors.chequePayeeDetail={};
    if(!_.isNull(accountHolderName) && !_.isEmpty(accountHolderName)){        
        if(!charPattern.test(accountHolderName)){
            errors.payeeDetails.accountHolderName="Please check and amend the payee details. You can enter up to 40 alphanumeric characters.";
        }
    }
    let accountNumber = !_.isUndefined(values.payeeDetails) ? values.payeeDetails.accountNumber : null;
    if(!_.isNull(accountNumber) && !_.isEmpty(accountNumber)){        
        if(!accountHolderNamePattern.test(accountNumber)){
            errors.payeeDetails.accountNumber="Please supply or check missing or invalid details below and then click 'Submit'.";
        }
    }
    let payableTo = !_.isUndefined(values.chequePayeeDetail) ? values.chequePayeeDetail.payableTo : null;
    if(!_.isNull(payableTo) && !_.isEmpty(payableTo)){
        if(!charPattern.test(payableTo)){
            errors.chequePayeeDetail.payableTo="Please check and amend the payee details. You can enter up to 40 alphanumeric characters.";
        }
    }
    let buildingNumber = !_.isUndefined(values.payeeDetails) ? values.payeeDetails.buildingNumber : null;
    if(!_.isNull(buildingNumber) && !_.isEmpty(buildingNumber)){        
        if(!numberAndCharPattern.test(buildingNumber)){
            errors.payeeDetails.buildingNumber="An incorrect building society roll number entered. Please check and amend the details.";
        }
    }
    return errors;
};
const submit = values => {};
const selector = formValueSelector('servicingIncomePayment');
function mapDispatchToProps(dispatch) {
	return {
        api: bindActionCreators(ServicingApi, dispatch),
        dispatch: dispatch
	};
}
export default compose(
    connect(
        state => ({
            paymentType: selector(state, 'paymentType'),
            incomeOption: selector(state, 'incomeOption'),
        }),mapDispatchToProps
    ),
    reduxForm({
        form: 'servicingIncomePayment',
        validate,
        onSubmit: submit
    })
)(ServicingIncomePaymentPage);