import React, { createRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import axios from 'axios';

const ChartR = (props) => {
    const chartRef = createRef();
    let myChart = null; // Reference to the Chart instance
    const [stockprice, setstockprice] = useState([])
    const [Color, setColor] = useState('red')
    // useEffect(()=>{
    //     console.log('changed')
    //     FetchDate()
    // },[selectedchart])
    const createGradient= (startColor, endColor , ctx) => {
        var gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust gradient dimensions
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        return gradient;
    }
    const formatDateToYYYYMMDD = (date) => {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const buildChart = () => {
        const myChartRef = chartRef.current.getContext('2d');

        // Destroy previous chart instance if it exists
        if (myChart !== null) {
            myChart.destroy();
        }


        myChart = new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: props.historical === 0 ? stockprice.map((res) => new Date(res[0])) : stockprice.map((res) => res.CH_TIMESTAMP),
                datasets: [
                    {

                        data: props.historical === 0 ? stockprice.map((res) => res[1]) : stockprice.map((res) => res.CH_CLOSING_PRICE),
                        backgroundColor: createGradient(Color, 'transparent',myChartRef),
                        borderColor: Color,
                        borderWidth: 1,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                animation:false,
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        fill:true,
                    }
                },
                plugins: {
                    annotation: {
                        enabled: false ,
                    },
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    y: {
                        display: true,
                        ticks: {
                            color: 'white',
                        },

                    },
                    x: {
                        display: false
                    }
                },
            },
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/equity/intraday/${props.data}?preOpen=false`);
                setstockprice(response.data.grapthData);  
                (stockprice[0][1] > stockprice[stockprice.length-1][1])?setColor('red'):setColor('green')
                // Build the chart using the updated stockprice
            } catch (error) {
                console.error(error);
            }
        };

        const FetchDate = async () => {
            if (props.historical === 0) {
                fetchData();
            }
            else if (props.historical === 1) {
                var currentDate = new Date();

                // Calculate the date 5 days ago
                var fiveDaysAgo = new Date();
                fiveDaysAgo.setDate(currentDate.getDate() - 5);

                // Format the dates in yyyy-mm-dd format
                var formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
                var formattedFiveDaysAgo = formatDateToYYYYMMDD(fiveDaysAgo);
                try {
                    const response = await axios.get(`/api/equity/historical/adanient?dateStart=${formattedFiveDaysAgo}&dateEnd=${formattedCurrentDate}`);
                    setstockprice(response.data[0].data);
                } catch (error) {
                    console.log(error);
                }
            }
            else if (props.historical === 2) {
                var currentDate = new Date();

                // Calculate the date 5 days ago
                var fiveDaysAgo = new Date();
                fiveDaysAgo.setDate(currentDate.getMonth() - 1);

                // Format the dates in yyyy-mm-dd format
                var formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
                var formattedFiveDaysAgo = formatDateToYYYYMMDD(fiveDaysAgo);
                try {
                    const response = await axios.get(`/api/equity/historical/adanient?dateStart=${formattedFiveDaysAgo}&dateEnd=${formattedCurrentDate}`);
                    setstockprice(response.data[0].data);
                    console.log(stockprice)
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                var currentDate = new Date();

                // Calculate the date 5 days ago
                var fiveDaysAgo = new Date();
                fiveDaysAgo.setDate(currentDate.getMonth() - 6);

                // Format the dates in yyyy-mm-dd format
                var formattedCurrentDate = formatDateToYYYYMMDD(currentDate);
                var formattedFiveDaysAgo = formatDateToYYYYMMDD(fiveDaysAgo);
                try {
                    const response = await axios.get(`/api/equity/historical/adanient?dateStart=${formattedFiveDaysAgo}&dateEnd=${formattedCurrentDate}`);
                    setstockprice(response.data[0].data);
                    console.log(stockprice)
                    console.log(stockprice[0].CH_CLOSING_PRICE > stockprice[stockprice.length - 1].CH_CLOSING_PRICE)
                     
                } catch (error) {
                    console.log(error);
                }
            }
        }
        FetchDate()
        setInterval(() => {
            FetchDate()
        }, 5000);
        // Clean up function to destroy the chart instance when the component unmounts

    }, [props.historical]);

    // ... later in the component

    // If you need to use the updated stockprice value in other parts of your component,
    // do so within the render or other useEffects, as stockprice might not be immediately updated here.
    // For example:
    useEffect(() => {
        buildChart();
        return () => {
            if (myChart !== null) {
                myChart.destroy();
            }
        }; // This should show the updated value

    }, [stockprice]);
    useEffect(()=>{
        if (props.historical !== 0){
            (stockprice[0].CH_CLOSING_PRICE > stockprice[stockprice.length - 1].CH_CLOSING_PRICE) ? setColor('red') : setColor('green')
        }
        else{
            
        }
    },[stockprice])
    console.log(stockprice.priceInfo?.pChange)

    return (

        <canvas ref={chartRef} style={{ height: '100% !important', width: '100% !important' }} />

    );
};

export default ChartR;
