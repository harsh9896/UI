import React from 'react'
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import LoginComponent from './LoginComponent';
import ArticlesComponent from './ArticlesComponent';
import MyArticlesForCustomer from './MyArticlesForCustomer';
import MyArticlesForSeller from './MyArticlesForSeller';
import ErrorComponent from './ErrorComponent';
import HeaderComponent from './HeaderComponent';
import AuthProvider, { useAuth } from './AuthContext';
import SingleArticle from './SingleArticle';
import Signup from './Signup';



export default function ArticleWebsite() {

  function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    
    if(authContext.isAuthenticated)
        return children
  
    return <Navigate to="/" />
  }

  // const AuthContext= useAuth()
  // const isAuthenticated= AuthContext.isAuthenticated

  // function AuthenticatedRoute({children})
  // {
  //   if(isAuthenticated)
  //   {
  //       return children
  //   }
  //   else
  //   {
  //     return <Navigate to="/"/>
  //   }
  // }

  return (
    <div>
        <AuthProvider>
        <BrowserRouter>
        <HeaderComponent></HeaderComponent>
            <Routes>
                <Route path="" element={<LoginComponent/>}/>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/Articles/:username" element={
                <AuthenticatedRoute>
                <ArticlesComponent/>
                </AuthenticatedRoute>
                }/>
                <Route path="/MyArticlesForCustomer" element={
                <AuthenticatedRoute>
                  <MyArticlesForCustomer/>
                  </AuthenticatedRoute>
                }/>
                <Route path="/MyArticlesForSeller/:username" element={
                <AuthenticatedRoute>
                <MyArticlesForSeller/>
                </AuthenticatedRoute>
              }/>
              <Route path="/Article/:id" element={
                <AuthenticatedRoute>
                  <SingleArticle/>
                  </AuthenticatedRoute>
                }/>
                <Route path="*" element={
                <AuthenticatedRoute>
                <ErrorComponent/>
                </AuthenticatedRoute>
              }/>
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    </div>
  )
}
