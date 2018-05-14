export const roundUp = value => Math.round(value * 100) / 100

export const addNoise = (value, variance = 0.1) =>
  value + value * variance * (Math.random() - 0.5)

export const numberWithCommas = num => {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
