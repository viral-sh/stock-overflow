import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { numberWithCommas, roundUp } from '../utils'

const Currency = ({ className, children, value }) => {
  value = value || children
  if (isNaN(value)) {
    value = 0
  }
  return (
    <span className={cx('currency', className)}>
      {numberWithCommas(roundUp(value))}
    </span>
  )
}

Currency.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Currency
