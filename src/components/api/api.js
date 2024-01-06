import axios from "axios";

export const apiClient= axios.create(
    {
        baseURL: "http://localhost:8080",
        withCredentials: true
    }
);

 export const retrieveAllArticlesForSeller
 = (username)=> apiClient.get(`/Sellers/${username}/Articles`) 

 export const retrieveAllArticlesForCustomer
 = ()=> apiClient.get(`/Articles`) 

 export const retrieveArticlesForCustomer
 = (username)=> apiClient.get(`/Customers/${username}/Articles`) 

 export const deleteArticleForSeller
 = (username, id)=> apiClient.delete(`/Sellers/${username}/Articles/${id}`) 
 
 export const retrieveSingleArticleForSeller
 = (username, id)=> apiClient.get(`/Sellers/${username}/Articles/${id}`) 

 export const updateSingleArticleForSeller
 = (username, id, article)=> apiClient.put(`/Sellers/${username}/Articles/${id}`, article) 

 export const addSingleArticleForSeller
 = (username, article)=> apiClient.post(`/Sellers/${username}/Articles`, article)

 export const buyArticleforCustomer
 = (username, id)=> apiClient.put(`/Customers/${username}/Articles/${id}`) 

 export const retrieveSingleArticleForCustomer
 = (id)=> apiClient.get(`/Articles/${id}`) 

 export const createCustomer
 = (customer)=> apiClient.post(`/Customers`, customer ,{
    headers:
    {
        Authorization: "Basic " + window.btoa("Harsh" + ":" + "password")
    }
 }) 

 export const createSeller
 = (seller)=> apiClient.post(`/Sellers`, seller,{
    headers:
    {
        Authorization: "Basic " + window.btoa("Harsh" + ":" + "password")
        
    }
 }) 

 export const retrieveSingleSeller
 = (username, token)=> apiClient.get(`/Sellers/${username}`,{
    headers:
    {
        Authorization: token
    }
 })
 
 export const retrieveSingleCustomer
 = (username, token)=> apiClient.get(`/Customers/${username}`,{
    headers:
    {
        Authorization: token
    }
 }) 

 export const basicAuthService
 = (token)=> apiClient.get(`/basicAuth`,{
    headers:
    {
        Authorization: token
    }
 }) 

 
