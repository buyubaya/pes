import React, {PropTypes} from 'react';
import FundInvestTable from '../FundInvestTableRow';
import ProductGroups from '../../../constants/ProductGroups';
class SpecifyPercentageOfInvestmentSection extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    static contextTypes = {
        selectedFunds: PropTypes.array,
        productGroupType: PropTypes.string
    };
    render(){
        let {selectedFunds, productGroupType} = this.context;
        productGroupType = _.isUndefined(productGroupType) ? '' : productGroupType;
        selectedFunds = _.isUndefined(selectedFunds) ? [] : selectedFunds;
        let isRenderSedolCode = true;
        if(productGroupType.toLowerCase() === ProductGroups.B34.toLowerCase() || productGroupType.toLowerCase() === ProductGroups.TIP.toLowerCase()){
            isRenderSedolCode = false;
        }
        return(
            <div className='pes-switch-fund-section'>
                <div className='pes-table-list'>
                    <div className='tlrow row col-empty-2'></div>
                </div>
                {productGroupType.toLowerCase() === ProductGroups.B34.toLowerCase() && selectedFunds.length > 0 &&[
                    <p className='pes-text-belt text-capitalize' key='specify-percentage-of-investment'>Specify percentage of investment</p>,
                    <FundInvestTable key='fund-invest-table' formName={this.props.formName}
                    hasCheckAllowFund={this.props.hasCheckAllowFund}
                    hasCheckSodolCodeFund={this.props.hasCheckSodolCodeFund}
                    isRenderSedolCode={isRenderSedolCode}/>
                ]}
                {productGroupType.toLowerCase() !== ProductGroups.B34.toLowerCase()&&[
                    <p className='pes-text-belt text-capitalize'  key='specify-percentage-of-investment'>Specify percentage of investment</p>,
                    <FundInvestTable key='fund-invest-table' formName={this.props.formName}
                    hasCheckAllowFund={this.props.hasCheckAllowFund}
                    hasCheckSodolCodeFund={this.props.hasCheckSodolCodeFund}
                    isRenderSedolCode={isRenderSedolCode}/>
                ]}
            </div>  
        );
    }
}
export default SpecifyPercentageOfInvestmentSection;