import { NextNode } from "../../atom"
import styles from "../index.less"

// case应该建模在switchNode的schema里面还是怎么样好？

export const SwitchNode = props => {
  return (
    <div className={styles.nodeWrapper}>
      <div className={styles.addConditionCls}>
        添加条件

        {/* <div className={`${styles.nodeHeader} ${styles.beginNodeHeader}`}>
          <span>发起人</span>
        </div>
        <div className={styles.nodeBody}>
          所有人
        </div> */}
      </div>
      <NextNode {...props} />
    </div>
  )
}