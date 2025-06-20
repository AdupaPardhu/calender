https://calender-mih7.vercel.app/
# Futuristic Calendar Application

A modern, responsive calendar application built with Next.js, React, and Tailwind CSS featuring a futuristic design and comprehensive event management capabilities.

## 🚀 Features

### Core Functionality
- **Multiple View Modes**: Month, Week, and Day views
- **Event Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Event Conflicts**: Visual indicators for overlapping events
- **Real-time Clock**: Live date and time display
- **Responsive Design**: Works perfectly on all devices

### Advanced Features
- **Event Search**: Search through events by title or description
- **Event Categories**: Color-coded categories (Work, Personal, Meeting, etc.)
- **Event Statistics**: Dashboard showing event counts and analytics
- **Quick Actions**: Fast event creation and data export/import
- **Keyboard Shortcuts**: Power user shortcuts for navigation
- **Mini Calendar**: Quick date navigation sidebar

### UI/UX Features
- **Futuristic Design**: Glass morphism with gradient backgrounds
- **Smooth Animations**: Hover effects and transitions
- **Dark Theme**: Modern dark interface with purple/pink accents
- **Mobile Responsive**: Optimized for mobile and tablet devices

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

## 📱 Responsive Design

The application is fully responsive and provides an optimal experience across:
- **Desktop** (1200px+): Full sidebar with mini calendar
- **Tablet** (768px - 1199px): Collapsible sidebar
- **Mobile** (< 768px): Mobile-optimized layout with drawer navigation

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N` - Create new event
- `Ctrl/Cmd + ←/→` - Navigate months/weeks/days
- `Ctrl/Cmd + T` - Go to today
- `Escape` - Close modals

## 🎨 Design Features

- **Glass Morphism**: Translucent elements with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-to-pink gradients
- **Smooth Animations**: Hover effects and micro-interactions
- **Color-coded Events**: Different colors for event categories
- **Visual Conflict Indicators**: Warnings for overlapping events

## 📦 Installation & Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 📊 Event Data Structure

Events are stored with the following structure:

\`\`\`json
{
  "id": "unique-id",
  "title": "Event Title",
  "description": "Optional description",
  "date": "2025-01-20",
  "time": "14:00",
  "duration": "1h",
  "category": "work"
}
\`\`\`

## 🔧 Customization

The application supports easy customization:
- **Colors**: Modify gradient colors in Tailwind config
- **Event Categories**: Add new categories in the event types
- **View Modes**: Extend with additional view options
- **Themes**: Add light theme support

## 📄 License

This project is open source and available under the MIT License.
