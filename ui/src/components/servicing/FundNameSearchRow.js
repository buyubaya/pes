import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, Field, formValueSelector,SubmissionError} from 'redux-form';
import {renderInput} from '../../validations/FieldRendering';
import {notAllowSpecialCharacters} from '../../validations/SwitchFund';
import Button from '../common/Button';
import IconInfo from '../common/IconInfo';
import ProductGroups from '../../constants/ProductGroups';
const required = value => value ? undefined : '<i>Fund Name</i> must be specified for "Search"';
const FundNameSearchRow = (props) => (
    <div className='tlrow row'>
        <div className='tlcell col-xs-4 input-label text-capitalize clearfix'>
            Fund name
            {
                props.productGroup === ProductGroups.B34 &&
                <IconInfo className='pull-right' section='#fundswitchInfo' />
            }
        </div>
        <div className='tlcell col-xs-8 bg-inputs-group'>
            <div className='clearfix'>
                <Field 
                    className='pes-input-group pull-left'
                    name='searchText'
                    component={renderInput}
                    placeholder='Enter search text'
                    validate={[required, notAllowSpecialCharacters]}
                    showError
                />
                <Button className='pes-btn pes-btn-default pull-right' label='Search' onClick={
                    props.handleSubmit((values)=>{
                        return props.searchFunds(values).then((data) => {},(err)=>{
                            throw new SubmissionError({ searchText: err.message});
                        }
                    );
                })} />
            </div>
        </div>
    </div>
);
const selector = formValueSelector('searchFunds');
export default compose(
    connect(state => ({
        searchText: selector(state, 'searchText')
    })),
    reduxForm({
        form: 'searchFunds'
    })
)(FundNameSearchRow);