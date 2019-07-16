import React from 'react';
import _ from 'lodash';
import HtmlToReact from 'html-to-react';

export default class HtmlUtils {
	/**
	 * Convert html string to a React component
	 * @param {string} htmlInput
	 */
	static htmlToReact(htmlInput) {
		const unescapedHtmlInput = _.unescape(htmlInput).replace(/&nbsp;/g, ' ');
		const htmlToReactParser = new HtmlToReact.Parser(React);
		const reactComponent = htmlToReactParser.parse('<div>' + unescapedHtmlInput + '</div>');

		return reactComponent;
	}

	static htmlToReactWithCss(htmlInput, classWrapper) {
		const unescapedHtmlInput = _.unescape(htmlInput).replace(/&nbsp;/g, ' ');
		const htmlToReactParser = new HtmlToReact.Parser(React);
		const reactComponent = htmlToReactParser.parse('<div class=\'' + classWrapper + '\'>' + unescapedHtmlInput + '</div>');

		return reactComponent;
	}
}
