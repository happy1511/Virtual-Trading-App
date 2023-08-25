import React, { useEffect, useState } from 'react';
import '../../Css/TrendingStock.css';
import axios from 'axios';
const TrendingMarkets = () => {
    const [Gainers, setGainers] = useState([]);
    const [Loosers, setLoosers] = useState([]);

    const TrendingM = async () => {
        const url = '/api/gainersAndLosers/Nifty%2050'; // Use a relative URL
        console.log("executed")
        try {
            const response = await axios.get(url);
            const data = response.data; // Assuming the API returns an object with gainers and losers arrays

            setGainers(data.gainers);
            setLoosers(data.losers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        TrendingM(); // Fetch data immediately when component mounts

        const interval = setInterval(() => {
            TrendingM(); // Fetch data every 3 seconds
        }, 3000);

        return () => {
            clearInterval(interval); // Clean up interval on component unmount
        };
    }, []);
    return (
        <>
            <div className='Gainers'>
                <ul className="Gul">
                    <li>
                        <h4>
                            Nifty 50 Gainers
                        </h4>
                    </li>
                    {
                        (Gainers.slice(0, 10)).map((data) => (

                            <li key={data.symbol}> {/* Added a key prop to the list items */}
                                <div className="logoS">
                                    <img src={`https://unpkg.com/@extra-isin/logos@1.0.0/data/${data?.meta?.isin}.png`} alt='' onError={(e) => {
                                        e.target.style.display = 'none'; // Hide the image on error
                                    }} />
                                </div>
                                <div className="NameS">{data.symbol}</div>
                                <div className="PriceS">
                                    <div className="equitychange"> </div>
                                    <div className="CurrentPrice">{data.lastPrice}</div>
                                    <div className="GainPrice">+{data.pChange}%</div>
                                </div>
                            </li>

                        ))
                    }
                </ul>
            </div>
            <div className="Loosers">
                <ul className="Gul">
                    <li>
                        <h4>Nifty 50 Losers</h4>
                    </li>
                    {
                        (Loosers.slice(0, 10)).map((data) => (
                            <li key={data.symbol}> {/* Added a key prop to the list items */}
                                <div className="logoS">
                                    <img src={`https://unpkg.com/@extra-isin/logos@1.0.0/data/${data?.meta?.isin}.png`} alt='' onError={(e)=>{
                                        e.target.style.display='none';
                                    }}/>
                                </div>
                                <div className="NameS">{data.symbol}</div>
                                <div className="PriceS"><div className="equitychange"></div>
                                    <div className="CurrentPrice">{data.lastPrice}</div>
                                    <div className="Looseprice">-{data.pChange}%</div></div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <a href="/TrendingMarkets" className='ButtonTrendingMarketLink'>
                <div className="ButtonTrendingMarket">
                    Trending Markets
                </div>
            </a>
        </>
    );
};

export default TrendingMarkets;
