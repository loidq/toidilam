# 🚀 ToiDiLam - Work & Team Performance Management System

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
  <strong>A comprehensive work and team performance management system built with NestJS</strong>
</p>

<p align="center">
  <a href="https://github.com/nodejs/node"><img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg" alt="Node.js Version" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%5E5.7.0-blue.svg" alt="TypeScript" /></a>
  <a href="https://nestjs.com/"><img src="https://img.shields.io/badge/nestjs-%5E11.0.0-red.svg" alt="NestJS" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/prisma-%5E6.10.0-2D3748.svg" alt="Prisma" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/postgresql-316192.svg" alt="PostgreSQL" /></a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Development Guidelines](#-development-guidelines)
- [Scripts](#-scripts)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ToiDiLam** is a modern, enterprise-grade work and team performance management system designed to streamline organizational workflows, enhance team collaboration, and boost productivity. Built with cutting-edge technologies and following best practices, it provides a comprehensive solution for managing users, organizations, projects, tasks, and team performance metrics.

### Key Objectives

- **Team Collaboration**: Facilitate seamless communication and collaboration among team members
- **Performance Tracking**: Monitor and analyze team and individual performance metrics
- **Project Management**: Comprehensive project and task management capabilities
- **Organization Management**: Multi-organization support with role-based access control
- **Scalability**: Built to scale with growing teams and organizations

---

## ✨ Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication** with refresh token mechanism
- **Role-based Access Control (RBAC)** with multiple permission levels
- **Secure Password Management** with bcrypt hashing
- **Multi-organization Support** with organization-specific roles

### 👥 User Management

- **User Registration & Profile Management**
- **User Status Management** (Active, Inactive, Banned)
- **Profile Customization** with bio, photo, and personal settings
- **Multi-country Support** with localization

### 🏢 Organization Management

- **Multi-tenant Architecture** supporting multiple organizations
- **Organization Hierarchy** with different member roles
- **Custom Organization Settings** and branding
- **File Storage Integration** with multiple providers (AWS S3, DigitalOcean)

### 📊 Project & Task Management

- **Comprehensive Project Management** with multiple view types
- **Advanced Task Management** with priorities, types, and status tracking
- **Task Assignment & Collaboration** with multiple assignees
- **Progress Tracking** with completion percentages
- **Task Automation** with custom rules and triggers

### 📈 Analytics & Reporting

- **Performance Dashboards** with multiple component types
- **Statistical Analysis** with various metrics
- **Activity Tracking** with comprehensive audit logs
- **Custom Reports** and data visualization

### 🔄 Advanced Features

- **Real-time Activity Feeds** with event tracking
- **File Management System** with organized storage
- **Discussion Threads** for enhanced collaboration
- **Custom Fields** for flexible data management
- **Timer Integration** for time tracking
- **Favorite System** for quick access to important items

---

## 🛠 Tech Stack

### Backend Framework

- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Node.js](https://nodejs.org/)** - JavaScript runtime

### Database & ORM

- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **Database Migrations** - Version-controlled schema changes

### Authentication & Security

- **[JWT](https://jwt.io/)** - JSON Web Tokens for authentication
- **[Passport.js](http://www.passportjs.org/)** - Authentication middleware
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing

### Validation & Documentation

- **[class-validator](https://github.com/typestack/class-validator)** - Decorator-based validation
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation

### Architecture Patterns

- **[CQRS](https://docs.nestjs.com/recipes/cqrs)** - Command Query Responsibility Segregation
- **Domain-Driven Design (DDD)** - Clean architecture principles
- **Repository Pattern** - Data access abstraction

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Jest](https://jestjs.io/)** - Testing framework
- **[pnpm](https://pnpm.io/)** - Package manager

---

## 🏗 Architecture

### Design Patterns

The application follows **Domain-Driven Design (DDD)** principles with **Clean Architecture**, implementing:

- **CQRS Pattern** for separating read and write operations
- **Repository Pattern** for data access abstraction
- **Dependency Injection** for loose coupling
- **Event-Driven Architecture** for system integration

### Layer Structure

```
┌─────────────────────────────────────────┐
│            Presentation Layer           │
│         (Controllers, DTOs)             │
├─────────────────────────────────────────┤
│            Application Layer            │
│    (Commands, Queries, Use Cases)       │
├─────────────────────────────────────────┤
│              Domain Layer               │
│      (Entities, Repositories)           │
├─────────────────────────────────────────┤
│           Infrastructure Layer          │
│  (Database, External Services, etc.)    │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── app.module.ts                   # Root application module
├── main.ts                         # Application entry point
├── common/                         # Common utilities and configurations
├── config/                         # Configuration files
├── infrastructure/                 # Infrastructure layer
│   └── prisma/                     # Database configuration
│       ├── schema.prisma           # Database schema
│       ├── migrations/             # Database migrations
│       ├── base/                   # Base repository implementations
│       └── types/                  # Type definitions
├── modules/                        # Feature modules
│   ├── auth/                       # Authentication module
│   │   ├── application/            # Commands, queries, DTOs
│   │   ├── domain/                 # Entities, repositories, events
│   │   ├── infrastructure/         # External services, strategies
│   │   └── presentation/           # Controllers
│   ├── user/                       # User management module
│   ├── org/                        # Organization management module
│   └── [other-modules]/            # Additional feature modules
└── shared/                         # Shared utilities and services
    ├── common/                     # Common shared components
    └── utils/                      # Utility functions
```

### Module Architecture (Example: User Module)

```
user/
├── user.module.ts                  # Module definition
├── application/                    # Application layer
│   ├── commands/                   # Command handlers
│   ├── queries/                    # Query handlers
│   ├── dtos/                       # Data Transfer Objects
│   └── use-cases/                  # Business use cases
├── domain/                         # Domain layer
│   ├── entities/                   # Domain entities
│   ├── repositories/               # Repository interfaces
│   └── services/                   # Domain services
├── infrastructure/                 # Infrastructure layer
│   ├── repositories/               # Repository implementations
│   └── mappers/                    # Data mappers
└── presentation/                   # Presentation layer
    └── controllers/                # HTTP controllers
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **PostgreSQL** >= 14.0
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd toidilam
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Database setup**

   ```bash
   # Generate Prisma client
   pnpm prisma:generate

   # Run database migrations
   pnpm prisma:migrate

   # (Optional) Seed the database
   pnpm prisma:seed
   ```

5. **Start the application**

   ```bash
   # Development mode
   pnpm start:dev

   # Production mode
   pnpm start:prod
   ```

### Quick Start Commands

```bash
# Development with auto-reload
pnpm start:dev

# Debug mode
pnpm start:debug

# Production build
pnpm build
pnpm start:prod
```

---

## 📚 API Documentation

### Swagger Documentation

Once the application is running, you can access the interactive API documentation:

- **Local Development**: `http://localhost:3000/docs`
- **Swagger UI**: Complete API reference with request/response examples
- **Authentication**: Bearer token authentication support

### Key API Endpoints

| Endpoint              | Method | Description              |
| --------------------- | ------ | ------------------------ |
| `/auth/register`      | POST   | User registration        |
| `/auth/login`         | POST   | User authentication      |
| `/auth/refresh-token` | POST   | Refresh access token     |
| `/user/me`            | GET    | Get current user profile |
| `/org`                | GET    | List organizations       |
| `/projects`           | GET    | List projects            |
| `/tasks`              | GET    | List tasks               |

### Authentication

The API uses **JWT Bearer Token** authentication:

```bash
# Include in request headers
Authorization: Bearer <your-jwt-token>
```

---

## 🗄 Database Schema

### Core Entities

#### Users

- User authentication and profile management
- Status tracking (Active, Inactive, Banned)
- Personal settings and preferences

#### Organizations

- Multi-tenant organization support
- Custom branding and settings
- Member role management

#### Projects

- Project lifecycle management
- Multiple view types (List, Board, Calendar, etc.)
- Team collaboration features

#### Tasks

- Comprehensive task management
- Priority and status tracking
- Assignment and progress monitoring

### Relationships

The database follows a well-structured relational model:

- **Users** can belong to multiple **Organizations** through **OrganizationMember**
- **Organizations** contain multiple **Projects**
- **Projects** contain multiple **Tasks**
- **Users** can be assigned to multiple **Tasks** through **TaskAssignee**
- **Tasks** generate **Activities** for audit tracking
- **Organizations** have **FileStorage** configurations
- **Projects** have **Members** with specific roles
- **Tasks** can have **Attachments**, **Comments**, and **Custom Fields**

---

## 📖 Development Guidelines

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Naming Conventions**: See `docs/NESTJS_NAMING_CONVENTIONS.md`

### Git Workflow

1. **Feature Branches**: Create feature branches from `main`
2. **Commit Messages**: Use conventional commit format
3. **Pull Requests**: Required for all changes
4. **Code Review**: Mandatory peer review process

### Error Handling

- **Standardized Error Responses**: Consistent error format
- **Error Mapping**: See `docs/NESTJS_ERROR-MAPPING.md`
- **Validation**: Comprehensive input validation

---

## 📜 Scripts

### Development Scripts

```bash
# Start development server
pnpm start:dev

# Build application
pnpm build

# Format code
pnpm format

# Lint code
pnpm lint
```

### Database Scripts

```bash
# Generate Prisma client
pnpm prisma:generate

# Create and apply migration
pnpm prisma:migrate

# Reset database
pnpm prisma:migrate:reset

# Push schema changes
pnpm prisma:db:push
```

### Testing Scripts

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run e2e tests
pnpm test:e2e

# Generate test coverage
pnpm test:cov

# Debug tests
pnpm test:debug
```

---

## 🔧 Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/toidilam?schema=public"

# JWT Configuration
JWT_ACCESS_SECRET="your-access-secret"
JWT_ACCESS_EXPIRED="15m"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRED="7d"

# Application
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
```

### Optional Variables

```env
# File Storage
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"

# External Services
REDIS_URL="redis://localhost:6379"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-email-password"
```

---

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component-level testing with Jest
- **Integration Tests**: API endpoint testing
- **E2E Tests**: End-to-end workflow testing
- **Coverage Reports**: Comprehensive test coverage tracking

### Running Tests

```bash
# All tests
pnpm test

# Specific test file
pnpm test user.service.spec.ts

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:cov
```

### Test Structure

```text
test/
├── unit/                   # Unit tests
├── integration/           # Integration tests
├── e2e/                   # End-to-end tests
└── fixtures/              # Test data and mocks
```

---

## 🚀 Deployment

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start:prod
```

### Docker Deployment

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start:prod"]
```

### Environment Setup

1. **Production Database**: Configure PostgreSQL instance
2. **Environment Variables**: Set all required variables
3. **SSL Certificates**: Configure HTTPS if needed
4. **Process Manager**: Use PM2 or similar for process management

---

## 🤝 Contributing

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding guidelines
4. **Run tests**: Ensure all tests pass
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Create Pull Request**: Submit for review

### Development Guidelines

- Follow the established architecture patterns
- Write comprehensive tests for new features
- Update documentation as needed
- Ensure code passes all linting and formatting checks

### Code Review Process

- All changes require peer review
- Automated CI/CD checks must pass
- Documentation updates for significant changes
- Performance impact consideration

---

## 📄 License

This project is licensed under the **UNLICENSED** License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

For questions, issues, or support:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: Check the `docs/` directory for detailed guides

---

---

> Built with ❤️ using NestJS and modern web technologies
