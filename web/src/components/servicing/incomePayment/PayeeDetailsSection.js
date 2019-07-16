import React, {PropTypes} from 'react';
import {Field, FormSection, reduxForm, formValueSelector} from 'redux-form';
import {renderInput, renderRadioGroup, renderNumberPicker, renderMultiSelect, renderCheckbox} from '../../../validations/FieldRendering';
import PayeeDetails from '../../servicing/PayeeDetails';
import ChequePayeeDetails from '../../servicing/ChequePayeeDetails';

class PayeDetailsSection extends React.Component {
    static contextTypes = {
        paymentType: PropTypes.string
    };

    render(){
        const paymentType = this.context && this.context.paymentType;

        return(
            <div className='pes-income-payment-section'>
                {paymentType && <div className='pes-section-title'>Payee Details</div>}
                {
                    paymentType && 
                    paymentType === 'BACS' &&
                    <FormSection name='payeeDetails'><PayeeDetails showAccountHolderText showRequired /></FormSection>
                    
                }
                {
                    paymentType && 
                    paymentType === 'CHEQUE' &&
                    <FormSection name='chequePayeeDetail'><ChequePayeeDetails /></FormSection>
                }
            </div>
        );
    }
}

export default PayeDetailsSection;