
import { TaskItem } from '.prisma/client'

import Repository from '../repository'

export default class TaskItemRepository extends Repository {
  createTaskItems = async (taskItems: TaskItem[]) =>
    await this.prisma.taskItem.createMany({
      data: taskItems
    })

  deleteNotRange = async (ids: number[], taskId: number) =>
    await this.prisma.taskItem.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        taskId: taskId
      }
    })

  pushSet = async ({ id, ...taskItem }: TaskItem) =>
    await this.prisma.taskItem.upsert({
      create: taskItem,
      update: taskItem,
      where: {
        id
      }
    })

  pushSetRange = async (taskItems: TaskItem[]) =>
    await Promise.all(
      taskItems.map(({ id, ...taskItem }) => this.prisma.taskItem.upsert({
        create: taskItem,
        update: taskItem,
        where: {
          id
        }
      }))
    )
}
