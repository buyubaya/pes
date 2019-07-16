import React from 'react';


const Address = ({address, label}) => (
    <div>
                {address.addressLine1 &&
                    <div className='tlrow row'>
                      <div className='tlcell col-xs-4'>{label}</div>
                      <div className='tlcell col-xs-4'>{address.addressLine1}</div>
                  </div>
                }
                {address.addressLine2 &&
                    <div className='tlrow row'>
                      <div className='tlcell col-xs-4'></div>
                      <div className='tlcell col-xs-4'>{address.addressLine2}</div>
                  </div>
                }
                {address.addressLine3 &&
                    <div className='tlrow row'>
                      <div className='tlcell col-xs-4'></div>
                      <div className='tlcell col-xs-4'>{address.addressLine3}</div>
                  </div>
                }
                {address.addressLine4 &&
                    <div className='tlrow row'>
                      <div className='tlcell col-xs-4'></div>
                      <div className='tlcell col-xs-4'>{address.addressLine4}</div>
                  </div>
                }
                {address.postCode &&
                    <div className='tlrow row'>
                      <div className='tlcell col-xs-4'></div>
                      <div className='tlcell col-xs-4'>{address.postCode}</div>
                  </div>
                }
                  {address.country &&
                    <div className='tlrow row'>
                      <div className='tlcell col-xs-4'></div>
                      <div className='tlcell col-xs-4'>{address.country}</div>
                  </div>
                }
            </div>
);


export default Address;
