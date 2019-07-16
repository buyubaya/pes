import React, { PropTypes } from 'react';
import ProductGroups from '../../constants/ProductGroups';
import {TabIDs} from '../../constants/PlanDetailTabs';
import * as LocalStorage from '../../utils/LocalStorage';
import * as SessionStorage from '../../utils/SessionStorage';
import TransitionUtils from '../../utils/TransitionUtils';
import {get as _get, flatMapDeep as _flatMapDeep} from 'lodash';
import {MyProfileTabIDs} from '../../constants/MyProfile';
import * as MyProfileActions from '../../actions/MyProfileActions';

class Tab extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			current: null,
			mounted: {},
			hidden: {}
		};

		this.onClick = this.onClick.bind(this);
		this.changeTab = this.changeTab.bind(this);
		this.toggleTab = this.toggleTab.bind(this);
	}

	static propTypes = {
		defaultTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	};

	componentWillMount(){
		let {defaultTab, tabsData} = this.props;
		this.setDefaultTab(tabsData, defaultTab);
	}

	componentWillReceiveProps(props){
		this.setDefaultTab(props.tabsData, props.defaultTab);
	}

	setDefaultTab(tabsData, defaultTab){
		let current;

		if(tabsData && defaultTab){
			tabsData.forEach(item => {
				if(item.id === defaultTab && !item.hide){
					current = item;
				}
				else if(item.children){
					item.children.forEach(item => {
						if(item.id === defaultTab && !item.hide){
							current = item;
						}
					});
				}
			});
		}

		if(!current){
			current = tabsData[0];
		}

		this.setCurrentTab(current);
	}

	setCurrentTab(current){
		this.setState(state => {
			if(state.mounted[current.id]){
				return {current};
			}
			else {
				return {current, mounted: {...state.mounted, [current.id]: current.component}};
			}
		});
	}

	onClick(e, current){		
		e.stopPropagation();
		this.onTabChange(current.id);
		this.setCurrentTab(current);
	}

	changeTab(tabId){
		const {tabsData} = this.props;
		this.onTabChange(tabId);
		this.setDefaultTab(tabsData, tabId);
	}

	onTabChange(tabId){
		if(tabId === MyProfileTabIDs.upgradeAccess) {
			PES.dispatch(MyProfileActions.updateUpgradeAccessTabClickedCount());
		}

		TransitionUtils.transitionTo(`${location.pathname}#${tabId}`);
		this.props.onTabChange && this.props.onTabChange(_get(this.state, 'current.id'), tabId);
	}

	toggleTab(tabId, visibility=null){
		if(typeof visibility === 'undefined' || visibility === null){
			this.setState(state => ({hidden: {...state.hidden, [tabId]: !state.hidden[tabId]}}));
		}
		else {
			this.setState(state => ({hidden: {...state.hidden, [tabId]: !visibility}}));
		}
	}

	_flatTabsData(tabsData){
		return _flatMapDeep(tabsData, item => {
			if(item.children){
				return item.children;
			}
			return item;
		});
	}

	render() {
		let CurrentTab = this.state.current && this.state.current.component;
		let {tabsData, dynamicTab} = this.props;

		return (
			<div className='pes-tab-area'>
				<div className='tab-headers-area'>
					<ul className={((this.state.current && this.state.current.children) || (this.state.current && this.state.current.parentId)) ? 'tab-headers mb' : 'tab-headers'}>
						{
							tabsData &&
							tabsData.map((item, index) => (
								item && !item.hide && !_get(this.state, `hidden.${item.id}`) &&
								<li 
									key={index} 
									className={
										(this.state.current && 
										(
											(
												this.state.current.id &&
												(this.state.current.id === item.id) 
											) || 
											(
												this.state.current.parentId &&
												(this.state.current.parentId === item.id)
											)
										))
										? 'active' : null
									}
									onClick={e => this.onClick(e, item)}
								>
									<span>{item.label}</span>
									{
									item.children && 
									<ul className='sublist'>
										{
											item.children.map((item, index) =>
											<li 
												key={index}
												className={(this.state.current && this.state.current.id )=== item.id ? 'active' : null}
												onClick={e => this.onClick(e, item)}
											>
												<span>{item.label}</span>
											</li>	
										)
										}
									</ul>
									}
								</li>)
							)
						}
					</ul>
				</div>
				<div className='tab-body pes-bg-grey'>
					{
						dynamicTab
						?
						(
							tabsData && 
							this._flatTabsData(tabsData).map(item => {
								const MountedTab = _get(this.state, `mounted.${item.id}`);
								const isHidden = (item.id !== _get(this.state, 'current.id')) || _get(this.state, `hidden.${item.id}`);

								return(
									<div key={item.id} className={isHidden ? 'hidden' : null}>
										{
											MountedTab && 
											<MountedTab 
												changeTab={this.changeTab} 
												toggleTab={this.toggleTab} 
											/>
										}
									</div>
								);
							})
						)
						:
						CurrentTab && <CurrentTab changeTab={this.changeTab} />
						// (
						// 	tabsData &&
						// 	this._flatTabsData(tabsData).map((item, index) => {
						// 		const ItemComponent = item.component;
						// 		const isHidden = (item.id !== _get(this.state, 'current.id')) || _get(this.state, `hidden.${item.id}`);

						// 		return(
						// 			ItemComponent && 
						// 			<div className={isHidden ? 'hidden' : null} key={index}>
						// 				<ItemComponent
						// 					changeTab={this.changeTab}
						// 					toggleTab={this.toggleTab}
						// 				/>
						// 			</div>
						// 		);
						// 	})
						// )
					}
				</div>
			</div>
		);
	}
}


export default Tab;