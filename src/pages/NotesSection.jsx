import React from 'react'
import Notes from '../components/Notes'

function NotesSection() {
    const click = localStorage.getItem("Index")
  return (
    <div className='item-2-1'>
        <Notes id={click}/>
    </div>
  )
}

export default NotesSection