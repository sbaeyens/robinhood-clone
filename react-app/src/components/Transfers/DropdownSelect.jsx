import React, { useState } from 'react'
import "./Transfers.css";

function DropdownSelect({ setType, dropdownHandler }) {



  const clickHandler = (e) => {
    setType(e.target.innerHTML);
    dropdownHandler()
  }


return (
  <div className='dd-div'>
    <div className="dd-option" onClick={clickHandler}>
      Deposit
    </div>
    <div className="dd-option" onClick={clickHandler}>
      Withdrawal
    </div>
  </div>
);
}

export default DropdownSelect
