import ProductGroups from '../../../constants/ProductGroups';
import {AMEND_TYPES, FIELD_NAMES, ERROR_MESSAGES} from './constants';
import {
    get as _get, 
    set as _set, 
    isEmpty as _isEmpty, 
    values as _values, 
    isEqual as _isEqual, 
    compact as _compact, 
    isUndefined as _isUndefined,
    isNull as _isNull
} from 'lodash';
import {SubmissionError} from 'redux-form';
import moment from 'moment';


const errorMessages = {
    title: 'Invalid',
    otherTitle: 'Invalid',
    forenames: 'Invalid',
    surname: 'Invalid',
    nameTypeOfEvidenceSeen: 'Invalid',
    nameOtherEvidenceType: 'Invalid',

    sex: 'Invalid',
    employmentStatus: 'Invalid',
    occupation: 'Invalid',
    niNumber: 'Invalid',
    nationality: 'Invalid',
    ukResidency: 'Invalid',
    ordinarilyResident: 'Invalid',

    address1: 'Invalid',
    address2: 'Invalid',
    address3: 'Invalid',
    address4: 'Invalid',
    postCode: 'Invalid',
    addressEffectiveDate: 'Invalid',

    altAddress1: 'Invalid',
    altAddress2: 'Invalid',
    altAddress3: 'Invalid',
    altAddress4: 'Invalid',
    altPostCode: 'Invalid',
    altAddressEffectiveDate: 'Invalid',

    daytimeTelephoneNumber: 'Invalid',
    eveningtimeTelephoneNumber: 'Invalid',
    mobileTelephoneNumber: 'Invalid',
    emailAddress: 'Invalid',
    contactDetailsEffectiveDate: 'Invalid',

    correctDateOfBirth: 'Invalid',
    dobTypeOfEvidenceSeen: 'Invalid',
    dobOtherEvidenceType: 'Invalid',
};


/******************** SUBMIT ********************/
export const submit = (values, dispatch, props) => {
    let errors = {};
    let _error; // FORM ERRORS
    const MAX_MONTHS_IN_FUTURE = 2;
    const niNumberRegExp = /^[a-zA-Z]{2}[0-9]{6}[a-zA-Z]$/g;
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const dateRegExp = /^((((?:((0?[1-9])|([12][0-9]))|30)\/(?:([0]?[13-9]|10|11|12))|(?:31\/(?:([0]?[13578]|10|12)))|(?:(0?[1-9])|(1[0-9])|(2[0-8]))\/2)\/(?:\d{4}))|(29\/2\/\d{2}(?:([02468][048])|([159][26]))))$/;
    const amendType = _get(props, 'params.amendType');


    /******************** VALIDATE FORM EMPTY ********************/
    let allFormValues = {
        ...values.name,
        ...values.otherDetails,
        ...values.address,
        ...values.contactDetails,
        ...values.dateOfBirth,
        ...values.alternativeAddress
    };

    let isDirty = false;
    for(let x in allFormValues){
        if(
            x != FIELD_NAMES.multipleAddressChange &&
            x != FIELD_NAMES.checkButtonValues &&
            x != FIELD_NAMES.altMultipleAddressChange &&
            x != FIELD_NAMES.altCheckButtonValues &&
            (
                !_isUndefined(allFormValues[x]) || !_isNull(allFormValues[x])
            )
        ){
            isDirty = true;    
        }
    }
    
    if(!isDirty){
        _error = ERROR_MESSAGES.fillForm;
    }


    /******************** NAME SECTION ********************/
    const nameValues = _get(values, 'name'); 
    const title = _get(nameValues, FIELD_NAMES.title);
    const otherTitle = _get(nameValues, FIELD_NAMES.otherTitle);
    const forenames = _get(nameValues, FIELD_NAMES.forenames);
    const surname = _get(nameValues, FIELD_NAMES.surname);
    const nameTypeOfEvidenceSeen = _get(nameValues, FIELD_NAMES.nameTypeOfEvidenceSeen);
    const nameOtherEvidenceType = _get(nameValues, FIELD_NAMES.nameOtherEvidenceType);
    const organisationName = _get(nameValues, FIELD_NAMES.organisationName);
    const organisationNumber = _get(nameValues, FIELD_NAMES.organisationNumber);

    if(!_isEmpty(nameValues)){
        // If otherTitle is filled in, ensure option other is chosen in title drop down.  
        if ( 
            _isEmpty(title) && 
            !_isEmpty(otherTitle)
        )
        {
            _set(errors, `name.${FIELD_NAMES.title}`, ERROR_MESSAGES.title);
        }

        // title must be '' or 'other' when otherTitle not empty
        if ( 
            !_isEmpty(title) && 
            title !== 'other' && 
            !_isEmpty(otherTitle) 
        )
        {
            _set(errors, `name.${FIELD_NAMES.otherTitle}`, ERROR_MESSAGES.otherTitle);
        }

        // if title is "Other" then Other title field should not be empty.
        if(
            title === 'other' &&
            _isEmpty(otherTitle)
        )
        {
            _set(errors, `name.${FIELD_NAMES.otherTitle}`, ERROR_MESSAGES.otherTitle1);
        }

        // CHECK EVIDENCE FOR NOT ORGANISATION & TRUSTEE
        if(amendType !== AMEND_TYPES.organisation && amendType !== AMEND_TYPES.trustee){
            // validate forename and surname if evidence type or other evidence has been selected
            if(
                _isEmpty(forenames) && 
                _isEmpty(surname) &&
                (
                    !_isEmpty(nameTypeOfEvidenceSeen) && 
                    nameTypeOfEvidenceSeen !== 'other' &&
                    !_isEmpty(nameOtherEvidenceType)
                )
            )
            {
                _set(errors, `name.${FIELD_NAMES.forenames}`, ERROR_MESSAGES.forenames);
                _set(errors, `name.${FIELD_NAMES.surname}`, ERROR_MESSAGES.surname);
            }

            if(
                _isEmpty(forenames) && 
                _isEmpty(surname) && 
                !_isEmpty(nameOtherEvidenceType)
            )
            {
                _set(errors, `name.${FIELD_NAMES.forenames}`, ERROR_MESSAGES.forenames);
                _set(errors, `name.${FIELD_NAMES.surname}`, ERROR_MESSAGES.surname);
            }

            if(
                _isEmpty(forenames) && 
                _isEmpty(surname) &&
                (
                    !_isEmpty(nameTypeOfEvidenceSeen) && 
                    nameTypeOfEvidenceSeen !== 'other'
                )
            )
            {
                _set(errors, `name.${FIELD_NAMES.forenames}`, ERROR_MESSAGES.forenames);
                _set(errors, `name.${FIELD_NAMES.surname}`, ERROR_MESSAGES.surname);
            }

            // validate evidence seen for change of name if name change has been done
            if(
                ( _isEmpty(nameTypeOfEvidenceSeen) || nameTypeOfEvidenceSeen === 'other' ) &&
                _isEmpty(nameOtherEvidenceType) &&
                ( !_isEmpty(forenames) || !_isEmpty(surname) )
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenName);
            }

            if(
                nameTypeOfEvidenceSeen === 'other' &&
                _isEmpty(nameOtherEvidenceType)
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameOtherEvidenceType}`, ERROR_MESSAGES.otherEvidenceName);
            }

            // validate evidence seen for change of name if name change has been done
            if(
                _isEmpty(nameTypeOfEvidenceSeen) &&
                !_isEmpty(nameOtherEvidenceType)
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenOtherName);
            }

            // validate evidence name if other has been selected from the evidence type
            if(
                !_isEmpty(nameTypeOfEvidenceSeen) &&
                nameTypeOfEvidenceSeen !== 'other' &&
                !_isEmpty(nameOtherEvidenceType)
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceOtherTypeName1);
            }

            // validate other evidence type if name change has been made.
            if(
                nameTypeOfEvidenceSeen === 'other' &&
                _isEmpty(nameOtherEvidenceType)
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameOtherEvidenceType}`, ERROR_MESSAGES.otherEvidenceName);
            }
        }


        // CHECK EVIDENCE FOR ORGANISATION ONLY
        if(amendType === AMEND_TYPES.organisation){
            // validate forename and surname if evidence type or other evidence has been selected
            if(
                _isEmpty(forenames) && 
                _isEmpty(surname) &&
                _isEmpty(organisationName) &&
                _isEmpty(organisationNumber) &&
                !_isEmpty(nameTypeOfEvidenceSeen)
            )
            {
                _set(errors, `name.${FIELD_NAMES.forenames}`, ERROR_MESSAGES.forenames);
                _set(errors, `name.${FIELD_NAMES.surname}`, ERROR_MESSAGES.surname);
                _set(errors, `name.${FIELD_NAMES.organisationName}`, ERROR_MESSAGES.organisationName);
                _set(errors, `name.${FIELD_NAMES.organisationNumber}`, ERROR_MESSAGES.organisationNumber);
            }

            // validate evidence seen for change of name if name change has been done
            if(
                _isEmpty(nameTypeOfEvidenceSeen) &&
                ( 
                    !_isEmpty(organisationName) || 
                    !_isEmpty(organisationNumber) 
                )
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenName);
            }

            // validate special character
            if(
                !_isEmpty(organisationName) &&
                /[^a-zA-Z0-9-\'\.]/g.test(organisationName)
            )
            {
                _set(errors, `name.${FIELD_NAMES.organisationName}`, ERROR_MESSAGES.organisationNameSpecialCharacter);
            }

            if(
                !_isEmpty(organisationNumber) &&
                /[^a-zA-Z0-9-\'\.]/g.test(organisationNumber)
            )
            {
                _set(errors, `name.${FIELD_NAMES.organisationNumber}`, ERROR_MESSAGES.organisationNumberSpecialCharacter);
            }

            if(
                !_isEmpty(nameTypeOfEvidenceSeen) &&
                /[^a-zA-Z0-9-\'\.]/g.test(nameTypeOfEvidenceSeen)
            )
            {
                _set(errors, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenSpecialCharacter);
            }
        }

        // Validate otherEvidenceType
        // Check Length
    }
    

    /******************** ADDRESS SECTION ********************/
    const addressValues = _get(values, 'address'); 
    const address1 = _get(addressValues, FIELD_NAMES.address1);
    const address2 = _get(addressValues, FIELD_NAMES.address2);
    const address3 = _get(addressValues, FIELD_NAMES.address3);
    const address4 = _get(addressValues, FIELD_NAMES.address4);
    const postCode = _get(addressValues, FIELD_NAMES.postCode);
    const addressEffectiveDate = _get(addressValues, FIELD_NAMES.addressEffectiveDate);
    let checkedPlanholders = [];

    if(!_isEmpty(addressValues)){
        // Address1
        if(
            _isEmpty(address1) &&
            !_isEmpty(addressEffectiveDate)
        )
        {
            _set(errors, `address.${FIELD_NAMES.address1}`, ERROR_MESSAGES.address1);
        }

        // postCode
        if(
            _isEmpty(postCode) &&
            !_isEmpty(addressEffectiveDate)
        )
        {
            _set(errors, `address.${FIELD_NAMES.postCode}`, ERROR_MESSAGES.postCode);
        }

        // Validate Date format
        if(
            !_isEmpty(addressEffectiveDate) &&
            !dateRegExp.test(addressEffectiveDate)
        ){
            _set(errors, `address.${FIELD_NAMES.addressEffectiveDate}`, ERROR_MESSAGES.effectiveDateFormat);
        }

        // validate the effective date for change of contact details to be no more than 2 months into the future.
        if(!_isEmpty(addressEffectiveDate)){
            const addressChangeDateArray = addressEffectiveDate.split('/');
            if(
                moment([addressChangeDateArray[2], addressChangeDateArray[1] - 1, addressChangeDateArray[0]]).diff(moment(), 'month', true) > MAX_MONTHS_IN_FUTURE
            ){
                _set(errors, `address.${FIELD_NAMES.addressEffectiveDate}`, ERROR_MESSAGES.maxMonthsInFuture);
            }

            // validate effective date in the past
            if(amendType === AMEND_TYPES.organisation){
                if(
                    moment([addressChangeDateArray[2], addressChangeDateArray[1] - 1, addressChangeDateArray[0]]).diff(moment(), 'day', true) < -1
                ){
                    _set(errors, `address.${FIELD_NAMES.addressEffectiveDate}`, ERROR_MESSAGES.maxMonthsInFuture);
                }
            }
        }

        // if Address details has been changed, then ensure the effective date of changed has been entered.
        if(
            (!_isEmpty(address1) ||
            !_isEmpty(address2) ||
            !_isEmpty(address3) ||
            !_isEmpty(address4) ||
            !_isEmpty(postCode)) &&
            _isEmpty(addressEffectiveDate)
        )
        {
            _set(errors, `address.${FIELD_NAMES.addressEffectiveDate}`, ERROR_MESSAGES.addressChangeDate);
        }
    }

    if(amendType === AMEND_TYPES.planholder){
        const multipleAddressChange = _get(addressValues, FIELD_NAMES.multipleAddressChange);
        const checkButtonValues = _get(addressValues, FIELD_NAMES.checkButtonValues);

        if(multipleAddressChange){
            if(
                !checkButtonValues ||
                _compact(checkButtonValues).length < 1
            ){
                _set(errors, `address.${FIELD_NAMES.multipleAddressChange}`, ERROR_MESSAGES.checkButtons);
            }    
            else {
                const planHoldersList = _get(props, 'plan.planDetail.planHolders');
                
                checkedPlanholders = planHoldersList.map((item, index) =>
                    checkButtonValues[index] ? item.name : ''
                );

                checkedPlanholders = _compact(checkedPlanholders);

                // Validate if checkbox selected with no change of address
                if(
                    _isEmpty(address1) &&
                    _isEmpty(address2) &&
                    _isEmpty(address3) &&
                    _isEmpty(address4) &&
                    _isEmpty(postCode)
                )
                {
                    _error = ERROR_MESSAGES.noAddressChange;
                }
            }   
        }
    }


    /******************** ALTERNATIVE ADDRESS SECTION ********************/
    const altAddressValues = _get(values, 'alternativeAddress'); 
    const altAddress1 = _get(altAddressValues, FIELD_NAMES.altAddress1);
    const altAddress2 = _get(altAddressValues, FIELD_NAMES.altAddress2);
    const altAddress3 = _get(altAddressValues, FIELD_NAMES.altAddress3);
    const altAddress4 = _get(altAddressValues, FIELD_NAMES.altAddress4);
    const altPostCode = _get(altAddressValues, FIELD_NAMES.altPostCode);
    const altAddressEffectiveDate = _get(altAddressValues, FIELD_NAMES.altAddressEffectiveDate);
    let altCheckedPlanholders = [];

    if(!_isEmpty(altAddressValues)){
        // altAddress1
        if(
            _isEmpty(altAddress1) &&
            !_isEmpty(altAddressEffectiveDate)
        )
        {
            _set(errors, `alternativeAddress.${FIELD_NAMES.altAddress1}`, ERROR_MESSAGES.altAddress1);
        }

        // postCode
        if(
            _isEmpty(altPostCode) &&
            !_isEmpty(altAddressEffectiveDate)
        )
        {
            _set(errors, `alternativeAddress.${FIELD_NAMES.altPostCode}`, ERROR_MESSAGES.altPostCode);
        }

        // vaidate date format
        if(
            !_isEmpty(altAddressEffectiveDate) &&
            !dateRegExp.test(altAddressEffectiveDate)
        ){
            _set(errors, `alternativeAddress.${FIELD_NAMES.altAddressEffectiveDate}`, ERROR_MESSAGES.effectiveDateFormat);
        }

        // validate the effective date for change of contact details to be no more than 2 months into the future.
        if(!_isEmpty(altAddressEffectiveDate)){
            const altAddressChangeDateArray = altAddressEffectiveDate.split('/');
            if(
                moment([altAddressChangeDateArray[2], altAddressChangeDateArray[1] - 1, altAddressChangeDateArray[0]]).diff(moment(), 'month', true) > MAX_MONTHS_IN_FUTURE
            ){
                _set(errors, `alternativeAddress.${FIELD_NAMES.altAddressEffectiveDate}`, ERROR_MESSAGES.maxMonthsInFuture);
            }
        }

        // if Address details has been changed, then ensure the effective date of changed has been entered.
        if(
            (!_isEmpty(altAddress1) ||
            !_isEmpty(altAddress2) ||
            !_isEmpty(altAddress3) ||
            !_isEmpty(altAddress4) ||
            !_isEmpty(altPostCode)) &&
            _isEmpty(altAddressEffectiveDate)
        )
        {
            _set(errors, `alternativeAddress.${FIELD_NAMES.altAddressEffectiveDate}`, ERROR_MESSAGES.altAddressChangeDate);
        }
    }

    if(amendType === AMEND_TYPES.planholder){
        const altMultipleAddressChange = _get(altAddressValues, FIELD_NAMES.altMultipleAddressChange);
        const altCheckButtonValues = _get(altAddressValues, FIELD_NAMES.altCheckButtonValues);

        if(altMultipleAddressChange){
            if(
                !altCheckButtonValues ||
                _compact(altCheckButtonValues).length < 1
            ){
                _set(errors, `alternativeAddress.${FIELD_NAMES.altMultipleAddressChange}`, ERROR_MESSAGES.altcheckButtons);
            }
            else {
                const planHoldersList = _get(props, 'plan.planDetail.planHolders');
                
                altCheckedPlanholders = planHoldersList.map((item, index) =>
                    altCheckButtonValues[index] ? item.name : ''
                );

                altCheckedPlanholders = _compact(altCheckedPlanholders);

                // Validate if checkbox selected with no change of address
                if(
                    _isEmpty(altAddress1) &&
                    _isEmpty(altAddress2) &&
                    _isEmpty(altAddress3) &&
                    _isEmpty(altAddress4) &&
                    _isEmpty(altPostCode)
                )
                {
                    _error = ERROR_MESSAGES.noAddressChange;
                }
            }    
        }
    }


    /******************** CONTACT DETAILS SECTION ********************/
    const contactDetails = _get(values, 'contactDetails');
    const daytimeTelephoneNumber = _get(contactDetails, FIELD_NAMES.daytimeTelephoneNumber);
    const eveningtimeTelephoneNumber = _get(contactDetails, FIELD_NAMES.eveningtimeTelephoneNumber);
    const mobileTelephoneNumber = _get(contactDetails, FIELD_NAMES.mobileTelephoneNumber);
    const emailAddress = _get(contactDetails, FIELD_NAMES.emailAddress);
    const contactDetailsEffectiveDate = _get(contactDetails, FIELD_NAMES.contactDetailsEffectiveDate);

    if(!_isEmpty(contactDetails)){
        // CHECK EFFECTIVE DATE FOR NOT TRUSTEE
        if(amendType !== AMEND_TYPES.trustee){
            // If EffectiveDate not null, PhoneNumber and Email must be filled in
            if(
                !_isEmpty(contactDetailsEffectiveDate) &&
                _isEmpty(daytimeTelephoneNumber) &&
                _isEmpty(eveningtimeTelephoneNumber) &&
                _isEmpty(mobileTelephoneNumber) &&
                _isEmpty(emailAddress)
            )
            {
                _set(errors, `contactDetails.${FIELD_NAMES.daytimeTelephoneNumber}`, ERROR_MESSAGES.phoneDayInclude);
                _set(errors, `contactDetails.${FIELD_NAMES.eveningtimeTelephoneNumber}`, ERROR_MESSAGES.phoneEveningInclude);
                _set(errors, `contactDetails.${FIELD_NAMES.mobileTelephoneNumber}`, ERROR_MESSAGES.mobileInclude);
                _set(errors, `contactDetails.${FIELD_NAMES.emailAddress}`, ERROR_MESSAGES.emailInclude);
            }

            // if Contact details has been changed, then ensure the effective date of changed has been entered.
            if(
                (!_isEmpty(daytimeTelephoneNumber) ||
                !_isEmpty(eveningtimeTelephoneNumber) ||
                !_isEmpty(mobileTelephoneNumber) ||
                !_isEmpty(emailAddress)) &&
                _isEmpty(contactDetailsEffectiveDate)
            )
            {
                _set(errors, `contactDetails.${FIELD_NAMES.contactDetailsEffectiveDate}`, ERROR_MESSAGES.contactDetailsChangeDate);
            }

            // validate the effective date for change of contact details to be no more than 2 months into the future.
            if(!_isEmpty(contactDetailsEffectiveDate)){
                const contactDetailsEffectiveDateArray = contactDetailsEffectiveDate.split('/');
                if(
                    moment([contactDetailsEffectiveDateArray[2], contactDetailsEffectiveDateArray[1] - 1, contactDetailsEffectiveDateArray[0]]).diff(moment(), 'month', true) > MAX_MONTHS_IN_FUTURE
                ){
                    _set(errors, `contactDetails.${FIELD_NAMES.contactDetailsEffectiveDate}`, ERROR_MESSAGES.maxMonthsInFuture);
                }

                // validate effective date in the past
                if(amendType === AMEND_TYPES.organisation){
                    if(
                        moment([contactDetailsEffectiveDateArray[2], contactDetailsEffectiveDateArray[1] - 1, contactDetailsEffectiveDateArray[0]]).diff(moment(), 'day', true) < -1
                    ){
                        _set(errors, `contactDetails.${FIELD_NAMES.contactDetailsEffectiveDate}`, ERROR_MESSAGES.maxMonthsInFuture);
                    }
                }
            }
        }

        // Validate PhoneNumber format
        if(
            !_isEmpty(daytimeTelephoneNumber) && 
            /[^0-9]/g.test(daytimeTelephoneNumber)
        ){
            _set(errors, `contactDetails.${FIELD_NAMES.daytimeTelephoneNumber}`, ERROR_MESSAGES.phoneNumberDaytime);
        }

        if(
            !_isEmpty(eveningtimeTelephoneNumber) && 
            /[^0-9]/g.test(eveningtimeTelephoneNumber)
        ){
            _set(errors, `contactDetails.${FIELD_NAMES.eveningtimeTelephoneNumber}`, ERROR_MESSAGES.PhoneNumberEvening);
        }

        if(
            !_isEmpty(mobileTelephoneNumber) && 
            /[^0-9]/g.test(mobileTelephoneNumber)
        ){
            _set(errors, `contactDetails.${FIELD_NAMES.mobileTelephoneNumber}`, ERROR_MESSAGES.mobileNumber);
        }

        // VALIDATE MIN LENGTH FOR TRUSTEE ONLY
        if(amendType === AMEND_TYPES.trustee){
            if(
                !_isEmpty(daytimeTelephoneNumber) && 
                daytimeTelephoneNumber.length < 6
            ){
                _set(errors, `contactDetails.${FIELD_NAMES.daytimeTelephoneNumber}`, ERROR_MESSAGES.phoneNumberDaytime);
            }

            if(
                !_isEmpty(eveningtimeTelephoneNumber) && 
                eveningtimeTelephoneNumber.length < 6
            ){
                _set(errors, `contactDetails.${FIELD_NAMES.eveningtimeTelephoneNumber}`, ERROR_MESSAGES.PhoneNumberEvening);
            }

            if(
                !_isEmpty(mobileTelephoneNumber) && 
                mobileTelephoneNumber.length < 6
            ){
                _set(errors, `contactDetails.${FIELD_NAMES.mobileTelephoneNumber}`, ERROR_MESSAGES.mobileNumber);
            }
        }

        // Validate Email format
        if(
            !_isEmpty(emailAddress) && 
            !emailRegExp.test(emailAddress)
        ){
            _set(errors, `contactDetails.${FIELD_NAMES.emailAddress}`, ERROR_MESSAGES.email);
        }

        // Validate Date format
        if(
            !_isEmpty(contactDetailsEffectiveDate) && 
            !dateRegExp.test(contactDetailsEffectiveDate)
        ){
            _set(errors, `contactDetails.${FIELD_NAMES.contactDetailsEffectiveDate}`, ERROR_MESSAGES.contactDetailsChangeDateFormat);
        }
    }


    /******************** DATE OF BIRTH SECTION ********************/
    const dateOfBirth = _get(values, 'dateOfBirth');
    const correctDateOfBirth = _get(dateOfBirth, FIELD_NAMES.correctDateOfBirth);
    const dobTypeOfEvidenceSeen = _get(dateOfBirth, FIELD_NAMES.dobTypeOfEvidenceSeen);
    const dobOtherEvidenceType = _get(dateOfBirth, FIELD_NAMES.dobOtherEvidenceType);
    
    if(!_isEmpty(dateOfBirth)){
        // This method ensures that the new date of birth is not today's date or any date after today.
        if(!_isEmpty(correctDateOfBirth)){
            const correctDateOfBirthArray = correctDateOfBirth.split('/');
            if(
                moment([correctDateOfBirthArray[2], correctDateOfBirthArray[1] - 1, correctDateOfBirthArray[0]]).isAfter()
            )
            {
                _set(errors, `dateOfBirth.${FIELD_NAMES.correctDateOfBirth}`, ERROR_MESSAGES.dobNotToday);
            }
        }

        // validate DOB dates if evidence or other evidence type has been specified.
        if(
            (
                !_isEmpty(dobOtherEvidenceType) &&
                dobTypeOfEvidenceSeen === 'other'
            ) ||
            (
                _isEmpty(dobOtherEvidenceType) &&
                (!_isEmpty(dobTypeOfEvidenceSeen) &&
                dobTypeOfEvidenceSeen !== 'other')
            )
        )
        {
            if( _isEmpty(correctDateOfBirth) ){
                _set(errors, `dateOfBirth.${FIELD_NAMES.correctDateOfBirth}`, ERROR_MESSAGES.dobDate1);
            }
        }

        // If date of birth has been filled out and other evidence is empty, then validate evidence seen to ensure the options Please select <p>
        // or other has not been selected from the evidence seen drop down box 
        if(
            (dobTypeOfEvidenceSeen === 'other' ||
            _isEmpty(dobTypeOfEvidenceSeen)) &&
            _isEmpty(dobOtherEvidenceType) &&
            !_isEmpty(correctDateOfBirth)
        )
        {
            _set(errors, `dateOfBirth.${FIELD_NAMES.dobTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenDOB);
        }

        // if evidence seen for dob is selected to be other, then ensure the other evidence text box is filled out.
        if(
            _isEmpty(dobTypeOfEvidenceSeen) &&
            !_isEmpty(dobOtherEvidenceType)
        )
        {
            _set(errors, `dateOfBirth.${FIELD_NAMES.dobTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenOtherDOB);
        }

        // validate other evidence DOB if other option has been selected or
        // if evidence type is "Other" then Other evidence field should not be empty.
        if(
            dobTypeOfEvidenceSeen === 'other' &&
            _isEmpty(dobOtherEvidenceType)
        )
        {
            _set(errors, `dateOfBirth.${FIELD_NAMES.dobOtherEvidenceType}`, ERROR_MESSAGES.otherEvidenceDOB2);
        }

        // if evidence type has not been selected and DOB dates have been filled out.
        if(
            dobTypeOfEvidenceSeen !== 'other' &&
            !_isEmpty(dobTypeOfEvidenceSeen) &&
            !_isEmpty(dobOtherEvidenceType)
        )
        {
            _set(errors, `dateOfBirth.${FIELD_NAMES.dobOtherEvidenceType}`, ERROR_MESSAGES.otherEvidenceDOB1);
        }

        // Validate Date format
        if(
            !_isEmpty(correctDateOfBirth) && 
            !dateRegExp.test(correctDateOfBirth)
        ){
            _set(errors, `dateOfBirth.${FIELD_NAMES.correctDateOfBirth}`, ERROR_MESSAGES.dobDate);
        }
    }


    /******************** VALIDATE CHECK BUTTON ????? ********************/


    /******************** OTHER DETAILS SECTION ********************/
    const otherDetails = _get(values, 'otherDetails');
    const sex = _get(otherDetails, FIELD_NAMES.sex);
    const employmentStatus = _get(otherDetails, FIELD_NAMES.employmentStatus);
    const occupation = _get(otherDetails, FIELD_NAMES.occupation);
    const niNumber = _get(otherDetails, FIELD_NAMES.niNumber);
    const nationality = _get(otherDetails, FIELD_NAMES.nationality);
    const ukResidency = _get(otherDetails, FIELD_NAMES.ukResidency);
    const ordinarilyResident = _get(otherDetails, FIELD_NAMES.ordinarilyResident);

    const planHolderIndex = _get(props, 'params.planHolderIndex') || 0;
    const planHolderDetails = _get(props, `plan.planDetail.planHolders[${planHolderIndex}]`);
    const oldSex = _get(planHolderDetails, 'sex');
    const oldEmploymentStatus = _get(planHolderDetails, 'employmentStatus');
    const oldOccupation = _get(planHolderDetails, 'occupation');
    const oldNiNumber = _get(planHolderDetails, 'niNumber');
    const oldNationality = _get(planHolderDetails, 'nationality');
    const oldUkResidency = _get(planHolderDetails, 'ukResidency');
    const oldOrdinarilyResident = _get(planHolderDetails, 'ordinarilyResident');


    if(!_isEmpty(otherDetails)){
        // validate to ensure that the same value has not been entered as the original value for Sex
        if(
            !_isEmpty(sex) &&
            !_isEmpty(oldSex) &&
            sex.toLowerCase() === oldSex.toLowerCase()
        )
        {
            _set(errors, `otherDetails.${FIELD_NAMES.sex}`, ERROR_MESSAGES.sameValueSex);
        }

        // validate to ensure that the same value has not been entered as the original value for employmentStatus
        if(
            !_isEmpty(employmentStatus) &&
            !_isEmpty(oldEmploymentStatus) &&
            employmentStatus.toLowerCase()  === oldEmploymentStatus.toLowerCase() 
        )
        {
            _set(errors, `otherDetails.${FIELD_NAMES.employmentStatus}`, ERROR_MESSAGES.sameValueEmploymentStatus);
        }

        // validate to ensure that the same value has not been entered as the original value for occupation
        if(
            !_isEmpty(occupation) &&
            !_isEmpty(oldOccupation) &&
            occupation.toLowerCase() === oldOccupation.toLowerCase()
        )
        {
            _set(errors, `otherDetails.${FIELD_NAMES.occupation}`, ERROR_MESSAGES.sameValueOccupation);
        }

        // validate to ensure that the same value has not been entered as the original value for nationality
        if(
            !_isEmpty(nationality) &&
            !_isEmpty(oldNationality) &&
            nationality.toLowerCase() === oldNationality.toLowerCase()
        )
        {
            _set(errors, `otherDetails.${FIELD_NAMES.nationality}`, ERROR_MESSAGES.sameValueNationality);
        }

        // validate NI Number
        if(
            !_isEmpty(niNumber) &&
            !niNumberRegExp.test(niNumber)
        )
        {
            _set(errors, `otherDetails.${FIELD_NAMES.niNumber}`, ERROR_MESSAGES.niNumber);
        }
    }


    /******************** VALIDATE FORMDATA ********************/    
    // if(
    //     _isEmpty(nameSection) &&
    //     _isEmpty(otherDetailsSection) &&
    //     _isEmpty(addressSection) &&
    //     _isEmpty(contactDetailsSection) &&
    //     _isEmpty(dateOfBirthSection) &&
    //     _isEmpty(alternativeAddressSection)
    // ){
    //     _error = ERROR_MESSAGES.fillForm;
    // }

    if(
        !props.dirty
        // _isEmpty(FIELD_NAMES.dobTypeOfEvidenceSeen) &&
        // _isEmpty(FIELD_NAMES.nameTypeOfEvidenceSeen) &&
        // _isEmpty(FIELD_NAMES.title) &&
        // _isEmpty(FIELD_NAMES.dobOtherEvidenceType) &&
        // _isEmpty(FIELD_NAMES.nameOtherEvidenceType) &&
        // _isEmpty(FIELD_NAMES.otherTitle) &&
        // _isEmpty(FIELD_NAMES.forenames) &&
        // _isEmpty(FIELD_NAMES.surname) &&

        // _isEmpty(FIELD_NAMES.address1) &&
        // _isEmpty(FIELD_NAMES.address2) &&
        // _isEmpty(FIELD_NAMES.address3) &&
        // _isEmpty(FIELD_NAMES.address4) &&
        // _isEmpty(FIELD_NAMES.postCode) &&
        // _isEmpty(FIELD_NAMES.addressEffectiveDate) &&

        // _isEmpty(FIELD_NAMES.daytimeTelephoneNumber) &&
        // _isEmpty(FIELD_NAMES.eveningtimeTelephoneNumber) &&
        // _isEmpty(FIELD_NAMES.mobileTelephoneNumber) &&
        // _isEmpty(FIELD_NAMES.emailAddress) &&
        // _isEmpty(FIELD_NAMES.contactDetailsEffectiveDate) &&

        // _isEmpty(FIELD_NAMES.dobEffectiveDate)
    )
    {
        // _set(errors, `dateOfBirth`, {
        //     [FIELD_NAMES.nameTypeOfEvidenceSeen]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.dobOtherEvidenceType]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.dobEffectiveDate]: ERROR_MESSAGES.required
        // });

        // _set(errors, `name`, {
        //     [FIELD_NAMES.dobTypeOfEvidenceSeen]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.title]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.otherTitle]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.forenames]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.surname]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.nameOtherEvidenceType]: ERROR_MESSAGES.required
        // });

        // _set(errors, `address`, {
        //     [FIELD_NAMES.address1]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.address2]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.address3]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.address4]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.postCode]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.addressEffectiveDate]: ERROR_MESSAGES.required
        // });

        // _set(errors, `contactDetails`, {
        //     [FIELD_NAMES.daytimeTelephoneNumber]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.eveningtimeTelephoneNumber]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.mobileTelephoneNumber]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.emailAddress]: ERROR_MESSAGES.required,
        //     [FIELD_NAMES.contactDetailsEffectiveDate]: ERROR_MESSAGES.required
        // });

        _error = ERROR_MESSAGES.fillForm;
    }


    // SUMMARY
    if (_isEmpty(errors) && _isEmpty(_error)) {
        const data = {
            ...values.name,
            ...values.otherDetails,
            ...values.address,
            [FIELD_NAMES.checkButtonValues]: checkedPlanholders,
            ...values.contactDetails,
            ...values.dateOfBirth,
            ...values.alternativeAddress,
            [FIELD_NAMES.altCheckButtonValues]: altCheckedPlanholders
        };

        const planNumbers = _get(values, 'applyAllChanges.planNumber');

        if(!_isEmpty(planNumbers)){
            return {...data, planNumbers};
        }

        return data;
    }
    else {
        throw new SubmissionError({...errors, _error});
    }
};


/******************** VALIDATE ********************/
export const validate = values => {
    let errors = {};

    return errors;
};

/******************** WARN ********************/
export const warn = values => {
    let warnings = {};
   
    // OTHER TITLE
    if(_get(values, `name.${FIELD_NAMES.title}`) !== 'other'){
        _set(warnings, `name.${FIELD_NAMES.otherTitle}`, ERROR_MESSAGES.otherTitle);
    }

    // EVIDENCE TYPE
    if(
        !_get(values, `name.${FIELD_NAMES.forenames}`) && 
        !_get(values, `name.${FIELD_NAMES.surname}`) &&
        !_get(values, `name.${FIELD_NAMES.organisationName}`) &&
        !_get(values, `name.${FIELD_NAMES.organisationNumber}`) &&
        !_get(values, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`)
    )
    {
        _set(warnings, `name.${FIELD_NAMES.nameTypeOfEvidenceSeen}`, ERROR_MESSAGES.evidenceSeenName);
    }
    
    return warnings;
};


/******************** CHECK SECTION VISIBILITY ********************/
export const checkAmend = (props = null, context = null) => {
    // INITIAL VALUES
    let amendName = true;
    let amendOtherDetails = false;
    let amendAddress = true;
    let amendContactDetails = true;
    let amendDateOfBirth = true;
    let amendAlternativeAddress = false;
    let applyAllChanges = true;

    if (props) {
        const {productGroupType: productGroup, productCode} = props.plan;
        const {amendType} = props.params;
        // const planHolders = _get(props.plan, 'planDetail.planHolders');
        // const isOrganisation = planHolders && planHolders.length > 0 && planHolders[0].organisationName;
        const isOrganisation = amendType === AMEND_TYPES.organisation ? true : false;

        // AMEND NAME
        if (productGroup === ProductGroups.IPB || productGroup === ProductGroups.SIP) {
            amendName = false;
            amendAddress = false;
            amendContactDetails = false;
            amendDateOfBirth = false;
            applyAllChanges = false;
        }
        if (productGroup === ProductGroups.GP || productGroup === ProductGroups.TAI) {
            ['Z00009', 'Z00010', 'Z00011', 'Z00012', 'Z00013'].forEach(item => {
                let reg = new RegExp(item, 'g');
                if (reg.test(productCode)) {
                    amendName = false;
                    amendAddress = false;
                    amendContactDetails = false;
                    amendDateOfBirth = false;
                }
            });
        }
        if (isOrganisation) {
            // amendName = false;
            amendDateOfBirth = false;
        }

        // AMEND OTHER DETAILS
        if (productGroup === ProductGroups.GMF && !isOrganisation && amendType !== AMEND_TYPES.trustee) {
            amendOtherDetails = true;
            amendAlternativeAddress = true;
        }

        // AMEND DATE OF BIRTH
        if (productGroup === ProductGroups.TIP || amendType === AMEND_TYPES.trustee) {
            amendDateOfBirth = false;
        }

        // APPLY ALL CHANGES
        if(amendType === AMEND_TYPES.trustee || productGroup === ProductGroups.TIP){
            applyAllChanges = false;
        }
    }

    return {amendName, amendOtherDetails, amendAddress, amendContactDetails, amendDateOfBirth, amendAlternativeAddress, applyAllChanges};
};


export default {submit, checkAmend};