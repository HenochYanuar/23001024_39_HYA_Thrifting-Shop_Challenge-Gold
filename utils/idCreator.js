const createID = () => {
  const itemId = new Date()

  const year = itemId.getFullYear()
  const month = itemId.getMonth() + 1
  const date = itemId.getDate()
  const hours = itemId.getHours()
  const minutes = itemId.getMinutes()
  const seconds = itemId.getSeconds()
  const milliseconds = itemId.getMilliseconds()

  const id = `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`
  return id
}

module.exports = {
  createID
}