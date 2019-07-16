import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {SubmissionError, formValueSelector, getFormSubmitErrors} from 'redux-form';
import moment from 'moment';

import * as ServicingActions from '../../actions/ServicingActions';
import * as ServicingApi from '../../api/ServicingApi';

import * as ContentTypes from '../../constants/ContentTypes';
import TransitionUtils from '../../utils/TransitionUtils';
import AuthUtils from '../../utils/AuthUtils';
import {UserRole} from '../../constants/MyProfile';
import {UserGroups} from '../../constants/UserGroups';

import {get as _get, set as _set, isEmpty as _isEmpty, pickBy as _pickBy, identity as _identity, values as _values, map as _map} from 'lodash';

import {FormSection, reduxForm, change} from 'redux-form';
import AmendNameSection from '../../components/servicing/amendPersonalDetails/AmendNameSection';
import AmendOtherDetailsSection from '../../components/servicing/amendPersonalDetails/AmendOtherDetailsSection';
import AmendAddressSection from '../../components/servicing/amendPersonalDetails/AmendAddressSection';
import AmendContactDetailsSection from '../../components/servicing/amendPersonalDetails/AmendContactDetailsSection';
import AmendDateOfBirthSection from '../../components/servicing/amendPersonalDetails/AmendDateOfBirthSection';
import AmendAlternativeAddressSection from '../../components/servicing/amendPersonalDetails/AmendAlternativeAddressSection';
import ApplyAllChangesSection from '../../components/servicing/amendPersonalDetails/ApplyAllChangesSection';
import ButtonGroup from '../../components/servicing/amendPersonalDetails/ButtonGroup';
import {AMEND_TYPES, FIELD_NAMES, ERROR_MESSAGES} from '../../components/servicing/amendPersonalDetails/constants';
import {submit, warn, checkAmend} from '../../components/servicing/amendPersonalDetails/actions';
import FormErrorArea from '../../components/common/FormErrorArea';


class ServicingAmendPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            addressesFound: [],
            altAddressesFound: []
        };
        
        this.searchAddress = this.searchAddress.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.searchAlternativeAddress = this.searchAlternativeAddress.bind(this);
        this.addAlternativeAddress = this.addAlternativeAddress.bind(this);
        this.confirmSubmitForm = this.confirmSubmitForm.bind(this);
        this.submitPristine = this.submitPristine.bind(this);
        this.changeFieldValue = this.changeFieldValue.bind(this);
	}

	static propTypes = {
		content: PropTypes.object,
		plan: PropTypes.object,
		api: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        multipleAddressChange: PropTypes.bool,
        altMultipleAddressChange: PropTypes.bool,
        formErrors: PropTypes.object
	};

	static childContextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        amendType: PropTypes.string.isRequired,
        planHolderIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        searchAddress: PropTypes.func.isRequired,
        addAddress: PropTypes.func.isRequired,
        searchAlternativeAddress: PropTypes.func.isRequired,
        addAlternativeAddress: PropTypes.func.isRequired,
        addressesFound: PropTypes.array,
        altAddressesFound: PropTypes.array,
        router: PropTypes.object,
        changeFieldValue: PropTypes.func,
        multipleAddressChange: PropTypes.bool,
        altMultipleAddressChange: PropTypes.bool,
        formErrors: PropTypes.object
    }

    getChildContext(){
        return {
			content: this.props.content && this.props.content[ContentTypes.SERVICING_AMEND],
            plan: this.props.plan,
            amendType: this.props.params.amendType,
            planHolderIndex: this.props.params.planHolderIndex,
            searchAddress: this.searchAddress,
            addAddress: this.addAddress,
            searchAlternativeAddress: this.searchAlternativeAddress,
            addAlternativeAddress: this.addAlternativeAddress,
            addressesFound: this.state.addressesFound,
            altAddressesFound: this.state.altAddressesFound,
            router: this.props.router,
            changeFieldValue: this.changeFieldValue,
            multipleAddressChange: this.props.multipleAddressChange,
            altMultipleAddressChange: this.props.altMultipleAddressChange,
            formErrors: this.props.formErrors
		};
    }

    componentWillMount(){
        const {amendType} = this.props.params;
        
        if(!_values(AMEND_TYPES).includes(amendType)){
            this.props.router.push('/');
        }
    }

    changeFieldValue(field, value){
        this.props.dispatch && this.props.dispatch(change('servicingAmend', field, value));
    }
    
    searchAddress(values){   
        this.handleSearchAddress({values});
    }

    searchAlternativeAddress(values){
        this.handleSearchAddress({values, alternative: true});
    }

    handleSearchAddress({values, alternative}){
        let errors = {};

        const houseNamNumber = alternative ? _get(values, FIELD_NAMES.altSearchHouseNameNumber) : _get(values, FIELD_NAMES.searchHouseNameNumber);
        const postCode = alternative ? _get(values, FIELD_NAMES.altSearchPostCode) : _get(values, FIELD_NAMES.searchPostCode);
        
        if(!_isEmpty(postCode)){
            this.props.api.addressLookup({houseNamNumber: houseNamNumber ? houseNamNumber : '', postCode})
            .then(
                data => {
                    if(data){
                        if(data.length > 1){
                            const addressesFound = _map(data, item => ({value: item.id, label: `${item.text}`}));
                            if(alternative){
                                this.setState({altAddressesFound: addressesFound});
                            }
                            else {
                                this.setState({addressesFound});
                            }
                        }
                        else if(data[0]){
                            this.addNewAddress({id: data[0].id, alternative});
                        }
                    }
                },
                error => {
                    _set(errors, alternative ? FIELD_NAMES.altSearchPostCode : FIELD_NAMES.searchPostCode, ERROR_MESSAGES.errorPostCodeNotAvailable);
                    throw new SubmissionError(errors);
                }
            );
        }
        else {
            _set(errors, alternative ? FIELD_NAMES.altSearchPostCode : FIELD_NAMES.searchPostCode, ERROR_MESSAGES.postCode);
            throw new SubmissionError(errors);
        }
    }

    updateNewAddress({address, alternative}){
        if(address){
            if(alternative){
                this.props.dispatch(change('servicingAmend', 'alternativeAddress.altAddress1', address.address1));
                this.props.dispatch(change('servicingAmend', 'alternativeAddress.altAddress2', address.address2));
                this.props.dispatch(change('servicingAmend', 'alternativeAddress.altAddress3', address.address3));
                this.props.dispatch(change('servicingAmend', 'alternativeAddress.altAddress4', address.address4));
                this.props.dispatch(change('servicingAmend', 'alternativeAddress.altPostCode', address.postCode));
            }
            else {
                this.props.dispatch(change('servicingAmend', 'address.address1', address.address1));
                this.props.dispatch(change('servicingAmend', 'address.address2', address.address2));
                this.props.dispatch(change('servicingAmend', 'address.address3', address.address3));
                this.props.dispatch(change('servicingAmend', 'address.address4', address.address4));
                this.props.dispatch(change('servicingAmend', 'address.postCode', address.postCode));
            }
        }
    }

    addAddress(values){
        const id = values.selectedAddress[0];
        this.addNewAddress({id});
    }

    addAlternativeAddress(values){
        const id = values.selectedAltAddress[0];
        this.addNewAddress({id, alternative: true});
    }

    addNewAddress({id, alternative}){
        this.props.api.searchAddress({id})
        .then(data => {
            this.updateNewAddress({address: data[0], alternative});
        });
    }

    confirmSubmitForm(data){
        const planID = _get(this.props, 'plan.planDetail.planNumber') || '';
        const productGroup = _get(this.props, 'plan.productGroupType') || '';
        const productType = _get(this.props, 'plan.productType') || '';
        const planHoldername = _get(this.props, 'plan.planDetail.firstPlanHolderName') || '';
        const fullPlanName = _get(this.props, 'plan.planDetail.productFullName') || '';
        let {amendType} = this.props.params;
        
        let json = {
            planInfoType: {
                planID, 
                productGroup, 
                productType, 
                planHolderName: planHoldername, 
                fullPlanName
            },
            amendPersonal: {},
            amendOrganization: {},
            amendTrustee: {},
            oldPersonalDetails: {},
            oldOrganisationDetails: {},
            oldTrusteeDetails: {},
            userInfoType: {}
        };
        

        /******************** MAPPING FORM VALUES TO REQUEST DATA ********************/
        let action;
        let section;

        if(amendType === AMEND_TYPES.planholder){
            action = this.props.api.amendPersonalDetails;
            section = 'amendPersonal';

            let planHolderName = [
                data[FIELD_NAMES.otherTitle],
                data[FIELD_NAMES.forenames],
                data[FIELD_NAMES.surname]
            ];
            planHolderName = planHolderName.map(item => item ? item : '').join(' ');

            data = {
                [FIELD_NAMES.title]: data[FIELD_NAMES.title] || '',
                [FIELD_NAMES.otherTitle]: data[FIELD_NAMES.otherTitle] || '',
                [FIELD_NAMES.forenames]: data[FIELD_NAMES.forenames] || '',
                [FIELD_NAMES.surname]: data[FIELD_NAMES.surname] || '',
                [FIELD_NAMES.nameTypeOfEvidenceSeen]: data[FIELD_NAMES.nameTypeOfEvidenceSeen] || '',
                evidenceType: data[FIELD_NAMES.nameTypeOfEvidenceSeen] || '',
                [FIELD_NAMES.nameOtherEvidenceType]: data[FIELD_NAMES.nameOtherEvidenceType] || '',
                otherEvidenceType: data[FIELD_NAMES.nameOtherEvidenceType] || '',

                [FIELD_NAMES.sex]: data[FIELD_NAMES.sex] || '',
                sexType: data[FIELD_NAMES.sex] || '',
                [FIELD_NAMES.employmentStatus]: data[FIELD_NAMES.employmentStatus] || '',
                employmentType: data[FIELD_NAMES.employmentStatus] || '',
                [FIELD_NAMES.occupation]: data[FIELD_NAMES.occupation] || '',
                [FIELD_NAMES.niNumber]: data[FIELD_NAMES.niNumber] || '',
                nationalInsuranceNumberType: data[FIELD_NAMES.niNumber] || '',
                [FIELD_NAMES.nationality]: data[FIELD_NAMES.nationality] || '',
                nationalityType: data[FIELD_NAMES.nationality] || '',
                [FIELD_NAMES.ukResidency]: data[FIELD_NAMES.ukResidency],
                [FIELD_NAMES.ordinarilyResident]: data[FIELD_NAMES.ordinarilyResident],
                residentInUK: data[FIELD_NAMES.ordinarilyResident],

                maritalStatus: '',
                planHolderName: planHolderName || '',
                

                searchHouseNameNumber: '',
                searchPostCode: '',
                selectedAddress: [],
                [FIELD_NAMES.address1]:  data[FIELD_NAMES.address1] || '',
                [FIELD_NAMES.address2]:  data[FIELD_NAMES.address2] || '',
                [FIELD_NAMES.address3]:  data[FIELD_NAMES.address3] || '',
                [FIELD_NAMES.address4]:  data[FIELD_NAMES.address4] || '',
                [FIELD_NAMES.postCode]:  data[FIELD_NAMES.postCode] || '',
                [FIELD_NAMES.addressEffectiveDate]:  data[FIELD_NAMES.addressEffectiveDate] || '',
                [FIELD_NAMES.multipleAddressChange]: data[FIELD_NAMES.multipleAddressChange] ? '1' : '0',
                [FIELD_NAMES.checkButtonValues]: data[FIELD_NAMES.checkButtonValues] || [],

                [FIELD_NAMES.daytimeTelephoneNumber]: data[FIELD_NAMES.daytimeTelephoneNumber] || '',
                [FIELD_NAMES.eveningtimeTelephoneNumber]: data[FIELD_NAMES.eveningtimeTelephoneNumber] || '',
                [FIELD_NAMES.mobileTelephoneNumber]: data[FIELD_NAMES.mobileTelephoneNumber] || '',
                daytimeTelNo: data[FIELD_NAMES.daytimeTelephoneNumber] || '',
                eveningTelNo: data[FIELD_NAMES.eveningtimeTelephoneNumber] || '',
                mobileTelNo: data[FIELD_NAMES.mobileTelephoneNumber] || '',
                [FIELD_NAMES.emailAddress]: data[FIELD_NAMES.emailAddress] || '',
                [FIELD_NAMES.contactDetailsEffectiveDate]: data[FIELD_NAMES.contactDetailsEffectiveDate] || '',

                [FIELD_NAMES.correctDateOfBirth]: data[FIELD_NAMES.correctDateOfBirth] || '',
                dateOfBirth: data[FIELD_NAMES.correctDateOfBirth] || '',
                [FIELD_NAMES.dobTypeOfEvidenceSeen]: data[FIELD_NAMES.dobTypeOfEvidenceSeen] || '',
                [FIELD_NAMES.dobOtherEvidenceType]: data[FIELD_NAMES.dobOtherEvidenceType] || '',

                altsearchHouseNameNumber: '',
                altsearchPostCode: '',
                selectedAltAddress: [],
                [FIELD_NAMES.altAddress1]: data[FIELD_NAMES.altAddress1] || '',
                [FIELD_NAMES.altAddress2]: data[FIELD_NAMES.altAddress2] || '',
                [FIELD_NAMES.altAddress3]: data[FIELD_NAMES.altAddress3] || '',
                [FIELD_NAMES.altAddress4]: data[FIELD_NAMES.altAddress4] || '',
                [FIELD_NAMES.altPostCode]: data[FIELD_NAMES.altPostCode] || '',
                [FIELD_NAMES.altAddressEffectiveDate]: data[FIELD_NAMES.altAddressEffectiveDate] || '',
                [FIELD_NAMES.altMultipleAddressChange]: data[FIELD_NAMES.altMultipleAddressChange] ? '1' : '0',
                [FIELD_NAMES.altCheckButtonValues]: data[FIELD_NAMES.altCheckButtonValues] || [],

                planNumbers: data[FIELD_NAMES.planNumbers] || []
            };
        }
        if(amendType === AMEND_TYPES.organisation){
            action = this.props.api.amendOrganisationDetails;
            section = 'amendOrganization';

            data = {
                [FIELD_NAMES.organisationTitle]: data[FIELD_NAMES.title] || '',
                [FIELD_NAMES.organisationOtherTitle]: data[FIELD_NAMES.otherTitle] || '',
                [FIELD_NAMES.organisationForenames]: data[FIELD_NAMES.forenames] || '',
                [FIELD_NAMES.organisationSurname]: data[FIELD_NAMES.surname] || '',
                [FIELD_NAMES.organisationName]: data[FIELD_NAMES.organisationName] || '',
                [FIELD_NAMES.organisationNumber]: data[FIELD_NAMES.organisationNumber] || '',
                [FIELD_NAMES.organisationNameTypeOfEvidenceSeen]: data[FIELD_NAMES.nameTypeOfEvidenceSeen] || '',

                searchHouseName: '',
                [FIELD_NAMES.organisationAddress1]: data[FIELD_NAMES.address1] || '',
                [FIELD_NAMES.organisationAddress2]: data[FIELD_NAMES.address2] || '',
                [FIELD_NAMES.organisationAddress3]: data[FIELD_NAMES.address3] || '',
                [FIELD_NAMES.organisationAddress4]: data[FIELD_NAMES.address4] || '',
                [FIELD_NAMES.organisationPostCode]: data[FIELD_NAMES.postCode] || '',
                [FIELD_NAMES.organisationAddressEffectiveDate]: data[FIELD_NAMES.addressEffectiveDate] || '',

                [FIELD_NAMES.organisationDaytimeTelephoneNumber]: data[FIELD_NAMES.daytimeTelephoneNumber] || '',
                [FIELD_NAMES.organisationEveningtimeTelephoneNumber]: data[FIELD_NAMES.eveningtimeTelephoneNumber] || '',
                [FIELD_NAMES.organisationMobileTelephoneNumber]: data[FIELD_NAMES.mobileTelephoneNumber] || '',
                [FIELD_NAMES.organisationEmailAddress]: data[FIELD_NAMES.emailAddress] || '',
                [FIELD_NAMES.organisationContactDetailsEffectiveDate]: data[FIELD_NAMES.contactDetailsEffectiveDate] || '',

                planNumbers: data.planNumbers || [],
                otherEvidenceType: '',
                houseNumber: '',
                businessActivities: ''
            };
        }
        if(amendType === AMEND_TYPES.trustee){
            action = this.props.api.amendTrusteeDetails;
            section = 'amendTrustee';

            data = {                
                [FIELD_NAMES.trusteeTitle]: data[FIELD_NAMES.title] || '',
                [FIELD_NAMES.trusteeOtherTitle]: data[FIELD_NAMES.otherTitle] || '',
                [FIELD_NAMES.trusteeForenames]: data[FIELD_NAMES.forenames] || '',
                [FIELD_NAMES.trusteeSurname]: data[FIELD_NAMES.surname] || '',

                houseNumber: '',
                postCode: '',
                selectedAddress: [],
                [FIELD_NAMES.trusteeAddress1]: data[FIELD_NAMES.address1] || '',
                [FIELD_NAMES.trusteeAddress2]: data[FIELD_NAMES.address2] || '',
                [FIELD_NAMES.trusteeAddress3]: data[FIELD_NAMES.address3] || '',
                [FIELD_NAMES.trusteeAddress4]: data[FIELD_NAMES.address4] || '',
                [FIELD_NAMES.trusteePostCode]: data[FIELD_NAMES.postCode] || '',
                [FIELD_NAMES.trusteeAddressEffectiveDate]: data[FIELD_NAMES.addressEffectiveDate] || '',

                [FIELD_NAMES.trusteeDaytimeTelephoneNumber]: data[FIELD_NAMES.daytimeTelephoneNumber] || '',
                [FIELD_NAMES.trusteeEveningtimeTelephoneNumber]: data[FIELD_NAMES.eveningtimeTelephoneNumber] || '',
                [FIELD_NAMES.trusteeMobileTelephoneNumber]: data[FIELD_NAMES.mobileTelephoneNumber] || '',
                [FIELD_NAMES.trusteeEmailAddress]: data[FIELD_NAMES.emailAddress] || '',

                firstNames: data[FIELD_NAMES.forenames] || ''
            };
        }

        /******************** OLD DATA ********************/
        const planHolderIndex = _get(this.props, 'params.planHolderIndex') || 0;
        const planHolderDetails = _get(this.props, `plan.planDetail.planHolders[${planHolderIndex}]`);
        const organisationName = _get(planHolderDetails, 'name');
        const organisationNumber = _get(planHolderDetails, 'organisationNumber');
        let oldSection;
        let oldData;

        // OLD PERSONAL
        if(amendType === AMEND_TYPES.planholder){
            oldSection = 'oldPersonalDetails';
            oldData = {
                maritalStatus: '',
                
                address1: _get(planHolderDetails, 'address.addressLine1') || '',
                address2: _get(planHolderDetails, 'address.addressLine2') || '',
                address3: _get(planHolderDetails, 'address.addressLine3') || '',
                address4: _get(planHolderDetails, 'address.addressLine4') || '',
                postCode: _get(planHolderDetails, 'address.postCode') || '',
                planHolderName: planHoldername || '',
                nationalInsuranceNumberType: _get(planHolderDetails, 'niNumber') || '',
                dateOfBirth: moment.utc(_get(planHolderDetails, 'dateofBirth')).format('DD/MM/YYYY') || '',
                altAddress1: _get(planHolderDetails, 'address.addressLine1') || '',
                altAddress2: _get(planHolderDetails, 'address.addressLine2') || '',
                altAddress3: _get(planHolderDetails, 'address.addressLine3') || '',
                altAddress4: _get(planHolderDetails, 'address.addressLine4') || '',
                altPostCode: _get(planHolderDetails, 'address.postCode') || '',
                emailAddress: '',
                daytimeTelNo: '',
                eveningTelNo: '',
                mobileTelNo: '',
                occupation: _get(planHolderDetails, 'occupation') || '',
                employmentType: _get(planHolderDetails, 'employmentStatus') || '',
                sexType: _get(planHolderDetails, 'sex') || '',
                nationalityType: _get(planHolderDetails, 'nationality') || '',
                residentInUK: null,
                ukResidency: null,
            };
        }

        // OLD ORGANISATION
        if(amendType === AMEND_TYPES.organisation){
            oldSection = 'oldOrganisationDetails';
            oldData = {
                addressChangeEffectiveDate: '',
                contactDetailsChangeEffectiveDate: '',
                evidenceType: '',
                otherEvidenceType: '',
                companyName: organisationName || '',
                companyNumber: organisationNumber || '',
                address1: _get(planHolderDetails, 'address.addressLine1') || '',
                address2: _get(planHolderDetails, 'address.addressLine2') || '',
                address3: _get(planHolderDetails, 'address.addressLine3') || '',
                address4: _get(planHolderDetails, 'address.addressLine4') || '',
                postCode: _get(planHolderDetails, 'address.postCode') || '',
                houseNumber: '',
                daytimeTelNo: '',
                eveningTelNo: '',
                mobileTelNo: '',
                email: '',
                title: '',
                forenames: '',
                surname: '',
                businessActivities: ''
            };
        }

        // OLD TRUSTEE
        if(amendType === AMEND_TYPES.trustee){
            oldSection = 'oldTrusteeDetails';
            oldData = {
                addressLine1: _get(planHolderDetails, 'address.addressLine1') || '',
                addressLine2: _get(planHolderDetails, 'address.addressLine2') || '',
                addressLine3: _get(planHolderDetails, 'address.addressLine3') || '',
                addressLine4: _get(planHolderDetails, 'address.addressLine4') || '',
                houseNumber: '',
                addressPostCode: _get(planHolderDetails, 'address.postCode') || '',
                familyName: '',
                title: '',
                firstNames: '',
                dayTimePhoneNumber: '',
                eveningTelephone: '',
                mobilePhone: '',
                emailAddress: '',
                effectiveFrom: '',
                planHolderName: _get(planHolderDetails, 'name') || ''
            };
        }

        /******************** RENAME AMEND TYPE ********************/
        if(amendType === AMEND_TYPES.planholder){
            amendType = 'PERSONAL';
        }
        if(amendType === AMEND_TYPES.organisation){
            amendType = 'ORGANIZATION';
        }
        if(amendType === AMEND_TYPES.trustee){
            amendType = 'TRUSTEE';
        }

        /******************** USER INFO TYPE ********************/
        let userinfo = AuthUtils.getUserInfo();
        let userInfoType = {
            agentCode: _get(userinfo, 'agentCode') || '',
            userID: _get(userinfo, 'username') || '',
            advisorName: [_get(userinfo, 'forename'), _get(userinfo, 'surname')].join(' ') || '',
            fsaNumber: _get(userinfo, 'fsaNumber') || '',
            postCode: _get(userinfo, 'firmPostcode') || '',
            agentFirm: _get(userinfo, 'firmName') || '',
            contactNumber: _get(userinfo, 'contactNumber') || '',
            emailAddress: _get(userinfo, 'email') || '',
            staffUser: _get(userinfo, 'role') === UserRole.STAFF || _get(userinfo, 'userGroups').includes(UserGroups.STAFF), 
            certUser: _get(userinfo, 'unipass')
        };
        
        /******************** REQUEST DATA ********************/
        json = {
            ...json,
            [section]: data,
            [oldSection]: oldData,
            amendType,
            userInfoType
        };
        
        // CALL API
        return action(json)
        .then(
            res => {
                if(res.status == 500 || (res.warning && res.warning.length > 0)){
                    let _error;
                    if(res.warning){
                        _error = [];
                        for(let item of res.warning){
                            _error.push(item.message);
                        }
                    }
                    else {
                        _error = 'Internal error';
                    }
                
                    throw new SubmissionError({_error});
                }
                else {
                    this.props.reset && this.props.reset();
                    TransitionUtils.navigateTo(`/plan-details/${_get(this.props, 'params.id')}#servicing-history`);
                }
            },
            err => {
                throw new SubmissionError({_error: 'Internal error'});
            }
        );
    }

    submitPristine(submitModal){
        // submitModal.setState({showSubmitNotification: true});
        throw new SubmissionError({_error: ERROR_MESSAGES.fillForm});
    }

    render(){
        const content = _get(this.props, `content.${ContentTypes.SERVICING_AMEND}`);
        const {handleSubmit, error, params: {amendType, id}} = this.props;
        const check = checkAmend(this.props, this.context);
        
        let modalCancelTitle;
        let modalSubmitTitle;
        if(amendType === AMEND_TYPES.planholder){
            modalCancelTitle = modalSubmitTitle = _get(content, 'personalDetails');
        }
        if(amendType === AMEND_TYPES.organisation){
            modalCancelTitle = modalSubmitTitle = 'Update organisation details';
        }
        if(amendType === AMEND_TYPES.trustee){
            modalCancelTitle = modalSubmitTitle = _get(content, 'trusteeDetails');
        }

        return(        
            <form>
                <FormErrorArea title='ERROR' error={error} />
                {
                    !_isEmpty(_pickBy(check, _identity)) &&
                    <div className='pes-servicing-amend-page pes-bg-grey'>
                        <div className={`pes-page-title${amendType !== AMEND_TYPES.organisation ? ' no-line' : ''}`}>
                            {
                                amendType === AMEND_TYPES.planholder && 
                                _get(content, 'updatePersonalDetails')
                            }
                            {
                                amendType === AMEND_TYPES.organisation && 
                                _get(content, 'updateOrganisationDetails')
                            }
                            {
                                amendType === AMEND_TYPES.trustee && 
                                _get(content, 'updateTrusteeDetails')
                            }
                        </div>
                        {
                            check.amendName &&
                            <FormSection name='name'>
                                <AmendNameSection />
                            </FormSection>
                        }
                        {
                            check.amendOtherDetails &&
                            <FormSection name='otherDetails'>
                                <AmendOtherDetailsSection />
                            </FormSection>
                        }
                        {
                            check.amendAddress &&
                            <FormSection name='address'>
                                <AmendAddressSection 
                                    searchPlanholderAddress={this.searchPlanholderAddress} 
                                    addAddressOptions={this.state.addAddressOptions}
                                />
                            </FormSection>
                        }
                        {
                            check.amendContactDetails &&
                            <FormSection name='contactDetails'>
                                <AmendContactDetailsSection />
                            </FormSection>
                        }
                        {
                            check.amendDateOfBirth &&
                            <FormSection name='dateOfBirth'>
                                <AmendDateOfBirthSection />
                            </FormSection>
                        }
                        {
                            check.amendAlternativeAddress &&
                            <FormSection name='alternativeAddress'>
                                <AmendAlternativeAddressSection />
                            </FormSection>
                        }
                        {
                            check.applyAllChanges &&
                            <FormSection name='applyAllChanges'>
                                <ApplyAllChangesSection />
                            </FormSection>
                        }

                        <ButtonGroup 
                            className='pes-btn-bottom-area'
                            onSubmitPristine={this.submitPristine}
                            onConfirmSubmit={this.confirmSubmitForm}
                            reduxFormHandleSubmit={handleSubmit}
                            submitForm={submit}
                            modalCancelTitle={modalCancelTitle}
                            modalSubmitTitle={modalSubmitTitle}
                            planId={id}
                            servicingType={amendType === AMEND_TYPES.organisation ? 'amendOrganisation' : 'amend'}
                        />
                    </div> 
                }
            </form>
        );
    }
}

const selector = formValueSelector('servicingAmend');

function mapStateToProps(state, ownProps) {
	return {
		content: state.content,
        plan: state.plan,
        amendSearchResults: state.servicing.amendSearchResults,
        multipleAddressChange: selector(state, `address.${FIELD_NAMES.multipleAddressChange}`),
        altMultipleAddressChange: selector(state, `alternativeAddress.${FIELD_NAMES.altMultipleAddressChange}`),
        formErrors: getFormSubmitErrors('servicingAmend')(state)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators(ServicingApi, dispatch),
		actions: bindActionCreators(ServicingActions, dispatch)
	};
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: 'servicingAmend',
        warn
    })
)(ServicingAmendPage);