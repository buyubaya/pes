export const FIELD_NAMES = {
    surrenderType: "surrenderType",
    paymentType: "paymentType",
    partialSurrenderType: "surrenderTypeFunds",
    B34PartialSurrenderType: "partialSurrenderType",
    totalSurrenderAmount: "surrenderTotalAmount",
    specifyFunds: "fundInvestments",
    fundName: "fundName",
    currentValue: "currentValue",
    surrenderAmount: "amountSurrendered",
    paymentType: "paymentType"
};


export const ERROR_MESSAGES = {
    mandatoryMissing: "Please supply or check missing or invalid details below and then click 'Submit'",
    emptyForm: "No changes have been made, please amend or 'cancel'",
    surrenderTypeRequired: "Surrender Type is not null",
    partialSurrenderTypeRequired: "Please select the Surrender Type required for the Partial Surrender",
    B34PartialSurrenderTypeRequired: "Please select the Partial Surrender Type",
    totalSurrenderAmountRequired: "Please enter the Surrender Amount for the Partial Surrender",
    totalSurrenderAmountNotNumber: "Surrender Amount must be a number",
    totalSurrenderAmountAtLeast: "Please check and amend the Surrender Amount - this must be at least £50",
    totalSurrenderAmountExceed: "Please amend the Surrender Amount as the amount must not exceed the fund assets value",
    TipTotalSurrenderAmountExceed: "Please make sure that the total amount surrendered does not exceed the plan value",
    totalSurrenderAmountZero: "Please make sure that the total amount surrendered is not 0",
    GmfTotalSurrenderAmountLeft: "Please check the Total Surrender Amount as £2000 must be left in the plan",
    B34TotalSurrenderAmountLeft: "Please check the Total Surrender Amount as £1000 must be left in the plan",
    surrenderAmountGreaterThanCurrentValue: "Please check the values entered for fund surrender. The amount surrendered cannot be greater than the current value for each fund",
    surrenderAmountRequired: "Please check the fund value entered as it has not been recongised",
    surrenderAmountComparision: "Please check the Total Surrender Amount as it is not equal to the total being withdrawn from the funds",
    paymentTypeRequired: "Payment Type is not null",

    accountHolderNameFormat: "Please check and amend the payee details. You can enter up to 40 alphanumeric characters",
    accountNumberFormat: "Invalid account number",
    buildingNumberFormat: "Invalid building society roll number",

    accountHolderNameRequired: "Please check and amend the payee details. You can enter up to 40 alphanumeric characters",
    paymentToOthersRequired: "Please select whether the monies are to be paid to anyone who is not a plan holder",

    tipAccountHolderNameFormat: "Correct the payee. The format is invalid",
    tipChequeReceiverFormat: "Cheque payable to - must not contain digits and special characters different than '-', '''",
    tipBuildingNumberFormat: "Invalid building society roll number number entered",
    gmfBuildingNumberFormat: "An incorrect building society roll number entered. Please check and amend the details"
};


export const OPTIONS_DATA = {
    surrenderType: {
        fullSurrender: {value: "FULL_SURRENDER", label: "Full surrender"},
        partialSurrender: {value: "PARTIAL_SURRENDER", label: "Partial surrender"}
    },
    partialSurrenderType: {
        acrossAllFund: {value: "PROPORTIONATELY_ACROSS_ALL_FUNDS", label: "Proportionately across all funds"},
        fromSpecificFund: {value: "FROM_SPECIFIC_FUNDS", label: "From specific funds"}
    },
    B34PartialSurrenderType: {
        acrossAllMiniPolicies: {value: "PROPORTIONATELY_ACROSS_ALL_MINI_POLICIES", label: "Proportionately across all mini-policies"},
        cancellationWholeMiniPolicies: {value: "CANCELLATION_OF_WHOLE_MINI_POLICES", label: "Cancellation of whole mini-policies"}
    },
    paymentType: {
        bankTransfer: {value: "BACS", label: "Bank Transfer"},
        cheque: {value: "CHEQUE", label: "Cheque"}
    }
};