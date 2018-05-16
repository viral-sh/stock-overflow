import React, { Component } from 'react'
import ReactDOM from 'react-dom'
/* eslint-disable-next-line */

import './App.css'
import Header from './components/Header'
import Summary from './components/Summary'
import { getAllStocksData } from './service'
import StocksPage from './components/StocksPage'
// import './awesome-stuff'

import { debugStart, debugEnd } from './components/Debuggable'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stocksData: [],
      liveStream: true
    }
  }

  componentWillMount () {
    this.getChartData()
    this.toggleLiveStreaming()
  }

  componentWillUpdate () {
    debugStart()
  }
  componentDidUpdate () {
    debugEnd()
  }

  toggleLiveStreaming = () => {
    const liveStream = !this.state.liveStream
    if (liveStream) {
      // setting up live data updating
      this.streamInterval = window.setInterval(this.getChartData, 3000)
    } else if (this.streamInterval) {
      // diabling live data updating
      window.clearInterval(this.streamInterval)
    }
    this.setState({ liveStream })
  }

  getChartData = async () => {
    const { markets, data } = await getAllStocksData()
    const stocksData = data.map(item => [
      item.key,
      item.growth,
      item.value,
      item
    ])
    this.setState({
      stocksData,
      markets
    })
  }

  render () {
    const { markets, stocksData, liveStream } = this.state
    return (
      <div className='App'>
        <Header />
        <Summary markets={markets} stocksData={stocksData} />
        <StocksPage
          data={stocksData}
          onToggleLiveStream={this.toggleLiveStreaming}
          isLivestreamOn={liveStream}
        />
      </div>
    )
  }
}

export default App

/*
  // Async setState
  ReactDOM.unstable_deferredUpdates(() => {
    this.setState({
      stocksData,
      markets
    })
  })
*/
