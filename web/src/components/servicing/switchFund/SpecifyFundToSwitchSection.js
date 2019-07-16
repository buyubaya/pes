import React, {PropTypes} from 'react';
import FundNameSearchRow from '../FundNameSearchRow';
import FundListAddRow from '../FundListAddRow';
import ProductGroups from '../../../constants/ProductGroups';
class SpecifyFundToSwitchSection extends React.Component {
    static contextTypes = {
        productGroupType: PropTypes.string,
        investmentFunds: PropTypes.array,
        onSearchFunds: PropTypes.func
    };
    render(){
        const {onSearchFunds, investmentFunds, productGroupType} = this.context;
        let _productGroupType = productGroupType.toLowerCase();
        let lbSpecifyFunds='Specify funds and percentages to switch into',
        showHeader=true;
        if(_productGroupType === ProductGroups.B34.toLowerCase() || _productGroupType === ProductGroups.TIP.toLowerCase()){
            lbSpecifyFunds='Specify Funds to switch into';
            showHeader=false;
        }
        return(
            <div className='pes-switch-fund-section'>
                <p className='pes-text-belt text-capitalize'>{lbSpecifyFunds}</p>
                <div className='pes-table-list ovf-v'>
                    <div className='tlbody'>   
                        <div className='tlrow'>
                            <div className='tlcell col-xs-12'>Enter all or part of the fund name and any match(es) will then appear in the 'Investment Funds' list below.</div>
                        </div>                        
                        <FundNameSearchRow searchFunds={onSearchFunds} productGroup={productGroupType} />
                        <FundListAddRow investmentFunds={investmentFunds}  
                            investmentFundLabel='Investment Fund'
                            showHeader={showHeader}/>
                    </div>    
                </div>
            </div>   
        );
    }
}

export default SpecifyFundToSwitchSection;