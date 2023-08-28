import React, { useEffect, useState } from 'react'
import '../../Css/PortFolio.css'
import Header from '../Header'
import Footer from '../Footer'
import { auth, db } from '../../../utilitise/Firebase'
import Login from './Login'
import { onValue, ref } from 'firebase/database'
import ActivePositions from '../JS/ActivePositions'
const Portfolio = () => {
  const [PortFolioValue, setPortFolioValue] = useState(0)
  const [ProfitOrLose, setProfitOrLose] = useState(0)
  const Portfoliovaluefetch = () => {
    onValue(ref(db, 'users' + auth.currentUser.uid + '/portfolio'), (res) => {
      setPortFolioValue(res.val().availableMoney)
    })
  }

  useEffect(() => {
    Portfoliovaluefetch();
  })
  return (

    <>
      {auth.currentUser ?
        <div className='PortfolioPageOuter'>
          <Header />
          <div className="PortfolioPageInner">
            <div className="PortFolioValueDiv">
              <div className="PortFolioChooseButtonDiv">
                <h4>Paper Trade</h4>
                <button className='PortFolioChooseButton PortFolioChooseButtonActive'><h3>Positions</h3>Active Trades</button>
                <button className='PortFolioChooseButton'><h3>Performance</h3>Past Trades</button>
              </div>
              <div className="NewTradeButtonDiv">
                <ActivePositions/>
              </div>
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
