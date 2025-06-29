# 🧠 NestJS Naming Conventions

> Naming conventions and best practices for **NestJS** projects to ensure consistency, scalability, and team collaboration.

---

## 📁 1. File Naming Conventions

| File Type        | Naming Convention  | Example                    |
| ---------------- | ------------------ | -------------------------- |
| Module           | `*.module.ts`      | `user.module.ts`           |
| Controller       | `*.controller.ts`  | `auth.controller.ts`       |
| Service          | `*.service.ts`     | `user.service.ts`          |
| DTO              | `*.dto.ts`         | `create-user.dto.ts`       |
| Entity           | `*.entity.ts`      | `user.entity.ts`           |
| Interface        | `*.interface.ts`   | `user.interface.ts`        |
| Guard            | `*.guard.ts`       | `roles.guard.ts`           |
| Middleware       | `*.middleware.ts`  | `logger.middleware.ts`     |
| Pipe             | `*.pipe.ts`        | `validation.pipe.ts`       |
| Exception Filter | `*.filter.ts`      | `http-exception.filter.ts` |
| Interceptor      | `*.interceptor.ts` | `logging.interceptor.ts`   |
| Decorator        | `*.decorator.ts`   | `roles.decorator.ts`       |
| Repository       | `*.repository.ts`  | `user.repository.ts`       |

> ✅ Use **kebab-case** (lowercase with dashes) for filenames. Avoid camelCase or PascalCase.

---

## 🧱 2. Class, Interface, and Enum Naming

| Type      | Convention                       | Example                             |
| --------- | -------------------------------- | ----------------------------------- |
| Class     | PascalCase                       | `UserService`, `AuthController`     |
| DTO       | PascalCase with `Dto` suffix     | `CreateUserDto`, `UpdateProfileDto` |
| Enum      | PascalCase                       | `UserRole`, `StatusCode`            |
| Interface | PascalCase (optional `I` prefix) | `User`, `IUser`                     |

> 🔖 Use `I` prefix for interfaces if needed to distinguish from classes (e.g., `IUser` vs `UserEntity`).

---

## 🔧 3. Function & Method Naming

### ✅ General Rules

| Rule                    | Description                          | Example                                                 |
| ----------------------- | ------------------------------------ | ------------------------------------------------------- |
| Use **camelCase**       | For all functions and methods        | `getUserById()`                                         |
| Be **descriptive**      | Clearly state what the function does | `validateEmailFormat()`                                 |
| Prefix with **verbs**   | Action-oriented names                | `createUser()`, `fetchTasks()`                          |
| Optional `Async` suffix | Clarify async functions when useful  | `fetchDataAsync()`                                      |
| Avoid redundancy        | Keep names concise                   | ✅ `updatePassword()` ⛔ `updateUserPasswordFunction()` |

### 📁 Common Prefixes

| Prefix       | Meaning / Use Case                 | Example                      |
| ------------ | ---------------------------------- | ---------------------------- |
| `get`        | Fetching data                      | `getUserById()`              |
| `create`     | Creating a new resource            | `createTask()`               |
| `update`     | Updating existing data             | `updateProfile()`            |
| `delete`     | Deleting a resource                | `deleteComment()`            |
| `find`       | Filtering/querying                 | `findUsersByRole()`          |
| `validate`   | Validating data/conditions         | `validateToken()`            |
| `send`       | Sending emails/messages            | `sendResetPasswordEmail()`   |
| `generate`   | Creating tokens or computed values | `generateJWT()`              |
| `handle`     | Handling events/exceptions         | `handleLoginAttempt()`       |
| `map`        | Mapping or transforming data       | `mapToUserDto()`             |
| `is/has/can` | Boolean checker functions          | `isAdmin()`, `canEditTask()` |

### 🧱 Layer-Specific Function Naming

| Layer      | Role                 | Function Naming Example |
| ---------- | -------------------- | ----------------------- |
| Controller | Handle HTTP requests | `getAllUsers(req, res)` |
| Service    | Business logic       | `createUser(dto)`       |
| Repository | Database access      | `findByEmail(email)`    |
| Guard      | Access control       | `canActivate()`         |
| Pipe       | Data validation      | `transform(value)`      |
| Middleware | Request manipulation | `use(req, res, next)`   |

### 🚫 Anti-patterns

| Bad Example        | Issue                      | Better Name             |
| ------------------ | -------------------------- | ----------------------- |
| `doSomething()`    | Too vague                  | `createUser()`          |
| `handle()`         | No context                 | `handleSignupRequest()` |
| `getData()`        | Unclear data being fetched | `getProjectById()`      |
| `updateDataToDb()` | Overly detailed, verbose   | `updateTask()`          |
| `check()`          | Lacks purpose              | `checkPermission()`     |

---

## 🧮 4. Variable Naming

| Type      | Convention                                 | Example                   |
| --------- | ------------------------------------------ | ------------------------- |
| Variables | camelCase                                  | `userId`, `accessToken`   |
| Constants | UPPER_SNAKE_CASE                           | `JWT_SECRET`, `MAX_USERS` |
| Booleans  | camelCase with prefix (`is`, `has`, `can`) | `isAdmin`, `hasRole`      |

---

## 📦 5. Suggested Folder Structure

```
src/

```

---

## ✅ 6. Best Practices

- Always suffix DTOs with `Dto`.
- Prefix interfaces with `I` only when necessary.
- Use enums for defined sets of values (e.g., `UserRole`).
- Keep `main.ts` and `app.module.ts` in the root of `src/`.
- Avoid mixing multiple concerns in one file (e.g., controller + service).

---

> Following these naming and design conventions helps create clean, scalable, and maintainable codebases across teams.
