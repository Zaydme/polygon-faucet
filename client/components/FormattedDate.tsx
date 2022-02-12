import React from 'react'
import moment from 'moment'

const FormattedDate = ({ date }: { date: string }) => {
  return (
    <span className="text-purple-600 mx-1" title={date}>
      {moment(date).fromNow()}
    </span>
  )
}

export default FormattedDate
