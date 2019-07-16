import React from 'react';
import Button from '../common/Button';
import StringUtils from '../../utils/StringUtils';
import ServicingUrls from '../../constants/ServicingUrls';
import TabIDs from '../../constants/PlanDetailTabs';
import UrlUtils from '../../utils/UrlUtils';
const SearchErrorArea = props => { 
    const {className, content, children, isShow, displayServicingWarning, plan, clear, showsummary, showservicing} = props;

    let servicingUrl = StringUtils.format(ServicingUrls.planDetails, plan.planID, '#' + TabIDs.servicing);
    let detailUrl = StringUtils.format(ServicingUrls.planDetails, plan.planID, '#' + TabIDs.summary);
    servicingUrl = UrlUtils.getActualLink(servicingUrl);
    detailUrl = UrlUtils.getActualLink(detailUrl);
    return (isShow &&
        <div className='pes-table-list pes-error-area has-error'>
            <div className='tlrow'>
                <div className='tlcell col-xs-12 text'>{content.warning}</div>
            </div>
            <div className='tlrow'>
                <div className='tlcell col-xs-12 text'>{content.planNumber} {plan.planID}</div>
            </div>
            {
                plan.warningMessages.map((warningMessage, index) => {
                    return (
                        <div className='tlrow' key={index}>
                            <div className='tlcell col-xs-12 text'>{warningMessage}</div>
                        </div>);
                })
            }    
            <div className='tlrow'>
                <div className='tlcell col-xs-12'>
                    <div className='pes-btn-group'>
                        <Button className='pes-btn pes-btn-default d-inline-block mr-20' onClick={clear} label={content.clearButton} />
                        {displayServicingWarning && <a href={servicingUrl} className='pes-btn pes-btn-default d-inline-block'>{content.servicing}</a>}
                        {!displayServicingWarning && <a href={detailUrl} className='pes-btn pes-btn-default d-inline-block'>{content.details}</a>}
                    </div>
                </div>
            </div>
        </div>  
    );
};


export default SearchErrorArea;

{/* <div className={className}>
    <p className='text'>
        Warning<br/>
        Plan number {plan.planID}<br />
        {
            plan.warningMessages.map((warningMessage, index) => {
                return (<span key={index}>{warningMessage}<br/></span>);
            })
        }                
    </p>
    <div className='pes-btn-group mt-20 clearfix'>
        <Button className='pes-btn pes-btn-default d-inline-block mr-20' onClick={clear} label='Clear' />
        {displayServicingWarning && <Button className='pes-btn pes-btn-default d-inline-block' onClick={() => showservicing(plan)} label='Servicing' />}
        {!displayServicingWarning && <Button className='pes-btn pes-btn-default d-inline-block' onClick={() => showsummary(plan)} label='Details' />}
    </div>
</div>   */}