import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import {Field, reduxForm, change} from 'redux-form';
// COMPONENTS
import Button from '../common/Button';
import {renderTextInput, renderCheckbox, renderDropdown} from '../../validations/FieldRendering';


class NotificationsTab extends React.Component {
    render(){
        return(
            <div className='pes-notifications-tab'>

                <div className='pes-text-belt'>
                    Select the types and frequency of notifications that you would like to receive
                </div>
                <div className='pes-table-list ovf-v'>

                    <div className='tlrow'>
                        <div className='tlcell col-xs-8'>
                            Daily (Monday - Friday morning) notifications of changes to plans that require your attention
                        </div>
                        <div className='tlcell col-xs-4'>
                            <Field 
                                className='pes-checkbox'
                                name='daily'
                                component={renderCheckbox}
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-8'>
                            Weekly (Morning) notifications of changes to plans that require your attention
                        </div>
                        <div className='tlcell col-xs-4'>
                            <Field 
                                className='pes-checkbox d-inline-block'
                                name='weekly'
                                component={renderCheckbox}
                            />
                            <Field 
                                className='pes-dropdown d-inline-block'
                                name='weekly'
                                component={renderDropdown}
                                data={[
                                    {value: 'monday', label: 'Monday'},
                                    {value: 'tuesday', label: 'Tuesday'},
                                    {value: 'wednesday', label: 'Wednesday'},
                                    {value: 'thursday', label: 'Thursday'},
                                    {value: 'friday', label: 'Friday'},
                                    {value: 'saturday', label: 'Saturday'},
                                    {value: 'sunday', label: 'Sunday'}
                                ]}
                                valueField='value'
                                textField='label'
                                defaultValue={'monday'}
                            />
                        </div>
                    </div>

                    <div className='tlrow'>
                        <div className='tlcell col-xs-12 text-bold'>
                            Select where you would like your notifications to be sent
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-8'>
                            Register email address: QA_EnvironmentsTeam@uk.zurich.com
                        </div>
                        <div className='tlcell col-xs-4'>
                            <Field 
                                className='pes-checkbox'
                                name='email'
                                component={renderCheckbox}
                            />
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-8'>
                            Alternative email address
                        </div>
                        <div className='tlcell col-xs-4'>
                            <Field 
                                className='pes-checkbox d-inline-block'
                                name='altEmailCheckbox'
                                component={renderCheckbox}
                            />
                            <Field 
                                className='pes-input-group d-inline-block align-middle'
                                name='altEmail'
                                component={renderTextInput}
                            />
                        </div>
                    </div>

                    <div className='tlrow'>
                        <div className='tlcell col-xs-12'>
                            <Button 
                                className='pes-btn pes-btn-default'
                                label='Update'
                            />
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}


// export default reduxForm({
//     form: 'myProfileNotifications'
// })(NotificationsTab);

export default compose(
    connect(
        state => ({aa: state.form && state.form.myProfileNotifications})        
    ),
    reduxForm({
        form: 'myProfileNotifications'
    })
)(NotificationsTab);