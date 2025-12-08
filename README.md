# TaskMate - Project Management Application

TaskMate is a full-stack web application designed to streamline project and task management. It enables teams to collaborate efficiently by tracking tasks, managing projects, and monitoring team activities in real-time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

### Core Functionality

- **Project Management**: Create, update, and delete projects with detailed descriptions and timelines
- **Task Management**: Assign tasks to team members with priority levels and due dates
- **Kanban Board**: Visualize task progress with an interactive drag-and-drop Kanban board
- **Activity Timeline**: Track all project activities and changes in real-time
- **Task Assignments**: Assign tasks to multiple team members
- **Attachments**: Upload and manage task attachments
- **Notifications**: Real-time notifications for task updates and assignments
- **User Roles**: Admin and regular user roles with different permissions
- **Team Management**: Create teams and manage team members

### Advanced Features

- **Admin Dashboard**: Comprehensive analytics and project overview
- **Search & Filter**: Search and filter tasks by various criteria
- **User Profiles**: Manage user information and department assignments
- **Activity Logs**: Detailed logs of all project activities
- **Responsive Design**: Fully responsive UI for desktop and mobile devices

## Tech Stack

### Frontend

- **React** - UI library
- **Redux** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling

## Project Structure

```
TaskMate/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API services
│   │   ├── redux/                  # Redux store configuration
│   │   ├── lib/                    # Utility functions
│   │   ├── assets/                 # Static assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                          # Backend application
│   ├── controllers/                # Route controllers
│   ├── models/                     # Database models
│   ├── routes/                     # API routes
│   ├── middleware/                 # Express middleware
│   ├── utils/                      # Utility functions
│   ├── uploads/                    # Uploaded files
│   ├── index.js
│   └── package.json
│
└── README.md                        # This file
```

## Prerequisites

Before installing TaskMate, ensure you have the following installed on your system:

- **Node.js** (v14.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/88bones/Timely.git
cd TaskMate
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

### 3. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

## Configuration

### Backend Configuration

1. Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskmate

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads/
```

2. Ensure MongoDB is running:

```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run MongoDB directly
mongod
```

### Frontend Configuration

1. Create a `.env.local` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3001
```

2. Update API endpoints in `client/src/services/` files if needed.

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:3001`

### Start the Frontend Application

In a new terminal:

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Creating an Account

1. Navigate to the Sign Up page
2. Enter your details (First Name, Last Name, Email, Password)
3. Select your department (UI/UX, Frontend, Backend, QA, Owner)
4. Click Sign Up

### Creating a Project

1. Go to Dashboard
2. Click "Create Project"
3. Fill in project details (Title, Description, Start Date, End Date)
4. Add team members
5. Click Create

### Creating a Task

1. Navigate to a Project
2. Click "Create Task"
3. Enter task details (Title, Description, Priority, Due Date)
4. Assign to team member(s)
5. Add attachments if needed
6. Click Create

### Managing Tasks

- **Kanban Board**: Drag and drop tasks between status columns (New, To Do, In Progress, Review, Done)
- **View Attachments**: Click "View" button to see task attachments
- **Update Task**: Edit task details and status
- **Delete Task**: Remove tasks as needed

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Projects

- `GET /api/project/get-all-projects` - Get all projects
- `POST /api/project/create-project` - Create new project
- `PUT /api/project/update-project/:id` - Update project
- `DELETE /api/project/delete-project/:id` - Delete project

### Tasks

- `GET /api/task/get-all-tasks` - Get all tasks
- `POST /api/task/create-task` - Create new task
- `PUT /api/task/update-task/:id` - Update task
- `DELETE /api/task/delete-task/:id` - Delete task
- `GET /api/task/assigned-task/:userId` - Get assigned tasks

### Users

- `GET /api/user/get-user` - Get all users
- `GET /api/user/get-user/:userId` - Get specific user
- `PUT /api/user/update-user/:userId` - Update user profile

### Notifications

- `GET /api/notification/get-notification/:userId` - Get notifications
- `PUT /api/notification/update-notification-status/:userId` - Mark as read

## Troubleshooting

### Port Already in Use

If port 3001 or 5173 is already in use, you can change them:

**Backend**: Update `PORT` in `.env`
**Frontend**: Update vite config in `vite.config.js`

### MongoDB Connection Error

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is installed correctly

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### CORS Issues

Ensure backend is running and CORS is properly configured in Express.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@taskmate.com or open an issue on GitHub.

## Authors

- **88bones** - Project Lead and Developer

## Acknowledgments

- React community for excellent documentation
- MongoDB for reliable database
- Tailwind CSS for utility-first CSS framework
- All contributors and users of TaskMate

---

**Last Updated**: December 2025

For more information and updates, visit the [GitHub Repository](https://github.com/88bones/Timely)
