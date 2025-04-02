import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import IncomeForm from './IncomeForm';
import ExpensesForm from './ExpensesForm';
import ReasonableSalaryForm from './ReasonableSalaryForm';

const Wizard = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const resetStep = () => setStep(1);

  return (
    <div className="wizard-container">
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>Personal Info</div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>Income</div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>Expenses</div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>Salary</div>
        </div>
      </div>
      <div className="form-container">
        {step === 1 && <PersonalInfoForm onNext={nextStep} />}
        {step === 2 && <IncomeForm onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <ExpensesForm onNext={nextStep} onBack={prevStep} />}
        {step === 4 && <ReasonableSalaryForm onBack={prevStep} onReset={resetStep} />}
      </div>
    </div>
  );
};

export default Wizard;
