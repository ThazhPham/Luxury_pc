import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import DataGrid, {
  Column,
  Paging,
  Editing,
  Selection,
  SearchPanel,
  RequiredRule,
  EmailRule,
  PatternRule,
} from 'devextreme-react/data-grid';

import { Button } from 'devextreme-react/button';
import DropDownBox from 'devextreme-react/drop-down-box';

import '../styles/UserProfilesPage.css';

import {
  loadUserProfiles,
  addUserProfile,
  updateUserProfile,
  deleteUserProfile,
  exportUserProfiles,
  importUserProfiles,
} from '../services/userProfileService';

// =========================
// DEPARTMENT EDITOR COMPONENT
// Tách riêng để cell.setValue() không destroy DropDownBox
// Cấu trúc form giữ nguyên 100%: DropDownBox + DataGrid bên trong
// =========================
function DepartmentCellEditor({ cell, departments }) {
  const [value, setValue] = useState(cell.value);

  return (
    <DropDownBox
      value={value}
      valueExpr="name"
      displayExpr="name"
      dataSource={departments}
      placeholder="Select department..."
      showClearButton={true}
      deferRendering={false}
      dropDownOptions={{
        width: 800,
        height: 500,
      }}

      onValueChanged={(e) => {
        setValue(e.value);
        cell.setValue(e.value);
      }}

      contentRender={(dropDown) => {
        return (
          <DataGrid
            dataSource={departments}
            keyExpr="id"
            showBorders={true}
            hoverStateEnabled={true}
            focusedRowEnabled={true}
            height={430}

            selectedRowKeys={
              value
                ? departments
                  .filter((d) => d.name === value)
                  .map((d) => d.id)
                : []
            }

            // CLICK CHỌN
            onSelectionChanged={(e) => {
              const selected = e.selectedRowsData[0];

              if (!selected) return;

              // SET VALUE
              setValue(selected.name);
              cell.setValue(selected.name);

              // UPDATE DROPDOWN UI
              dropDown.component.option(
                'value',
                selected.name
              );

              // ĐÓNG DROPDOWN
              dropDown.component.close();
            }}

            // DOUBLE CLICK
            onRowDblClick={(e) => {
              setValue(e.data.name);
              cell.setValue(e.data.name);

              dropDown.component.option(
                'value',
                e.data.name
              );

              dropDown.component.close();
            }}

            // ENTER
            onKeyDown={(e) => {
              if (e.event.key === 'Enter') {
                const row =
                  e.component.getSelectedRowsData()[0];

                if (!row) return;

                setValue(row.name);
                cell.setValue(row.name);

                dropDown.component.option(
                  'value',
                  row.name
                );

                dropDown.component.close();
              }
            }}
          >
            <SearchPanel visible={true} />

            <Paging defaultPageSize={6} />

            <Selection mode="single" />

            <Column
              dataField="id"
              width={100}
            />

            <Column dataField="name" />
          </DataGrid>
        );
      }}
    />
  );
}

// =========================
// USER EDIT FORM COMPONENT
// Form chỉnh sửa riêng cho từng user (kiểu trang profile)
// =========================
function UserEditForm({ user, departments, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [showDeptPopup, setShowDeptPopup] = useState(false);
  const [deptSearch, setDeptSearch] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Xóa lỗi khi user sửa
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username?.trim()) newErrors.username = 'Please enter username';
    if (!formData.fullName?.trim()) newErrors.fullName = 'Please enter full name';
    if (!formData.email?.trim()) newErrors.email = 'Please enter email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.department) newErrors.department = 'Please select department';
    if (!formData.position?.trim()) newErrors.position = 'Please enter position';
    if (!formData.status?.trim()) newErrors.status = 'Please enter status';
    if (!formData.phone?.trim()) newErrors.phone = 'Please enter phone';
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = 'Phone must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="user-edit-form">
      <div className="edit-form-header">
        <button className="back-btn" onClick={onCancel}>
          ← Back to User List
        </button>
        <h2>Edit User — ID #{String(user.id).padStart(4, '0')}</h2>
      </div>

      <div className="edit-form-body">
        <div className="edit-form-avatar">
          <div className="avatar-circle">
            {(formData.fullName || '?').charAt(0).toUpperCase()}
          </div>
          <span className="avatar-name">{formData.fullName || 'User'}</span>
          <span className="avatar-role">{formData.position || 'N/A'}</span>
        </div>

        <div className="edit-form-fields">
          {/* USERNAME */}
          <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
            <label>Username</label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
            />
            {errors.username && <span className="error-msg">{errors.username}</span>}
          </div>

          {/* FULL NAME */}
          <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
          </div>

          {/* EMAIL */}
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          {/* DEPARTMENT - popup giống bên grid */}
          <div className={`form-group ${errors.department ? 'has-error' : ''}`}>
            <label>Department</label>
            <div className="dept-dropdown-wrapper">
              <div
                className="dept-dropdown-trigger"
                onClick={() => setShowDeptPopup(!showDeptPopup)}
              >
                <span className={formData.department ? '' : 'placeholder'}>
                  {formData.department || 'Select department...'}
                </span>
                <span className="dropdown-arrow">▼</span>
              </div>

              {showDeptPopup && (
                <div className="dept-popup-dropdown">
                  <div className="dept-popup-search">
                    <input
                      type="text"
                      placeholder="🔍 Search..."
                      value={deptSearch}
                      onChange={(e) => setDeptSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="dept-popup-list">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departments
                          .filter((d) =>
                            !deptSearch.trim() ||
                            d.name.toLowerCase().includes(deptSearch.toLowerCase())
                          )
                          .map((d) => (
                            <tr
                              key={d.id}
                              className={formData.department === d.name ? 'selected-row' : ''}
                              onClick={() => {
                                handleChange('department', d.name);
                                setShowDeptPopup(false);
                                setDeptSearch('');
                              }}
                            >
                              <td>{d.id}</td>
                              <td>{d.name}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            {errors.department && <span className="error-msg">{errors.department}</span>}
          </div>

          {/* POSITION */}
          <div className={`form-group ${errors.position ? 'has-error' : ''}`}>
            <label>Position</label>
            <input
              type="text"
              value={formData.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
            />
            {errors.position && <span className="error-msg">{errors.position}</span>}
          </div>

          {/* STATUS */}
          <div className={`form-group ${errors.status ? 'has-error' : ''}`}>
            <label>Status</label>
            <select
              value={formData.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">-- Select Status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && <span className="error-msg">{errors.status}</span>}
          </div>

          {/* JOIN DATE */}
          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              value={formData.joinDate ? formData.joinDate.substring(0, 10) : ''}
              onChange={(e) => handleChange('joinDate', e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
            <label>Phone</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              maxLength={10}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
        </div>
      </div>

      <div className="edit-form-actions">
        <button className="save-btn" onClick={handleSave}>💾 Save Changes</button>
        <button className="cancel-btn" onClick={onCancel}>✖ Cancel</button>
      </div>
    </div>
  );
}

function UserProfilesPage({ currentUser, onUserUpdated }) {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const gridRef = useRef(null);

  // =========================
  // MASTER DATA
  // =========================
  const departments = [
    { id: '1', name: 'IT Department' },
    { id: '2', name: 'Sales Department' },
    { id: '3', name: 'HR Department' },
    { id: '4', name: 'Finance Department' },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================
  // LOAD USERS
  // =========================
  const loadUsers = useCallback(async () => {
    setLoading(true);

    try {
      const data = await loadUserProfiles();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load user profiles');
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // INSERT
  // =========================
  const handleRowInserting = async (e) => {
    const username = e.data.username?.trim();
    const email = e.data.email?.trim();

    // Required
    if (
      !username ||
      !e.data.fullName ||
      !email ||
      !e.data.department ||
      !e.data.position ||
      !e.data.status
    ) {
      alert('Please enter full information!');
      e.cancel = true;
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert('Please enter valid email!');
      e.cancel = true;
      return;
    }

    // Duplicate username
    const isUsernameDuplicate = users.some(
      (u) =>
        u.username?.toLowerCase() ===
        username.toLowerCase()
    );

    if (isUsernameDuplicate) {
      alert('Username already exists!');
      e.cancel = true;
      return;
    }

    // Insert
    await addUserProfile(e.data);

    await loadUsers();
  };

  // =========================
  // UPDATE
  // =========================
  const handleRowUpdated = async (e) => {
    const newUsername = e.data.username?.trim();
    const newPhone = e.data.phone?.trim();
    const newEmail = e.data.email?.trim();

    const isDuplicate = users.some((u) => {
      if (u.id === e.key) return false;

      return (
        u.username?.toLowerCase() ===
        newUsername?.toLowerCase() ||
        u.phone === newPhone ||
        u.email?.toLowerCase() ===
        newEmail?.toLowerCase()
      );
    });

    // Duplicate validation
    if (isDuplicate) {
      alert(
        'Username / Phone / Email already exists!'
      );

      e.cancel = true;

      gridRef.current?.instance?.cancelEditData();

      return;
    }

    // Update
    await updateUserProfile(e.key, e.data);

    // Update current user
    if (
      currentUser &&
      e.key === currentUser.id &&
      onUserUpdated
    ) {
      onUserUpdated({
        ...currentUser,
        ...e.data,
      });
    }

    await loadUsers();
  };

  // =========================
  // DELETE
  // =========================
  const handleRowRemoved = async (e) => {
    await deleteUserProfile(e.key);
    await loadUsers();
  };

  // =========================
  // SELECTION
  // =========================
  const handleSelectionChanged = (e) => {
    setSelectedRows(e.selectedRowKeys);
  };

  // =========================
  // EXPORT
  // =========================
  const handleExport = async () => {
    await exportUserProfiles();
    alert('Exported successfully!');
  };

  // =========================
  // IMPORT
  // =========================
  const handleImport = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e) => {
      try {
        const file = e.target.files[0];

        await importUserProfiles(file);

        loadUsers();

        alert('Imported successfully!');
      } catch (err) {
        alert('Import error: ' + err.message);
      }
    };

    input.click();
  };

  // =========================
  // DELETE SELECTED
  // =========================
  const handleDeleteSelected = async () => {
    if (!selectedRows.length) return;

    if (
      window.confirm(
        `Delete ${selectedRows.length} users?`
      )
    ) {
      for (const id of selectedRows) {
        await deleteUserProfile(id);
      }

      setSelectedRows([]);

      await loadUsers();
    }
  };

  return (
    <div
      className={`user-profiles-container ${loading ? 'loading' : ''
        }`}
    >
      {/* HEADER */}
      <div className="profiles-header">
        <h2>User Profiles Management</h2>

        <div className="action-buttons">
          <Button
            icon="refresh"
            text="Refresh"
            onClick={loadUsers}
          />

          <Button
            icon="export"
            text="Export"
            onClick={handleExport}
          />

          <Button
            icon="upload"
            text="Import"
            onClick={handleImport}
          />

          {selectedRows.length > 0 && (
            <Button
              icon="trash"
              text={`Delete ${selectedRows.length}`}
              onClick={handleDeleteSelected}
            />
          )}
        </div>
      </div>

      {/* GRID */}
      {/* EDIT FORM hoặc GRID */}
      {editingUser ? (
        <UserEditForm
          user={editingUser}
          departments={departments}
          onSave={async (updatedData) => {
            // Validate trùng
            const usernameExists = users.some((u) => {
              if (u.id === updatedData.id) return false;

              return (
                u.username?.toLowerCase() ===
                updatedData.username?.toLowerCase()
              );
            });

            const phoneExists = users.some((u) => {
              if (u.id === updatedData.id) return false;

              return u.phone === updatedData.phone;
            });

            const emailExists = users.some((u) => {
              if (u.id === updatedData.id) return false;

              return (
                u.email?.toLowerCase() ===
                updatedData.email?.toLowerCase()
              );
            });

            if (usernameExists) {
              console.error('Duplicate username');
              alert('Username already exists!');
              return;
            }

            if (phoneExists) {
              console.error('Duplicate phone');
              alert('Phone already exists!');
              return;
            }

            if (emailExists) {
              console.error('Duplicate email');
              alert('Email already exists!');
              return;
            }
            // Lưu
            await updateUserProfile(updatedData.id, updatedData);
            // Update current user nếu sửa chính mình
            if (currentUser && updatedData.id === currentUser.id && onUserUpdated) {
              onUserUpdated({ ...currentUser, ...updatedData });
            }
            setEditingUser(null);
            await loadUsers();
            alert('Saved successfully!');
          }}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <>
          <div className="grid-container">
            <DataGrid
              ref={gridRef}
              dataSource={users}
              keyExpr="id"
              showBorders={true}
              height={600}
              rowAlternationEnabled={true}
              onRowInserting={handleRowInserting}
              onRowUpdated={handleRowUpdated}
              onRowRemoved={handleRowRemoved}
              onSelectionChanged={handleSelectionChanged}
              onInitNewRow={() => setIsAdding(true)}
              onSaved={() => setIsAdding(false)}
              onEditCanceled={() => setIsAdding(false)}
            >
              <Selection
                mode="multiple"
                showCheckBoxesMode="always"
              />

              <SearchPanel visible={true} />

              <Paging defaultPageSize={10} />

              <Editing
                mode="row"
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true}
              />

              {/* BUTTONS - custom Edit mở form riêng */}
              <Column
                type="buttons"
                width={70}
                buttons={[
                  !isAdding && {
                    hint: 'Edit',
                    icon: 'edit',
                    onClick: (e) => {
                      setEditingUser({ ...e.row.data });
                    },
                  },

                  'save',
                  'cancel',
                  'delete',
                ].filter(Boolean)}
              />

              {/* ID */}
              <Column
                dataField="id"
                width={50}
                allowEditing={false}
              />

              {/* USERNAME */}
              <Column dataField="username">
                <RequiredRule message="Please enter username" />
              </Column>

              {/* FULL NAME */}
              <Column dataField="fullName">
                <RequiredRule message="Please enter full name" />
              </Column>

              {/* EMAIL */}
              <Column dataField="email">
                <RequiredRule message="Please enter email" />
                <EmailRule message="Please enter valid email" />
              </Column>

              {/* DEPARTMENT */}
              <Column
                dataField="department"
                width={220}
                editCellRender={(cell) => (
                  <DepartmentCellEditor
                    cell={cell}
                    departments={departments}
                  />
                )}
              >
                <RequiredRule message="Please select department" />
              </Column>

              {/* POSITION */}
              <Column dataField="position">
                <RequiredRule message="Please enter position" />
              </Column>

              {/* STATUS */}
              <Column dataField="status">
                <RequiredRule message="Please enter status" />
              </Column>

              {/* JOIN DATE */}
              <Column
                dataField="joinDate"
                dataType="date"
              >
                <RequiredRule message="Please enter join date" />
              </Column>

              {/* PHONE */}
              <Column dataField="phone">
                <RequiredRule message="Please enter phone number" />
                <PatternRule
                  pattern={/^[0-9]{10}$/}
                  message="Phone number must be 10 digits"
                />
              </Column>
            </DataGrid>
          </div>

          {/* INFO */}
          <div className="profiles-info">
            <p>
              Total: <b>{users.length}</b> |
              Selected: <b>{selectedRows.length}</b>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfilesPage;