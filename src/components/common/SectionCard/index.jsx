import React from 'react'
import PaintApprovalsCard from '../card/PaintApprovalsCard'
import styles from './style.module.css'

const SectionCard = ({ data = [] }) => {
  if (!data.length) return null

  return (
    <div className={styles.timeline}>
      <span className={`${styles.endpoint} ${styles.endpointTop}`} aria-hidden="true" />

      {Array.isArray(data) && data?.map((item, index) => {
        const isLeft = index % 2 === 0
        return (
          <div
            key={`${item?.title ?? 'section-card'}-${index}`}
            className={`${styles.row} ${isLeft ? styles.left : styles.right}`}
          >
            <div className={`${styles.side} ${isLeft ? styles.hasCard : styles.empty}`}>
              {isLeft ? (
                <div className={styles.cardShell}>
                  <PaintApprovalsCard data={item} isLeft={isLeft}/>
                </div>
              ) : null}
            </div>

            <div className={styles.center} aria-hidden="true">
              <span className={styles.node}>
                <span className={styles.nodeCore} />
              </span>
            </div>

            <div className={`${styles.side} ${!isLeft ? styles.hasCard : styles.empty}`}>
              {!isLeft ? (
                <div className={styles.cardShell}>
                  <PaintApprovalsCard data={item} />
                </div>
              ) : null}
            </div>
          </div>
        )
      })}

      <span className={`${styles.endpoint} ${styles.endpointBottom}`} aria-hidden="true" />
    </div>
  )
}

export default SectionCard
