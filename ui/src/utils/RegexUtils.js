const regexes = {
	password1: /[a-z]/,
	password2: /[A-Z]/,
	password3: /\d/,
	password4: /[!@#$%£&^\'\(\)\*\+\,\-\;\:\.\<\>\=\?\[\]\\\_\{\}\|\~\`\/\"]/,
	email: /^([_a-z0-9#~!$\-')(]+(\.[_a-z0-9#~!$\-')(]+)*)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
	emailInLongStr: /([_a-z0-9#~!$\-')(]+(\.[_a-z0-9#~!$\-')(]+)*)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})/i,
	number: /^\d+$/,
	float: /^(?:\d*\.\d{1,2}|\d+)$/,
	phone: /^\d{10,11}$/,
	salary: /^[0-9]{1,7}$/,
	estimatedCost: /^\d{1,7}$/,
	alpha1: /[A-Za-z]/,
	alpha2: /^[a-zA-Z \-\ \.\']*$/,
	alpha3: /^[a-zA-Z \-\ ]*$/,
	alpha4: /^[a-zA-Z \-\ \']*$/,
	alphanumeric1: /^[a-zA-Z 0-9\s]{1,40}$/,
	alphanumeric2: /^[a-zA-Z 0-9\-\ \.\/]*$/,
	alphanumeric3: /^[a-zA-Z0-9\s!@#$%£&^\'\(\)\*\+\,\-\;\:\.\<\>\=\?\[\]\\\_\{\}\|\~\`\/\"]*$/,
	alphanumeric4: /^[a-zA-Z0-9\s&\.\,\(\)\'\-\_\/]*$/,
	alphanumeric5: /^[a-zA-Z 0-9\-\ \.]{0,15}$/,
	postcode: /^[A-Z]{1,2}[0-9R][0-9A-Z]{0,2} [0-9][A-Z]{2}$/i,
	zurichPlanNumber: /^([a-zA-Z0-9\ ]){8,9}$/,
	nonZurichPlanNumber: /^[a-zA-Z 0-9\-\ \.\/]{1,30}$/,
	nino: /^(?!BG|GB|NK|KN|TN|NT|ZZ|bg|gb|nk|kn|tn|nt|zz)(?:[ABCEGHJ-PRSTW-Zabceghj-prstw-z][ABCEGHJ-NPRSTW-Zabceghj-nprstw-z])(?:\d){6}([A-Da-d]|[FMPfmp]|\s{1})$/,
	policyNumber: /^(Z[U,R]{1}[0-9]{7}|[0-9]{8})$/i,
	accountNumber: /^(\s*|\d{6,10})$/,
	sortCode: /^\d{6}$/,
	isaPaymentAmount: /^(|\d{1,5}(?:\.\d{1,2})?)$/,
	generalPostcode: /^([A-Z]{1,2}[0-9R][0-9A-Z]{0,2} [0-9][A-Z]{2})?$/i
};

function _isValid(regex, value) {
	const regexConstant = regexes[regex];

	if (!regexConstant) {
		return false;
	}

	const regExp = new RegExp(regexConstant);

	return regExp.test(value);
}

export default class RegexUtils {

	static isValid(regex, value) {
		if (regex === 'password') {
			return this.isValidPassword(value);
		}

		return _isValid(regex, value);
	}

	static isValidPassword(value) {
		if (!value) {
			return false;
		}

		if (value.length < 8) {
			return false;
		}

		let validPwCount = 0;

		for (let i = 1; i <= 4; i++) {
			if (_isValid('password' + i, value)) {
				validPwCount += 1;
			}
		}

		return validPwCount >= 3;
	}

	static hidePartialString(value) {
		if (value) {
			return value.replace(/.(?=.{2})/g, 'X');
		}

		return value;
	}

	static formatHiddenSortCode(value) {
		if (value) {
			return value.replace(/(XX)(XX)(\d{2})/, '$1-$2-$3');
		}

		return value;
	}
}
