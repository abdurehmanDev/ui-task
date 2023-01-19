import React from 'react'

export default function Pagination(props: any) {
  return (
    <div className="pagination">
        <a onClick={props.prevPage}>&laquo;</a>
        <a href="#">1</a>
        <a className="active" href="#">
          2
        </a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a onClick={props.nextPage}>&raquo;</a>
      </div>
  )
}
