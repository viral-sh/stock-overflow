import React, { Component } from 'react'
import Card from './Card'
import Currency from './Currency'
import Gain from './Gain'
import PropTypes from 'prop-types'
import Debuggable from './Debuggable'

class Summary extends Component {
  calculateTotalHoldings = () => {
    let totalHoldings = 0
    let totalValue = 0
    let growthNumerator = 0
    let totalGrowth = 0
    const { stocksData } = this.props
    if (stocksData && stocksData.length) {
      this.props.stocksData
        .map(([, , , item]) => item)
        .filter(item => item.owned > 0)
        .forEach(({ value, growth, owned }) => {
          totalHoldings++
          totalValue += value * owned
          growthNumerator += value * owned * growth
        })
      totalGrowth = growthNumerator / totalValue
    }
    return {
      totalHoldings,
      totalValue,
      totalGrowth
    }
  }
  render () {
    const { markets = [] } = this.props
    const {
      totalHoldings,
      totalValue,
      totalGrowth
    } = this.calculateTotalHoldings()
    return (
      <div className='summary-container row'>
        <div className='holdings col l3 m12 s12'>
          <Card
            title={`Total Holdings (${totalHoldings})`}
            className='left1'
            key='holdings'
          >
            <Currency value={totalValue} />
            <Gain percent value={totalGrowth} />
          </Card>
        </div>
        <div className='markets col l9 m12 s12'>
          {markets.map(({ key, label, value, growth }) => (
            <Card title={label} className='right2' key={key}>
              <Currency value={value} />
              <Gain percent value={growth} />
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

Summary.propTypes = {
  stocksData: PropTypes.arrayOf(PropTypes.array),
  markets: PropTypes.arrayOf(PropTypes.object)
}

export default Debuggable(Summary)
