import React, { useState } from 'react';
import './EnrollmentForm.css';

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    paymentMethod: 'credit',
    termsAccepted: false
  });

  const courses = [
    'Web Development',
    'Data Science',
    'UX/UI Design',
    'Digital Marketing',
    'Mobile App Development'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Enrollment submitted successfully!');
    // Reset form or redirect here
  };

  return (
    <div className="enrollment-container">
      <h2>Course Enrollment Form</h2>
      <form onSubmit={handleSubmit} className="enrollment-form">
        {/* Personal Information */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-group">
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Course Information */}
        <fieldset>
          <legend>Course Details</legend>
          <div className="form-group">
            <label htmlFor="course">Select Course*</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a course --</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Previous Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe any relevant experience..."
            />
          </div>
        </fieldset>

        {/* Payment Information */}
        <fieldset>
          <legend>Payment Method</legend>
          <div className="radio-group">
            {['credit', 'paypal', 'bank'].map(method => (
              <label key={method} className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                />
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Terms and Submission */}
        <div className="form-group terms">
          <label className="terms-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            I agree to the terms and conditions*
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Enroll Now
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;