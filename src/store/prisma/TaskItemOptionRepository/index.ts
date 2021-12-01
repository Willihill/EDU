
import { TaskItemOption } from '.prisma/client'

import Repository from '../repository'

export default class TaskItemOptionRepository extends Repository {
  createTaskItemsOption = async (taskItemOptions: TaskItemOption[]) =>
    await this.prisma.taskItemOption.createMany({
      data: taskItemOptions
    })

  deleteNotRange = async (ids: number[], taskItemId: number) =>
    await this.prisma.taskItemOption.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        taskItemId: taskItemId
      }
    })

  pushSetRange = async (taskItemOptions: TaskItemOption[]) =>
    await Promise.all(
      taskItemOptions.map(({ id, ...taskItemOptions }) => this.prisma.taskItemOption.upsert({
        create: taskItemOptions,
        update: taskItemOptions,
        where: {
          id
        }
      }))
    )
}
