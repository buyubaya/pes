import React, {PropTypes} from 'react';
import {Field, FormSection} from 'redux-form';
import {renderRadioGroup, renderTextInput, renderCurrency} from '../../../validations/FieldRendering';
import {renderInputGroup} from '../../../validations/FieldRendering';
import IconInfo from '../../common/IconInfo';
import {get as _get, map as _map} from 'lodash';
import ProductGroups from '../../../constants/ProductGroups';
import {FIELD_NAMES, OPTIONS_DATA} from './constants';
import StringUtils from '../../../utils/StringUtils';


// UTILS
const _renderCurrency = renderInputGroup(renderCurrency);
const _renderTextInput = renderInputGroup(renderTextInput);
const _renderRadioGroup = renderInputGroup(renderRadioGroup);
const numberNormalize = (value, previousValue) => (!value) ? '0.00' : value;
const validateNumber = (value) => value < 0 ? 'Value must be positive' : undefined;


class PartialSurrenderDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        funds: PropTypes.array,
        surrenderOption: PropTypes.string,
        partialSurrenderType: PropTypes.string
    };

    render(){
        const partialSurrenderType = _get(this.context, 'partialSurrenderType');
        const productGroup = _get(this.context, 'plan.productGroupType');
        const productType = _get(this.context, 'plan.productType');
        const funds = _get(this.context, 'funds');
        let totalCurrentValue = _get(this.context, 'plan.planDetail.currentValue');
        if(productGroup === ProductGroups.TIP){
            totalCurrentValue = _get(this.context, 'plan.planDetail.protectedCurrentValue')*1 + _get(this.context, 'plan.planDetail.nonProtectedCurrentValue')*1;
        }
        
        const isGMF = productGroup === ProductGroups.GMF;
        const isTip = productGroup === ProductGroups.TIP;
        const isB34 = productGroup === ProductGroups.B34;
        let showB34PartialSurrenderType = false;
        if((partialSurrenderType === OPTIONS_DATA.partialSurrenderType.acrossAllFund.value)){
            if(
                isB34 || 
                (productGroup === ProductGroups.TIP && productType == 'A00035')
            ){
                showB34PartialSurrenderType = true;
            }
        }

        let icon = null;
        if(isB34){
            icon = <IconInfo className='pull-right' section='#surrenderInfo' />;
        }
        if(isTip){
            icon = <IconInfo className='pull-right' section='/tip#A001' />;
        }

        
        return(
            <div>
                {
                    (isGMF || isTip) &&
                    <p className='pes-text-belt text-capitalize'>
                        {_get(this.context, `content.partialSurrenderTitle`)}
                    </p>
                }
                <div className='pes-table-list'>
                    <div className='tlbody'>
                        
                        <Field
                            inputLabel={isB34 ? _get(this.context, `content.partialSurrenderTitle`) : _get(this.context, `content.partialSurrenderTypeLabel`)}
                            name={FIELD_NAMES.partialSurrenderType}
                            data={_get(this.context, `content.partialSurrenderTypeData`)}
                            className='pes-radio-group group-inline'
                            className1='col-xs-4 input-label text-capitalize clearfix'
                            className2='col-xs-8 input-field text-capitalize'
                            component={_renderRadioGroup}
                            labelPrepend={icon}
                            showError
                        />

                        {
                            partialSurrenderType &&
                            <Field
                                inputLabel={_get(this.context, `content.totalSurrenderAmountLabel`)+(' £')}
                                name={FIELD_NAMES.totalSurrenderAmount}
                                className='pes-input-group text-capitalize input-currency'
                                className1='col-xs-4 input-label text-capitalize'
                                className2='col-xs-8 input-field text-capitalize'
                                component={_renderCurrency}
                                positiveValue
                                validate={validateNumber}
                                digits={2}
                                showError
                            />
                        }

                        {
                            showB34PartialSurrenderType &&
                            <Field
                                inputLabel={_get(this.context, `content.partialSurrenderTypeLabel`)}
                                name={FIELD_NAMES.B34PartialSurrenderType}
                                data={_get(this.context, `content.B34PartialSurrenderTypeData`)}
                                className='pes-radio-group group-inline'
                                className1='col-xs-4 input-label text-capitalize clearfix'
                                className2='col-xs-8 input-field text-capitalize'
                                component={_renderRadioGroup}
                                showError
                            />
                        }
                        
                        {
                            partialSurrenderType &&
                            partialSurrenderType === OPTIONS_DATA.partialSurrenderType.fromSpecificFund.value &&
                            <FormSection name={FIELD_NAMES.specifyFunds}>
                                <p className='pes-text-belt text-capitalize'>
                                    {_get(this.context, `content.specifyFundsTitle`)}
                                </p>
                                <div className='pes-table-area'>
                                    <div className='pes-table-list pes-specific-funds-table align-middle'>
                                        <div className='tlhead'>
                                            <div className='tlrow'>
                                                <div className='tlcell col-xs-4 text-capitalize'>
                                                    {_get(this.context, `content.fundName`)}
                                                </div>
                                                <div className='tlcell col-xs-4 text-capitalize'>
                                                    {_get(this.context, `content.currentValue`)}
                                                </div>
                                                <div className='tlcell col-xs-4 text-capitalize'>
                                                    {_get(this.context, `content.surrenderAmount`)}
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            funds && (funds.length > 0) &&
                                            <div className='tlbody'>
                                                {
                                                    _map(funds, (item, index) =>
                                                    <div key={index}>
                                                        <div className='tlrow'>
                                                            <div className='tlcell col-xs-4'>
                                                                {item.name}
                                                            </div>
                                                            <div className='tlcell col-xs-4'>
                                                                {StringUtils.convertToCurrency(item.value, false).total}
                                                            </div>
                                                            <div className='tlcell col-xs-4'>
                                                                <Field
                                                                    className='pes-input-group'
                                                                    name={`[${index}].${FIELD_NAMES.fundName}`}
                                                                    component={renderTextInput}
                                                                    type='hidden'
                                                                    defaultValue={item.name}
                                                                />
                                                                <Field
                                                                    className='pes-input-group'
                                                                    name={`[${index}].${FIELD_NAMES.currentValue}`}
                                                                    component={renderTextInput}
                                                                    type='hidden'
                                                                    defaultValue={item.value}
                                                                />
                                                                <Field
                                                                    className='pes-input-group input-currency'
                                                                    name={`[${index}].${FIELD_NAMES.surrenderAmount}`}
                                                                    component={renderCurrency}
                                                                    defaultValue='0.00'
                                                                    digits={2}
                                                                    positiveValue
                                                                    validate={validateNumber}
                                                                    // normalize={numberNormalize}
                                                                    showError
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>)
                                                }
                                                <div className='tlrow'>
                                                    <div className='tlcell col-xs-4 col-xs-offset-4 lh-input'>
                                                        {StringUtils.convertToCurrency(totalCurrentValue, false).total}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        
                                    </div>
                                </div>
                            </FormSection>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default PartialSurrenderDetails;