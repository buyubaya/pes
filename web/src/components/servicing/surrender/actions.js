import ProductGroups from '../../../constants/ProductGroups';
import {FIELD_NAMES, ERROR_MESSAGES, OPTIONS_DATA} from './constants';
import {get as _get, set as _set, isEmpty as _isEmpty, values as _values, isEqual as _isEqual, forEach as _forEach, reduce as _reduce, isUndefined as _isUndefined, isNull as _isNull} from 'lodash';
import {SubmissionError} from 'redux-form';


export const submit = (values, dispatch, props) => {
    let errors = {};
    let _error = undefined;
    let mandatoryMissing = false;
    
    // const productGroup = _get(props, 'plan.productGroupType');
    // const surrenderType = values[FIELD_NAMES.surrenderType];
    // const partialSurrenderType = values[FIELD_NAMES.partialSurrenderType];
    // const specifyFunds = _get(values, `${FIELD_NAMES.specifyFunds}`);
    // const totalSurrenderAmount = values[FIELD_NAMES.totalSurrenderAmount];
    const surrenderType = values[FIELD_NAMES.surrenderType];
    const partialSurrenderType = values[FIELD_NAMES.partialSurrenderType];
    const totalSurrenderAmount = values[FIELD_NAMES.totalSurrenderAmount];
    const productGroup = _get(props, 'plan.productGroupType');
    const productType = _get(props, 'plan.productType');
    const specifyFunds = _get(values, `${FIELD_NAMES.specifyFunds}`);
    const B34PartialSurrenderType = values[FIELD_NAMES.B34PartialSurrenderType];
    const paymentType = values[FIELD_NAMES.paymentType];


    /******************** BEGIN SURRENDER SECTION CHECK ********************/
    // MANDATORY MISSING
    if(
        _isEmpty(values[FIELD_NAMES.surrenderType]) ||
        // (
        //     (values[FIELD_NAMES.surrenderType] === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
        //     _isEmpty(values[FIELD_NAMES.partialSurrenderType])
        // ) ||
        _isEmpty(values[FIELD_NAMES.paymentType])
    )
    {
        mandatoryMissing = true;
        _error = ERROR_MESSAGES.mandatoryMissing;
    }

    // SURRENDER TYPE
    if(_isEmpty(surrenderType)){
        mandatoryMissing = true;
        // _set(errors, FIELD_NAMES.surrenderType, ERROR_MESSAGES.surrenderTypeRequired);
        _set(errors, FIELD_NAMES.surrenderType, ' ');
    }

    // PARTIAL SURRENDER TYPE
    if(
        (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
        _isEmpty(partialSurrenderType)
    )
    {
        mandatoryMissing = true;
        if(productGroup === ProductGroups.TIP || productGroup === ProductGroups.B34){
            _set(errors, FIELD_NAMES.partialSurrenderType, ' ');
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
        else {
            _set(errors, FIELD_NAMES.partialSurrenderType, ERROR_MESSAGES.partialSurrenderTypeRequired);
        }
    }

    // B34 PARTIAL SURRENDER TYPE
    if(
        productGroup === ProductGroups.B34 &&
        (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
        (partialSurrenderType === OPTIONS_DATA.partialSurrenderType.acrossAllFund.value) &&
        _isEmpty(B34PartialSurrenderType)
    )
    {
        mandatoryMissing = true;
        _set(errors, FIELD_NAMES.B34PartialSurrenderType, ERROR_MESSAGES.partialSurrenderTypeRequired);
    }

    // TIP PARTIAL SURRENDER TYPE
    if(
        productGroup === ProductGroups.TIP &&
        productType == 'A00035' &&
        (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
        (partialSurrenderType === OPTIONS_DATA.partialSurrenderType.acrossAllFund.value) &&
        _isEmpty(B34PartialSurrenderType)
    )
    {
        mandatoryMissing = true;
        _set(errors, FIELD_NAMES.B34PartialSurrenderType, ERROR_MESSAGES.partialSurrenderTypeRequired);
    }


    // PAYMENT TYPE
    if(_isEmpty(paymentType)){
        mandatoryMissing = true;
        // _set(errors, FIELD_NAMES.paymentType, ERROR_MESSAGES.paymentTypeRequired);
        _set(errors, FIELD_NAMES.paymentType, ' ');
    }


    // TOTAL SURRENDER AMOUNT
    let totalSurrenderAmountCalculated = 0;
    if(
        surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value &&
        // partialSurrenderType === '_proportionately_ACROSS_ALL_FUNDS' &&
        partialSurrenderType === OPTIONS_DATA.partialSurrenderType.fromSpecificFund.value &&
        specifyFunds &&
        specifyFunds.length > 0
    )
    {
        _forEach(specifyFunds, (item, index) => {
            const surrenderAmount = item[FIELD_NAMES.surrenderAmount];
            const currentValue = item[FIELD_NAMES.currentValue];

            if(
                surrenderAmount && Number(surrenderAmount) &&
                currentValue && Number(currentValue)
            )
            {
                if(Number(surrenderAmount) > Number(currentValue)){
                    _set(errors, `${FIELD_NAMES.specifyFunds}[${index}].${FIELD_NAMES.surrenderAmount}`, ERROR_MESSAGES.surrenderAmountGreaterThanCurrentValue);
                }
            }

            if(surrenderAmount && isNaN(surrenderAmount)){
                _set(errors, `${FIELD_NAMES.specifyFunds}[${index}].${FIELD_NAMES.surrenderAmount}`, ERROR_MESSAGES.totalSurrenderAmountNotNumber);
            }
            
            if(surrenderAmount > 0 && Number(surrenderAmount)){
                totalSurrenderAmountCalculated += Number(surrenderAmount);
            }
        });
    }

    if(
        surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value &&
        partialSurrenderType === OPTIONS_DATA.partialSurrenderType.fromSpecificFund.value &&
        (totalSurrenderAmountCalculated !== Number(totalSurrenderAmount))
    )
    {
        _set(errors, `${FIELD_NAMES.totalSurrenderAmount}`, ERROR_MESSAGES.surrenderAmountComparision);
    }

    // TOTAL SURRENDER AMOUNT MISSING
    if(
        (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
        _isEmpty(totalSurrenderAmount)
    )
    {
        mandatoryMissing = true;
        
        if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
            _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.totalSurrenderAmountRequired);
        }
        else {
            _set(errors, FIELD_NAMES.totalSurrenderAmount, ' ');
        }

        if(productGroup === ProductGroups.B34 || productGroup === ProductGroups.TIP){
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
    }
    /******************** END SURRENDER SECTION CHECK ********************/


    /******************** CHECK PAYEE DETAILS MISSING ********************/
    const accountHolderName = _get(values, 'payeeDetails.accountHolderName');
    const chequeReceiver = _get(values, 'payeeDetails.payableTo');
    const bankName = _get(values, 'payeeDetails.bankName');
    const branchName = _get(values, 'payeeDetails.branchName');
    const sortCode = _get(values, 'payeeDetails.sortCode');
    const accountNumber = _get(values, 'payeeDetails.accountNumber');
    const buildingNumber = _get(values, 'payeeDetails.buildingNumber');
    const paymentToOthers = _get(values, 'payeeDetails.notPlanHolder');
    

    if(paymentType === OPTIONS_DATA.paymentType.bankTransfer.value){
        if(_isEmpty(accountHolderName)){
            if(productGroup === ProductGroups.GMF){
                _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.accountHolderNameRequired);
            }
            else {
                _set(errors, 'payeeDetails.accountHolderName', ' ');
                _error = ERROR_MESSAGES.mandatoryMissing;
            }
        }
    
        if(_isEmpty(bankName)){
            _set(errors, 'payeeDetails.bankName', ' ');
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
    
        if(_isEmpty(branchName)){
            _set(errors, 'payeeDetails.branchName', ' ');
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
    
        if(_isEmpty(sortCode)){
            _set(errors, 'payeeDetails.sortCode', ' ');
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
    
        if(_isEmpty(accountNumber)){
            _set(errors, 'payeeDetails.accountNumber', ' ');
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
    }
    else {
        if(_isEmpty(chequeReceiver)){
            if(productGroup === ProductGroups.GMF){
                _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.accountHolderNameRequired);
            }
            else {
                _set(errors, 'payeeDetails.payableTo', ' ');
                _error = ERROR_MESSAGES.mandatoryMissing;
            }
        }
    }

    if(
        (
            _isUndefined(paymentToOthers) || 
            _isNull(paymentToOthers)
        ) && 
        productGroup !== ProductGroups.TIP
    ){
        if(productGroup === ProductGroups.GMF){
            _set(errors, 'payeeDetails.notPlanHolder', ERROR_MESSAGES.paymentToOthersRequired);
        }
        else {
            _set(errors, 'payeeDetails.notPlanHolder', ' ');
            _error = ERROR_MESSAGES.mandatoryMissing;
        }
    }


    // ACCOUNT HOLDER NAME FORMAT
    if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.TIP){
        if(accountHolderName && !/^[a-zA-Z '\\-\\.]*$/.test(accountHolderName)){
            if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
                _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.accountHolderNameFormat);
            }
            else if(productGroup === ProductGroups.TIP){
                _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.tipAccountHolderNameFormat);
            }
        }
    
        if(chequeReceiver && !/^[a-zA-Z '\\-\\.]*$/.test(chequeReceiver)){
            if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
                _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.accountHolderNameFormat);
            }
            else if(productGroup === ProductGroups.TIP){
                _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.tipChequeReceiverFormat);
            }
        }
    }

    if(productGroup === ProductGroups.B34){
        if(accountHolderName && !/^[a-zA-Z0-9 '\\-\\.]*$/.test(accountHolderName)){
            _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.accountHolderNameFormat);
        }
    
        if(chequeReceiver && !/^[a-zA-Z0-9 '\\-\\.]*$/.test(chequeReceiver)){
            _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.accountHolderNameFormat);
        }
    }

    if(accountNumber && !/^[0-9]{8}$/.test(accountNumber)){
        _set(errors, 'payeeDetails.accountNumber', ERROR_MESSAGES.accountNumberFormat);
    }

    if(
        buildingNumber && !/^[A-Za-z0-9/]*$/.test(buildingNumber) &&
        productGroup !== ProductGroups.B34
    ){
        if(productGroup === ProductGroups.GMF){
            _set(errors, 'payeeDetails.buildingNumber', ERROR_MESSAGES.gmfBuildingNumberFormat);
        }
        if(productGroup === ProductGroups.TIP){
            _set(errors, 'payeeDetails.buildingNumber', ERROR_MESSAGES.tipBuildingNumberFormat);
        }
    }
    
    
    // SUBMIT
    if(_isEmpty(errors)){
        return values;
    }
    else {
        throw new SubmissionError({...errors, _error});
    }
};


export const validate = (values, props) => {
    let errors = {};
    let _error = undefined;
    let mandatoryMissing = false;
    
    const MIN_TOTAL_SURRENDER_AMOUNT = 50;
    const GMF_TOTAL_SURRENDER_AMOUNT_LEFT = 2000;
    const B34_TOTAL_SURRENDER_AMOUNT_LEFT = 1000;
    const surrenderType = values[FIELD_NAMES.surrenderType];
    const partialSurrenderType = values[FIELD_NAMES.partialSurrenderType];
    const totalSurrenderAmount = values[FIELD_NAMES.totalSurrenderAmount];
    const productGroup = _get(props, 'plan.productGroupType');
    const productType = _get(props, 'plan.productType');
    let currentPlanAmount = _get(props, 'plan.planDetail.currentValue');
    if(productGroup === ProductGroups.TIP){
        currentPlanAmount = _get(props, 'plan.planDetail.protectedCurrentValue')*1 + _get(props, 'plan.planDetail.nonProtectedCurrentValue')*1;
    }
    const currentFunds = _get(props, 'plan.planDetail.funds');
    const specifyFunds = _get(values, `${FIELD_NAMES.specifyFunds}`);
    const B34PartialSurrenderType = values[FIELD_NAMES.B34PartialSurrenderType];
    const paymentType = values[FIELD_NAMES.paymentType];
    

    // SURRENDER TYPE
    // if(_isEmpty(surrenderType)){
    //     mandatoryMissing = true;
    //     _set(errors, FIELD_NAMES.surrenderType, ERROR_MESSAGES.surrenderTypeRequired);
    // }

    // PARTIAL SURRENDER TYPE
    // if(
    //     (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
    //     _isEmpty(partialSurrenderType)
    // )
    // {
    //     mandatoryMissing = true;
    //     _set(errors, FIELD_NAMES.partialSurrenderType, ERROR_MESSAGES.partialSurrenderTypeRequired);
    // }

    // B34 PARTIAL SURRENDER TYPE
    // if(
    //     productGroup === ProductGroups.B34 &&
    //     (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
    //     _isEmpty(B34PartialSurrenderType)
    // )
    // {
    //     mandatoryMissing = true;
    //     _set(errors, FIELD_NAMES.B34PartialSurrenderType, ERROR_MESSAGES.partialSurrenderTypeRequired);
    // }

    // TIP PARTIAL SURRENDER TYPE
    // if(
    //     productGroup === ProductGroups.TIP &&
    //     productType == 'A00035' &&
    //     (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
    //     _isEmpty(B34PartialSurrenderType)
    // )
    // {
    //     mandatoryMissing = true;
    //     _set(errors, FIELD_NAMES.B34PartialSurrenderType, ERROR_MESSAGES.partialSurrenderTypeRequired);
    // }

    /******************** TOTAL SURRENDER AMOUNT ********************/
    // if(
    //     (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
    //     _isEmpty(totalSurrenderAmount)
    // )
    // {
    //     mandatoryMissing = true;
    //     _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.totalSurrenderAmountRequired);
    // }

    if(
        (surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value) &&
        !_isEmpty(totalSurrenderAmount)
    )
    {
        // CHECK NUMBER
        if(isNaN(totalSurrenderAmount)){
            _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.totalSurrenderAmountNotNumber);
        }
        else if(currentPlanAmount){
            // CHECK MIN
            if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
                if(totalSurrenderAmount < MIN_TOTAL_SURRENDER_AMOUNT){
                    _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.totalSurrenderAmountAtLeast);
                }
            }

            // CHECK GMF_TOTAL_SURRENDER_AMOUNT_LEFT
            if(
                productGroup === ProductGroups.GMF &&
                ((currentPlanAmount - totalSurrenderAmount) < GMF_TOTAL_SURRENDER_AMOUNT_LEFT) 
            ){
                _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.GmfTotalSurrenderAmountLeft);
            }

            // CHECK B34_TOTAL_SURRENDER_AMOUNT_LEFT
            if(
                productGroup === ProductGroups.B34 &&
                ((currentPlanAmount - totalSurrenderAmount) <= B34_TOTAL_SURRENDER_AMOUNT_LEFT)
            ){
                _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.B34TotalSurrenderAmountLeft);
            }

            // CHECK EXCEED
            if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
                if(totalSurrenderAmount >= currentPlanAmount){
                    _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.totalSurrenderAmountExceed);
                }
            }
            
            if(productGroup === ProductGroups.TIP){
                if(totalSurrenderAmount >= currentPlanAmount){
                    _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.TipTotalSurrenderAmountExceed);
                }

                if(totalSurrenderAmount <= 0){
                    _set(errors, FIELD_NAMES.totalSurrenderAmount, ERROR_MESSAGES.totalSurrenderAmountZero);
                }
            }
        }
    }

    // FUNDS
    // let totalSurrenderAmountCalculated = 0;
    // if(
    //     surrenderType === OPTIONS_DATA.surrenderType.partialSurrender.value &&
    //     // partialSurrenderType === '_proportionately_ACROSS_ALL_FUNDS' &&
    //     partialSurrenderType === OPTIONS_DATA.partialSurrenderType.fromSpecificFund.value &&
    //     specifyFunds &&
    //     specifyFunds.length > 0
    // )
    // {
    //     _forEach(specifyFunds, (item, index) => {
    //         const surrenderAmount = item[FIELD_NAMES.surrenderAmount];
    //         const currentValue = item[FIELD_NAMES.currentValue];

    //         if(
    //             surrenderAmount && Number(surrenderAmount) &&
    //             currentValue && Number(currentValue)
    //         )
    //         {
    //             if(Number(surrenderAmount) > Number(currentValue)){
    //                 _set(errors, `${FIELD_NAMES.specifyFunds}[${index}].${FIELD_NAMES.surrenderAmount}`, ERROR_MESSAGES.surrenderAmountGreaterThanCurrentValue);
    //             }
    //         }

    //         if(surrenderAmount && isNaN(surrenderAmount)){
    //             _set(errors, `${FIELD_NAMES.specifyFunds}[${index}].${FIELD_NAMES.surrenderAmount}`, ERROR_MESSAGES.totalSurrenderAmountNotNumber);
    //         }
            
    //         if(surrenderAmount && Number(surrenderAmount)){
    //             totalSurrenderAmountCalculated += Number(surrenderAmount);
    //         }
    //     });
    // }

    // if(
    //     totalSurrenderAmount && 
    //     (totalSurrenderAmountCalculated !== Number(totalSurrenderAmount))
    // )
    // {
    //     _set(errors, `${FIELD_NAMES.totalSurrenderAmount}`, ERROR_MESSAGES.surrenderAmountComparision);
    // }

    // PAYMENT TYPE
    // if(_isEmpty(paymentType)){
    //     mandatoryMissing = true;
    //     _set(errors, FIELD_NAMES.paymentType, ERROR_MESSAGES.paymentTypeRequired);
    // }


    // // ACCOUNT HOLDER NAME
    // const accountHolderName = _get(values, 'payeeDetails.accountHolderName');
    // const chequeReceiver = _get(values, 'payeeDetails.payableTo');
    // const bankName = _get(values, 'payeeDetails.bankName');
    // const branchName = _get(values, 'payeeDetails.branchName');
    // const sortCode = _get(values, 'payeeDetails.sortCode');
    // const accountNumber = _get(values, 'payeeDetails.accountNumber');
    // const buildingNumber = _get(values, 'payeeDetails.buildingNumber');

    // if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.TIP){
    //     if(accountHolderName && !/^[a-zA-Z '\\-\\.]*$/.test(accountHolderName)){
    //         if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
    //             _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.accountHolderNameFormat);
    //         }
    //         else if(productGroup === ProductGroups.TIP){
    //             _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.tipAccountHolderNameFormat);
    //         }
    //     }
    
    //     if(chequeReceiver && !/^[a-zA-Z '\\-\\.]*$/.test(chequeReceiver)){
    //         if(productGroup === ProductGroups.GMF || productGroup === ProductGroups.B34){
    //             _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.accountHolderNameFormat);
    //         }
    //         else if(productGroup === ProductGroups.TIP){
    //             _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.tipChequeReceiverFormat);
    //         }
    //     }
    // }

    // if(productGroup === ProductGroups.B34){
    //     if(accountHolderName && !/^[a-zA-Z0-9 '\\-\\.]*$/.test(accountHolderName)){
    //         _set(errors, 'payeeDetails.accountHolderName', ERROR_MESSAGES.accountHolderNameFormat);
    //     }
    
    //     if(chequeReceiver && !/^[a-zA-Z0-9 '\\-\\.]*$/.test(chequeReceiver)){
    //         _set(errors, 'payeeDetails.payableTo', ERROR_MESSAGES.accountHolderNameFormat);
    //     }
    // }

    // if(accountNumber && !/^[0-9]{8}$/.test(accountNumber)){
    //     _set(errors, 'payeeDetails.accountNumber', ERROR_MESSAGES.accountNumberFormat);
    // }

    // if(
    //     buildingNumber && !/^[A-Za-z0-9/]*$/.test(buildingNumber) &&
    //     productGroup !== ProductGroups.B34
    // ){
    //     if(productGroup === ProductGroups.GMF){
    //         _set(errors, 'payeeDetails.buildingNumber', ERROR_MESSAGES.gmfBuildingNumberFormat);
    //     }
    //     if(productGroup === ProductGroups.TIP){
    //         _set(errors, 'payeeDetails.buildingNumber', ERROR_MESSAGES.tipBuildingNumberFormat);
    //     }
    // }


    // SUMMARY
    return {...errors, _error};
};