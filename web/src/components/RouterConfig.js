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


/******************** LOAD RESOURCES HOC ********************/
const withResources = data => Comp => {
    return class WrapperComponent extends React.Component {
        constructor(props, context){
            super(props, context);

            this.state = {
                visitedRoutes: [],
                loadedResources: []
            };
        }

        componentWillMount(){
            if(this.props.isAuthPending == false){
                const currentRoute = this._getCurrentRoute(this.props.routes);
                const currentResources = this._getResourcesByRoute(currentRoute);

                this.setState({ visitedRoutes: [currentRoute], loadedResources: currentResources });
                this._loadResources(currentResources);
            }
        }

        componentWillReceiveProps(newProps){
            if(newProps.isAuthPending == false){
                const { visitedRoutes } = this.state;
                const currentRoute = this._getCurrentRoute(newProps.routes);

                if(!visitedRoutes.includes(currentRoute.path)){
                    this.setState(
                        state => ({
                            visitedRoutes: [...state.visitedRoutes, currentRoute.path]
                        }),
                        () => {
                            const resources = this._getResourcesByRoute(currentRoute, this.state.loadedResources);
                            this._loadResources(resources);
                        }
                    );
                }
            }
        }

        _getCurrentRoute(routes){
            const currentRoute = _.last(_.dropRightWhile(routes, item => !item.path));
            return currentRoute;
        }

        _getResourcesByRoute(route, loadedResources=[]){
            let resources = _.get(data, `${route.path}.resources`);
            resources = _.difference(resources, loadedResources);

            return resources;
        }

        _loadResources(resources){
            if(!_.isEmpty(resources)){
                _.each(resources, item => ContentApiUtils.updateStoreContent(item));
            }
        }

        render(){
            return(
                <Comp {...this.props} />
            );
        }
    };
};


/******************** ROUTER CONFIG COMPOSITION ********************/
export const withRouterConfig = compose(
    withResources(ROUTER_CONFIG)
);