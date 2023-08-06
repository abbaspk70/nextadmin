import React from 'react'

export default function EditCourseForm() {
  return (
    <div className='bg-accent/10'>
        <form>
            <input className='block' type='text' value={'title'} placeholder='Title'/>
            <button className='bg-secondary px-5 py-3'  type='submit'>Update</button>
        </form>
    </div>
  )
}
