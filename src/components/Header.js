import React, { Component } from 'react'

import Debuggable from './Debuggable'

class Header extends Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <header className='App-header navbar-fixed lighten-2'>
        <nav>
          <div className='brand-logo'>
            <img src='/logo-sm.png' className='App-logo' alt='logo' />
            <span className='App-title green-text text-darken-2'>
              Stock Overflow
            </span>
          </div>
          <div className='user-info valign-wrapper'>
            <span className='user-name blue-grey-text text-darken-2 hide-on-small-only'>
              Hello Mr. Stark
            </span>
            <img src='/avatar.png' alt='' className='circle hoverable' />
          </div>
        </nav>
      </header>
    )
  }
}
export default Debuggable(Header)
