import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const IncomeForm = ({ onNext, onBack }) => {
  const { updateFormData } = useContext(AppContext);
  const [form, setForm] = useState({ personalIncome: '', nascorpIncome: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.personalIncome) {
      newErrors.personalIncome = 'Personal income is required';
    } else if (isNaN(form.personalIncome) || Number(form.personalIncome) < 0) {
      newErrors.personalIncome = 'Please enter a valid positive number';
    }
    if (!form.nascorpIncome) {
      newErrors.nascorpIncome = 'NASCORP income is required';
    } else if (isNaN(form.nascorpIncome) || Number(form.nascorpIncome) < 0) {
      newErrors.nascorpIncome = 'Please enter a valid positive number';
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
      updateFormData('incomeDetails', form);
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="personalIncome">Personal Income:</label>
        <input
          type="number"
          id="personalIncome"
          name="personalIncome"
          value={form.personalIncome}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.personalIncome ? 'error' : ''}
        />
        {errors.personalIncome && <div className="error-message">{errors.personalIncome}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="nascorpIncome">NASCORP Income:</label>
        <input
          type="number"
          id="nascorpIncome"
          name="nascorpIncome"
          value={form.nascorpIncome}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.nascorpIncome ? 'error' : ''}
        />
        {errors.nascorpIncome && <div className="error-message">{errors.nascorpIncome}</div>}
      </div>

      <div className="button-group">
        <button type="button" onClick={onBack}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default IncomeForm;
