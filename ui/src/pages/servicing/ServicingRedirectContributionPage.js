import React, { PropTypes } from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {formValueSelector, reduxForm, change, untouch, SubmissionError} from 'redux-form';

import * as ContentTypes from '../../constants/ContentTypes';
import * as ServicingApi from '../../api/ServicingApi';

import HtmlUtils from '../../utils/HtmlUtils';
import ButtonGroup from '../../components/servicing/ButtonGroup';
import FundNameSearchRow from '../../components/servicing/FundNameSearchRow';
import FundListAddRow from '../../components/servicing/FundListAddRow';
import FundInvestTable from '../../components/servicing/FundInvestTableRow';
import ProductGroups from '../../constants/ProductGroups';
import _ from 'lodash';
import RedirectContributionUtils from './RedirectContributionUtils';
import TransitionUtils from '../../utils/TransitionUtils';
import FormErrorArea from '../../components/common/FormErrorArea';


class ServicingRedirectContributionPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onAddFunds = this.onAddFunds.bind(this);
        this.state={
            investmentFunds:[]
        };
        this.searchFunds = this.searchFunds.bind(this);
        this.onDeleteFunds = this.onDeleteFunds.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
	}

	static propTypes = {
		content: PropTypes.object,
		plan: PropTypes.object,
		api: PropTypes.object.isRequired
	};

	static childContextTypes = {
        dispatch: PropTypes.any,
        content: PropTypes.object,
        plan: PropTypes.object,
        onAddFunds: PropTypes.func,
        onDeleteFunds: PropTypes.func
    }
    getChildContext(){
        return {
            dispatch: this.props.dispatch,
			content: this.props.content && this.props.content[ContentTypes.SERVICING_REDIRECT_CONTRIBUTION],
            plan: this.props.plan,
            onAddFunds: this.onAddFunds,
            onDeleteFunds: this.onDeleteFunds
		};
    }

    componentDidMount() {
        this.props.dispatch(change(this.props.form, 'networkId', 1));
    }
    onAddFunds(items){
        if(items.investmentFunds.length > 0){
            let investmentFunds = this.state.investmentFunds;
            let invesFund = investmentFunds.filter(function(item){
                return items.investmentFunds.indexOf(item.value) === -1;
            });

            let selectedFunds = investmentFunds.filter(function(item){
                return items.investmentFunds.indexOf(item.value) > -1;
            });
            
            selectedFunds = _.isUndefined(this.props.selectedFunds)? selectedFunds : [...this.props.selectedFunds, ...selectedFunds];
            
            this.setState({investmentFunds: invesFund});
            this.props.dispatch(change(this.props.form, 'selectedFunds', selectedFunds));
            this.props.dispatch(change('fundListAddRow','investmentFunds', null));
            this.props.dispatch(untouch('fundListAddRow','investmentFunds'));
        }else{
            throw new SubmissionError({ investmentFunds: 'Add is requested but no fund is selected. Please select at least one fund to add to the contribution list'});
        }
    }
    onDeleteFunds(e){
        let formValues = window.PES.store.getState().form[this.props.form].values;        
        let keepFunds = formValues.selectedFunds.filter(function(item){
            return item['checkInput']!==true;
        });
        let holdInvesFund = this.state.holdInvesFund;
        let selected=[];
        let total = 0;
        _.forEach(keepFunds, function(item){
            total += _.isUndefined(item['percentInv']) ? 0 : Number(item['percentInv']);
            selected.push(item.value);
        });
        let invesFund = holdInvesFund.filter(function(item){
            return selected.length > 0 ? selected.indexOf(item.value) === -1 : true;
        });
        this.setState({investmentFunds: invesFund});
        this.props.dispatch(change(this.props.form, 'selectedFunds', keepFunds));
        this.props.dispatch(change(this.props.form, 'totalPercentInvestment', total));
    }
    _onSubmit(e){
        const form = window.PES.store.getState().form[this.props.form].values;
        const plan = this.props.plan;
        const requestData = RedirectContributionUtils.DataRequest(form, plan);
        this.props.api.submitRedirectContribution(requestData).then((result) => {        
            let url = `/plan-details/${plan.planDetail.planNumber}#servicing-history`;
            TransitionUtils.transitionTo(url);
        });
    }

    searchFunds(values){
        let productGroupType = this.props.plan.productGroupType.toLowerCase();
        let productType = this.props.plan.productType;
        return new Promise((resolve, reject) => {
            this.props.api.searchFunds({productType: productType, fundName: values.searchText}).then((res) => {
                if(res.length > 0){        
                    let invFunds = res.map((itm,idx)=>{
                        let label, value;
                        if(productGroupType !== ProductGroups.B34.toLowerCase()){
                            let whitespaces = _.replace(itm.blankStringForPadding, /&nbsp;/g, '\u00A0');
                            value = `${itm.fundName.toLowerCase().replace(/[ ]/g,'_')}_${itm.sedolCode}`;
                            label = `${itm.fundName} ${whitespaces} ${itm.sedolCode}\u00A0\u00A0${itm.isPanelFund}`;
                        }else{
                            value = `${itm.fundName.toLowerCase().replace(/[ ]/g,'_')}`;
                            label = itm.fundName;
                        }
                        return _.merge({}, itm, 
                        {
                            label: label,
                            value: value,
                            percentInv: 0,
                        });
                    });
                    let funds = this.props.funds;
                    let investmentFunds = invFunds.filter(function(item){
                        let itm = _.find(funds, function(f,i){
                            return f.name == item.fundName;
                        });
                        return _.isUndefined(itm);
                    });
                    let selectedFunds = this.props.selectedFunds;
                    investmentFunds = investmentFunds.filter(function(item){
                        let itm = _.find(selectedFunds, function(f,i){
                            return f.value == item.value;
                        });
                        return _.isUndefined(itm);
                    });
                    if(investmentFunds.length==0){
                        reject({'message': 'Fund(s) you are searching for is/are are already added to your contribution list'});
                    }else{
                        this.setState({investmentFunds: investmentFunds, holdInvesFund: invFunds});
                        resolve(res);
                    }                    
                }else{
                    this.setState({investmentFunds: [], holdInvesFund: []});
                    reject({'message': 'No fund found with the given search criteria. Please try again.'});
                }
            });
        });
    }

    render(){
        const content = _.get(this.props, `content.${ContentTypes.SERVICING_REDIRECT_CONTRIBUTION}`);
        const {valid, dirty, submitFailed} = this.props;
        let showSubmit;
        if(!_.isUndefined(this.props.switchFundOption) && this.props.switchFundOption ==='fromSpecifiedFunds'){
            showSubmit =  (!_.isUndefined(this.props.selectedFunds) && this.props.selectedFunds.length > 0) ? true : false;
        }
        return(
            <form onSubmit={this.props.handleSubmit}>
                <div className='pes-servicing-switch-fund-page pes-bg-grey'>
                    {
                        submitFailed && 
                        <FormErrorArea title='Please correct the following' error={this.props.error} />
                    }
                    <div className='pes-switch-fund-section'>
                        <p className='pes-page-title text-capitalize'>
                            {_.get(content, 'redirectContribution')}
                        </p>
                        <div className='pes-table-list ovf-v'>
                            <div className='tlbody'>   
                                <div className='tlrow'>
                                    <div className='tlcell col-xs-12 text-bold lh-input'>
                                        {_.get(content, 'specifyContributionTitle')}
                                    </div>
                                </div>
                                <div className='tlrow'>
                                    <div className='tlcell col-xs-12 lh-input'>
                                        {_.get(content, 'specifyContributionDescription')}
                                    </div>
                                </div>
                                
                                <FundNameSearchRow searchFunds={this.searchFunds}/>

                                <FundListAddRow 
                                    investmentFundLabel='Investment Funds'
                                    showHeader={this.state.investmentFunds.length > 0}
                                    investmentFunds={this.state.investmentFunds}
                                    />
                            </div>    
                        </div>
                    </div>  

                    <FundInvestTable formName={this.props.form} isRenderSedolCode={true}/>  

                    <ButtonGroup 
                        className='pes-btn-bottom-area' 
                        showSubmit={dirty&&showSubmit} 
                        isFormValid={valid} 
                        onSubmit={this._onSubmit}
                        modalCancelTitle={_.get(content, 'redirectContribution')}
                        modalSubmitTitle={_.get(content, 'redirectContribution')}
                        servicingType='contribution'
                    />
                        
                </div>
            </form>
        );
    }
}

const selector = formValueSelector('servicingRedirectRegularContribution');
function mapStateToProps(state, ownProps) {
	return {
		content: state.content,
        plan: state.plan,
        selectedFunds: selector(state, 'selectedFunds')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators(ServicingApi, dispatch)
	};
}

const validateForm= (values, props) => {
    const errors = {};
    const selectedFunds = _.isUndefined(values.selectedFunds)? [] : values.selectedFunds;
    
    if(selectedFunds.length > 0){
        const fundErrs = [];
        selectedFunds.forEach((itm,idx)=>{
            let n = (!_.isUndefined(itm.percentInv) && !_.isEmpty(itm.percentInv)) ? Number.parseFloat(itm.percentInv) : 0;
            if(n === 0){            
                const _err={percentInv:{_error:'The <i>Percent Invested</i> for each fund must be between 1 and 100'}};
                fundErrs[idx]=_err;
            }
        });
        if(fundErrs.length > 0){
            errors.selectedFunds = fundErrs;
        }else{
            let totalPercentInvestment = !_.isUndefined(values) && !_.isUndefined(values.totalPercentInvestment) ? values.totalPercentInvestment : 0;
            if(!_.isNull(totalPercentInvestment) && totalPercentInvestment != 100){
                errors.totalPercentInvestment="<i>Percent Invested</i> - percentage for all funds must add up to 100%";
            }
        }
    }else{
        errors._error='At least one fund should be specified for redirection';
    }
    return errors;
};
const warn = (values, props) => {
    const warnings = {};
    const funds=['Zurich MMgr Protected Profits', 'Zurich Tracker Protected Profits'];
    const selectedFunds = _.isUndefined(values.selectedFunds)? [] : values.selectedFunds;
    const wFunds = [];
    let mess_warn = values.networkId === 1 ? 'Redirection to a Protected Profits Fund is not allowed if initial commission sacrifice is greater than 1.0%.'
                     : (values.networkId === 2 ? 'You cannot redirect future contributions to the Multimanager, Tracker or Threadneedle Protected Profits funds. Please amend your selection.' : undefined);
    selectedFunds.forEach((itm,idx)=>{
        if(funds.includes(itm.fundName)){            
            const _warn ={percentInv:{_warning: mess_warn}}; 
            wFunds[idx]=_warn;
        }
    });
    if(wFunds.length > 0){
        warnings.selectedFunds = wFunds;
    }
    return warnings;
};
const submit = values => {};
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: 'servicingRedirectRegularContribution',
        validate:validateForm,
        warn,
        onSubmit: submit
    })
)(ServicingRedirectContributionPage);