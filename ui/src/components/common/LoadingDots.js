import React, {PropTypes} from 'react';


const LoadingDots = () => (
	<div className='loading-dots-wrapper '>
		<div className='loading-dots-content'>
			<ul className='loading-dots'>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
);

export default LoadingDots;


const withLoadingDots = Comp => props => (
	props.isFetchingApi ? 
	<LoadingDots /> : 
	<Comp {...props} />
);
withLoadingDots.propTypes = {
	isFetchingApi: PropTypes.bool
};

export { withLoadingDots };
