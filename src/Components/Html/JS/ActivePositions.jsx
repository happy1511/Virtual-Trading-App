import React from 'react'
import '../../Css/AcivePositions.css'
import ListOfOrdersHistory from './ListOfOrdersHistory';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

const ActivePositions = () => {
    const splideOptions = {
        arrows: false, 
        pagination: false,
        type: '',
        perMove: 1,
        direction: 'ttb',
        height: '100%',
        wheel: true,
    };
    return (
        <div className='ActivePositionsJSXOuter'>
            <div className="ActivePositionsJSXHeader">
                <h2>Positions</h2>
                <button className='ActivePositionsJSXHeaderButton'>+ New Trade</button>
            </div>
            <div className="ActivePositionsJSXMoneyBanner">
                <div className="PositionsPL">
                    <h3 className='PositionsPLH3'>₹0</h3>
                    <p className='PositionsPLHP'>Positios P&L</p>
                </div>
                <div className="PositionsInvested">
                    <div className="PositionsInvested1">
                        <h3 className='PositionsPLH3'>₹0</h3>
                        <p className='PositionsPLHP'>Available Cash</p>
                    </div>
                    <div className="PositionsInvested2">
                        <h3 className='PositionsPLH3'>₹0</h3>
                        <p className='PositionsPLHP'>Past Traded Amount</p>
                    </div>
                    <div className="PositionsInvested3">
                        <h3 className='PositionsPLH3'>₹0</h3>
                        <p className='PositionsPLHP'>Invested Amount</p>
                    </div>

                </div>
            </div>
            <div className="OpenOrdersDiv">
                <Splide options={splideOptions}>


                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>


                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>
                    <SplideSlide>
                        <ListOfOrdersHistory />
                    </SplideSlide>

                </Splide>
            </div>
        </div>
    )
}

export default ActivePositions
