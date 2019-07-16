import {SubmissionError} from 'redux-form';
import {get as _get, set as _set, isEmpty as _isEmpty} from 'lodash';
import {FIELD_NAMES, ERROR_MESSAGES} from './constants';


export const submitInitial = (values, dispatch, props) => {
    let errors = {};
    // const role = _get(props, `formValues.${FIELD_NAMES.role}`);
    const role = _get(values, `${FIELD_NAMES.role}`);
    const postCodeRegExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;

    /******************** ROLE ********************/
    // R311
    if(!role){
        errors[FIELD_NAMES.role] = ERROR_MESSAGES.M311;
    }

    /******************** FSA NUMBER ********************/
    const fsaNumber = _get(values, `${FIELD_NAMES.fsaNumber}`);
    // R312
    const fsaNotInDB = false;
    // if(!fsaNumber || fsaNotInDB){
    //     errors[FIELD_NAMES.fsaNumber] = ERROR_MESSAGES.M312;
    // }

    /* R313 Adviser only
    Either 
    An entry must exist on the ARIS client table with the FSA authorisation number and Firm postcode entered and there must be a linked agent record with the supplied Agency code
    Or
    The agency code must be found on an agent record where a linked ARIS client record has the supplied postcode and an FSA number which determines it to be part of a network identified by the supplied FSA code. 
    Postcode matching should not be sensitive to case.
    */

    /* R319 PA only
    If the Firm Level (or located) FSA number of the Username input is a Network FSA number then:

    - the FSA number supplied must match the FSA number of the Username input;
    - the Postcode supplied must match the Postcode of the Firm link of the Username input 

    Else

    The FSA number supplied must match the FSA number of the Username input.
    Or 
    The Postcode supplied must match the Postcode of the ARIS Firm Link of the Username input and the FSA number of the Username input must be within the network of the supplied FSA number.
    Postcode matching should not be sensitive to case.
    */

    /******************** FIRM POSTCODE ********************/
    const firmPostcode = _get(values, `${FIELD_NAMES.firmPostcode}`);
    if(!firmPostcode){
        errors[FIELD_NAMES.firmPostcode] = 'Postcode is not recognised.';
    }

    // R326
    if(firmPostcode){
        if(!postCodeRegExp.test(firmPostcode)){
            errors[FIELD_NAMES.firmPostcode] = ERROR_MESSAGES.M26;
        }
    }

    /******************** ADVISER CODE ********************/
    const adviserCode = _get(values, `${FIELD_NAMES.adviserCode}`);
    if(role === 'IFA'){
        if(!adviserCode){
            errors[FIELD_NAMES.adviserCode] = ERROR_MESSAGES.M317;
        }
    
        // R315
        if(/[^a-zA-Z0-9]/g.test(adviserCode)){
            errors[FIELD_NAMES.adviserCode] = ERROR_MESSAGES.M315;
        }
    
        /* R317
        The Agency Code must be found on an agent record within the ARIS data, be a Zurich or Sterling code and be an active status. 
        */
    
        /* R313
        */
    }

    /******************** ADVISER USERNAME ********************/
    const adviserUsername = _get(values, `${FIELD_NAMES.adviserUsername}`);
    if(role === 'PA'){
        // R318
        if(!adviserUsername){
            errors[FIELD_NAMES.adviserUsername] = ERROR_MESSAGES.M318;
        }

        // R52
        const belongToAdviser = true;
        if(adviserUsername && !belongToAdviser){
            errors[FIELD_NAMES.adviserUsername] = ERROR_MESSAGES.M52;
        }

        // R53
        const belongToValidatedOrValidationBypassedUser = true;
        if(adviserUsername && !belongToValidatedOrValidationBypassedUser){
            errors[FIELD_NAMES.adviserUsername] = ERROR_MESSAGES.M53;
        }

        // R55
        const notYourOwn = true;
        if(adviserUsername && !notYourOwn){
            errors[FIELD_NAMES.adviserUsername] = ERROR_MESSAGES.M55;
        }

        // R319
    }


    /******************** SUBMIT ********************/
    const api = _get(props, 'api.makeUpgradeAccessRequest');
    const userId =  _get(props, 'myProfile.userInfo.username');
    let requestData = {
        ...values,
        [FIELD_NAMES.adviserCode]: adviserCode || '',
        [FIELD_NAMES.adviserUsername]: adviserUsername || '',
        userId
    };
    
    return api && api(requestData)
    .then(data => {
        if(data.status == 500){
            return Promise.reject({...errors, _error: data.message || 'Internal error'});
        }
        else {
            if(_isEmpty(errors)){
                return Promise.resolve(values);
            }
            else {
                return Promise.reject({...errors});
            }
        }
    });
};


export const submitValidate = (values, dispatch, props) => {
    let errors = {};


    /******************** SUBMIT ********************/
    const api = _get(props, 'api.makeValidationCodeRequest');
    const userId =  _get(props, 'myProfile.userInfo.username');
    const validationCode = [values.validationCode1, values.validationCode2].join('-');
    
    return api && api(userId, validationCode)
    .then(data => {
        if(data.status == 500){
            return Promise.reject({...errors, _error: data.message || 'Internal error'});
        }
        else {
            if(_isEmpty(errors)){
                return Promise.resolve(values);
            }
            else {
                return Promise.reject({...errors});
            }
        }
    });
};


// VALIDATION
export const validateAdviserCode = value => {
    if(!value){
        return ERROR_MESSAGES.M317;
    }
    if(/[^a-zA-Z0-9]/g.test(value)){
        return ERROR_MESSAGES.M315;
    }
};
export const validatePostCodeCode = value => {
    const postCodeRegExp = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;

    if(!value){
        return 'Postcode is not recognised.';
    }
    if(value){
        if(!postCodeRegExp.test(value)){
           return ERROR_MESSAGES.M26;
        }
    }
};
export const validateAdviserUsername = value => {
    if(!value){
        return ERROR_MESSAGES.M318;
    }
};