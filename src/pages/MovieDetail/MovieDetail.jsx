import React from 'react'
import Detail from './components/Detail'
import Showtimes from './components/ShowTimes'

export default function MovieDetail() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Detail />
          </div>
          <div className="col-12 mt-5">
            <Showtimes />
          </div>
        </div>
      </div>
    </div>
  )
}
