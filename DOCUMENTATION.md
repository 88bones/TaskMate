# TaskMate - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Functional Requirements](#functional-requirements)
3. [Non-Functional Requirements](#non-functional-requirements)
4. [Features](#features)
5. [Data Models](#data-models)
6. [Workflow Diagram](#workflow-diagram)
7. [Database Relations & Schema](#database-relations--schema)
8. [Repository Information](#repository-information)
9. [Future Enhancements](#future-enhancements)

---

## Introduction

### Overview

**TaskMate** is a comprehensive web-based project and task management application designed to help teams collaborate effectively, track project progress, and manage tasks efficiently. It provides a centralized platform where team members can create projects, assign tasks, monitor progress, and communicate through activity logs and notifications.

### Purpose

TaskMate aims to:

- Streamline project management workflows
- Improve team collaboration and communication
- Provide real-time visibility into project status and task progress
- Enable efficient resource allocation and workload management
- Maintain comprehensive activity history and audit trails

### Target Users

- **Project Managers**: Create and manage projects, assign tasks, monitor progress
- **Team Leads**: Oversee team performance and task completion
- **Team Members**: View assigned tasks, update status, and collaborate
- **Administrators**: Manage users, view analytics, and system configuration

### System Architecture

TaskMate follows a **three-tier architecture**:

- **Presentation Layer**: React-based frontend with responsive UI
- **Business Logic Layer**: Express.js REST API backend
- **Data Access Layer**: MongoDB database with Mongoose ODM

---

## Functional Requirements

### User Management

- **FR1.1**: Users must be able to register with email, password, and personal details
- **FR1.2**: Users must be able to log in with email and password
- **FR1.3**: Users must be able to update their profile information and profile picture
- **FR1.4**: Users must be able to specify their department (UI/UX, Frontend, Backend, QA, Owner)
- **FR1.5**: Administrators must be able to view and manage all users
- **FR1.6**: Users must be able to view their profile and other team members' profiles

### Project Management

- **FR2.1**: Users must be able to create new projects with title, description, start date, and end date
- **FR2.2**: Project creators must be able to update project details
- **FR2.3**: Project creators must be able to delete projects
- **FR2.4**: Users must be able to view all projects
- **FR2.5**: Users must be able to view projects they created
- **FR2.6**: Users must be able to view projects they are assigned to
- **FR2.7**: Users must be able to add team members to projects

### Task Management

- **FR3.1**: Users must be able to create tasks with title, description, priority, due date, and attachments
- **FR3.2**: Tasks must be assignable to one or multiple team members
- **FR3.3**: Task status must be manageable (New, To Do, In Progress, Review, Done)
- **FR3.4**: Users must be able to update task details and status
- **FR3.5**: Task creators must be able to delete tasks
- **FR3.6**: Users must be able to view all tasks in a project
- **FR3.7**: Users must be able to view tasks assigned to them
- **FR3.8**: Users must be able to view tasks they created
- **FR3.9**: Tasks must support file attachments
- **FR3.10**: Users must be able to view and download task attachments

### Kanban Board

- **FR4.1**: Users must be able to view tasks in a Kanban board layout
- **FR4.2**: Tasks must be draggable between status columns
- **FR4.3**: Task status must update automatically when dragged to a new column
- **FR4.4**: Users must be able to filter tasks by creator or assignee
- **FR4.5**: Users must be able to clear applied filters

### Activity & Timeline

- **FR5.1**: System must log all project activities (task creation, updates, assignments)
- **FR5.2**: Users must be able to view project activity timeline
- **FR5.3**: Activity logs must include user information and timestamps
- **FR5.4**: Activity descriptions must clearly indicate what was changed

### Notifications

- **FR6.1**: System must send notifications when a task is assigned
- **FR6.2**: System must send notifications when task status changes
- **FR6.3**: Users must be able to view their notifications
- **FR6.4**: Users must be able to mark notifications as read
- **FR6.5**: Users must be able to mark all notifications as read

### Team Management

- **FR7.1**: Users must be able to create teams
- **FR7.2**: Project creators must be able to add members to project teams
- **FR7.3**: Users must be able to view team members in a project
- **FR7.4**: Team member lists must display member details and contact information

### Admin Dashboard

- **FR8.1**: Administrators must be able to view system analytics
- **FR8.2**: Administrators must be able to view all projects and tasks
- **FR8.3**: Administrators must be able to view all users
- **FR8.4**: System must provide project and task statistics

---

## Non-Functional Requirements

### Performance

- **NFR1.1**: API response time should be less than 500ms for standard queries
- **NFR1.2**: Page load time should not exceed 3 seconds on standard connections
- **NFR1.3**: Application should handle concurrent users efficiently
- **NFR1.4**: Database queries should be optimized with proper indexing

### Security

- **NFR2.1**: Passwords must be hashed using industry-standard algorithms (bcrypt)
- **NFR2.2**: JWT tokens must be used for API authentication
- **NFR2.3**: Sensitive data (passwords, emails) must be encrypted
- **NFR2.4**: API endpoints must validate and sanitize input
- **NFR2.5**: CORS must be properly configured to prevent unauthorized access

### Availability

- **NFR3.1**: Application should have 99% uptime
- **NFR3.2**: Database should support automatic backups
- **NFR3.3**: System should gracefully handle errors and failures

### Scalability

- **NFR4.1**: Architecture should support horizontal scaling
- **NFR4.2**: Database should efficiently handle growing data volumes
- **NFR4.3**: Frontend should optimize bundle size for faster loading

### Usability

- **NFR5.1**: UI should be intuitive and user-friendly
- **NFR5.2**: Application should be fully responsive on mobile, tablet, and desktop
- **NFR5.3**: Navigation should be clear and consistent
- **NFR5.4**: Error messages should be helpful and actionable

### Maintainability

- **NFR6.1**: Code should follow consistent style guidelines
- **NFR6.2**: Components should be modular and reusable
- **NFR6.3**: API endpoints should be well-documented
- **NFR6.4**: Database schema should be normalized

---

## Features

### 1. User Authentication & Management

- User registration with email and password
- Secure login with JWT authentication
- Profile management with profile picture upload
- Department selection and role assignment
- User profile viewing with contact information

### 2. Project Management

- **Create Projects**: Define projects with detailed information
- **Edit Projects**: Update project details anytime
- **Delete Projects**: Remove projects when no longer needed
- **View Projects**:
  - All projects in the system
  - Projects created by the user
  - Projects assigned to the user
- **Team Management**: Add and manage team members within projects

### 3. Task Management

- **Create Tasks**: Add tasks with comprehensive details
  - Title and description
  - Priority levels (Low, Medium, High)
  - Due dates
  - File attachments
  - Multiple assignees support
- **Task Status Management**: Track task progress through different statuses
  - New - Newly created tasks
  - To Do - Tasks waiting to be started
  - In Progress - Currently being worked on
  - Review - Tasks in review stage
  - Done - Completed tasks
- **Edit Tasks**: Update task details and status
- **Delete Tasks**: Remove tasks as needed
- **View Tasks**:
  - All tasks in a project
  - Tasks assigned to the user
  - Tasks created by the user
- **Attachments**:
  - Upload files to tasks
  - View task attachments
  - Download attachments

### 4. Kanban Board

- **Visual Task Management**: Drag-and-drop interface
- **Status Columns**: Organized view of tasks by status
- **Task Filtering**:
  - Filter by task creator
  - Filter by assignee
  - Clear all filters
- **Real-time Updates**: Status changes reflected immediately

### 5. Activity Timeline

- **Activity Logging**: Automatic logging of all project activities
- **Timeline View**: Chronological display of activities
- **Activity Details**: Clear descriptions of what changed and when
- **User Information**: Display who performed each action

### 6. Notifications System

- **Automatic Notifications**:
  - Task assignments
  - Status changes
  - New task creation
- **Notification View**: Centralized notification management
- **Mark as Read**: Individual and bulk marking as read
- **Notification History**: View past notifications

### 7. Admin Dashboard

- **Analytics & Reporting**:
  - Project statistics
  - Task distribution
  - User activity overview
  - Project performance metrics
- **User Management**: View and manage all system users
- **All Tasks Overview**: Monitor all tasks across projects
- **System Health**: Monitor system status

### 8. Responsive Design

- **Desktop**: Full-featured interface optimized for desktop screens
- **Tablet**: Optimized layout for tablet devices
- **Mobile**: Card-based interface for mobile phones
- **Adaptive Navigation**: Context-aware navigation menu

---

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  firstname: String (required),
  lastname: String (required),
  username: String (required, unique),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  department: String (enum: ["ui/ux", "frontend", "backend", "owner", "qa"]),
  role: String (enum: ["user", "admin"], default: "user"),
  photo: String (file path or URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  createdBy: ObjectId (ref: User),
  startDate: Date,
  endDate: Date,
  team: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ["new", "todo", "in-progress", "review", "done"]),
  priority: String (enum: ["low", "medium", "high"]),
  dueDate: Date,
  attachments: [String] (file paths),
  assignedTo: [ObjectId] (ref: User),
  projectId: ObjectId (ref: Project, required),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Activity Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  projectId: ObjectId (ref: Project),
  description: String,
  activityType: String (enum: ["create", "update", "delete", "assign"]),
  relatedItem: ObjectId (reference to affected item),
  createdAt: Date
}
```

### Notification Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  message: String,
  type: String (enum: ["task_assigned", "status_changed", "task_created"]),
  relatedTask: ObjectId (ref: Task),
  isRead: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Team Model

```javascript
{
  _id: ObjectId,
  projectId: ObjectId (ref: Project),
  members: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Workflow Diagram

### User Journey - Task Creation and Assignment

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER WORKFLOW                              │
└─────────────────────────────────────────────────────────────────┘

1. AUTHENTICATION
   ┌──────────────────┐
   │  User Sign In    │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────────────┐
   │  JWT Token Generated     │
   │  Stored in localStorage  │
   └────────┬─────────────────┘
            │
            ▼

2. PROJECT CREATION
   ┌──────────────────────┐
   │  Navigate to Create  │
   │  Project Page        │
   └────────┬─────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │  Fill Project Details        │
   │  - Title                     │
   │  - Description              │
   │  - Start/End Date           │
   └────────┬─────────────────────┘
            │
            ▼
   ┌──────────────────────┐
   │  POST /create-project│
   │  Backend processes   │
   └────────┬─────────────┘
            │
            ▼
   ┌──────────────────────────┐
   │  Project Created         │
   │  Activity Logged         │
   │  Notification Sent       │
   └────────┬─────────────────┘
            │
            ▼

3. TASK CREATION
   ┌──────────────────────────┐
   │  Open Project            │
   │  Click "Create Task"     │
   └────────┬─────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │  Fill Task Details           │
   │  - Title                     │
   │  - Description              │
   │  - Priority                 │
   │  - Due Date                 │
   │  - Attachments              │
   └────────┬─────────────────────┘
            │
            ▼
   ┌──────────────────────────────┐
   │  Assign to Team Member(s)    │
   │  (Can assign multiple users) │
   └────────┬─────────────────────┘
            │
            ▼
   ┌──────────────────────┐
   │  POST /create-task   │
   │  Backend processes   │
   └────────┬─────────────┘
            │
            ▼
   ┌──────────────────────────┐
   │  Task Created            │
   │  Activity Logged         │
   │  Notification Sent to    │
   │  Assigned Users          │
   └────────┬─────────────────┘
            │
            ▼

4. TASK MANAGEMENT
   ┌─────────────────────────────────────────────────┐
   │           Kanban Board View                     │
   │  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
   │  │ New    │ ← ─┼─ To Do       │ ← ─┼─ In Progress ← ┐
   │  └─────────────┘ └─────────────┘ └──────────┘   │
   │         ↑                                       │
   │         └───────── Drag & Drop Task ───────────┘
   │
   │  Status Updates:
   │  - Automatically logged
   │  - Backend notified
   │  - Activity recorded
   │  - Notifications sent
   └─────────────────────────────────────────────────┘
            │
            ▼

5. ACTIVITY TRACKING
   ┌──────────────────────────┐
   │  Timeline View           │
   │  - Task created          │
   │  - Task assigned         │
   │  - Status changed        │
   │  - Task updated          │
   │  - User interactions     │
   └──────────────────────────┘

6. NOTIFICATION SYSTEM
   ┌──────────────────────────┐
   │  Notifications Panel     │
   │  - View all              │
   │  - Mark as read          │
   │  - Mark all as read      │
   │  - Real-time updates     │
   └──────────────────────────┘
```

### Backend Data Flow

```
REQUEST FLOW
────────────

Client (React)
     │
     │ HTTP Request (with JWT token)
     │
     ▼
Express Router
     │
     ├─ CORS Check
     │
     ├─ JWT Authentication Middleware
     │
     ├─ Request Validation Middleware
     │
     ├─ File Upload Middleware (if applicable)
     │
     ▼
Route Handler
     │
     ▼
Controller Logic
     │
     ├─ Data Validation
     │
     ├─ Database Operations (via Mongoose)
     │
     ├─ Activity Logging
     │
     ├─ Notification Creation
     │
     ▼
Database (MongoDB)
     │
     ├─ User Collection
     ├─ Project Collection
     ├─ Task Collection
     ├─ Activity Collection
     ├─ Notification Collection
     └─ Team Collection
     │
     ▼
Response Generation
     │
     ▼
Client (React)
```

---

## Database Relations & Schema

### Entity Relationship Diagram

```
┌─────────────────┐
│      USER       │
├─────────────────┤
│ _id (PK)        │◄────────────────────┐
│ firstname       │                     │
│ lastname        │                     │
│ email           │                     │
│ password        │                     │
│ department      │                     │
│ role            │                     │
│ photo           │                     │
│ timestamps      │                     │
└─────────────────┘                     │
        │                               │
        │ (1:N)                         │
        │                               │
        ├────────────────┬──────────────┘
        │                │
        ▼                ▼
┌─────────────────┐   ┌──────────────────┐
│    PROJECT      │   │   ACTIVITY       │
├─────────────────┤   ├──────────────────┤
│ _id (PK)        │   │ _id (PK)         │
│ title           │   │ user (FK)        │◄──┐
│ description     │   │ projectId (FK)   │   │
│ createdBy (FK)  │◄──┤ description      │   │
│ startDate       │   │ activityType     │   │
│ endDate         │   │ relatedItem      │   │
│ team (FK array) │   │ timestamps       │   │
│ timestamps      │   └──────────────────┘   │
└─────────────────┘                          │
        │                                    │
        │ (1:N)                              │
        │                                    │
        ▼                                    │
┌─────────────────┐                         │
│      TASK       │                         │
├─────────────────┤                         │
│ _id (PK)        │                         │
│ title           │                         │
│ description     │                         │
│ status          │                         │
│ priority        │                         │
│ dueDate         │                         │
│ attachments     │                         │
│ assignedTo[]    │◄─────────────┐          │
│ projectId(FK)───┼───────┐      │          │
│ createdBy(FK)───┼────────────────┼────────┘
│ timestamps      │       │       │
└─────────────────┘       │       │
        │                 │       │
        │(1:N)           │       │
        │                 │       │
        ▼                 │       │
┌──────────────────┐     │       │
│  NOTIFICATION    │     │       │
├──────────────────┤     │       │
│ _id (PK)         │     │       │
│ user (FK)────────┼────┐│       │
│ message          │    ││       │
│ type             │    ││       │
│ relatedTask(FK)──┼────┴┼───────┘
│ isRead           │     │
│ timestamps       │     │
└──────────────────┘     │
                         │
┌──────────────────┐     │
│      TEAM        │     │
├──────────────────┤     │
│ _id (PK)         │     │
│ projectId(FK)────┼────┐│
│ members[]─────────────┤│
│ timestamps       │     ││
└──────────────────┘     ││
                         │└─(Many-to-Many)
                         └─(One-to-Many)
```

### Table Relationships

| From    | Relationship | To           | Type         |
| ------- | ------------ | ------------ | ------------ |
| User    | createdBy    | Project      | One-to-Many  |
| User    | team members | Project      | Many-to-Many |
| User    | createdBy    | Task         | One-to-Many  |
| User    | assignedTo   | Task         | Many-to-Many |
| User    | user         | Activity     | One-to-Many  |
| User    | user         | Notification | One-to-Many  |
| Project | projectId    | Task         | One-to-Many  |
| Project | projectId    | Activity     | One-to-Many  |
| Project | projectId    | Team         | One-to-One   |
| Task    | relatedItem  | Activity     | One-to-Many  |
| Task    | relatedTask  | Notification | One-to-Many  |

---

## Repository Information

### GitHub Repository

**Repository Name**: Timely  
**Owner**: 88bones  
**URL**: [https://github.com/88bones/Timely](https://github.com/88bones/Timely)  
**Current Branch**: main

### Repository Structure

```
Timely/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # React Components
│   │   ├── pages/           # Page Components
│   │   ├── services/        # API Services
│   │   ├── redux/           # Redux Store
│   │   ├── lib/             # Utilities
│   │   ├── assets/          # Static Assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/              # Public Assets
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                   # Express Backend
│   ├── controllers/         # Route Controllers
│   ├── models/             # Database Models
│   ├── routes/             # API Routes
│   ├── middleware/         # Express Middleware
│   ├── utils/              # Utility Functions
│   ├── uploads/            # User Uploads
│   ├── index.js            # Entry Point
│   └── package.json
│
├── README.md               # Main Documentation
├── DOCUMENTATION.md        # This File
└── .gitignore             # Git Ignore Rules
```

### Key Branches

- **main**: Production-ready code
- **develop**: Development branch (if used)

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Open a Pull Request

---

## Future Enhancements

### Phase 2: Advanced Features

#### 1. Enhanced Communication

- **In-app Chat**: Real-time messaging between team members
- **Comments on Tasks**: Collaborative task discussions
- **@Mentions**: Notify specific team members
- **Email Notifications**: Digest emails for task updates
- **Slack Integration**: Sync TaskMate with Slack channels

#### 2. Advanced Analytics & Reporting

- **Custom Reports**: Generate reports on task completion, velocity, etc.
- **Team Performance Metrics**: Track individual and team productivity
- **Project Burndown Charts**: Visual representation of project progress
- **Time Tracking**: Log time spent on tasks
- **Export Reports**: Download reports in PDF/Excel format
- **Dashboard Widgets**: Customizable analytics dashboard

#### 3. Automation & Workflow

- **Task Templates**: Create and reuse task templates
- **Automated Notifications**: Custom notification rules
- **Task Dependencies**: Create task dependencies and critical path analysis
- **Recurring Tasks**: Set up recurring tasks
- **Workflow Automation**: Automate common task transitions

#### 4. Integration Features

- **GitHub Integration**: Sync with GitHub repositories
- **Jira Integration**: Import/export with Jira
- **Google Calendar**: Sync due dates with Google Calendar
- **Microsoft Teams**: TaskMate bot for Microsoft Teams
- **Zapier Integration**: Connect with 1000+ apps

#### 5. Mobile Application

- **Native Mobile Apps**: iOS and Android applications
- **Offline Mode**: Work offline and sync when online
- **Push Notifications**: Real-time mobile notifications
- **Mobile Optimized UI**: Gesture-based interactions

#### 6. Collaboration Features

- **File Sharing**: Enhanced file management and sharing
- **Version Control**: Track file versions
- **Collaborative Editing**: Real-time document editing
- **Screen Sharing**: Built-in screen sharing capabilities
- **Video Meetings**: Integrated video conferencing

#### 7. Advanced Project Management

- **Gantt Charts**: Visual project timeline
- **Portfolio Management**: Manage multiple projects
- **Resource Planning**: Allocate resources across projects
- **Budget Tracking**: Monitor project budgets
- **Risk Management**: Track and manage project risks
- **Agile/Scrum Support**: Sprint planning and management

#### 8. Performance Improvements

- **Caching**: Implement Redis caching
- **CDN Integration**: Serve static assets via CDN
- **Database Optimization**: Add more indexes and optimize queries
- **Pagination**: Implement pagination for large datasets
- **Lazy Loading**: Implement lazy loading for images and components

#### 9. Security Enhancements

- **Two-Factor Authentication**: 2FA support
- **OAuth Integration**: Google, GitHub, Microsoft login
- **Role-Based Access Control**: More granular permissions
- **Audit Logs**: Detailed security audit logs
- **Encryption**: End-to-end encryption for sensitive data
- **GDPR Compliance**: Data privacy and compliance features

#### 10. AI/ML Features

- **Smart Task Assignment**: ML-based task assignment suggestions
- **Predictive Analytics**: Predict project completion dates
- **Anomaly Detection**: Detect unusual activity patterns
- **Natural Language Processing**: AI-powered task descriptions
- **Smart Search**: Improved search with NLP

### Phase 3: Enterprise Features

#### 1. White-Labeling

- **Custom Branding**: White-label the application
- **Custom Domain**: Deploy on custom domains
- **Custom CSS**: Theme customization

#### 2. Advanced Administration

- **User Groups**: Organize users into groups
- **Custom Fields**: Add custom fields to projects and tasks
- **Workflow Builder**: Visual workflow builder
- **Approval Process**: Multi-level approvals
- **Audit Trail**: Complete activity audit log

#### 3. Business Intelligence

- **Data Warehouse**: Centralized data storage
- **Business Analytics**: Advanced business intelligence
- **Predictive Modeling**: Forecasting and predictions
- **Real-time Dashboards**: Live data dashboards

### Roadmap Timeline

- **Q1 2026**: Enhanced Communication & Advanced Analytics
- **Q2 2026**: Automation & Workflow Features
- **Q3 2026**: Mobile Application & Integration Features
- **Q4 2026**: Gantt Charts & Portfolio Management
- **Q1 2027**: Enterprise Features & White-labeling
- **Q2+ 2027**: Continuous improvements and scaling

### Community Contributions

We welcome community contributions! Areas where help is appreciated:

- Bug fixes and performance improvements
- UI/UX enhancements
- Documentation improvements
- Feature implementations
- Test coverage improvements
- Localization support

---

## Summary

TaskMate is a robust, scalable project management solution designed to meet the needs of modern development teams. With its comprehensive feature set, intuitive interface, and extensible architecture, it provides the foundation for efficient project and task management. The documented roadmap ensures continuous improvement and addition of valuable features to meet evolving user needs.

For more information, visit the [GitHub Repository](https://github.com/88bones/Timely).

---

**Document Version**: 1.0  
**Last Updated**: December 2025  
**Author**: TaskMate Development Team  
**Status**: Active Development
