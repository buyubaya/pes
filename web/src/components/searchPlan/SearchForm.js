import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, change } from 'redux-form';
import Button from '../common/Button';
import {renderInput} from '../../validations/FieldRendering';
import {required, maxLength} from '../../validations/FieldValidations';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

class SearchForm extends  Component {  
 
    render() {
        const {handleSubmit, clear} = this.props;
        const fields = ['planNumber01', 'planNumber02', 'planNumber03', 'planNumber04', 'planNumber05'];
        const environment = EnvironmentUtils.get('environment');
        const { termsOfUseUrl } = environment;
                            
		return (
        <div className='form-area'>
            <form onSubmit={handleSubmit}>
                <div className='pes-table-list'>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <Field
                                className='pes-input-group'
                                name='planNumber01'
                                type='text'
                                normalize ={maxLength(14)}
                                component={renderInput}                          
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <Field
                                className='pes-input-group'
                                name='planNumber02'
                                type='text'
                                normalize ={maxLength(14)}
                                component={renderInput}
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <Field
                                className='pes-input-group'
                                name='planNumber03'
                                type='text'
                                normalize ={maxLength(14)}
                                component={renderInput}
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <Field
                                className='pes-input-group'
                                name='planNumber04'
                                type='text'
                                normalize ={maxLength(14)}
                                component={renderInput}
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <Field
                                className='pes-input-group'
                                name='planNumber05'
                                type='text'
                                normalize ={maxLength(14)}
                                component={renderInput}
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            By submitting a plan enquiry you agree to abide by the <a href={termsOfUseUrl} target='_blank' className='text-underline'>terms of use</a>
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <div className='pes-btn-group clearfix'>
                                <Button 
                                    type='button'
                                    className='pes-btn pes-btn-default pull-left' 
                                    label='Clear' 
                                    //onClick={PageActions.clearFields(ContentTypes.SEARCH_PLAN_FORM, fields, ContentTypes.SEARCH_FORM_SESSION)}                        
                                    onClick={clear}                        
                                />
                                <Button 
                                    type='submit'
                                    className='pes-btn pes-btn-default pull-right' 
                                    label='Submit'                         
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='pes-plan-number-list list-none'>                    
                    <div className='form-group'>
                        <Field
                            className='pes-input-group'
                            name='planNumber01'
                            type='text'
                            normalize ={maxLength(14)}
                            component={renderInput}                          
                        />
                    </div>
                    <div className='form-group'>
                        <Field
                            className='pes-input-group'
                            name='planNumber02'
                            type='text'
                            normalize ={maxLength(14)}
                            component={renderInput}
                        />
                    </div>
                    <div className='form-group'>
                        <Field
                            className='pes-input-group'
                            name='planNumber03'
                            type='text'
                            normalize ={maxLength(14)}
                            component={renderInput}
                        />
                    </div>
                    <div className='form-group'>
                        <Field
                            className='pes-input-group'
                            name='planNumber04'
                            type='text'
                            normalize ={maxLength(14)}
                            component={renderInput}
                        />
                    </div>
                    <div className='form-group'>
                        <Field
                            className='pes-input-group'
                            name='planNumber05'
                            type='text'
                            normalize ={maxLength(14)}
                            component={renderInput}
                        />
                    </div>
                </div> */}

                {/* <p className='text'>By submitting a plan enquiry you agree to abide by the <a href='https://www.zurich.co.uk/en/services/legal-business' target='_blank' className='text-underline'>terms of use</a></p> */}

                {/* <div className='pes-btn-group my-20 clearfix'>
                    <Button 
                        type='button'
                        className='pes-btn pes-btn-default pull-left' 
                        label='Clear' 
                        //onClick={PageActions.clearFields(ContentTypes.SEARCH_PLAN_FORM, fields, ContentTypes.SEARCH_FORM_SESSION)}                        
                        onClick={this.handleReset}                        
                    />
                    <Button 
                        type='submit'
                        className='pes-btn pes-btn-default pull-right' 
                        label='Submit'                         
                    />
                </div> */}
            </form>
        </div>);
	}
}

export default reduxForm({
    form: 'searchPlan'    
})(SearchForm);



  
