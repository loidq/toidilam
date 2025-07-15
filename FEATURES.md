# ToiDiLam - Feature Documentation

## 📋 Overview

ToiDiLam is a comprehensive work and team performance management system built with NestJS. This document outlines all the features available in the system based on the database schema and codebase.

---

## 🔐 Authentication & Authorization

### User Management

- **User Registration & Login** - JWT-based authentication
- **User Profile Management** - Bio, photo, date of birth, country settings
- **User Status Management** - Active/Inactive states
- **Multi-organization Support** - Users can belong to multiple organizations
- **Personal Settings** - Customizable JSON settings per user

### Role-Based Access Control (RBAC)

- **Organization Roles**: Admin, Manager, Member
- **Project Roles**: Guest, Member, Manager, Leader
- **Invitation System**: Invite, Accept, Reject workflow
- **Permission-based Authorization** - Hierarchical role permissions

---

## 🏢 Organization Management

### Organization Features

- **Multi-tenant Architecture** - Complete organization isolation
- **Organization Profiles** - Name, slug, description, cover, avatar
- **Storage Management** - Configurable storage limits per organization
- **Organization Members** - Member invitation and role management
- **Organization Applications** - OAuth2 app management with scopes

### Storage & File Management

- **Multiple Storage Providers**:
  - AWS S3 integration
  - DigitalOcean Spaces support
- **File Organization** - Folder/file structure
- **File Ownership** - User, Task, Discussion, Document ownership
- **File Types** - Support for various MIME types
- **Soft Delete** - File recovery capabilities

---

## 📊 Project Management

### Project Features

- **Project Creation & Management** - Full project lifecycle
- **Project Views** - Multiple view types:
  - List View
  - Board View (Kanban)
  - Calendar View
  - Timeline View
  - Goal View
  - Team View
  - Activity View
  - Dashboard View
  - Grid View
- **Project Archiving** - Archive completed projects
- **Project Members** - Role-based project access
- **Project Customization** - Icons, covers, descriptions

### Project Configuration

- **Custom Fields** - Flexible field types:
  - Number, Text, Date
  - Select, Multi-select
  - Checkbox, URL, Email
  - Files, Phone, Person
  - Timestamps (Created/Updated)
- **Project Settings** - Task counting, notifications
- **Project Statistics** - Performance tracking

---

## 📝 Task Management

### Core Task Features

- **Task Creation & Management** - Full CRUD operations
- **Task Types**:
  - Regular Tasks
  - Bug Reports
  - New Features
  - Improvements
- **Task Hierarchy** - Parent/child task relationships (Subtasks)
- **Task Status Management** - Customizable status workflow
- **Task Priorities** - Urgent, High, Normal, Low

### Task Details

- **Task Descriptions** - Rich text descriptions
- **Due Dates** - Planned and actual dates
- **Task Progress** - Percentage completion tracking
- **Task Points** - Story point estimation
- **Task Order** - Custom ordering within projects
- **Task Cover Images** - Visual task identification

### Task Assignment & Collaboration

- **Multiple Assignees** - Tasks can have multiple assignees
- **Task Comments** - Threaded discussions
- **Task Attachments** - File attachments to tasks
- **Task Tags** - Categorization with colors
- **Task Checklists** - Subtask checklists with completion tracking

### Task Automation

- **Task Automation Rules** - When/Then conditions
- **Scheduled Tasks** - Cron-based task scheduling
- **Task Activities** - Comprehensive audit trail:
  - Task creation/changes
  - Title/description changes
  - Due date changes
  - Assignee changes
  - Status changes
  - Progress updates
  - Priority changes
  - Comment activities
  - Attachment activities

---

## 📈 Analytics & Reporting

### Dashboard System

- **Custom Dashboards** - Per-project dashboards
- **Dashboard Components** - Multiple widget types:
  - Line Charts
  - Summary Widgets
  - Pie Charts
  - List Tabs
  - Lists
  - Column Charts
  - Burndown Charts
  - Burnup Charts
- **Dashboard Customization** - Drag & drop layout

### Statistics & Metrics

- **Project Statistics** - Task completion by day
- **Member Statistics** - Individual performance tracking
- **Activity Tracking** - Comprehensive activity logs
- **Performance Metrics** - Team and individual KPIs

---

## ⏱️ Time Tracking

### Timer System

- **Task Timers** - Start/stop time tracking
- **Duration Calculation** - Automatic time calculation
- **Time Logging** - Historical time records
- **User Time Tracking** - Per-user time analytics

---

## 🎯 Goal & Vision Management

### Vision System

- **Organization Visions** - High-level organizational goals
- **Project Visions** - Project-specific objectives
- **Vision Hierarchy** - Parent/child vision relationships
- **Progress Tracking** - Vision completion percentage
- **Date Management** - Start and due dates for visions

---

## 🔔 Notification System

### Project Notifications

- **Task Change Notifications** - Real-time task updates
- **Reminder System** - Due date reminders
- **Overdue Alerts** - Automatic overdue notifications
- **Custom Notification Settings** - Per-user preferences

---

## ⭐ Favorites & Bookmarks

### Favorite System

- **Favorite Items** - Bookmark important items
- **Custom Icons** - Visual favorite identification
- **Quick Access Links** - Direct navigation to favorites
- **Organization-scoped** - Favorites within organization context

---

## 🔍 Advanced Features

### Search & Filtering

- **Advanced Search** - Search across projects, tasks, comments
- **Filter System** - Multiple filter criteria
- **Sorting Options** - Custom sorting preferences
- **Pagination** - Efficient data loading

### Data Management

- **Soft Delete** - Recovery capabilities for deleted items
- **Audit Trail** - Complete change history
- **Data Export** - Export capabilities for reporting
- **Bulk Operations** - Mass updates and operations

### Integration Features

- **API Documentation** - Swagger/OpenAPI integration
- **Webhook Support** - External system integration
- **OAuth2 Applications** - Third-party app integration
- **Custom Field Support** - Extensible field system

---

## 🛡️ Security Features

### Data Protection

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt password protection
- **Role-based Authorization** - Granular permissions
- **Organization Isolation** - Multi-tenant security

### Audit & Compliance

- **Activity Logging** - Complete audit trail
- **User Access Tracking** - Login/logout monitoring
- **Permission Auditing** - Role change tracking
- **Data Retention** - Configurable retention policies

---

## 🔧 System Administration

### Configuration Management

- **Environment Configuration** - Multiple environment support
- **Database Migrations** - Version-controlled schema changes
- **Storage Configuration** - Multiple storage provider support
- **Performance Monitoring** - System health tracking

### Maintenance Features

- **Data Backup** - Automated backup systems
- **System Health Checks** - Monitoring and alerting
- **Performance Optimization** - Query optimization
- **Error Handling** - Comprehensive error management

---

## 📱 API Features

### RESTful API

- **Complete REST API** - Full CRUD operations
- **API Documentation** - Interactive Swagger docs
- **Authentication** - Bearer token support
- **Rate Limiting** - API usage controls
- **Versioning** - API version management

### Real-time Features

- **Activity Feeds** - Real-time activity updates
- **Live Notifications** - Instant notification delivery
- **Collaborative Editing** - Real-time collaboration features

---

## 🗂️ Data Models & Entities

### Core Entities

- **Users** - User profiles and authentication
- **Organizations** - Multi-tenant organization management
- **Projects** - Project containers with custom configurations
- **Tasks** - Core work items with full lifecycle management
- **Comments** - Discussion threads on tasks
- **Files** - Document and attachment management

### Supporting Entities

- **Tags** - Categorization system
- **Fields** - Custom field definitions
- **Grids** - Grid view configurations
- **Timers** - Time tracking records
- **Activities** - Audit trail and activity feeds
- **Statistics** - Performance and analytics data

---

This comprehensive feature set makes ToiDiLam a powerful Jira clone with enterprise-grade capabilities for team collaboration, project management, and performance tracking.
