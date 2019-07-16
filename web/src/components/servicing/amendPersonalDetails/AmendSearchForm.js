import React, {PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {renderInput, renderMultiSelect} from '../../../validations/FieldRendering';
import {postCode} from '../../../validations/FieldValidations';
import Button from '../../common/Button';
import HtmlUtils from '../../../utils/HtmlUtils';
import {get as _get} from 'lodash';
import {FIELD_NAMES} from './constants';

class SearchForm extends React.Component {
    constructor(props, context) {
		super(props, context);
    }
    
    static propTypes = {
        alternative: PropTypes.bool,
        addressesFound: PropTypes.array,
        showAddAddressArea: PropTypes.bool
    };

    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        searchAddress: PropTypes.func.isRequired,
        addAddress: PropTypes.func.isRequired,
        searchAlternativeAddress: PropTypes.func.isRequired,
        addAlternativeAddress: PropTypes.func.isRequired
    };

    _renderNormalSearchForm(props, context){
        const {content, handleSubmit, alternative} = props;
        const {searchAddress, searchAlternativeAddress} = context;

        return(
        <div>

            <div className='row form-group mb-5'>
                <div className='col-xs-6 input-label text-capitalize'>{_get(content, 'houseNameNumber')}</div>
                <div className='col-xs-6 input-field'>
                    <Field 
                        className='pes-input-group'
                        name={alternative ? FIELD_NAMES.altSearchHouseNameNumber : FIELD_NAMES.searchHouseNameNumber}
                        component={renderInput}
                    />
                </div>
            </div>
            
            <div className='row form-group mb-5'>
                <div className='col-xs-6 input-label text-capitalize'>{_get(content, 'postCode')}</div>
                <div className='col-xs-6 input-field'>
                    <Field 
                        className='pes-input-group'
                        name={alternative ? FIELD_NAMES.altSearchPostCode : FIELD_NAMES.searchPostCode}
                        component={renderInput}
                        validate={[postCode]}
                        showError
                    />
                </div>
            </div>
            
            <div className='row form-group mb-5'>
                <div className='col-xs-6 input-label text-capitalize'></div>
                <div className='col-xs-6 input-field'>
                    <Button 
                        className='pes-btn pes-btn-default' label='Search' 
                        onClick={alternative ? handleSubmit(searchAlternativeAddress) : handleSubmit(searchAddress)} 
                    />
                </div>
            </div>

        </div>
        );
    }

    _renderAddSelectionSearchForm(props, context){
        const {content, handleSubmit, alternative, addressesFound} = props;
        const {searchAddress, addAddress, searchAlternativeAddress, addAlternativeAddress} = context;

        return(
        <div>

            <div className='row form-group mb-5'>
                <div className='col-xs-4 input-label text-capitalize'>{_get(content, 'houseNameNumber')}</div>
                <div className='col-xs-4 input-field'>
                    <Field 
                        className='pes-input-group'
                        name={alternative ? FIELD_NAMES.altSearchHouseNameNumber : FIELD_NAMES.searchHouseNameNumber}
                        component={renderInput}
                    />
                </div>
            </div>
            
            <div className='row form-group mb-5'>
                <div className='col-xs-4 input-label text-capitalize'>{_get(content, 'postCode')}</div>
                <div className='col-xs-4 input-field'>
                    <Field 
                        className='pes-input-group'
                        name={alternative ? FIELD_NAMES.altSearchPostCode : FIELD_NAMES.searchPostCode}
                        component={renderInput}
                        validate={[postCode]}
                        showError
                    />
                </div>
                <div className='col-xs-4 input-field'>
                    <Button 
                        className='pes-btn pes-btn-default' label='Search' 
                        onClick={alternative ? handleSubmit(searchAlternativeAddress) : handleSubmit(searchAddress)}
                    />
                </div>
            </div>
            
            <div className='row form-group mb-5'>
                <div className='col-xs-4 input-label text-capitalize'></div>
                <div className='col-xs-8 input-field'>
                    <Field 
                        className='pes-multiselect'
                        name={alternative ? FIELD_NAMES.altSelectedAddress : FIELD_NAMES.selectedAddress}
                        data={addressesFound}
                        component={renderMultiSelect}
                    />
                </div>
            </div>
            
            <div className='row form-group mb-5'>
                <div className='col-xs-4 input-label text-capitalize'></div>
                <div className='col-xs-8 input-field'>
                    <Button 
                        className='pes-btn pes-btn-default' label='Add' 
                        onClick={alternative ? handleSubmit(addAlternativeAddress) : handleSubmit(addAddress)}
                    />
                </div>
            </div>

        </div>
        );
    }

    render(){
        const {content, showAddressList} = this.props;

        return(
            <div className={showAddressList ? 'amend-search-form showAddressList' : 'amend-search-form'}>
                <div className='mb-5'>
                    {HtmlUtils.htmlToReact(_get(content, 'amendAddressSearchMessage'))}
                </div>
                {
                    showAddressList
                    ?
                    this._renderAddSelectionSearchForm(this.props, this.context)
                    :
                    this._renderNormalSearchForm(this.props, this.context)
                }
            </div>
        );
    }
}


export const AmendSearchForm = reduxForm({
    form: 'servicingAmendSearch'
})(SearchForm);


export const AmendSearchFormAlternative =  reduxForm({
    form: 'servicingAmendSearchAlternative',
})(SearchForm);


export default {AmendSearchForm, AmendSearchFormAlternative};