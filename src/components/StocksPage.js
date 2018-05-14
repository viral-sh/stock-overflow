import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarChart from '../components/BarChart'
import Grid from '../components/Grid'
import Switch from './Switch'
import Debuggable from './Debuggable'

class StocksPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'graph',
      myStocksFilter: true
    }
  }

  selectView = view => {
    this.setState({ view })
  }

  toggleMyStocksFilter = () => {
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
    const { view, myStocksFilter } = this.state
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
          {/* <div className='right' onClick={() => this.selectView('grid')}>
            Grid
          </div>
          <div className='right' onClick={() => this.selectView('graph')}>
            Graph
          </div> */}
        </div>
        <div className='divider' />
        {view === 'grid' ? <Grid data={data} /> : <BarChart data={data} />}
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
