const timeConvertions = {"ET": 5}

const convert = s => {
  const [time, period , zone] = s.split(" ")
  const [hourString, m] = time.split(":")
  const hour = parseInt(hourString)

  if (isNaN(hour))
      return null

  const offset = (new Date()).getTimezoneOffset() / 60
  const twHour = period === "PM" ? hour + 12 : hour
  const h1 = (twHour + timeConvertions[zone]) - offset
  const h2 = h1 > 24 ? h1 - 24 : h1
  const h = h2 < 10 ? "0" + h2 : h2

  return `${h}:${m} UTC${offset > -1 ? "+" : ""}${offset}`
}

const changeDate = (el, innerText) => {
  if (innerText)
    el.innerText = innerText
}


const changeDateContent = (el, innerText) => {
  if (innerText)
    el.textContent = innerText
}

const convertSchedule = () => {
  const dateElements = document.getElementsByClassName("matchup-time-or-result")
  if (dateElements.length === 0)
    window.requestAnimationFrame(convertSchedule);
  else
    for (let el of dateElements)
      changeDate(el, convert(el.innerText))
}

const convertBar = () => {
  const dateElements = document.getElementsByClassName("g5-component--nhl-scores__status-game-time")
  if (dateElements.length === 0)
    window.requestAnimationFrame(convertBar);
  else
    for (let el of dateElements)
      changeDateContent(el, convert(el.textContent))
}

convertSchedule()
convertBar()
