export default class UrlUtils {
	static getParam(name) {
		const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		const results = regex.exec(location.search);

		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	static getPrevUrl() {
		return sessionStorage.getItem('prevUrl') || '';
	}
	static getActualLink(link){
		if(!_.isUndefined(window.PES.basename) && !_.isNull(window.PES.basename) 
            && (window.PES.basename.length != '/' || window.PES.basename.length != '')
            && !_.startsWith(link, window.PES.basename)){
                link = window.PES.basename + link;
		}
		return link;
	}
}
