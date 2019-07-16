import React from 'react';
import EnvironmentUtils from '../../utils/EnvironmentUtils';

const Footer = () => {
    const environment = EnvironmentUtils.get('environment');
    const footerUrl = environment.footerUrl;

    return(
        <footer className='pes-footer-area'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12'>
                        <ul className='links-list list-left'>
                            <li><a href={footerUrl.contact} title='Contact us'>Contact us</a></li>
                            <li><a href={footerUrl.legal} title='Legal'>Legal</a></li>
                            <li><a href={footerUrl.privacy} title='Privacy'>Privacy policy</a></li>
                            <li><a href={footerUrl.accessibility} title='Accessibility'>Accessibility</a></li> 
                        </ul>
                        <ul className='links-list list-right'>
                            <li><a href={footerUrl.cookies} title='Cookies'>Cookies</a></li>
                            <li><a href={footerUrl.sitemap} title='Sitemap'>Sitemap</a></li> 
                        </ul>
                    </div>
                    <div className='col-xs-12'>
                        <div className='copyright'>© Zurich</div>
                    </div>
                    <div className='col-xs-12'>
                        <div className='text-area'>
                            <p>This website is brought to you by Zurich Intermediary Group Limited, authorised and regulated by the Financial Conduct Authority. Registered in England and Wales under company number 01909111. Registered office: The Grange, Bishops Cleeve, Cheltenham, GL52 8XX.</p>
                            <p>For details of the provider of the Zurich Intermediary Platform and the products available on this website, please refer to the relevant literature.</p>
                            <p>For use by professional financial advisers only.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
