# TicketFlow Project Structure Guide

## Directory Overview

```
ticket-flow-app/
├── 📁 src/                      # Source code
│   ├── 📁 components/           # Reusable React components
│   ├── 📁 pages/                # Page-level components
│   ├── 📄 App.jsx               # Main application component
│   ├── 📄 main.jsx              # React entry point
│   └── 📄 index.css             # Global styles with Tailwind
├── 📄 index.html                # HTML template
├── 📄 package.json              # Dependencies and scripts
├── 📄 tailwind.config.js        # Tailwind configuration
├── 📄 vite.config.js            # Vite build configuration
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 README.md                 # Project documentation
└── 📄 .gitignore                # Git ignore rules
```

## Component Breakdown

### 📁 src/components/

#### StatusBadge.jsx
**Purpose:** Displays ticket status with color-coded badges  
**Props:**
- `status` (string): 'open', 'in-progress', 'resolved', or 'closed'

**Styling:** Uses Tailwind classes for different status colors

---

#### PriorityBadge.jsx
**Purpose:** Interactive priority selector with dropdown menu  
**Props:**
- `priority` (string): 'urgent', 'high', 'medium', or 'low'
- `ticketId` (number): Unique ticket identifier
- `onUpdate` (function): Callback for priority changes
- `priorityMenuOpen` (number|null): Currently open menu ID
- `setPriorityMenuOpen` (function): State setter for menu

**Features:**
- Click to open dropdown
- Visual indicators (colored dots)
- Smooth animations

---

#### StatsCard.jsx
**Purpose:** Display statistics with trend indicators  
**Props:**
- `label` (string): Card title
- `value` (string/number): Main metric
- `change` (string): Change description
- `trend` (string): 'up' or 'down'

**Styling:** Glass morphism effect with gradient text

---

#### NewTicketModal.jsx
**Purpose:** Modal form for creating new tickets  
**Props:**
- `isOpen` (boolean): Modal visibility
- `onClose` (function): Close handler
- `newTicket` (object): Form state
- `setNewTicket` (function): Form state setter
- `onCreate` (function): Submit handler

**Features:**
- Form validation
- Date pickers
- Category and priority selectors
- Backdrop click to close

---

#### FilterMenu.jsx
**Purpose:** Dropdown menu for filtering tickets  
**Props:**
- `filterOptions` (object): Current filter state
- `setFilterOptions` (function): Filter state setter
- `onClose` (function): Close handler

**Features:**
- Multi-select checkboxes
- Priority and category filters
- Clear all functionality

---

#### ProfileMenu.jsx
**Purpose:** User profile dropdown menu  
**Props:**
- `onLogout` (function): Logout handler
- `onClose` (function): Close handler

**Features:**
- User info display
- Settings link
- Help link
- Logout with red styling

---

### 📁 src/pages/

#### HomePage.jsx
**Purpose:** Landing page with features showcase  
**Props:**
- `onNavigate` (function): Page navigation handler

**Sections:**
1. Hero section with CTA buttons
2. Features grid (6 features)
3. Final CTA section

**Styling:** 
- Gradient backgrounds
- Animated elements
- Responsive grid layout

---

#### LoginPage.jsx
**Purpose:** User authentication page  
**Props:**
- `loginForm` (object): Email and password state
- `setLoginForm` (function): Form state setter
- `onLogin` (function): Submit handler

**Features:**
- Split-screen layout
- Left: Branding and features
- Right: Login form
- Pre-filled demo credentials
- Input validation

---

#### DashboardPage.jsx
**Purpose:** Main dashboard for ticket management  
**Props:** (Many - receives all state from App.jsx)
- Ticket data and operations
- Search and filter state
- Modal controls
- `isDemo` (boolean): Demo mode flag
- `onNavigate` (function): Navigation for demo mode

**Sections:**
1. Header with branding and profile/nav buttons
2. Stats cards grid
3. Search and filter toolbar
4. Filter tabs (All, Open, In Progress, Resolved)
5. Tickets list with priority badges

**Features:**
- Real-time search
- Advanced filtering
- Priority updates
- Progress bars for in-progress tickets
- Responsive layout

---

### 📄 App.jsx

**Purpose:** Main application component with state management

**State Management:**
```javascript
- currentPage: 'home' | 'login' | 'dashboard' | 'demo'
- loginForm: { email, password }
- tickets: Array of ticket objects
- searchQuery: String
- selectedFilter: 'all' | 'open' | 'in-progress' | 'resolved'
- priorityMenuOpen: number | null
- showNewTicketModal: boolean
- showFilterMenu: boolean
- showProfileMenu: boolean
- newTicket: Object with form fields
- filterOptions: { priorities, categories, assignees }
```

**Key Functions:**
- `updatePriority()`: Updates ticket priority
- `createNewTicket()`: Adds new ticket to list
- `handleLogout()`: Returns to homepage
- `handleLogin()`: Navigates to dashboard
- `filteredTickets`: Computed filtered ticket list

---

## Tailwind Configuration

### Custom Colors
```javascript
primary: '#2D3142'      // Dark blue-gray
accent: '#EF8354'       // Coral orange
dark-bg: '#0A0E27'      // Very dark blue
dark-surface: '#1A1F3A' // Dark blue surface
```

### Custom Animations
- `float`: Gentle floating motion
- `slideIn`: Slide in from left
- `slideUp`: Slide up with fade
- `slideDown`: Dropdown animation
- `fadeIn`: Simple fade in
- `shimmer`: Progress bar shimmer effect

### Utility Classes (in index.css)
- `.gradient-bg`: Background gradient
- `.gradient-text`: Gradient text effect
- `.gradient-brand`: Brand color gradient
- `.gradient-button`: Button gradient
- `.glass`: Glass morphism effect
- `.glass-dark`: Dark glass morphism

---

## Data Flow

```
App.jsx (State)
    ↓
    ├─→ HomePage
    │   └─→ Navigate to login/demo
    │
    ├─→ LoginPage
    │   └─→ Submit → Dashboard
    │
    └─→ DashboardPage (or Demo)
        ├─→ StatsCard × 4
        ├─→ Search/Filter Controls
        │   ├─→ FilterMenu
        │   └─→ NewTicketModal
        ├─→ Filter Tabs
        └─→ Tickets List
            └─→ Ticket Cards
                ├─→ PriorityBadge
                ├─→ StatusBadge
                └─→ Progress Bar (if in-progress)
```

---

## Styling Patterns

### Component Styling Pattern
```jsx
// Glass morphism card
<div className="glass rounded-2xl p-6 transition-all duration-300 hover:bg-white/5">

// Gradient button
<button className="gradient-button text-white px-6 py-3 rounded-xl hover:-translate-y-0.5">

// Input field
<input className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500" />
```

### Responsive Design
- Mobile-first approach
- Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Hidden on mobile: `hidden lg:flex`
- Flexible containers: `flex-wrap`

---

## Build Process

1. **Development**: `npm run dev`
   - Vite dev server with hot module replacement
   - Tailwind JIT compilation
   - Fast refresh

2. **Production**: `npm run build`
   - Vite optimizes and bundles
   - Tailwind purges unused CSS
   - Output to `dist/`

3. **Preview**: `npm run preview`
   - Test production build locally

---

## Key Dependencies

```json
{
  "react": "^18.2.0",           // UI framework
  "lucide-react": "^0.263.1",   // Icons
  "tailwindcss": "^3.3.2",      // Styling
  "vite": "^4.3.9"              // Build tool
}
```

---

## Best Practices Used

1. **Component Composition**: Small, reusable components
2. **Props Drilling**: Managed through clear prop passing
3. **State Management**: Centralized in App.jsx
4. **Styling**: Tailwind utility classes for consistency
5. **Responsiveness**: Mobile-first design
6. **Animations**: Subtle, performance-friendly transitions
7. **Accessibility**: Semantic HTML, keyboard navigation
8. **Performance**: React memo could be added for optimization

---

## Future Enhancement Ideas

- [ ] Add React Router for better navigation
- [ ] Implement Context API for state management
- [ ] Add real backend integration
- [ ] Implement user authentication
- [ ] Add ticket comments/activity log
- [ ] File attachment support
- [ ] Email notifications
- [ ] Dark/Light theme toggle
- [ ] Export tickets to CSV/PDF
- [ ] Drag-and-drop ticket reordering
