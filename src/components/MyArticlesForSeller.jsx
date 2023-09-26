import React, { useEffect, useState } from 'react'
import { deleteArticleForSeller, retrieveAllArticlesForSeller } from './api/api'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'


export default function MyArticlesForSeller() {

  // const [message, setMessage] = useState(null)

  const [articles, setArticles] = useState([])
  
  const authContext = useAuth()

  const userName= authContext.userName

  const navigate = useNavigate()
  
  function initailizeArticles()
  {
    console.log(userName)
    retrieveAllArticlesForSeller(userName)
    .then((response)=> setArticles(response.data))
    .catch((error)=>console.log(error))

  }

  function deleteArticle(id)
  {
    deleteArticleForSeller(userName, id)
    .then((response)=> {
      console.log(response)
      initailizeArticles()
    })
    .catch((error)=>console.log(error))
    
  }

  function updateArticle(id)
  {
    navigate(`/Article/${id}`)
    
  }

  useEffect(()=>initailizeArticles(),[])

  return (
    <div>
        <div><h1>Welcome {userName}</h1></div>
        <div className="card-columns">
        {  
            
            articles.map((article)=>(
            <div className="card" key= {article.id} style={{width: "30rem", padding: "20", margin: "20"}}>
            <div className="card-body"key={article.id}>
            <h5 className="card-titl\e">{article.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Price {article.price}</h6>
            <p className="card-text">{article.description}</p>
            <button type="button" className="btn btn-success m-3"onClick={() => updateArticle(article.id)}>Update</button>
            <button type="button" className="btn btn-danger m-3" onClick={() => deleteArticle(article.id)}>Delete</button>
            </div>
            </div>
        )
        )
        }
        </div>
        
    </div>
  )
}
