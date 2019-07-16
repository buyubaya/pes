// Packages
import React from 'react';
import EnvironmentUtils from '../utils/EnvironmentUtils';


export default class NotFound extends React.Component {

	componentWillMount(){
		
	}

	render(){
		const environment = EnvironmentUtils.get('environment');
		const headerUrl = environment.headerUrl;
		const footerUrl = environment.footerUrl;

		return (
			<div className='error-page'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12'>

							<div className='header-area'>
								<a href={headerUrl.home}>
									<img src={require('../../assets/images/zurich_logo.png')}
									alt='Zurich' className='header-logo' />
								</a>
							</div>
							<div className='main-content'>
								<h1 className="page-section-heading">Error - Page not found</h1>
								<div className="container-fluid">                        
									<section className="row page-section">
										<div className="col-xs-10 col-xs-offset-1">
											<h2 className="page-section-subheading">
												<img src={require('../../assets/images/warning-triangle.png')} width="52" /> Sorry, the page you attempted to access was not found on Zurich's website.
											</h2>
											<p className='my-20'>It is possible that you typed the address incorrectly, or that the page has been moved, deleted or incorporated into another part of our site.</p>
											<p className='my-20'>Please accept our apologies for any inconvenience.</p>
										</div>
									</section>
								</div>
							</div>
							<div className='footer-area clearfix'>
								<ul className='links-list'>
									<li>
										<a href={footerUrl.legal} title='Legal'>Legal</a>
									</li>
									<li>
										<a href={footerUrl.privacy} title='Privacy'>Privacy</a>
									</li>
									<li>
										<a href={footerUrl.cookies} title='Cookies'>Cookies</a>
									</li>
									<li>
										<a href={footerUrl.accessibility} title='Accessibility'>Accessibility</a>
									</li>
								</ul>
								<p className='copyright'>Copyright © 2019 Zurich</p>
							</div>
						
						</div>
					</div>
				</div>
			</div>
		);
	}
}
