import React, { PropTypes } from 'react';
import * as ContentTypes from '../../../constants/ContentTypes';
import ProductGroups from '../../../constants/ProductGroups';
import { get as _get } from 'lodash';
import { AMEND_TYPES, FIELD_NAMES, OPTIONS_DATA } from '../amendPersonalDetails/constants';
import StringUtils from '../../../utils/StringUtils';


class AmendHistory extends React.Component {
    constructor() {
        super();
    }

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        historyDetails: PropTypes.object
    };

    _renderPlanholderAmendNameSection(historyDetails, content) {
        if(historyDetails){
            const {details, planHolderDetails} = historyDetails;

            return (
                <div>
                    <div className='pes-section-title text-capitalize no-line'>
                        {_get(content, 'amendName')}
                    </div>

                    <div className='pes-table-list'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'name')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'title')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.title}`) === 'other' ? _get(details, `${FIELD_NAMES.otherTitle}`) : this._getLabelFromValue(OPTIONS_DATA.title, _get(details, `${FIELD_NAMES.title}`))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'forenames')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.forenames}`)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'surname')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.surname}`)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'typeOfEvidenceSeen')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {this._getLabelFromValue(OPTIONS_DATA.nameTypeOfEvidenceSeen, _get(details, `${FIELD_NAMES.nameTypeOfEvidenceSeen}`))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'otherEvidenceType')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.nameOtherEvidenceType}`)}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        return null;
    }

    _renderOrganisationAmendNameSection(historyDetails, content) {
        if(historyDetails){
            const {details, oldData, planHolderDetails} = historyDetails;
            return (
                <div className='pes-table-area ovf-v'>
                    <div className='pes-table-list amend-list ovf-v'>
                        <div className='tlbody'>
                            <div className='tlrow'>
                                <div className='tlcell col-xs-12 text-capitalize'>
                                    <span className='mr-20'>
                                        {_get(content, 'planNumber')}
                                    </span>
                                    <span>
                                        {_get(oldData, 'planDetail.planNumber')}
                                    </span>
                                </div>
                            </div>
    
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6 text-capitalize text-bold'>
                                    {_get(content, 'amendName')}
                                </div>
                                <div className='tlcell col-xs-6 text-capitalize text-bold'>
                                    <div className='row'>
                                        <div className='col-xs-6 col-xs-offset-6'>
                                            {_get(content, 'updates')}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'>
                                    {_get(planHolderDetails, 'name')}
                                </div>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'title')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(details, `${FIELD_NAMES.title}`) === 'other' ? _get(details, `${FIELD_NAMES.otherTitle}`) : this._getLabelFromValue(OPTIONS_DATA.title, _get(details, `${FIELD_NAMES.title}`))}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'></div>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'forenames')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(details, `${FIELD_NAMES.forenames}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'></div>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'surname')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(details, `${FIELD_NAMES.surname}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='tlrow empty'></div>
                            
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'organisationName')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(planHolderDetails, 'name')}
                                        </div>
                                    </div>
                                </div> 
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'organisationName')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(details, `${FIELD_NAMES.organisationName}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'organisationNumber')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(planHolderDetails, 'niNumber')}
                                        </div>
                                    </div>
                                </div> 
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'organisationNumber')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(details, `${FIELD_NAMES.organisationNumber}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'></div> 
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'typeOfEvidenceSeen')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {_get(details, `${FIELD_NAMES.organisationNameTypeOfEvidenceSeen}`)}
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

    _renderTrusteeAmendNameSection(historyDetails, content) {
        if(historyDetails){
            const {details, planHolderDetails} = historyDetails;
            
            return (
                <div>
                    <div className='pes-section-title text-capitalize mt-0'>
                        {_get(content, 'amendName')}
                    </div>

                    <div className='pes-table-list'>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'name')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'title')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.title}`) === 'other' ? _get(details, `${FIELD_NAMES.otherTitle}`) : this._getLabelFromValue(OPTIONS_DATA.title, _get(details, `${FIELD_NAMES.title}`))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'forenames')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.forenames}`)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'surname')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.trusteeSurname}`)}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        return null;
    }

    _renderAmendNameSection(historyDetails, content){
        if(historyDetails){
            const {amendType} = historyDetails;

            if(amendType === AMEND_TYPES.planholder){
                return this._renderPlanholderAmendNameSection(historyDetails, content);
            }
            if(amendType === AMEND_TYPES.organisation){
                return this._renderOrganisationAmendNameSection(historyDetails, content);
            }
            if(amendType === AMEND_TYPES.trustee){
                return this._renderTrusteeAmendNameSection(historyDetails, content);
            }
        }
        
        return null;
    }

    _renderAmendOtherDetailsSection(historyDetails, content) {
        if(historyDetails){
            const {details, planHolderDetails} = historyDetails;
            let isUkResidency = _get(details, `${FIELD_NAMES.ukResidency}`);
            isUkResidency = (isUkResidency === 'true') || (isUkResidency === true);
            let isOrdinarilyResident = _get(details, `${FIELD_NAMES.ordinarilyResident}`);
            isOrdinarilyResident = (isOrdinarilyResident === 'true') || (isOrdinarilyResident === true);

            return (
                <div>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'amendOtherDetails')}
                    </div>
    
                    <div className='pes-table-list'>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'sex')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(planHolderDetails, 'sex')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'newSex')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {this._getLabelFromValue(OPTIONS_DATA.sex, _get(details, `${FIELD_NAMES.sex}`))}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'employmentStatus')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(planHolderDetails, 'employmentStatus')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'newEmploymentStatus')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {this._getLabelFromValue(OPTIONS_DATA.employmentStatus, _get(details, `${FIELD_NAMES.employmentStatus}`))}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'occupation')}
                                    </div>
                                    <div className='col-xs-6 word-break-all'>
                                        {_get(planHolderDetails, 'occupation')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'newOccupation')}
                                    </div>
                                    <div className='col-xs-6 word-break-all'>
                                        {_get(details, `${FIELD_NAMES.occupation}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'nationalInsuranceNumber')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(planHolderDetails, 'niNumber')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'newNationalInsuranceNumber')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.niNumber}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'nationality')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(planHolderDetails, 'nationality')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'newNationality')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {this._getLabelFromValue(OPTIONS_DATA.nationality, _get(details, `${FIELD_NAMES.nationality}`))}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'ukResidency')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(planHolderDetails, 'ukResidency')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6'>
                                        <div className='pes-radio-group group-inline py-0'>
                                            <div className='pes-input-radio'>
                                                <input type='radio' name='ukResidency' id='ukResidency-true' value='true' disabled='disabled' checked={isUkResidency} />
                                                <label htmlFor='ukResidency-true'>Yes</label>
                                            </div>
                                            <div className='pes-input-radio disabled'>
                                                <input type='radio' name='ukResidency' id='ukResidency-false' value='false' disabled='disabled' checked={!isUkResidency} />
                                                <label htmlFor='ukResidency-false'>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'ordinarilyResident')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(planHolderDetails, 'ordinarilyResident')}
                                    </div>
                                </div>
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6'>
                                        <div className='pes-radio-group group-inline py-0'>
                                            <div className='pes-input-radio'>
                                                <input type='radio' name='ordinarilyResident' id='ordinarilyResident-true' value='true' disabled='disabled' checked={isOrdinarilyResident} />
                                                <label htmlFor='ordinarilyResident-true'>Yes</label>
                                            </div>
                                            <div className='pes-input-radio disabled'>
                                                <input type='radio' name='ordinarilyResident' id='ordinarilyResident-false' value='false' disabled='disabled' checked={!isOrdinarilyResident} />
                                                <label htmlFor='ordinarilyResident-false'>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            );
        }

        return null;
    }

    _renderAmendAddressSection(historyDetails, content) {
        if(historyDetails){
            const {details, planHolderDetails, amendType, planHolderList} = historyDetails;
            const multipleAddressChange = _get(details, `${FIELD_NAMES.multipleAddressChange}`);
            const checkButtonValues = _get(details, `${FIELD_NAMES.checkButtonValues}`);
            const showMultipleChange = planHolderList && planHolderList.length > 0;

            return (
                <div>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'amendAddress')}
                    </div>
    
                    <div className='pes-table-list'>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'address.addressLine1')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine1')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.trustee
                                            ? 
                                            _get(details, `${FIELD_NAMES.trusteeAddress1}`)
                                            :
                                            _get(details, `${FIELD_NAMES.address1}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'address.addressLine2')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine2')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.trustee
                                            ? 
                                            _get(details, `${FIELD_NAMES.trusteeAddress2}`)
                                            :
                                            _get(details, `${FIELD_NAMES.address2}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'address.addressLine3')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine3')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.trustee
                                            ? 
                                            _get(details, `${FIELD_NAMES.trusteeAddress3}`)
                                            :
                                            _get(details, `${FIELD_NAMES.address3}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'address.addressLine4')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine4')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.trustee
                                            ? 
                                            _get(details, `${FIELD_NAMES.trusteeAddress4}`)
                                            :
                                            _get(details, `${FIELD_NAMES.address4}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {_get(planHolderDetails, 'address.postCode')}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'postCode')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.trustee
                                            ?
                                            _get(details, `${FIELD_NAMES.trusteePostCode}`)
                                            :
                                            _get(details, `${FIELD_NAMES.postCode}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'effectiveFrom')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.planholder &&
                                            _get(details, `${FIELD_NAMES.addressEffectiveDate}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.trustee &&
                                            _get(details, `${FIELD_NAMES.trusteeAddressEffectiveDate}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.organisation &&
                                            _get(details, `${FIELD_NAMES.organisationAddressEffectiveDate}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        {
                            showMultipleChange && multipleAddressChange == '1' &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'>
                                    <div>The new address was applied to the following</div>    
                                    {
                                        checkButtonValues && checkButtonValues.length > 0 &&
                                        checkButtonValues.map((item, index) =>
                                            <div key={index} className='lh-input'>{item}</div>
                                        )
                                    }       
                                </div>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6'>
                                            <div className='pes-radio-group group-inline py-0'>
                                                <div className='pes-input-radio'>
                                                    <input type='radio' name='multipleAddressChange' id='multipleAddressChange-true' value='true' disabled='disabled' checked={multipleAddressChange == '1'} />
                                                    <label htmlFor='multipleAddressChange-true'>Yes</label>
                                                </div>
                                                <div className='pes-input-radio disabled'>
                                                    <input type='radio' name='multipleAddressChange' id='multipleAddressChange-false' value='false' disabled='disabled' checked={multipleAddressChange == '0'} />
                                                    <label htmlFor='multipleAddressChange-false'>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    
                    </div>
                </div>
            );
        }

        return null;
    }

    _renderAmendAlternativeAddressSection(historyDetails, content) {
        if(historyDetails){
            const {details, planHolderList} = historyDetails;
            const altMultipleAddressChange = _get(details, `${FIELD_NAMES.altMultipleAddressChange}`);
            const altCheckButtonValues = _get(details, `${FIELD_NAMES.altCheckButtonValues}`);
            const showMultipleChange = planHolderList && planHolderList.length > 0;

            return (
                <div>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'amendAlternativeAddress')}
                    </div>
    
                    <div className='pes-table-list'>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine1')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.altAddress1}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine2')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.altAddress2}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine3')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.altAddress3}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'addressLine4')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.altAddress4}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'postCode')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.altPostCode}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'effectiveFrom')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.altAddressEffectiveDate}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        {
                            showMultipleChange && altMultipleAddressChange == '1' &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'>
                                    <div>The new address was applied to the following</div>    
                                    {
                                        altCheckButtonValues && altCheckButtonValues.length > 0 &&
                                        altCheckButtonValues.map((item, index) =>
                                            <div key={index} className='lh-input'>{item}</div>
                                        )
                                    }       
                                </div>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6'>
                                            <div className='pes-radio-group group-inline py-0'>
                                                <div className='pes-input-radio'>
                                                    <input type='radio' name='altMultipleAddressChange' id='multipleAddressChange-true' value='true' disabled='disabled' checked={altMultipleAddressChange == '1'} />
                                                    <label htmlFor='altMultipleAddressChange-true'>Yes</label>
                                                </div>
                                                <div className='pes-input-radio disabled'>
                                                    <input type='radio' name='altMultipleAddressChange' id='multipleAddressChange-false' value='false' disabled='disabled' checked={altMultipleAddressChange == '0'} />
                                                    <label htmlFor='altMultipleAddressChange-false'>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            );
        }

        return null;
    }

    _renderAmendContactDetailsSection(historyDetails, content) {
        if(historyDetails){
            const {details, amendType} = historyDetails;

            return (
                <div>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'amendContactDetails')}
                    </div>

                    {/* TABLE */}
                    <table className='pes-table d-table w-100p'>
                        <tbody>
                            <tr className='d-table-row'>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10 text-capitalize'>
                                    {_get(content, 'daytimeTelephoneNumber')}
                                </td>
                                <td className='d-table-cell col-xs-3 px-10'>
                                    {
                                        amendType === AMEND_TYPES.planholder &&
                                        _get(details, `${FIELD_NAMES.daytimeTelephoneNumber}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.trustee &&
                                        _get(details, `${FIELD_NAMES.trusteeDaytimeTelephoneNumber}`)                                            
                                    }
                                    {
                                        amendType === AMEND_TYPES.organisation &&
                                        _get(details, `${FIELD_NAMES.organisationDaytimeTelephoneNumber}`)                                            
                                    }
                                </td>
                            </tr>

                            <tr className='d-table-row'>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10 text-capitalize'>
                                    {_get(content, 'eveningtimeTelephoneNumber')}
                                </td>
                                <td className='d-table-cell col-xs-3 px-10'>
                                    {
                                        amendType === AMEND_TYPES.planholder &&
                                        _get(details, `${FIELD_NAMES.eveningtimeTelephoneNumber}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.trustee &&
                                        _get(details, `${FIELD_NAMES.trusteeEveningtimeTelephoneNumber}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.organisation &&
                                        _get(details, `${FIELD_NAMES.organisationEveningtimeTelephoneNumber}`)
                                    }
                                </td>
                            </tr>                       

                            <tr className='d-table-row'>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10 text-capitalize'>
                                    {_get(content, 'mobileTelephoneNumber')}
                                </td>
                                <td className='d-table-cell col-xs-3 px-10'>
                                    {
                                        amendType === AMEND_TYPES.planholder &&
                                        _get(details, `${FIELD_NAMES.mobileTelephoneNumber}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.trustee &&
                                        _get(details, `${FIELD_NAMES.trusteeMobileTelephoneNumber}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.organisation &&
                                        _get(details, `${FIELD_NAMES.organisationMobileTelephoneNumber}`)
                                    }
                                </td>
                            </tr> 

                            <tr className='d-table-row'>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10'></td>
                                <td className='d-table-cell col-xs-3 px-10 text-capitalize'>
                                    {_get(content, 'emailAddress')}
                                </td>
                                <td className='d-table-cell col-xs-3 px-10'>
                                    {
                                        amendType === AMEND_TYPES.planholder &&
                                        _get(details, `${FIELD_NAMES.emailAddress}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.trustee &&
                                        _get(details, `${FIELD_NAMES.trusteeEmailAddress}`)
                                    }
                                    {
                                        amendType === AMEND_TYPES.organisation &&
                                        _get(details, `${FIELD_NAMES.organisationEmailAddress}`)
                                    }
                                </td>
                            </tr>
                            
                            {
                                amendType !== AMEND_TYPES.trustee &&
                                <tr className='d-table-row'>
                                    <td className='d-table-cell col-xs-3 px-10'></td>
                                    <td className='d-table-cell col-xs-3 px-10'></td>
                                    <td className='d-table-cell col-xs-3 px-10 text-capitalize'>
                                        {_get(content, 'effectiveFrom')}
                                    </td>
                                    <td className='d-table-cell col-xs-3 px-10'>
                                        {
                                            amendType === AMEND_TYPES.planholder &&
                                            _get(details, `${FIELD_NAMES.contactDetailsEffectiveDate}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.organisation &&
                                            _get(details, `${FIELD_NAMES.organisationContactDetailsEffectiveDate}`)
                                        }
                                    </td>
                                </tr>
                            }
                        </tbody>                     
                    </table>
    
                    {/* TABLE LIST */}
                    {/* <div className='pes-table-list'>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'daytimeTelephoneNumber')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.planholder &&
                                            _get(details, `${FIELD_NAMES.daytimeTelephoneNumber}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.trustee &&
                                            _get(details, `${FIELD_NAMES.trusteeDaytimeTelephoneNumber}`)                                            
                                        }
                                        {
                                            amendType === AMEND_TYPES.organisation &&
                                            _get(details, `${FIELD_NAMES.organisationDaytimeTelephoneNumber}`)                                            
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'eveningtimeTelephoneNumber')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.planholder &&
                                            _get(details, `${FIELD_NAMES.eveningtimeTelephoneNumber}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.trustee &&
                                            _get(details, `${FIELD_NAMES.trusteeEveningtimeTelephoneNumber}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.organisation &&
                                            _get(details, `${FIELD_NAMES.organisationEveningtimeTelephoneNumber}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'mobileTelephoneNumber')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.planholder &&
                                            _get(details, `${FIELD_NAMES.mobileTelephoneNumber}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.trustee &&
                                            _get(details, `${FIELD_NAMES.trusteeMobileTelephoneNumber}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.organisation &&
                                            _get(details, `${FIELD_NAMES.organisationMobileTelephoneNumber}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'emailAddress')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {
                                            amendType === AMEND_TYPES.planholder &&
                                            _get(details, `${FIELD_NAMES.emailAddress}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.trustee &&
                                            _get(details, `${FIELD_NAMES.trusteeEmailAddress}`)
                                        }
                                        {
                                            amendType === AMEND_TYPES.organisation &&
                                            _get(details, `${FIELD_NAMES.organisationEmailAddress}`)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            amendType !== AMEND_TYPES.trustee &&
                            <div className='tlrow'>
                                <div className='tlcell col-xs-6'></div>
                                <div className='tlcell col-xs-6'>
                                    <div className='row'>
                                        <div className='col-xs-6 text-capitalize'>
                                            {_get(content, 'effectiveFrom')}
                                        </div>
                                        <div className='col-xs-6'>
                                            {
                                                amendType === AMEND_TYPES.planholder &&
                                                _get(details, `${FIELD_NAMES.contactDetailsEffectiveDate}`)
                                            }
                                            {
                                                amendType === AMEND_TYPES.organisation &&
                                                _get(details, `${FIELD_NAMES.organisationContactDetailsEffectiveDate}`)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
    
                    </div> */}
                </div>
            );
        }

        return null;
    }

    _renderAmendDateOfBirthSection(historyDetails, content) {
        if(historyDetails){
            const {details, planHolderDetails} = historyDetails;

            return (
                <div>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'amendDateOfBirth')}
                    </div>
    
                    <div className='pes-table-list'>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'>
                                {StringUtils.formattedDate(_get(planHolderDetails, 'dateofBirth'))}
                            </div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'newDateOfBirth')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.correctDateOfBirth}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'typeOfEvidenceSeen')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {this._getLabelFromValue(OPTIONS_DATA.dobTypeOfEvidenceSeen, _get(details, `${FIELD_NAMES.dobTypeOfEvidenceSeen}`))}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-6'></div>
                            <div className='tlcell col-xs-6'>
                                <div className='row'>
                                    <div className='col-xs-6 text-capitalize'>
                                        {_get(content, 'otherEvidenceType')}
                                    </div>
                                    <div className='col-xs-6'>
                                        {_get(details, `${FIELD_NAMES.dobOtherEvidenceType}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            );
        }

       return null;
    }

    _renderApplyAllChangesSection(historyDetails, content) {
        if(historyDetails){
            const {details, amendType} = historyDetails;
            const planNumbers = _get(details, `${FIELD_NAMES.planNumbers}`);
            const isOrganisation = amendType === AMEND_TYPES.organisation;
            
            return (
                <div>
                    <div className='pes-section-title text-capitalize'>
                        {_get(content, 'applyAllChanges')}
                    </div>
    
                    <div className='pes-table-list apply-all-changes-area'>
    
                        <div className='tlrow'>
                            <div className={isOrganisation ? 'tlcell col-xs-6 text-area' : 'tlcell col-xs-4 text-area'}>
                                {_get(content, 'applyAllChangesText')}
                            </div>
                            <div className={isOrganisation ? 'tlcell col-xs-6 inputs-area px-0' : 'tlcell col-xs-8 inputs-area px-0'}>
                                <div className='row'>
                                    {
                                        isOrganisation
                                        ?
                                        Array(5).fill(null).map((item, index) =>
                                            <div className='input-field' key={index}>
                                                <div className='pes-input-group'>
                                                    <input 
                                                        className='form-control' 
                                                        value={_get(planNumbers, `[${index}]`) || ''}
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                        )
                                        :
                                        Array(15).fill(null).map((item, index) =>
                                            <div className='col-xs-4 input-field' key={index}>
                                                <div className='pes-input-group'>
                                                    <input 
                                                        className='form-control' 
                                                        value={_get(planNumbers, `[${index}]`) || ''}
                                                        readOnly 
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
    
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12 text-bold'>
                                {_get(content, 'returnToHistoryText')}
                            </div>
                        </div>
    
                    </div>
                </div>
            );
        }

        return null;
    }

    _formatHistoryDetails(historyDetails){
        if(historyDetails){
            let {details, oldData} = historyDetails;
            details = details && JSON.parse(details);
            oldData = oldData && JSON.parse(oldData);
            const planHolderIndex = _get(details, 'planHolderIndex') || 0;
            const planHolderDetails = _get(oldData, `planDetail.planHolders[${planHolderIndex}]`);
            let amendType = _get(details, 'amendType') || 'PERSONAL';
            const planHolderList = _get(oldData, `planDetail.planHolders`);

            if(amendType === 'PERSONAL'){
                amendType = AMEND_TYPES.planholder;
                details = details.amendPersonal;
            }
            if(amendType === 'ORGANIZATION'){
                amendType = AMEND_TYPES.organisation;
                details = details.amendOrganization;
            }
            if(amendType === 'TRUSTEE'){
                amendType = AMEND_TYPES.trustee;
                details = details.amendTrustee;
            }

            return {details, oldData, amendType, planHolderIndex, planHolderDetails, planHolderList};
        }

        return {};
    }

    _mapValueToLabel(type, value){
        const labelData = {
            title: [
                {"value": "", "label": ""},
                {"value": "mr", "label": "Mr"},
                {"value": "mrs", "label": "Mrs"},
                {"value": "miss", "label": "Miss"},
                {"value": "ms", "label": "Ms"},
                {"value": "dr", "label": "Dr"},
                {"value": "rev", "label": "Rev"},
                {"value": "sir", "label": "Sir"},
                {"value": "lady", "label": "Lady"},
                {"value": "lord", "label": "Lord"},
                {"value": "dame", "label": "Dame"},
                {"value": "other", "label": "Other"}
            ],

            nameTypeOfEvidenceSeen: [
                {"value": "", "label": "Please select"},
                {"value": "originalMarriageCertificate", "label": "Original Marriage Certificate"},
                {"value": "decreeNisiorAbsolute", "label": "Decree Nisi or Absolute"},
                {"value": "deedPollCertificate", "label": "Deed Poll Certificate"},
                {"value": "birthCertificate", "label": "Birth Certificate"},
                {"value": "civilPartnershipCertificate", "label": "Civil Partnership Certificate"},
                {"value": "photocardDrivingLicence", "label": "Photocard Driving Licence"},
                {"value": "passport", "label": "Passport"},
                {"value": "other", "label": "Other"}
            ],

            nationality: [
                {"value": "", "label": "Please select"},
                {"value": "uk", "label": "UK"},
                {"value": "other", "label": "Other"}
            ],

            sex: [
                {"value": "male", "label": "Male"},
                {"value": "female", "label": "Female"},
                {"value": "", "label": "Please select"}
            ],

            employmentStatus: [
                {"value": "housePerson", "label": "House Person"},
                {"value": "inFullTimeEducation", "label": "In Full-time Education"},
                {"value": "retired", "label": "Retired"},
                {"value": "aChildUnder16", "label": "A Child Under The Age Of 16"},
                {"value": "selfEmployed", "label": "Self-Employed"},
                {"value": "unemployed", "label": "Unemployed"},
                {"value": "employed", "label": "Employed"},
                {"value": "other", "label": "Other"},
                {"value": "caringAged16", "label": "Caring For A Person Aged 16 Or Over"},
                {"value": "caringUnder16", "label": "Caring For A Child Aged Under 16"},
                {"value": "", "label": "Please select"}
            ],

            dateOfBirth: [
                {"value": "", "label": "Please select"},
                {"value": "birthCertificate", "label": "Birth Certificate"},
                {"value": "photocardDrivingLicence", "label": "Photocard Driving Licence"},
                {"value": "passport", "label": "Passport"},
                {"value": "other", "label": "Other"}
            ]
        };

        if(type){
            const item = labelData[type].find(item => item.value === value);
            return item.label;
        }
        
        return null;
    }

    _getLabelFromValue(data, value){
        if(data && value){
            const item = data.find(item => item.value === value);
            if(item){
                return item.label;
            }

            return null;
        }

        return null;
    }

    _checkAmend({ amendType, oldData }) {
        const productGroup = _get(oldData, 'productGroupType');

        // INITIAL VALUES
        let amendName = true;
        let amendOtherDetails = false;
        let amendAddress = true;
        let amendContactDetails = true;
        let amendDateOfBirth = false;
        let amendAlternativeAddress = false;
        let applyAllChanges = false;

        // AMEND NAME
        // AMEND OTHER DETAILS
        if(
            amendType === AMEND_TYPES.planholder &&
            productGroup === ProductGroups.GMF
        ){
            amendOtherDetails = true;
        }
        // AMEND ADDRESS
        // AMEND CONTACT DETAILS
        // AMEND DATE OF BIRTH
        if(amendType === AMEND_TYPES.planholder){
            amendDateOfBirth = true;
        }
        // AMEND ALTERNATIVE ADDRESS
        if(
            amendType === AMEND_TYPES.planholder &&
            productGroup === ProductGroups.GMF
        ){
            amendAlternativeAddress = true;
        }
        // APPLY ALL CHANGES
        if(amendType !== AMEND_TYPES.trustee){
            applyAllChanges = true;
        }
        
        return { 
            amendName, 
            amendOtherDetails, 
            amendAddress, 
            amendContactDetails, 
            amendDateOfBirth, 
            amendAlternativeAddress, 
            applyAllChanges 
        };
    }

    render() {
        const content = _get(this.context, `content.${ContentTypes.SERVICING_HISTORY_DETAILS}.amend`);
        let historyDetails = _get(this.context, 'historyDetails');
        historyDetails = this._formatHistoryDetails(historyDetails);
        const checkAmend = this._checkAmend(historyDetails);

        return (
            <div className='pes-servicing-history-details-page pes-bg-grey'>
                <div className='pes-page-title text-capitalize no-line'>
                    {
                        historyDetails.amendType === AMEND_TYPES.planholder && 
                        _get(content, 'updatePersonalDetails')
                    }
                    {
                        historyDetails.amendType === AMEND_TYPES.organisation && 
                        _get(content, 'updateOrganisationDetails')
                    }
                    {
                        historyDetails.amendType === AMEND_TYPES.trustee && 
                        _get(content, 'updateTrusteeDetails')
                    }
                </div>
                {
                    this._renderAmendNameSection(historyDetails, content)
                }
                {
                    checkAmend.amendOtherDetails &&
                    this._renderAmendOtherDetailsSection(historyDetails, content)
                }
                {
                    this._renderAmendAddressSection(historyDetails, content)
                }
                {
                    checkAmend.amendAlternativeAddress &&
                    this._renderAmendAlternativeAddressSection(historyDetails, content)
                }
                {
                    this._renderAmendContactDetailsSection(historyDetails, content)
                }
                {
                    checkAmend.amendDateOfBirth &&
                    this._renderAmendDateOfBirthSection(historyDetails, content)
                }
                {
                    checkAmend.applyAllChanges &&
                    this._renderApplyAllChangesSection(historyDetails, content)
                }
            </div>
        );
    }
}


export default AmendHistory;