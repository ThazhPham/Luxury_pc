import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// SUPABASE CONFIG
// =====================
const supabaseUrl = 'https://kqykprenspkcwndnvswm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxeWtwcmVuc3BrY3duZG52c3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDc3NzcsImV4cCI6MjA5NDIyMzc3N30.kaw7tCfOmFgVSicOADToQnDYfrdErID0OIqYfLQkA5s';

const supabase = createClient(supabaseUrl, supabaseKey);

// =====================
// ROOT
// =====================
app.get('/', (req, res) => {
    res.send('API is running');
});

// =====================
// GET ALL USERS
// =====================
app.get('/api/user', async (req, res) => {
    const { data, error } = await supabase.from('user_profiles').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// =====================
// GET USER BY ID
// =====================
app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('user_profiles').select('*').eq('id', id).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// =====================
// ADD USER
// =====================
app.post('/api/user', async (req, res) => {
    const { username, fullName, email, department, position, status, joinDate, phone } = req.body;
    const { data, error } = await supabase.from('user_profiles').insert([
        { username, fullName, email, department, position, status, joinDate, phone }
    ]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// =====================
// UPDATE USER
// =====================
app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { username, fullName, email, department, position, status, joinDate, phone } = req.body;
    const { data, error } = await supabase.from('user_profiles').update(
        { username, fullName, email, department, position, status, joinDate, phone }
    ).eq('id', parseInt(id)).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// =====================
// DELETE USER
// =====================
app.delete('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('user_profiles').delete().eq('id', parseInt(id));
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
});

// =====================
// LOGIN (find user by username)
// =====================
app.post('/api/login', async (req, res) => {
    const { username } = req.body;
    const { data, error } = await supabase.from('user_profiles').select('*').eq('username', username).single();
    if (error) return res.status(401).json({ error: 'User not found' });
    res.json(data);
});

// =====================
// GET ALL DEPARTMENTS
// =====================
app.get('/api/department', async (req, res) => {
    const { data, error } = await supabase.from('departments').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// =====================
// GET DEPARTMENT BY NAME
// =====================
app.get('/api/department/:name', async (req, res) => {
    const { name } = req.params;
    const { data, error } = await supabase.from('departments').select('*').eq('name', name).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// =====================
// GET DEPARTMENT MEMBERS (user_ids by department_name)
// =====================
app.get('/api/department-members/:deptName', async (req, res) => {
    const { deptName } = req.params;
    const { data, error } = await supabase.from('department_members').select('user_id').eq('department_name', deptName);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data.map(row => row.user_id));
});

// =====================
// ADD MEMBER TO DEPARTMENT
// =====================
app.post('/api/department-members', async (req, res) => {
    const { department_name, user_id } = req.body;
    const { data, error } = await supabase.from('department_members').insert([
        { department_name, user_id }
    ]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// =====================
// REMOVE MEMBER FROM DEPARTMENT
// =====================
app.delete('/api/department-members/:deptName/:userId', async (req, res) => {
    const { deptName, userId } = req.params;
    const { error } = await supabase.from('department_members').delete()
        .eq('department_name', deptName)
        .eq('user_id', parseInt(userId));
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
});

// ===================================
// DEPT INFO MEMBERS (DepartmentInfoPage)
// Separate table: dept_info_members
// ===================================
app.get('/api/dept-info-members/:deptName', async (req, res) => {
    const { deptName } = req.params;
    const { data, error } = await supabase.from('dept_info_members').select('user_id').eq('department_name', deptName);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data.map(row => row.user_id));
});

app.post('/api/dept-info-members', async (req, res) => {
    const { department_name, user_id } = req.body;
    const { data, error } = await supabase.from('dept_info_members').insert([
        { department_name, user_id }
    ]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

app.delete('/api/dept-info-members/:deptName/:userId', async (req, res) => {
    const { deptName, userId } = req.params;
    const { error } = await supabase.from('dept_info_members').delete()
        .eq('department_name', deptName)
        .eq('user_id', parseInt(userId));
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
});

// =====================
// START SERVER
// =====================
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));