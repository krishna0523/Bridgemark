# Crisp.chat Live Chat Setup Guide

This project now includes Crisp.chat integration for live chat functionality with website visitors.

## Setup Instructions

### Step 1: Create Crisp.chat Account

1. Visit [https://crisp.chat](https://crisp.chat)
2. Sign up for a free account
3. Complete the onboarding process

### Step 2: Get Your Website ID

1. Go to [https://app.crisp.chat](https://app.crisp.chat)
2. Navigate to **Settings** → **Workspace Settings** → **Setup & Integrations**
3. Copy your **Website ID** (it looks like: `12345678-1234-1234-1234-123456789012`)

### Step 3: Configure the Website ID

1. Open `components/CrispChat.jsx`
2. Find this line (around line 8):
   ```javascript
   Crisp.configure('YOUR_CRISP_WEBSITE_ID_HERE')
   ```
3. Replace `YOUR_CRISP_WEBSITE_ID_HERE` with your actual Website ID

### Step 4: Customize Chat Settings (Optional)

In the CrispChat component, you can uncomment and customize these options:

```javascript
// Set user information if available
Crisp.user.setEmail('user@example.com')
Crisp.user.setNickname('User Name')

// Show a welcome message
Crisp.message.show('text', "👋 Hi! How can we help you today?")
```

### Step 5: Test the Integration

1. Build and run your application:
   ```bash
   npm run build
   npm start
   ```
2. Visit any page on your website
3. The Crisp chat widget should appear in the bottom-right corner
4. Test sending a message from the chat widget
5. Check your Crisp dashboard for incoming messages

## Features Included

✅ **Live Chat Widget**
- Automatic chat widget on all pages
- Modern, responsive design
- Mobile-friendly interface

✅ **Professional Integration**
- Clean component architecture
- Next.js 14 compatible with "use client" directive
- Proper useEffect lifecycle management

✅ **Customization Options**
- Welcome messages
- User identification
- Chat appearance settings
- Helpdesk view integration

## Crisp.chat Benefits

### Free Tier Includes:
- **Unlimited conversations**
- **2 operators**
- **Basic integrations**
- **Mobile apps**
- **Email notifications**

### Paid Plans Offer:
- Unlimited operators
- Advanced integrations
- Analytics and reports
- Custom branding
- Advanced automation

## Chat Widget Features

- **Real-time messaging**
- **File sharing**
- **Emoji support**
- **Typing indicators**
- **Message history**
- **Offline message collection**
- **Multi-language support**

## Customization Options

### Chat Appearance
```javascript
// Set theme color
Crisp.chat.setTheme('default') // 'default', 'orange', 'blue', etc.

// Hide/show widget
Crisp.chat.hide()
Crisp.chat.show()

// Open/close chat
Crisp.chat.open()
Crisp.chat.close()
```

### User Management
```javascript
// Set user details
Crisp.user.setEmail('user@email.com')
Crisp.user.setNickname('John Doe')
Crisp.user.setPhone('+1234567890')
Crisp.user.setAvatar('https://example.com/avatar.jpg')

// Set custom data
Crisp.session.setData({
  subscription: 'premium',
  loginDate: new Date()
})
```

### Event Handling
```javascript
// Listen for chat events
Crisp.chat.onChatOpened(() => {
  console.log('Chat opened')
})

Crisp.chat.onChatClosed(() => {
  console.log('Chat closed')
})

Crisp.message.onMessageSent(() => {
  console.log('Message sent by user')
})
```

## Integration with Web3Forms

The live chat works alongside your existing Web3Forms contact form:
- **Instant Support**: Live chat for immediate assistance
- **Detailed Inquiries**: Contact form for project details
- **Lead Capture**: Both collect valuable visitor information

## Troubleshooting

### Chat Widget Not Appearing
- Check that you've replaced the Website ID
- Verify your Crisp account is active
- Check browser console for errors
- Ensure JavaScript is enabled

### Messages Not Received
- Check your Crisp dashboard at app.crisp.chat
- Verify email notifications are enabled
- Check spam folder for Crisp notifications
- Test with incognito/private browser mode

### Performance Issues
- The Crisp SDK is lightweight and loads asynchronously
- No impact on page load speed
- Chat history is cached locally

## Mobile Support

The chat widget is fully responsive and includes:
- Touch-friendly interface
- Optimized for mobile screens
- Native app feel on mobile devices
- Offline message collection

## Privacy & GDPR

Crisp.chat is GDPR compliant and includes:
- Data processing agreements
- User consent management
- Data retention controls
- Export/delete user data options

For more information, visit the [Crisp.chat Documentation](https://docs.crisp.chat)