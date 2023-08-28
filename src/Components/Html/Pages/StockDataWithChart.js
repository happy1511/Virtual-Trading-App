import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../Css/StockDataWithChart.css'
import Header from '../Header'
import Footer from '../Footer'
import ChartR from '../JS/ChartR'
import axios from 'axios'

const StockDataWithChart = () => {
    const { Symbol } = useParams()
    const [Symboldata, setSymboldata] = useState({})
    const [color, setcolor] = useState('')
    const [selectedchart, setselectedchart] = useState(0)
    const [MarketStatus, setMarketStatus] = useState(0)

    const fetchSymbolData = async () => {
        try {
            const response = await axios.get(`/api/equity/${Symbol}`);
            setSymboldata(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        (Symboldata.priceInfo?.pChange < 0) ? setcolor('red') : setcolor('green')
    },[Symboldata])
    const FetchMarketStatus = async () => {
        try {
            const response = await axios.get('/api/marketStatus');
            response.data.marketState[0].marketStatus === 'Close' ? setMarketStatus(0) : setMarketStatus(1)
        } catch (error) {
            console.log(error)
        }
    }
    const handleselectchart = (e) => {
        setselectedchart(e)
    }
    useEffect(() => {
        FetchMarketStatus();
    })
    useEffect(() => {
        fetchSymbolData();
        const interval = setInterval(() => {
            fetchSymbolData();
        }, 100);

        return () => {
            clearInterval(interval); // Clear the interval on component unmount
        };
    }, []);
    return (
        <div className='ChartPageOuter'>
            <Header />
            <div className="StockDataDivChartPage">
                <div className='SymbolNameDivChartPage'>
                    <h3 className='MarketStatusHeaderStockPage'><div className="MarketStatus" style={MarketStatus === 0 ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}></div>
                        {MarketStatus === 0 ? 'Market Closed' : 'Market Open'}
                    </h3>
                    <h1 className='StockDataCompanyNameChartPage'>
                        {Symboldata.info?.companyName}
                    </h1>
                    <h2 className='StockDataPriceChartPage'>
                        <div className="PriceChartPage">
                            {Symboldata.priceInfo?.lastPrice}
                        </div>
                        <div className="StockPriceChangeChartPage" style={{ backgroundColor: color }}>
                            {(Number.parseFloat(Symboldata.priceInfo?.pChange).toFixed(1)).toString().charAt(0) === '-' ? '↓ ' + (Number.parseFloat(Symboldata.priceInfo?.pChange).toFixed(1)).toString() : '↑ ' + (Number.parseFloat(Symboldata.priceInfo?.pChange).toFixed(1)).toString()}
                        </div>
                        <div className='PriceChangeChartPage'>
                            {(Number.parseFloat(Symboldata.priceInfo?.change).toFixed(1)).toString().charAt(0) === '-' ? '+ ' + (Number.parseFloat(Symboldata.priceInfo?.change).toFixed(1)).toString() : '- ' + (Number.parseFloat(Symboldata.priceInfo?.change).toFixed(1)).toString()}
                        </div>
                    </h2>
                </div>

                <div className="ChartDaySelectDiv">
                    <button className={`SelectChart ${selectedchart === 0 ? 'Selected' : ''}`} onClick={() => { handleselectchart(0) }}>1 D</button>
                    <button className={`SelectChart ${selectedchart === 1 ? 'Selected' : ''}`} onClick={() => { handleselectchart(1) }}>5 D</button>
                    <button className={`SelectChart ${selectedchart === 2 ? 'Selected' : ''}`} onClick={() => { handleselectchart(2) }}>1 M</button>
                    <button className={`SelectChart ${selectedchart === 3 ? 'Selected' : ''}`} onClick={() => { handleselectchart(3) }}>6 M</button>
                </div>
                <div className="ChartDivChartPage">
                    <ChartR data={Symbol} scolor={color} historical={selectedchart} />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default StockDataWithChart
