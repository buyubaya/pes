import React, {PropTypes} from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PlanApi from '../api/PlanApi';
import * as ContentTypes from '../constants/ContentTypes';
import ContentApiUtils from '../api/ContentApiUtils';
import {find, isEqual} from 'lodash';


/******************** ROUTER CONFIG ********************/
const ROUTER_CONFIG = {
    "/": {
        resources: [ContentTypes.SEARCH_PLAN],
        authenticationCheck: false,
        authorised: false,
        allowedParams: []
    },
    "/plan-details/:id": {
        resources: [ContentTypes.PLAN_DETAILS]
    },
    "/servicing/amend/:amendType/:id(/:planHolderIndex)": {
        resources: [ContentTypes.SERVICING_AMEND]
    },
    "/servicing/regular-withdrawal/:id": {
        resources: [ContentTypes.SERVICING_REGULAR_WITHDRAWAL]
    },
    "/servicing/surrender/:id": {
        resources: [ContentTypes.SERVICING_SURRENDER]
    },
    "/servicing/redirect-contribution/:id": {
        resources: [ContentTypes.SERVICING_REDIRECT_CONTRIBUTION]
    },
    "/servicing/history-details/:id/:historyId": {
        resources: [ContentTypes.SERVICING_HISTORY_DETAILS]
    },
    "/profile": {
        resources: [ContentTypes.MY_PROFILE]
    }
};


/******************** CURRENT ROUTE ACTION ********************/
const checkCurrentRouteOnWillMount = action => Comp => {
    return class WithCurrentRouteAction extends React.Component {
        constructor(props, context){
            super(props, context);
        }

        componentWillMount(){
            const currentRoute = _.last(_.dropRightWhile(this.props.routes, item => !item.path));
            if(!_.isEmpty(currentRoute)){
                action.call(this, currentRoute);
            }
        }

        render(){
            return(
                <Comp {...this.props} />
            );
        }
    };
};


/******************** LOAD RESOURCES ********************/
export const withResources = data => checkCurrentRouteOnWillMount(function(currentRoute){
    const resources = _.get(data, `${currentRoute.path}.resources`);
    if(!_.isEmpty(resources)){
        _.each(resources, item => ContentApiUtils.updateStoreContent(item));
    }
});


/******************** AUTHORISATION ********************/
export const withAuthorisation = data => checkCurrentRouteOnWillMount(function(currentRoute){
    const {authenticationCheck, authorised, allowedParams} = _.get(data, currentRoute.path);
    const currentParams = this.props.params;

    if(authenticationCheck && authorised){
        const allowed = find(allowedParams, o => isEqual(o, currentParams));
        
        if(!allowed){
            this.props.router.push('/');
        }
    }
    else {
        this.props.router.push('/');
    } 
});


/******************** ROUTER CONFIG COMPOSITION ********************/
export const withRouterConfig = compose(
    withResources(ROUTER_CONFIG),
    // withAuthorisation(ROUTER_CONFIG)
);