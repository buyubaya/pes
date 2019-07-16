import React, { PropTypes } from 'react';
import {Field} from 'redux-form';
import {renderRadioGroup} from '../../../validations/FieldRendering';
import {renderInputGroup} from '../../../validations/FieldRendering';
import PartialSurrenderDetails from '../../../components/servicing/surrender/PartialSurrenderDetails';
import {get as _get} from 'lodash';
import {FIELD_NAMES, OPTIONS_DATA} from './constants';
import ProductGroups from '../../../constants/ProductGroups';


class SurrenderSection extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        surrenderOption: PropTypes.string,
        partialSurrenderType: PropTypes.string,
        B34PartialSurrenderType: PropTypes.string,
        paymentType: PropTypes.string,
        submitErrors: PropTypes.object,
        handleChangeSurrenderType: PropTypes.func,
        _isPaymentTypeDisplay: PropTypes.func
    };


    render(){
        const surrenderOption = this.context && this.context.surrenderOption;
        const partialSurrenderType = this.context && this.context.partialSurrenderType;
        const B34PartialSurrenderType = this.context && this.context.B34PartialSurrenderType;
        const paymentType = this.context && this.context.paymentType;
        const submitErrors = this.context && this.context.submitErrors;
        const productGroup = _get(this.context, 'plan.productGroupType');
        const productType = _get(this.context, 'plan.productType');
        const isB34 = productGroup === ProductGroups.B34;
        const isTIP = productGroup === ProductGroups.TIP;
        const handleChangeSurrenderType = this.context.handleChangeSurrenderType;
        const _isPaymentTypeDisplay = this.context._isPaymentTypeDisplay;
        
        return(
            <div className='pes-surrender-section'>
                <p className='pes-page-title'>{_get(this.context, `content.surrenderTitle`)}</p>
                <div className='pes-table-list ovf-v'>
                    <div className='tlbody'>

                        <Field
                            inputLabel={_get(this.context, `content.surrenderTypeLabel`)}
                            name={FIELD_NAMES.surrenderType}
                            data={_get(this.context, `content.surrenderTypeData`)}
                            className='pes-radio-group group-inline'
                            className1='col-xs-4 input-label text-capitalize'
                            className2='col-xs-8 input-field text-capitalize'
                            component={renderInputGroup(renderRadioGroup)}
                            showError
                            onChange={handleChangeSurrenderType}
                        />

                        {
                            surrenderOption && 
                            surrenderOption === OPTIONS_DATA.surrenderType.partialSurrender.value &&
                            <PartialSurrenderDetails />
                        }
                        {
                            _isPaymentTypeDisplay() &&
                            <Field
                                inputLabel={(isB34 || isTIP) ? _get(this.context, `content.paymentTypeQuestion`) : _get(this.context, `content.paymentTypeLabel`)}
                                name={FIELD_NAMES.paymentType}
                                data={_get(this.context, `content.paymentTypeData`)}
                                className='pes-radio-group group-inline'
                                className1='col-xs-4 input-label text-capitalize'
                                className2='col-xs-8 input-field text-capitalize'
                                component={renderInputGroup(renderRadioGroup)}
                                showError
                            />
                        }
                        
                    </div>

                </div>
            </div>
        );
    }
}




export default SurrenderSection;