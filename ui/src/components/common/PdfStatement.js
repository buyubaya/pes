import React, {PropTypes} from 'react';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

import PdfUtils from '../../utils/PdfUtils';
import StringUtils from '../../utils/StringUtils';
import ServicingUrls from '../../constants/ServicingUrls';

class PdfStatement extends React.Component {
    
    static propTypes = {
        plan: PropTypes.object
    }

    render(){
        const {children, plan} = this.props;

        let environment = EnvironmentUtils.get('environment');

        let pdfUrl = '';
        let pdfFileName = '';
        let productGroup = '';
        let planID = '';
        
        if(environment != undefined && plan != undefined){
            //searching plan
            if(plan.productGroup != undefined && plan.planID != undefined){
                productGroup = plan.productGroup;
                planID = plan.planID;
            }
            else{
                //plan details
                if(plan.productGroupType != undefined && plan.planDetail != undefined){
                    if(plan.planDetail.planNumber != undefined){
                        productGroup = plan.productGroupType;
                        planID = plan.planDetail.planNumber;
                    }
                }
            }

            //pdfUrl = 'https://20.203.155.25:9010/v1/showpdf/'+ productGroup +'/' + planID;
            pdfUrl = StringUtils.format(ServicingUrls.pdfStatement, environment.apiBaseUrl, productGroup, planID);
            pdfFileName = StringUtils.format('Statement_{0}.pdf', planID);
        }

        return (<a href='javascript:;' onClick={() => PdfUtils.downloadPDF(pdfUrl, pdfFileName)} type='application/pdf'>
                    <img src={require('../../../assets/images/icon_pdf.png')} className='pes-icon icon-pdf align-bottom mr-5' />
                    {children}
            </a>);
    }
}

export default PdfStatement;