import React from 'react'
import { useNavigate } from 'react-router-dom';

const MostActiveTrendingPage = (props) => {
    const navigate = useNavigate()
    const handleClickOnMostActiveCard = (e) => {
        const isin = encodeURIComponent(props.data.meta.isin)
        const symbol = encodeURIComponent(props.data.symbol)
        navigate(`/Chart/${symbol}`)
    }
    return (
        <div className='MostActiveTrendingPageDiv1' onClick={handleClickOnMostActiveCard}>
            <div className='MostActiveTrendingPageimgDiv'>
                <img src={`https://unpkg.com/@extra-isin/logos@1.0.0/data/${props.data?.meta?.isin}.png`} alt="" onError={(e) => {
                    e.target.style.display = 'none'; // Hide the image on error
                }} className='MostActiveTrendingPageimg' />
            </div>
            <h3 className='MostActiveTrendingPageHeaders'>{props.data.symbol} ({props.data.pChange}%)</h3>
            <h4 className='MostActiveTrendingPageHeaders MostActivePrice'><span>{props.data.lastPrice}</span><span>{props.data.change}</span></h4>
            <h6 className='MostActiveTrendingPageHeaders MostActiveTrendingPageHeadersIndustry'>{props.data.meta?.industry}</h6>
        </div>
    )
}

export default MostActiveTrendingPage
