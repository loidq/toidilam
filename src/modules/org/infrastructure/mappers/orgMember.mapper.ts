import { Prisma, OrganizationMember as PrismaOrgMember } from '@prisma/client'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'

import { OrgRole } from '../../domain/entities/org.entity'
export class OrgMemberMapper {
  static toDomain(prismaOrgMember: PrismaOrgMember): OrgMemberEntity {
    return new OrgMemberEntity({
      id: prismaOrgMember.id,
      organizationId: prismaOrgMember.organizationId,
      userId: prismaOrgMember.userId,
      status: prismaOrgMember.status as InvitationStatus,
      role: prismaOrgMember.role as OrgRole,
      createdBy: prismaOrgMember.createdBy,
      updatedBy: prismaOrgMember.updatedBy ?? undefined,
      createdAt: prismaOrgMember.createdAt,
      updatedAt: prismaOrgMember.updatedAt ?? undefined,
    })
  }

  static toPrismaCreate(orgMember: OrgMemberEntity): Prisma.OrganizationMemberCreateInput {
    return {
      id: orgMember.id,
      user: {
        connect: { id: orgMember.userId },
      },
      organization: {
        connect: { id: orgMember.organizationId },
      },
      status: orgMember.status,
      role: orgMember.role,
      createdBy: orgMember.createdBy,
      updatedBy: orgMember.updatedBy,
      createdAt: orgMember.createdAt,
      updatedAt: orgMember.updatedAt,
    }
  }
  static toPrismaUpdate(org: OrgMemberEntity): Prisma.OrganizationMemberUpdateInput {
    const updateData: Prisma.OrganizationMemberUpdateInput = {
      status: org.status,
      role: org.role,
      updatedBy: org.updatedBy,
    }

    // Remove undefined properties
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof Prisma.OrganizationMemberUpdateInput] === undefined) {
        delete updateData[key as keyof Prisma.OrganizationMemberUpdateInput]
      }
    })

    return updateData
  }
}
