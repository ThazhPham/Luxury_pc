import axios from 'axios';

const API_URL = 'http://localhost:3001/api/user';

// Load all user profiles from Supabase API
export async function loadUserProfiles() {
  const res = await axios.get(API_URL);
  return res.data;
}

// Add new user profile
export async function addUserProfile(profile) {
  const res = await axios.post(API_URL, profile);
  return res.data;
}

// Update user profile
export async function updateUserProfile(id, updates) {
  const res = await axios.put(`${API_URL}/${id}`, updates);
  return res.data;
}

// Delete user profile
export async function deleteUserProfile(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}

// Export user profiles as JSON file download
export async function exportUserProfiles() {
  const profiles = await loadUserProfiles();
  const dataStr = JSON.stringify(profiles, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `user-profiles-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Import user profiles from JSON file (re-inserts all into Supabase)
export async function importUserProfiles(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const profiles = JSON.parse(e.target.result);
        if (Array.isArray(profiles)) {
          // Insert each profile via API
          for (const profile of profiles) {
            const { id, ...rest } = profile; // exclude id, let Supabase auto-generate
            await addUserProfile(rest);
          }
          resolve(profiles);
        } else {
          reject(new Error('Invalid file format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
}
