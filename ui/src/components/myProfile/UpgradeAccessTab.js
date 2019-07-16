import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {SubmissionError} from 'redux-form';
import {Field, reduxForm, change, formValueSelector} from 'redux-form';
import {get as _get, set as _set, isEmpty as _isEmpty} from 'lodash';
import StringUtils from '../../utils/StringUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';
import HtmlUtils from '../../utils/HtmlUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import {submitInitial, submitValidate, validateAdviserCode, validatePostCodeCode, validateAdviserUsername} from './upgradeAccess/actions';
import {FIELD_NAMES} from './upgradeAccess/constants';
import {UserValidationRole} from '../../constants/MyProfile';
// API
import * as MyProfileActions from '../../actions/MyProfileActions';
import * as MyProfileApi from '../../api/MyProfileApi';
import AuthUtils from '../../utils/AuthUtils';
import {MyProfileTabIDs} from '../../constants/MyProfile';
// COMPONENTS
import Button from '../common/Button';
import FormErrorArea from '../common/FormErrorArea';
import {renderTextInput, renderCheckbox, renderDropdown} from '../../validations/FieldRendering';
import {maxLength} from '../../validations/FieldValidations';


// UTILS
function stringFormat(str){
    str = StringUtils.format.apply(null, arguments);
    str = HtmlUtils.htmlToReact(str);
    return str;
};


class UpgradeAccessTab extends React.Component {
    constructor(){
        super();

        this.submitInitial = this.submitInitial.bind(this);
        this.submitValidate = this.submitValidate.bind(this);
        this.cancelInitialPage = this.cancelInitialPage.bind(this);
        this.cancelValidationCode = this.cancelValidationCode.bind(this);
    }

    static propTypes = {
        content: PropTypes.object,
        formValues: PropTypes.object,
        api: PropTypes.object,
        actions: PropTypes.object
    };

    static contextTypes = {
        content: PropTypes.object
    };

    componentWillReceiveProps(props){}

    _renderInitialPage(props){
        const {handleSubmit, pristine, anyTouched} = props;
        const upgradeRole = _get(props, `formValues.${FIELD_NAMES.role}`);
        const currentFcaAuthenticationNumber = _get(this.props, 'myProfile.userInfo.fsaNumber');
        // const currentFirmPostcode = _get(this.props, 'myProfile.userInfo.firmPostcode');
        // CONTENTS
        const environment = EnvironmentUtils.get('environment');
        const myProfileHelpText = stringFormat(_get(props, `content.upgradeAccess.myProfileHelpText`), environment.myProfileHelp);
        const role = _get(props, `content.upgradeAccess.role`);
        const roleData = _get(props, `content.upgradeAccess.roleData`);
        const fsaAuthorisationNumber = _get(props, `content.upgradeAccess.fsaAuthorisationNumber`);
        const firmPostcode = _get(props, `content.upgradeAccess.firmPostcode`);
        const adviserCode = _get(props, `content.upgradeAccess.adviserCode`);
        const adviserUsername = _get(props, `content.upgradeAccess.adviserUsername`);

        return(
            <div className='pes-table-list ovf-v has-input align-top'>
                <div className='pes-text-belt text-normal'>
                    {myProfileHelpText}
                </div>
                <div className='tlrow'>
                    <div className='tlcell col-xs-3 text-capitalize'>{role}</div>
                    <div className='tlcell col-xs-9'>
                        <Field 
                            name={_get(FIELD_NAMES, 'role')}
                            component={renderDropdown}
                            data={roleData}
                            valueField='value'
                            textField='label'
                            defaultValue={''}
                            showError
                        />
                    </div>
                </div>
                {
                    currentFcaAuthenticationNumber &&
                    <div className='tlrow'>
                        <div className='tlcell col-xs-3 text-capitalize'>{fsaAuthorisationNumber}</div>
                        <div className='tlcell col-xs-9'>
                            <Field 
                                className='pes-input-group w-code'
                                name={_get(FIELD_NAMES, 'fsaNumber')}
                                component={renderTextInput}
                                normalize={maxLength(6)}
                                disabled={currentFcaAuthenticationNumber != -1}
                                showError
                                // defaultValue={(currentFcaAuthenticationNumber != '-1') && currentFcaAuthenticationNumber}
                            />
                        </div> 
                    </div>
                }
                <div className='tlrow'>
                    <div className='tlcell col-xs-3 text-capitalize'>{firmPostcode}</div>
                    <div className='tlcell col-xs-9'>
                        <Field 
                            className='pes-input-group'
                            name={_get(FIELD_NAMES, 'firmPostcode')}
                            component={renderTextInput}
                            normalize={maxLength(9)}
                            validate={validatePostCodeCode}
                            showError
                            // defaultValue={currentFirmPostcode}
                        />
                    </div>
                </div>
                {
                    upgradeRole && (upgradeRole === 'IFA') &&
                    <div className='tlrow'>
                        <div className='tlcell col-xs-3 text-capitalize'>{adviserCode}</div>
                        <div className='tlcell col-xs-9'>
                            <Field 
                                className='pes-input-group'
                                name={_get(FIELD_NAMES, 'adviserCode')}
                                component={renderTextInput}
                                normalize={maxLength(7)}
                                validate={validateAdviserCode}
                                showError
                            />
                        </div>
                    </div>
                }
                {
                    upgradeRole && (upgradeRole === 'PA') &&
                    <div className='tlrow'>
                        <div className='tlcell col-xs-3 text-capitalize'>{adviserUsername}</div>
                        <div className='tlcell col-xs-9'>
                            <Field 
                                className='pes-input-group'
                                name={_get(FIELD_NAMES, 'adviserUsername')}
                                component={renderTextInput}
                                normalize={maxLength(13)}
                                validate={validateAdviserUsername}
                                showError
                            />
                        </div>
                    </div>
                }

                <div className='tlrow bg-white'>
                    <div className='tlcell col-xs-3 text-right'>
                        <Button 
                            className='pes-btn pes-btn-default'
                            label='Cancel'
                            onClick={this.cancelInitialPage}
                        />
                    </div>
                    <div className='tlcell col-xs-9'>
                        {
                            upgradeRole &&
                            <Button 
                                className='pes-btn pes-btn-default'
                                label='Submit'
                                onClick={handleSubmit(this.submitInitial)}
                            />
                        }
                    </div>
                </div>

            </div>
        );
    }

    _renderUpgradedToValidatedOrValidationBypassed(props){
        const environment = EnvironmentUtils.get('environment');
        const myProfileHelpText = stringFormat(_get(props, `content.upgradeAccess.myProfileHelpText`), environment.myProfileHelp);
        const accessUpgradedText = _get(props, `content.upgradeAccess.accessUpgradedText`);
        const upgradedToValidatedOrValidationBypassedText = (_get(props, `content.upgradeAccess.upgradedToValidatedOrValidationBypassedText`), '#');

        return(
            <div className='pes-bg-grey'>
                <div className='pes-text-belt'>{accessUpgradedText}</div>
                <div className='p-10'>
                    {upgradedToValidatedOrValidationBypassedText}
                </div>

                <div className='pes-text-belt text-normal'>
                    {myProfileHelpText}
                </div>
            </div>
        );
    }

    _renderUpgradedToValidating(props){
        const environment = EnvironmentUtils.get('environment');
        const myProfileHelpText = stringFormat(_get(props, `content.upgradeAccess.myProfileHelpText`), environment.myProfileHelp);
        const nextSteps = _get(props, `content.upgradeAccess.nextSteps`);
        const upgradedToValidatingText = HtmlUtils.htmlToReact(_get(props, `content.upgradeAccess.upgradedToValidatingText`));

        return(
            <div className='pes-bg-grey'>

                <div className='pes-text-belt'>{nextSteps}</div>
                <div className='p-10'>
                    {upgradedToValidatingText}
                </div>

                <div className='pes-text-belt text-normal'>
                   {myProfileHelpText}
                </div>
            </div>
        );
    }

    _renderDowngradedFromValidating(props){
        const environment = EnvironmentUtils.get('environment');
        const myProfileHelpText = stringFormat(_get(props, `content.upgradeAccess.myProfileHelpText`), environment.myProfileHelp);
        const nextSteps = _get(props, `content.upgradeAccess.nextSteps`);
        const downgradedFromValidatingText = stringFormat(_get(props, `content.upgradeAccess.downgradedFromValidatingText`), '#', '#');

        return(
            <div className='pes-bg-grey'>
                <div className='pes-text-belt'>{nextSteps}</div>
                <div className='p-10'>
                    {downgradedFromValidatingText}
                </div>
                <div className='pes-text-belt text-normal'>
                    {myProfileHelpText}
                </div>
            </div>
        );
    }

    _renderValidate(props){
        const environment = EnvironmentUtils.get('environment');
        const myProfileHelpText = stringFormat(_get(props, `content.upgradeAccess.myProfileHelpText`), environment.myProfileHelp);
        const validationCodeText = _get(props, `content.upgradeAccess.validationCodeText`);
        const validationCode = _get(props, `content.upgradeAccess.validationCode`);

        const {handleSubmit, handleReset} = props;
        

        return(
            <div className='pes-table-list'>
                <div className='pes-bg-grey'>
                    <div className='pes-text-belt text-normal'>
                        {validationCodeText}
                    </div>
                    <div className='pes-text-belt text-normal'>
                        {myProfileHelpText}
                    </div>
                </div>

                <div className='tlrow'>
                    <div className='tlcell col-xs-3 text-capitalize'>
                        {validationCode}
                    </div>
                    <div className='tlcell col-xs-9'>
                        <Field 
                            className='pes-input-group d-inline-block w-code'
                            name='validationCode1'
                            component={renderTextInput}
                            normalize={maxLength(5)}
                        />
                        <span className='mx-10'>-</span>
                        <Field 
                            className='pes-input-group d-inline-block w-code'
                            name='validationCode2'
                            component={renderTextInput}
                            normalize={maxLength(5)}
                        />
                    </div>
                </div>
                <div className='tlrow bg-white'>
                    <div className='tlcell col-xs-3 text-right'>
                        <Button 
                            className='pes-btn pes-btn-default'
                            label='Cancel'
                            onClick={this.cancelValidationCode}
                        />
                    </div>
                    <div className='tlcell col-xs-9'>
                        <Button 
                            className='pes-btn pes-btn-default'
                            label='Submit'
                            onClick={handleSubmit(this.submitValidate)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _renderExpiredPage(){
        const environment = EnvironmentUtils.get('environment');
        let myProfileHelpText = 'For further information on Validation please see <a  href=\"{0}\" target=\"_blank\">My profile help</a>.';
        myProfileHelpText = StringUtils.stringFormatToReact(myProfileHelpText, environment.myProfileHelp);

        return(
            <div className='bg-notice'>
                <div className='pes-text-belt'>Next steps</div>
                <div className='bg-grey p-10'>
                    <p>The validation code previously issued has now expired.</p>
                    <p>A new validation code has been sent to your principal, so that they can re-validate your request for access to client and plan data.</p>
                    <p>Your validation code remains valid for 28 days.</p>
                </div>
                <div className='pes-text-belt text-normal'>{myProfileHelpText}</div>
            </div>
        );
    }

    submitInitial(values, dispatch, props){
        const userId = _get(props, 'myProfile.userInfo.username');

        return submitInitial(values, dispatch, props)
        .then(
            data => {
                this.props.changeTab && this.props.changeTab(MyProfileTabIDs.myAccount);

                // UPDATE VALIDATION STATUS
                this.props.api.getUserValidationStatus(userId)
                .then(data => {
                    this.props.actions.getUserValidationStatusSuccess({
                        ...data, 
                        isUpgrading: true, 
                        isValidating: false, 
                        showMyAccountMessage: true
                    });
                })
                .catch(error => {
                    throw new SubmissionError({_error: 'Internal error'});
                });
            },

            error => {
                throw new SubmissionError(error);
            }
        );
    }

    submitValidate(values, dispatch, props){
        const userId =  _get(props, 'myProfile.userInfo.username');

        return submitValidate(values, dispatch, props)
        .then(
            data => {
                this.props.changeTab && this.props.changeTab(MyProfileTabIDs.myAccount);

                // UPDATE USER INFO
                const userId = AuthUtils.getUserId();
                this.props.api.getMyProfile({userId: userId}).then((res) => {
                    this.props.actions.getMyProfileSuccess(res);
                    AuthUtils.setUserInfo(JSON.stringify(res));   
                });

                //Reload Agency codes
                this.props.api.getAgencyCodes({userId: userId}).then((result) => {
                    this.props.actions.getAgencyCodeSuccess(result);
                });

                // UPDATE VALIDATION STATUS
                this.props.api.getUserValidationStatus(userId)
                .then(data => {
                    // this.props.toggleTab && this.props.toggleTab('upgradeAccess', false);
                    this.props.actions.getUserValidationStatusSuccess({
                        ...data, 
                        isUpgrading: false, 
                        isValidating: true, 
                        showMyAccountMessage: true
                    });
                })
                .catch(error => {
                    throw new SubmissionError({_error: 'Internal error'});
                });
            },

            error => {
                throw new SubmissionError(error);
            }
        );
    }

    cancelInitialPage(){
        TransitionUtils.transitionTo(`/profile#${MyProfileTabIDs.myAccount}`);
    }

    cancelValidationCode(){
        // this.props.reset && this.props.reset();
        TransitionUtils.transitionTo(`/profile#${MyProfileTabIDs.myAccount}`);
    }

    _popup(url, windowname, options){
        let w = options.width || 750;
        const sW =  window.screen.width;
        let h = 500;
        const sH =  options.height || window.screen.height;

        if (w) {
            if(w > sW){
                w = sW;
            }
        }
        if (h) {
            if(h > sH){
                h = sH;
            }
        }
   
        const defaultOptions = {
            location: 'no',
            menubar: 'no',
            status: 'yes',
            scrollbars: 'yes',
            resizable: 'yes',
            toolbar: 'no',
            width: w,
            height: h,
            left: (sW - w)/2,
            top: (sH - h)/2
        };

        options = {...defaultOptions, ...options};
        
        let features = [];
        for(let x in options){
            features.push(`${x}=${options[x]}`);
        }
        features = features.join(',');

        window.open(url, windowname, features);
        return false;
    }

    render(){
        const props = this.props;
        const {error} = this.props;
        const validationStatus = _get(this.props, 'myProfile.userStatus.validationStatus');
        const role = _get(this.props, 'myProfile.userStatus.role');
        const expired = _get(this.props, 'myProfile.userStatus.expired');

        if(role === UserValidationRole.VALIDATING){
            if(expired && this.props.myProfile.tabUpgradeAccessClickedCount <= 1){
                return(
                    <div className='pes-upgradeaccess-tab'>
                        {
                            <FormErrorArea error={error} />
                        }
                        {this._renderExpiredPage()}
                    </div>
                );
            }
            else {
                return(
                    <div className='pes-upgradeaccess-tab'>
                        {
                            <FormErrorArea error={error} />
                        } 
                        {this._renderValidate(props)}
                    </div>
                );
            }
        }
        else if(role === UserValidationRole.UPGRADABLE){
            return(
                <div className='pes-upgradeaccess-tab'>
                    {
                        <FormErrorArea error={error} />
                    }
                    {
                        this._renderInitialPage(props)
                    }
                </div>
            );
        }

        return null;
    }
}


const selector = formValueSelector('myProfileUpgradeAccess');
function mapStateToProps(state, ownProps) {
    const role = _get(state, 'myProfile.userInfo.role');
    const fsaNumber = _get(state, 'myProfile.userInfo.fsaNumber');
    const firmPostCode = _get(state, 'myProfile.userInfo.firmPostcode');
    
    return {
        content: state.content.myProfile,
        formValues: {
            [FIELD_NAMES.role]: selector(state, FIELD_NAMES.role),
            [FIELD_NAMES.fsaNumber]: selector(state, FIELD_NAMES.fsaNumber)
        },
        myProfile: state.myProfile,
        initialValues: {
            [FIELD_NAMES.fsaNumber]: (fsaNumber == -1) ? '' : fsaNumber,
            [FIELD_NAMES.firmPostcode]: firmPostCode
        }
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
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: 'myProfileUpgradeAccess',
        enableReinitialize: true
    })
)(UpgradeAccessTab);