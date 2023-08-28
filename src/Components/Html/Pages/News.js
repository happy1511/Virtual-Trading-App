import React, { useEffect, useState } from 'react'
import Header from '../Header'
import '../../Css/NewsPage.css'
import NewsCardNewsPage from '../JS/NewsCardNewsPage'
import Footer from '../Footer'
const News = () => {
  const [DataNews, setDataNews] = useState([])

  useEffect(() => {
    async function fetchNews() {
      const url = 'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=aa645100abd64084b8f46be432b080b7';

      try {
        const response = await fetch(url);
        const result = await response.json();
        // const newsStream = (JSON.parse(result)).data.main.stream;
        console.log(result)
        setDataNews(result.articles)
        console.log(DataNews)
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchNews();
  },[])
  return (
    <>
      <Header />
      <div className='NewsPageOuterDiv'>
        {
          DataNews.map((data, index) => {
            return (
              <NewsCardNewsPage key={index} data={data}/>
            )
          })
        }
      </div>
      <Footer />
    </>
  )
}

export default News
