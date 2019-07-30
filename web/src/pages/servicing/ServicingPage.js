import React, {PropTypes} from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PlanActions from '../../actions/PlanDetailsActions';
import * as PlanApi from '../../api/PlanApi';
import * as MyProfileActions from '../../actions/MyProfileActions';
import * as MyProfileApi from '../../api/MyProfileApi';
import * as ContentTypes from '../../constants/ContentTypes';
import ContentApiUtils from '../../api/ContentApiUtils';
import {get} from 'lodash';
import ServicingHeader from '../../components/servicing/ServicingHeader';
import SecurityUtils from '../../utils/SecurityUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import {ROUTER_CONFIG} from '../../components/RouterConfig';
import withClientAuthority from '../../components/withClientAuthority';


class ServicingPage extends React.Component {
    componentWillMount(){
        if(this.props.router.getCurrentLocation().pathname !== '/' && !SecurityUtils.isServicingRole()){
            TransitionUtils.navigateTo(PES.basename);
        }
    }

    componentDidMount(){
        let planId = this.props.params.id;
        
        if(planId){
            this.props.api.getPlan({planId})
            .then(plan => {
                const { checkClientAuthority } = this.props;
                if(checkClientAuthority){
                    checkClientAuthority(plan);
                }
            });
        }
    }

    render(){
        const {userinfo} = this.props;
        
        return(
            <div className='container pes-servicing-page'>
                <ServicingHeader 
                    planDetailsContent={get(this.props, `content.${ContentTypes.PLAN_DETAILS}`)}
                    plan={this.props.plan}
                    userinfo={userinfo}
                />      
                {this.props.children}
            </div>
        );
    }
} 

function mapStateToProps(state, ownProps) {
	return {
		content: state.content,
        plan: state.plan
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators({...PlanApi, ...MyProfileApi}, dispatch),
        actions: bindActionCreators({...PlanActions, ...MyProfileActions}, dispatch)
	};
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withClientAuthority(ROUTER_CONFIG)
)(ServicingPage);