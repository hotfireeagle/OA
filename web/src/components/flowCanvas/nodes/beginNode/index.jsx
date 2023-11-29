import { NextNode } from "../../atom"
import styles from "../index.less"

export const BeginNode = props => {
  return (
    <div className={styles.nodeWrapper}>
      <div className={styles.nodeContainer}>
        <div className={`${styles.nodeHeader} ${styles.beginNodeHeader}`}>
          <span>发起人</span>
        </div>
        <div className={styles.nodeBody}>
          所有人
        </div>
      </div>
      <NextNode {...props} />
    </div>
  )
}