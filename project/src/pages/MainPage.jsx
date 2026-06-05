import { useState, useEffect } from 'react';
import '../styles/MainPage.css';
import UserProfilesPage from './UserProfilesPage';
import DepartmentInfoPage from './DepartmentInfoPage';
import DepartmentMembersPage from './DepartmentMembersPage';
import { loadDepartmentByName } from '../services/departmentService';

function MainPage({ user, onLogout, onUserUpdate }) {
  const [selectedTab, setSelectedTab] = useState('profiles');
  const [deptInfo, setDeptInfo] = useState({});

  // Load department info from Supabase
  useEffect(() => {
    if (user.department) {
      loadDepartmentByName(user.department)
        .then(data => setDeptInfo(data))
        .catch(err => {
          console.error('Failed to load department info:', err);
          setDeptInfo({});
        });
    }
  }, [user.department]);

  return (
    <div className="main-container">
      <header className="main-header">
        <div className="header-content">
          <h1>ISC System</h1>
          <div className="user-info">
            <span>Welcome, {user.fullName}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="tabs">
          <button
            className={`tab-btn ${selectedTab === 'profile' || selectedTab === 'profiles' ? 'active' : ''}`}
            onClick={() => setSelectedTab('profiles')}
          >
            User Profile
          </button>
          <button
            className={`tab-btn ${selectedTab === 'department' ? 'active' : ''}`}
            onClick={() => setSelectedTab('department')}
          >
            Department Info
          </button>
          <button
            className={`tab-btn ${selectedTab === 'members' ? 'active' : ''}`}
            onClick={() => setSelectedTab('members')}
          >
            Department Members
          </button>
        </div>

        <div className="tab-content">
          {/* User Profile */}
          {selectedTab === 'profile' && (
            <div className="profile-section">
              <h2>User Profile</h2>
              <div className="profile-grid">
                <div className="profile-card profile-card-clickable" onClick={() => setSelectedTab('profiles')} title="Click to edit in User Profiles grid">
                  <div className="avatar">
                    <div className="avatar-placeholder">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="profile-details">
                    <div className="detail-item">
                      <label>Full Name</label>
                      <p>{user.fullName}</p>
                    </div>
                    <div className="detail-item">
                      <label>Username</label>
                      <p>{user.username}</p>
                    </div>
                    <div className="detail-item">
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="detail-item">
                      <label>Position</label>
                      <p>{user.position}</p>
                    </div>
                    <div className="detail-item">
                      <label>Department</label>
                      <p>{user.department}</p>
                    </div>
                    <div className="detail-item">
                      <label>User ID</label>
                      <p>#{String(user.id).padStart(4, '0')}</p>
                    </div>
                  </div>
                  <div className="profile-edit-hint">
                    <span>✏️ Click to edit in User Profiles</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Department Info */}
          {selectedTab === 'department' && (
            <DepartmentInfoPage user={user} deptInfo={deptInfo} />
          )}

          {/* Department Members */}
          {selectedTab === 'members' && (
            <DepartmentMembersPage user={user} />
          )}

          {/* User Profiles Management */}
          <div style={{ display: selectedTab === 'profiles' ? 'block' : 'none' }}>
            <div className="profiles-section">
              <UserProfilesPage currentUser={user} onUserUpdated={onUserUpdate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
