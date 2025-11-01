// Container Component - OrchidsContainer
import { orchids } from '../data/ListOfOrchids';
import OrchidCard from './OrchidCard';
import OrchidModal from './OrchidModal';
import { useModal } from '../hooks/useModal';
import './OrchidsContainer.css';

const OrchidsContainer = () => {
  const { isOpen, selectedOrchid, openModal, closeModal } = useModal();

  return (
    <div className="orchids-container">
      <header className="container-header">
        <h1 className="main-title">
          <span className="title-icon">🌸</span>
          Orchid Paradise
          <span className="title-icon">🌸</span>
        </h1>
        <p className="subtitle">
          Discover our exquisite collection of {orchids.length} beautiful orchids from around the world
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
      </header>

      <div className="orchids-grid">
        {orchids.map((orchid) => (
          <OrchidCard 
            key={orchid.id} 
            orchid={orchid}
            onDetailClick={openModal}
          />
        ))}
      </div>

      {/* Modal for Orchid Details */}
      <OrchidModal 
        isOpen={isOpen}
        orchid={selectedOrchid}
        onClose={closeModal}
      />

      <footer className="container-footer">
        <p>© 2025 Orchid Paradise | Lab 1-4 - Complete React Application</p>
      </footer>
    </div>
  );
};

export default OrchidsContainer;
