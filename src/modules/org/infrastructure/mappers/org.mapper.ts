import {
  Prisma,
  Organization as PrismaOrg,
  OrganizationMember as PrismaOrgMember,
} from '@prisma/client'

import { OrgEntity, OrgRole } from '@/modules/org/domain/entities/org.entity'

import { InvitationStatus, OrgMemberEntity } from '../../domain/entities/orgMember.entity'

type PrismaOrgWithMembers = PrismaOrg & {
  organizationMembers: PrismaOrgMember[]
}

export class OrgMapper {
  static toDomain(prismaOrg: PrismaOrgWithMembers): OrgEntity {
    return new OrgEntity({
      id: prismaOrg.id,
      name: prismaOrg.name,
      slug: prismaOrg.slug,
      desc: prismaOrg.desc ?? undefined,
      cover: prismaOrg.cover ?? undefined,
      avatar: prismaOrg.avatar ?? undefined,
      maxStorageSize: prismaOrg.maxStorageSize ?? undefined,
      createdBy: prismaOrg.createdBy,
      updatedBy: prismaOrg.updatedBy ?? undefined,
      createdAt: prismaOrg.createdAt,
      updatedAt: prismaOrg.updatedAt ?? undefined,
      organizationMembers:
        prismaOrg.organizationMembers?.map(
          member =>
            new OrgMemberEntity({
              id: member.id,
              organizationId: member.organizationId,
              userId: member.userId,
              status: member.status as InvitationStatus,
              role: member.role as OrgRole,
              createdBy: member.createdBy,
              updatedBy: member.updatedBy ?? undefined,
              createdAt: member.createdAt,
              updatedAt: member.updatedAt ?? undefined,
            }),
        ) ?? [],
    })
  }

  static toPrismaCreate(org: OrgEntity): Prisma.OrganizationCreateInput {
    return {
      name: org.name,
      slug: org.slug,
      desc: org.desc,
      cover: org.cover,
      avatar: org.avatar,
      maxStorageSize: org.maxStorageSize,
      createdBy: org.createdBy,
      organizationMembers:
        org.organizationMembers.length > 0
          ? {
              create: org.organizationMembers.map(member => ({
                user: {
                  connect: { id: member.userId },
                },
                status: member.status,
                role: member.role,
                createdBy: member.createdBy,
              })),
            }
          : undefined,
    }
  }
  static toPrismaUpdate(org: OrgEntity): Prisma.OrganizationUpdateInput {
    const updateData: Prisma.OrganizationUpdateInput = {
      name: org.name,
      slug: org.slug,
      desc: org.desc,
      cover: org.cover,
      avatar: org.avatar,
      maxStorageSize: org.maxStorageSize,
      updatedBy: org.updatedBy,
    }

    // Remove undefined properties
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof Prisma.OrganizationUpdateInput] === undefined) {
        delete updateData[key as keyof Prisma.OrganizationUpdateInput]
      }
    })

    return updateData
  }
}
