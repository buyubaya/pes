import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {SubmissionError, getFormSubmitErrors} from 'redux-form';
import {Field, reduxForm} from 'redux-form';
// COMPONENTS
import Button from '../common/Button';
import IconInfo from '../common/IconInfo';
import {renderTextInput, renderCheckbox, renderRadio} from '../../validations/FieldRendering';

import AuthUtils from '../../utils/AuthUtils';
import StringUtils from '../../utils/StringUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

import * as ContentTypes from '../../constants/ContentTypes';

import {get} from 'lodash';

import * as MyProfileApi from '../../api/MyProfileApi';
import * as MyProfileActions from '../../actions/MyProfileActions';
import FormErrorArea from '../common/FormErrorArea';
import {maxLength} from '../../validations/FieldValidations';

class AgencyCodesTab extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isUserInfoLoaded: false,
            defaultAgencyCode: ''
        };
        
        this.queryAgencyCode = this.queryAgencyCode.bind(this);
        this.addAgencyCode = this.addAgencyCode.bind(this);
        this.saveAgencyCode = this.saveAgencyCode.bind(this);
        this.deleteAgencyCode = this.deleteAgencyCode.bind(this);
    }

    static propTypes = {
		content: PropTypes.object,
        agencyCodes: PropTypes.array,
        userInfo: PropTypes.object,
		api: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
    };    

    componentWillMount = function(){
        this.queryAgencyCode(this.props);
        if(this.state.isUserInfoLoaded == false){
            if(_.isEmpty(this.props.userInfo) == false){
                this.setState({ isUserInfoLoaded: true });
            }
        }
    }

    componentWillReceiveProps = function(nextProps){
        if(this.state.isUserInfoLoaded == false){
            this.queryAgencyCode(nextProps);
            if(_.isEmpty(nextProps.userInfo) == false){
                this.setState({ isUserInfoLoaded: true });
            }
        }
    }

    queryAgencyCode(props){
        if(_.isEmpty(props.userInfo) == false){
            let params = {userId: props.userInfo.username};
            props.api.getAgencyCodes(params).then((result) => {
                props.actions.getAgencyCodeSuccess(result);
                // if(result.length > 0){
                //     for(let i in result){
                //         let item = result[i];
                //         if(item.default){
                //             this.setState({ defaultAgencyCode: item.agencyCode});
                //         }
                //     }
                // }
            });
        }
    }

    addAgencyCode(values, dispatch, props){
        if(_.isEmpty(values.agencyCode) || /[^a-zA-Z0-9]/g.test(values.agencyCode)){
            throw new SubmissionError({_error: 'Agency code invalid'});
        } 
        
        let agencyCode = '';
        if(_.isEmpty(values.agencyCode) == false){
            agencyCode = values.agencyCode;
        }
        let userInfo = props.userInfo;
        let params = { userId: userInfo.username, agencyCode: agencyCode};
        return props.api.addAgencyCode(params).then((result) => {
            if(result.status == 200){
                props.reset();
                this.queryAgencyCode(props);
            }
            else if(result.status == 500){
                throw new SubmissionError({_error: result.message});
            }
        }); 
    }

    saveAgencyCode(values, dispatch, props){
        if(_.isEmpty(values.agency_default) == false){
            let userInfo = props.userInfo;
            let params = { userId: userInfo.username, agencyCode: values.agency_default};
            return props.api.saveAgencyCode(params).then((result) => {
                if(result.status == 200){
                    AuthUtils.updateUserInfo(dispatch);
                    //props.reset();
                    //this.queryAgencyCode(props);
                }
                else if(result.status == 500){
                    throw new SubmissionError({_error: result.message});
                }
            });
        }
        else{
            throw new SubmissionError({_error: null});
        }
    }

    deleteAgencyCode(values, dispatch, props){
        let params = [];
        let userId = props.userInfo.username;

        // let isDefaultDeleted = false;
        
        for(let i in values){
            if(i.indexOf('delete') != -1){
                let tmp = i.split('_');
                if(values[i] == true){
                    params.push(tmp[1]);
                }
            }
        }

        // for(let j in props.agencyCodes){
        //     let item = props.agencyCodes[j];
        //     for(let k in params){
        //         if(item.default && this.state.defaultAgencyCode == params[k]){
        //             isDefaultDeleted = true;
        //         }
        //     }
        // }

        // if(isDefaultDeleted){
        //     throw new SubmissionError({_error: 'You may not delete your default Agency code'});
        // }
        // else{
        if(params.length > 0){
            return props.api.deleteAgencyCode(userId, { agencyCode: params })
            .then((result) => {
                if(result.status == 200){
                    props.reset();
                    this.queryAgencyCode(props);
                    throw new SubmissionError({_error: null});
                }
                else if(result.status == 500){
                    throw new SubmissionError({_error: result.message});
                }
            });   
        }
        // }
    }

    render(){
        const content = get(this.props, `content.${ContentTypes.MY_PROFILE}`);
        const agencyCodes = this.props.agencyCodes;

        const environment = EnvironmentUtils.get('environment');
        let myProfileHelpText = get(content, 'agencyCode.myProfileHelpText');
        myProfileHelpText = StringUtils.stringFormatToReact(myProfileHelpText, environment.myProfileHelp);

        let enterAgencyCode = get(content, 'agencyCode.enterAgencyCode');
        let agencyCodeLabel = get(content, 'agencyCode.agencyCode');
        let defaultLabel = get(content, 'agencyCode.default');
        let addLabel = get(content, 'agencyCode.add');
        let saveLabel = get(content, 'agencyCode.save');
        let deleteLabel = get(content, 'agencyCode.delete');

        const {handleSubmit} = this.props;

        return(
            <div className='pes-agencycodes-tab'>
                {
                    this.props.error && <FormErrorArea error={this.props.error}/> 
                }
                <div className='pes-text-belt text-normal'>
                    {myProfileHelpText}
                </div>
                
                {/* BEGIN SECTION 1 */}                
                <div className='pes-table-list bg-inputs-group'>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-4 text-capitalize'>
                            {enterAgencyCode}
                        </div>
                        <div className='tlcell col-xs-8'>
                            <Field 
                                className='pes-input-group d-inline-block mr-10 align-middle'
                                name='agencyCode'
                                component={renderTextInput} 
                                normalize={maxLength(7)}
                                value='' 
                            />
                            <Button 
                                className='pes-btn pes-btn-default align-middle'
                                label={addLabel} 
                                onClick={handleSubmit(this.addAgencyCode)}
                            />
                            {
                                this.props.formErrors.agencyCode &&
                                <div className='pes-input-error'>{this.props.formErrors.agencyCode}</div>
                            }
                        </div>
                    </div>
                </div>                
                {/* END SECTION 1 */}

                <div className='pes-table-list'>
                    <div className='bg-notice'>
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 text-capitalize text-bold'>
                                {agencyCodeLabel}
                            </div>
                            <div className='tlcell col-xs-4 text-capitalize text-bold'>
                                <IconInfo className='mr-5' isLink={false}/>
                                {defaultLabel}
                            </div>
                            <div className='tlcell col-xs-4 text-center'>
                                <img src={require('../../../assets/images/delete_icon.gif')} />
                            </div>
                        </div>
                    </div>
                    <div className='tlbody'>
                        {
                            agencyCodes && agencyCodes.map((item, index) => {
                                return (<div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-4'>
                                    {
                                        item.channelType && item.channelType.toUpperCase() == 'CUSTOMER_DIRECT'.toUpperCase() ? 
                                        item.agencyCode + ' (Customer Direct)' : item.agencyCode
                                    }
                                    </div>
                                    <div className='tlcell col-xs-4'>
                                        <Field 
                                            className='pes-radio'
                                            name='agency_default'
                                            component={renderRadio}
                                            fieldValue={item.agencyCode} 
                                            checked={item.default}
                                            value={item.default}
                                        />
                                    </div>
                                    <div className='tlcell col-xs-4 text-center'>
                                        <Field 
                                            className='pes-radio'
                                            name={"delete_" + item.agencyCode}
                                            component={renderCheckbox}
                                        />
                                    </div>
                                </div>);
                            })
                        }

                        <div className='tlrow bg-white'>
                            <div className='tlcell col-xs-4 col-xs-offset-4'>
                                <Button 
                                    className='pes-btn pes-btn-default'
                                    label={saveLabel} 
                                    onClick={handleSubmit(this.saveAgencyCode)}
                                />
                            </div>
                            <div className='tlcell col-xs-4 text-center'>
                                <Button 
                                    className='pes-btn pes-btn-default'
                                    label={deleteLabel} 
                                    onClick={handleSubmit(this.deleteAgencyCode)}
                                />
                                {/* <div className='input-error'>{ this.props.formErrors.defautAgencyCode }</div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		content: state.content,
        agencyCodes: state.myProfile.agencyCodes,
        userInfo: state.myProfile.userInfo,
        formErrors: getFormSubmitErrors('myProfileAgencyCodes')(state)
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
        form: 'myProfileAgencyCodes',
        validation: null
    })
)(AgencyCodesTab);