import React from 'react'
import { loadingSelector } from '../../redux/selector'
import { useSelector } from 'react-redux'

const DualRingLoading = () => {
  const loading = useSelector(loadingSelector)

  return (
    <>
      {loading.dualRing.isLoading &&
        <div className='dual-ring-container'>
          <div className="lds-dual-ring"></div>
        </div>
      }
    </>
  )
}

export default DualRingLoading