// Container Component - OrchidsContainer
// Lab 6: Updated to fetch data from MockAPI.io using Redux
// Lab 7: Added search and filter functionality
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchids } from '../redux/orchidsSlice';
import OrchidCard from './OrchidCard';
import OrchidModal from './OrchidModal';
import { useModal } from '../hooks/useModal';
import { useAuth } from '../contexts/AuthContext';
import { Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './OrchidsContainer.css';

const OrchidsContainer = () => {
  const dispatch = useDispatch();
  const { orchids, loading, error } = useSelector((state) => state.orchids);
  const { isOpen, selectedOrchid, openModal, closeModal } = useModal();
  const { currentUser } = useAuth();
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchOrchids());
  }, [dispatch]);

  // Get unique categories from orchids
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(orchids.map(o => o.category))];
    return uniqueCategories.sort();
  }, [orchids]);

  // Filter and search orchids
  const filteredOrchids = useMemo(() => {
    let filtered = [...orchids];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(o => o.category === selectedCategory);
    }
    
    // Search by name (case-insensitive)
    if (searchTerm.trim()) {
      filtered = filtered.filter(o => 
        o.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [orchids, selectedCategory, searchTerm]);

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <div className="orchids-container">
        <div className="container-header">
          <h1 className="main-title">
            <span className="title-icon">🌸</span>
            Loading Orchids...
            <span className="title-icon">🌸</span>
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orchids-container">
        <div className="container-header">
          <h1 className="main-title">
            <span className="title-icon">❌</span>
            Error Loading Orchids
            <span className="title-icon">❌</span>
          </h1>
          <p className="subtitle" style={{ color: '#ff4444' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orchids-container">
      <header className="container-header">
        <h1 className="main-title">
          <span className="title-icon">🌸</span>
          Orchid Garden
          <span className="title-icon">🌸</span>
        </h1>
        <p className="subtitle">
          Discover our exquisite collection of {orchids.length} beautiful orchids from around the world
          {orchids.length > 0 && <span className="badge bg-success ms-2">✓ Loaded from API</span>}
        </p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{orchids.filter(o => o.isSpecial).length}</span>
            <span className="stat-label">Special Orchids</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{orchids.filter(o => o.isNatural).length}</span>
            <span className="stat-label">Natural Species</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{orchids.reduce((acc, o) => acc + o.numberOfLike, 0)}</span>
            <span className="stat-label">Total Likes</span>
          </div>
        </div>

        {/* Search and Filter Section - Only for Members */}
        {currentUser && (
          <div className="search-filter-section mt-4">
            <div className="row g-3 align-items-end">
              <div className="col-md-6">
                <Form.Label className="fw-bold">🔍 Search by Orchid Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter orchid name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                      <FaTimes />
                    </Button>
                  )}
                </InputGroup>
              </div>
              
              <div className="col-md-4">
                <Form.Label className="fw-bold">🏷️ Filter by Category</Form.Label>
                <Form.Select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </div>
              
              <div className="col-md-2">
                <Button 
                  variant="outline-danger" 
                  className="w-100"
                  onClick={handleClearSearch}
                  disabled={searchTerm === '' && selectedCategory === 'all'}
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            {/* Filter Results Info */}
            <div className="mt-3 text-center">
              <Badge bg="primary" className="px-3 py-2">
                Showing {filteredOrchids.length} of {orchids.length} orchids
              </Badge>
              {(searchTerm || selectedCategory !== 'all') && (
                <span className="ms-2 text-muted">
                  {searchTerm && `Search: "${searchTerm}"`}
                  {searchTerm && selectedCategory !== 'all' && ' | '}
                  {selectedCategory !== 'all' && `Category: ${selectedCategory}`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Message for guests */}
        {!currentUser && (
          <div className="alert alert-info mt-4 text-center">
            <strong>🔒 Login to unlock search and filter features!</strong>
          </div>
        )}
      </header>

      <div className="orchids-grid">
        {filteredOrchids.length > 0 ? (
          filteredOrchids.map((orchid) => (
            <OrchidCard 
              key={orchid.id} 
              orchid={orchid}
              onDetailClick={openModal}
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h3>🔍 No orchids found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <Button variant="primary" onClick={handleClearSearch}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Modal for Orchid Details */}
      <OrchidModal 
        isOpen={isOpen}
        orchid={selectedOrchid}
        onClose={closeModal}
      />

      <footer className="container-footer">
        <p>© 2025 Orchid Paradise</p>
      </footer>
    </div>
  );
};

export default OrchidsContainer;
