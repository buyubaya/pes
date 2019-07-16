import React, {PropTypes} from 'react';
import {get} from 'lodash';

import Payments from './ipb/Payments';
import WithdrawalsSearchFilter from './ipb/WithdrawalsSearchFilter';

class IpbTab extends React.Component {
    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object,
        id: PropTypes.string
    }

    render() {
        return (
            <div>
                <Payments />
                <WithdrawalsSearchFilter />
            </div>
        );
    }
}

export default IpbTab;