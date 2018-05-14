import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import Currency from '../Currency'
import Gain from '../Gain'
import Debuggable from '../Debuggable'

// const getRandom = (min = 0, max = 100) => {
//   return Math.floor(Math.random() * max) + min
// }

// const getRandomColor = () => `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`

const getColor = intensity =>
  `hsl(${intensity > 0 ? 120 + intensity : 60 + intensity}, 50%, 50%)`

class Bar extends PureComponent {
  render () {
    const { growth, value, quantity = 0, onClick, symbol, barHeight } = this.props
    if (typeof value === 'string') {
      console.log(this.props)
    }
    return (
      <span className='bar-wrapper'>
        <span
          className='bar'
          onClick={() => onClick(symbol)}
          style={{
            background: getColor(barHeight),
            height: `${Math.abs(barHeight)}%`
          }}
        />
        <div
          className='bar-tooltip'
          style={{ position: 'absolute', bottom: `${Math.abs(barHeight)}%` }}
        >
          <Card
            title={quantity > 0 ? `${symbol} (${quantity})` : symbol}
            className='blue-grey darken-4 blue-grey-text text-lighten-4'
          >
            <Currency value={value} />
            <Gain value={growth} percent />
          </Card>
        </div>
      </span>
    )
  }
}

Bar.propTypes = {
  barHeight: PropTypes.number,
  value: PropTypes.number,
  growth: PropTypes.number,
  quantity: PropTypes.number,
  symbol: PropTypes.string,
  onClick: PropTypes.func
}

export default Debuggable(Bar)
