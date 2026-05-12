# Project Overview

## Purpose
Task management system for a team to track the progress of multiple projects simultaneously. The team can:
- Manage projects
- Assign project scoped roles
- Manage tasks/subtasks

## Primary Roles
- Admin
- Common User

## Main Modules
- User Managemnt
- Authentication and Authorization
- Project Level Role Management
- Task/Sub Task Management
- Project Management
- Notification System
- Error Logging
- Activity Tracker

## Constraints
- Roles are project scoped only
- A user can belong to multiple projects
- Deleted project and tasks should be recoverable
- Task hierarchi depth should be maxed at 1
- A Project is marked complete only after all its tasks are complete
- A task is marked complete onlyy after all its sub tasks are complete
