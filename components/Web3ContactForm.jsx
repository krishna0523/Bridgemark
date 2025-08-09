import { useState } from 'react'

export default function Web3ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: '',
    countryCode: '+1',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'Brand Identity Design',
    'E-commerce Platform',
    'SaaS Application',
    'Digital Marketing',
    'UI/UX Design',
    'Other'
  ]

  const budgetRanges = [
    '$5K - $15K',
    '$15K - $30K',
    '$30K - $50K',
    '$50K - $100K',
    '$100K+',
    'Let\'s discuss'
  ]

  const countryCodes = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' }
  ]

  // Validation function
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Project details are required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide more details about your project (minimum 10 characters)'
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim() && !/^[\d\s\-\(\)]+$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number'
    }
    
    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateForm()
    setValidationErrors(errors)
    
    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.focus()
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const formDataObj = new FormData()
      
      // Add Web3Forms access key
      formDataObj.append('access_key', '5dbb14e1-ff10-466c-a85d-3bccb0d6f084')
      
      // Add form data
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('company', formData.company || 'Not specified')
      formDataObj.append('project', formData.project || 'Not specified')
      formDataObj.append('budget', formData.budget || 'Not specified')
      formDataObj.append('phone', formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided')
      formDataObj.append('message', formData.message)
      
      // Add subject line
      formDataObj.append('subject', `New Project Inquiry from ${formData.name}`)
      
      // Add custom fields for better organization
      formDataObj.append('from_name', formData.name)
      formDataObj.append('reply_to', formData.email)

      console.log('Submitting form with data:', {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        project: formData.project,
        budget: formData.budget,
        phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided',
        message: formData.message.substring(0, 50) + '...'
      })

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj
      })

      const data = await response.json()
      
      console.log('Web3Forms API response:', data)
      console.log('Response status:', response.status)

      if (data.success) {
        console.log('✅ Form submitted successfully to Web3Forms')
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          project: '',
          budget: '',
          message: '',
          countryCode: '+1',
          phone: ''
        })
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('')
        }, 5000)
      } else {
        console.error('❌ Web3Forms API returned error:', data)
        throw new Error(data.message || 'Web3Forms API returned an error')
      }
    } catch (error) {
      console.error('❌ Form submission error:', error)
      setSubmitStatus('error')
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div style={{
        marginBottom: '3rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: '200',
          marginBottom: '1rem',
          margin: 0
        }}>
          Start Your Project
        </h2>
        <p style={{
          fontSize: '1.125rem',
          fontWeight: '300',
          lineHeight: '1.6',
          opacity: 0.8
        }}>
          Tell us about your project and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {/* Personal Information Section */}
        <div style={{
          marginBottom: '3rem',
          padding: '0 0 2rem 0',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h3 className="section-title" style={{
            fontSize: '1.125rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
            color: '#000000',
            margin: 0,
            marginBottom: '1.5rem'
          }}>
            Personal Information
          </h3>
          
          <div className="form-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.75rem',
                color: '#000000'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: `2px solid ${validationErrors.name ? '#dc3545' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!validationErrors.name) e.target.style.border = '2px solid #000000'
                }}
                onBlur={(e) => {
                  if (!validationErrors.name) e.target.style.border = '2px solid rgba(0,0,0,0.15)'
                }}
              />
              {validationErrors.name && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  fontWeight: '500'
                }}>
                  {validationErrors.name}
                </div>
              )}
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.75rem',
                color: '#000000'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: `2px solid ${validationErrors.email ? '#dc3545' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!validationErrors.email) e.target.style.border = '2px solid #000000'
                }}
                onBlur={(e) => {
                  if (!validationErrors.email) e.target.style.border = '2px solid rgba(0,0,0,0.15)'
                }}
              />
              {validationErrors.email && (
                <div style={{
                  color: '#dc3545',
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  fontWeight: '500'
                }}>
                  {validationErrors.email}
                </div>
              )}
            </div>
          </div>

          {/* Phone Number Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#000000'
            }}>
              Phone Number
            </label>
            <div className="phone-grid" style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              gap: '1rem',
              alignItems: 'start'
            }}>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                style={{
                  padding: '1rem 1.25rem',
                  border: '2px solid rgba(0,0,0,0.15)',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  outline: 'none',
                  height: '56px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.border = '2px solid #000000'}
                onBlur={(e) => e.target.style.border = '2px solid rgba(0,0,0,0.15)'}
              >
                {countryCodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                style={{
                  padding: '1rem 1.25rem',
                  border: `2px solid ${validationErrors.phone ? '#dc3545' : 'rgba(0,0,0,0.15)'}`,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  outline: 'none',
                  height: '56px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  if (!validationErrors.phone) e.target.style.border = '2px solid #000000'
                }}
                onBlur={(e) => {
                  if (!validationErrors.phone) e.target.style.border = '2px solid rgba(0,0,0,0.15)'
                }}
              />
            </div>
            {validationErrors.phone && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                {validationErrors.phone}
              </div>
            )}
          </div>
        </div>

        {/* Company & Project Section */}
        <div style={{
          marginBottom: '3rem',
          padding: '0 0 2rem 0',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h3 className="section-title" style={{
            fontSize: '1.125rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
            color: '#000000',
            margin: 0,
            marginBottom: '1.5rem'
          }}>
            Company & Project Details
          </h3>
          
          <div className="form-grid-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.75rem',
                color: '#000000'
              }}>
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter your company name (optional)"
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid rgba(0,0,0,0.15)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.border = '2px solid #000000'}
                onBlur={(e) => e.target.style.border = '2px solid rgba(0,0,0,0.15)'}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.75rem',
                color: '#000000'
              }}>
                Project Type
              </label>
              <select
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid rgba(0,0,0,0.15)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box',
                  height: '56px'
                }}
                onFocus={(e) => e.target.style.border = '2px solid #000000'}
                onBlur={(e) => e.target.style.border = '2px solid rgba(0,0,0,0.15)'}
              >
                <option value="">Select a project type</option>
                {projectTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#000000'
            }}>
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid rgba(0,0,0,0.15)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                background: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box',
                height: '56px'
              }}
              onFocus={(e) => e.target.style.border = '2px solid #000000'}
              onBlur={(e) => e.target.style.border = '2px solid rgba(0,0,0,0.15)'}
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range, index) => (
                <option key={index} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Details Section */}
        <div style={{
          marginBottom: '3rem'
        }}>
          <h3 className="section-title" style={{
            fontSize: '1.125rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
            color: '#000000',
            margin: 0,
            marginBottom: '1.5rem'
          }}>
            Project Details
          </h3>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: '#000000'
            }}>
              Tell us about your project *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="6"
              placeholder="Please describe your project goals, requirements, timeline, and any specific details that would help us understand your needs..."
              style={{
                width: '100%',
                padding: '1.25rem',
                border: `2px solid ${validationErrors.message ? '#dc3545' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: '12px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                background: '#ffffff',
                outline: 'none',
                resize: 'vertical',
                minHeight: '140px',
                lineHeight: '1.5',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                if (!validationErrors.message) e.target.style.border = '2px solid #000000'
              }}
              onBlur={(e) => {
                if (!validationErrors.message) e.target.style.border = '2px solid rgba(0,0,0,0.15)'
              }}
            />
            {validationErrors.message && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                {validationErrors.message}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '2rem'
        }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
            style={{
              padding: '1.25rem 3rem',
              background: isSubmitting ? 'rgba(0,0,0,0.5)' : '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'inherit',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              minWidth: '200px',
              boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#333333'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#000000'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'
              }
            }}
          >
            {isSubmitting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="status-message" style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #d4edda 0%, #e8f5e8 100%)',
            border: '2px solid #c3e6cb',
            borderRadius: '12px',
            color: '#155724',
            fontSize: '1rem',
            fontWeight: '500',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>✓</span>
            Message sent successfully! We'll get back to you within 24 hours.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="status-message" style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f8d7da 0%, #fce4e6 100%)',
            border: '2px solid #f5c6cb',
            borderRadius: '12px',
            color: '#721c24',
            fontSize: '1rem',
            fontWeight: '500',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>✗</span>
            Something went wrong. Please try again or contact us directly at hello@bridgesoftwaresolutions.com
          </div>
        )}

        {/* Web3Forms Honeypot (hidden spam protection) */}
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
      </form>
      
      {/* CSS for animations and responsive design */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .phone-grid {
            grid-template-columns: 100px 1fr !important;
          }
          
          .submit-button {
            padding: 1rem 2rem !important;
            font-size: 0.9rem !important;
          }
          
          .section-title {
            font-size: 1rem !important;
          }
          
          .form-input, .form-select, .form-textarea {
            padding: 0.875rem 1rem !important;
            font-size: 0.9rem !important;
          }
          
          .country-select {
            padding: 0.875rem 0.75rem !important;
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .phone-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          
          .submit-button {
            width: 100% !important;
            padding: 1rem 1.5rem !important;
          }
          
          .status-message {
            padding: 1rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  )
}