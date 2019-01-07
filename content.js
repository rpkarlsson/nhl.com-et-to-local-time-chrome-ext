const timeConvertions = {"ET": 5}
const offset = (new Date()).getTimezoneOffset() / 60

const shouldConvertZone = zone => Object.keys(timeConvertions).includes(zone)

const convert = s => {
  const [time, period, zone] = s.split(" ")

  if (!shouldConvertZone(zone))
    return null

  const [hourString, m] = time.split(":")
  const hour = parseInt(hourString)

  if (isNaN(hour))
      return null

  const twHour = period === "PM" ? hour + 12 : hour
  const h1 = (twHour + timeConvertions[zone]) - offset
  const h2 = h1 > 24 ? h1 - 24 : h1
  const h = h2 < 10 ? "0" + h2 : h2

  return `${h}:${m} UTC${offset > -1 ? "+" : ""}${offset}`
}

const changeDates = (elements, attr) => {
  for (let el of elements) {
    const newText = convert(el[attr])
    if (newText)
      el[attr] = newText
  }
}

const convertSchedule = () => {
  const dateElements = document.getElementsByClassName("matchup-time-or-result")
  if (dateElements.length === 0)
    window.requestAnimationFrame(convertSchedule);
  else
    changeDates(dateElements, "innerText")
}

const convertBar = () =>
      changeDates(
        document.getElementsByClassName("g5-component--nhl-scores__status-game-time"),
        "textContent")


convertSchedule()
window.setInterval(convertBar, 1000)
