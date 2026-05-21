// Ticket API Service - Connect to Backend
const API_URL = 'http://localhost:5000';

// Create Ticket
export const createTicket = async (ticketData) => {
  try {
    console.log('Creating ticket...', ticketData);
    
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData)
    });

    const data = await response.json();
    console.log('Create ticket response:', data);
    
    return data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    return { 
      success: false, 
      message: `Network error: ${error.message}` 
    };
  }
};

// Get All Tickets
export const getTickets = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const url = `${API_URL}/tickets${params.toString() ? '?' + params.toString() : ''}`;
    
    console.log('Fetching tickets from:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Fetched tickets:', data);
    return data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { 
      success: false, 
      message: error.message,
      tickets: []
    };
  }
};

// Get Single Ticket
export const getTicket = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return { success: false, message: error.message };
  }
};

// Update Ticket
export const updateTicket = async (id, updates) => {
  try {
    console.log('Updating ticket:', id, updates);
    
    const response = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    });

    const data = await response.json();
    console.log('Update response:', data);
    
    return data;
  } catch (error) {
    console.error('Error updating ticket:', error);
    return { success: false, message: error.message };
  }
};

// Update Status
export const updateStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating status:', error);
    return { success: false, message: error.message };
  }
};

// Delete Ticket
export const deleteTicket = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return { success: false, message: error.message };
  }
};

// Toggle Subtask Completion
export const toggleSubtask = async (ticketId, subtaskId, completed) => {
  try {
    const response = await fetch(
      `${API_URL}/tickets/${ticketId}/subtasks/${subtaskId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed })
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling subtask:', error);
    return { success: false, message: error.message };
  }
};
