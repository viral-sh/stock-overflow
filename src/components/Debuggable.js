/* eslint-disable no-unreachable */

function Debuggable (WrappedComponent, options = {}) {
  // return WrappedComponent
  const key = WrappedComponent.name
  const optionDefaults = { didMount: true, render: true, didUpdate: true, willUnmount: true }
  const incrementCount = window.incrementCount
  const { didMount, render: trackRender, didUpdate, willUnmount } = Object.assign(
    {},
    optionDefaults,
    options
  )
  const newComponent = class Debuggable extends WrappedComponent {
    componentDidMount () {
      if (super.componentWillMount) {
        super.componentWillMount(arguments)
      }
      if (didMount) {
        incrementCount(key, 'componentDidMount')
      }
    }

    componentDidUpdate () {
      if (super.componentDidUpdate) {
        super.componentDidUpdate(arguments)
      }
      if (didUpdate) {
        incrementCount(key, 'componentDidUpdate')
      }
    }

    componentWillUnmount () {
      if (super.componentWillUnmount) {
        super.componentWillUnmount(arguments)
      }
      if (willUnmount) {
        incrementCount(key, 'componentWillUnmount')
      }
    }

    render () {
      if (trackRender) {
        incrementCount(key, 'render')
      }
      return super.render()
    }
  }
  newComponent.displayName = `${WrappedComponent.displayName || WrappedComponent.name} (D)`
  return newComponent
}

export default Debuggable

export const debugStart = () => {
  window.renderStart = Date.now()
  window.renderTime = null
  window.resetDebugCounts()
}
export const debugEnd = () => {
  window.renderTime = Date.now() - window.renderStart
  window.dd()
}

// TODO: move this to local variables and create a new library for this

window.debugCounts = {}

window.incrementCount = (key, event) => {
  if (!window.debugCounts[key]) window.debugCounts[key] = {}
  window.debugCounts[key][event] = (window.debugCounts[key][event] || 0) + 1
}

window.resetDebugCounts = () => {
  window.debugCounts = {}
}

window.dd = () => {
  console.table(window.debugCounts)
  console.log('Total Render time:', window.renderTime)
}
