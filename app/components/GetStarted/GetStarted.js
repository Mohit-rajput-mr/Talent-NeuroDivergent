'use client'
import { useState } from 'react';
import './GetStarted.css';

const GetStarted = () => {
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'candidate', 'company', 'therapist'
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Candidate specific
    age: '',
    education: '',
    experience: '',
    skills: [],
    neurodivergentType: '',
    accommodations: '',
    workPreference: '',
    
    // Company specific
    companyName: '',
    industry: '',
    companySize: '',
    position: '',
    hiringGoals: '',
    diversityExperience: '',
    jobTypes: [],
    
    // Therapist specific
    licenseNumber: '',
    specialization: '',
    yearsOfExperience: '',
    certifications: [],
    therapyTypes: [],
    availability: '',
    consultationFee: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle user type selection
  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setCurrentStep(type);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Common validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (userType === 'candidate') {
      if (!formData.age) newErrors.age = 'Age is required';
      if (!formData.education) newErrors.education = 'Education level is required';
      if (!formData.experience) newErrors.experience = 'Experience level is required';
      if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
    }
    
    if (userType === 'company') {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.position.trim()) newErrors.position = 'Your position is required';
    }
    
    if (userType === 'therapist') {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData.specialization) newErrors.specialization = 'Specialization is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
      if (formData.certifications.length === 0) newErrors.certifications = 'Select at least one certification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create user data object
      const userData = {
        userType,
        ...formData,
        registrationDate: new Date().toISOString(),
        isRegistered: true
      };
      
      // Save to localStorage
      localStorage.setItem('diversia_user_data', JSON.stringify(userData));
      
      // Here you would typically send data to your backend
      console.log('Form submitted:', userData);
      
      // Show success message
      alert(`Welcome to DiversIA, ${formData.firstName}! Your profile has been created successfully.`);
      
      // Redirect to appropriate dashboard
      if (userType === 'company') {
        window.location.href = '/company';
      } else if (userType === 'candidate') {
        window.location.href = '/dashboard';
      } else if (userType === 'therapist') {
        window.location.href = '/therapist';
      } else {
        window.location.href = '/';
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Go back to selection
  const handleGoBack = () => {
    setCurrentStep('selection');
    setUserType('');
  };

  // Render selection screen
  const renderSelection = () => (
    <div className="selectionContainer">
      <div className="headerSection">
        <h1 className="mainTitle">
          Get Started with <span className="brandText">DiversIA</span>
        </h1>
        <p className="subtitle">
          Choose your path to unlock neurodivergent superpowers
        </p>
      </div>
      
      <div className="optionsGrid">
        <div 
          className="optionCard"
          onClick={() => handleUserTypeSelection('candidate')}
        >
          <div className="optionIcon">👤</div>
          <h3 className="optionTitle">I'm a Candidate</h3>
          <p className="optionDescription">
            Discover your unique strengths and find roles that match your superpowers
          </p>
          <div className="optionFeatures">
            <span>✨ Superpower Assessment</span>
            <span>🎯 Personalized Job Matching</span>
            <span>📈 Career Development</span>
          </div>
          <button className="optionButton">Start Your Journey</button>
        </div>
        
        <div 
          className="optionCard"
          onClick={() => handleUserTypeSelection('company')}
        >
          <div className="optionIcon">🏢</div>
          <h3 className="optionTitle">I'm a Company</h3>
          <p className="optionDescription">
            Find exceptional neurodivergent talent and learn how to build inclusive teams
          </p>
          <div className="optionFeatures">
            <span>🔍 Access Top Talent</span>
            <span>🎓 Team Training Resources</span>
            <span>📊 Diversity Analytics</span>
          </div>
          <button className="optionButton">Find Talent</button>
        </div>
        
        <div 
          className="optionCard"
          onClick={() => handleUserTypeSelection('therapist')}
        >
          <div className="optionIcon">🩺</div>
          <h3 className="optionTitle">I'm a Therapist</h3>
          <p className="optionDescription">
            Support neurodivergent individuals and help them thrive in their professional journey
          </p>
          <div className="optionFeatures">
            <span>👥 Client Management</span>
            <span>📋 Assessment Tools</span>
            <span>💼 Professional Resources</span>
          </div>
          <button className="optionButton">Start Helping</button>
        </div>
      </div>
    </div>
  );

  // Render candidate form
  const renderCandidateForm = () => (
    <div className="formContainer">
      <div className="formHeader">
        <button className="backButton" onClick={handleGoBack}>← Back</button>
        <h2 className="formTitle">Candidate Registration</h2>
        <p className="formSubtitle">Let's discover your superpowers</p>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="formSection">
          <h3 className="sectionTitle">Personal Information</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`input ${errors.firstName ? 'inputError' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="errorText">{errors.firstName}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`input ${errors.lastName ? 'inputError' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="errorText">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input ${errors.email ? 'inputError' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Professional Background</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Age Range *</label>
              <select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={`select ${errors.age ? 'inputError' : ''}`}
              >
                <option value="">Select age range</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46-55">46-55</option>
                <option value="55+">55+</option>
              </select>
              {errors.age && <span className="errorText">{errors.age}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Education Level *</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className={`select ${errors.education ? 'inputError' : ''}`}
              >
                <option value="">Select education level</option>
                <option value="high-school">High School</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD/Doctorate</option>
                <option value="other">Other</option>
              </select>
              {errors.education && <span className="errorText">{errors.education}</span>}
            </div>
          </div>
          
          <div className="formGroup">
            <label className="label">Experience Level *</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className={`select ${errors.experience ? 'inputError' : ''}`}
            >
              <option value="">Select experience level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (6-10 years)</option>
              <option value="expert">Expert Level (10+ years)</option>
            </select>
            {errors.experience && <span className="errorText">{errors.experience}</span>}
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Skills & Preferences</h3>
          <div className="formGroup">
            <label className="label">Core Skills * (Select all that apply)</label>
            <div className="checkboxGrid">
              {['Programming', 'Data Analysis', 'Design', 'Writing', 'Research', 'Problem Solving', 'Pattern Recognition', 'Attention to Detail'].map(skill => (
                <label key={skill} className="checkboxLabel">
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  {skill}
                </label>
              ))}
            </div>
            {errors.skills && <span className="errorText">{errors.skills}</span>}
          </div>
          
          <div className="formGroup">
            <label className="label">Neurodivergent Type (Optional)</label>
            <select
              name="neurodivergentType"
              value={formData.neurodivergentType}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Prefer not to specify</option>
              <option value="autism">Autism Spectrum</option>
              <option value="adhd">ADHD</option>
              <option value="dyslexia">Dyslexia</option>
              <option value="dyspraxia">Dyspraxia</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="formGroup">
            <label className="label">Work Preference</label>
            <select
              name="workPreference"
              value={formData.workPreference}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Select preference</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <div className="formGroup">
            <label className="label">Accommodations Needed (Optional)</label>
            <textarea
              name="accommodations"
              value={formData.accommodations}
              onChange={handleInputChange}
              className="textarea"
              placeholder="Describe any workplace accommodations that would help you perform your best..."
              rows="4"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="submitButton"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Your Profile...' : 'Create My Profile'}
        </button>
      </form>
    </div>
  );

  // Render company form
  const renderCompanyForm = () => (
    <div className="formContainer">
      <div className="formHeader">
        <button className="backButton" onClick={handleGoBack}>← Back</button>
        <h2 className="formTitle">Company Registration</h2>
        <p className="formSubtitle">Connect with exceptional neurodivergent talent</p>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="formSection">
          <h3 className="sectionTitle">Contact Information</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`input ${errors.firstName ? 'inputError' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="errorText">{errors.firstName}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`input ${errors.lastName ? 'inputError' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="errorText">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input ${errors.email ? 'inputError' : ''}`}
                placeholder="your.email@company.com"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Company Information</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`input ${errors.companyName ? 'inputError' : ''}`}
                placeholder="Enter company name"
              />
              {errors.companyName && <span className="errorText">{errors.companyName}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Your Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={`input ${errors.position ? 'inputError' : ''}`}
                placeholder="e.g., HR Manager, CEO, Recruiter"
              />
              {errors.position && <span className="errorText">{errors.position}</span>}
            </div>
          </div>
          
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`select ${errors.industry ? 'inputError' : ''}`}
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && <span className="errorText">{errors.industry}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Company Size *</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className={`select ${errors.companySize ? 'inputError' : ''}`}
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              {errors.companySize && <span className="errorText">{errors.companySize}</span>}
            </div>
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Hiring Preferences</h3>
          <div className="formGroup">
            <label className="label">Job Types You're Hiring For (Select all that apply)</label>
            <div className="checkboxGrid">
              {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'].map(type => (
                <label key={type} className="checkboxLabel">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value={type}
                    checked={formData.jobTypes.includes(type)}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          
          <div className="formGroup">
            <label className="label">Hiring Goals</label>
            <textarea
              name="hiringGoals"
              value={formData.hiringGoals}
              onChange={handleInputChange}
              className="textarea"
              placeholder="Describe your hiring goals and what roles you're looking to fill..."
              rows="4"
            />
          </div>
          
          <div className="formGroup">
            <label className="label">Diversity & Inclusion Experience</label>
            <select
              name="diversityExperience"
              value={formData.diversityExperience}
              onChange={handleInputChange}
              className="select"
            >
              <option value="">Select experience level</option>
              <option value="beginner">Just getting started</option>
              <option value="some">Some experience</option>
              <option value="experienced">Very experienced</option>
              <option value="expert">Leading industry practices</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="submitButton"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Your Account...' : 'Start Finding Talent'}
        </button>
      </form>
    </div>
  );

  // Render therapist form
  const renderTherapistForm = () => (
    <div className="formContainer">
      <div className="formHeader">
        <button className="backButton" onClick={handleGoBack}>← Back</button>
        <h2 className="formTitle">Therapist Registration</h2>
        <p className="formSubtitle">Join our network of neurodivergent support professionals</p>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="formSection">
          <h3 className="sectionTitle">Personal Information</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`input ${errors.firstName ? 'inputError' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="errorText">{errors.firstName}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`input ${errors.lastName ? 'inputError' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="errorText">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input ${errors.email ? 'inputError' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Professional Credentials</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">License Number *</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className={`input ${errors.licenseNumber ? 'inputError' : ''}`}
                placeholder="Enter your professional license number"
              />
              {errors.licenseNumber && <span className="errorText">{errors.licenseNumber}</span>}
            </div>
            <div className="formGroup">
              <label className="label">Years of Experience *</label>
              <select
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                className={`select ${errors.yearsOfExperience ? 'inputError' : ''}`}
              >
                <option value="">Select experience level</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="15+">15+ years</option>
              </select>
              {errors.yearsOfExperience && <span className="errorText">{errors.yearsOfExperience}</span>}
            </div>
          </div>
          
          <div className="formGroup">
            <label className="label">Primary Specialization *</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className={`select ${errors.specialization ? 'inputError' : ''}`}
            >
              <option value="">Select specialization</option>
              <option value="adhd">ADHD Specialist</option>
              <option value="autism">Autism Spectrum Specialist</option>
              <option value="dyslexia">Dyslexia Specialist</option>
              <option value="dyspraxia">Dyspraxia Specialist</option>
              <option value="general">General Neurodivergent Support</option>
              <option value="occupational">Occupational Therapy</option>
              <option value="psychology">Clinical Psychology</option>
              <option value="other">Other</option>
            </select>
            {errors.specialization && <span className="errorText">{errors.specialization}</span>}
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Certifications & Training</h3>
          <div className="formGroup">
            <label className="label">Professional Certifications * (Select all that apply)</label>
            <div className="checkboxGrid">
              {['Licensed Clinical Psychologist', 'Licensed Professional Counselor', 'Occupational Therapist', 'ADHD Coach', 'Autism Specialist', 'Dyslexia Specialist', 'Neurodivergent Coach', 'Career Counselor'].map(cert => (
                <label key={cert} className="checkboxLabel">
                  <input
                    type="checkbox"
                    name="certifications"
                    value={cert}
                    checked={formData.certifications.includes(cert)}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  {cert}
                </label>
              ))}
            </div>
            {errors.certifications && <span className="errorText">{errors.certifications}</span>}
          </div>
          
          <div className="formGroup">
            <label className="label">Therapy Types Offered (Select all that apply)</label>
            <div className="checkboxGrid">
              {['Individual Therapy', 'Group Therapy', 'Family Therapy', 'Career Counseling', 'Assessment & Evaluation', 'Skills Training', 'Accommodation Planning', 'Workplace Support'].map(type => (
                <label key={type} className="checkboxLabel">
                  <input
                    type="checkbox"
                    name="therapyTypes"
                    value={type}
                    checked={formData.therapyTypes.includes(type)}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="formSection">
          <h3 className="sectionTitle">Practice Information</h3>
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="select"
              >
                <option value="">Select availability</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="weekends">Weekends only</option>
                <option value="evenings">Evenings only</option>
                <option value="flexible">Flexible schedule</option>
              </select>
            </div>
            <div className="formGroup">
              <label className="label">Consultation Fee (USD)</label>
              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleInputChange}
                className="input"
                placeholder="e.g., 150"
                min="0"
              />
            </div>
          </div>
          
          <div className="formGroup">
            <label className="label">Professional Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="textarea"
              placeholder="Tell us about your experience, approach, and how you help neurodivergent individuals..."
              rows="4"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="submitButton"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Your Profile...' : 'Join Our Network'}
        </button>
      </form>
    </div>
  );

  return (
    <div className="container">
      <div className="background">
        <div className="backgroundShape1"></div>
        <div className="backgroundShape2"></div>
        <div className="backgroundShape3"></div>
      </div>
      
      <div className="content">
        {currentStep === 'selection' && renderSelection()}
        {currentStep === 'candidate' && renderCandidateForm()}
        {currentStep === 'company' && renderCompanyForm()}
        {currentStep === 'therapist' && renderTherapistForm()}
      </div>
    </div>
  );
};

export default GetStarted;