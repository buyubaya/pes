import MyAccountTab from './MyAccountTab';
import UpgradeAccessTab from './UpgradeAccessTab';
import AgencyCodesTab from './AgencyCodesTab';
import DelegationsTab from './DelegationsTab';
import NotificationsTab from './NotificationsTab';
import {MyProfileTabIDs} from '../../constants/MyProfile';


export class MyProfileTabs {
	constructor(){
        this.TabsData = null;
    }
    
    setInitialData(){
        this.TabsData = [
            {id: MyProfileTabIDs.myAccount, label: 'My account', component: MyAccountTab},
            {id: MyProfileTabIDs.upgradeAccess, label: 'Upgrade access', component: UpgradeAccessTab},
            {id: MyProfileTabIDs.agencyCodes, label: 'Agency codes', component: AgencyCodesTab},
            {id: MyProfileTabIDs.delegations, label: 'Delegations', component: DelegationsTab},
            // {id: MyProfileTabIDs.notifications, label: 'Notifications', component: NotificationsTab}
        ];
    }

	getData(){
        if(!this.TabsData){
            this.setInitialData();
        }
		return this.TabsData;
	}

	hideTab(tab){
		if(tab){	
            if(!this.TabsData){
                this.setInitialData();
            }
            
			this.TabsData = this.TabsData.map(item => {
				if(item && item.id === tab){
					item.hide = true;
				}	
				return item;			
			});	
		}

		return this;
    }
}