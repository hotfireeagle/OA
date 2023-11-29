import { NextNode } from "../../atom"
import styles from "../index.less"

export const BeginNode = props => {
  return (
    <div className={styles.nodeContainer}>
      <div className={`${styles.nodeHeader} ${styles.beginNodeHeader}`}>
        <span>发起人</span>
      </div>
      <dic className={styles.nodeBody}>
        所有人
      </dic>
      <NextNode {...props} />
    </div>
  )
}