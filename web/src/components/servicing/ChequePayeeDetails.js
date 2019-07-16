import React, {PropTypes} from 'react';
import {Field} from 'redux-form';
import {renderInput, renderRadioGroup,renderInputGroup} from '../../validations/FieldRendering';
import {required,maxLength} from '../../validations/FieldValidations';


const _renderInputGroup = renderInputGroup(renderInput);
const _renderRadioGroup = renderInputGroup(renderRadioGroup);


class ChequePayeeDetails extends React.Component {
    static propTypes = {
        showAccountHolder: PropTypes.bool    
    };

    static defaultProps = {
        showAccountHolder: false    
    };

    static contextTypes = {
        productGroupType: PropTypes.string    
    };

    render(){
        const {showAccountHolder} = this.props;
        const productGroupType = this.context && this.context.productGroupType;

        return(
            <div className='pes-table-list'>
                <div className='tlbody'>      
                    <Field
                        className='pes-input-group'
                        name='payableTo'
                        type='text'
                        className1='col-xs-4 text-capitalize'
                        className2='col-xs-8'
                        component={_renderInputGroup}
                        validate={[required]}
                        showError
                        normalize={maxLength(40)}
                        inputLabel={showAccountHolder ? 'Account holder name' : 'Cheque should be made payable to'}
                    />

                    {
                        productGroupType !== 'TIP' &&
                        <div>
                            <Field
                                name='notPlanHolder'
                                data={[
                                    {value: true, label: 'Yes'},
                                    {value: false, label: 'No'}
                                ]}
                                className='pes-radio-group group-inline d-inline-block ml-20'
                                className1='no-capitalize'
                                component={_renderRadioGroup}
                                showError
                                validate={[required]}
                                inputLabel='Are the monies to be paid to anyone who is not a plan holder?'
                            />
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
    }
}


export default ChequePayeeDetails;