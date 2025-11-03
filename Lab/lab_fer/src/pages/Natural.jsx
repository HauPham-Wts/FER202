// Natural Orchids Page (Lab 4 - shows isNatural = true)
// Lab 6: Updated to use Redux for data fetching
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchids } from '../redux/orchidsSlice';
import OrchidCard from '../components/OrchidCard';
import { useModal } from '../hooks/useModal';
import OrchidModal from '../components/OrchidModal';
import './Natural.css';

const Natural = () => {
  const dispatch = useDispatch();
  const { orchids, loading } = useSelector((state) => state.orchids);
  const { isOpen, selectedOrchid, openModal, closeModal } = useModal();
  const naturalOrchids = orchids.filter(orchid => orchid.isNatural);

  useEffect(() => {
    if (orchids.length === 0) {
      dispatch(fetchOrchids());
    }
  }, [dispatch, orchids.length]);

  if (loading) {
    return (
      <div className="natural-page">
        <div className="natural-container">
          <header className="natural-header">
            <h1 className="natural-title">
              <span className="natural-icon">🌿</span>
              Loading Natural Species...
              <span className="natural-icon">🌿</span>
            </h1>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="natural-page">
      <div className="natural-container">
        <header className="natural-header">
          <h1 className="natural-title">
            <span className="natural-icon">🌿</span>
            Natural Species Collection
            <span className="natural-icon">🌿</span>
          </h1>
          <p className="natural-subtitle">
            Discover {naturalOrchids.length} beautiful natural orchid species in their purest form
          </p>
          <div className="natural-description">
            <p>
              These orchids are naturally occurring species found in the wild, representing 
              nature's own masterpieces. Each species has evolved over millions of years to 
              adapt to their specific environments, showcasing the incredible diversity of 
              the orchid family.
            </p>
          </div>
        </header>

        <div className="orchids-grid">
          {naturalOrchids.map((orchid) => (
            <OrchidCard 
              key={orchid.id} 
              orchid={orchid}
              onDetailClick={openModal}
            />
          ))}
        </div>

        {naturalOrchids.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No Natural Orchids Found</h3>
            <p>There are currently no natural species in our collection.</p>
          </div>
        )}

        <OrchidModal 
          isOpen={isOpen}
          orchid={selectedOrchid}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default Natural;
