import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput, renderRadioGroup, renderInputGroup} from '../../../validations/FieldRendering';
import SearchForm from '../SearchForm';
import { maxLength } from '../../../validations/FieldValidations';

const renderAccountHolderGroup = Comp => ({inputLabel, showAccountHolderText, ...rest}) => (
    <div className={(rest.meta.error && rest.meta.touched) ? 'has-error' : ''}>
        <div className='tlcell col-xs-4 input-label align-middle py-0'>
            <div>
                {inputLabel}
                <span className='icon-required'></span>
            </div>
            {
                showAccountHolderText
                &&
                <div className='text-transform-normal'>Please input the name as it appears on the account</div>
            }
        </div>
        <div className='tlcell col-xs-8 input-field align-middle'>
            <Comp {...rest} />
        </div>
    </div>
);

const renderQuestionGroup = Comp => ({inputLabel, ...rest}) => (
    <div className={(rest.meta.error && rest.meta.touched) ? 'tlcell col-xs-12 has-error' : 'tlcell col-xs-12'}>
        {inputLabel}
        <span className='icon-required'></span>
        <Comp {...rest} />
    </div>   
);

const _renderInput = renderInputGroup(renderInput);
const _renderRadioGroup = renderQuestionGroup(renderRadioGroup);
const _renderAccountHolderGroup = renderAccountHolderGroup(renderInput);

class PayeeDetails extends React.Component {

    static propTypes = {
        showAccountHolderText: PropTypes.bool,
        productGroupType: PropTypes.string
    };

    static contextTypes = {
        productGroupType: PropTypes.string
    };
    
    static defaultProps = {
        showAccountHolderText: false,
    };

    render(){
        const {showAccountHolderText} = this.props;
        const productGroupType = this.context && this.context.productGroupType;

        return (
        <div className='pes-table-list payee-details-area'>
            <div className='tlbody'>
                <div className='tlrow row'>
                    <Field
                        className='pes-input-group'
                        name='accountHolderName'
                        type='text'
                        component={_renderAccountHolderGroup}
                        showAccountHolderText={showAccountHolderText}
                        showError
                        inputLabel='Account holder name:'
                        normalize={maxLength(40)}
                    />
                </div>
                <div className='tlrow row'>
                    <div className='tlcell col-xs-4 align-bottom'>
                        <div className='input-label mb-5 '>
                            Account number: 
                        </div>
                        <div className='input-label '>
                            Sort code: 
                        </div>
                    </div>
                    <div className='tlcell col-xs-8 bg-inputs-group'>
                        <p className='mb-5 '>Enter account number and sort code and click <strong>"Search"</strong></p>
                        <SearchForm className='pes-servicing-search-area'  />
                    </div>
                </div>
                <div>
                    <Field
                        className='pes-input-group'
                        name='bankName'
                        type='text'
                        component={_renderInput}
                        disabled
                        showError
                        inputLabel='Bank / Building Society name:'
                        className1='col-xs-4 '
                        className2='col-xs-8'
                    />
                </div>
                <div>
                    <Field
                        className='pes-input-group'
                        name='branchName'
                        type='text'
                        component={_renderInput}
                        disabled
                        showError
                        inputLabel='Branch name:'
                        className1='col-xs-4 '
                        className2='col-xs-8'
                    />
                </div>
                <div>
                    <Field
                        className='pes-input-group'
                        name='sortCode'
                        type='text'
                        component={_renderInput}
                        disabled
                        showError
                        inputLabel='Sort code:'
                        className1='col-xs-4 '
                        className2='col-xs-8'
                    />
                </div>
                <div>
                    <Field
                        className='pes-input-group'
                        name='accountNumber'
                        type='text'
                        component={_renderInput}
                        showError
                        inputLabel='Account number:'
                        className1='col-xs-4 '
                        className2='col-xs-8'
                    />
                </div>
                <div className='tlrow row'>
                    <div className='tlcell col-xs-4 input-label '>
                        Building Society roll number:
                    </div>
                    <div className='tlcell col-xs-8 input-field'>
                        <Field
                            className='pes-input-group'
                            name='buildingNumber'
                            type='text'
                            component={renderInput}
                            showError
                        />
                    </div>
                </div>
                {productGroupType !== 'TIP' &&
                <div>
                    <div className='tlrow row'>
                        <Field
                            name='notPlanHolder'
                            data={[
                                {value: true, label: 'Yes'},
                                {value: false, label: 'No'}
                            ]}
                            className='pes-radio-group group-inline d-inline-block ml-20'
                            component={_renderRadioGroup}
                            showError
                            inputLabel='Are the monies to be paid to anyone who is not a plan holder?'
                            className1='col-xs-4'
                            className2='col-xs-8'
                        />
                    </div>
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12 lh-input'>
                            If yes then please contact Sterling. We reserve the right to review individual requests.
                        </div>
                    </div>
                </div>
                }
                {
                    productGroupType === 'TIP' &&
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-12 lh-input'>
                            Payments must be made into the Trustees account
                        </div>
                    </div>
                }
            </div>
        </div>
        );
    };    
};

export default PayeeDetails;