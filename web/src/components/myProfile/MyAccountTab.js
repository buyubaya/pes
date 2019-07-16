import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import {get} from 'lodash';
import {Field, reduxForm, change} from 'redux-form';
// COMPONENTS
import Button from '../common/Button';
import {renderTextInput, renderRadioGroup} from '../../validations/FieldRendering';
export const required = value => value ? undefined : "Please fill in this field";

import StringUtils from '../../utils/StringUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';
import {firmPostcode, emailMyAccount, forenameValidate, maxLength, surnameValidate, firmNameValidate} from '../../validations/FieldValidations';
import SecurityUtils from '../../utils/SecurityUtils';
import UserValidationStatusUtils from '../../utils/UserValidationStatusUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import AuthUtils from '../../utils/AuthUtils';
import FormErrorArea from '../common/FormErrorArea';
import * as LocalStorage from '../../utils/LocalStorage';

// API
import * as MyProfileActions from '../../actions/MyProfileActions';
import * as MyProfileApi from '../../api/MyProfileApi';
import HtmlUtils from '../../utils/HtmlUtils';


// HOCs
let _renderTextInput = Comp => ({inputLabel, ...rest}) => (
    <div className={(rest.meta.error && rest.meta.touched) ? 'tlrow has-error' : 'tlrow'}>
        <div className='tlcell col-xs-3 input-label align-top text-capitalize'>
            {inputLabel}
            <span className='icon-required'></span>
        </div>
        <div className='tlcell col-xs-9 input-label'>
            <Comp {...rest} />
        </div>
    </div>
);
_renderTextInput = _renderTextInput(renderTextInput);



class MyAccountTab extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            editMode: false,         
            validating: false,
            isInitialUpgrade: false,
            isValidatedgUpgrade: false         
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.validateUserInfo = this.validateUserInfo.bind(this);
        this.upgradeUserInfo = this.upgradeUserInfo.bind(this);

    }

    static propTypes = {
        content: PropTypes.object,        
        api: PropTypes.object,
        myProfile: PropTypes.object,        
        actions: PropTypes.object
    };

    componentDidMount() {
        //window.addEventListener('load', this.handleLoad);
    }
    
    handleEdit(){
        this.setState({editMode: true});
    }

    handleCancel(){
        this.setState({editMode: false});
        this.props.reset && this.props.reset();
    }

    updateUserInfo(values, dispatch, props){        
        let userInfo = props.myProfile.userInfo;
        if(_.isEmpty(userInfo) == false)
        {
            let data = this.buildRequestData(values, userInfo);
            let userId = userInfo.username;
            //console.log(data);          
            let options = { userId: userId, 
                            requestData: data};
            return props.api.updateUserProfile(options).then((result) => {
                if(result.status == 200)
                {
                    console.log('Updated successfully.');  
                    //update userinfo in local storage
                    this.props.api.getMyProfile({userId: userId})
                    .then((res) => {      
                        this.props.actions.getMyProfileSuccess(res); 
                        this.setState({editMode: false});    
                        AuthUtils.setUserInfo(JSON.stringify(res));                                           
                    });           
                }
                else {
                    console.log('Updated failed.'); 
                    throw new SubmissionError({_error: result.message});
                }
            });
        }
    }    

    validateUserInfo(){
        this.props.actions.updateUpgradeAccessTabClickedCount();
        TransitionUtils.transitionTo('/profile#upgradeAccess');
    }
    
    upgradeUserInfo(){
        TransitionUtils.transitionTo('/profile#upgradeAccess');
    }

    buildRequestData(form, userInfo){
        const data = userInfo.unipass === false ? {
            unipass: userInfo.unipass,
            forename: form.forename,
            surname: form.surname,
            email: form.email,
            firmName: form.firmName,
            firmPostcode: form.firmPostcode
            //emailNotification: form.emailNotification
        } : {
            unipass: userInfo.unipass, 
            firmPostcode: form.firmPostcode
            //emailNotification: form.emailNotification
        };
        return data;
    }
    _renderValidating(){
        let sText = 'For further information on Validation please see <a href=\"{0}\" target=\"_blank\">My profile help</a>.';
        const environment = EnvironmentUtils.get('environment');
        sText = StringUtils.stringFormatToReact(sText, environment.myProfileHelp);
        const {handleSubmit} = this.props;
        return(
            <div className='bg-notice p-10'>
                {sText}
                <br/>
                <div className='row'>
                    <div className='col-xs-3'>
                        Enter the validation code to validate your account.
                    </div>
                    <div className='col-xs-9 pl-10'>
                        <Button 
                            label='Validate'
                            className='pes-btn pes-btn-default'
                            onClick ={handleSubmit(this.validateUserInfo)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _renderValidatingUpgradeProcess(isAdviser, isPA=false){
        const environment = EnvironmentUtils.get('environment');
        let myProfileHelpText = 'For further information on Validation please see <a  href=\"{0}\" target=\"_blank\">My profile help</a>.';
        myProfileHelpText = StringUtils.stringFormatToReact(myProfileHelpText, environment.myProfileHelp);
        let sText = 'In addition, we have emailed your firm\'s principal at {0}, so that they can validate your request for access to client and plan data.';
        let userStatus = get(this.props, 'myProfile.userStatus');         
        if(userStatus.firmPrincipalEmail){
            sText = StringUtils.format(sText, userStatus.firmPrincipalEmail);
        }
        else {
            sText = "In addition, we have written to your firm's principal, so that they can validate your request for access to client and plan data."
        }
        const adviserText = 'You may now submit business on-line.';
        let paText = 'As you are a Practice Administrator, before you can submit business on-line the current validation process must be completed and the validation code input.<br />';
        paText = HtmlUtils.htmlToReact(paText);
        
        return(           
            <div className='bg-notice'>
                <div className='pes-text-belt'>Next steps</div>
                <div className='bg-grey p-10'>
                    <p>Thank you for providing the additional security information. {isAdviser && adviserText}</p>
                    <p>{sText}</p>
                    <p>As part of this communication, we have provided a validation code that needs to be forwarded to you. Once you have entered this code within the My Profile area of the Website you will be able to access our full range of on-line services.</p>
                    <p>{isPA && paText}</p>
                    <p>Your validation code remains valid for 28 days.</p>
                </div>
                <div className='pes-text-belt text-normal'>{myProfileHelpText}</div>
            </div>                 
        );
    }

    _renderValidatedlUpgradeProcess(){
        const environment = EnvironmentUtils.get('environment');
        let myProfileHelpText = 'For further information on Validation please see <a  href=\"{0}\" target=\"_blank\">My profile help</a>.';
        myProfileHelpText = StringUtils.stringFormatToReact(myProfileHelpText, environment.myProfileHelp);

        return(
                <div className='bg-notice'>                                  
                    <div className='pes-text-belt'>Your access has been upgraded</div>
                    <div className='bg-grey p-10'>
                        <p>
                            You may not have immediate access to new functionality. This will be resolved next time you log in.
                        </p>   
                        <p>
                            To continue select an option from one of the Menus above or go to our <a href='#' >Home</a> Page.
                        </p>                      
                    </div>
                    <div className='pes-text-belt text-normal'>
                        {myProfileHelpText}
                    </div>                    
                </div>
        );
    }

    _renderUpgradable(isUniPassUser){
        let sText = 'Further information on upgrading your account, and the additional functionality available following upgrade, is available within <a href=\"{0}\" target=\"_blank\">My profile help</a>.';
        const environment = EnvironmentUtils.get('environment');
        sText = StringUtils.stringFormatToReact(sText, environment.myProfileHelp);
        const {handleSubmit} = this.props;
        const userInfo = get(this.props, 'myProfile.userInfo');

        return(
            <div className='bg-notice p-10'>
                <p>
                    This website contains additional services that provide access to information about your clients and their plans.<br/>
                    To protect your client's data you must upgrade your account before you can access these services. {isUniPassUser && <br/>} As part of the upgrade process you will need to supply additional information about your relationship with Zurich. 
                </p>
                {
                    !isUniPassUser &&
                    <p>Once you have supplied this additional information we will send a validation code to your firm's principal to pass to you. Once you have received and entered the validation code on our website you will be able to access the additional services.</p>
                }
                <p>Upgrading your account is an optional one off process. If you decide not to upgrade now you can do so at anytime in the future by returning to My profile.</p>
                {sText}
                <div className='clearfix mt-10'>
                    <div className='col-xs-3 pl-0 pr-20'>
                        {
                            isUniPassUser
                            ?
                            'The upgrade process is easy and access to the additional services is instant for UNIPASS users.'
                            :
                            'Once you have started the upgrade process you can submit business online.'
                        }
                    </div>
                    <div>
                        <Button 
                            label='Upgrade'
                            className='pes-btn pes-btn-default'
                            onClick ={handleSubmit(this.upgradeUserInfo)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _renderMainMyAccount(){
        const {handleSubmit} = this.props;
        const myAccountContent = get(this.props, 'content.myProfile.myAccount');      
        const userInfo = get(this.props, 'myProfile.userInfo');
        const {editMode} = this.state;
        let isUnipassUser = get(this.props, 'myProfile.userInfo.unipass');   
        return(
                <div className='pes-table-list'>
                    <div className='tlbody'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 input-label'>{myAccountContent.username}</div>
                            <div className='tlcell col-xs-9 input-label'>{userInfo.username} </div>
                        </div>
                        {
                            (editMode && isUnipassUser === false)
                            ?
                            <Field 
                                inputLabel={myAccountContent.forename}
                                className='pes-input-group'
                                name='forename'
                                component={_renderTextInput}
                                normalize={maxLength(20)}
                                defaultValue={userInfo.forename}
                                validate={[required,forenameValidate]}
                                showError
                            />
                            :
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3 input-label'>{myAccountContent.forename}</div>
                                <div className='tlcell col-xs-9 input-label'>
                                    {userInfo.forename}   
                                </div>
                            </div>
                        }
                        {
                            (editMode && isUnipassUser === false)
                            ?
                            <Field 
                                inputLabel={myAccountContent.surname}
                                className='pes-input-group'
                                name='surname'
                                component={_renderTextInput}
                                normalize={maxLength(20)}
                                defaultValue={userInfo.surname}
                                validate={[required,surnameValidate]}
                                showError
                            />
                            :
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3 input-label'>{myAccountContent.surname}</div>
                                <div className='tlcell col-xs-9 input-label'>
                                    {userInfo.surname}
                                </div>
                            </div>
                        }
                        {
                            (editMode && isUnipassUser === false)
                            ?                        
                            <Field 
                                inputLabel={myAccountContent.email}
                                className='pes-input-group w-biggest'
                                name='email'
                                component={_renderTextInput}
                                normalize={maxLength(60)}
                                defaultValue={userInfo.email}
                                validate={[required, emailMyAccount]}
                                showError
                            />
                            :
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3 input-label'>{myAccountContent.email}</div>
                                <div className='tlcell col-xs-9 input-label'>
                                    {userInfo.email}
                                </div>
                            </div>
                        }
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 input-label'>{myAccountContent.role}</div>
                            <div className='tlcell col-xs-9 input-label'>
                                {userInfo.role ? this.getAdviser(userInfo.role) : ''}
                            </div>
                        </div>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-3 input-label text-capitalize'>{myAccountContent.fsaAuthorisationNumber}</div>
                            <div className='tlcell col-xs-9 input-label'>{userInfo.fsaNumber ? userInfo.fsaNumber : ''}</div>
                        </div>
                        {
                            (editMode && isUnipassUser === false)
                            ?                        
                            <Field 
                                inputLabel={myAccountContent.firmname}
                                className='pes-input-group w-biggest'
                                name='firmName'
                                component={_renderTextInput}
                                normalize={maxLength(80)}
                                defaultValue={userInfo.firmName}
                                validate={[required,firmNameValidate]}
                                showError
                            />                        
                            :
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3 input-label text-capitalize'>{myAccountContent.firmname}</div>
                                <div className='tlcell col-xs-9 input-label'>
                                    {userInfo.firmName ? userInfo.firmName : ''}
                                </div>
                            </div>
                        }
                        {
                            editMode
                            ?
                            <Field 
                                inputLabel={myAccountContent.firmPostcode}
                                className='pes-input-group'
                                name='firmPostcode'
                                component={_renderTextInput}
                                normalize={maxLength(8)}
                                defaultValue={userInfo.firmPostcode}
                                validate={[required, firmPostcode]}
                                showError
                            />
                            :
                            <div className='tlrow'>
                                <div className='tlcell col-xs-3 input-label text-capitalize'>{myAccountContent.firmPostcode}</div>
                                <div className='tlcell col-xs-9 input-label'>
                                    {userInfo.firmPostcode}
                                </div>
                            </div>
                        }
                        {/* <div className='tlrow'>
                            <div className='tlcell col-xs-3'>{myAccountContent.keepInformed}</div>
                            <div className='tlcell col-xs-9 input-label'>
                                {
                                    editMode
                                    ?
                                    <Field 
                                        className='pes-radio-group group-inline'
                                        name='emailNotification'
                                        component={renderRadioGroup}
                                        data={[
                                            {value: true, label: 'Yes'},
                                            {value: false, label: 'No'}
                                        ]}
                                        defaultValue={userInfo.emailNotification}                                                                                                          
                                    />
                                    :
                                    (userInfo.emailNotification ? 'Yes' : 'No')
                                }
                            </div>
                        </div> */}
                        <div className='tlrow bg-white'>
                            <div className='tlcell col-xs-3 input-label text-right'>
                                {
                                    editMode &&
                                    <Button 
                                        label='Cancel'
                                        className='pes-btn pes-btn-default'
                                        onClick={this.handleCancel}
                                    />
                                }
                            </div>
                            <div className='tlcell col-xs-9 input-label'>
                                {
                                    editMode
                                    ?
                                    <Button 
                                        label='Update'
                                        className='pes-btn pes-btn-default'
                                        onClick ={handleSubmit(this.updateUserInfo)}
                                    />
                                    :
                                    <Button 
                                        label='Edit'
                                        className='pes-btn pes-btn-default'
                                        onClick={this.handleEdit}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );        
    }

    getAdviser(role){
        return role == 'IFA' ? 'Adviser' : role;
    }

    render(){
        const {isInitialUpgrade, isValidatedgUpgrade,editMode, validatedOrValidationBypassedOrStaff, unipassAndUpgradeNotStarted, validating} = this.state;
        
        const {error} = this.props;
        //const {handleSubmit} = this.props;

        const userInfo = get(this.props, 'myProfile.userInfo');
        const myAccountContent = get(this.props, 'content.myProfile.myAccount'); 
        let myAccountHelpText = get(this.props, `content.myProfile.myAccount.myAccountHelpText`);
        
        const environment = EnvironmentUtils.get('environment');
        myAccountHelpText = StringUtils.stringFormatToReact(myAccountHelpText, environment.myProfileHelp);
        let isUnipassUser = get(this.props, 'myProfile.userInfo.unipass');      
        let userStatus = get(this.props, 'myProfile.userStatus');      
        let isAdviser = SecurityUtils.isAdviserRole(userInfo);
        let isPA = SecurityUtils.isPARole(userInfo);
        let isStaff = SecurityUtils.isStaffRole(userInfo);
        let isUpgradable = UserValidationStatusUtils.isUpgradable(userStatus);
        let isValidating = UserValidationStatusUtils.isValidating(userStatus);
        let isValidated  = UserValidationStatusUtils.isValidated(userStatus);

        //stage of upgrade process
        let showMyAccountMessage = _.get(this.props, 'myProfile.userStatus.showMyAccountMessage');
        let showValidatingMessage = _.get(this.props, 'myProfile.userStatus.isValidating');
        let showValidatedMessage = _.get(this.props, 'myProfile.userStatus.isValidated');
        // let isValidatedgUpgrade = false;

        return(
            (_.isEmpty(userInfo) == false  && _.isEmpty(myAccountContent) ==  false && _.isEmpty(userStatus) == false) ? 
            (<div className='pes-myaccount-tab'>
            {                
                this.props.error && <FormErrorArea error={this.props.error}/> 
            }
         
            {
                //check stage of upgrade process - Validating upgrade process
                showMyAccountMessage && showValidatingMessage && 
                this._renderValidatingUpgradeProcess(isAdviser, isPA)

            }
            {
                //check stage of upgrade process - Validated uprade process
                showMyAccountMessage && showValidatedMessage && 
                this._renderValidatedlUpgradeProcess()

            }
           
            {
                (isInitialUpgrade == false && isValidatedgUpgrade == false) &&
                !showMyAccountMessage &&
                <div>
                    {/* Starting of header title   */}
                    {
                        (isUpgradable && !isStaff) &&
                        this._renderUpgradable(isUnipassUser)
                    }   
                    {
                        isValidating &&
                        this._renderValidating()
                    }
                    {
                        (isValidated || isStaff) &&
                        <div className='pes-text-belt text-normal'>
                            {myAccountHelpText}
                        </div>
                    }      
                    {/* Ending of header title   */}                    
                    {this._renderMainMyAccount()}                    
                </div>
            }           
        </div> ) : null            
        );
    }
}

function mapStateToProps(state, ownProps) {
	return {
		myProfile: state.myProfile,
		content: state.content
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators(MyProfileApi, dispatch),
		actions: bindActionCreators(MyProfileActions, dispatch)
	};
}

export default compose(
    connect(
        mapStateToProps, mapDispatchToProps
    ),
    reduxForm({
        form: 'myAccountEdit'
    })
)(MyAccountTab);