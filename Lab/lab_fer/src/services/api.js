// API Service - Lab 6
// Using FETCH API to communicate with MockAPI.io

const API_BASE_URL = 'https://6905d116ee3d0d14c133ced3.mockapi.io/api';

// Generic fetch wrapper with error handling
const fetchWrapper = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Orchids API endpoints
export const orchidsAPI = {
  // GET - Fetch all orchids
  getAll: async () => {
    return fetchWrapper(`${API_BASE_URL}/orchids`);
  },

  // GET - Fetch single orchid by ID
  getById: async (id) => {
    return fetchWrapper(`${API_BASE_URL}/orchids/${id}`);
  },

  // POST - Create new orchid
  create: async (orchidData) => {
    return fetchWrapper(`${API_BASE_URL}/orchids`, {
      method: 'POST',
      body: JSON.stringify(orchidData),
    });
  },

  // PUT - Update existing orchid
  update: async (id, orchidData) => {
    return fetchWrapper(`${API_BASE_URL}/orchids/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orchidData),
    });
  },

  // DELETE - Remove orchid
  delete: async (id) => {
    return fetchWrapper(`${API_BASE_URL}/orchids/${id}`, {
      method: 'DELETE',
    });
  },

  // GET - Search/Filter orchids
  search: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchWrapper(`${API_BASE_URL}/orchids?${queryString}`);
  },
};

// Categories API endpoints - Lab 7
export const categoriesAPI = {
  // GET - Fetch all categories
  getAll: async () => {
    return fetchWrapper(`${API_BASE_URL}/categories`);
  },

  // GET - Fetch single category by ID
  getById: async (id) => {
    return fetchWrapper(`${API_BASE_URL}/categories/${id}`);
  },

  // POST - Create new category
  create: async (categoryData) => {
    return fetchWrapper(`${API_BASE_URL}/categories`, {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // PUT - Update existing category
  update: async (id, categoryData) => {
    return fetchWrapper(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  // DELETE - Remove category
  delete: async (id) => {
    return fetchWrapper(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

export default orchidsAPI;
