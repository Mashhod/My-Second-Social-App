import { CircularProgress } from '@mui/material'

import React from 'react'

const Loader = () => {
  return (
    <div className='Loader-Grand-Parent'>
      <div className='Loader-Parent'>
        <CircularProgress  />

      </div>
    </div>
  )
}

export default Loader

