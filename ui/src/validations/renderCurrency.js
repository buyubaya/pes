import React, {PropTypes} from 'react';
import {FieldProps} from './FieldProps';
import {withInputError} from './HOCs';


const formatNumber = (value, digits) => {
    if(value){     
        value = Number(value).toFixed(digits);  
        value += '';
        const list = value.split('.');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while(num.length > 3){
            result = `,${num.slice(-3)}${result}`;
            num = num.slice(0, num.length - 3);
        }
        if(num) {
            result = num + result;
        }

        value = `${prefix}${result}.${list[1]}`;
    }
    else {
        value = '';
    }
    
    // if(value){
    //     value = Number(value).toLocaleString(navigator.language, 
    //         {minimumFractionDigits: digits, maximumFractionDigits: digits}
    //     )
    // }
    // else {
    //     value = '';
    // }

    return value;
};


class CurrencyInput extends React.PureComponent {
    constructor(){
        super();

        this.state = {
            value: undefined,
            formattedValue: '',
            isBlur: true
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    static propTypes = {
        placeholder: PropTypes.string,
        digits: PropTypes.number,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        onBlur: PropTypes.func
    };

    static defaultProps = {
        digits: 2,
    };

    componentWillMount(){
		if(!this.props.value){
			this.props.defaultValue && this.props.onChange && this.props.onChange(this.props.defaultValue);
		}
		else {
			this.setState({formattedValue: formatNumber(this.props.value, this.props.digits)});
		}
	}

    componentWillReceiveProps(props){
		if(this.state.isBlur){
            this.setState({formattedValue: formatNumber(props.value, this.props.digits)});
        }
    }

    onChange(e){
        const value = e.target.value.toString().replace(/,/g, '');
        const reg = /^-?(0|[1-9][0-9]*)?(\.[0-9]*)?$/;
        if(reg.test(value) || value === '' || value === '-'){
			this.props.onChange && this.props.onChange(value);
        }
        this.setState({formattedValue: e.target.value});
	}

    onBlur(e){
        let value = e.target.value.replace(/,/g, '');

        if(value.charAt(value.length - 1) === '.'){
			value = value.replace(/[.,]/g, '');
        }

        if(value === '' || value === '.' || value === '-'){
            value = undefined;
        }
        
        this.setState(
            {formattedValue: formatNumber(value, this.props.digits), isBlur: true}, 
            () => {
                if(value){
                    this.props.onBlur && this.props.onBlur(Number(value).toFixed(this.props.digits));
                }
                else {
                    this.props.onBlur && this.props.onBlur(value);
                }
            }
        );
    }

    onFocus(){
        this.setState({isBlur: false});
    }

    onKeyPress(e){
        const { positiveValue } = this.props;
        const keyCode = e.which || e.keyCode;

        if(e.ctrlKey){
            (
                e.key.toLowerCase() !== 'c' &&  
                e.key.toLowerCase() !== 'v' &&  
                e.key.toLowerCase() !== 'x'
            ) && e.preventDefault();
        }
        else {
            (   
                (keyCode === 46 && /\./g.test(e.target.value)) ||
                (keyCode === 45 && /-/g.test(e.target.value)) ||
                (keyCode === 45 && positiveValue) ||
                (
                    keyCode !== 46 && keyCode !== 45 && /[^0-9]/.test(e.key)
                )
            ) && e.preventDefault();
        }
    }

    render(){
        return(
            <div className='tuci-input'>
                <input
                    // name={this.props.name}
					type='text'
					autoComplete='off' 
 					className='form-control' 
                    value={this.state.formattedValue}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onKeyPress={this.onKeyPress}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}


const renderCurrency = ({input, defaultValue, disabled, showError, ...rest}) => (
	<CurrencyInput 
		{...input}
		{...rest}
		defaultValue={defaultValue}
		disabled={disabled}
		showError={showError}
	/>
);

renderCurrency.propTypes = {
	...FieldProps,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool
};

export default withInputError(renderCurrency);