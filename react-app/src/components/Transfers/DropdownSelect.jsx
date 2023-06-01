import React, { useState } from 'react'
import "./Transfers.css";

function DropdownSelect({ transferType }) {
    // const [transferType, setTransferType] = useState(transferType)
  return (
    <div>
      <div className="dd-option">Deposit</div>
          <div className="dd-option"
          onClick={setTransferType("Withdrawal")}>Withdrawal</div>
    </div>
  );
}

export default DropdownSelect
