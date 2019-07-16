import Moment from 'moment';
import _ from 'lodash';
import HtmlUtils from '../utils/HtmlUtils';

export default class StringUtils {
	/**
	 * numberWithCommas - comma-separate big numbers in groups of three digits
	 * @param  {string} val									value to be comma-seperated
	 * @return {string}                     comma-seperated result
	 */
	static numberWithCommas(val) {
		if (val === 0) {
			return '0';
		}

		if (val) {
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			return '';
		}
	}

	/**
	 * convertToCurrency - returns an object containing pounds and pence properties from a number
	 * @param  {string} val									value to be converted
	 * @return {object}                     currency in pounds, pence, and a total
	 */
	static convertToCurrency(val, withSign = true) {
		const pounds = (withSign ? '£' : '') + this.numberWithCommas(Math.floor(val));
		const pence = '.' + parseFloat(val).toFixed(2).split('.')[1];
		const total = pounds + pence;

		return {
			pounds,
			pence,
			total
		};
	}

	/**
	 * formattedDate - recieves an ISO date-time and formats to DD/MM/YYYY;
	 * if date is undefined then we return 'dd/m/yyyy' placeholder;
	 * if date is invalid then we return 'Invalid date'
	 * @param  {string} date                ISO formatted date-time
	 * @return {string}                     DD/MM/YYYY formatted date
	 */
	static formattedDate(date) {
		if (date) {
			return Moment.utc(date).format('DD/MM/YYYY');
		}

		return 'dd/mm/yyyy';
	}

	static containsSubstring(string, substring, isLowerCase) {
		if (isLowerCase) {
			string = string.toLowerCase();
			substring = substring.toLowerCase();
		}

		return string.indexOf(substring) > -1;
	}

	static convertNumberToString(value) {
		if (_.isNumber(value)) {
			return value.toString();
		}

		return '';
	}

	/**
	 * formattedAddress - gets address values from contactAddress object
	 * and orders them; filters out undefined values before mapping to comma
	 * separated string
	 * @param  {object} contactAddress      address object containing address line values
	 * @param  {array}  addressOrder        array of key names which specifies address order
	 * @return {string}                     formatted comma-seperated adddress
	 */
	static formattedAddress(contactAddress, addressOrder) {
		const getValues = values => _.map(values, addressLine => _.get(contactAddress, addressLine));
		const joinValues = values => values.join(', ');
		const formatDate = _.flow(
			getValues,
			_.compact,
			joinValues
		);

		return formatDate(addressOrder);
	}

	static camelCaseToKebabCase(string) {
		return string.replace(/([A-Z])/g, ($1) => {
			return '-' + $1.toLowerCase();
		});
	}

	// Equivalent to C# String.Format
	static format(format) {
		if (!format) {
			return format;
		}
		const args = Array.prototype.slice.call(arguments, 1);

		return format.replace(/{(\d+)}/g, (match, number) => {
			return typeof args[number] !== 'undefined' ? args[number] : match;
		});
	}

	static extractInteger(string, index = 0) {
		return parseInt(string.match(/\d+/)[index]);
	}

	static getDataAnchor(string) {
		return string.replace(' ', '-');
	}

	static stringify(obj) {
		return JSON.stringify(obj);
	}

	static parse(str) {
		return JSON.parse(str);
	}

	static combineTitleName(title, firtName, lastName)
	{
		return `${title} ${firtName} ${lastName}`;
	}
	
	static removeEmptyValues (obj) {
        let planObj = {planIDs: []};        
        _.each(obj.planIDs, function (plan) {
            if ((plan && plan.toString().trim().length > 0)) { 
                planObj.planIDs.push(plan.toString().trim()); 
            }
          });
        return planObj;
	}

	static sortCodeFormat (sortCode) {
		return sortCode.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3");
	}
	
	static stringFormatToReact(str)
	{
		str = StringUtils.format.apply(null, arguments);
		return HtmlUtils.htmlToReact(str);
	}
}
