// Simple TicketFlow Backend - No JWT, Just Basics!

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // To read JSON data from requests
app.use(cors()); // Allow frontend to connect

// ===== CONNECT TO MONGODB =====
mongoose.connect('mongodb+srv://shrutichakrabortyasn_db_user:q8AgUimDGj5wa88w@cluster0.wvro6xt.mongodb.net/?appName=Cluster0', {
})
.then(() => {
  console.log('✅ Connected to MongoDB!');
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:', error.message);
});

// ===== USER MODEL =====
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// ===== TICKET MODEL =====
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Bug', 'Feature', 'Documentation', 'Enhancement'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  teamName: {
    type: String,
    default: ''
  },
  // List of assigned members e.g. [{ memberId: 1, memberName: 'Sarah Chen' }]
  assignedMembers: {
    type: Array,
    default: []
  },
  // Subtasks e.g. [{ id, title, completed, assignedTo: { memberId, memberName } }]
  subtasks: {
    type: Array,
    default: []
  },
  startDate: {
    type: String,
    default: null
  },
  endDate: {
    type: String,
    default: null
  },
  createdBy: {
    type: Object,  // { userId, userName }
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// ===== ROUTES =====

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'TicketFlow Backend is running!',
    routes: {
      signup:        'POST /signup',
      login:         'POST /login',
      createTicket:  'POST /tickets',
      getAllTickets:  'GET  /tickets',
      getOneTicket:  'GET  /tickets/:id',
      updateTicket:  'PUT  /tickets/:id',
      deleteTicket:  'DELETE /tickets/:id'
    }
  });
});

// ─── AUTH ROUTES ───────────────────────────────────────────────

// SIGNUP
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered!'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong during signup' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong during login' });
  }
});

// ─── TICKET ROUTES ─────────────────────────────────────────────

// CREATE a new ticket
// POST /tickets
app.post('/tickets', async (req, res) => {
  try {
    const { title, description, category, priority, status, teamName, assignedMembers, subtasks, startDate, endDate, createdBy } = req.body;

    // Basic validation
    if (!title || !category || !priority) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and priority'
      });
    }

    const newTicket = new Ticket({
      title,
      description,
      category,
      priority,
      status: status || 'open',
      teamName:        teamName        || '',
      assignedMembers: assignedMembers || [],
      subtasks:        subtasks        || [],
      startDate:       startDate       || null,
      endDate:         endDate         || null,
      createdBy:       createdBy       || {}
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully!',
      ticket: newTicket
    });

  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while creating ticket' });
  }
});

// GET all tickets
// GET /tickets
app.get('/tickets', async (req, res) => {
  try {
    // Optional query filters: /tickets?status=open  or  /tickets?priority=high
    const filter = {};
    if (req.query.status)   filter.status   = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.category) filter.category = req.query.category;

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 }); // newest first

    res.json({
      success: true,
      count: tickets.length,
      tickets: tickets
    });

  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while fetching tickets' });
  }
});

// GET a single ticket by ID
// GET /tickets/:id
app.get('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.json({ success: true, ticket });

  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while fetching ticket' });
  }
});

// UPDATE a ticket
// PUT /tickets/:id
app.put('/tickets/:id', async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,          // update with whatever fields are sent
      { new: true }      // return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.json({
      success: true,
      message: 'Ticket updated successfully!',
      ticket: updatedTicket
    });

  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while updating ticket' });
  }
});

// DELETE a ticket
// DELETE /tickets/:id
app.delete('/tickets/:id', async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    res.json({ success: true, message: 'Ticket deleted successfully!' });

  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong while deleting ticket' });
  }
});

// ===== START SERVER =====
const PORT = 5000;
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║   TicketFlow Simple Backend           ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log(`\n🚀 Server running on: http://localhost:${PORT}`);
  console.log('📝 Ready to accept signup, login, and ticket requests!\n');
});