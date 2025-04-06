import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ReasonableSalaryForm = ({ onBack, onNext }) => {
  const { updateFormData, submitToWeb3Forms, submissionResult } = useContext(AppContext);
  const [form, setForm] = useState({ salary: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.salary) {
      newErrors.salary = 'Reasonable salary is required';
    } else if (isNaN(form.salary) || Number(form.salary) < 0) {
      newErrors.salary = 'Please enter a valid positive number';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        updateFormData({ reasonableSalary: form.salary });
        const success = await submitToWeb3Forms();
        if (success) {
          onNext();
        }
      } catch (error) {
        setErrors({ submit: 'Failed to submit the form. Please try again.' });
      }
      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="salary">Reasonable Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={errors.salary ? 'error' : ''}
        />
        {errors.salary && <div className="error-message">{errors.salary}</div>}
      </div>

      {isSubmitted && (
        <div className="success-message" style={{ color: '#4CAF50', marginBottom: '20px' }}>
          Form submitted successfully!
        </div>
      )}

      <div className="button-group">
        <button type="button" onClick={onBack}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ReasonableSalaryForm;
