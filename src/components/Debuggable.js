/* eslint-disable no-unreachable */

function Debuggable (
  WrappedComponent,
  options = { willMount: true, render: true }
) {
  // return WrappedComponent
  const name = WrappedComponent.name
  const { willMount, render: trackRender, didUpdate } = Object.assign(
    {},
    { willMount: true, render: true, didUpdate: true },
    options
  )
  const newComponent = class Debuggable extends WrappedComponent {
    componentWillMount () {
      if (super.componentWillMount) {
        super.componentWillMount()
      }
      if (willMount) {
        window.incrementCount(name, 'componentWillMount')
      }
    }

    componentDidUpdate () {
      if (super.componentDidUpdate) {
        super.componentDidUpdate()
      }
      if (didUpdate) {
        window.incrementCount(name, 'componentDidUpdate')
      }
    }

    render () {
      if (trackRender) {
        window.incrementCount(name, 'render')
      }
      // Wraps the input component in a container, without mutating it. Good!
      // return <WrappedComponent {...this.props} />
      return super.render()
    }
  }
  newComponent.displayName =
    (WrappedComponent.displayName || WrappedComponent.name) + '(d)'
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
