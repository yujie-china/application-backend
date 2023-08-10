import dayjs from "dayjs"

export function formattime (date, formatStr = "YYYY-MM-DD") {
  return dayjs(date).format(formatStr)
}

