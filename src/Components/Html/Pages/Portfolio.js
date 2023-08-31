import React, { useEffect, useState } from 'react'
import '../../Css/PortFolio.css'
import Header from '../Header'
import Footer from '../Footer'
import { auth, db } from '../../../utilitise/Firebase'
import Login from './Login'
import { onValue, ref } from 'firebase/database'
import ActivePositions from '../JS/ActivePositions'
import Performance from '../JS/Performance'
import { useActivePill } from '../JS/HomeHook'
const Portfolio = () => {
  // const [activePill, setActivePill] = useActivePill('PortFolio')
  // useEffect(() => {
  //   setActivePill('PortFolio')
  // })

  const [PortFolioValue, setPortFolioValue] = useState(0)
  const [ProfitOrLose, setProfitOrLose] = useState(0)
  const [sectionSelection, setsectionSelection] = useState(0)

  const Portfoliovaluefetch = () => {
    onValue(ref(db, 'users/' + auth.currentUser.uid + '/portfolio'), (res) => {
      setPortFolioValue(res.val().availableMoney)
    })
  }
  useEffect(() => {
    Portfoliovaluefetch();
  })

  const handleSectionselection = (e) => {
    if ((Number(sectionSelection) === Number(e))) {
    } else {
      setsectionSelection(!sectionSelection)
    }
  }
  return (

    <>
      {auth.currentUser ?
        <div className='PortfolioPageOuter'>
          <Header />
          <div className="PortfolioPageInner">
            <div className="PortFolioValueDiv">
              <div className="PortFolioChooseButtonDiv">
                <h4>Paper Trade</h4>
                <button className={`PortFolioChooseButton ${!sectionSelection ? 'PortFolioChooseButtonActive' : ''}`} value={0} onClick={() => handleSectionselection(0)}><h3>Positions</h3>Active Trades</button>
                <button className={`PortFolioChooseButton ${sectionSelection ? 'PortFolioChooseButtonActive' : ''}`} value={1} onClick={() => handleSectionselection(1)}><h3>Performance</h3>Past Trades</button>
              </div>
              {!sectionSelection ? <>
                <div className="  NewTradeButtonDiv">
                  <ActivePositions />
                </div>
              </> : <><div className="NewTradeButtonDiv">
                <Performance />
              </div></>}
            </div>
          </div>
          <Footer />
        </div >
        :
        <Login />}

    </>
  )
}

export default Portfolio
