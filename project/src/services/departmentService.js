import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// =============================================
// DEPARTMENTS (shared)
// =============================================

// Load all departments
export async function loadDepartments() {
  const res = await axios.get(`${API_URL}/department`);
  return res.data;
}

// Load department info by name
export async function loadDepartmentByName(deptName) {
  const res = await axios.get(`${API_URL}/department/${encodeURIComponent(deptName)}`);
  return res.data;
}

// =============================================
// DEPT INFO MEMBERS (for DepartmentInfoPage)
// Table: dept_info_members
// =============================================

export async function loadDeptInfoMembers(deptName) {
  const res = await axios.get(`${API_URL}/dept-info-members/${encodeURIComponent(deptName)}`);
  return res.data;
}

export async function addDeptInfoMember(deptName, userId) {
  const res = await axios.post(`${API_URL}/dept-info-members`, {
    department_name: deptName,
    user_id: userId
  });
  return res.data;
}

export async function removeDeptInfoMember(deptName, userId) {
  const res = await axios.delete(`${API_URL}/dept-info-members/${encodeURIComponent(deptName)}/${userId}`);
  return res.data;
}

// =============================================
// DEPARTMENT MEMBERS (for DepartmentMembersPage)
// Table: department_members
// =============================================

export async function loadDeptMembers(deptName) {
  const res = await axios.get(`${API_URL}/department-members/${encodeURIComponent(deptName)}`);
  return res.data;
}

export async function addDeptMember(deptName, userId) {
  const res = await axios.post(`${API_URL}/department-members`, {
    department_name: deptName,
    user_id: userId
  });
  return res.data;
}

export async function removeDeptMember(deptName, userId) {
  const res = await axios.delete(`${API_URL}/department-members/${encodeURIComponent(deptName)}/${userId}`);
  return res.data;
}
