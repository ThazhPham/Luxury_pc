import { useState, useEffect } from 'react';
import { loadUserProfiles } from '../services/userProfileService';
import { loadDeptMembers, addDeptMember, removeDeptMember } from '../services/departmentService';
import '../styles/MainPage.css';


function DepartmentMembersPage({ user }) {
  const [memberIds, setMemberIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Load data
  useEffect(() => {
    loadData();
  }, [user.department]);

  // Refresh allUsers khi popup mở
  useEffect(() => {
    if (showPopup) {
      loadUserProfiles().then(setAllUsers).catch(console.error);
    }
  }, [showPopup]);

  const loadData = async () => {
    try {
      const [ids, users] = await Promise.all([
        loadDeptMembers(user.department),
        loadUserProfiles()
      ]);
      setMemberIds(ids);
      setAllUsers(users);
    } catch (error) {
      console.error('Failed to load department data:', error);
    }
  };

  // Members hiện tại
  const members = allUsers.filter((u) => memberIds.includes(u.id));

  // Users chưa thêm vào department
  const availableUsers = allUsers
    .filter((u) => !memberIds.includes(u.id))
    .filter((u) => {
      if (!searchText.trim()) return true;
      const s = searchText.toLowerCase();
      return (
        u.fullName?.toLowerCase().includes(s) ||
        u.username?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s) ||
        u.position?.toLowerCase().includes(s)
      );
    });

  const handleAdd = async (userId) => {
    try {
      await addDeptMember(user.department, userId);
      const newIds = [...memberIds, userId];
      setMemberIds(newIds);
    } catch (error) {
      console.error('Failed to add member:', error);
      alert('Failed to add member');
    }
  };

  const handleRemove = async (userId) => {
    if (!window.confirm('Remove this member from department?')) return;
    try {
      await removeDeptMember(user.department, userId);
      const newIds = memberIds.filter((id) => id !== userId);
      setMemberIds(newIds);
    } catch (error) {
      console.error('Failed to remove member:', error);
      alert('Failed to remove member');
    }
  };

  return (
    <div className="department-section">
      <h2>Department Members — {user.department}</h2>

      {/* Header + Add button */}
      <div className="dept-members-section">
        <div className="dept-members-header">
          <h3>Members ({members.length})</h3>
          <button className="add-member-btn" onClick={() => setShowPopup(true)}>
            ➕ Add Member
          </button>
        </div>

        {members.length === 0 ? (
          <div className="no-members">
            <p>No members added yet. Click "➕ Add Member" to add employees.</p>
          </div>
        ) : (
          <div className="member-cards-grid">
            {members.map((m) => (
              <div className="member-info-card" key={m.id}>
                <button
                  className="remove-card-btn"
                  onClick={() => handleRemove(m.id)}
                  title="Remove member"
                >✕</button>

                <div className="member-card-top">
                  <div className="member-card-avatar">
                    {(m.fullName || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="member-card-name">
                    <h4>
                      {m.fullName}
                      {m.id === user.id && <span className="you-badge">(You)</span>}
                    </h4>
                    <span className="member-card-username">@{m.username}</span>
                  </div>
                </div>

                <div className="member-card-details">
                  <div className="member-card-row">
                    <span className="mc-label">📧 Email</span>
                    <span className="mc-value">{m.email || 'N/A'}</span>
                  </div>
                  <div className="member-card-row">
                    <span className="mc-label">💼 Position</span>
                    <span className="mc-value">{m.position || 'N/A'}</span>
                  </div>
                  <div className="member-card-row">
                    <span className="mc-label">🏢 Department</span>
                    <span className="mc-value">{m.department || 'N/A'}</span>
                  </div>
                  <div className="member-card-row">
                    <span className="mc-label">📞 Phone</span>
                    <span className="mc-value">{m.phone || 'N/A'}</span>
                  </div>
                  <div className="member-card-row">
                    <span className="mc-label">📅 Join Date</span>
                    <span className="mc-value">{m.joinDate || 'N/A'}</span>
                  </div>
                  <div className="member-card-row">
                    <span className="mc-label">🔘 Status</span>
                    <span className="mc-value">
                      <span className={`status ${m.status?.toLowerCase()}`}>{m.status || 'N/A'}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POPUP - Chọn nhân viên */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>Select Employee to Add</h3>
              <button className="popup-close" onClick={() => setShowPopup(false)}>✕</button>
            </div>

            <div className="popup-search">
              <input
                type="text"
                placeholder="🔍 Search by name, username, email..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="popup-body">
              {availableUsers.length === 0 ? (
                <div className="no-members">
                  <p>No available employees to add.</p>
                </div>
              ) : (
                <table className="popup-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Username</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td><strong>{u.fullName}</strong></td>
                        <td>{u.username}</td>
                        <td>{u.department}</td>
                        <td>{u.position}</td>
                        <td>
                          <button
                            className="popup-add-btn"
                            onClick={() => handleAdd(u.id)}
                          >
                            ➕ Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentMembersPage;
