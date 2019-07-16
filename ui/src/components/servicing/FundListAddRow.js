import React, {PropTypes} from 'react';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {renderMultiSelect} from '../../validations/FieldRendering';
import Button from '../common/Button';
import _ from 'lodash';
//import {required} from '../../validations/FieldValidations';
export const required = value => (typeof value === 'undefined' || value === null || value === '') ? 'Add is requested but no fund is selected. Please select at least one fund to add to the contribution list' : undefined;
class FundListAddRow extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={
            investmentFunds: this.props.investmentFunds
        };
    }
    static contextTypes = {
        productGroupType: PropTypes.string,
        onAddFunds: PropTypes.func
    };
    
    componentWillReceiveProps(props){
        this.setState({investmentFunds: props.investmentFunds});
    }
   
    render(){ 
        let {productGroupType} = this.context;
        productGroupType = _.isUndefined(productGroupType) ? '' : productGroupType.toLowerCase();
        return(
            <div>
                <div className='tlrow'>
                    <div className='tlcell col-xs-4'></div>
                    <div className='tlcell col-xs-8 bg-inputs-group'>
                        <div className='pr-btn'>
                            Select a fund by clicking on the fund and clicking the 'Add' button. Select more than one fund at a time by holding down the 'CTRL' key and clicking on the required funds in the list and clicking the 'Add' button
                        </div>
                    </div>
                </div>
                <div className='tlrow align-middle'>
                    <div className='tlcell col-xs-4 text-capitalize'>{this.props.investmentFundLabel}</div>
                    <div className='tlcell col-xs-8 bg-inputs-group'>
                        {this.props.showHeader && <div className='tlrow'>
                            <div className='tlcell col-xs-5'>
                                <span className='highlight'>Investment Funds</span>
                            </div>
                            <div className='tlcell col-xs-4'>
                                <span className='highlight'>SEDOL&nbsp;&nbsp;
                                <img src={require('../../../assets/images/info_icon.gif')}/> Panel Fund</span>
                            </div>
                        </div>}
                        <div className='investment-funds-area'>
                            <div className='input-field'>
                                <Field 
                                    className='pes-multiselect'
                                    name='investmentFunds'
                                    data={this.state.investmentFunds}
                                    component={renderMultiSelect}
                                    validate={[required]}
                                    showError
                                />
                            </div>
                            <div className='input-btn btn-add-fund'>
                                <Button className='pes-btn pes-btn-default' label='Add' onClick={this.props.handleSubmit(this.context.onAddFunds)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const selector = formValueSelector('fundListAddRow');
export default reduxForm({
    form: 'fundListAddRow'
})(FundListAddRow);