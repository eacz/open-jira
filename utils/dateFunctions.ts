import { formatDistanceToNow } from 'date-fns'
//import { es } from 'date-fns/locale'

export const getFormatDistanceFromToNow = (date: number) => {
  //const fromNow = formatDistanceToNow(date, { locale: es })
  const fromNow = formatDistanceToNow(date)
  return fromNow
}
