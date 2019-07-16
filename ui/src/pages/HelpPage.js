import React from 'react';
import {TopHeader} from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

class HelpPage extends React.Component {
    componentDidMount() {
        let ele = document.getElementById(window.location.hash.substr(1));   
        if(ele){
            window.scrollTo(ele.offsetLeft,ele.offsetTop);
        }
    }

    _renderNormalPage(){
        return(
            <div className='container'>
                <div className='text-right'>
                    <Button onClick={e => close()} className='pes-btn pes-btn-default d-inline-block' label='Close' />
                </div>
    
                <section id='helpTopics'>
                    <p className='pes-section-title'>Welcome to plan enquiry help.</p> 
                    <p>Click on a topic below for specific help</p>
                    <ul className='pes-list-topic list-none'>
                        <li><a href='#deathNotification'>Death claims - telephone numbers.</a></li>
                        <li><a href='#C1'>Zurich pension plan numbers.</a></li>
                        <li><a href='#IPB1'>International Portfolio Bond plan numbers.</a></li>
                        <li><a href='#IPB2'>Cash in / Transfer value</a></li>
                        <li><a href='#C2'>Sterling bond plan numbers.</a></li>
                        <li><a href='#C3'>Zurich (ex-Eagle Star) bond plan numbers.</a></li>
                        <li><a href='#C4'>Sterling ISA, Investments funds plan numbers.</a></li>
                        <li><a href='#C4a'>CSIPP plan numbers.</a></li>
                        <li><a href='#surrenderInfo'>Partial surrender details.</a></li>
                        <li><a href='#fundswitchInfo'>Fund Search.</a></li>

                        <li><a href="#C5">Zurich (ex-Eagle Star)  pensions, where transfer value is equal to or greater than current value.</a></li>
                        <li><a href="#C6">Zurich (ex-Eagle Star)  pensions, where transfer value is less than current value.</a></li>
                        <li><a href="#B1">Zurich  pensions, where transfer value is equal to or greater than current value.</a></li>
                        <li><a href="#B2">Zurich  pensions, where transfer value is less than current value.</a></li>
                        <li><a href="#C7">Zurich (ex-Eagle Star) EPP, investing in with profits funds, where current value and transfer value are equal.</a></li>
                        <li><a href="#C8">Zurich (ex-Eagle Star) pensions, investing in with profits funds, where current value and transfer value are equal.</a></li>
                        <li><a href="#C9">Zurich (ex-Eagle Star) EPP, investing in with profits funds, where current value and transfer value are not equal.</a></li>
                        <li><a href="#A1">Zurich (ex-Eagle Star) pensions, investing in, with profits funds,  where current value and transfer value are not equal.</a></li>
                        <li><a href="#A3">Sterling products current value.</a></li>
                        <li><a href="#A4">Zurich (ex-Eagle Star) bonds current value.</a></li>
                        <li><a href="#A5">Zurich (ex-Eagle Star)  bonds investing in with profits funds, where cash-in value and current value are equal.</a></li>
                        <li><a href="#A6">Bonds, where cash-in value and current value are not equal.</a></li>
                        <li><a href="#A7">Zurich (ex-Eagle Star) bonds investing in with profits funds, where cash-in value is not equal current value.</a></li>
                        <li><a href="#A8">Zurich pension transfer plan current value.</a></li>
                        <li><a href='#A9'>Zurich drawdown plan current value.</a></li>
                    </ul>
                </section> 
                
                <section id='deathNotification'>
                    <p className='pes-section-title'>Death claims - telephone numbers.</p>  
                    <p>To notify Zurich of a death claim, please telephone one of the following numbers;</p>  
    
                    <dl className='pes-list-telephone'>
                        <dt>0370 514 3624</dt>
                        <dd>Zurich Pension Transfer Plan, Ex ES Income drawdown, Zurich Flexible Drawdown (not CSIPS), Ex-ES PPs and Ex-ES Bonds</dd>
    
                        <dt>0370 909 6010</dt>
                        <dd>Sterling Bonds and Sterling ISA</dd>
    
                        <dt>0345 723 4087</dt>
                        <dd>Zurich Standalone TIP, Ex-ES EPPs</dd>
    
                        <dt>0345 850 8898</dt>
                        <dd>Zurich Flexible Drawdown (CSIPS) and Zurich Flexible Retirement Plan (CSIPS)</dd>
    
                        <dt>0370 850 6130</dt>
                        <dd>Zurich International Portfolio Bond</dd>
    
                        <dt>0370 243 0827</dt>
                        <dd>All other plans</dd>
                    </dl>
    
                    <div className='text-area'>
                        <p>To help process your claim as quickly as possible please have the following information available when you make contact</p>
                        <p>Name and address of deceased<br />
                        Date of birth of deceased<br />
                        Plan numbers of all plans where the deceased is a plan holder</p>
                        <p>Be assured that the servicing department will process the claim as quickly as possible</p>
                    </div>
                </section> 
    
                <section id='C1'> 
                    <p className='pes-section-title'>Zurich pension plan numbers.</p>  
                    <div className='text-area'>
                        <p>To access Zurich pensions you must insert a plan number in the following format.<br />
                        (00000001 to 59999999) or (70000000 to 89999999) or Annnnnnnn or Pnnnnn-AAA-AAA, ensure leading zeros are input.</p>
                        <p>Where<br />
                        n = a number<br />
                        A = a number or letter.</p>
                        <div>Replace the last three characters of the plan number as follows</div>
                        <div>
                            <span className='d-inline-block w-200'>P12345-678-two letters</span>
                            <span className='d-inline-block w-100'>becomes</span>
                            <span className='d-inline-block w-200'>P12345-678-001</span>
                        </div>
                        <div>
                            <span className='d-inline-block w-200'>P30000-100-po1</span>
                            <span className='d-inline-block w-100'>becomes</span>
                            <span className='d-inline-block w-200'>P30000-100-P01</span>
                        </div>
                        <div>
                            <span className='d-inline-block w-200'>P12345-100-PB</span>
                            <span className='d-inline-block w-100'>becomes</span>
                            <span className='d-inline-block w-200'>P12345-100-AAA</span>
                        </div>
                        <div>Where AAA is the member id and = P0n or F0n or E0n where n = 1-9.</div>
                    </div>
                </section> 
    
                <section id='IPB1'> 
                    <p className='pes-section-title'>International Portfolio Bond plan numbers.</p>
                    <div className='text-area'>
                        <p>International Portfolio Bond numbers are in the range X9120000X to X9820000X</p>
                        <p>Where<br />
                        X = a letter.</p>
                    </div>
                </section> 
    
                <section id='IPB2'> 
                    <p className='pes-section-title'>Cash in / Transfer value</p>
                    <div className='text-area'>
                        <p>If the Cash In Value is blank please contact <span className='color-blue'>0370 850 6130</span> to obtain the latest value.</p>
                    </div>
                </section> 
    
                <section id='C2'> 
                    <p className='pes-section-title'>Sterling bonds plan numbers.</p>
                    <div className='text-area'>
                        <p>Sterling bond numbers are in the range 60000000 to 69999999.</p>
                    </div>
                </section> 
    
                <section id='C3'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) bond plan numbers.</p>
                    <div className='text-area'>
                        <p>Zurich bonds are in the range (00000001 to 59999999) or (70000000 to 89999999), ensure leading zeros are input.</p>
                    </div>
                </section> 
    
                <section id='C4'> 
                    <p className='pes-section-title'>Sterling ISA, Investments funds plan numbers.</p>
                    <div className='text-area'>
                        <p>The plan number is constructed from either the first letter of the plan holder surname or the letter X (if submitted Online) followed by '-' followed by a 6 digit number.</p>
                        <p>For example A500013 becomes A-500013.</p>
                    </div>
                </section> 
    
                <section id='C4a'> 
                    <p className='pes-section-title'>CSIPP plan numbers.</p>
                    <div className='text-area'>
                        <p>CSIPP plan numbers are in the following ranges</p>
                        <div>
                            <span className='d-inline-block w-300'>ZUR000000001 to ZUR999999999</span>
                            <span className='d-inline-block'>(Non Protected Rights)</span>
                        </div>
                        <div>
                            <span className='d-inline-block w-300'>ZU0000000001 to ZU9999999999</span>
                            <span className='d-inline-block'>(Non Protected Rights)</span>
                        </div>
                        <div>
                            <span className='d-inline-block w-300'>ZP0000000001 to ZP9999999999</span>
                            <span className='d-inline-block'>(Former Protected Rights)</span>
                        </div>
                        <div>
                            <span className='d-inline-block w-300'>ZPR00000001 to ZPR99999999</span>
                            <span className='d-inline-block'>(Former Protected Rights)</span>
                        </div>
                    </div>
                </section> 
    
                <section id='C5'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) pensions, where transfer value is equal to or greater than current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall.</p>
                    </div>
                </section> 
    
                <section id='C6'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) pensions, where transfer value is less than current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall. Transfer values given include the effect of any early transfer charge.</p>
                    </div>
                </section> 
    
                <section id='B1'> 
                    <p className='pes-section-title'>Zurich pensions, where transfer value is equal to or greater than current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up.</p>
                    </div>
                </section> 
    
                <section id='B2' name='B2'> 
                    <p className='pes-section-title'>Zurich pensions, where transfer value is less than current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up. Transfer values given include the effect of any early transfer charge.</p>
                    </div>
                </section> 
    
                <section id='C7'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) EPP, investing in with profits funds, where current value and transfer value are equal.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall. Based on the transfer value displayed, a market value reduction is not currently applying, however a market value reduction could apply to this plan and would reduce the transfer value, or a final bonus may apply which would increase the transfer value. We never apply a market value reduction if benefits are taken at the normal retirement date, although a reduction may apply to units arising from single premiums or switches made into the With Profits fund within five years of this date.</p>
                    </div>
                </section> 
    
                <section id='C8'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) pensions, investing in with profits funds, where current value and transfer value are equal.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall. Based on the transfer value displayed, a market value reduction is not currently applying, however a market value reduction could apply to this plan and would reduce the transfer value, or a final bonus may apply which would increase the transfer value. We never apply a market value reduction if benefits are taken at the selected pension date, although a reduction may apply to units arising from single premiums or switches made into the With Profits fund within five years of this date.</p>
                    </div>
                </section> 
    
                <section id='C9'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) EPP, investing in with profits funds, where current value and transfer value are not equal.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall. The difference between the transfer value and current value reflects any market value reduction, final bonus and/or early transfer charge/transfer value enhancement, that would apply if benefits were transferred today. We never apply a market value reduction if benefits are taken at the normal retirement date, although a reduction may apply to units arising from single premiums or switches made into the With Profits fund within five years of this date.</p>
                    </div>
                </section> 
    
                <section id='A1'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) pensions, investing in, with profits funds, where current value and transfer value are not equal.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall. The difference between the transfer value and current value reflects any market value reduction, final bonus and/or early transfer charge/transfer value enhancement, that would apply if benefits were transferred today. We never apply a market value reduction if benefits are taken at the selected pension date, although a reduction may apply to units arising from single premiums or switches made into the With Profits fund within five years of this date.</p>
                    </div>
                </section> 
    
                <section id='A3'> 
                    <p className='pes-section-title'>Sterling products current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up.</p>
                    </div>
                </section> 
    
                <section id='A4'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) bonds current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up, except for the Secure fund where the price is guaranteed never to fall.</p>
                    </div>
                </section> 
    
                <section id='A5'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) bonds investing in with profits funds, where cash-in value and current value are equal.</p>
                    <div className='text-area'>
                        <p>Based on the cash-in value displayed, a market value reduction is not currently applying, however a market value reduction could apply to this plan and would reduce the cash-in value. Alternatively, a final bonus may apply which would increase the cash-in value. There may be an market value reduction-free date, which is usually 10 years after the last single premium payment. A market value reduction will not apply if money is taken out of the with profits fund on this date or on each subsequent tenth anniversary of this date. However a market value reduction could apply if cashed-in before or after the market value reduction-free date. If investments are added to the with profits fund, the market value reduction-free date will change to the tenth anniversary (and each subsequent tenth anniversary) of the date of addition.</p>
                    </div>
                </section> 
    
                <section id='A6'> 
                    <p className='pes-section-title'>Bonds, where cash-in value and current value are not equal.</p>
                    <div className='text-area'>
                        <p>Cash-in values given include the effect of any exit penalty that may currently be applicable on encashment.</p>
                    </div>
                </section> 
    
                <section id='A7'> 
                    <p className='pes-section-title'>Zurich (ex-Eagle Star) bonds investing in with profits funds, where cash-in value is not equal current value.</p>
                    <div className='text-area'>
                        <p>The difference between the cash-in value and current value reflects any market value reduction, final bonus and/or exit penalty that would apply if the plan was cashed-in today. There may be an market value reduction-free date, which is usually 10 years after the last single premium payment. A market value reduction will not apply if money is taken out of the with profits fund on this date or on each subsequent tenth anniversary of this date. However a market value reduction could apply if cashed-in before or after the market value reduction-free date. If investments are added to the with profits fund, the market value reduction-free date will change to the tenth anniversary (and each subsequent tenth anniversary) of the date of addition.</p>
                    </div>
                </section> 
    
                <section id='A8'> 
                    <p className='pes-section-title'>Zurich pension transfer plan current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit price varies daily and may go down as well as up.</p>
                    </div>
                </section> 
    
                <section id='A9'> 
                    <p className='pes-section-title'>Zurich drawdown plan current value.</p>
                    <div className='text-area'>
                        <p>The current value is based on unit prices provided on the previous working day. The unit prices vary daily and may go down as well as up. Details shown are in respect of investments in Zurich pension funds only. Wider SIPP assets (if applicable) are not shown.</p>
                    </div>
                </section> 
    
                <section id='surrenderInfo'> 
                    <p className='pes-section-title'>Partial surrender details.</p>
                    <div className='text-area'>
                        <p>Partial surrender details. You can take a one-off withdrawal proportionately across all the funds, or from one or a selection of funds that you may specify. If you choose to take the one-off withdrawal proportionately across all funds, you can take it as a percentage of the fund or as a monetary amount. If you choose to take the one-off withdrawal from a specified fund or funds, you will need to take the withdrawal as a monetary amount.</p>
                    </div>
                </section> 
    
                <section id='fundswitchInfo'> 
                    <p className='pes-section-title'>Fund Search.</p>
                    <div className='text-area'>
                        <p>To search for a fund you can type in the full fund name (e.g. Sterling Managed 2) or a part of the fund name (e.g. Ster). Typing in a part of the fund name will return a list of all the funds that contain that text. You can type in as many, or as few, letter or numbers as you like.</p>
                    </div>
                </section> 
    
                <div className='text-right'>
                    <Button onClick={e => window.close()} className='pes-btn pes-btn-default d-inline-block' label='Close' />
                </div>
            </div>
        );
    }

    _renderTipPage(){
        return(
            <div className='container'>
                <div className='text-right'>
                    <Button onClick={e => close()} className='pes-btn pes-btn-default d-inline-block' label='Close' />
                </div>

                <section>
                    <p className='pes-section-title'>Welcome to Standalone TIP Help.</p> 
                    <p>Click on a topic below for specific help</p>
                    <ul className='pes-list-topic list-none'>
                        <li><a href="#A001">Zurich Pension Plan current value.</a></li>
                        <li><a href="#A002">Partial surrender type</a></li>
                    </ul> 
                </section>

                <section id='A001'>
                    <p className='pes-section-title'>Zurich Pension Plan current value.</p>
                    <div className='text-area'>
                        <p>This reflects the current value of investments in Zurich Pension funds, based on prices applicable at the previous day's close of business.</p>
                    </div>
                </section>

                <section id='A002'>
                    <p className='pes-section-title'>Partial surrender type</p>
                    <div className='text-area'>
                        <p>You can take a one-off withdrawal proportionately across all the funds, or from one or a selection of funds that you may specify. If you choose to take the one-off withdrawal proportionately across all funds, you can take it as a percentage of the fund or as a monetary amount. If you choose to take the one-off withdrawal from a specified fund or funds, you will need to take the withdrawal as a monetary amount.</p>
                    </div>
                </section>
    
                <div className='text-right'>
                    <Button onClick={e => window.close()} className='pes-btn pes-btn-default d-inline-block' label='Close' />
                </div>
            </div>
        );
    }

    render() {
        const r = this.props.router;
        const cr = r.getCurrentLocation();
        const isTip = cr.pathname === '/help-page/tip';

        return(
            <div id='help-page'>
                <TopHeader />
            
                {
                    isTip
                    ?
                    this._renderTipPage()
                    :
                    this._renderNormalPage()
                }
                
                <Footer />
            </div>
        );
    }
}

export default HelpPage;