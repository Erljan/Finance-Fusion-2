import { api } from "../api"
import { useState, useEffect } from "react"

export const NewsDashboard = () => {
    const [news, setNews] = useState([])

    useEffect(()=> {
        getNews()
        // console.log(news)
    }, [])

    const getNews = async()=>{

        try {
            const response = await api.get("api/news/")

            setNews(response.data.news)
            console.log(news)

            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="newsdash-container">
        {news.map((n, idx) => (
            <div className="news-panel" key={idx}>
                <img src={n.image} alt="" className="news-img"/>
                <h6 className="news-headline">
                    <a href={n.url} target="_blank">
                        {n.headline}
                    </a>
                </h6>
                <hr />
            </div>
        ))}
    </div>
  )
}
