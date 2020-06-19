import { utils } from "ethers"

// This is pretty new so I'll leave the docs here
// https://v8.dev/features/intl-numberformat
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

// Locale is an empty array because we want it to use user's locale
const lt1kFormatter = new Intl.NumberFormat([], { maximumFractionDigits: 5 })
const lt10kFormatter = new Intl.NumberFormat([], { maximumFractionDigits: 4 })
const lt100kFormatter = new Intl.NumberFormat([], { maximumFractionDigits: 3 })
const lt1mFormatter = new Intl.NumberFormat([], { maximumFractionDigits: 2 })
const lt10mFormatter = new Intl.NumberFormat([], { maximumFractionDigits: 1 })
const lt100mFormatter = new Intl.NumberFormat([], { maximumFractionDigits: 0 })
// same format for billions and trillions
const lt1000tFormatter = new Intl.NumberFormat([], {
  maximumFractionDigits: 3,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // reason: https://github.com/microsoft/TypeScript/issues/36533
  notation: "compact",
})

const formatToDisplayAmount = (number: string): string => {
  const numberFloat = parseFloat(number)
  let formattedNumber = numberFloat.toString()

  if (numberFloat === 0) {
    formattedNumber = "0"
  } else if (numberFloat < 0.001) {
    formattedNumber = "< 0.001"
  } else if (numberFloat < 1000) {
    formattedNumber = lt1kFormatter.format(numberFloat)
  } else if (numberFloat < 10000) {
    formattedNumber = lt10kFormatter.format(numberFloat)
  } else if (numberFloat < 100000) {
    formattedNumber = lt100kFormatter.format(numberFloat)
  } else if (numberFloat < 1000000) {
    formattedNumber = lt1mFormatter.format(numberFloat)
  } else if (numberFloat < 10000000) {
    formattedNumber = lt10mFormatter.format(numberFloat)
  } else if (numberFloat < 100000000) {
    formattedNumber = lt100mFormatter.format(numberFloat)
  } else if (numberFloat < 10 ** 15) {
    formattedNumber = lt1000tFormatter.format(numberFloat)
  } else {
    formattedNumber = "> 1000T"
  }

  return formattedNumber
}

const formatFromEtherToWei = (number: string, decimals = 18): string =>
  utils.parseUnits(number, decimals).toString()

const formatFromWeiToEther = (number: string, decimals = 18): string =>
  utils.formatUnits(number, decimals)

const fromWeiToDisplayAmount = (number: string, decimals = 18): string =>
  formatToDisplayAmount(formatFromWeiToEther(number, decimals))

export { formatToDisplayAmount, formatFromWeiToEther, fromWeiToDisplayAmount, formatFromEtherToWei }
