import React from 'react';

const SuccessMessage = ({ onNewTaxFile }) => {
  return (
    <div className="success-message-container">
      <div className="success-content">
        <h2>Success!</h2>
        <p>Your tax information has been successfully submitted.</p>
        <button 
          className="primary-button"
          onClick={onNewTaxFile}
        >
          File a New Tax
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;