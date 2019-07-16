import _ from 'lodash';

export default class TransitionUtils {
	static transitionTo(destination) {
		if (!_.isUndefined(window.PES.basename) && !_.isEmpty(window.PES.basename) && 
			(window.PES.basename != '/' || window.PES.basename != '') && _.startsWith(destination, window.PES.basename)) {
			destination = destination.replace(window.PES.basename,'');
		}
		if (_.startsWith(destination, '/')) {
			destination = destination.substr(1);
		}
		PES.history.push(`/${destination}`);
	}

	static navigateTo(destination, target) {
		const win = window.open(destination, target || '_self');

		win.focus();
	}

	static goBack() {
		PES.history.goBack();
	}
}
