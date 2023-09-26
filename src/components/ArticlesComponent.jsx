import React, { useEffect, useState } from 'react'
import { buyArticleforCustomer, retrieveAllArticlesForCustomer, retrieveArticlesForCustomer, retrieveSingleArticleForCustomer } from './api/api'
import { useAuth } from './AuthContext';


export default function ArticlesComponent() {

  // const [message, setMessage] = useState(null)
  
  const [articles, setArticles] = useState([])

  const [customerArticles, setCustomerArticles] = useState([])

  const authContext = useAuth()

  const userName= authContext.userName




  useEffect(()=>initailizeArticles(),[])
  
  function initailizeArticles()
  {
    retrieveAllArticlesForCustomer()
    .then((response)=> {
      setArticles(response.data)
    })
    .catch((error)=>console.log(error))

    retrieveArticlesForCustomer(userName)
    .then((response)=> setCustomerArticles(response.data))
    .catch((error)=>console.log(error))
  }

//   const articles=
//     [{"id": 10001,
//   "price": 100,
//   "description": "This Article is about",
//   "name": "Solve the problems"},
//   {"id": 10002,
//   "price": 500,
//   "description": "This Article is about",
//   "name": "Data Structures"},
// {"id": 10003,
// "price": 200,
// "description": "This Article is about",
// "name": "Algorithms"
// },
// {"id": 10004,
// "price": 400,
// "description": "This Article is about",
// "name": "Mathematics"},
// {"id": 10005,
// "price": 150,
// "description": "This Article is about",
// "name": "Science"
// },
// {"id": 10006,
// "price": 1000,
// "description": "This Article is about",
// "name": "Cooking"},
// {
//     "id": 10007,
//     "price": 700,
//     "description": "This Article is about",
//     "name": "Amazing Problems"
//     }
// ];
 function buyArticle(id)
  {
    const newArr= customerArticles.map((response)=> response.id)
    if(!newArr.includes(id))
    { 
      retrieveSingleArticleForCustomer(userName, id)
      .then((response)=> {
        //console.log("before")
        setCustomerArticles(customerArticles.concat(response.data))
      })
      .catch((error)=>console.log(error))
      buyArticleforCustomer(userName, id)
      .then((response)=> {
        console.log(response)
      })
      .catch((error)=>console.log(error))
    }
  }



//const {userName}= useParams();
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
            {(!customerArticles.map(article=>article.id).includes(article.id)&&<button type="button" className="btn btn-primary" onClick={()=>buyArticle(article.id)}>Buy</button>)
            ||(customerArticles.map(article=>article.id).includes(article.id)&&<button type="button" className="btn btn-primary" onClick={()=>buyArticle(article.id)}>open</button>)}
            </div>
            </div>
        )
        )
        }
        </div>
        
    </div>
  )
}
