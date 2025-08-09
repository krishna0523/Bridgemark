# Web3Forms Setup Guide

This project now includes Web3Forms integration for handling contact form submissions without a backend server.

## Setup Instructions

### Step 1: Get Your Access Key

1. Visit [https://web3forms.com](https://web3forms.com)
2. Enter your email address to receive your free access key
3. Check your email for the access key
4. Copy the access key for use in the next step

### Step 2: Configure the Access Key

1. Open `components/Web3ContactForm.jsx`
2. Find this line (around line 100):
   ```javascript
   formDataObj.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY_HERE')
   ```
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual access key

### Step 3: Test the Form

1. Build and run your application:
   ```bash
   npm run build
   npm start
   ```
2. Navigate to the contact page: `/contact`
3. Fill out the form and submit
4. Check your email for the form submission

## Features Included

✅ **Client-side Validation**
- Name validation (required)
- Email validation (required + format check)
- Message validation (required + minimum length)
- Real-time error clearing

✅ **Form Enhancement**
- Project type selection
- Budget range selection
- Company field
- Professional styling matching the site design

✅ **User Experience**
- Loading states during submission
- Success/error message display
- Auto-scroll to validation errors
- Form reset after successful submission

✅ **Security**
- Honeypot spam protection
- Web3Forms built-in spam filtering
- Client-side form validation

## Web3Forms Benefits

- **Free Tier**: 250 submissions per month
- **No Backend Required**: Direct API submission
- **High Deliverability**: Powered by Amazon infrastructure
- **GDPR Friendly**: No personal data stored
- **Spam Protection**: Built-in filtering

## Customization Options

### Email Configuration
The form automatically includes:
- Custom subject line: "New Project Inquiry from [Name]"
- Reply-to field set to user's email
- Organized field data

### Additional Fields
To add more fields, modify both:
1. `formData` state in `Web3ContactForm.jsx`
2. Form JSX structure
3. FormData append statements in `handleSubmit`

### Styling
The form styling matches the existing design system:
- Inter font family
- Consistent spacing and colors
- Responsive grid layout
- Hover and focus states

## Troubleshooting

### Form Not Submitting
- Check that you've replaced the access key
- Verify internet connection
- Check browser console for errors

### Not Receiving Emails
- Check spam/junk folder
- Verify the email address used to get the access key
- Ensure Web3Forms service is operational

### Validation Issues
- Ensure all required fields are filled
- Check email format validity
- Message must be at least 10 characters

## Pro Features (Paid)
- Multiple email recipients
- Webhook integrations
- File attachments
- Custom redirects
- Advanced analytics

For more information, visit the [Web3Forms Documentation](https://docs.web3forms.com).