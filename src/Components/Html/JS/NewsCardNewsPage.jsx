import React from 'react'
import '../../Css/NewsPage.css'

const NewsCard_NewsPage = (props) => {
    return (
        
            props.data.content ? <>
                <a href={props.data.url} className='NewsdataLink' target='_blank'>
                    <div className='NewsCardPageOuter'>
                        <div className="DataNews">
                            {props.data.title ? <h4>{props.data.title}<br/>{props.data.description}</h4> : <h4>{props.data.description}</h4>}
                            <p>Author : {props.data.author}</p>
                        </div>
                        <div className="ImageNews">
                            {props.data.urlToImage ? <><img src={props.data.urlToImage ? props.data.urlToImage : ""} alt="" /></> : ""}
                        </div>
                    </div>
                </a>
            </> : ''
        
    )
}

export default NewsCard_NewsPage
