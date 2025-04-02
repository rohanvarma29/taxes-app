import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Notification from './Notification';
import '../styles/Notification.css';

const PersonalInfoForm = ({ onNext }) => {
  const { updateFormData } = useContext(AppContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
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
      updateFormData('personalInfo', form);
      setNotification({
        message: 'Personal information saved successfully!',
        type: 'success'
      });
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Notification message={notification.message} type={notification.type} />
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="123-456-7890"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <div className="button-group">
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
