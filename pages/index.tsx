import type { NextPage } from 'next'
import Head from 'next/head'
import React, {useState} from 'react'
import Image from 'next/image'
import { setServers } from 'dns'
import axios from 'axios';
import axiosInstance from './api/search'

const Home: NextPage = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [diet, setDiet] = useState('');
  const [exclude, setExclude] = useState('');
  const [apiResponse, setapiResponse] = useState('');

  const searchTermHandler = (input: any)=>setsearchTerm(input);
  const dietHandler = (input: any)=>setDiet(input);
  const excludeHandler = (input: any)=>setExclude(input);
  const apiResponseHandler = (input: any)=>setapiResponse(input);

  const getReceipes = async ()=>{
    console.log('get receipes called..')
    try{
      diet === 'None' ? (setDiet('')) : null;
    // setLoading(true);

    const response = await axios.get('/api/search/',{
      params: {query: searchTerm,
              diet: diet,
              excludeIngredients: exclude,
              number: "20",
        offset: "0"
            }});
    console.log('respose', response)

    const {data} = response;
    setapiResponse(data.results);
    }
    catch (error){
      console.log(error)
    }
    };

  console.log('searchTerm, diet, exclude', searchTerm, diet,exclude)
  return (
    <div className='flex flex-col h-screen bg-background text-active'>
      <div className='text-secondary  rounded-md m-1 p-1 h-1/4  text-center text-xl font-bold '>Receipe App</div>
      <form className="h-3/4 m-1 p-1 2  rounded-md" onSubmit={(event)=>{
        getReceipes();event.preventDefault(); event.stopPropagation();}}>
        <div className='bg-primary rounded-md m-12 p-2 flex flex-col'>
        <SearchBar termHandler={searchTermHandler}/>
        <Preferences dietHandler={dietHandler} excludeHandler={excludeHandler}/>
        <button className='bg-secondary rounded-md p-2 mt-4 ml-24 mr-24 text-sm font-bold ' type="submit">Search</button>
        </div>
      </form>
      <Response response={apiResponse}/>
      <div className="text-xs h-1/8 rounded-md m-1 p-1  content-center font-bold">
        <div className=''>
          Made by Rohan Shetty
        </div>
      </div>
    </div>
  )
}

const SearchBar = (props: any) => {
  return (
    <div>
      <input className='text-sm  font-bold rounded-md p-2 m-2 text-active bg-background' onChange={(event)=>props.termHandler(event.target.value)} type='text' placeholder='add receipe...'></input>
    </div>
  )
}

const Preferences = (props: any) => {
  return (
    <div className='flex flex-row gap-2  m-2  '>
      <div>
        <select className="text-active bg-background  p-2 text-sm rounded-md " name="diet" onChange={(event)=>props.dietHandler(event.target.value)}>
           {["None", "Pescetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Vegetarian"].map((diet)=><option value={diet} key={diet}>{diet}</option>)}
        </select>
      </div>
      <div >
        <input className='text-sm w-full p-2 text-active bg-background rounded-md pl-1'  onChange={(event)=>props.excludeHandler(event.target.value)} type='text' placeholder='coconut'></input>
      </div>
    </div>
  )
}

const Response = (props: any)=>{
  console.log('api response', props.response)
  
  const returnValue = (props.response) ?
   (
    <div className="grid grid-cols-4 gap-2 text-active m-1 rounded-md">
      {props.response.map(((recipe:any)=>(
        <div className='bg-background pt-6' key={recipe.id}>
          <div className='flex items-center justify-center'>
            <span>
              <img  className="w-full h-full rounded-lg" src={`https://spoonacular.com/recipeImages/`+recipe.image} className="w-full h-full"></img>
            </span>
          </div>
          <div className="text-center items-center">
            <h4 className='mt-4 text-sm font-bold w-full'>{recipe.title}</h4>
            <span className='mt-2 text-xs text-secondary '>
              Ready in {recipe.readyInMinutes} {' '} minutes - {recipe.servings} {' '} Servings 
            </span>
            <a href={recipe.sourceUrl}/>
          </div>
        

        </div>
      )))}

    </div>
  ) : (<div></div>)
  return returnValue;
}


export default Home
