import classNames from 'classnames'

import './index.scss'

const TwoLineOverview = ({ pay, income }) => {
  return (
    <div className={classNames('twoLineOverview')}>
      <div className="item">
        <span className="money">{Math.abs(pay).toFixed(2)}</span>
        <span className="type">expand</span>
      </div>
      <div className="item">
        <span className="money">{income.toFixed(2)}</span>
        <span className="type">income</span>
      </div>
      <div className="item">
        <span className="money">{(income + pay).toFixed(2)}</span>
        <span className="type">balance</span>
      </div>
    </div>
  )
}

export default TwoLineOverview
