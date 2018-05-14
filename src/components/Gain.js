import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { roundUp } from '../utils'

const Gain = ({ className, value, children, percent = false }) => {
  value = value || children
  if (isNaN(value)) {
    value = 0
  }
  return (
    <span
      className={cx('currency', 'subtext', className, {
        percent,
        gain: value >= 0,
        loss: value < 0
      })}
    >
      {Math.abs(roundUp(value))}
    </span>
  )
}

Gain.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  percent: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Gain
