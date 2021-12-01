import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { MdPendingActions, MdDangerous } from 'react-icons/md'

import styles from 'styles/components/Widget/TaskStatus/index.module.scss'

import { dateClone } from 'utils/helpers/Date'

import { TaskStatusProps } from './types'

const TaskStatus = ({
  isDone,
  deadline
}: TaskStatusProps) => {
  if (isDone) return <IoCheckmarkDoneCircle className={styles.iconGreen} title='Atividade entregue' />
  if (!isDone && dateClone(deadline) > new Date()) return <MdPendingActions className={styles.iconGray} title='Atividade pendente' />
  if (!isDone && dateClone(deadline) < new Date()) return <MdDangerous className={styles.iconRed} title='Atividade atrasada' />

  return null
}

export default TaskStatus
