import React, {PropTypes} from 'react';
import TransitionUtils from '../utils/TransitionUtils';
import {ROUTER_CONFIG} from './RouterConfig';
import * as _ from 'lodash';
import ProductGroups from '../constants/ProductGroups';


const withClientAuthority = routerConfig => Comp => {
    return class WrapComponent extends React.Component {
        _getRouteAuthority = (routePath, routerConfig) => {
            let routeAuthority = false;
            
            if(routerConfig && routerConfig[routePath]){
                routeAuthority = _.get(routerConfig, `${routePath}.clientAuthorityShouldBeChecked`);
                
                return routeAuthority;
            }

            return routeAuthority;
        }

        _getClientAuthorityShouldBeChecked = (routes) => {
            let clientAuthorityShouldBeChecked = false;
            const allRoutes = _.filter(routes, item => item.path);

            if(allRoutes && allRoutes.length > 0){
                allRoutes.forEach(route => {
                    if(this._getRouteAuthority(route.path, routerConfig)){
                        clientAuthorityShouldBeChecked = true;
                        return clientAuthorityShouldBeChecked;
                    }
                });
            }
            
            return clientAuthorityShouldBeChecked;
        }

        _getClientAuthorised = (plan) => {
            let clientAuthorised = _.get(plan, 'clientAuthorised');
            const productGroup = _.get(plan, 'planDetail.productGroupType');

            if(productGroup === ProductGroups.TIP){
                clientAuthorised = _.get(plan, 'clientAuthorisation');
            }
    
            return clientAuthorised;
        }

        _checkClientAuthority = (plan) => {
            const clientAuthorityShouldBeChecked = this._getClientAuthorityShouldBeChecked(this.props.routes, ROUTER_CONFIG);
            const clientAuthorised = this._getClientAuthorised(plan);
            
            if(clientAuthorityShouldBeChecked && !clientAuthorised){
                TransitionUtils.navigateTo(PES.basename);
            }
        }

        render(){            
            return(
                <Comp 
                    {...this.props} 
                    checkClientAuthority={this._checkClientAuthority}
                />
            );
        }
    }
}


export default withClientAuthority;