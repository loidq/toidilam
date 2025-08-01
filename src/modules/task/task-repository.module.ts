import { Module } from '@nestjs/common'

import {
  CommentPrismaRepository,
  TaskAssigneePrismaRepository,
  TaskAutomationPrismaRepository,
  TaskChecklistPrismaRepository,
  TaskPointPrismaRepository,
  TaskPrismaRepository,
  TaskStatusPrismaRepository,
  TaskTagPrismaRepository,
  TimerPrismaRepository,
} from './infrastructure/repositories'

@Module({
  providers: [
    TaskAssigneePrismaRepository,
    TaskPointPrismaRepository,
    TaskPrismaRepository,
    TaskStatusPrismaRepository,
    TaskTagPrismaRepository,
    CommentPrismaRepository,
    TimerPrismaRepository,
    TaskAutomationPrismaRepository,
    TaskChecklistPrismaRepository,
  ],
  exports: [
    TaskAssigneePrismaRepository,
    TaskPointPrismaRepository,
    TaskPrismaRepository,
    TaskStatusPrismaRepository,
    TaskTagPrismaRepository,
    CommentPrismaRepository,
    TimerPrismaRepository,
    TaskAutomationPrismaRepository,
    TaskChecklistPrismaRepository,
  ],
})
export class TaskRepositoryModule {}
