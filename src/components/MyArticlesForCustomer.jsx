import React, { useEffect, useState } from "react";
import { retrieveArticlesForCustomer } from "./api/api";
import { useAuth } from "./AuthContext";

export default function MyArticlesForCustomer() {
  // const [message, setMessage] = useState(null)

  const [articles, setArticles] = useState([]);

  const authContext = useAuth();

  const userName = authContext.userName;

  function initailizeArticles() {
    retrieveArticlesForCustomer(userName)
      .then((response) => setArticles(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => initailizeArticles(), []);

  //const {userName}= useParams();
  return (
    <div>
      <div>
        <h1>Welcome {userName} </h1>
      </div>
      <div className="card-columns">
        {articles.length > 0 &&
          articles.map((article) => (
            <div
              className="card"
              key={article.id}
              style={{ width: "30rem", padding: "20", margin: "20" }}
            >
              <div className="card-body" key={article.id}>
                <h5 className="card-titl\e">{article.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Price {article.price}
                </h6>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.viewURL}
                  download={
                    (article.attachment != null &&
                      article.attachment.fileName) ||
                    ""
                  }
                  target="_blank"
                >
                  <button type="button" className="btn btn-success mx-3">
                    View
                  </button>
                </a>
                <a
                  href={article.downloadURL}
                  download={
                    (article.attachment != null &&
                      article.attachment.fileName) ||
                    ""
                  }
                  target="_blank"
                >
                  <button type="button" className="btn btn-primary mx-3">
                    Download
                  </button>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
