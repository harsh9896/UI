import React, { useEffect, useState } from 'react'
import { buyArticleforCustomer, retrieveAllArticlesForCustomer, retrieveArticlesForCustomer, retrieveSingleArticleForCustomer, startPayment } from './api/api'
import { useAuth } from './AuthContext'

export default function ArticlesComponent() {

  // const [message, setMessage] = useState(null)
  
  const [articles, setArticles] = useState([])

  const [customerArticles, setCustomerArticles] = useState([])

  const authContext = useAuth()

  const userName= authContext.userName



  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
}, []);


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

function payment(id)
{
  const newArr= customerArticles.map((response)=> response.id)
  if(newArr.includes(id))
  { 
    return;
  }
  const deleteArticle = articles.filter(article=>article.id==id);
  //console.log(deleteArticle[0].price)
  const data = deleteArticle[0].price
  startPayment(userName, data)
  .then((response)=>{ 
    if(response.data.status=="created")
    {
      console.log(response)
      var options = {
        "key": "rzp_test_K4NpbduVrnlxyr", // Enter the Key ID generated from the Dashboard
        "amount": response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Article Shop",
        "description": "Test Transaction",
        "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature)
            buyArticle(id)
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      return 0
    });
    rzp1.open();    
    }
  })
  .catch((error)=>console.log(error))
}

 function buyArticle(id)
  {
    const newArr= customerArticles.map((response)=> response.id)
    if(!newArr.includes(id))
    { 
      retrieveSingleArticleForCustomer(id)
      .then((response)=> {
        //console.log("before")
        setCustomerArticles(customerArticles.concat(response.data))
      })
      .catch((error)=>console.log(error))
      buyArticleforCustomer(userName, id)
      .then((response)=> {
        console.log(response)
        initailizeArticles()
      })
      .catch((error)=>console.log(error))
    }
    
  }



//const {userName}= useParams();
  return (
    <div>
      <><script src="https://checkout.razorpay.com/v1/checkout.js"></script></>
        <div><h1>Welcome {userName}</h1></div>
        <div className="card-columns">
        {  
            
            articles.map((article)=>(
            <div className="card" key= {article.id} style={{width: "30rem", padding: "20", margin: "20"}}>
            <div className="card-body"key={article.id}>
            <h5 className="card-titl\e">{article.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Price {article.price}</h6>
            <p className="card-text">{article.description}</p>
            {(!customerArticles.map(article=>article.id).includes(article.id)&&<button type="button" className="btn btn-primary" onClick={(event)=>payment(article.id)}>Buy</button>)
            ||(customerArticles.map(article=>article.id).includes(article.id)&&<button type="button" className="btn btn-primary" onClick={(event)=>payment(article.id)}>open</button>)}
            </div>
            </div>
        )
        )
        }
        </div>
        
    </div>
  )
}
