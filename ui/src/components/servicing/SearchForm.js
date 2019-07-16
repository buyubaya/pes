import React, { PropTypes } from 'react';
import {Field, reduxForm, SubmissionError, change, stopSubmit} from 'redux-form';
import { renderInput } from '../../validations/FieldRendering';
import {required, accountNumber, sortCode} from '../../validations/FieldValidations';
import Button from '../common/Button';
import {get, isEmpty} from 'lodash';
import { debug } from 'util';

class SearchForm extends React.Component {
    constructor(props, context) {
        super(props, context);       
        this._searchFn = this._searchFn.bind(this);
        this._onKeyUpAccountNumber.bind(this);
    }
    static contextTypes = {
        handleSearch: PropTypes.func
    };
    _onKeyUpAccountNumber = (e)=>{
        debugger;
        return false;
    }

    _formatSortCode(value){
        return value.replace(/^(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3');
    }

    _searchFn = (values) => {
        const handleSearch = get(this.context, 'handleSearch');
        return handleSearch(values, this.props.reset).then((data) => {
            console.log('SEARCH BANK DETAILS', data); 
            let errors = {};
            const bankInfo = get(data, 'res.branch');
            const BankDetails = get(data, 'res');
            const isAccountNumberCorrect = get(data, 'res.account.accountNumberFormatCorrect');
            const isSortCodeCorrect = get(data, 'res.sortCodeAllocated');

            // STOP SUBMIT MAIN FORM
            this.props.dispatch(stopSubmit(data.formName));

            // CHECK BANK SERVICE NOT AVAILABLE
            const account = get(data, 'res.account');
            let _error = null;
            if(isEmpty(account)){
                _error = 'Bank lookup service not currently available.';
                throw new SubmissionError({ _error });
            }
            
            if(!isSortCodeCorrect){
                this.props.dispatch(change(data.formName, 'payeeDetails.sortCode', ''));
                this.props.dispatch(change(data.formName, 'payeeDetails.bankName', ''));
                this.props.dispatch(change(data.formName, 'payeeDetails.branchName', ''));
                this.props.dispatch(change(data.formName, 'payeeDetails.accountNumber', ''));

                errors.searchSortCode = 'Please check the bank sort code as it has not been recognised.';
                throw new SubmissionError(errors);
            }
            else {
                if(!isEmpty(bankInfo)){ 
                    this.props.dispatch(change(data.formName, 'payeeDetails.sortCode', this._formatSortCode(bankInfo.sortCode)));
                    this.props.dispatch(change(data.formName, 'payeeDetails.bankName', bankInfo.fullName));
                    this.props.dispatch(change(data.formName, 'payeeDetails.branchName', bankInfo.branchTitle));
    
                    if(isAccountNumberCorrect){
                        this.props.dispatch(change(data.formName, 'payeeDetails.accountNumber', BankDetails.accountNumberChecked));  
                        this.props.reset();
                    }
                    else {
                        this.props.dispatch(change(data.formName, 'payeeDetails.accountNumber', ""));

                        errors.searchAccountNumber = 'Please check the bank account number as it has not been recognised.';
                        throw new SubmissionError(errors);
                    }
                }
            }
        });
    }
    render(){        
        const handleSubmit = this.props.handleSubmit;
        //const handleSearch = get(this.context, 'handleSearch');
        
        return(            
            <div className={this.props.className}>
                <div className='search-row'>
                    <Field
                        className='input-area pes-input-group'
                        name='searchAccountNumber'
                        type='text'
                        component={renderInput}
                        validate={[required, accountNumber]}
                        showError
                    />
                </div>
                <div className='search-row'>
                    <Field
                        className='input-area pes-input-group'
                        name='searchSortCode'
                        type='text'
                        component={renderInput}
                        validate={[required, sortCode]}
                        showError
                    />
                    <Button type='button' className='pes-btn pes-btn-default' label='Search' onClick={handleSubmit(this._searchFn)} />
                </div>
                <div className='input-area'></div>
                <div className='input-area'></div>
                <div className='btn-area'>
                    
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'searchForm'
})(SearchForm);