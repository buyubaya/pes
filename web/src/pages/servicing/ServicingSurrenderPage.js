import React, { PropTypes } from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FormSection, reduxForm, formValueSelector, SubmissionError, getFormSubmitErrors, getFormError, change} from 'redux-form';

import PayeeDetails from '../../components/servicing/surrender/PayeeDetails';
import ChequePayeeDetails from '../../components/servicing/surrender/ChequePayeeDetails';
import ButtonGroup from '../../components/servicing/amendPersonalDetails/ButtonGroup';
import CancelChangeButton from '../../components/common/CancelChangeButton';
import SubmitButton from '../../components/common/SubmitButton';
import SurrenderSection from '../../components/servicing/surrender/SurrenderSection';
import FormErrorArea from '../../components/common/FormErrorArea';

import * as ContentTypes from '../../constants/ContentTypes';
import ProductGroups from '../../constants/ProductGroups';
import {submit, validate} from '../../components/servicing/surrender/actions';
import {FIELD_NAMES, ERROR_MESSAGES, OPTIONS_DATA} from '../../components/servicing/surrender/constants';
import Button from '../../components/common/Button';
import * as ServicingApi from '../../api/ServicingApi';
import {get as _get} from 'lodash';
import TransitionUtils from '../../utils/TransitionUtils';
import UrlUtils from '../../utils/UrlUtils';


class ServicingSurrenderPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.submitPristine = this.submitPristine.bind(this);
        this.confirmSubmitForm = this.confirmSubmitForm.bind(this);
        this.handleChangeSurrenderType = this.handleChangeSurrenderType.bind(this);
        this._isPaymentTypeDisplay = this._isPaymentTypeDisplay.bind(this);
    }

    static propTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        funds: PropTypes.array,
        surrenderOption: PropTypes.string,
        paymentType: PropTypes.string,
        partialSurrenderType: PropTypes.string,
        B34PartialSurrenderType: PropTypes.string,
        submitErrors: PropTypes.object,
        searchFormError: PropTypes.string
    };

    static childContextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        funds: PropTypes.array,
        surrenderOption: PropTypes.string,
        partialSurrenderType: PropTypes.string,
        B34PartialSurrenderType: PropTypes.string,
        paymentType: PropTypes.string,
        handleSearch: PropTypes.func,
        submitErrors: PropTypes.object,
        productGroupType: PropTypes.string,
        handleChangeSurrenderType: PropTypes.func,
        _isPaymentTypeDisplay: PropTypes.func
    };

    getChildContext(){
        return({
            content: _get(this.props, `content.${ContentTypes.SERVICING_SURRENDER}`),
            plan: this.props.plan,
            funds: this.props.funds || [],
            surrenderOption: this.props.surrenderOption,
            partialSurrenderType: this.props.partialSurrenderType,
            B34PartialSurrenderType: this.props.B34PartialSurrenderType,
            paymentType: this.props.paymentType,
            handleSearch: this.handleSearch,
            submitErrors: this.props.submitErrors,
            productGroupType: _get(this.props, `plan.productGroupType`),
            handleChangeSurrenderType: this.handleChangeSurrenderType,
            _isPaymentTypeDisplay: this._isPaymentTypeDisplay
        });
    }

    handleChangeSurrenderType(e, value){
        // this.props.dispatch(change('servicingSurrender', FIELD_NAMES.paymentType, null));
    }

    _isPaymentTypeDisplay(){
        let isDisplay = false;
        const surrenderOption = this.props && this.props.surrenderOption;
        const partialSurrenderType = this.props && this.props.partialSurrenderType;
        const B34PartialSurrenderType = this.props && this.props.B34PartialSurrenderType;
        const paymentType = this.props && this.props.paymentType;
        const productGroup = _get(this.props, 'plan.productGroupType');
        const productType = _get(this.props, 'plan.productType');
        const isB34 = productGroup === ProductGroups.B34;
        const isTIP = productGroup === ProductGroups.TIP;


        if(
            surrenderOption &&
            (surrenderOption === OPTIONS_DATA.surrenderType.fullSurrender.value)
        ){
            isDisplay = true;
        }

        if(
            (
                productGroup === ProductGroups.GMF || 
                (productGroup === ProductGroups.TIP && productType != 'A00035')
            ) &&
            (surrenderOption === OPTIONS_DATA.surrenderType.partialSurrender.value)
        ){
            isDisplay = true;
        }

        if(
            (
                isB34 || (productGroup === ProductGroups.TIP && productType == 'A00035')
            ) &&
            (surrenderOption === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
            (
                partialSurrenderType === OPTIONS_DATA.partialSurrenderType.fromSpecificFund.value ||
                (
                    partialSurrenderType === OPTIONS_DATA.partialSurrenderType.acrossAllFund.value && B34PartialSurrenderType
                )
            )
        ){
            isDisplay = true;
        }

        if(isTIP){
            isDisplay = true;
        }


        return isDisplay;
    }

    handleSearch(values, dispatch, props){
        let data = {sortCode: values.searchSortCode, bankName: values.searchAccountNumber}; 
        // return this.props.api.searchBankDetails(data).then((res) => {
        //     if(res.length > 0)
        //     {
        //         let bankInfo = res[0];             
        //         dispatch(change('servicingSurrender', 'bankDetails.bankName', bankInfo.fullName));
        //         dispatch(change('servicingSurrender', 'bankDetails.sortCode', bankInfo.sortCodeChecked)); 
        //         dispatch(change('servicingSurrender', 'bankDetails.branchName', bankInfo.branchTitle)); 
        //         dispatch(change('servicingSurrender', 'bankDetails.accountNumber', bankInfo.accountNumberChecked));
        //         dispatch(reset('searchForm'));
        //     }else{
        //         throw new SubmissionError({ searchSortCode: 'Sort code has not been recognised',searchAccountNumber: 'Account number has not been recognised'});                
        //     }   
        // });
        return new Promise((resolve, reject) => {
            this.props.api.searchBankDetails(data)
            .then(
            (res) => {
                let data = _.assign({},{formName: this.props.form, res: res});
                resolve(data);
            },
            (err) => {
                reject(err);
            });
        });
    }

    submitPristine(submitModal){
        throw new SubmissionError({[FIELD_NAMES.surrenderType]: ' ', _error: ERROR_MESSAGES.mandatoryMissing});
    }

    confirmSubmitForm(data){
        const planID = _get(this.props, 'plan.planDetail.planNumber');
        const productGroup = _get(this.props, 'plan.productGroupType');
        const productType = _get(this.props, 'plan.productType') || '';
        let planHolderName = _get(this.props, 'plan.planDetail.firstPlanHolderName') || '';
        let fullPlanName = _get(this.props, 'plan.planDetail.productFullName') || '';
        const currentPlanAmount = _get(this.props, 'plan.planDetail.currentValue') || '';

        if(productGroup === ProductGroups.TIP){
            planHolderName = _get(this.props, 'plan.planDetail.planHolders[0].name'),
            fullPlanName = 'Zurich Trustee Investment Plan';
        }

        const {
            surrenderType,
            surrenderTypeFunds,
            partialSurrenderType,
            surrenderTotalAmount,
            fundInvestments,
            paymentType,
            payeeDetails: {
                accountHolderName, 
                bankName: bankNameType, 
                branchName: branchNameType, 
                sortCode: sortCodeType, 
                accountNumber: accountNumberType, 
                buildingNumber: buildingSocietyRollNumber, 
                payableTo: payeeName, 
                notPlanHolder: paymentToOthers
            }
        } = data;

        // FUND INVESTMENT
        let fundInvestmentsList = []; 
        if(fundInvestments){
            fundInvestmentsList = fundInvestments.map(item => {
                if(!Number(item.amountSurrendered)){
                    const {amountSurrendered, ...newItem} = item;
                    return newItem;
                }
    
                return item;
            });
        }

        const requestData = {
            surrenderType: surrenderType || null,
            surrenderTypeFunds: surrenderTypeFunds || null,
            partialSurrenderType: partialSurrenderType || null,
            surrenderDetails: {
                surrenderTotalAmount: surrenderTotalAmount ? (surrenderTotalAmount*1).toFixed(2) : '',
                fundInvestmentsList: fundInvestmentsList || [],
                currentPlanAmount: currentPlanAmount || ''
            },
            paymentType: paymentType || null,
            bankDetails: {
                accountHolderName: accountHolderName || '',
                findAccountNo: '',
                findSortCode: '',
                bankNameType: bankNameType || '',
                branchNameType: branchNameType || '',
                sortCodeType: sortCodeType || '',
                accountNumberType: accountNumberType || '',
                buildingSocietyRollNumber: buildingSocietyRollNumber || '',
                payeeName: payeeName || '',
                paymentToOthers
            },
            planInfoType: {
                planID: planID || '',
                productGroup: productGroup || '',
                productType: productType || '',
                planHolderName: planHolderName || '',
                fullPlanName: fullPlanName || ''
            }
        };
        
        let api;
        if(productGroup === ProductGroups.GMF){
            api = this.props.api.submitGmfSurrender;
        }
        if(productGroup === ProductGroups.B34){
            api = this.props.api.submitB34Surrender;
        }
        if(productGroup === ProductGroups.TIP){
            api = this.props.api.submitTipSurrender;
        }
        
        return api(requestData)
        .then(
            res => {
                if(res.status == 500){
                    let _error;
                    if(res.messages){
                        _error = [];
                        for(let item of res.messages){
                            _error.push(item);
                        }
                    }
                    else {
                        _error = 'Internal error';
                    }

                    throw new SubmissionError({_error});
                }
                else {
                    TransitionUtils.navigateTo(UrlUtils.getActualLink(`/plan-details/${_get(this.props, 'params.id')}#servicing-history`));
                }

            },
            err => {
                throw new SubmissionError({_error: 'Internal error'});
            }
        );
    }

    render(){
        const {paymentType, handleSubmit, error, submitErrors, anyTouched, searchFormError} = this.props;
        const productGroup = _get(this.props, 'plan.productGroupType');
        const isB34 = productGroup === ProductGroups.B34;
        const isTIP = productGroup === ProductGroups.TIP;
        const isGMF = productGroup === ProductGroups.GMF;
        const showAccountHolderText = isTIP || isGMF;
        const surrenderTitle = _get(this.props, 'content.servicingSurrender.surrenderTitle');
        const _isPaymentTypeDisplay = this._isPaymentTypeDisplay;
        let _error = error || searchFormError;
        
        return(
            <div className='pes-servicing-surrender-page pes-bg-grey'>

                {
                    anyTouched && 
                    <FormErrorArea title='Please correct the following' error={_error} />
                }

                <SurrenderSection />
                
                {
                    _isPaymentTypeDisplay() &&
                    paymentType && 
                    paymentType === 'BACS' &&
                    <FormSection name='payeeDetails'>
                        <div className='pes-section-title text-capitalize'>Payee Details</div>
                        <PayeeDetails 
                            showAccountHolderText={showAccountHolderText}
                            productGroup={productGroup}
                        />
                    </FormSection>
                }

                {
                    _isPaymentTypeDisplay() &&
                    paymentType && 
                    paymentType === 'CHEQUE' &&
                    <FormSection name='payeeDetails'>
                        <div className='pes-section-title text-capitalize'>Payee Details</div>
                        <ChequePayeeDetails 
                            showAccountHolder={isB34}
                            productGroup={productGroup}
                        />
                    </FormSection>
                }
            
                {/* <div className='pes-table-list pes-btn-bottom-area'>
                    <div className='tlrow empty pes-bg-grey-dark'></div>             
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12 text-right'>
                            <CancelChangeButton />
                            <SubmitButton
                                isFormValid={true}
                                onSubmit={this.confirmSubmitForm}
                            />
                        </div>
                    </div>
                </div> */}
                <ButtonGroup 
                    className='pes-btn-bottom-area'
                    onSubmitPristine={this.submitPristine}
                    onConfirmSubmit={this.confirmSubmitForm}
                    reduxFormHandleSubmit={handleSubmit}
                    submitForm={submit}
                    modalCancelTitle={surrenderTitle}
                    modalSubmitTitle={surrenderTitle}
                    servicingType={_get(this.props, 'surrenderOption') === OPTIONS_DATA[FIELD_NAMES.surrenderType].partialSurrender.value ? 'partialSurrender' : 'surrender'}
                />

            </div> 
        );
    }
}

const selector = formValueSelector('servicingSurrender');

const mapStateToProps = (state, props) => {
    const productGroup = _get(state, 'plan.productGroupType');
    let funds = _get(state, 'plan.planDetail.funds');
    if(productGroup === ProductGroups.TIP){
        const protectedFunds = _get(state, 'plan.planDetail.protectedFunds');
        const nonProtectedFunds = _get(state, 'plan.planDetail.nonProtectedFunds');

        funds = [
            ...protectedFunds,
            ...nonProtectedFunds
        ];
    }

    return({
        content: state.content,
        plan: state.plan,
        funds: funds,
        paymentType: selector(state, FIELD_NAMES.paymentType), 
        surrenderOption: selector(state, FIELD_NAMES.surrenderType),
        partialSurrenderType: selector(state, FIELD_NAMES.partialSurrenderType),
        B34PartialSurrenderType: selector(state, FIELD_NAMES.B34PartialSurrenderType),
        submitErrors: getFormSubmitErrors('servicingSurrender')(state),
        searchFormError: getFormError('searchForm')(state)
    });
};

const mapDispatchToProps = dispatch => {
    return({
        api: bindActionCreators(ServicingApi, dispatch)
    });
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: 'servicingSurrender',
        validate
    })
)(ServicingSurrenderPage);