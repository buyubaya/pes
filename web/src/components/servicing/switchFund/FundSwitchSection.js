import React, {PropTypes} from 'react';
import {Field, change, FieldArray} from 'redux-form';
import {renderInput, renderRadioGroup} from '../../../validations/FieldRendering';
import {notInRangePercent, notInRangePercent2, notInteger2, notIntegerTip, notInRangePercentTip, checkAllowFund} from '../../../validations/SwitchFund';
import {number} from '../../../validations/FieldValidations';
import StringUtils from '../../../utils/StringUtils';
import SwitchFundUtils from '../../../pages/servicing/SwitchFundUtils';
import ProductGroups from '../../../constants/ProductGroups';
import _ from 'lodash';

const renderFunds = ({fields,formName, onChange,productGroupType, isSwitch}) => {
    const form = (_.isEmpty(window.PES.store.getState().form) 
                || _.isEmpty(window.PES.store.getState().form[formName])
                || _.isEmpty(window.PES.store.getState().form[formName].values)) ? {} : window.PES.store.getState().form[formName].values;
    const funds = _.isUndefined(form.funds) ? [] : form.funds;
    const totalFunds = SwitchFundUtils.sumArrayValues(funds, 'value');
    if(_.isNull(isSwitch)) return (null);
    let lbSpecifyFund = 'Specify percentages to switch',
    lbCurrentValue='Current value (£)',
    lbSwitchPercent = 'Switch (%)',
    lbCurrentInvestmentPercent='% Current investment',
    lbNewInvestmentPercent='New investment (%)',
    lbTotalPlanValue='Total plan value';
    if(productGroupType === ProductGroups.B34.toLowerCase() || productGroupType === ProductGroups.TIP.toLowerCase()){
        lbSpecifyFund = 'Specify funds percentage for switch';
        lbCurrentValue='Current value';
        lbSwitchPercent='% Switch';
        lbCurrentInvestmentPercent = productGroupType === ProductGroups.B34.toLowerCase() ? 'Current investment (%)' : '% Current investment';        
        lbTotalPlanValue='Total current value';
        lbNewInvestmentPercent = productGroupType === ProductGroups.B34.toLowerCase() ? '% New investment' : lbSwitchPercent;
    }

    if(productGroupType === ProductGroups.B34.toLowerCase() || productGroupType === ProductGroups.TIP.toLowerCase()){
        lbCurrentValue = 'Current value';
        lbCurrentInvestmentPercent = '% Current investment';
        lbNewInvestmentPercent = '% Switch';
    }else {
        lbCurrentValue = 'Current value (£)';
        lbCurrentInvestmentPercent = 'Current investment (%)';
        lbNewInvestmentPercent = 'New investment (%)';
    }

    return(
        <div className='pes-switch-fund-section'>
            <div className={`pes-text-belt text-capitalize ${productGroupType === ProductGroups.B34.toLowerCase() ? 'clear-background font-normal': ''}`}>
                {isSwitch && lbSpecifyFund}
                {!isSwitch && 'Specify rebalance fund investment %'}
            </div>
            <div className='pes-table-list ovf-v align-middle'>
                <div className='tlhead'>
                    {/* <div className={`tlrow row ${productGroupType === ProductGroups.B34.toLowerCase()?'pes-text-belt':''}`}> */}
                    <div className='tlrow row'>
                        <div className='tlcell col-xs-5 text-capitalize'>Fund name</div>
                        <div className='tlcell col-xs-7'>
                            <div className='row'>
                                <div className='col-xs-4 text-capitalize'> {lbCurrentValue}</div>
                                {isSwitch && <div className='col-xs-4 text-capitalize'>{lbSwitchPercent}</div>}
                                {!isSwitch && <div className='col-xs-4 text-capitalize'>{lbCurrentInvestmentPercent}</div>}
                                {!isSwitch && <div className='col-xs-4 text-capitalize'>{lbNewInvestmentPercent}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pes-table-list ovf-v align-middle'>
                <div className='tlbody'>
                    {fields.map((item, idx)=>{
                        const values = fields.get(idx);
                        let currInvest = 0;
                        if(!isSwitch){
                            currInvest = values.value * 100 / totalFunds;
                        }
                        return(
                        <div className='tlrow row' key={idx+1}>
                            <div className='tlcell col-xs-5'>{values.name}</div>
                            <div className='tlcell col-xs-7'>
                                <div className='row'>
                                    <div className='col-xs-4'>
                                        {StringUtils.numberWithCommas(values.value)}
                                    </div>
                                    {isSwitch &&<div className='col-xs-4'>
                                        {productGroupType === ProductGroups.TIP.toLowerCase() && <Field                                    
                                            className='pes-input-group'
                                            name={`${item}.switch`}
                                            component={renderInput}
                                            onChange={onChange}
                                            validate={[number, notInteger2, notInRangePercent2,checkAllowFund]}
                                            showError
                                        />}
                                        {productGroupType !== ProductGroups.TIP.toLowerCase() && <Field                                    
                                            className='pes-input-group'
                                            name={`${item}.switch`}
                                            component={renderInput}
                                            onChange={onChange}
                                            validate={[number, notInteger2, notInRangePercent2,checkAllowFund]}
                                            showError
                                        />}
                                    </div>}
                                    {!isSwitch && <div className='col-xs-4'>
                                            {productGroupType === ProductGroups.B34.toLowerCase() ? Math.round(currInvest).toString() : Number(currInvest).toFixed(2).toString()}
                                        </div>}
                                    {!isSwitch &&<div className='col-xs-4'>
                                        <div className='cell-percentinvestted'>
                                            <span className='d-inline-block'>
                                                {productGroupType === ProductGroups.TIP.toLowerCase() && <Field 
                                                    className='pes-input-group w-percent'
                                                    name={`${item}.newInvestment`}
                                                    component={renderInput}
                                                    onChange={onChange}
                                                    validate={[number, notIntegerTip, notInRangePercentTip, checkAllowFund]}
                                                    showError
                                                />}
                                                {productGroupType !== ProductGroups.TIP.toLowerCase() && <Field 
                                                    className='pes-input-group w-percent'
                                                    name={`${item}.newInvestment`}
                                                    component={renderInput}
                                                    onChange={onChange}
                                                    validate={[number, notInteger2, notInRangePercent, checkAllowFund]}
                                                    showError
                                                />}
                                            </span>
                                            {productGroupType !== ProductGroups.TIP.toLowerCase() && <span className='d-inline-block newInvestment ml-10'>%</span>}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            {(productGroupType !== ProductGroups.B34.toLowerCase() && productGroupType !== ProductGroups.TIP.toLowerCase()) 
                                && <div className='col-xs-12 col-empty'></div>}
                        </div>
                        );
                    })}
                    <div className='tlrow row pes-bg-grey-dark text-bold row-total'>
                        <div className='tlcell col-xs-5 text-capitalize'>{lbTotalPlanValue}</div>
                        <div className='tlcell col-xs-7'>
                            <div className='row'>
                                <div className='col-xs-4 tlcell'> {StringUtils.numberWithCommas(totalFunds.toFixed(2))}</div>
                                    {isSwitch &&<div className='col-xs-4 total-switch'>
                                        <Field                                    
                                            className='pes-input-group'
                                            name='totalSwitch'
                                            component={renderInput}
                                            onChange={onChange}
                                            showError
                                            disabled
                                        />
                                </div>}
                                {!isSwitch && <div className='col-xs-4 text-capitalize tlcell'>Total invested</div>}
                                {!isSwitch && <div className='col-xs-4'>
                                    <div className='cell-percentinvestted'>
                                        <span className='d-inline-block' style={{display: productGroupType === ProductGroups.TIP.toLowerCase() ? 'inline-block' : 'none'}}>100 %</span>
                                        <span className={`d-inline-block ${productGroupType === ProductGroups.TIP.toLowerCase()? 'product_tip':''}`}>
                                            <Field
                                                className='pes-input-group w-percent total-investment'
                                                name='totalInvestment'
                                                type='text'
                                                component={renderInput}
                                                disabled
                                                showError
                                            />
                                        </span>                                        
                                        <span className='d-inline-block newInvestment ml-10' 
                                            style={{display: productGroupType === ProductGroups.TIP.toLowerCase() ? 'none' : 'inline-block'}}>%</span>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='tlrow row'><div className='col-xs-12 col-empty-2'></div></div>
                </div>
            </div>
        </div>);
};
class FundSwitchSection extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onChangeFund = this._onChangeFund.bind(this);
    }
    static contextTypes = {        
        switchFundOption: PropTypes.string,
        productGroupType: PropTypes.string,
        onChangeSwitchFundOption: PropTypes.func
    };
    _onChangeFund(e, value){
        const name = e.target.name;
        const index = name.match(/\d+(\.\d+)?/)[0];
        let formValues = window.PES.store.getState().form[this.props.form].values;      
        let prop = name.split('.')[1];   
        let total = (!_.isEmpty(value) && !Number.isNaN(Number(value))) ? Number.parseFloat(value) : 0;
        let totalFieldName = (prop == 'newInvestment'? 'totalInvestment' : 'totalSwitch');
        formValues.funds.forEach(function(item, idx) {  
            if(index != idx){
                total +=  Number.isNaN(Number(item[prop])) ? 0 : Number.parseFloat(item[prop]);
            }
        });
        this.props.dispatch(change(this.props.form, totalFieldName, total));
    }
    
    render(){
        const switchFundOption = this.context && this.context.switchFundOption;
        let productGroupType = _.isUndefined(this.props.productGroupType) ? '' :this.props.productGroupType.toLowerCase();
        let titleProductGroupType = (productGroupType===ProductGroups.B34.toLowerCase() || productGroupType===ProductGroups.TIP.toLowerCase())?'Select fund switch type' : 'Select funds switch type'
        return(
            <div className='pes-switch-fund-section'>
                <p className='pes-page-title text-capitalize'>Fund switch</p>
                <div className='pes-table-list ovf-v'>
                    <div className='tlbody'> 
                        <div className='tlrow row'>
                            <div className='tlcell col-xs-5 input-label text-capitalize text-bold'>{titleProductGroupType}</div>
                            <div className='tlcell col-xs-7 input-field'>
                                <Field
                                    name='switchFundOption'
                                    data={[
                                        {value: 'fromSpecifiedFunds', label: 'Switch from specified funds'},
                                        {value: 'rebalanceExistingFunds', label: 'Rebalance existing funds'}
                                    ]}
                                    className='pes-radio-group group-inline text-capitalize'
                                    component={renderRadioGroup}
                                    onChange={this.context.onChangeSwitchFundOption}
                                    showError={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <FieldArray name='funds' component={renderFunds} 
                    onChange={this._onChangeFund} 
                    formName={this.props.form}
                    productGroupType={productGroupType}
                    isSwitch={switchFundOption === 'fromSpecifiedFunds'? true: (switchFundOption === 'rebalanceExistingFunds' ? false : null)} />
            </div> 
        );
    }
}

export default FundSwitchSection;