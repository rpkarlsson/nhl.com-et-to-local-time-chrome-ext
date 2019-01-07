// const timeConvertions = {
//   "ET": 5
// }

// const convert = s => {
//   const [time, period , zone] = s.split(" ")
//   const [hourString, m] = time.split(":")

//   const offset = (new Date()).getTimezoneOffset() / 60

//   const h = parseInt(hourString) + (timeConvertions[zone] + offset)
//   return `${h}:${m} UTC${offset}`
// }

import "../dates.js"

test('', () => {
  const input ="11:30 AM ET"
  expect(convert(input))
    .toBe("15:30 UTC-1")
})
