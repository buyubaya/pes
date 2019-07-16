import React, {PropTypes} from 'react';
import {get} from 'lodash';

import Bond34 from './servicing/home/Bond34';
import GenericBond from './servicing/home/GenericBond';
import GenericPension from './servicing/home/GenericPension';
import MutualFund from './servicing/home/MutualFund';
import Tip from './servicing/home/Tip';
import Tai from './servicing/home/Tai';

class ServicingHomeTab extends React.Component{ 
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }
    render(){
        return (<div>
            <Bond34 changeTab={this.props.changeTab} />
            <GenericBond changeTab={this.props.changeTab} />
            <GenericPension changeTab={this.props.changeTab} />
            <MutualFund changeTab={this.props.changeTab} />
            <Tai changeTab={this.props.changeTab} />
            <Tip />            
        </div>);
    }
}


export default ServicingHomeTab;