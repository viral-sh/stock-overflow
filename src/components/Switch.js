import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Debuggable from './Debuggable'

class Switch extends Component {
  render () {
    const { label, checked, onChange } = this.props
    return (
      <div className='switch'>
        <label>
          <span>{label}</span>
          <input type='checkbox' checked={checked} onChange={onChange} />
          <span className='lever' />
        </label>
      </div>
    )
  }
}

Switch.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default Debuggable(Switch)
