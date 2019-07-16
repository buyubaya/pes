import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AuthUtils from '../utils/AuthUtils';
import SecurityUtils from '../utils/SecurityUtils';
import TransitionUtils from '../utils/TransitionUtils';

class ExistingBusinessPage extends React.Component {
	componentWillMount(){
		if(this.props.router.getCurrentLocation().pathname !== '/' && !SecurityUtils.isServicingRole()){
			TransitionUtils.navigateTo(PES.basename);
		}
	}

	componentDidMount(){
		this._setContainerHeight();
	}

	componentWillReceiveProps(newProps) {
		if(newProps.location.pathname !== this.props.location.pathname){
			setTimeout(() => {
				this._setContainerHeight();
			}, 0);
		}
	}

	_checkUA() {
		const u = window.navigator.userAgent.toLowerCase();

		return {
			isTablet: (u.indexOf('windows') != -1 && u.indexOf('touch') != -1)
				|| u.indexOf('ipad') != -1
				|| (u.indexOf('android') != -1 && u.indexOf('mobile') == -1)
				|| (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1)
				|| u.indexOf('kindle') != -1
				|| u.indexOf('silk') != -1
				|| u.indexOf('playbook') != -1,
			isSmartPhone: (u.indexOf('windows') != -1 && u.indexOf('phone') != -1)
				|| u.indexOf('iphone') != -1
				|| u.indexOf('ipod') != -1
				|| (u.indexOf('android') != -1 && u.indexOf('mobile') != -1)
				|| (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1)
				|| u.indexOf('blackberry') != -1,
			isMSIE: /*@cc_on!@*/false,
			ie: (function () {
				if (window.ActiveXObject === undefined) return null;
				if (!document.querySelector) return 7;
				if (!document.addEventListener) return 8;
				if (!window.atob) return 9;
				if (!document.__proto__) return 10;
				return 11;
			})()
		}
	}

	_setContainerHeight(){
		const _UA = this._checkUA();

		if(!_UA.isTablet && !_UA.isSmartPhone){
			const dH = document.body.scrollHeight;
			const wH = window.innerHeight;

			if (dH < wH) {
				const mainContainer = document.querySelectorAll('.page-container');
				if (mainContainer.length > 0) {
					for (let i = 0, len = mainContainer.length; i < len; i++) {
						if (mainContainer[i]) {
							mainContainer[i].style.minHeight = wH + 'px';
						}
					}
				}
			}
		}
	}

	render() {
		const userinfo = this.props.userinfo;

		return (
			<div className='page-container'>
				<div>
					<Header />
					{
						!AuthUtils.hasPermissionOnExistingBussinessTab()
						&& (<div className='container'>
							<p>
								Please register for plan enquiry
								</p>
						</div>)
					}
					{
						AuthUtils.hasPermissionOnExistingBussinessTab()
						&& React.cloneElement(this.props.children, { userinfo })
					}
				</div>
				<Footer />
			</div>
		);
	}
}

export default ExistingBusinessPage;
