import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {get} from 'lodash';

import ContentApiUtils from '../../api/ContentApiUtils';

import * as ServicingActions from '../../actions/ServicingActions';
import * as ServicingApi from '../../api/ServicingApi';

import * as ContentTypes from '../../constants/ContentTypes';
import ServicingUrls from '../../constants/ServicingUrls';
import StringUtils from '../../utils/StringUtils';
import DateFormat from '../common/DateFormat';
//import TabIDs from '../../constants/PlanDetailTabs';
import UrlUtils from '../../utils/UrlUtils';
import EnvironmentUtils from '../../utils/EnvironmentUtils';
import moment from 'moment';


class ServicingHistoryTab extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
		content: PropTypes.object,
        plan: PropTypes.object,
        history: PropTypes.array,
		api: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
    };

    buildDetailLink = function(content, item){
        let planNumber = get(this.props, 'plan.planDetail.planNumber');
        //Check request type to build correct servicing url
        let url = StringUtils.format(ServicingUrls.historyDetails, planNumber, item.id);
        url = UrlUtils.getActualLink(url);
        return (<a href={url} className='has-icon-arrow-right'>{content.details}</a>);
    }

    displayData = function(tabContent, history){
        const environment = EnvironmentUtils.get('environment');
        let goLiveDate = environment.epoch;
        goLiveDate = moment.unix(goLiveDate).format('YYYY/MM/DD');

        return (tabContent != undefined && <div className='pes-table-area'>
            <table className='pes-table'>
                <thead>
                    <tr>
                        <th className='text-capitalize'>{tabContent.requestDate}</th>
                        <th className='text-capitalize'>{tabContent.requestType}</th>
                        <th>{tabContent.refNo}</th>
                        <th className='text-capitalize'>{tabContent.userName}</th>
                        <th className='text-capitalize'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history && history.map((item, index) => {
                            const eventTimestamp = moment(item.eventTimestamp).utc().format('YYYY/MM/DD');
                            const isBefore = moment(eventTimestamp).isBefore(goLiveDate);  
                            
                            return (
                                <tr key={index}>
                                    <td><DateFormat>{item.eventTimestamp}</DateFormat></td>
                                    <td>{item.servicingActionName}</td>
                                    <td>{item.servicingReferenceNumber}</td>
                                    <td>{item.userInfo.userID}</td>
                                    <td>{!isBefore && this.buildDetailLink(tabContent, item)}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>);
    }

    displayEmptyData = function(tabContent){
        return (tabContent ? <div className='pes-table-area'>
            <table className='pes-table'>
                <tbody>
                    <tr>
                        <td>{tabContent.noData}</td>
                    </tr>
                </tbody>
            </table>
        </div>: <div></div>);
    }

    render(){
        const tabContent = get(this.props, 'content.planDetails.historyTab');
        const history = get(this.props, 'history');
        return (history != undefined && history.length > 0) ? this.displayData(tabContent, history) : this.displayEmptyData(tabContent);
    }
}


function mapStateToProps(state, ownProps) {
	return {
        content: state.content,
        plan: state.plan,
		history: state.servicing.history
	};
}

function mapDispatchToProps(dispatch) {
	return {
		api: bindActionCreators(ServicingApi, dispatch),
		actions: bindActionCreators(ServicingActions, dispatch)
	};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServicingHistoryTab);