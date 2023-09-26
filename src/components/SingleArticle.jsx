import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import { addSingleArticleForSeller, retrieveSingleArticleForSeller, updateSingleArticleForSeller } from './api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './AuthContext';




export default function SingleArticle() {

const [name, setName] = useState("")
const [price, setPrice] = useState("")
const [description, setDescription] = useState("")

const {id} = useParams()
const authContext = useAuth()
const userName = authContext.userName
const navigate = useNavigate()

useEffect(()=>retriveArticle,[])

function retriveArticle()
{
    if(id!=-1)
    {
        retrieveSingleArticleForSeller(userName, id)
        .then((response)=> {
            console.log(response)
            setDescription(response.data.description)
            setPrice(response.data.price)
            setName(response.data.name)
        })
        .catch((error)=>console.log(error))
    }
}

function onSubmit(values)
{
    const article={
        id:id,
        name:values.name,
        description:values.description,
        price: values.price
    }
    if(id!=-1)
    {
        updateSingleArticleForSeller(userName, id, article)
        .then((response)=> {
            navigate(`/MyArticlesForSeller/${userName}`)
        })
        .catch((error)=>console.log(error))
    }
    else
    {
        console.log(article)
        addSingleArticleForSeller(userName,article)
        .then((response)=> {
            navigate(`/MyArticlesForSeller/${userName}`)
        })
        .catch((error)=>console.log(error))
    }

}

function validate(values)
{
    let error={}
    if(values.name.length<3)
    error.name= "Name: Enter at least 3 Characters"
    
    if(values.description.length<5)
    error.description= "Description: Enter at least 5 Characters"

    if(values.price<0)
    error.price="Price: Enter non-zero value for price"

    return error
}

  return (
    <div>
        <Formik initialValues={{name, price, description}}
        enableReinitialize= {true}
        onSubmit={onSubmit}
        validate={validate}
        >
            {
            (props) =>(
                <Form>
                    <ErrorMessage
                    name="name"
                    component="div"
                     className='alert alert-warning'
                    />
                    <ErrorMessage
                    name="price"
                    component="div"
                     className='alert alert-warning'
                    />
                    <ErrorMessage
                    name="description"
                    component="div"
                     className='alert alert-warning'
                    />
                    <fieldset className="form-group"> 
                        <label>Name</label>
                        <Field type= "text" className="form-control" name="name"></Field>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Price</label>
                        <Field type= "number" className="form-control" name="price"></Field>
                    </fieldset>
                    <fieldset className="form-group"> 
                        <label>Description</label>
                        <Field type= "text" className="form-control" name="description"></Field>
                    </fieldset>
                    <button  type="submit" className="btn btn-success"> Submit </button>
                </Form>
            )}
        </Formik>
    </div>
  )
}
