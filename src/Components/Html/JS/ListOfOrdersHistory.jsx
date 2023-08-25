import React from 'react'
import '../../Css/ListOfOrdersHistory.css'
const ListOfOrdersHistory = () => {
    return (
        <div className='OrderHistoryCard'>
            <div className='OrderHistoryCardDiv1'>
                <h2>Symbol</h2>
                <p>Start Price : 30 | End Price : 40</p>
            </div>
            <div className="OrderHistoryCardDiv2">
                <p>Sell</p>
            </div>
        </div>
    )
}

export default ListOfOrdersHistory
