import mockStockData from './data/stocksData.json'
import { sortBy } from 'lodash'
import { addNoise, roundUp } from './utils'

export async function getAllStocksData () {
  // get data from server
  const [sensex, nifty, ...stocksData] = mockStockData
  const data = sortBy(stocksData, 'symbol').map(item =>
    processStockDataItem(item, 0.05)
  )
  return {
    markets: [processStockDataItem(sensex), processStockDataItem(nifty)],
    data
  }
}

export function processStockDataItem (item, variance = 0.1) {
  const { symbol, securityName, day1 = 0, day2 = day1, owned } = item
  let value = isNaN(day2) ? day1 : day2
  let growth = 0
  if (day1) {
    value = addNoise(value, variance)
    growth = roundUp((value - day1) * 100 / day1)
  }
  return {
    key: symbol,
    value,
    growth,
    label: securityName,
    owned
  }
}
