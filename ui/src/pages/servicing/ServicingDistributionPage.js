import React, { PropTypes } from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, FormSection, SubmissionError, reset, clearFields, getFormError} from 'redux-form';
import _ from 'lodash';
import PayeeDetails from '../../components/servicing/PayeeDetails';
import ChequePayeeDetails from '../../components/servicing/ChequePayeeDetails';
import ButtonGroup from '../../components/servicing/ButtonGroup';
import DistributionSection from '../../components/servicing/distribution/DistributionSection';
import FormErrorArea from '../../components/common/FormErrorArea';

import * as ServicingApi from '../../api/ServicingApi';
import DistributionUtils from './DistributionUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import ProductGroups from '../../constants/ProductGroups';
class ServicingDistributionPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
    }
    static propTypes = {
        api: PropTypes.object.isRequired,
        searchFormError: PropTypes.string
    }
    static childContextTypes = {
        handleSearch: PropTypes.func
    };

    getChildContext(){
        return({
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
        const form = window.PES.store.getState().form["servicingDistribution"].values;
        const plan = window.PES.store.getState().plan;
        const requestData = DistributionUtils.DataRequest(form, plan);
        this.props.api.submitDistribution(requestData).then(() => {  
            let url = `/plan-details/${plan.planDetail.planNumber}#servicing-history`;
            TransitionUtils.transitionTo(url);           
        });
    }
    render(){
        const {paymentType, distributionOption, paymentWhen} = this.props;
        const {handleSubmit, valid, error, searchFormError} = this.props;
        let _error = error || searchFormError;

        return(
            <form onSubmit={handleSubmit}>
            <FormErrorArea title='Please correct the following' error={_error} />
            <div className='pes-servicing-distribution-page pes-bg-grey'>
                <DistributionSection 
                    distributionOption={distributionOption} 
                    paymentWhen={paymentWhen}
                    paymentType={paymentType}/>
                <div>
                    {distributionOption !== 'STOP' && paymentType && <div className='pes-section-title'>Payee details</div>}
                    {
                        distributionOption !== 'STOP' && paymentType && 
                        paymentType === 'BACS' &&
                        <FormSection name='payeeDetails'><PayeeDetails /></FormSection>
                        
                    }
                    {
                        distributionOption !== 'STOP' && paymentType && 
                        paymentType === 'CHEQUE' &&
                        <FormSection name='chequePayeeDetail'><ChequePayeeDetails showAccountHolder /></FormSection>
                    }
                </div>
            
                <ButtonGroup className='pes-btn-bottom-area'
                    isFormValid={valid} 
                    onSubmit={::this._submit}
                    modalCancelTitle='Distributions'
                    modalSubmitTitle='Distributions'
                />
            </div> 
            </form>
        );
    }
}
const validate = (values, props) => {
    const errors = {};    
    const plan = window.PES.store.getState().plan;
    const productGroupType = plan.productGroupType;

    const accountHolderNamePattern=/^[a-zA-Z0-9 ]{0,40}$/;
    const accountHolderNamePattern2=/^[a-zA-Z0-9 '\-\.]{0,40}$/;
    const accountNumberPattern = /^\d{8}$/;
    const numberPattern = /^\d+$/;
    const charPattern = /^[a-zA-Z '\-\.]*$/;
    const numberAndCharPattern = /^[a-zA-Z0-9]*$/;
    errors.payeeDetails = {};
    errors.chequePayeeDetail={};
    let accountNumber = !_.isUndefined(values.payeeDetails) ? values.payeeDetails.accountNumber : null;
    if(!_.isNull(accountNumber) && !_.isEmpty(accountNumber)){        
        if(!accountNumberPattern.test(accountNumber)){
            errors.payeeDetails.accountNumber="Please supply or check missing or invalid details below and then click 'Submit'.";
        }
    }
    let accountHolderName = !_.isUndefined(values.payeeDetails) ? values.payeeDetails.accountHolderName : null;
    if(!_.isNull(accountHolderName) && !_.isEmpty(accountHolderName)){
        if(ProductGroups.B34 == productGroupType && !accountHolderNamePattern2.test(accountHolderName)){
            errors.payeeDetails.accountHolderName="Please check and amend the payee details. You can enter up to 40 alphanumeric characters.";
        }else if(ProductGroups.B34 !== productGroupType && !accountHolderNamePattern.test(accountHolderName)){
            errors.payeeDetails.accountHolderName="Please check and amend the payee details. You can enter up to 40 alphanumeric characters.";
        }
    }
    let payableTo = !_.isUndefined(values.chequePayeeDetail) ? values.chequePayeeDetail.payableTo : null;
    if(!_.isNull(payableTo) && !_.isEmpty(payableTo)){
        if(ProductGroups.B34 == productGroupType && !accountHolderNamePattern2.test(payableTo)){
            errors.chequePayeeDetail.payableTo="Please check and amend the payee details. You can enter up to 40 alphanumeric characters.";
        }else if(ProductGroups.B34 !== productGroupType && !charPattern.test(payableTo)){            
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
const selector = formValueSelector('servicingDistribution');
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
            distributionOption: selector(state,'distributionOption'),
            paymentWhen: selector(state,'paymentWhen'),
            searchFormError: getFormError('searchForm')(state)
        }),
        mapDispatchToProps
    ),
    reduxForm({
        form: 'servicingDistribution',
        validate,
        onSubmit: submit
    })
)(ServicingDistributionPage);