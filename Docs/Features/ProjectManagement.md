# Project Management

## Goal
The project management module allow users to:
- View projects
- Create new projects.
- Update existing projects.
- Archive projects.
- Delete projects.
- Search for projects.

## Database
### Table: Project

| Column         | DataType | Required | Constraint           |
|----------------|----------|----------|----------------------|
| Id             | Int      | Yes      | Primary Key          |
| Name           | Varchar  | Yes      |                      |
| StatusId       | Int      | Yes      | FK ProjectStatus(Id) |
| IsDeleted      | Boolean  | Yes      |                      |
| CreatedBy      | Int      | Yes      |                      |
| CreatedDate    | DateTime | Yes      |                      |
| ModifiedBy     | Int      | No       |                      |
| ModifiedDate   | DateTime | No       |                      |

### Table: ProjectStatus
| Column         | DataType | Required | Constraint  |
|----------------|----------|----------|-------------|
| Id             | Int      | Yes      | Primary Key |
| Name           | Varchar  | Yes      |             |

### Table: ProjectMember
| Column       | DataType | Required | Constraint         |
|--------------|----------|----------|--------------------|
| Project Id   | Int      | Yes      | PK, FK Project(Id) |
| User Id      | Int      | Yes      | PK, FK User(Id)    |
| RoleId       | Int      | Yes      | FK ProjectRole(Id) |
| CreatedBy    | Int      | Yes      |                    |
| CreatedDate  | DateTime | Yes      |                    |
| ModifiedBy   | Int      | No       |                    |
| ModifiedDate | DateTime | No       |                    |

## Status State
| Status      | Description | Next Possible Status | Previous Possible Status |
|-------------|-------------|----------------------|--------------------------|
| In Progress |             | Complete, Archive    | N/A                      |
| Complete    |             | Reopen               | In Progress, Reopen      |
| Reopen      |             | Complete, Archive    | Complete                 |
| Archive     |             | Reopen               | Reopen, In Progress      |

## Permission
| Role          | View | Create | Update | Delete | Archive |
|---------------|------|--------|--------|--------|---------|
| Admin         | Yes  | Yes    | Yes    | Yes    | Yes     |
| Common User   | Yes  | Yes    | No     | No     | No      |
| Project Owner | Yes  | Yes    | Yes    | Yes    | Yes     |

## List Projects
### Goal
To show paginated projects with options to search and filter them.

### Screen components
| Component              | Description                     |
|------------------------|---------------------------------|
| Table                  | Show the list of projects       |
| Search Box             | Search by project name          |
| Filter Dropdowns       | Filter by archive, project owner|
| Add Project Button     | Open project add form           |
| Edit Project Action    | Open project edit form          |
| Delete Project Action  | Delete project                  |
| Archive Project Action | Archive project                 |

### Table Columns
| Column        | Description                               |
|---------------|-------------------------------------------| 
| S No.         | Index of project based on current filters |
| Project Name  | Name of the project                       |
| Status        | Current status of the project             |
| Owner         | Name of the user who created the project  |
| Created Date  | Date of creation                          |
| Modified By   | Last edit made by the user                |
| Modified Date | Last date of edit                         |
| Actions       | Edit, Delete, Archive, Complete, Reopen   |

### Permission
- Common User can view when:
  * Is a project owner
  * Is a memeber

- Admin can view all projects.

### Business Rules
- Don't show deleted projects.
- By default don't show archived projects but give user the option to view them.


### Edge Cases
- No result is returned

## Create Project
### Goal
To add a new project.

### Screen Components
| Component             | Discription                        |
|-----------------------|------------------------------------|
| Back Action           | Take back to List Project screen   |
| Form                  | Form to add project details        |
| Add Memeber Action    | Add a new member                   |
| Remove Memeber Action | Remove member                      |
| Submit Action         | Send request to create new project |

### Form
#### Main Form
| Field  | Type        | Validations                     |
|--------|-------------|---------------------------------|
| Name   | String      | Required, must be unique        |
| Members| Member Form | At least one member is required |

#### Member Form
| Field | Type     | Validations |
|-------|----------|-------------|
| User  | Dropdown | Required    |
| Role  | Dropdown | Required    |

### Flow
1. From the list project screen click on the create icon button.
2. Redirect the user to create project form.
3. User add the details and submit the form.
4. System will process the request.
5. On success, redirect the user to list screen.

## Update Project
### Goal
To update the basic details and members of an existing project.

### Screen Components
| Component             | Discription                        |
|-----------------------|------------------------------------|
| Back Action           | Take back to List Project screen   |
| Form                  | Form to add project details        |
| Add Memeber Action    | Add a new member                   |
| Remove Memeber Action | Remove member                      |
| Submit Action         | Send request to update the project |

### Form
#### Main Form
| Field  | Type        | Validations                     |
|--------|-------------|---------------------------------|
| Name   | String      | Required, must be unique        |
| Members| Member Form | At least one member is required |

#### Member Form
| Field | Type     | Validations |
|-------|----------|-------------|
| User  | Dropdown | Required    |
| Role  | Dropdown | Required    |

### Flow
1. From the list project screen click on the edit icon in front of the project.
2. Redirect the user to update project form.
3. User make the changes and submit the form.
4. System will process the request.
5. On success, redirect the user to list screen.

### Business Rules
- Cannot update an archived project.
- Cannot update a deleted project.
- Cannot update a completed project.

### Edge Cases
- Project is deleted while updating the project.
- Project is archived while updating the project.
- Project is completed while updating the project.

## Delete Project
### Goal
To delete an exisitng project.

### Flow
1. From the list project screen click on the delete icon in front of the project.
2. System will open a confirmation popup to confirm the action.
3. If user confirm then system will soft delete the project.
4. After successfully deleting the project refresh the list.

### Business Rule
- All the tasks inside the project will also be soft deleted.

### Edge Cases
- Project is already deleted.
- Project doesn't exits.

## Archive Project
### Goal
To archive an existing project.

### Flow
1. From the list project screen click on the archive icon in front of the project.
2. System will open a confirmation popup to confirm the action.
3. If user confirm then system will archive the project.
4. After succesffully archiving the project refresh the list.

### Business Rules
- Cannot archive a completed project.
- Cannot archive a deleted project.
- If the archived project has on going tasks then they will be archived as well.

### Edge Cases
- Project is already archived.
- Project is deleted.
- Project doesn't exists.
