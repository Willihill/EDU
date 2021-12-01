import { IoIosCopy } from 'react-icons/io'

import styles from 'styles/components/Widget/TextCopy/index.module.scss'

import { writeClipboard } from 'utils/common'

import { TextCopyProps } from './types'

const TextCopy = ({
  text
}: TextCopyProps) => (
  <div
    className={styles.container}
    title='Clique para copiar'
    onClick={async () => await writeClipboard(text)}
  >
    <span>{text}</span>
    <IoIosCopy className={styles.icon} />
  </div>
)

export default TextCopy
