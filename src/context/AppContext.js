import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo: {},
    incomeDetails: {},
    expenses: {},
    reasonableSalary: {},
  });
  const [submissionResult, setSubmissionResult] = useState("");

  const updateFormData = (step, data) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  const submitToWeb3Forms = async () => {
    setSubmissionResult("Sending....");
    const form = new FormData();
    
    // Add all form data as JSON
    form.append("form_data", JSON.stringify(formData));
    form.append("access_key", "88654ca7-ee14-43dd-aab1-8e303a69f7b2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionResult("Form Submitted Successfully");
        return true;
      } else {
        console.log("Error", data);
        setSubmissionResult(data.message);
        return false;
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionResult("An error occurred while submitting the form");
      return false;
    }
  };

  return (
    <AppContext.Provider value={{ 
      formData, 
      updateFormData, 
      submitToWeb3Forms, 
      submissionResult 
    }}>
      {children}
    </AppContext.Provider>
  );
};
