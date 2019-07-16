export const AMEND_TYPES = {
    organisation: 'organisation',
    planholder: 'planholder',
    trustee: 'trustee'
};

export const FIELD_NAMES = {
    title: 'title',
    otherTitle: 'otherTitle',
    forenames: 'forenames',
    surname: 'surname',
    nameTypeOfEvidenceSeen: 'evidenceSpecifiedNameChange',
    nameOtherEvidenceType: 'otherEvidenceTypeName',   

    sex: 'sex',
    employmentStatus: 'employmentStatus',
    occupation: 'occupation',
    niNumber: 'niNumber',
    nationality: 'nationality',
    ukResidency: 'ukResidency',
    ordinarilyResident: 'ruUKResident',

    searchHouseNameNumber: 'searchHouseNameNumber',
    searchPostCode: 'searchPostCode',
    address1: 'address1',
    address2: 'address2',
    address3: 'address3',
    address4: 'address4',
    postCode: 'postCode',
    selectedAddress: 'selectedAddress',
    addressEffectiveDate: 'primaryAddressChangeEffectiveDate',
    multipleAddressChange: 'multipleAddressChange',
    checkButtonValues: 'checkButtonValues',    

    daytimeTelephoneNumber: 'phoneNumberDaytime',
    eveningtimeTelephoneNumber: 'phoneNumberEvening',
    mobileTelephoneNumber: 'mobileNumber',
    emailAddress: 'emailAddress',
    contactDetailsEffectiveDate: 'contactDetailsEffectiveDate',    

    correctDateOfBirth: 'correctDateofBirth',
    dobTypeOfEvidenceSeen: 'evidenceSpecifiedDOB',
    dobOtherEvidenceType: 'otherEvidenceTypeDOB',

    altSearchHouseNameNumber: 'altsearchHouseNameNumber',
    altSearchPostCode: 'altsearchPostCode',
    altAddress1: 'altAddress1',
    altAddress2: 'altAddress2',
    altAddress3: 'altAddress3',
    altAddress4: 'altAddress4',
    altPostCode: 'altPostCode',
    altSelectedAddress: 'selectedAltAddress',
    altAddressEffectiveDate: 'alternativeAddressChangeEffectiveDate',
    altMultipleAddressChange: 'altmultipleAddressChange',
    altCheckButtonValues: 'altcheckButtonValues',

    planNumbers: 'planNumbers',

    // TRUSTEE
    trusteeTitle: 'title',
    trusteeOtherTitle: 'otherTitle',
    trusteeForenames: 'forenames',
    trusteeSurname: 'familyName',

    trusteeAddress1: 'addressLine1',
    trusteeAddress2: 'addressLine2',
    trusteeAddress3: 'addressLine3',
    trusteeAddress4: 'addressLine4',
    trusteePostCode: 'addressPostCode',
    trusteeAddressEffectiveDate: 'effectiveFrom',

    trusteeDaytimeTelephoneNumber: 'dayTimePhoneNumber',
    trusteeEveningtimeTelephoneNumber: 'eveningTelephone',
    trusteeMobileTelephoneNumber: 'mobilePhone',
    trusteeEmailAddress: 'emailAddress',

    // ORGANISATION
    organisationTitle: 'title',
    organisationOtherTitle: 'otherTitle',
    organisationForenames: 'forenames',
    organisationSurname: 'surname',
    organisationName: 'companyName',
    organisationNumber: 'companyNumber',
    organisationNameTypeOfEvidenceSeen: 'evidenceType',

    organisationAddress1: 'address1',
    organisationAddress2: 'address2',
    organisationAddress3: 'address3',
    organisationAddress4: 'address4',
    organisationPostCode: 'postCode',
    organisationAddressEffectiveDate: 'addressChangeEffectiveDate',

    organisationDaytimeTelephoneNumber: 'daytimeTelNo',
    organisationEveningtimeTelephoneNumber: 'eveningTelNo',
    organisationMobileTelephoneNumber: 'mobileTelNo',
    organisationEmailAddress: 'email',
    organisationContactDetailsEffectiveDate: 'contactDetailsChangeEffectiveDate'
};

export const ERROR_MESSAGES = {
    title: "'Other' was not selected from 'Title'.",
    otherTitle: "You can not enter title and other title.",
    otherTitle1: "Please enter the client's Title.",
    // otherTitleLength: "Other Title can have a have amaximum length of 30 characters.",
    forenames: "Please enter new forename.",
    // forenameLength: "Forename can have a maximum length of 30 characters.",
    // otherEvidenceLength: "Other evidence can have a maximum length of 30 characters.",
    surname: "Please enter new surname.",
    // surnameLength: "Surname can have a maximum length of 30 characters.",
    organisationName: "Please enter organisation name.",
    organisationNameSpecialCharacter: "Organisation Name must not contain special characters other than '-', '''",
    organisationNumber: "Please enter organisation number.",
    organisationNumberSpecialCharacter: "Organisation Number must not contain special characters",
    evidenceSeenName: "Please supply details of the Evidence of change.",
    evidenceSeenOtherName: "'Other' was not selected from 'Type of evidence seen'.",
    otherEvidenceName: "Please fill in other evidence type.",
    evidenceOtherTypeName1: "You can not fill in both evidence and other evidence type.",
    evidenceSeenSpecialCharacter: "Evidence seen must be Alphanumeric Character",

    niNumber: "Please fill in a valid NI Number.",
    sameValueSex: "You have selected the same sex that is currently held by us, please make a new selection",
    sameValueNationality: "You have selected the same nationality that is currently held by us, please make a new selection",
    sameValueEmploymentStatus: "You have selected the same employment status that is currently held by us, please make a new selection",
    sameValueOccupation: "You have selected the same occupation that is currently held by us, please make a new selection",

    searchHouseNameNumber: "House Name/Number and Post Code must be specified for address search.",
    altsearchHouseNameNumber: "House Name/Number and Post Code must be specified for alternative address search.",
    searchPostCode: "House Name/Number and Post Code must be specified for address search.",
    altsearchPostCode: "House Name/Number and Post Code must be specified for alternative address search.",

    address1: "Please fill in your house address.",
    address1Include: "Address line 1 can have a maximum length of 40 characters.",
    address2: "Address line 2 can have a maximum length of 40 characters.",
    address3: "Address line 3 can have a maximum length of 40 characters.",
    address4: "Address line 4 can have a maximum length of 40 characters.",
    postCode: "Please fill in your post code.",
    addressChangeDate: "Please fill in effective date.",
    checkButtons: "No additional clients selected for update.",
    altcheckButtons: "No additional clients selected for update.",
    planNumbers: "PlanNumbers must be numbers",

    postCode1: "enter a valid postcode not more than 7 characters.",
    altAddress1: "Please fill in your house address.",
    altAddress1Include: "Alternative Address line 1 can have a maximum length of 40 characters.",
    altAddress2: "Alternative Address line 2 can have a maximum length of 40 characters.",
    altAddress3: "Alternative Address line 3 can have a maximum length of 40 characters.",
    altAddress4: "Alternative Address line 4 can have a maximum length of 40 characters.",
    altPostCode: "Please fill in your post code.",
    altAddressChangeDate: "Please fill in effective date.",

    required: "required",
    dateFormat: "Invalid date format",
    effectiveDateFormat: "An Invalid effective date has been entered.",
    maxMonthsInFuture: "Effective date must be less than 2 months into the future",
    phoneNumberFormat: "Invalid Telephone Number",

    yearValueEFCD: "An Invalid effective date has been entered.",
    yearValueEFCD1: "Please fill in effective date.",
    yearValueFuture: "Effective date must be less than 2 months into the future",
    yearValueEFA: "An Invalid effective date has been entered.",
    yearEFALength: "An Invalid effective date has been entered.",
    yearEFCDLength: "An Invalid effective date has been entered.",
    altyearValueFuture: "Effective date must be less than 2 months into the future",
    altyearValueEFA: "An Invalid effective date has been entered.",
    altyearLength: "An Invalid effective date has been entered.",
    yearDOBLength: "An invalid date of birth has been entered.",

    phoneNumber: 'Invalid Telephone Number',
    phoneNumberDaytime: "Invalid Daytime Telephone Number entered.",
    phoneDayInclude: "Please fill in day time phone number.",
    PhoneNumberEvening: "Invalid Evening Telephone Number entered.",
    phoneEveningInclude: "Please fill in evening time phone number.",
    email: "Invalid Email Address entered.",
    emailInclude: "Please fill in email address.",
    mobileNumber: "Invalid mobile Telephone Number entered.",
    mobileInclude: "Please fill in mobile number.",
    contactDetailsChangeDate: "Please fill in effective date",
    contactDetailsChangeDateFormat: "An Invalid effective date has been entered.",

    evidenceDOB: "Please supply details of the Evidence of change.",  
    evidenceSeenOtherDOB: "'Other' was not selected from 'Type of evidence seen'.",
    dobDate: "An invalid date of birth has been entered.",
    dobNotToday: "An invalid date of birth has been entered.",
    dobDate1: "Please fill in date of birth.",
    evidenceSeenDOB: "Please supply details of the Evidence of change.",
    otherEvidenceDOB: "Please fill in other evidence of date of birth.",
    otherEvidenceDOB1: "You can not fill in both evidence and other evidence type.",
    otherEvidenceDOB2: "You must fill other evidence type.",
    errorAddressDetailsFound: "The postcode search has been unsuccessful, please correct search details or type address details in address fields.",

    fillForm: "No changes have been made, please amend or 'cancel'.",
    noAddressChange: "Other planholders option invalid - no address change has been made",

    errorNoPostCodeEntered: "Please ensure that you supply the postcode value and try again.",
    errorAddressFound: "Please enter a valid UK postcode.",
    errorMaxAddressFound: "Your search criteria has returned more than 200 entries. Please refine your search.",
    errorPostCodeNotAvailable: "Postcode lookup service not currently available."
};


export const OPTIONS_DATA = {
    title: [
        {value: "", label: ""},
        {value: "mr", label: "Mr"},
        {value: "mrs", label: "Mrs"},
        {value: "miss", label: "Miss"},
        {value: "ms", label: "Ms"},
        {value: "dr", label: "Dr"},
        {value: "rev", label: "Rev"},
        {value: "sir", label: "Sir"},
        {value: "lady", label: "Lady"},
        {value: "lord", label: "Lord"},
        {value: "dame", label: "Dame"},
        {value: "other", label: "Other"}
    ],
    nameTypeOfEvidenceSeen: [
        {value: "", label: "Please select"},
        {value: "originalMarriageCertificate", label: "Original Marriage Certificate"},
        {value: "decreeNisiorAbsolute", label: "Decree Nisi or Absolute"},
        {value: "deedPollCertificate", label: "Deed Poll Certificate"},
        {value: "birthCertificate", label: "Birth Certificate"},
        {value: "civilPartnershipCertificate", label: "Civil Partnership Certificate"},
        {value: "photocardDrivingLicence", label: "Photocard Driving Licence"},
        {value: "passport", label: "Passport"},
        {value: "other", label: "Other"}
    ],

    nationality: [
        {value: "", label: "Please select"},
        {value: "uk", label: "UK"},
        {value: "other", label: "Other"}
    ],
    sex: [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"},
        {value: "", label: "Please select"}
    ],
    employmentStatus: [
        {value: "housePerson", label: "House Person"},
        {value: "inFullTimeEducation", label: "In Full-time Education"},
        {value: "retired", label: "Retired"},
        {value: "aChildUnder16", label: "A Child Under The Age Of 16"},
        {value: "selfEmployed", label: "Self-Employed"},
        {value: "unemployed", label: "Unemployed"},
        {value: "employed", label: "Employed"},
        {value: "other", label: "Other"},
        {value: "caringAged16", label: "Caring For A Person Aged 16 Or Over"},
        {value: "caringUnder16", label: "Caring For A Child Aged Under 16"},
        {value: "", label: "Please select"}
    ],

    dobTypeOfEvidenceSeen: [
        {value: "", label: "Please select"},
        {value: "birthCertificate", label: "Birth Certificate"},
        {value: "photocardDrivingLicence", label: "Photocard Driving Licence"},
        {value: "passport", label: "Passport"},
        {value: "other", label: "Other"}
    ]
};


export default {AMEND_TYPES, FIELD_NAMES, ERROR_MESSAGES};