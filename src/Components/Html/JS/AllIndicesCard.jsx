import React from 'react'
import ChartR from './ChartR'

const AllIndicesCard = (props) => {
    return (
        <div className='AllIndicesCardDiv1'>
            {/* <ChartR/> */}
            <h3 className='AllIndicesCardHeader AllIndicesCardH3'>{props.data.indexSymbol}</h3>
            <div className="AllIndicesCardDiv2">
                <h4 className='AllIndicesCardHeader AllIndicesCardH4'>{props.data.last}</h4>
                <h5 className='AllIndicesCardHeader AllIndicesCardH5'>{props.data.percentChange}</h5>
            </div>
        </div>
    )
}

export default AllIndicesCard
