import React, { useState } from 'react'
import "./Transfers.css";

function DropdownSelect({ setType }) {
    // const [transferType, setTransferType] = useState("Deposit")
    // const handleSet = (e) => {
    //     let selection = e.target.innerHTML;
    //     console.log("e.target.innerHTML", e.target.innerHTML);
    //     console.log("transfer type before", transferType)
    //     setTransferType(selection)
    //     console.log("transfer type after", transferType)
    //     props.onSubmit(transferType)
    // }


return (
  <div>
    <div className="dd-option" onClick={(e) => setType(e.target.innerHTML)}>
      Deposit
    </div>
    <div className="dd-option" onClick={(e) => setType(e.target.innerHTML)}>
      Withdrawal
    </div>
  </div>
);
}

export default DropdownSelect
