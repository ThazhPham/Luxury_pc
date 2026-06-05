import { useState, useEffect } from 'react';
import { loadUserProfiles } from '../services/userProfileService';
import { loadDeptInfoMembers, addDeptInfoMember, removeDeptInfoMember } from '../services/departmentService';
import '../styles/MainPage.css';

function DepartmentInfoPage({ user, deptInfo }) {
  const [memberIds, setMemberIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadData();
  }, [user.department]);

  useEffect(() => {
    if (showPopup) {
      loadUserProfiles().then(setAllUsers).catch(console.error);
    }
  }, [showPopup]);

  const loadData = async () => {
    try {
      const [ids, users] = await Promise.all([
        loadDeptInfoMembers(user.department),
        loadUserProfiles()
      ]);
      setMemberIds(ids);
      setAllUsers(users);
    } catch (error) {
      console.error('Failed to load department data:', error);
    }
  };

  const members = allUsers.filter((u) => memberIds.includes(u.id));

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
      await addDeptInfoMember(user.department, userId);
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
      await removeDeptInfoMember(user.department, userId);
      const newIds = memberIds.filter((id) => id !== userId);
      setMemberIds(newIds);
    } catch (error) {
      console.error('Failed to remove member:', error);
      alert('Failed to remove member');
    }
  };

  return (
    <div className="department-section">
      <h2>Department Information</h2>

      {/* Department Card */}
      <div className="department-card">
        <div className="dept-header">
          <h3>{user.department}</h3>
          <span className="dept-code">Code: {deptInfo.code}</span>
        </div>
        <div className="dept-details">
          <div className="detail-row">
            <span className="label">Description:</span>
            <span className="value">{deptInfo.description}</span>
          </div>
          <div className="detail-row">
            <span className="label">Total Headcount:</span>
            <span className="value">{members.length} employees</span>
          </div>
          <div className="detail-row">
            <span className="label">Annual Budget:</span>
            <span className="value">{deptInfo.budget}</span>
          </div>
          <div className="detail-row">
            <span className="label">Your Position:</span>
            <span className="value">{user.position}</span>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="dept-members-section">
        <div className="dept-members-header">
          <h3>Department Members ({members.length})</h3>
          <button className="add-member-btn" onClick={() => setShowPopup(true)}>
            ➕ Add Member
          </button>
        </div>

        {members.length === 0 ? (
          <div className="no-members">
            <p>No members added yet. Click "➕ Add Member" to add employees.</p>
          </div>
        ) : (
          <div className="members-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id}>
                    <td>{String(i + 1).padStart(3, '0')}</td>
                    <td>
                      <strong>{m.fullName}</strong>
                      {m.id === user.id && <span className="you-badge">(You)</span>}
                    </td>
                    <td>{m.position}</td>
                    <td>{m.email}</td>
                    <td><span className={`status ${m.status?.toLowerCase()}`}>{m.status}</span></td>
                    <td>
                      <button className="remove-member-btn" onClick={() => handleRemove(m.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default DepartmentInfoPage;
