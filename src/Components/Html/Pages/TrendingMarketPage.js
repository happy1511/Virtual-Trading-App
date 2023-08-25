import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../Css/Tpage.css'
import TpCard from '../JS/TpCard'
import axios from 'axios'

const TrendingMarketPage = () => {
    const [Indices, setIndices] = useState([])
    const [AllIndicesStock, setAllIndicesStock] = useState({})
    // useEffect(() => {
    //     axios.get('/api/allIndices').then((response) => {
    //         setIndices((response.data).map((ele) => { ele.indexSymbol }))
    //     }).catch((error) => { console.log(error) })
    // }, [])

    useEffect(() => {
        const interval = setInterval(() => {

            const url = 'http://localhost:3000/api/mostActive/nifty%2050'
            axios.get(url).then((res) => {
                setAllIndicesStock({ ...AllIndicesStock, ["Nifty 50"]: res })
                console.log(AllIndicesStock)
            }).catch((error) => {
                console.log(error)
            })

        }, 1000);

        return (clearInterval(interval))
    }, [])
    console.log(AllIndicesStock)
    return (
        <>
            <div style={{ backgroundColor: "black" }}>

                <Header />
                <div className="Div1Tp">
                    <div className="Div2OTp">

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default TrendingMarketPage
