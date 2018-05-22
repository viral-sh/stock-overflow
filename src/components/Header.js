import React, { Component } from 'react'

import Debuggable from './Debuggable'

class Header extends Component {

  handleLogoClick () {
    toggleRotatingLogo()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <header className='App-header navbar-fixed lighten-2'>
        <nav>
          <div className='brand-logo' onClick={this.handleLogoClick}>
            <img src='/logo-sm.png' className='App-logo' alt='logo' />
            <span className='App-title green-text text-darken-2  hide-on-small-only'>
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

// For testing React 16 Fiber performance.
let spinEnabled = false
function toggleRotatingLogo () {
  spinEnabled = !spinEnabled

  const boxEl = document.getElementsByClassName('App-logo')[0]
  const start = window.performance.now()
  function rotateBox () {
    if (!spinEnabled) return
    const elapsed = window.performance.now() - start
    const rotation = elapsed / 3 % 360
    boxEl.style.transform = `rotate(${rotation}deg)`
    window.requestAnimationFrame(rotateBox)
  }
  window.requestAnimationFrame(rotateBox)
}
