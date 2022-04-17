
export const FormatDate = date =>{
  const toDate = (date) => {
    return new Intl.DateTimeFormat('ru-Ru', {
      day:'2-digit',
      month:'2-digit',
      year:'numeric',
      hour:'2-digit',
      minute:'2-digit',
    }).format(new Date(date))
  }
    return toDate(date)
}
