import React, {PropTypes} from 'react';
import {Field, untouch, change, reset} from 'redux-form';
import {renderInput, renderRadioGroup, renderDropdown, renderDatePicker, renderInputGroup} from '../../../validations/FieldRendering';
import {required, datetime} from '../../../validations/FieldValidations';
import {isBlankAmountEachYear, isNotNumberic, isNotNumbericTIP, amountExceedsMax, amountExceedsMaxTIP, notInRangeDef, notInRange075, notInRange010, notInRange010GMF, startDateInRange} from '../../../validations/RegularWithdrawal';
import { setTimeout } from 'timers';

const _renderDropdown = renderInputGroup(renderDropdown);
const _renderDatePicker = renderInputGroup(renderDatePicker);
const _renderInput = renderInputGroup(renderInput);
class RegularWithdrawalSection extends React.Component {

    static contextTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func,
        withdrawalOption: PropTypes.string,
        withdrawalType: PropTypes.string,
        amountEachYear: PropTypes.string,
        funds: PropTypes.array,
        totalFunds: PropTypes.number,
        withdrawalIncrease: PropTypes.string,
        productGroupType: PropTypes.string
    };

    _calculatePerEachYear() {
        const totalFunds = this.context && this.context.totalFunds;
        //const funds = this.context && this.context.funds;
        const amountEachYear = this.context && this.context.amountEachYear;

        if (totalFunds && amountEachYear && !isNaN(Number(amountEachYear))) {
            const perEachYear = ((Number(amountEachYear) / totalFunds) * 100).toFixed(2);
            
            this.context.dispatch(change('servicingRegularWithdrawal', 'percentageEachYear', perEachYear));
        }
    }

    _onChangewithdrawalOption() {
        setTimeout(() => {
            const temp = this.context.withdrawalOption;
            const funds = this.context.funds;

            this.context.dispatch(reset('servicingRegularWithdrawal'));

            this.context.dispatch(change('servicingRegularWithdrawal', 'withdrawalOption', temp));
            this.context.dispatch(change('servicingRegularWithdrawal', 'funds', funds));
        }, 500);
    }

    _onChangeWithdrawalIncrease() {
        setTimeout(() => {
            const withdrawalIncrease = this.context && this.context.withdrawalIncrease;

            if (withdrawalIncrease !== 'PERCENTAGE') {
                this.context.dispatch(change('servicingRegularWithdrawal', 'annualPerIncrease', ''));
            }
        }, 500);
    }
    _onChangeTypeOfWithdrawalField(value){
        const formName = 'servicingRegularWithdrawal';
        this.context.dispatch(change(formName, 'payeeDetails.bankName', ''));
        this.context.dispatch(change(formName, 'payeeDetails.sortCode', '')); 
        this.context.dispatch(change(formName, 'payeeDetails.branchName', null)); 
        this.context.dispatch(change(formName, 'payeeDetails.accountNumber', null));
        this.context.dispatch(change(formName, 'regularWithdrawalType', null));
        this.context.dispatch(untouch(formName, 'regularWithdrawalType'));
        this.context.dispatch(change(formName, 'amountEachYear', null));
        this.context.dispatch(untouch(formName, 'amountEachYear'));
        this.context.dispatch(change(formName, 'percentageEachYear', null));
        const funds = this.context.funds;
        this.context.dispatch(change(formName, 'funds', funds));
        this.context.dispatch(change(formName, 'totalWithdrawalAmount', 0));
        this.context.dispatch(change(formName, 'totalWithdrawalAmountPer', 0));
    }
    getRegularWithdrawalOptionField()
    {
        return(
            <div className='tlrow row'>
                <div className='tlcell col-xs-4 input-label text-capitalize'>Select Regular Withdrawal Option</div>
                <div className='tlcell col-xs-8 input-field'>
                    <Field
                        name='withdrawalOption'
                        data={[
                            {value: 'add', label: 'Add Regular Withdrawal'},
                            {value: 'amend', label: 'Amend Regular Withdrawal'},
                            {value: 'remove', label: 'Remove Regular Withdrawal'}
                        ]}
                        className='pes-radio-group group-inline'
                        component={renderRadioGroup}
                        showError={false}
                        onChange={::this._onChangewithdrawalOption}
                    />
                </div>
            </div>
        );
    }

    getTypeOfWithdrawalField(){
        return (
            <Field 
                className='pes-dropdown'
                name='withdrawalType'
                data ={[
                    {
                        value: 'AMOUNT_EACH_YEAR',
                        label: 'Amount each year'
                    },
                    {
                        value: 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE',
                        label: 'Percentage each year of the plan value'
                    },
                    {
                        value: '',
                        label: 'Select'
                    }
                ]}
                defaultValue=''
                valueField='value'
                textField='label'
                component={_renderDropdown}
                placeholder='Select'
                showError
                inputLabel='Type of withdrawal:'
                className1='col-xs-4 text-capitalize'
                className2='col-xs-8'
                onChange={::this._onChangeTypeOfWithdrawalField}
                validate={[required]}
            />
        );
    }

    getAmountEachYearField() {
        const totalFunds = this.context && this.context.totalFunds;
        const productGroupType = this.context && this.context.productGroupType;
        // let validates = productGroupType === 'TIP' ? [isBlankAmountEachYear, isNotNumbericTIP, amountExceedsMaxTIP(totalFunds)] 
        //     : [isBlankAmountEachYear, isNotNumberic, amountExceedsMax(totalFunds)];
        let validates = productGroupType === 'TIP' ? [isBlankAmountEachYear, isNotNumbericTIP, amountExceedsMaxTIP] 
            : [isBlankAmountEachYear, isNotNumberic, amountExceedsMax];
        return(
            <div className='tlrow row'>
            <div className='tlcell col-xs-4 input-label text-capitalize'>Amount / Percentage each year:</div>
            <div className='tlcell col-xs-8 input-field'>
                <div className='group-inline'>
                    <Field
                        className='pes-input-group amount-per-year input-currency'
                        name='amountEachYear'
                        type='text'
                        component={renderInput}
                        onBlur={::this._calculatePerEachYear}
                        validate={validates}
                        showError
                    />
                    <Field
                        className='pes-input-group w-percent'
                        name='percentageEachYear'
                        type='text'
                        component={renderInput}
                        disabled
                    />
                    <span className='s-withdrawal-7-5'>% The maximum fund withdrawal is 7.5 % of the total plan value</span>
                </div>
            </div>
        </div>
        );
    }

    getHowIsTheWithdrawalIncreasedField() {
        return(
            <Field 
                className='pes-dropdown'
                name='withdrawalIncrease'
                data ={[
                    {
                        value: 'NO_INCREASE',
                        label: 'No increase'
                    },
                    {
                        value: 'INLINE_WITH_AEI',
                        label: 'Inline with AEI'
                    },
                    {
                        value: 'INLINE_WITH_RPI',
                        label: 'Inline with RPI'
                    },
                    {
                        value: 'PERCENTAGE',
                        label: 'Percentage'
                    },
                    {
                        value: '',
                        label: 'Select'
                    }
                ]}
                valueField='value'
                textField='label'
                component={_renderDropdown}
                placeholder='Select'
                onChange={::this._onChangeWithdrawalIncrease}
                validate={[required]}
                showError
                className1='col-xs-4 text-capitalize'
                className2='col-xs-8'
                inputLabel='How is the withdrawal to increase?'
            />
        );
    }

    getAnnualPercentageIncreaseField() {
        const withdrawalIncrease = this.context && this.context.withdrawalIncrease;
        const productGroupType = this.context && this.context.productGroupType;
        const enable = withdrawalIncrease === 'PERCENTAGE';
        const validates = productGroupType && productGroupType === 'GMF' ? [required, isNotNumberic, notInRange010GMF] : [required, notInRangeDef];

        return(
            // <div className='tlrow row'>
            //     <div className='tlcell col-xs-4 input-label text-capitalize'>Annual percentage increase:</div>
            //     <div className='tlcell col-xs-8 input-field'>
            //         <div className='group-inline'>
            //             <Field
            //                 className='pes-input-group w-percent'
            //                 name='annualPerIncrease'
            //                 type='text'
            //                 component={renderInput}
            //                 disabled={!enable}
            //                 validate={enable ? validates : undefined}
            //                 showError
            //             />%
            //         </div>
            //     </div>
            // </div>
            <div className='annualPerIncrease'>
                <Field
                    className='pes-input-group w-percent'
                    className1='tlcell col-xs-4 input-label text-capitalize'
                    className2='tlcell col-xs-8 input-field'
                    name='annualPerIncrease'
                    type='text'
                    component={_renderInput}
                    disabled={!enable}
                    validate={enable ? validates : undefined}                    
                    showError
                    inputLabel='Annual percentage increase:'
                    hideDotRequired={!enable}
                />
                <span className='sp_annualPerIncrease'>%</span>
            </div>
        );
    }

    getFrequencyOfRegularWithdrawalsField()
    {
        return(
                <Field 
                    className='pes-dropdown'
                    name='withdrawalFrequency'
                    data ={[
                        {
                            value: 'EVERY_MONTH',
                            label: 'Every month'
                        },
                        {
                            value: 'EVERY_3_MONTHS',
                            label: 'Every 3 months'
                        },
                        {
                            value: 'EVERY_4_MONTHS',
                            label: 'Every 4 months'
                        },
                        {
                            value: 'EVERY_6_MONTHS',
                            label: 'Every 6 months'
                        },
                        {
                            value: 'ONCE_A_YEAR',
                            label: 'Once a year'
                        },
                        {
                            value: '',
                            label: 'Select'
                        }
                    ]}
                    defaultValue=''
                    valueField='value'
                    textField='label'
                    component={_renderDropdown}
                    placeholder='Select'
                    validate={[required]}
                    showError
                    className1='col-xs-4 text-capitalize'
                    className2='col-xs-8'
                    inputLabel='Frequency of regular withdrawals:'
                />
        );
    }

    getMonthOfFirstPaymentField()
    {
        return(
            <div className='tlrow row'>
                <div className='tlcell col-xs-4 input-label text-capitalize'>Select month of first payment:</div>
                <div className='tlcell col-xs-8 input-field'>
                <Field 
                    className='pes-dropdown'
                    name='monthOfFirstPayment'
                    data ={[
                        {
                            value: 'JANUARY',
                            label: 'January'
                        },
                        {
                            value: 'FEBRUARY',
                            label: 'February'
                        },
                        {
                            value: 'MARCH',
                            label: 'March'
                        },
                        {
                            value: 'APRIL',
                            label: 'April'
                        },
                        {
                            value: 'MAY',
                            label: 'May'
                        },
                        {
                            value: 'JUNE',
                            label: 'June'
                        },
                        {
                            value: 'JULY',
                            label: 'July'
                        },
                        {
                            value: 'AUGUST',
                            label: 'August'
                        },
                        {
                            value: 'SEPTEMBER',
                            label: 'September'
                        },
                        {
                            value: 'OCTOBER',
                            label: 'October'
                        },
                        {
                            value: 'NOVEMBER',
                            label: 'November'
                        },
                        {
                            value: 'DECEMBER',
                            label: 'December'
                        },
                        {
                            value: '',
                            label: 'Select'
                        }
                    ]}
                    valueField='value'
                    textField='label'
                    component={renderDropdown}
                    placeholder='Select'
                    validate={[required]}
                    showError
                />
                </div>
            </div>
        );
    }

    getStateDateField()
    {
        return(
            <Field
                name='startDate'
                component={_renderDatePicker}
                placeholder='dd/mm/yyyy'
                className='pes-input-group'
                validate={[datetime, startDateInRange]}
                showError
                className1='col-xs-4 text-capitalize'
                className2='col-xs-8'
                inputLabel='Start date:'
            />
        );
    }

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
    
    getRegularWithdrawalOptionsByAmount(){
        const productGroupType = this.context && this.context.productGroupType;

        return(
            <div className='withdrawal-options-area'>

            {/* AMOUNT/PERCENTAGE EACH YEAR */}
            {this.getAmountEachYearField()}
            
            {/* HOW IS THE WITHDRAWAL INCREASE */}
            {productGroupType && productGroupType !== 'TIP' &&
            this.getHowIsTheWithdrawalIncreasedField()
            }
            
            {/* ANNUAL PERCENTAGE INCREASE */}
            {productGroupType && productGroupType !== 'TIP' &&
            this.getAnnualPercentageIncreaseField()
            }
            
            {/* FREQUENCY OF REGULAR WITHDRAWAL */}
            {this.getFrequencyOfRegularWithdrawalsField()}

            {/* Month of first payment Or Start date*/}
            {productGroupType && productGroupType === 'GMF' ? this.getMonthOfFirstPaymentField() : this.getStateDateField()}
        </div>
        );
    }

    getRegularWithdrawalOptionsByPercentage(){
        const productGroupType = this.context && this.context.productGroupType;

        if (productGroupType === 'GMF') {
            return (
                <div className='withdrawal-options-area'>

                {/* FREQUENCY OF REGULAR WITHDRAWAL */}
                {this.getFrequencyOfRegularWithdrawalsField()}

                {this.getMonthOfFirstPaymentField()}

            </div>
            );
        }
        else if (productGroupType === 'TIP') {
            return (
                <div className='withdrawal-options-area'>

                {/* FREQUENCY OF REGULAR WITHDRAWAL */}
                {this.getFrequencyOfRegularWithdrawalsField()}

                {this.getStateDateField()}

            </div>
            );
        }
        else {
            return (
                <div className='withdrawal-options-area'>
    
                {/* FREQUENCY OF REGULAR WITHDRAWAL */}
                {this.getFrequencyOfRegularWithdrawalsField()}
    
                {this.getStateDateField()}
    
                {this.getPercentageEachYearField()}
    
            </div>
            );
        }
    }

    render(){
        const content = this.context.content;
        const withdrawalOption = this.context && this.context.withdrawalOption;
        const withdrawalType = this.context && this.context.withdrawalType;
        return(
            <div className='pes-regular-withdrawal-section'>
                <p className='pes-page-title'>{content.RegularWithdrawal}</p>
                <div className='pes-table-list ovf-v'>
                    <div className='tlbody'> 
                        {/* SELECT REGULAR WITHDRAWAL OPTION  */}
                        {this.getRegularWithdrawalOptionField()}

                        {/* TYPE OF WITHDRAWAL */}
                         {
                            withdrawalOption &&
                            withdrawalOption !== 'remove' &&
                            this.getTypeOfWithdrawalField()
                        }
                        
                        {
                            withdrawalOption &&
                            withdrawalOption !== 'remove' &&
                            withdrawalType === 'AMOUNT_EACH_YEAR' &&
                            this.getRegularWithdrawalOptionsByAmount()
                        }

                        {
                            withdrawalOption &&
                            withdrawalOption !== 'remove' &&
                            withdrawalType === 'PERCENTAGE_EACH_YEAR_OF_THE_PLAN_VALUE' &&
                            this.getRegularWithdrawalOptionsByPercentage()
                        }

                        {/* {
                            withdrawalOption &&
                            withdrawalOption === 'add' &&
                            <RegularWithdrawalTypeSection />
                        } */}
                    </div>
                </div>
            </div>                     
        );
    }
}

export default RegularWithdrawalSection;