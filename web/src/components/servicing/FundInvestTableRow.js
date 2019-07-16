import React,{PropTypes} from 'react';
import _ from 'lodash';
import Button from '../common/Button';
import {Field, FieldArray, change} from 'redux-form';
import {renderInput, renderCheckbox} from '../../validations/FieldRendering';
import {number} from '../../validations/FieldValidations';
import {notInRangePercent3, notInteger1, notInRangePercentTip,notIntegerTip, checkAllowFund} from '../../validations/SwitchFund';
import ProductGroups from '../../constants/ProductGroups';
const renderSpecifyPercentageOfInvestment = ({fields, onChange, onDelete, isRenderSedolCode, productGroupType, hasCheckAllowFund}) => {
    let validate1 = [number, notIntegerTip, notInRangePercentTip];
    let validate2 = [number, notInteger1, notInRangePercent3];
    if(hasCheckAllowFund===true){
        validate1.push(checkAllowFund);
        validate2.push(checkAllowFund);
    }
    return(
        <div className='tlbody'>   
            {fields.map((item, idx)=>{
                const values = fields.get(idx);
                return(
                    <div className='tlrow align-middle' key={idx+1}>
                        <div className='tlcell col-xs-4 input-label text-capitalize'>{values.fundName}</div>
                        <div className='tlcell col-xs-6'>
                            <div className='investment-funds-area'>
                                <div className='row input-field'>
                                    {isRenderSedolCode && <div className='col-xs-4 text-center cell-sedol'>{values.sedolCode}</div>}
                                    {isRenderSedolCode && <div className='col-xs-3 text-center cell-panelfund'>{values.isPanelFund}</div>}
                                    <div className={`col-xs-${isRenderSedolCode ? '5' :'12'} text-center cell-percentinvestted`}>
                                        <span>
                                            {productGroupType === ProductGroups.TIP.toLowerCase() && <Field 
                                                className='pes-input-group w-percent'
                                                name={`${item}.percentInv`}
                                                component={renderInput}
                                                onBlur={onChange}
                                                validate={validate1}
                                                showError
                                                showWarn
                                            />}
                                            {productGroupType !== ProductGroups.TIP.toLowerCase() && <Field 
                                                className='pes-input-group w-percent'
                                                name={`${item}.percentInv`}
                                                component={renderInput}
                                                onBlur={onChange}
                                                validate={validate2}
                                                showError
                                                showWarn
                                            />}
                                        </span>
                                        {isRenderSedolCode && <span className='d-inline-block ml-10'>%</span>}
                                    </div>
                                </div>
                                <div className='input-btn text-center'>
                                    <Field 
                                       name={`${item}.checkInput`}
                                        component={renderCheckbox}
                                    />
                                </div>
                            </div>    
                        </div>
                        <div className='tlcell col-xs-2 align-middle text-right'>
                            <a href={values.pdfFactSheetLink} type='application/pdf' target='_blank'>
                                <img src={require('../../../assets/images/icon_pdf.png')} className='pes-icon icon-pdf align-bottom mr-5 ' />
                                Fund fact Sheet
                            </a>
                        </div>
                    </div>
                );
            })}
            <div className='tlrow'>
                <div className='tlcell col-xs-4 input-label text-bold text-capitalize'>
                    Total invested
                </div>
                <div className='tlcell col-xs-6'>
                    <div className='investment-funds-area'>
                        <div className='row input-field'>
                            <div className={`col-xs-${isRenderSedolCode ? '5 col-xs-offset-7' : '12' }
                                text-center align-middle cell-percentinvestted`}>                                
                                <span className={`${productGroupType === ProductGroups.TIP.toLowerCase()? 'product_tip':''}`}>
                                <span className='d-inline-block' style={{display: productGroupType === ProductGroups.TIP.toLowerCase() ? 'inline-block' : 'none'}}>100 %</span>
                                    <Field
                                        className='pes-input-group w-percent'
                                        name='totalPercentInvestment'
                                        type='text'
                                        component={renderInput}
                                        disabled
                                        showError
                                    />
                                </span>
                                <span className='d-inline-block ml-10' 
                                    style={{display: productGroupType === ProductGroups.TIP.toLowerCase() ? 'none' : 'inline-block'}}>%</span>
                            </div>
                        </div>
                        <div className='input-btn text-center'>
                            {<Button 
                                type='button'
                                className='pes-btn pes-btn-default' 
                                label='Delete' 
                                onClick={onDelete}
                            />}
                        </div>
                    </div>    
                </div>
            </div>
            {productGroupType === ProductGroups.B34.toLowerCase() && <div className='tlrow empty pes-text-belt'></div>}
        </div>
    );
};
class FundInvestTable extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onDelete = this._onDelete.bind(this);
        this._onChange = this._onChange.bind(this);
    }
    static contextTypes = {
        productGroupType: PropTypes.string,
        dispatch: PropTypes.any,
        onDeleteFunds: PropTypes.func
    };
    _onDelete(e){
        this.context.onDeleteFunds(e);
    }
    _onChange(ele, value){
        let formName = this.props.formName;
        let formValues = window.PES.store.getState().form[formName].values;
        let selectedFunds = formValues.selectedFunds;
        let prop = 'percentInv';
        let total = selectedFunds.reduce(function(a, b) {
            let n = Number.isNaN(Number(b[prop])) ? 0 : Number.parseFloat(Number(b[prop]));
            return a + n;
        }, 0);
        this.context.dispatch(change(formName, 'totalPercentInvestment', total));
    }
    
    render(){
        let productGroupType = this.context.productGroupType;
        productGroupType =  _.isUndefined(productGroupType) ? '' : productGroupType.toLowerCase();
        return (
            <div className='pes-switch-fund-section'>
                <div className='pes-table-list ovf-v'>
                    <div className='tlhead'>   
                        <div className='tlrow'>
                            <div className='tlcell col-xs-4 align-middle text-capitalize'>Fund name</div>
                            <div className='tlcell col-xs-6 align-middle'>
                                <div className='investment-funds-area'>
                                    <div className='row input-field'>
                                        {this.props.isRenderSedolCode && <div className='col-xs-4 text-center align-middle cell-sedol text-capitalize'>SEDOL</div>}
                                        {this.props.isRenderSedolCode && <div className='col-xs-3 text-center align-middle cell-panelfund text-capitalize'>Panel fund</div>}
                                        <div className={`col-xs-${this.props.isRenderSedolCode ? '5' : '12'} text-center align-middle cell-percentinvested text-capitalize`}>
                                            {this.props.isRenderSedolCode ? 'Percent invested' : '% Invested'}
                                        </div>
                                    </div>
                                    <div className='input-btn text-center'>
                                        <img src={require('../../../assets/images/delete_icon.gif')} />
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div> 

                    <div className='tlbody'>  
                        <FieldArray name='selectedFunds' component={renderSpecifyPercentageOfInvestment}
                            isRenderSedolCode={this.props.isRenderSedolCode}
                            productGroupType={productGroupType}
                            onChange={this._onChange} 
                            onDelete={this._onDelete}
                            hasCheckAllowFund={this.props.hasCheckAllowFund}
                            hasCheckSodolCodeFund={this.props.hasCheckSodolCodeFund}
                        />
                    </div>    
                </div>
            </div>
        );
    }
}
export default FundInvestTable;
