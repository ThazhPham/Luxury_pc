# User Profiles Grid - Implementation Guide

## Overview
A comprehensive User Profiles management system using DevExpress DataGrid with full CRUD operations and data persistence.

## Features

### 1. DataGrid Component
- **Professional Data Grid** using DevExtreme React
- **Responsive Design** - adapts to different screen sizes
- **Column Management** - 9 data columns with customizable widths
- **Row Alternation** - alternating row colors for better readability
- **Selection** - checkbox selection with "Select All" option

### 2. CRUD Operations
- **Create** - Add new user profiles with form validation
- **Read** - Display users with search and filtering
- **Update** - Edit user information inline or via row edit
- **Delete** - Remove individual or bulk users

### 3. Data Persistence
- **LocalStorage** - All data saved to browser storage
- **Auto-Load** - Data automatically loaded on page refresh
- **Mock Data** - Initial 5 default profiles for demo

### 4. Additional Features
- **Search Panel** - Real-time user search by any column
- **Pagination** - 10 records per page with navigation
- **Status Tracking** - Active/Inactive/On Leave statuses
- **Department Assignment** - Dropdown selection from 4 departments
- **Export/Import** - JSON file export/import for backup
- **Bulk Operations** - Select and delete multiple users at once
- **Refresh** - Reload latest data from storage

## File Structure

```
project/src/
├── pages/
│   ├── UserProfilesPage.jsx          # Main grid component
│   └── MainPage.jsx                  # Updated with new tab
├── services/
│   └── userProfileService.js         # Data service layer
├── styles/
│   ├── UserProfilesPage.css          # Grid styling
│   └── MainPage.css                  # Updated styles
└── main.jsx                          # Updated with DevExtreme CSS
```

## User Profile Schema

```javascript
{
  id: number,              // Unique identifier (auto-generated)
  username: string,        // User login name
  fullName: string,        // User's full name
  email: string,           // Email address
  department: string,      // Department name (dropdown)
  position: string,        // Job position
  status: string,          // Active/Inactive/On Leave
  joinDate: date,          // Hire date
  phone: string            // Contact number
}
```

## Default Departments
1. IT Department
2. Sales Department
3. HR Department
4. Finance Department

## Default Statuses
1. Active
2. Inactive
3. On Leave

## How to Use

### View User Profiles
1. Login to the system
2. Navigate to the "User Profiles" tab
3. View all users in the grid

### Add New User
1. Click the **+** button in the grid toolbar
2. Fill in the new row with user details
3. Press Enter or click Save
4. User is automatically saved to LocalStorage

### Edit User Profile
1. Click the **Edit** icon (pencil) on the row
2. Modify the user details
3. Press Enter or click Save
4. Changes are automatically saved

### Delete User
1. Click the **Delete** icon (trash) on the row
2. Confirm the deletion
3. User is removed from the grid and storage

### Delete Multiple Users
1. Check the checkboxes for users to delete
2. Click "Delete [X] Selected" button
3. Confirm bulk deletion
4. Selected users are removed

### Search Users
1. Use the search box at the top of the grid
2. Type to search by any column value
3. Results update in real-time

### Export User Profiles
1. Click the **Export** button
2. Browser downloads a JSON file with all profiles
3. File named `user-profiles-[timestamp].json`

### Import User Profiles
1. Click the **Import** button
2. Select a previously exported JSON file
3. Profiles are loaded into the grid
4. Data replaces current profiles

### Refresh Data
1. Click the **Refresh** button
2. Latest data from LocalStorage is reloaded
3. Any unsaved changes are lost

## API Functions

### userProfileService.js

```javascript
// Load all profiles from storage
loadUserProfiles() → Array

// Save profiles to storage
saveUserProfiles(profiles) → Boolean

// Add new profile
addUserProfile(profile) → Object

// Update existing profile
updateUserProfile(id, updates) → Object

// Delete profile
deleteUserProfile(id) → Boolean

// Export to JSON file
exportUserProfiles() → void

// Import from JSON file
importUserProfiles(file) → Promise<Array>
```

## Styling

### Color Scheme
- **Primary**: Purple gradient (#667eea - #764ba2)
- **Background**: Light blue (#f5f7fa)
- **Text**: Dark gray (#333)
- **Accent**: Light purple (#e8ebf8)

### Responsive Design
- Desktop (1200px+) - Full grid with all features
- Tablet (768px-1199px) - Adjusted layout
- Mobile (< 768px) - Horizontal scroll for grid

## Browser Storage

### Storage Key
`userProfiles` - localStorage key for saving profiles

### Storage Capacity
- Typical localStorage limit: 5-10MB
- Can store ~1000+ user profiles

### Data Persistence
- Data persists across page refreshes
- Survives browser restarts
- Cleared only when localStorage is manually cleared

## Error Handling

- **File Import Errors** - Displays alert with error message
- **Storage Errors** - Falls back to mock data
- **Validation** - Required field validation on form submission
- **Confirmation** - Delete operations require confirmation

## Performance

- **DataGrid** - Optimized for 100-1000+ records
- **Search** - Real-time filtering without lag
- **Pagination** - 10 records per page (configurable)
- **Memory** - Efficient with minimal re-renders

## Next Steps

To extend this implementation:

1. **Backend Integration**
   - Replace localStorage with API calls
   - Add database persistence
   - Implement authentication

2. **Advanced Features**
   - Multi-column sorting
   - Custom filtering
   - Advanced search queries
   - Report generation

3. **Security**
   - Role-based access control
   - Audit logging
   - Data encryption
   - Permission-based operations

4. **UI/UX Improvements**
   - Custom themes
   - Drag & drop column reordering
   - Inline editing templates
   - Bulk operation progress indicators

## Troubleshooting

### Grid Not Showing Data
- Check browser console for errors
- Verify DevExtreme CSS is loaded
- Check localStorage for data

### Import Not Working
- Verify JSON file format is correct
- Check file contains array of objects
- Ensure all required fields are present

### Data Lost After Refresh
- Check if localStorage is enabled
- Verify browser doesn't clear storage on exit
- Check storage quota isn't exceeded

## Support

For issues or questions:
1. Check browser console for errors
2. Verify DevExtreme version compatibility
3. Review localStorage data in DevTools
4. Check file import format

---

**Version**: 1.0.0
**Last Updated**: 2026-05-11
**DevExtreme Version**: 25.2.7
**React Version**: 19.2.5
