# VendorHub - Vendor Registration Platform

A modern, multi-step vendor registration system built with Next.js, TypeScript, and Zustand for state management.

## 🚀 Features

### Authentication System
- **JWT-based login** with persistent sessions using Zustand
- **Automatic token management** for API calls
- **User profile display** in navigation with logout functionality
- **Login dialog modal** with modern UI and loading states

### Multi-Step Registration Form
- **8-step registration process** with progress tracking
- **Real-time form validation** and step completion tracking
- **Document upload support** for business certificates and licenses
- **Responsive design** with mobile-friendly navigation

### State Management
- **Zustand store** for authentication state persistence
- **Controlled form inputs** with proper default values
- **Error handling** with user-friendly feedback messages
- **Automatic data persistence** across browser sessions

### API Integration
- **Bearer token authentication** for secure API calls
- **File upload support** with FormData for document submission
- **RESTful API endpoints** for login and vendor registration
- **Comprehensive error handling** with network retry logic

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management**: Zustand with persist middleware
- **Forms**: React controlled components with validation
- **File Uploads**: HTML5 File API with FormData
- **Authentication**: JWT tokens with automatic refresh

## 📋 Registration Steps

1. **Business Information** - Company details, registration numbers
2. **Owner/Representative** - Authorized person information
3. **Business Address** - Physical location details
4. **Product Categories** - Business focus areas
5. **Document Uploads** - Required certificates and licenses
6. **Financial Information** - Banking and payment details
7. **Pickup Addresses** - Logistics and shipping locations
8. **Agreements** - Terms, privacy policy, and legal compliance
9. **Review & Submit** - Final validation and API submission

## 🔐 Authentication Flow

1. User clicks **Login** button in navbar
2. **Modal dialog** opens with email/password form
3. **API call** to `/auth/login` with credentials
4. **Zustand store** saves user data and JWT token
5. **UI updates** to show user profile and logout option
6. **Token persists** across browser sessions in localStorage

## 📤 File Upload System

Supports multiple document types:
- DICA Certificate
- TIN Certificate  
- NRC/Passport
- Business License
- Bank Documents
- Authorization Letter

## 🎨 UI/UX Features

- **Modern design** with consistent green branding (#00B14F)
- **Loading states** and progress indicators
- **Error handling** with contextual feedback
- **Mobile responsive** with hamburger menu
- **Accessibility** with proper ARIA labels and keyboard navigation

## 🔧 Configuration

API endpoints configured in `src/lib/config.ts`:
- Base URL: `https://ecommerce-2-cdft.onrender.com`
- Login: `/auth/login`
- Registration: `/vendors/register`

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── registration/        # Multi-step form pages
│   └── landing/            # Landing page
├── lib/
│   ├── auth-store.ts       # Zustand authentication store
│   ├── vendor-registration.ts # API integration hooks
│   └── config.ts           # API configuration
└── components/
    └── vendor/             # Vendor-specific components
```

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to access the application.

## 🔑 Key Benefits

- **Seamless UX**: Single-page application with smooth navigation
- **Data Persistence**: Forms auto-save progress, login persists
- **Error Resilience**: Comprehensive error handling and validation
- **Mobile First**: Responsive design for all device sizes
- **Type Safety**: Full TypeScript implementation with proper interfaces
