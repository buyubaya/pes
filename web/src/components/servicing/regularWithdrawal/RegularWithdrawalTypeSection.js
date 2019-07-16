import React, {PropTypes} from 'react';
import {get} from 'lodash';
import {renderInput, renderRadioGroup,renderInputGroup} from '../../../validations/FieldRendering';
import {required} from '../../../validations/FieldValidations';
import {isNotNumberic, notInRange075, notInRangeDefFund} from '../../../validations/RegularWithdrawal';
import {Field, FormSection, FieldArray, change} from 'redux-form';
import RegularWithdrawalUtils from '../../../pages/servicing/RegularWithdrawalUtils';
import {amountExceedsMaxFund, amountExceedsMaxFundTIP} from '../../../validations/RegularWithdrawal';
import _ from 'lodash';
const _renderRadioGroup = renderInputGroup(renderRadioGroup);
const renderFromSpecificFundsGroup = Comp => ({values,isPercentage, ...rest}) => {
    return (
        <div className='tlrow'>
            <div className={`tlcell col-xs-4 ${!_.isUndefined(rest.meta.error) && rest.meta.error.length > 0 ? 'has-error' : ''}`}>
                {values.name}
                {!_.isUndefined(rest.meta.error) && rest.meta.error.length > 0  && <span className='icon-required'></span>}
            </div>
            <div className='tlcell col-xs-4'>
                {values.value}
            </div>
            {!isPercentage &&(<div className='tlcell col-xs-4'>
                <Comp {...rest} />
            </div>)}
            {isPercentage &&(<div className='tlcell col-xs-4 group-inline'>
                <Comp {...rest} />
                <span className='s-percent'>%</span>
            </div>)}
        </div>
    );
}

renderFromSpecificFundsGroup.propTypes = {
    meta: PropTypes.object,
    values: PropTypes.object,
    isPercentage: PropTypes.object
};

const renderFromSpecificFundTotalGroup = Comp => ({isPercentage, ...rest}) => {
    return (
        <div className='tlrow'>
            <div className={`tlcell col-xs-4 text-capitalize ${!_.isUndefined(rest.meta.error) && rest.meta.error.length > 0 ? 'has-error' : ''}`}>
                Total amount to be taken form funds
                {!_.isUndefined(rest.meta.submitFailed) && rest.meta.submitFailed  && <span className='icon-required'></span>}      
            </div>
            <div className='tlcell col-xs-4'>
            </div>
            {!isPercentage &&(<div className='tlcell col-xs-4'><Comp {...rest} /></div>)}
            {isPercentage &&(<div className='tlcell col-xs-4 group-inline'>
                <Comp {...rest} />
                <span>%	allocated of 7.5% withdrawal allowed</span>
            </div>)}
        </div>
    );
}

renderFromSpecificFundTotalGroup.propTypes = {
    meta: PropTypes.object,
    isPercentage: PropTypes.object
};

const _renderInput = renderFromSpecificFundsGroup(renderInput);
const _renderInputTotal = renderFromSpecificFundTotalGroup(renderInput);
const renderFunds = ({fields, onWithdrawalChange, isPercentage, productGroupType}) => {
    return (
        <div>
            {fields.map((fund, index) => {
                const values = fields.get(index);
                //https://github.com/erikras/redux-form/issues/2629
                //const validate = [isNotNumberic, amountExceedsMaxFund(values.value)];
                const amountExceeds = productGroupType === 'TIP' ? amountExceedsMaxFundTIP : amountExceedsMaxFund;
                const validate = !isPercentage ? [isNotNumberic, amountExceeds] : [isNotNumberic, notInRangeDefFund];
                return(
                <div key={index}>
                    {!isPercentage &&
                        <Field
                            key={index}
                            className='pes-input-group input-currency'
                            name={`${fund}.withrawalAmount`}
                            type='text'
                            component={_renderInput}
                            onBlur={onWithdrawalChange}
                            validate={validate}
                            showError
                            isPercentage={isPercentage}
                            values={values}
                        />
                    }
                    {isPercentage &&<Field
                        key={index}
                        className='pes-input-group w-percent'
                        name={`${fund}.withrawalAmountPer`}
                        type='text'
                        component={_renderInput}
                        onBlur={onWithdrawalChange}
                        validate={validate}
                        showError
                        isPercentage={isPercentage}
                        values={values}
                    />}
                </div>);
            })}
            {!isPercentage && <Field
                className='pes-input-group input-currency'
                name='totalWithdrawalAmount'
                type='text'
                component={_renderInputTotal}
                disabled
                showError
                isPercentage={isPercentage}
            />}
            {isPercentage &&(<Field
                className='pes-input-group wf-percent'
                name='totalWithdrawalAmountPer'
                type='text'
                component={_renderInputTotal}
                disabled
                showError
                isPercentage={isPercentage}
            />)}
        </div>
    );
};

class RegularWithdrawalTypeSection extends React.Component {
    static contextTypes = {
        regularWithdrawalType: PropTypes.string,
        withdrawalType: PropTypes.string,
        funds: PropTypes.array,
        totalWithrawalAmount: PropTypes.number,
        onWithdrawalChange: PropTypes.func,
        productGroupType: PropTypes.string
    };

    getPercentageEachYearField()
    {
        return(
            <div className='tlrow row'>
                <div className='tlcell col-xs-4 input-label text-capitalize'>Percentage each year</div>
                <div className='tlcell col-xs-8 input-field'>
                    <div className='group-inline'>
                        <Field
                            className='pes-input-group w-percent'
                            name='percentageEachYear'
                            type='text'
                            component={renderInput}
                            validate={[required, isNotNumberic, notInRange075]}
                            showError
                        />
                        <span>%	The maximum fund withdrawal is 7.5 % of the total plan value</span>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        const regularWithdrawalType = this.context && this.context.regularWithdrawalType;
        const withdrawalType = this.context && this.context.withdrawalType;
        const productGroupType = this.context && this.context.productGroupType;
        const onWithdrawalChange = get(this.context, 'onWithdrawalChange');
        const isPercentageFund = (productGroupType === 'GMF' || productGroupType === 'TIP') && withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE' && regularWithdrawalType === 'FROM_SPECIFIC_FUNDS';

        return(
            <div className='pes-table-list withdrawal-type-area align-middle'>
                <Field
                    name='regularWithdrawalType'
                    data={[
                        {value: 'PROPORTIONATELY_ACROSS_ALL_FUNDS', label: 'Proportionately across all funds'},
                        {value: 'FROM_SPECIFIC_FUNDS', label: 'From specific funds'}
                    ]}
                    className='pes-radio-group group-inline'
                    component={_renderRadioGroup}
                    validate={[required]}
                    showError
                    className1='col-xs-4 text-capitalize'
                    className2='col-xs-8'
                    inputLabel='Select Regular Withdrawal type'
                />
                {productGroupType && (productGroupType === 'GMF' || productGroupType === 'TIP') &&
                    withdrawalType && withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE' &&
                    regularWithdrawalType && regularWithdrawalType === 'PROPORTIONATELY_ACROSS_ALL_FUNDS' &&
                    this.getPercentageEachYearField()
                }
                {
                    regularWithdrawalType &&
                    regularWithdrawalType === 'FROM_SPECIFIC_FUNDS' &&
                    <div>
                        <p className='pes-text-belt'>Fund based withdrawals can be no more than 7.5 % of the total plan value</p>
                        <div className='pes-table-area'>
                            <div className='pes-table-list pes-specific-funds-table'>
                                <div className='tlhead'>
                                    <div className='tlrow'>
                                        <div className='tlcell col-xs-4 text-capitalize'>Fund Name</div>
                                        <div className='tlcell col-xs-4 text-capitalize'>Current Value (£)</div>
                                        {!isPercentageFund &&
                                        <div className='tlcell col-xs-4 text-capitalize'>Withdrawal Amount of the fund value (£)</div>
                                        }
                                        {isPercentageFund &&
                                        <div className='tlcell col-xs-4 text-capitalize'>Withdrawal percentage of the fund value</div>
                                        }
                                    </div>
                                </div>

                                <div className='tlbody'>                              
                                    <FieldArray name='funds' component={renderFunds} onWithdrawalChange={onWithdrawalChange} isPercentage={isPercentageFund} productGroupType={productGroupType} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default RegularWithdrawalTypeSection;