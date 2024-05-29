import React from 'react'
import Table from '../../Table/Table'
import RatioList from '../../RatioList/RatioList'

interface Props  {}

const DesignPage = (props: Props) => {
  return (
   <>
   <h1> Design Page</h1>
   <h2> This is Design page </h2>
   <RatioList />
   <Table />
   </>
  )
}

export default DesignPage