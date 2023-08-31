import React, { useEffect, useState } from 'react'
import '../../Css/Trending.css'
import Header from '../Header'
import Footer from '../Footer'
import AllIndicesCard from '../JS/AllIndicesCard'
import axios from 'axios'
import MostActiveTrendingPage from '../JS/MostActiveTrendingPage'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

const Trending = () => {
  const [selectedindices, setselectedindices] = useState('nifty 50')
  const [Allindices, setAllindices] = useState([])
  const [selectedIndicesTopGL, setselectedIndicesTopGL] = useState('nifty 50')
  const [byVolume, setbyVolume] = useState([])
  const [byValue, setbyValue] = useState([])
  const [gainers, setgainers] = useState([])
  const [Loosers, setLoosers] = useState([])
  const h = window.innerWidth - 60
  const splideOptions = {
    // Or 'loop' depending on your use case
    arrows: false,
    pagination: false,
    type: '',
    wheel: true,
    perPage: calculateCardsPerPage()

  };
  function calculateCardsPerPage(screenWidth = window.innerWidth) {
    const cardWidth = 250; // Set your card width in pixels
    const gap = 0; // Set any gap/margin between cards

    // Calculate the number of cards that can fit on the screen
    return Math.floor(screenWidth / (cardWidth + gap));
  }
  const fetchindices = () => {
    const url = '/api/allIndices'
    axios.get(url).then((res) => {
      setAllindices(res.data.data)
      setselectedindices(res.data.data[0].indexSymbol)
    }).catch((err) => {
      console.error(err)
    })
  }
  const fetchselected = () => {
    const url = '/api/mostActive/' + selectedindices.toLowerCase()
    axios.get(url).then((res) => {
      setbyVolume(res.data.byVolume)
      setbyValue(res.data.byValue)
    }).catch((err) => {
      console.error(err)
    })
  }

  const fetchGL = () => {
    const surl = '/api/gainersAndLosers/' + selectedIndicesTopGL.toLowerCase()
    axios.get(surl).then((res) => {
      setgainers(res.data.gainers)
      setLoosers(res.data.losers)
    }).catch((err) => {
      console.error(err)
    })
  }
  const handleindiceschange = (e) => {
    setselectedindices(e.target.value)
  }
  const handleindiceschangeTopGL = (e) => {
    setselectedIndicesTopGL(e.target.value)
  }
  useEffect(() => {
    fetchindices();
    fetchselected();
    fetchGL();

    setInterval ( () => {
      fetchselected();
      fetchGL();
    },1000)
  }, [])

  useEffect(() => {
    fetchselected();
  }, [selectedindices])

  useEffect(() => {
    fetchGL();
  }, [selectedIndicesTopGL])
  return (
    <>
      <Header />
      <div className="OuterTrendingPage">
        <div className="SearchIconTrendingPage">
          <svg viewBox="0 0 30 25" height='30px' width='30px' fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <input type="text" />
          <div className='inputTrendingButton'>Search</div>
        </div>
        <h2 className='TrendingPageHeaders'>All Indices</h2>
        <div className="AllIndicesDiv">
          <Splide options={splideOptions}>

            {Allindices.map((data, index) => (
              <SplideSlide key={index}>
                {/* Log a message to check if the slide is being rendered */}
                <AllIndicesCard data={data} />
              </SplideSlide>
            ))}

          </Splide>
        </div>
        <h2 className='TrendingPageHeaders'>Most Active Stocks</h2>
        <select name="" id="" className='optionIndices' onChange={handleindiceschange}>
          {Allindices.map((data) => {
            return (
              <option value={data.indexSymbol}>{data.indexSymbol}</option>
            )
          })}
        </select>
        <h3 className='TrendingPageHeaders'>By Volume</h3>
        <div className="MostActiveDiv">
          <Splide options={splideOptions}>

            {

              (byVolume).map((data, index) => {
                return (
                  <>
                    <SplideSlide key={index}>
                      <MostActiveTrendingPage key={index} data={data} />
                    </SplideSlide >
                  </>
                )
              })

            }
          </Splide>
        </div>
        <h3 className='TrendingPageHeaders'>By Value</h3>
        <div className="MostActiveDiv">
          <Splide options={splideOptions}>

            {
              (byValue).map((data, index) => {
                return (
                  <>
                    <SplideSlide key={index}>
                      <MostActiveTrendingPage key={index} data={data} />
                    </SplideSlide>
                  </>
                )
              })
            }
          </Splide>
        </div>
        <h2 className='TrendingPageHeaders'>Top Gainers & Loosers</h2>

        <select name="" id="" className='optionIndices' onChange={handleindiceschangeTopGL}>
          {Allindices.map((data) => {
            return (
              <option value={data.indexSymbol}>{data.indexSymbol}</option>
            )
          })}
        </select>
        <h3 className='TrendingPageHeaders'>Top Gainers</h3>
        <div className="MostActiveDiv">
          <Splide options={splideOptions}>

            {
              (gainers).map((data, index) => {
                return (
                  <>
                    <SplideSlide key={index}>
                      <MostActiveTrendingPage key={index} data={data} />
                    </SplideSlide>
                  </>
                )
              })
            }
          </Splide>
        </div>
        <h3 className='TrendingPageHeaders'>Top Loosers</h3>
        <div className="MostActiveDiv">
          <Splide options={splideOptions}>

            {
              (Loosers).map((data, index) => {
                return (
                  <>
                    <SplideSlide key={index}>
                      <MostActiveTrendingPage key={index} data={data} />
                    </SplideSlide>
                  </>
                )
              })
            }
          </Splide>
        </div>

      </div >
      <Footer />
    </>
  )
}

export default Trending
