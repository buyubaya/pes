import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {SubmissionError, getFormSubmitErrors} from 'redux-form';
import {Field, reduxForm} from 'redux-form';
// COMPONENTS
import Button from '../common/Button';
import {renderTextInput, renderCheckbox} from '../../validations/FieldRendering';
import DateFormat from '../../components/common/DateFormat';

import StringUtils from '../../utils/StringUtils';
import HtmlUtils from '../../utils/HtmlUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

import * as ContentTypes from '../../constants/ContentTypes';
import SecurityUtils from '../../utils/SecurityUtils';

import {get} from 'lodash';

import * as MyProfileApi from '../../api/MyProfileApi';
import * as MyProfileActions from '../../actions/MyProfileActions';
import FormErrorArea from '../common/FormErrorArea';

class DelegationsTab extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			isUserInfoLoaded: false
        };
        
        this.queryDelegation = this.queryDelegation.bind(this);
        this.addDelegation = this.addDelegation.bind(this);
        this.deleteDelegationFrom = this.deleteDelegationFrom.bind(this);
        this.deleteDelegationTo = this.deleteDelegationTo.bind(this);
    }

    static propTypes = {
		content: PropTypes.object,
        delegations: PropTypes.object,
        userInfo: PropTypes.object,
		api: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
    };

    componentWillMount = function(){
        this.queryDelegation(this.props);
        if(this.state.isUserInfoLoaded == false){
            if(_.isEmpty(this.props.userInfo) == false){
                this.setState({ isUserInfoLoaded: true });
            }
        }
    }

    componentWillReceiveProps = function(nextProps){
        if(this.state.isUserInfoLoaded == false){
            this.queryDelegation(nextProps);
            if(_.isEmpty(nextProps.userInfo) == false){
                this.setState({ isUserInfoLoaded: true });
            }
        }
    }

    queryDelegation(props){
        if(_.isEmpty(props.userInfo) == false){
            let params = {userId: props.userInfo.username, role: props.userInfo.role};
            props.api.getDelegations(params).then((result) => {
                props.reset();
                props.actions.getDelegationSuccess(result); 	
            });
        }
    }

    addDelegation(values, dispatch, props){
        let delegateFromId = '';
        let delegateToId = '';

        if(_.isEmpty(values.user)){
            throw new SubmissionError({_error: 'Detail not matched. Please follow the link on the on screen message for guidance.'});
        }

        let userInfo = props.userInfo;
        let isAdviser = SecurityUtils.isAdviserRole(userInfo);
        let isPA = SecurityUtils.isPARole(userInfo);

        if(isAdviser){
            delegateFromId = userInfo.username;
            delegateToId = _.isEmpty(values.user) ? '' : values.user;
        }
        else if(isPA){
            if(userInfo.username.toUpperCase() == values.user.toUpperCase()){
                throw new SubmissionError({_error: 'Please check UserID. You can not delegate to yourself.'});
            }
            delegateFromId = _.isEmpty(values.user) ? '' : values.user;
            delegateToId = userInfo.username;
        }

        let params = {
            delegateFromId: delegateFromId,
            delegateToId: delegateToId
        };

        return props.api.addDelegation(params).then((result) => {
            if(result.status == 200){
                props.reset();
                this.queryDelegation(props);
            }
            else if(result.status == 500){
                throw new SubmissionError({_error: result.message});
            }
        });
    }

    deleteDelegationFrom(values, dispatch, props){
        let params = [];
        
        for(let i in values){
            if(i.indexOf('delegateFrom') != -1){
                let tmp = i.split('_');
                if(values[i] == true){
                    params.push(
                        {
                            delegateFromId: unescape(tmp[1]),
                            delegateToId: props.userInfo.username,
                            loginUserId: props.userInfo.username
                        }
                    );
                }
            }
        }
        if(params.length > 0){
            return props.api.deleteDelegation(params).then((result) => {
                if(result.status == 200){
                    props.reset();
                    this.queryDelegation(props);
                }
                else if(result.status == 500){
                    throw new SubmissionError({_error: result.message});
                }
            });
        }        
    }

    deleteDelegationTo(values, dispatch, props){
        let params = [];
        
        for(let i in values){
            if(i.indexOf('delegateTo') != -1){
                let tmp = i.split('_');
                if(values[i] == true){
                    params.push(
                        {
                            delegateFromId: props.userInfo.username,
                            delegateToId: unescape(tmp[1]),
                            loginUserId: props.userInfo.username
                        }
                    );
                }
            }
        }

        if(params.length > 0){
            return props.api.deleteDelegation(params).then((result) => {
                if(result.status == 200){
                    props.reset();
                    this.queryDelegation(props);                
                }
                else if(result.status == 500){
                    throw new SubmissionError({_error: result.message});
                }
            });
        }
    }

    render(){        
        const content = get(this.props, `content.${ContentTypes.MY_PROFILE}`);

        const userInfo = this.props.userInfo;
        let isAdviser = SecurityUtils.isAdviserRole(userInfo);
        let isPA = SecurityUtils.isPARole(userInfo);
        
        const delegationsFrom = get(this.props, 'delegations.delegationsFrom');
        const delegationsTo = get(this.props, 'delegations.delegationsTo');

        const environment = EnvironmentUtils.get('environment');
        let myProfileHelpText = get(content, 'delegation.myProfileHelpText');
        myProfileHelpText =  StringUtils.stringFormatToReact(myProfileHelpText, environment.myProfileHelp);

        let addInfoAdviser = get(content, 'delegation.addInfoAdiviser');
        let addInfoPA = get(content, 'delegation.addInfoPA');
        let addUserLabel = get(content, 'delegation.addUser');
        let delegationsFromLabel = get(content, 'delegation.delegationsFrom');;
        let delegationsToLabel = get(content, 'delegation.delegationsTo');;
        let nameLabel = get(content, 'delegation.name');
        let roleLabel = get(content, 'delegation.role');
        let effectiveDateLabel = get(content, 'delegation.effectiveDate');
        let addLabel = get(content, 'delegation.add');
        let deleteLabel = get(content, 'delegation.delete');

        const {handleSubmit} = this.props;

        return(
            <div className='pes-delegations-tab'>                
                {
                    this.props.error && <FormErrorArea error={this.props.error}/> 
                }
                <div className='pes-text-belt text-normal'>
                    {myProfileHelpText}
                </div>
                {/* BEGIN SECTION 1 */}
                <div className='pes-table-list bg-inputs-group'>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-4'></div>
                        <div className='tlcell col-xs-8 clearfix'>
                            <div className='col-xs-8 px-0'>
                                {isAdviser ? addInfoAdviser : addInfoPA}
                            </div>
                        </div>
                    </div>
                    <div className='tlrow'>
                        <div className='tlcell col-xs-4 text-capitalize'>{addUserLabel}</div>
                        <div className='tlcell col-xs-8 bg-inputs-group'>
                            <Field 
                                className='pes-input-group d-inline-block mr-10'
                                name='user'
                                component={renderTextInput} 
                            />
                            <Button 
                                className='pes-btn pes-btn-default d-inline-block'
                                label={addLabel} 
                                onClick={handleSubmit(this.addDelegation)} 
                            />
                        </div>
                    </div>
                </div>
                {/* END SECTION 1 */}
                
                {isAdviser &&
                <div>
                    {/* BEGIN SECTION 2 */}
                    <div className='pes-section-title'>
                        {delegationsFromLabel}
                    </div>
                    <div className='pes-table-list'>
                        {
                            delegationsTo && 
                            <div className={this.props.error ? 'tlrow text-error' : 'tlrow'}>
                                <div className='tlcell col-xs-3 text-capitalize text-bold'>{nameLabel}</div>
                                <div className='tlcell col-xs-3 text-capitalize text-bold'>{roleLabel}</div>
                                <div className='tlcell col-xs-3 text-capitalize text-bold'>{effectiveDateLabel}</div>
                                <div className='tlcell col-xs-3 text-center'>
                                    <img src={require('../../../assets/images/delete_icon.gif')} />
                                </div>
                            </div>
                        }
                        {
                            delegationsTo && delegationsTo.map((item, index) =>
                                <div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-3'>{item.userName}</div>
                                    <div className='tlcell col-xs-3'>{item.role}</div>
                                    <div className='tlcell col-xs-3'><DateFormat>{item.timestamp}</DateFormat></div>
                                    <div className='tlcell col-xs-3 text-center'>
                                        <Field 
                                            name={'delegateTo_' + encodeURIComponent(item.userId).replace(/\./g,'%2E')}
                                            component={renderCheckbox}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        <div className='tlrow bg-white'>
                            <div className='tlcell col-xs-3 col-xs-offset-9 text-center'>
                                <Button 
                                    className='pes-btn pes-btn-default'
                                    label={deleteLabel} 
                                    onClick={handleSubmit(this.deleteDelegationTo)} 
                                />
                            </div>
                        </div>

                    </div>
                    {/* END SECTION 2 */}
                </div>
                }

                {(isAdviser || isPA) && 
                <div>
                    {/* BEGIN SECTION 3 */}
                    <div className='pes-section-title'>
                        {delegationsToLabel}
                    </div>
                    <div className='pes-table-list'>
                        {
                            delegationsFrom && <div className={this.props.error ? 'tlrow text-error' : 'tlrow'}>
                                <div className='tlcell col-xs-3 text-capitalize text-bold'>{nameLabel}</div>
                                <div className='tlcell col-xs-3 text-capitalize text-bold'>{/*isPA && delegatedByLabel*/}</div>
                                <div className='tlcell col-xs-3 text-capitalize text-bold'>{effectiveDateLabel}</div>
                                <div className='tlcell col-xs-3 text-center'>
                                    <img src={require('../../../assets/images/delete_icon.gif')} />
                                </div>
                            </div>
                        }
                        {
                            delegationsFrom && delegationsFrom.map((item, index) =>
                                <div className='tlrow' key={index}>
                                    <div className='tlcell col-xs-3'>{item.userName}</div>
                                    <div className='tlcell col-xs-3'>{/*isPA && item.delegatedBy*/}</div>
                                    <div className='tlcell col-xs-3'><DateFormat>{item.timestamp}</DateFormat></div>
                                    <div className='tlcell col-xs-3 text-center'>
                                        <Field 
                                            name={'delegateFrom_' + encodeURIComponent(item.userId).replace(/\./g,'%2E')}
                                            component={renderCheckbox}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        <div className='tlrow bg-white'>
                            <div className='tlcell col-xs-3 col-xs-offset-9 text-center'>
                                <Button 
                                    className='pes-btn pes-btn-default'
                                    label={deleteLabel} 
                                    onClick={handleSubmit(this.deleteDelegationFrom)}
                                />
                            </div>
                        </div>

                    </div>
                    {/* END SECTION 3 */}
                </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		content: state.content,
        delegations: state.myProfile.delegations,
        userInfo: state.myProfile.userInfo,
        formErrors: getFormSubmitErrors('myProfileDelegation')(state)
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
        form: 'myProfileDelegation',
        validate: null
    })
)(DelegationsTab);