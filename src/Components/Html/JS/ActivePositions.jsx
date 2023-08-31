import React, { useEffect, useState } from 'react'
import '../../Css/AcivePositions.css'
import ListOfOrdersHistory from './ListOfOrdersHistory';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import '../../Css/AddStock.css'
import axios from 'axios';
import { onValue, push, ref, set, update } from 'firebase/database';
import { auth, db } from '../../../utilitise/Firebase';
const ActivePositions = () => {
    const [SymbolInput, setSymbolInput] = useState()
    const [Price, setPrice] = useState(0)
    const [TotalBill, setTotalBill] = useState(0)
    const [Quantity, setQuantity] = useState(0)
    const [MoneyObj, setMoneyObj] = useState(0)
    const [disabled, setDisabled] = useState(true)
    // const [highBill, setHighBill] = useState(0)
    const [ErrorMsg, setErrorMsg] = useState('')
    const [ordertype, setordertype] = useState('')
    const [Orders, setorders] = useState()
    const [founded, setfounded] = useState([])
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
    const handleAddstock = () => {
        setAddStock(!AddStock)
    }

    const [AddStock, setAddStock] = useState(0)

    const filterinput = () => {
        const allSymbols = localStorage.getItem('AllSymbols').split(',');
        if (allSymbols && SymbolInput) {
            const filteredSymbols = allSymbols.filter(
                options => options.toLowerCase().includes(SymbolInput.toLowerCase())
            );
            setfounded(filteredSymbols)
        }
    }

    const handleBlur = (e) => {
        filterinput();
        setSymbolInput(e.target.value)
    }

    const fetchpriceselected = (Selecteditem) => {
        const url = `/api/equity/${Selecteditem}`
        axios.get(url).then((res) => {
            console.log(res)
            setPrice(res.data.priceInfo.lastPrice)
            setDisabled(false)
        }).catch((err) => console.log(err))
    }

    const handleSymbolSelection = (Selecteditem) => {
        console.log(Selecteditem)
        setSymbolInput(Selecteditem);
        setfounded([])
        fetchpriceselected(Selecteditem);
    }

    const handleQuantityChange = (e) => {
        console.log(e.target.value)
        if (e.target.value >= 0) {
            if (MoneyObj.availableMoney >= (Price * e.target.value).toFixed(2)) {
                setQuantity(e.target.value)
                setErrorMsg('')
                setTotalBill((Price * e.target.value).toFixed(2))
            }
            else {
                setErrorMsg('Available Money is Insufficient for your order.')
            }
        }
        else {
            setQuantity(0)
            setTotalBill((Price * e.target.value).toFixed(2))
        }

    }

    const fetchingmoneyobj = () => {
        onValue(ref(db, 'users/' + auth.currentUser.uid + '/portfolio'), (res) => {
            setMoneyObj(res.val())
        })
    }

    useEffect(() => {
        fetchingmoneyobj();
        const Interval = setInterval(() => {
            fetchingmoneyobj();
        }, 5000);
        return (
            clearInterval(Interval)
        )
    }, [])

    const handleSubmit = (e) => {
        if (ordertype !== '') {
            e.preventDefault();
            const orderobject = {
                Symbol: SymbolInput,
                Quantity: Quantity,
                TotalBill: TotalBill,
                ProfitLose: 0,
                StartingPrice: Price,
                EndingPrice: null,
                openOrClose: 'open',
                ordertype: ordertype,
                timestamp: Date.now().toString()
            }
            set(push(ref(db, 'users/' + auth.currentUser.uid + '/Orders')), orderobject)
            const updateobj = {};
            updateobj['users/' + auth.currentUser.uid + '/portfolio/InvestedAmount'] = (MoneyObj.InvestedAmount + Number(TotalBill)).toFixed(2);
            updateobj['users/' + auth.currentUser.uid + '/portfolio/availableMoney'] = (MoneyObj.availableMoney - Number(TotalBill)).toFixed(2);
            update(ref(db), updateobj).then((res) => { console.log('updated') }).catch((err) => { console.log(err) })
            setAddStock(0)
            fetchorders();
            setSymbolInput('')
            setPrice(0)
        }
        else {
            e.preventDefault();
            setErrorMsg('select order type.')
        }
    }

    const fetchorders = () => {
        onValue(ref(db, 'users/' + auth.currentUser.uid + '/Orders'), (res) => {
            setorders(res.val())
        })
    }

    const handleordertype = (e) => {
        e.preventDefault();
        setordertype(e.target.value)
    }

    const handleSymolInput = (e) => {
        e.preventDefault();
        setSymbolInput(e.target.value)
        filterinput();
        if(!e.target.value){
            setPrice(0)
        }
    }

    useEffect(() => {
        fetchorders();
    }, [])
    const updatePositionPL = () => {
        if (Orders) {
            var totalPL = 0
            console.log('total',totalPL)
            Object.keys(Orders).map((res) => {
                const orderd = Orders[res]
                console.log('hh',orderd.ProfitLose,'type:',orderd.ordertype)
                if (orderd.openOrClose === "open") {
                    totalPL = totalPL + orderd.ProfitLose
                }
            })

            const updateobj2 = {}
            updateobj2['users/' + auth.currentUser.uid + '/portfolio/positionsPL'] = Number((totalPL).toFixed(2))
            update(ref(db),updateobj2).catch(err=>{})
        }
    }
    useEffect(() => {
        updatePositionPL();
        const Interval = setInterval(() => {
            updatePositionPL();
        }, 1000);
        return (
            clearInterval(Interval)
        )
    })
    return (
        <div className='ActivePositionsJSXOuter'>
            {
                AddStock ? <>
                    <div className="AddStockOuter">
                        <div className="AddStockHeader">
                            <div className="BackIconAddStock" onClick={handleAddstock}><svg fill="white" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"></path></g></svg></div>
                            <h1>Create</h1>
                        </div>
                        <div className="AddStockBody">
                            <div className="SearchAddstock">
                                <input type="text" value={SymbolInput} onFocus={() => setDisabled(true)} onChange={handleSymolInput} onBlur={handleBlur} placeholder='Search & Select Stock By StockSymbol' />
                                <div className="SearchButton">Search</div>
                                <div className="SearchedFilter">
                                    {
                                        founded.length > 2 ? founded.map((data, index) => {
                                            return (
                                                <div className="FoundedPill" key={index} onClick={() => handleSymbolSelection(data)}>
                                                    {data}
                                                </div>
                                            )
                                        }) : ''
                                    }
                                </div>
                            </div>

                            <form action="">
                                <div className="BuySellButtonDiv">
                                    <button className={`BuyButton ${ordertype === 'buy' ? 'activeordertype' : ''}`} value={'buy'} onClick={handleordertype}>Buy</button>
                                    <button className={`SellButton  ${ordertype === 'sell' ? 'activeordertype' : ''}`} value={'sell'} onClick={handleordertype}>Sell</button>
                                    <div className="PositionsInvested1">
                                        <h3 className='PositionsPLH3'>₹{MoneyObj.availableMoney}</h3>
                                        <p className='PositionsPLHP'>Available Cash</p>
                                    </div>

                                    <div style={{ marginLeft: '20px' }} className="PositionsInvested1">
                                        <h3 className='PositionsPLH3'>₹{Price}</h3>
                                        <p className='PositionsPLHP'>Stock Price</p>
                                    </div>

                                    <div style={{ marginLeft: '20px' }} className="PositionsInvested1">
                                        <h3 className='PositionsPLH3'>₹{TotalBill}</h3>
                                        <p className='PositionsPLHP'>Total Bill</p>
                                    </div>
                                </div>
                                <div className="InputQuantity">
                                    <input type="Number" name="" id="" placeholder='Quantity' value={Quantity} onChange={handleQuantityChange} />
                                </div>
                                <div className="ErrorDiv" style={{ color: 'red' }}>
                                    {ErrorMsg}
                                </div>
                                <div className="SubmitButtonAddStock">
                                    <button type='submit' disabled={disabled} onClick={handleSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </> : <>

                    <div className="ActivePositionsJSXHeader">
                        <h2>Positions</h2>
                        <button className='ActivePositionsJSXHeaderButton' onClick={handleAddstock}>+ New Trade</button>
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
                    <div className="OpenOrdersDiv">
                        {
                            Orders ? <>
                                <Splide options={splideOptions}>
                                    {Object.keys(Orders).map((data, index) => {
                                        const t = Orders[data].EndingPrice;
                                        if (t === undefined) {
                                            return (
                                                <SplideSlide key={index}>
                                                    <ListOfOrdersHistory data={Orders[data]} orderkey={data} />
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
                    </div></>
            }
        </div>
    )
}

export default ActivePositions
