import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BarChart from '../components/BarChart'
import Switch from './Switch'
// import Debuggable from './Debuggable'
import Debuggable, { debugStart, debugEnd } from './Debuggable'

class StocksPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myStocksFilter: true
    }
  }

  componentDidUpdate () {
    // debugEnd()
  }

  toggleMyStocksFilter = () => {
    // debugStart()
    this.setState({
      myStocksFilter: !this.state.myStocksFilter
    })
  }

  getStocksData = () => {
    const { myStocksFilter } = this.state
    const { data } = this.props
    if (myStocksFilter) {
      return data.filter(stockData => stockData[3].owned)
    } else {
      return data
    }
  }

  render () {
    const { myStocksFilter } = this.state
    const { isLivestreamOn, onToggleLiveStream } = this.props
    const data = this.getStocksData()
    return (
      <div className='stock-component'>
        <div className='stock-view-action'>
          <div className='right'>
            <Switch
              label='Live updates'
              checked={isLivestreamOn}
              onChange={onToggleLiveStream}
            />
          </div>
          <div className='left'>
            <label>
              <input
                className='with-gap'
                name='group1'
                type='radio'
                checked={myStocksFilter}
                onChange={this.toggleMyStocksFilter}
              />
              <span>My Stocks</span>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              <input
                className='with-gap'
                name='group1'
                type='radio'
                checked={!myStocksFilter}
                onChange={this.toggleMyStocksFilter}
              />
              <span>All Stocks</span>
            </label>

          </div>
        </div>
        <div className='divider' />
        <BarChart data={data} />
      </div>
    )
  }
}

StocksPage.propTypes = {
  data: PropTypes.array,
  isLivestreamOn: PropTypes.bool,
  onToggleLiveStream: PropTypes.func
}

export default Debuggable(StocksPage)

// Set state using new experimental Suspense API
// ReactDOM.unstable_deferredUpdates(() => {
//   this.setState({
//     myStocksFilter: !this.state.myStocksFilter
//   })
// })
