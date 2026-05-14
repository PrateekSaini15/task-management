# User Management

## Goal
The user management module allow admin to:
- View Users
- Create Users
- Update Users
- Activate/Deactivate Users

## Database
### Table: User
| Column     | Data Type | Required | Constraint  |
|------------|-----------|----------|-------------|
| Id         | Int       | Yes      | PK          |
| First Name | String    | Yes      |             |
| Last Name  | String    | No       |             |
| Username   | String    | Yes      | Unique      |
| Email      | String    | Yes      | Unique      |
| RoleId     | Int       | Yes      | FK Role(Id) |

### Table: Role
| Column | Data Type | Required | Constraint |
|--------|-----------|----------|------------|
| Id     | Int       | Yes      | PK         |
| Name   | String    | Yes      |            |

## Business Rule
- Only one admin user

## Permissions
| Role        | View | Create | Update | Activate/Deactivate |
|-------------|------|--------|--------|---------------------|
| Admin       | Yes  | Yes    | Yes    | Yes                 |
| Common User | No   | No     | No     | No                  |


## List Users
### Goal
To show paginated users with options to search and filter them.

### Screen Components
| Component            | Description                                         |
|----------------------|-----------------------------------------------------|
| Table                | Show the list of users                              |
| Search Box           | Search by first name, last name, username and email |
| Filter Dropdowns     | Filter by active status                             |
| Create User Button   | Open create user form                               |
| Update User Action   | Open update user form                               |
| Toggle Active Action | Toggle active status of user                        |

### Table Columns
| Column        | Description                                              |
|---------------|----------------------------------------------------------| 
| S No.         | Index of user based on current filters                   |
| Name          | Name of the user                                         |
| Username      | Current status of the project                            |
| Email         | Name of the user who created the project                 |
| Audit Details | Created by, date of creation, modified by, modified date |
| Actions       | Edit, Toggle Active                                      |

### Edge Case
- No records returned

## Create User
### Goal
To create new user in the system.

### Screen Components
| Component     | Description                     |
|---------------|---------------------------------|
| Back Button   | Take back to list user screen   |
| Form          | Form to create new user         |
| Submit Button | Send request to create new user |

### Form
| Field      | Type   | Validation                    |
|------------|--------|-------------------------------|
| First Name | String | Required                      |
| Last Name  | String |                               |
| Username   | String | Required, Unique              |
| Email      | String | Required, Unique, Valid Email |

### Flow
1. From user list screen click on the create user button.
2. Redirect the user to create user form.
3. User enter the details and submit the form.
4. System will process the request.
5. On success, redirect the user to user list screen.

### Business Rules
- For new user role will always be _Common User_
- Can't create user with admin role.

## Update User
### Goal
To update an existing user in the system.

### Screen Components
| Component     | Description                     |
|---------------|---------------------------------|
| Back Button   | Take back to list user screen   |
| Form          | Form to update user details     |
| Submit Button | Send request to update user     |

### Form
| Field      | Type   | Validation                    |
|------------|--------|-------------------------------|
| First Name | String | Required                      |
| Last Name  | String |                               |
| Username   | String | Required, Unique              |
| Email      | String | Required, Unique, Valid Email |

### Flow
1. From user list screen click on the edit icon in front of the user.
2. Redirect the user to update user form.
3. User update the details and submit the form.
4. System will process the request.
5. On success, redirect the user to user list screen.

## Toggle Active Status
### Goal
To toggle the active status of an user.

### Flow
1. From the user list screen click on the toggle active status icon in front of the user.
2. System will open the confirmation popup to confirm the action.
3. If user confirms then system will toggle the active status of the user.
4. After successfully toggling the active status refresh the list.

### Business Rules
- Cannot deactivate a user who is a project owner.
- Cannot deactivate a user who has non active tasks in his worklist.

