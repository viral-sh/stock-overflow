import React from 'react'
import PropTypes from 'prop-types'
import { numberWithCommas, roundUp } from '../utils'

const Currency = ({ className, value }) => {
  if (isNaN(value)) {
    value = 0
  }
  return (
    <span className={`currency ${className}`}>
      {numberWithCommas(roundUp(value))}
    </span>
  )
}

Currency.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Currency
