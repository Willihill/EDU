import { TaskItemResponse } from '.prisma/client'

import Repository from '../repository'

export default class TaskItemResponseRepository extends Repository {
  pushResponse = async ({ id, ...taskItemResponse }: TaskItemResponse) =>
    await this.prisma.taskItemResponse.create({
      data: taskItemResponse
    })

  findCountByTask = async (taskId: number) =>
    await this.prisma.taskItemResponse.count({
      where: {
        taskItem: {
          taskId
        }
      }
    })

  findUserResponseByTask = async (userId: number, taskId: number) =>
    await this.prisma.taskItemResponse.count({
      where: {
        student: {
          userId
        },
        taskItem: {
          taskId
        }
      }
    })
}
