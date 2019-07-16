//PROD
const ApiEndpoints = {
    SearchPlan: '/api/search/v1/search',
    PlanDetails: '/api/search/v1/details/',
    FilterWithdrawals: '/api/search/v1/history',

    ServicingAddressLookup: '/api/lookup/v1/addressLookup/postCode',
    ServicingSearchAddress: '/api/lookup/v1/address',
    BankDetails: '/api/lookup/v1/bankDetails',

    ServicingAmendPersonalDetails: '/api/notification/v1/amendPersonalDetails',
    ServicingAmendOrganisationDetails: '/api/notification/v1/amendOrganizationalDetails',
    ServicingAmendTrusteeDetails: '/api/notification/v1/amendTrusteeDetails',
    
    AddRegularWithdrawal: '/api/notification/v1/addRegularWithdrawal',
    AmendRegularWithdrawal: '/api/notification/v1/amendRegularWithdrawal',
    RemoveRegularWithdrawal: '/api/notification/v1/removeRegularWithdrawal',

    SubmitDistribution: '/api/notification/v1/distribution',
    SubmitImcomePayment: '/api/notification/v1/incomePayment',

    GmfServicingSurrender: '/api/notification/v1/gmfSurrender',
    B34ServicingSurrender: '/api/notification/v1/b34Surrender',
    TipServicingSurrender: '/api/notification/v1/tipSurrender',

    SearchFund:'/api/fund/v1/funds/product/',
    //SearchFund: 'https://deala09431.emea.zurich.corp/api/fund/v1/funds/product',
    SubmitSpecifiedFunds: '/api/notification/v1/specifiedFunds',
    SubmitRebalanceFunds: '/api/notification/v1/rebalanceFunds',
    SubmitRedirectContribution:'/api/notification/v1/redirectContribution',

    UserInfo: '/api/account/v1/account/',
    UpdateUserInfo: '/api/account/v1/account/{0}', 
    UserValidationStatus: '/api/upgradeaccess/v1/validation/{0}',
    MyProfileUpgradeAccess: '/api/upgradeaccess/v1/access',
    MyProfileValidationCode: '/api/upgradeaccess/v1/validation/{0}/{1}',
    AgencyCodes: '/api/agency/v1/agency',
    Delegations: '/api/delegation/v1/delegation',
    
    History: '/api/notification/v1/history',
    HistoryDetails: '/api/notification/v1/details'
};


//DEV
// const ApiEndpoints = {
//     SearchPlan: 'https://20.203.155.25:9009/v1/search',
//     PlanDetails: 'https://20.203.155.25:9009/v1/details/',
//     FilterWithdrawals: 'https://20.203.155.25:9009/v1/history',

//     ServicingAddressLookup: 'https://20.203.155.25:9021/v1/addressLookup/postCode',
//     ServicingSearchAddress: 'https://20.203.155.25:9021/v1/address',
//     BankDetails: 'https://20.203.155.25:9021/v1/bankDetails',
    
//     ServicingAmendPersonalDetails: 'https://20.203.155.25:9011/v1/amendPersonalDetails',
//     ServicingAmendOrganisationDetails: 'https://20.203.155.25:9011/v1/amendOrganisationDetails',
//     ServicingAmendTrusteeDetails: 'https://20.203.155.25:9011/v1/amendTrusteeDetails',

//     AddRegularWithdrawal: 'https://20.203.155.25:9012/v1/addRegularWithdrawal',
//     AmendRegularWithdrawal: 'https://20.203.155.25:9012/v1/amendRegularWithdrawal',
//     RemoveRegularWithdrawal: 'https://20.203.155.25:9012/v1/removeRegularWithdrawal',

//     SubmitDistribution: 'https://20.203.155.25:9013/v1/distribution',
//     SubmitImcomePayment: 'https://20.203.155.25:9014/v1/incomePayment',
//     SubmitRedirectContribution:'https://pes-service:9017/v1/redirectContribution',

//     GmfServicingSurrender: 'https://20.203.155.25:9015/v1/gmfSurrender',
//     B34ServicingSurrender: 'https://20.203.155.25:9015/v1/b34Surrender',

//     SearchFund:'https://20.203.155.25:9020/v1/funds/product/',  
//     SubmitSpecifiedFunds: 'https://20.203.155.25:9016/v1/specifiedFunds',
//     SubmitRebalanceFunds: 'https://20.203.155.25:9016/v1/rebalanceFunds',

//     UserInfo: '/api/profile/v1/account/',
//     MyProfileUpgradeAccess: '/api/profile/v1/access',
//     MyProfileValidationCode: '/api/profile/v1/code?userId={0}&validationCode={1}',
//     AgencyCodes: '/api/profile/v1/agencycodes',
//     Delegations: '/api/profile/v1/delegation'
// };

export default ApiEndpoints;