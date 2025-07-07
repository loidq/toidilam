# Organization Authorization Implementation

This document explains the implementation of role-based authorization for the Organization module.

## Overview

The organization authorization system implements hierarchical role-based access control (RBAC) with three levels:

- **ADMIN**: Full access to organization management
- **MANAGER**: Limited management access
- **MEMBER**: Basic access only

### Role Hierarchy

```text
ADMIN (Level 3) > MANAGER (Level 2) > MEMBER (Level 1)
```

Higher roles inherit permissions from lower roles.

## Components

### 1. OrganizationRoleGuard

A NestJS guard that:

- Validates user membership in the organization
- Checks if the user has required role permissions
- Injects `orgMember` into the request for later use

**Usage:**

```typescript
@UseGuards(JwtAuthGuard, OrganizationRoleGuard)
@OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER)
async updateOrg() {
  // Only admins and managers can access
}
```

### 2. @OrgRoles Decorator

Specifies required roles for accessing an endpoint.

**Examples:**

```typescript
@OrgRoles(OrgRole.ADMIN)                    // Only admins
@OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER)   // Admins and managers
@OrgRoles(OrgRole.MEMBER)                   // All members (admins, managers, members)
```

### 3. @OrgMember Decorator

Extracts the current user's organization membership from the request.

**Usage:**

```typescript
async updateOrg(
  @Param('orgId') orgId: string,
  @OrgMember() orgMember: OrgMemberEntity,
  @Body() updateDto: UpdateOrgDto
) {
  // orgMember contains user's role and membership info
  console.log('User role:', orgMember.role)
  console.log('User ID:', orgMember.userId)
}
```

## Implementation Examples

### Protected Endpoints

```typescript
@Controller('orgs')
@UseGuards(JwtAuthGuard)
export class OrgController {
  // Only organization admins can update organization settings
  @Put(':orgId')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN)
  async updateOrg(
    @Param('orgId') orgId: string,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() updateDto: UpdateOrgDto,
  ) {
    // Implementation
  }

  // Admins and managers can invite members
  @Post(':orgId/members/invite')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER)
  async inviteMember(
    @Param('orgId') orgId: string,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() inviteDto: InviteMemberDto,
  ) {
    // Implementation
  }

  // All members can view organization details
  @Get(':orgId')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.MEMBER)
  async getOrg(@Param('orgId') orgId: string, @OrgMember() orgMember: OrgMemberEntity) {
    // Implementation
  }
}
```

## URL Parameter Requirements

The guard expects organization ID in URL parameters as:

- `orgId` (preferred)
- `organizationId` (alternative)

**Supported URL patterns:**

- `/orgs/:orgId/members`
- `/organizations/:organizationId/projects`

## Error Handling

The system throws appropriate HTTP exceptions:

- `401 Unauthorized`: User not authenticated
- `403 Forbidden`: Insufficient permissions or not a member
- `404 Not Found`: Organization or membership not found

## Integration with Command Handlers

The authorization logic can also be implemented in command handlers for business logic validation:

```typescript
@CommandHandler(UpdateOrgCommand)
export class UpdateOrgHandler {
  async execute(command: UpdateOrgCommand) {
    // Additional business logic validation
    const orgMember = await this.orgMemberRepository.findOne({
      where: { organizationId: command.orgId, userId: command.userId },
    })

    if (orgMember.role !== OrgRole.ADMIN) {
      throw new ForbiddenException('Only admins can update organization settings')
    }

    // Continue with update logic
  }
}
```

## Best Practices

1. **Always use JwtAuthGuard first** to ensure user authentication
2. **Apply OrganizationRoleGuard after JwtAuthGuard** for role checking
3. **Use specific role requirements** instead of checking manually in controllers
4. **Implement fallback checks in handlers** for critical operations
5. **Document role requirements** in API documentation

## Testing

Example test for role-based access:

```typescript
describe('Organization Authorization', () => {
  it('should allow admin to update organization', async () => {
    // Mock admin user
    const adminMember = createMockOrgMember(OrgRole.ADMIN)

    const result = await request(app)
      .put('/orgs/123')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updateDto)
      .expect(200)
  })

  it('should deny member from updating organization', async () => {
    // Mock member user
    const memberUser = createMockOrgMember(OrgRole.MEMBER)

    await request(app)
      .put('/orgs/123')
      .set('Authorization', `Bearer ${memberToken}`)
      .send(updateDto)
      .expect(403)
  })
})
```
