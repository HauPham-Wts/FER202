// OrchidForm Component - Lab 6: Formik + Yup Validation
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { createOrchid, updateOrchid } from '../redux/orchidsSlice';
import './OrchidForm.css';

// Yup Validation Schema
const orchidValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Orchid name is required'),
  
  category: Yup.string()
    .min(2, 'Category must be at least 2 characters')
    .required('Category is required'),
  
  origin: Yup.string()
    .min(2, 'Origin must be at least 2 characters')
    .required('Origin is required'),
  
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  
  color: Yup.string()
    .min(2, 'Color must be at least 2 characters')
    .required('Color is required'),
  
  rating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Rating is required'),
  
  numberOfLike: Yup.number()
    .min(0, 'Number of likes cannot be negative')
    .required('Number of likes is required'),
  
  video: Yup.string()
    .url('Must be a valid URL')
    .notRequired(),
  
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .notRequired(),
  
  isNatural: Yup.boolean(),
  isSpecial: Yup.boolean(),
});

const OrchidForm = ({ orchid, onSuccess, onCancel }) => {
  const dispatch = useDispatch();

  // Initial values
  const initialValues = orchid ? {
    name: orchid.name || '',
    category: orchid.category || '',
    origin: orchid.origin || '',
    image: orchid.image || '',
    color: orchid.color || '',
    rating: orchid.rating || 3,
    numberOfLike: orchid.numberOfLike || 0,
    video: orchid.video || '',
    description: orchid.description || '',
    isNatural: orchid.isNatural || false,
    isSpecial: orchid.isSpecial || false,
  } : {
    name: '',
    category: '',
    origin: '',
    image: '',
    color: '',
    rating: 3,
    numberOfLike: 0,
    video: '',
    description: '',
    isNatural: false,
    isSpecial: false,
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      if (orchid) {
        // Update existing orchid
        await dispatch(updateOrchid({ id: orchid.id, data: values })).unwrap();
        setStatus({ success: 'Orchid updated successfully!' });
      } else {
        // Create new orchid
        await dispatch(createOrchid(values)).unwrap();
        setStatus({ success: 'Orchid created successfully!' });
      }
      
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      setStatus({ error: error.message || 'Failed to save orchid' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="orchid-form">
      <Formik
        initialValues={initialValues}
        validationSchema={orchidValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, status, values }) => (
          <Form>
            {status && status.success && (
              <Alert variant="success">{status.success}</Alert>
            )}
            {status && status.error && (
              <Alert variant="danger">{status.error}</Alert>
            )}

            <Row>
              {/* Name */}
              <Col md={12} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Orchid Name <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="name"
                    type="text"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    placeholder="Enter orchid name"
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Category */}
              <Col md={6} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Category <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="category"
                    type="text"
                    className={`form-control ${errors.category && touched.category ? 'is-invalid' : ''}`}
                    placeholder="e.g., Cattleya, Phalaenopsis"
                  />
                  <ErrorMessage name="category" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Origin */}
              <Col md={6} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Origin <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="origin"
                    type="text"
                    className={`form-control ${errors.origin && touched.origin ? 'is-invalid' : ''}`}
                    placeholder="e.g., Taiwan, Brazil"
                  />
                  <ErrorMessage name="origin" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Image URL */}
              <Col md={12} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Image URL <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="image"
                    type="url"
                    className={`form-control ${errors.image && touched.image ? 'is-invalid' : ''}`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <ErrorMessage name="image" component="div" className="invalid-feedback" />
                  {values.image && !errors.image && (
                    <div className="mt-2">
                      <img 
                        src={values.image} 
                        alt="Preview" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </BootstrapForm.Group>
              </Col>

              {/* Color */}
              <Col md={6} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Color <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="color"
                    type="text"
                    className={`form-control ${errors.color && touched.color ? 'is-invalid' : ''}`}
                    placeholder="e.g., Pink, White, Purple"
                  />
                  <ErrorMessage name="color" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Rating */}
              <Col md={3} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Rating <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="1"
                    className={`form-control ${errors.rating && touched.rating ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="rating" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Number of Likes */}
              <Col md={3} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>
                    Likes <span className="text-danger">*</span>
                  </BootstrapForm.Label>
                  <Field
                    name="numberOfLike"
                    type="number"
                    min="0"
                    className={`form-control ${errors.numberOfLike && touched.numberOfLike ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name="numberOfLike" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Video URL */}
              <Col md={12} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Video URL (Optional)</BootstrapForm.Label>
                  <Field
                    name="video"
                    type="url"
                    className={`form-control ${errors.video && touched.video ? 'is-invalid' : ''}`}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                  <ErrorMessage name="video" component="div" className="invalid-feedback" />
                </BootstrapForm.Group>
              </Col>

              {/* Description */}
              <Col md={12} className="mb-3">
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Description (Optional)</BootstrapForm.Label>
                  <Field
                    name="description"
                    as="textarea"
                    rows={4}
                    className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                    placeholder="Enter a detailed description of the orchid..."
                  />
                  <ErrorMessage name="description" component="div" className="invalid-feedback" />
                  <BootstrapForm.Text className="text-muted">
                    {values.description.length}/1000 characters
                  </BootstrapForm.Text>
                </BootstrapForm.Group>
              </Col>

              {/* Checkboxes */}
              <Col md={12} className="mb-3">
                <BootstrapForm.Group>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <Field
                        name="isNatural"
                        type="checkbox"
                        className="form-check-input"
                        id="isNatural"
                      />
                      <label className="form-check-label" htmlFor="isNatural">
                        🌿 Natural Species
                      </label>
                    </div>
                    <div className="form-check">
                      <Field
                        name="isSpecial"
                        type="checkbox"
                        className="form-check-input"
                        id="isSpecial"
                      />
                      <label className="form-check-label" htmlFor="isSpecial">
                        ⭐ Special Collection
                      </label>
                    </div>
                  </div>
                </BootstrapForm.Group>
              </Col>
            </Row>

            {/* Form Actions */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button 
                variant="secondary" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  orchid ? 'Update Orchid' : 'Create Orchid'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrchidForm;
