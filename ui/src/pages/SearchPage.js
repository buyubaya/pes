import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import SearchForm from '../components/searchPlan/SearchForm';
import SearchTable from '../components/searchPlan/SearchTable';
import SearchErrorArea from '../components/searchPlan/SearchErrorArea';
import SearchDescription from '../components/searchPlan/SearchDescription';
import IconInfo from '../components/common/IconInfo';

import * as PlanActions from '../actions/PlanActions';
import * as PlanApi from '../api/PlanApi';

import ContentApiUtils from '../api/ContentApiUtils';
import TransitionUtils from '../utils/TransitionUtils';

import * as ContentTypes from '../constants/ContentTypes';
import * as SessionStorage from '../utils/SessionStorage';
import * as PageActions from '../actions/PageActions';
import StringUtils from '../utils/StringUtils';

class SearchPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showWarning: false,
            displayServicingWarning: false,
            plan: {}
        };             
    }

	componentDidMount() {  
        let searchFormData = SessionStorage.get('SearchFormSession');
        if(searchFormData)
        {
            //call API get plans
            let data = StringUtils.removeEmptyValues(JSON.parse(searchFormData));
            this.props.api.getPlans({ method: 'POST', requestData: data }).then((res) => {
                this.props.actions.searchPlansSuccess(res);   });   

        }
    }

    handleSubmit(values) {
        let objPlanIDs = {planIDs: []};               
        if(values){
            Object.keys(values).forEach((prop) => {         
                objPlanIDs.planIDs.push(values[prop]);                
            });

            //store search form to session.     
            if(objPlanIDs.planIDs.length > 0){
                SessionStorage.set('SearchFormSession', JSON.stringify(objPlanIDs));
                let data = StringUtils.removeEmptyValues(objPlanIDs);      
                if(data.planIDs.length > 0){

                    this.props.api.getPlans({ method: 'POST', requestData: data }).then((res) => {
                        this.props.actions.searchPlansSuccess(res); 
                    });   
                }
                else{
                    this.props.actions.clearPlans();
                }  
            }           
        }
        this.clear();             
    }

    handleReset(){
        window.PES.dispatch(PageActions.resetForm());
        let hasSession = SessionStorage.get(ContentTypes.SEARCH_FORM_SESSION);
        if(hasSession){
            SessionStorage.remove(ContentTypes.SEARCH_FORM_SESSION);
        }
        this.clear();
    }

    showsummary(plan){
        this.setState({ 
            showWarning: false, 
            displayServicingWarning: false,
            plan: plan 
        });
        SessionStorage.remove('currentTab');
        //TransitionUtils.navigateTo('/plan-details/' + plan.planID);
    }

    showdetailswarning(plan){
        //show warning
        this.setState({ 
            showWarning: true,
            displayServicingWarning: false,
            plan: plan 
        });
    }

    showservicing(plan){
        this.setState({ 
            showWarning: false, 
            displayServicingWarning: false,
            plan: plan 
        });
        SessionStorage.set('currentTab', 'servicing');
        //TransitionUtils.navigateTo('/servicings/' + plan.planID);
    }

    showservicingwarning(plan){
        //show warning
        this.setState({ 
            showWarning: true, 
            displayServicingWarning: true,
            plan: plan 
        });
    }

    clear(){
        this.setState({ 
            showWarning: false, 
            displayServicingWarning: false,
            plan: {} 
        });
    }    
    
    getInitialValues()
    {
        let searchFormData = SessionStorage.get('SearchFormSession');  

        if(searchFormData){
            const obj = JSON.parse(searchFormData);                

            return{
                initialValues: {
                    planNumber01: obj.planIDs[0],
                    planNumber02: obj.planIDs[1],
                    planNumber03: obj.planIDs[2],
                    planNumber04: obj.planIDs[3],
                    planNumber05: obj.planIDs[4] 
                }
            };
        }
        return {            
            initialValues: {
                planNumber01: '',
                planNumber02: '',
                planNumber03: '',
                planNumber04: '',
                planNumber05: '' 
            }
          };

    }
    
    render() {
        const content = this.props.content[ContentTypes.SEARCH_PLAN];

        const searchFormInitialValues = this.getInitialValues();
        return (
        <div className='container'>

            {/* <p className='pes-intro-title color-link'>Plan Enquiry</p> */}
            <p className='pes-page-title no-line p-0'>Plan Enquiry</p>

            <p className='pes-text-belt text-bold'>
                Please enter up to five plan numbers
                <IconInfo section='#C1' className='ml-10' />                
            </p>

            <div className='pes-bg-grey'>
                <div className='pes-search-plan-area'>
                    <SearchForm {...searchFormInitialValues} onSubmit={::this.handleSubmit} plans={this.props.plans} clear={::this.handleReset} />

                    <SearchErrorArea className='pes-error-area has-error d-inline-block' 
                        content={content} 
                        isShow={this.state.showWarning} 
                        displayServicingWarning={this.state.displayServicingWarning} 
                        plan={this.state.plan} 
                        clear={::this.clear} 
                        showsummary={::this.showsummary} 
                        showservicing={::this.showservicing} />
                </div>

                {this.props.plans.length > 0 && <SearchDescription plans={this.props.plans} />}

                {this.props.plans.length > 0 && <SearchTable plans={this.props.plans} 
                    content={content} 
                    showdetailswarning={::this.showdetailswarning} 
                    showservicingwarning={::this.showservicingwarning} 
                    showsummary={::this.showsummary} 
                    showservicing={::this.showservicing} />}
            </div>

        </div>
        );
    }
}

SearchPage.propTypes = {
	content: PropTypes.object,
	plans: PropTypes.array,
	api: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		plans: state.searchPlan.plans,
		content: state.content
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators(PlanApi, dispatch),
		actions: bindActionCreators(PlanActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);