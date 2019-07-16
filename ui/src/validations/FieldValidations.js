import {get as _get, isEmpty as _isEmpty} from 'lodash';


export const required = value => (typeof value === 'undefined' || value === null || value === '') ? 'Please fill in this field' : undefined;
/* export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined */
/* export const maxLength15 = maxLength(15)
export const maxLength14 = maxLength(14) */

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
	value && value < min ? `Must be at least ${min}` : undefined;

export const minValue18 = minValue(18);

export const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
		'Invalid email address' : undefined;

export const datetime = value => {
	if(!!value){
		return /^((((?:((0[1-9])|([12][0-9]))|30)\/(?:(0[13-9]|10|11|12))|(?:31\/(?:(0[13578]|10|12)))|(?:(0[1-9])|(1[0-9])|(2[0-8]))\/02)\/(?:\d{4}))|(29\/02\/\d{2}(?:([02468][048])|([159][26]))))$/.test(value) ? undefined : 'Invalid date';
	}
};

export const maxLength = max => (value, previousValue, allValues) => value && value.length > max ? previousValue : value;

export const postCode = value => {
	if(!!value){
		return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/g.test(value) ? undefined : 'Invalid Post Code';
	}
};

export const niNumber = value => {
	if(!!value){
		return /^[a-zA-Z]{2}[0-9]{6}[a-zA-Z]$/g.test(value) ? undefined : 'Invalid NI Number';
	}
};

export const accountHolderName = value => {
	if(!!value){
		//return /^[\\s]*[a-zA-Z0-9]{1,}[a-zA-Z0-9\\s]*$/g.test(value) ? undefined : 'Please amend the payee details. You can enter up to 40 alphanumeric characters';
		//fix not match space ex: Tien Huynh
		return /^[\s]*[a-zA-Z0-9]{1,}[a-zA-Z0-9\s]*$/g.test(value) ? undefined : 'Please amend the payee details. You can enter up to 40 alphanumeric characters';
	}
};

export const accountNumber = value => {
	if(!!value){
		return /^\d{8}$/g.test(value) ? undefined : 'Invalid account number';
	}
};

export const sortCode = value => {
	if(!!value){
		return /^(\d{2}[-]\d{2}[-]\d{2})|(\d{6})/g.test(value) ? undefined : 'Invalid sort code';
	}
};

export const buildingRolNumber = value => {
	if(!!value){
		return /^[A-Za-z0-9/]*$/g.test(value) ? undefined : 'An incorrect building society roll number entered. Please check and amend the details';
	}
};

// My Account - Forename Validation - only contain alphabetic, hyphen, and space characters
export const forenameValidate = value => {
	if(!!value){
		return /^[a-zA-Z- ]*$/g.test(value) ? undefined : 'Only alphabetic, hyphen and space characters are allowed ';
	}
};

// My Account - Surname Validation - only contain alphabetic, hyphen, apostrophe and space characters
export const surnameValidate = value => {
	if(!!value){
		return /^[a-zA-Z\s-']*$/g.test(value) ? undefined : 'Only alphabetic, hyphen, apostrophe and space characters are allowed';
	}
};

// My Account - Firmname Validation - only contain alphabetic, numeric, space and the following special characters are allowed @[ ]( )/&- in Firm name.
export const firmNameValidate = value => {
	if(!!value){
		return /^[a-zA-Z0-9\s\-\'\/@()\[\]\?&]*$/g.test(value) ? undefined : 'Only alphabetic, numeric, space and the following special characters are allowed @[ ]( )/&- in Firm name.';
	}
};

// My Account - email
export const emailMyAccount = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
		'A validation email will be sent to this address, please ensure Email address is correct.' : undefined;

// My Account - firmPostcode
export const firmPostcode = value => {
	if(!!value){
		return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/g.test(value) ? undefined : 'Invalid Firm Postcode.';
	}
};