import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ExpensesForm = ({ onNext, onBack }) => {
  const { updateFormData } = useContext(AppContext);
  const [form, setForm] = useState({ withdraw: '', extraFunds: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.withdraw) {
      newErrors.withdraw = "Owner's withdraw amount is required";
    } else if (isNaN(form.withdraw) || Number(form.withdraw) < 0) {
      newErrors.withdraw = 'Please enter a valid positive number';
    }
    if (!form.extraFunds) {
      newErrors.extraFunds = 'Extra funds amount is required';
    } else if (isNaN(form.extraFunds) || Number(form.extraFunds) < 0) {
      newErrors.extraFunds = 'Please enter a valid positive number';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      updateFormData('expenses', form);
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="withdraw">Owner's Withdraw:</label>
        <input
          type="number"
          id="withdraw"
          name="withdraw"
          value={form.withdraw}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.withdraw ? 'error' : ''}
        />
        {errors.withdraw && <div className="error-message">{errors.withdraw}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="extraFunds">Extra Fund Distribution:</label>
        <input
          type="number"
          id="extraFunds"
          name="extraFunds"
          value={form.extraFunds}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.extraFunds ? 'error' : ''}
        />
        {errors.extraFunds && <div className="error-message">{errors.extraFunds}</div>}
      </div>

      <div className="button-group">
        <button type="button" onClick={onBack}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default ExpensesForm;
