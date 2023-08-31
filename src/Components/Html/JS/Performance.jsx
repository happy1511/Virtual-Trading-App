import React, { useEffect, useState } from 'react'
import '../../Css/Performance.css'
import '../../Css/AcivePositions.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ListOfOrdersHistory from './ListOfOrdersHistory';
import { onValue, ref } from 'firebase/database';
import { auth, db } from '../../../utilitise/Firebase';
const Performance = () => {
    const [MoneyObj,setMoneyObj] = useState(0)
    const [orders,setorders] = useState()
    const splideOptions = {
        arrows: false,
        pagination: false,
        type: '',
        gap: 10,
        perMove: 1,
        direction: 'ttb',
        height: '100%',
        wheel: true,
    };
    useEffect(()=>{
        onValue(ref(db,'users/'+auth.currentUser.uid+'/portfolio'),(res)=>{
            setMoneyObj(res.val())
        })
    })

    const fetchorders = () => {
        onValue(ref(db, 'users/' + auth.currentUser.uid + '/Orders'), (res) => {
            setorders(res.val())
        })
    }
    useEffect(() => {
        fetchorders();
    })
    
    return (
        <div className='ActivePositionsJSXOuter'>
            <div className="ActivePositionsJSXHeader">
                <h2>Performance</h2>
            </div>
            <div className="ActivePositionsJSXMoneyBanner">
                <div className="PositionsPL">
                    <h3 className='PositionsPLH3'>₹{MoneyObj.positionsPL}</h3>
                    <p className='PositionsPLHP'>Positios P&L</p>
                </div>
                <div className="PositionsInvested">
                    <div className="PositionsInvested1">
                        <h3 className='PositionsPLH3'>₹{MoneyObj.availableMoney}</h3>
                        <p className='PositionsPLHP'>Available Cash</p>
                    </div>
                    <div className="PositionsInvested2">
                        <h3 className='PositionsPLH3'>₹{MoneyObj.pastTradedAmount}</h3>
                        <p className='PositionsPLHP'>Past Traded Amount</p>
                    </div>
                    <div className="PositionsInvested3">
                        <h3 className='PositionsPLH3'>₹{MoneyObj.InvestedAmount}</h3>
                        <p className='PositionsPLHP'>Invested Amount</p>
                    </div>

                </div>
            </div>
            <h2>Completed Trades</h2>
            <div className="OpenOrdersDiv">
                <Splide options={splideOptions}>
                {
                            orders ? <>
                                <Splide options={splideOptions}>
                                    {Object.keys(orders).map((data, index) => {
                                        const t = orders[data].EndingPrice;
                                        if (t !== undefined) {
                                            return (
                                                <SplideSlide key={index}>
                                                    <ListOfOrdersHistory data={orders[data]} orderkey={data} />
                                                </SplideSlide>
                                            );// Skip rendering
                                        } else {
                                            return null
                                        }
                                    })}
                                    {/* <SplideSlide>
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
                                </SplideSlide> */}
                                </Splide>
                            </> : <><h1>No orders</h1></>
                        }
                    {/* <SplideSlide>
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
                    </SplideSlide> */}
                </Splide>
            </div>
        </div>
        
    )
}

export default Performance
