// import React, { useEffect, useRef, useState } from 'react'
// import '../../Css/Gainers_chart_home.css'

// let tvScriptLoadingPromise;

// const GainersCards = () => {
//     // useEffect(() => {
//     //     // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
//     //     // var url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey="TOG76MG4DUQKMG74"';

//     //     // request.get({
//     //     //     url: url,
//     //     //     json: true,
//     //     //     headers: { 'User-Agent': 'request' }
//     //     // }, (err, res, data) => {
//     //     //     if (err) {
//     //     //         console.log('Error:', err);
//     //     //     } else if (res.statusCode !== 200) {
//     //     //         console.log('Status:', res.statusCode);
//     //     //     } else {
//     //     //         // data is successfully parsed as a JSON object:
//     //     //         console.log(data);
//     //     //     }
//     //     // });

//     //     // fetch(url).then((response)=>response.json()).then((data)=>{console.log(data)}).catch((error)=>{console.error('error',error)})
//     //     const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=adanient&region=IN';
//     //     const options = {
//     //         method: 'GET',
//     //         headers: {
//     //             'X-RapidAPI-Key': '0639ab94b6msh40d0b031daa3539p19b981jsncc889ab53d5d',
//     //             'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
//     //         }
//     //     };

//     //     try {
//     //         async function jj(url, options) {
//     //             const response = await fetch(url, options);
//     //             const result = await response.text();
//     //             console.log(result);

//     //         }
//     //         jj(url, options)
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // })

//     const onLoadScriptRef = useRef();

//     useEffect(
//         () => {
//             onLoadScriptRef.current = createWidget;
//             const [Symbol, setSymbol] = useState("SENSEX")
//             const Charthandler = (symbol, element) => {
//                 setSymbol(symbol)
//                 element.classList.remove('active')
//             }
//             if (!tvScriptLoadingPromise) {
//                 tvScriptLoadingPromise = new Promise((resolve) => {
//                     const script = document.createElement('script');
//                     script.id = 'tradingview-widget-loading-script';
//                     script.src = 'https://s3.tradingview.com/tv.js';
//                     script.type = 'text/javascript';
//                     script.onload = resolve;

//                     document.head.appendChild(script);
//                 });
//             }

//             tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

//             return () => onLoadScriptRef.current = null;

//             function createWidget() {
//                 if (document.getElementById('tradingview_ad97e') && 'TradingView' in window) {
//                     new window.TradingView.widget({
//                         width: '100%',
//                         height: '100%',
//                         symbol: { Symbol },
//                         interval: "D",
//                         timezone: "Asia/Kolkata",
//                         theme: "dark",
//                         style: "3",
//                         locale: "en",
//                         toolbar_bg: "#f1f3f6",
//                         enable_publishing: false,
//                         backgroundColor: "rgba(0, 0, 0, 1)",
//                         hide_top_toolbar: true,
//                         hide_legend: true,
//                         save_image: false,
//                         container_id: "tradingview_ad97e"
//                     });
//                 }
//             }
//         },
//         []
//     );

//     return (<>
//         <div className="outer">

//             <div className="Card_outer " >
//                 <div className="cards_Div active" onClick={Charthandler('SENSEX', this)} id='SENSEX'>
//                     <div className="LogoStock">

//                     </div>
//                     <div className="StockDetail">
//                         <p className="SymbolStock">SENSEX</p>
//                         <p className="ValueStock">0.98%</p>
//                     </div>
//                 </div>

//             </div>

//             <div className="Card_outer">
//                 <div className="cards_Div" onClick={Charthandler('ADANIENT', this)} id='ADANIENT'>
//                     <div className="LogoStock">

//                     </div>
//                     <div className="StockDetail">
//                         <p className="SymbolStock">ADANIENT</p>
//                         <p className="ValueStock">0.98%</p>
//                     </div>
//                 </div>

//             </div>
//             <div className="Card_outer">
//                 <div className="cards_Div" onClick={Charthandler('HDFCBANK', this)} id='HDFCBANK'>
//                     <div className="LogoStock">

//                     </div>
//                     <div className="StockDetail">
//                         <p className="SymbolStock">HDFCBANK</p>
//                         <p className="ValueStock">0.98%</p>
//                     </div>
//                 </div>

//             </div>
//             <div className="Card_outer">
//                 <div className="cards_Div" onClick={Charthandler('AXISBANK', this)} id='AXISBANK'>
//                     <div className="LogoStock">

//                     </div>
//                     <div className="StockDetail">
//                         <p className="SymbolStock">AXISBANK</p>
//                         <p className="ValueStock">0.98%</p>
//                     </div>
//                 </div>

//             </div>
//         </div>
//         <div className="ChartOuter" id='vv'>
//             <div className='tradingview-widget-container'>
//                 <div id='tradingview_ad97e' />
//             </div>

//         </div>
//     </>
//     )
// }

// export default GainersCards
import React, { useEffect, useRef, useState } from 'react';
import '../../Css/Gainers_chart_home.css';

let tvScriptLoadingPromise;

const GainersCards = () => {
    const [symbol, setSymbol] = useState('SENSEX');
    const [activeCard, setActiveCard] = useState('SENSEX');
    const onLoadScriptRef = useRef();

    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => (onLoadScriptRef.current = null);

        function createWidget() {
            if (document.getElementById('tradingview_ad97e') && 'TradingView' in window) {
                new window.TradingView.widget({
                    width: '100%',
                    height: '100%',
                    symbol: symbol, // Use the state value here
                    interval: 'D',
                    timezone: 'Asia/Kolkata',
                    theme: 'dark',
                    style: '3',
                    locale: 'en',
                    toolbar_bg: '#f1f3f6',
                    enable_publishing: false,
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    hide_top_toolbar: true,
                    hide_legend: true,
                    save_image: false,
                    container_id: 'tradingview_ad97e',
                });
            }
        }
    }, [symbol]); // Include 'symbol' in the dependencies array to re-render the TradingView chart when it changes

    const Charthandler = (symbol) => {
        setSymbol(symbol);
        setActiveCard(symbol);
    };

    return (
        <>
            <div className="outer">
                <div className="Card_outer ">
                    <div className={`cards_Div ${activeCard === 'SENSEX' ? 'active' : ''}`} onClick={() => { Charthandler('SENSEX') }} id="SENSEX">
                        <div className="LogoStock"></div>
                        <div className="StockDetail">
                            <p className="SymbolStock">SENSEX</p>
                            {/* <p className="ValueStock">0.98%</p> */}
                        </div>
                    </div>
                </div>

                <div className="Card_outer">
                    <div className={`cards_Div ${activeCard === 'ADANIENT' ? 'active' : ''}`} onClick={() => Charthandler('ADANIENT')} id='ADANIENT'>
                        <div className="LogoStock">

                        </div>
                        <div className="StockDetail">
                            <p className="SymbolStock">ADANIENT</p>
                            {/* <p className="ValueStock">0.98%</p> */}
                        </div>
                    </div>

                </div>
                <div className="Card_outer">
                    <div className={`cards_Div ${activeCard === 'HDFCBANK' ? 'active' : ''}`} onClick={() => Charthandler('HDFCBANK')} id='HDFCBANK'>
                        <div className="LogoStock">

                        </div>
                        <div className="StockDetail">
                            <p className="SymbolStock">HDFCBANK</p>
                            {/* <p className="ValueStock">0.98%</p> */}
                        </div>
                    </div>

                </div>
                <div className="Card_outer">
                    <div className={`cards_Div ${activeCard === 'AXISBANK' ? 'active' : ''}`} onClick={() => Charthandler('AXISBANK')} id='AXISBANK'>
                        <div className="LogoStock">

                        </div>
                        <div className="StockDetail">
                            <p className="SymbolStock">AXISBANK</p>
                            {/* <p className="ValueStock">0.98%</p> */}
                        </div>
                    </div>

                </div>
            </div>
            <div className="ChartOuter" id="vv">
                <div className="tradingview-widget-container">
                    <div id="tradingview_ad97e" />
                </div>
            </div>
        </>
    );
};

export default GainersCards;
