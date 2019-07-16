
export const notInRange = (start, end, msg) => value => value >= start && value <= end ? undefined : msg;
//export const notInRangePercent = notInRange(0, 100, 'The percentage being invested in &#x0003C;fund&#x0003E; must be between 1% and 100%');
export const notInRangePercent = notInRange(0, 100, 'The percentage being invested in must be between 1% and 100%');
export const notInRangePercent2 = notInRange(0, 100, 'The switch percentage for a fund must be between 1% and 100 %');
export const notInRangePercent3 = notInRange(0, 100, 'The <i>Percent Invested</i> for each fund must be between 1 and 100');
export const notInRangePercentTip = notInRange(0, 100, 'The Percent Invested for each fund must be between 1 - 100');
export const notAllowSpecialCharacters = value =>{
    const charPattern = /^[a-zA-Z0-9 '\-\.]*$/;
    if(!!value){
        return charPattern.test(value) ? undefined : 'No fund found with the given search criteria. Please try again.';
    }
};
export const notInteger1 = value => {
    return (value && !Number.isInteger(Number(value))) ? 'The <i>Percent Invested</i> for each fund must be between 1 and 100' : undefined;
};
export const notInteger2 = value => {
    return (value && !Number.isInteger(Number(value))) ? 'The switch percentage for a fund must be between 1% and 100 %' : undefined;
};
export const notIntegerTip = value => {
    return (value && !Number.isInteger(Number(value))) ? 'The Percent Invested for each fund must be between 1 - 100' : undefined;
};
const notAllowFunds=["B42XLZ6", "ME03C"];
export const checkAllowFund = (value, allValues, props, name) =>{
    if (!!value) {
        const productGroupType = props.productGroupType;
        const fundCode = _.get(allValues,name.split('.')[0]).fundCode;
        let item;
        if(_.isUndefined(_.get(allValues,name.split('.')[0]).name)){/*is out*/
            let iSINCodes = _.get(allValues,name.split('.')[0]).iSINCodes;
            item = notAllowFunds.find(function(element) {
                return iSINCodes.indexOf(element)>=0;
            });
        }else{
            if(_.isUndefined(fundCode)) return undefined;
            item = notAllowFunds.find(function(element) {
                return element === fundCode;
            });
        }
        return (_.isUndefined(item)==false && parseInt(value)>0) ? 'You cannot switch any money into or out of this fund.':undefined;
    }
}

// const fill100SedolCode=['B0PMPN8', 'B1W5J35', 'A041','B039'];//SEDOL: B0PMPN8, B1W5J35; fundCode: A041, B039
// export const checkSodolCodeFund = (value, allValues, props, name) =>{
//     if (!!value) {
//         const productGroupType = props.productGroupType;
//         let isIn = false;
//         let item;
//         if(_.isUndefined(_.get(allValues,name.split('.')[0]).name)){
//             let iSINCodes = _.get(allValues,name.split('.')[0]).iSINCodes;
//             isIn = true;
//             item = fill100SedolCode.find(function(element) {
//                 return iSINCodes.indexOf(element)>=0;
//             });
//         }else{
//             const fundCode = _.get(allValues,name.split('.')[0]).fundCode;
//             item = fill100SedolCode.find(function(element) {
//                 return element === fundCode;
//             });
//         }
        
//         return (_.isUndefined(item)==false && parseInt(value)>0 && parseInt(value) !== 100) ? 
//             (isIn ? "As you are switching into the distribution fund, you must switch 100% of units from all existing funds." 
//                 : "As you are switching out of the distribution fund, you must switch 100% of units to one or more other funds.")
//             :undefined;
//     }
// }