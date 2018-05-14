import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default class Card extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  render () {
    const { className, title, children } = this.props
    return (
      <div className={cx('card', className)}>
        <div className='card-content'>
          <span className='card-title'>{title}</span>
          <p>
            {children}
          </p>
        </div>
      </div>
    )
  }
}
