import React from 'react';

export default function TextInput(props) {
    const {inputid, labelval, handlechange}= props;
    return (
        <div>
            <label id={inputid + 'Label'} htmlFor={inputid} style={{color: `${labelval}`}}>{labelval}</label><br/>
            <input id={inputid} type="text" onChange= {handlechange} />
        </div>
    )
}

