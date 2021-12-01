
import { TaskItemImage } from '.prisma/client'

import Repository from '../repository'

export default class TaskItemImageRepository extends Repository {
  createTaskTaskItemImage = async (taskItemImage: TaskItemImage[]) =>
    await this.prisma.taskItemImage.createMany({
      data: taskItemImage
    })

  deleteNotRange = async (ids: number[], taskItemId: number) =>
    await this.prisma.taskItemImage.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        taskItemId: taskItemId
      }
    })

  pushSetRange = async (taskItemImages: TaskItemImage[]) =>
    await Promise.all(
      taskItemImages.map(({ id, ...taskItemImage }) => this.prisma.taskItemImage.upsert({
        create: taskItemImage,
        update: taskItemImage,
        where: {
          id
        }
      }))
    )
}
