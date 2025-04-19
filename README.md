# Date Invite App

A beautiful date invitation app built with Next.js, TypeScript, and TailwindCSS.

## Features

- Interactive date invitation experience
- Multiple date options with animations
- Email notification functionality
- Responsive design

## Setup

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

## Email Functionality Setup

This app uses EmailJS to send email notifications when users interact with the app. To set up the email functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create a new email template with the following variables:
   - `to_name`: Recipient's name
   - `from_name`: Sender's name
   - `message`: The message content
   - `reply_to`: Reply-to email address
   - `date`: Date and time of the action
4. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_public_key
```

You can find these values in your EmailJS dashboard:
- Service ID: Found in the "Email Services" section
- Template ID: Found in the "Email Templates" section
- User ID (Public Key): Found in the "Account" > "API Keys" section

## Technologies Used

- Next.js
- TypeScript
- TailwindCSS
- React Query
- React Hook Form
- Framer Motion
- EmailJS
- Supabase
