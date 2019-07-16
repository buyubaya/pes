import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';


import * as MyProfileActions from '../actions/MyProfileActions';
import * as MyProfileApi from '../api/MyProfileApi';


import {MyProfileHeader} from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Tab from '../components/planDetails/Tab';
import {MyProfileTabs} from '../components/myProfile/MyProfileTabsData';
import {MyProfileTabIDs} from '../constants/MyProfile';
import * as LocalStorage from '../utils/LocalStorage';
import EnvironmentUtils from '../utils/EnvironmentUtils';
import AuthUtils from '../utils/AuthUtils';

import * as ContentTypes from '../constants/ContentTypes';
import ContentApiUtils from '../api/ContentApiUtils';
import {get} from 'lodash';
import SecurityUtils from '../utils/SecurityUtils';
import UserValidationStatusUtils from '../utils/UserValidationStatusUtils';

class MyProfilePage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {         
            tabsData: []
        };
        
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    static propTypes = {
		content: PropTypes.object,
		myProfile: PropTypes.object,
		api: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
    }
    
    static childContextTypes = {
        content: PropTypes.object,
		myProfile: PropTypes.object		
    }

    getChildContext(){
        return {
			content: this.props.content && this.props.content[ContentTypes.MY_PROFILE],
			myProfile: this.props.myProfile			
		};
    }
    

    componentWillMount() {
        //call API get user info
        const environment = EnvironmentUtils.get('environment');
        //let userId = environment.userId;
        const userId = AuthUtils.getUserId();
        this.props.api.getMyProfile({userId: userId}).then((res) => {
            this.props.actions.getMyProfileSuccess(res);
        });  
        //call API get User Validation Status
        this.props.api.getUserValidationStatus(userId).then((res) => {
            this.props.actions.getUserValidationStatusSuccess(res);   
        });
	}

	componentDidMount() {
        const dH = document.body.scrollHeight;
		const wH = window.innerHeight;

		if(dH < wH){
			const mainContainer = document.querySelectorAll('.page-container');
			if(mainContainer.length > 0){
				for(let i=0, len=mainContainer.length; i<len; i++){
					if(mainContainer[i]){
						mainContainer[i].style.minHeight = wH + 'px';
					}
				}
			}
		}
    }

    componentWillReceiveProps(props){
        const prevTab = get(this.props, 'location.hash');
        const nextTab = get(props, 'location.hash');

        if(prevTab !== nextTab && prevTab === `#${MyProfileTabIDs.myAccount}`){
            this.props.actions.getUserValidationStatusSuccess({showMyAccountMessage: false});
        }
    }

    _getTabsData(userInfo, userStatus){
        const {role} = userInfo;
        let tabsData = new MyProfileTabs();
        let isAdviser = SecurityUtils.isAdviserRole(userInfo);
        let isPA = SecurityUtils.isPARole(userInfo);
        let isStaff = SecurityUtils.isStaffRole(userInfo);
        let isValidated  = UserValidationStatusUtils.isValidated(userStatus);
        let isUpgradable = UserValidationStatusUtils.isUpgradable(userStatus);
        let isValidating = UserValidationStatusUtils.isValidating(userStatus);
      
        if(isStaff){
            tabsData.hideTab(MyProfileTabIDs.upgradeAccess);
            tabsData.hideTab(MyProfileTabIDs.agencyCodes);
            tabsData.hideTab(MyProfileTabIDs.delegations);
        }
        
        if(isValidating || isUpgradable){
            tabsData.hideTab(MyProfileTabIDs.agencyCodes);
            tabsData.hideTab(MyProfileTabIDs.delegations);   
        }
        else if(isValidated){
            tabsData.hideTab(MyProfileTabIDs.upgradeAccess);
            if(isPA){
                tabsData.hideTab(MyProfileTabIDs.agencyCodes);
            }
        }

        return tabsData.getData();
    }

    handleTabChange(from, to){
        // if(from === MyProfileTabIDs.myAccount && to !== MyProfileTabIDs.myAccount){
        //     this.props.actions.getUserValidationStatusSuccess({showMyAccountMessage: false});
        // }
    }

    render() {
        const defaultTab = (location.hash && location.hash.slice(1)) || MyProfileTabIDs.myAccount;
        let userInfo = get(this.props, 'myProfile.userInfo');
        let userStatus = get(this.props, 'myProfile.userStatus');
        let tabsData = this._getTabsData(userInfo, userStatus);
        
        return(
            <div id='pes-myprofile-page' className='page-container'>
                <div>
                    <MyProfileHeader />
                    
                    {
                        (userInfo && userStatus) &&
                        <div className='container pes-myprofile-page'>
                            <Tab
                                tabsData={tabsData}
                                defaultTab={defaultTab}
                                onTabChange={(from, to) => this.handleTabChange(from, to)}
                                // dynamicTab
                            />
                        </div>
                    }
                </div>

                <Footer />
            </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);