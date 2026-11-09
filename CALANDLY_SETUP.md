# 📅 Calendly Integration Guide

## ✅ What's Been Set Up

Your CODEBYT website now has Calendly integrated with a beautiful popup widget that opens when users click "Book a Discovery Call".

---

## 🔧 Setup Instructions

### Step 1: Create Your Calendly Account

1. Go to [Calendly.com](https://calendly.com)
2. Sign up for a free account
3. Complete your profile and availability settings

### Step 2: Create Your Event Type

1. In Calendly dashboard, go to **Event Types**
2. Click **+ Add New** → **Group Event** or **One-on-One**
3. Configure your event:
   - **Name**: Discovery Call
   - **Location**: Phone/Video Conference
   - **Duration**: 30 minutes (recommended)
   - **Description**: Learn about your project requirements and discuss how CODEBYT can help transform your business

### Step 3: Get Your Event URL

1. Click on your event type
2. Click **Share**
3. Copy the URL (it will look like: `https://calendly.com/codebyt/discovery-call`)
4. Update the URL in these files if different:
   - `src/lib/calendly.ts` (line 19)
   - `src/components/home/ContactFormSection.tsx` (line 98)

---

## 🎨 How It Works

### User Flow:

1. User visits `/contact` page
2. Scrolls down to contact form section
3. Sees "Want to talk immediately?" section
4. Clicks **"Book a Discovery Call"** button
5. Calendly popup widget opens instantly
6. User selects a time slot
7. Booking confirmed via email

### Technical Implementation:

- **Script Loading**: Calendly widget script loads automatically when Contact page mounts
- **Popup Widget**: Opens inline without leaving your website
- **Fallback**: If widget fails, opens Calendly in new tab
- **Cleanup**: Script removes itself when component unmounts

---

## 📂 Files Modified

```
src/
├── lib/
│   └── calendly.ts          # Calendly utility functions ✨ NEW
├── pages/
│   └── Contact.tsx          # Added Calendly hook
└── components/
    └── home/
        └── ContactFormSection.tsx  # Updated button handler
```

---

## 🚀 Usage Anywhere in Your App

You can use the Calendly popup anywhere in your application:

### Option 1: Using the Hook + Function

```tsx
import { useCalendly, openCalendlyPopup } from "@/lib/calendly";

function MyComponent() {
  useCalendly(); // Load script once
  
  return (
    <button onClick={() => openCalendlyPopup()}>
      Schedule a Call
    </button>
  );
}
```

### Option 2: Direct Window Access

```tsx
// After script is loaded anywhere in app
<button 
  onClick={() => {
    // @ts-ignore
    window.Calendly.initPopupWidget({ 
      url: 'https://calendly.com/codebyt/discovery-call' 
    });
  }}
>
  Book Now
</button>
```

---

## 🎯 Customization Options

### Change Popup Size

Add these styles to your global CSS (`index.css`):

```css
/* Override Calendly popup size */
.calendly-popup-overlay {
  background: rgba(0, 0, 0, 0.6);
}

.calendly-popup-widget {
  max-width: 800px !important;
  width: 90% !important;
}
```

### Pre-fill User Information

```tsx
openCalendlyPopup(
  'https://calendly.com/codebyt/discovery-call?' +
  'name=John+Doe&' +
  'email=john@example.com&' +
  'custom_field=value'
);
```

### Different Event Types

Create multiple event types in Calendly and use different URLs:

```tsx
// Discovery Call
openCalendlyPopup('https://calendly.com/codebyt/discovery-call');

// Technical Consultation
openCalendlyPopup('https://calendly.com/codebyt/technical-consult');

// Project Kickoff
openCalendlyPopup('https://calendly.com/codebyt/kickoff');
```

---

## 🆘 Troubleshooting

### Widget Not Opening

**Check:**
1. Browser console for errors
2. Internet connection
3. Ad blockers (disable for localhost)
4. Script loaded successfully (check Network tab)

**Solution:**
```tsx
// Check if Calendly is loaded
console.log(window.Calendly); // Should be defined

// Manually load script if needed
const script = document.createElement('script');
script.src = 'https://assets.calendly.com/assets/external/widget.js';
document.head.appendChild(script);
```

### Popup Shows but Doesn't Load Events

**Possible causes:**
1. Invalid Calendly URL
2. Event type not published
3. Account restrictions

**Solution:**
- Verify your Calendly URL is correct
- Make sure event type is active and published
- Check Calendly account status

### Styling Issues

The Calendly widget uses its own styling. To customize:

1. Use Calendly dashboard theme settings
2. Override with custom CSS (limited support)
3. Consider inline embed instead of popup

---

## 📊 Analytics & Tracking

### Track Button Clicks

Add analytics to the button click:

```tsx
<Button 
  variant="hero" 
  onClick={() => {
    // Track with Google Analytics
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'calendly',
        event_label: 'discovery_call'
      });
    }
    
    openCalendlyPopup('https://calendly.com/codebyt/discovery-call');
  }}
>
  Book a Discovery Call
</Button>
```

### Track Bookings in Calendly

Calendly provides built-in analytics:
1. Go to Calendly Dashboard
2. Click **Analytics**
3. View booking trends, popular times, etc.

---

## 🌐 Deployment Notes

### For Netlify Deployment

No additional configuration needed! The Calendly script loads from their CDN.

Just ensure:
- ✅ Your Calendly URL is public
- ✅ No CORS issues (Calendly allows all origins)
- ✅ HTTPS enabled (Netlify provides SSL)

---

## 💡 Best Practices

1. **Mobile Optimization**: Test on mobile devices - Calendly is responsive by default
2. **Loading Time**: Widget loads asynchronously, won't block page render
3. **Accessibility**: Button includes proper ARIA labels
4. **Privacy**: Inform users about Calendly's data collection in privacy policy
5. **Backup Plan**: Always have alternative contact methods (email, phone)

---

## 📞 Support

- **Calendly Help**: https://help.calendly.com
- **Calendly Community**: https://community.calendly.com
- **CODEBYT Support**: Codebytdigital@gmail.com

---

**Happy Scheduling!** 📅✨

*Last Updated: March 14, 2026*
