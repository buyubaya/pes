import React, { PropTypes } from 'react';
import {Field} from 'redux-form';
import {renderRadioGroup, renderInputGroup} from '../../../validations/FieldRendering';
export const required = value => value ? undefined : "Please supply or check missing or invalid details below and then click 'Submit'.";

const _renderRadioGroup = renderInputGroup(renderRadioGroup);

class DistributionSection extends React.Component {
    static propTypes = {
        distributionOption: PropTypes.string,
        paymentWhen: PropTypes.string,
        paymentType: PropTypes.string
    };
    _renderPaymentType = () => {
        return (
            <div>
                {/* <div className='tlcell col-xs-4 input-label'>
                    How do you want to receive payments?
                </div>
                <div className='tlcell col-xs-8 input-field'>
                    <Field
                        name='paymentType'
                        data={[
                            {value: 'BACS', label: 'Bank Transfer'},
                            {value: 'CHEQUE', label: 'Cheque'}
                        ]}
                        defaultValue={this.props.paymentType}//'bankTransfer'
                        className='pes-radio-group group-inline'
                        validate={[required]} 
                        showError
                        component={renderRadioGroup}
                    />
                </div> */}
                <Field
                    name='paymentType'
                    data={[
                        {value: 'BACS', label: 'Bank Transfer'},
                        {value: 'CHEQUE', label: 'Cheque'}
                    ]}
                    defaultValue={this.props.paymentType}//'bankTransfer'
                    className='pes-radio-group group-inline'
                    validate={[required]} 
                    showError
                    component={_renderRadioGroup}
                    inputLabel={' How do you want to receive payments?'}
                    className1={'col-xs-4'}
                    className2={'col-xs-8'}
                />
            </div>
        );
    }
    _renderPaymentWhen = () => {
        return(
            <div className='tlrow row'>
                <Field
                    name='paymentWhen'
                    data={[
                        {value: 'IMMEDIATELY', label: 'Immediately'},
                        {value: 'AFTERNEXT', label: 'After the next distribution'}
                    ]}
                    defaultValue={this.props.paymentWhen}//'immediately'
                    className='pes-radio-group group-inline'
                    validate={[required]} showError
                    component={_renderRadioGroup}
                    inputLabel={'When is the first payment required'}
                    className1={'col-xs-4'}
                    className2={'col-xs-8'}
                />
                {/* <div className='tlcell col-xs-4 input-label'>
                    When is the first payment required
                    <span className='icon-required'></span>
                </div>
                <div className='tlcell col-xs-8 input-field'>
                    <Field
                        name='paymentWhen'
                        data={[
                            {value: 'IMMEDIATELY', label: 'Immediately'},
                            {value: 'AFTERNEXT', label: 'After the next distribution'}
                        ]}
                        defaultValue={this.props.paymentWhen}//'immediately'
                        className='pes-radio-group group-inline'
                        validate={[required]} showError
                        component={renderRadioGroup}
                    />
                </div> */}
                <div className='tlcell col-xs-12'>
                    If the first payment is required immediately it will be made on the 15th of next month. If payment is made after next distribution this will be made on the month after the next distribution. Distribution dates are 1st March and 1st September.
                </div>
            </div>
        );
    }
    render(){
        const {distributionOption, paymentWhen} = this.props;
        return(
            <div className='pes-distribution-section'>
                <p className='pes-page-title'>Distributions</p>
                <div className='pes-table-list ovf-v'>
                    <div className='tlbody'>
                        <div>
                            {/* <div className='tlcell col-xs-4 input-label'>
                                Select distribution change option
                            </div>
                            <div className='tlcell col-xs-8 input-field'>
                                <Field
                                    name='distributionOption'
                                    data={[
                                        {value: 'START', label: 'Start Distribution Payment'},
                                        {value: 'AMEND', label: 'Amend Distribution Payment'},
                                        {value: 'STOP', label: 'Stop Distribution Payment'}
                                    ]}
                                    defaultValue={distributionOption}//'startDistributionPayment'
                                    className='pes-radio-group group-inline'
                                    validate={[required]}
                                    showError
                                    component={renderRadioGroup}
                                />
                            </div> */}
                            <Field
                                name='distributionOption'
                                data={[
                                    {value: 'START', label: 'Start Distribution Payment'},
                                    {value: 'AMEND', label: 'Amend Distribution Payment'},
                                    {value: 'STOP', label: 'Stop Distribution Payment'}
                                ]}
                                defaultValue={distributionOption}//'startDistributionPayment'
                                className='pes-radio-group group-inline'
                                validate={[required]}
                                showError
                                component={_renderRadioGroup}
                                inputLabel={'Select distribution change option'}
                                className1={'col-xs-4'}
                                className2={'col-xs-8'}
                            />
                        </div>
                        {
                            (distributionOption === 'START' 
                            || distributionOption === 'AMEND')
                            && this._renderPaymentWhen()
                        }
                        {
                            (distributionOption === 'START' 
                            || distributionOption === 'AMEND')
                            && paymentWhen && this._renderPaymentType()
                        }
                    </div>
                </div>
            </div> 
        );
    }
}
export default DistributionSection;