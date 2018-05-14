import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bar from './Bar'
import './index.css'

import { keyBy } from 'lodash'
import { roundUp } from '../../utils'
import Debuggable from '../Debuggable'
// import Debuggable, { debugStart, debugEnd } from '../Debuggable'

class BarChart extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (ownProps) {
    if (ownProps.data !== this.props.data) {
      const [minY, maxY] = this.getYAxisRange(ownProps.data)
      const data = keyBy(ownProps.data, item => item[0])
      this.setState({ minY, maxY, data })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (
      nextProps.data !== this.props.data ||
      nextState.data !== this.state.data
    ) {
      return true
    }
    return false
  }

  getYAxisRange (data) {
    if (!data || !data.length) {
      return [0, 0]
    }
    const values = data
      .map(([key, value]) => value)
      .filter(num => !isNaN(num))
      .map(Math.abs)
    return [Math.min(0, ...values), Math.max(20, ...values)]
  }

  barClickHandler = symbol => {
    const { data } = this.state
    delete data[symbol]
    this.setState({ data: { ...data } })
  }

  calcHeight = val => {
    const { minY, maxY } = this.state
    const percent = roundUp(val * 100 / (maxY - minY))
    return percent
  }

  render () {
    const { data = [] } = this.state
    return (
      <div className='bar-chart-box'>
        <title className='chart-title'>BarChartBox</title>
        <div className='graph-wrapper'>
          <ul className='bar-list'>
            {Object.values(data).map(([key, growth, value, item], index) => (
              <Bar
                key={key}
                growth={growth}
                value={value}
                symbol={key}
                quantity={item.owned}
                onClick={this.barClickHandler}
                barHeight={this.calcHeight(growth)}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

BarChart.propTypes = {
  data: PropTypes.array
}

BarChart.defaultProps = {
  data: [],
  chartOptions: {}
}

export default Debuggable(BarChart)
