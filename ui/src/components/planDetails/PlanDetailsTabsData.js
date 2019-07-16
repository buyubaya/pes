import ProductGroups from '../../constants/ProductGroups';
import {TabIDs} from '../../constants/PlanDetailTabs';

import SummaryTab from './SummaryTab';

import IpbTab from './paymentsAndWithdrawals/IpbTab';
import B34Tab from './paymentsAndWithdrawals/B34Tab';
import GbTab from './paymentsAndWithdrawals/GbTab';
import GmfIsaTab from './paymentsAndWithdrawals/GmfIsaTab';
import GmfIaTab from './paymentsAndWithdrawals/GmfIaTab';
import GpTab from './paymentsAndWithdrawals/GpTab';
import TipTab from './paymentsAndWithdrawals/TipTab';

import PlanholdersTab from './PlanholdersTab';
import TrusteesTab from './TrusteesTab';
import AgencyTab from './AgencyTab';
import SchemeTab from './SchemeTab';
import ServicingHomeTab from './ServicingHomeTab';
import ServicingHistoryTab from './ServicingHistoryTab';

export class PlanDetailsTabs {
	constructor(){
		this.productGroup = null;
		this.PlanDetailsTabsData = null;
	}

	static setProductGroup(productGroup=null, productType='ISA'){
		this.productGroup = productGroup;

		const InvestmentsTab = {
			[ProductGroups.IPB]: {label: 'Investments and withdrawals', component: IpbTab},
			[ProductGroups.B34]: {label: 'Investments and withdrawals', component: B34Tab},
			[ProductGroups.GB]: {label: 'Investments and withdrawals', component: GbTab},
			[ProductGroups.GMF]: (productType==='ISA' && {label: 'Payments and withdrawals', component: GmfIsaTab}) || {label: 'Payments and withdrawals', component: GmfIaTab},
			[ProductGroups.GP]: {label: 'Current Payments', component: GpTab},
			[ProductGroups.TIP]: {label: 'Current Payments and Withdrawals', component: TipTab},
			[ProductGroups.TAI]: {label: 'Current Payments', component: GpTab}
		};

		const _investment = (InvestmentsTab[productGroup]) ? InvestmentsTab[productGroup] : null;

		this.PlanDetailsTabsData = [
			{id: TabIDs.summary, label: 'Summary', component: SummaryTab},
			{id: TabIDs.investment, label: _investment ? _investment.label : null, component: _investment ? _investment.component : null},
			{id: TabIDs.planholder, label: 'Planholders', component: PlanholdersTab},
			{id: TabIDs.trustee, label: 'Trustees', component: TrusteesTab},
			{id: TabIDs.agency, label: 'Agency', component: AgencyTab},
			{id: TabIDs.scheme, label: 'Scheme', component: SchemeTab},
			{
				id: TabIDs.servicing, 
				label: 'Servicing', 
				component: ServicingHomeTab,
				children: [
					{id: TabIDs.servicing, parentId: 'servicing', label: 'Servicing home', component: ServicingHomeTab},
					{id: TabIDs.servicingHistory, parentId: 'servicing', label: 'Servicing history', component: ServicingHistoryTab}
				]
			}
		];
		
		return this;
	}

	static getData(){
		if(!this.productGroup){
			this.setProductGroup();
		}

		return this.PlanDetailsTabsData;
	}

	static hideTab(tab){
		if(tab){			
			if(!this.PlanDetailsTabsData){
				this.setProductGroup();
			}

			this.PlanDetailsTabsData = this.PlanDetailsTabsData.map(item => {
				if(item && item.id === tab){
					item.hide = true;
				}	
				return item;			
			});	
		}

		return this;
	}
}