# TicketFlow - Modern Ticket Management System

A beautiful, modern ticket management application built with React and Tailwind CSS.

## Features

- 🎨 Modern dark theme with gradient effects
- 🎫 Full ticket management (create, filter, prioritize)
- 📊 Real-time statistics dashboard
- 🔍 Advanced search and filtering
- 👥 User authentication and profile management
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎯 Priority management with visual indicators
- 📈 Progress tracking for in-progress tickets

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

## Project Structure

```
ticket-flow-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── StatusBadge.jsx
│   │   ├── PriorityBadge.jsx
│   │   ├── StatsCard.jsx
│   │   ├── NewTicketModal.jsx
│   │   ├── FilterMenu.jsx
│   │   └── ProfileMenu.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project

2. Navigate to the project directory:
```bash
cd ticket-flow-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Demo Credentials

- **Email:** demo@ticketflow.com
- **Password:** demo123

### Navigation Flow

1. **Homepage** → View features and click "View Demo" or "Get Started"
2. **Demo Page** → Explore all features without signing in
3. **Login Page** → Enter credentials and sign in
4. **Dashboard** → Manage tickets, create new ones, and filter

### Key Features

#### Creating Tickets
- Click "New Ticket" button
- Fill in title, category, priority, assignee, dates, and description
- Click "Create Ticket"

#### Filtering Tickets
- Click "Filter" button
- Select priorities and categories
- Click "Apply" to filter tickets

#### Changing Priority
- Click on any priority badge
- Select new priority from dropdown

#### Profile Menu
- Click on profile avatar (SC)
- Access settings, help, or logout

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#2D3142',
    light: '#4F5D75',
  },
  accent: {
    DEFAULT: '#EF8354',
    dark: '#D66A3D',
  },
  // ...
}
```

### Fonts

Google Fonts are loaded in `index.html`:
- **Display:** Archivo (headings)
- **Body:** IBM Plex Sans (content)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Created with ❤️ using React and Tailwind CSS
Icons by [Lucide](https://lucide.dev/)
