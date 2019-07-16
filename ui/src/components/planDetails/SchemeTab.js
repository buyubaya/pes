import React, { PropTypes } from 'react';
import {get} from 'lodash';



class SchemeTab extends React.Component {    
    static contextTypes = {
        content: PropTypes.object,
        plan: PropTypes.object
    }  
    
    render(){
        const planDetails = get(this.context, 'plan.planDetail');
        const tabContent = get(this.context, 'content.schemeTab');
        let schemeLink = get(this.context, 'plan.schemeLink');

        if(schemeLink === true){
            return (
                    <div className='pes-table-area'>
                        <div className='pes-table-list'>                   
                            <div className='tlbody'> 
                                <div className='tlrow row'>
                                    <div className='tlcell col-xs-9'>{tabContent.noScheme}</div>                
                                </div>
                            </div>
                        </div>
                    </div>
            );
        }
        
        if(!planDetails.schemeName){
            return (
                <div className='pes-table-area'>
                    <div className='pes-table-list'>                   
                        <div className='tlbody'> 
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-9'>{tabContent.noSchemeName}</div>                
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else                
        {
            return (
                <div className='pes-table-area'>
                    <div className='pes-table-list'>                   
                        <div className='tlbody'>  
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{tabContent.schemeName}</div>
                                <div className='tlcell col-xs-4'>{planDetails.schemeName}</div>
                            </div>
                            <div className='tlrow row'>
                                <div className='tlcell col-xs-4'>{tabContent.schemeNumber}</div>
                                <div className='tlcell col-xs-4'>{planDetails.schemeNumber}</div>
                            </div>                                                                    
                        </div>
                    </div>
                </div>
            );            
        }                      
    }    
      
}

export default SchemeTab;