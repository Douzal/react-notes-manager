import React from 'react';

const FieldError = ({children}) => {
    const style = {color:'red',position:'absolute', marginTop:'10px'};
    return (
        <span style={style}>{children}</span>
    );
};

export default FieldError;