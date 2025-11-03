// Dashboard Page - Lab 6: CRUD Operations with Formik + Yup
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Button, Modal, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { fetchOrchids, deleteOrchid, clearError, clearSuccess } from '../redux/orchidsSlice';
import OrchidForm from '../components/OrchidForm';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orchids, loading, error, success } = useSelector((state) => state.orchids);
  
  const [showForm, setShowForm] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrchid, setDeletingOrchid] = useState(null);

  useEffect(() => {
    dispatch(fetchOrchids());
  }, [dispatch]);

  // Auto-hide success/error messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAdd = () => {
    setEditingOrchid(null);
    setShowForm(true);
  };

  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOrchid(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingOrchid(null);
    dispatch(fetchOrchids());
  };

  const handleDeleteClick = (orchid) => {
    setDeletingOrchid(orchid);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingOrchid) {
      await dispatch(deleteOrchid(deletingOrchid.id));
      setShowDeleteModal(false);
      setDeletingOrchid(null);
      dispatch(fetchOrchids());
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingOrchid(null);
  };

  return (
    <div className="dashboard-page">
      <Container fluid className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="display-5 fw-bold mb-2">🌸 Orchid Dashboard</h1>
                <p className="text-muted mb-0">Manage your orchid collection</p>
              </div>
              <Button variant="primary" size="lg" onClick={handleAdd}>
                <FaPlus className="me-2" />
                Add New Orchid
              </Button>
            </div>
          </Col>
        </Row>

        {/* Success/Error Messages */}
        {success && (
          <Alert variant="success" dismissible onClose={() => dispatch(clearSuccess())}>
            <strong>Success!</strong> {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
            <strong>Error!</strong> {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-primary mb-0">{orchids.length}</h3>
                <p className="text-muted mb-0">Total Orchids</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-success mb-0">{orchids.filter(o => o.isNatural).length}</h3>
                <p className="text-muted mb-0">Natural Species</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-warning mb-0">{orchids.filter(o => o.isSpecial).length}</h3>
                <p className="text-muted mb-0">Special Collection</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <h3 className="text-danger mb-0">{orchids.reduce((sum, o) => sum + o.numberOfLike, 0)}</h3>
                <p className="text-muted mb-0">Total Likes</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Orchids Table */}
        <Card className="shadow-sm">
          <Card.Header className="bg-white">
            <h5 className="mb-0">Orchid List</h5>
          </Card.Header>
          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading orchids...</p>
              </div>
            ) : orchids.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-3">No orchids found. Add your first orchid!</p>
                <Button variant="primary" onClick={handleAdd}>
                  <FaPlus className="me-2" />
                  Add New Orchid
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Origin</th>
                      <th>Color</th>
                      <th>Rating</th>
                      <th>Likes</th>
                      <th>Tags</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orchids.map((orchid) => (
                      <tr key={orchid.id}>
                        <td className="align-middle">
                          <code>{orchid.id}</code>
                        </td>
                        <td className="align-middle">
                          <img 
                            src={orchid.image} 
                            alt={orchid.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </td>
                        <td className="align-middle">
                          <strong>{orchid.name}</strong>
                        </td>
                        <td className="align-middle">{orchid.category}</td>
                        <td className="align-middle">{orchid.origin}</td>
                        <td className="align-middle">
                          {orchid.color ? (
                            <Badge bg="info" text="dark" style={{ position: 'static', display: 'inline-block' }}>
                              {orchid.color}
                            </Badge>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="align-middle">
                          <span className="text-warning">★</span> {orchid.rating || 0}/5
                        </td>
                        <td className="align-middle">
                          <span className="text-danger">❤️</span> {orchid.numberOfLike || 0}
                        </td>
                        <td className="align-middle">
                          {orchid.isSpecial && (
                            <Badge bg="warning" text="dark" className="me-1" style={{ position: 'static', display: 'inline-block' }}>
                              Special
                            </Badge>
                          )}
                          {orchid.isNatural && (
                            <Badge bg="success" style={{ position: 'static', display: 'inline-block' }}>
                              Natural
                            </Badge>
                          )}
                          {!orchid.isSpecial && !orchid.isNatural && <span className="text-muted">-</span>}
                        </td>
                        <td className="align-middle text-center">
                          <div className="btn-group" role="group">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => window.open(`/detail/${orchid.id}`, '_blank')}
                              title="View Details"
                            >
                              <FaEye />
                            </Button>
                            <Button 
                              variant="outline-warning" 
                              size="sm"
                              onClick={() => handleEdit(orchid)}
                              title="Edit"
                            >
                              <FaEdit />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeleteClick(orchid)}
                              title="Delete"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Add/Edit Form Modal */}
      <Modal show={showForm} onHide={handleFormClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingOrchid ? '✏️ Edit Orchid' : '➕ Add New Orchid'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrchidForm 
            orchid={editingOrchid} 
            onSuccess={handleFormSuccess}
            onCancel={handleFormClose}
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>🗑️ Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this orchid?</p>
          {deletingOrchid && (
            <Card className="bg-light">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <img 
                    src={deletingOrchid.image} 
                    alt={deletingOrchid.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    className="me-3"
                  />
                  <div>
                    <h6 className="mb-1">{deletingOrchid.name}</h6>
                    <p className="mb-0 text-muted small">{deletingOrchid.category} • {deletingOrchid.origin}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
          <Alert variant="warning" className="mt-3 mb-0">
            <strong>Warning!</strong> This action cannot be undone.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            <FaTrash className="me-2" />
            Delete Orchid
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
