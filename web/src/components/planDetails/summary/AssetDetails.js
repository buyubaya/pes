import React, { PropTypes } from 'react';
import { get } from 'lodash';
import HtmlUtils from '../../../utils/HtmlUtils';

class AssetDetails extends React.Component {
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }

    render(){
        const tabContent = get(this.context, 'content.summaryTab');
        const planDetail = get(this.context, 'plan.planDetail');

        return(
            <div className='asset-details-area'>
                <div className='pes-text-belt'>{tabContent.assetDetails}</div>
                {
                    planDetail && planDetail.transitionEnabled &&
                    <div className='section-inner'>
                        {HtmlUtils.htmlToReact(tabContent.assetDetailsMessage)}
                    </div>
                }
            </div>
        );
    }
}

export default AssetDetails;