import React, { useEffect, useState } from 'react'
import './weaher.css'
import search from '../search.png'
import clearimg from '../clear.png'
import hymidity from '../humidity.png'
import wind from '../wind.png'
import cloud from '../cloud.png'
import drizzle from '../drizzle.png'
const Weather = () => {
  const [cityname,setcity]=useState("koppal")
  const [humidity1,sethumidity]=useState('Null')
  const [windspeed1,setwind]=useState('Null')
  const [temp,settemp]=useState('Null')
  const [present,setpre]=useState("Partly cloudy")
  const [imagea,setimagea]=useState(clearimg)
  const [country,setcount]=useState("Null")
  const [region, setregion] = useState("")
  const [searchname,setsearch] = useState("")
  const search12=async()=>{
        const url=`https://api.weatherapi.com/v1/current.json?key=1871891723a74f63b07132925242506&q=${searchname}`
        const doitkn=await fetch(url)
        const data = await doitkn.json();
        if(data.error)
        {
          if(data.error['message']==="Parameter q is missing.")
          {
            alert("city is missing")
          }
          else
          alert(data.error['message'])
          
        }
        else{
        sethumidity(data['current']["humidity"])
        setwind(data["current"]["wind_kph"])
        settemp(data["current"]["temp_c"])
        setpre(data["current"]["condition"]["text"])
        setcount(data["location"]["country"])
        setcity(data["location"]["name"])
        setregion(data['location']['region'])
        }


  }

  useEffect(()=>{
    const func = async () =>{
      try{
        const url=`https://api.weatherapi.com/v1/current.json?key=1871891723a74f63b07132925242506&q=${cityname}`
        const doitkn=await fetch(url)
        const data = await doitkn.json();      
        sethumidity(data['current']["humidity"])
        setwind(data["current"]["wind_kph"])
        settemp(data["current"]["temp_c"])
        setpre(data["current"]["condition"]["text"])
        setcount(data["location"]["country"])
        setregion(data['location']['region'])
        setcity(data["location"]["name"])
    }
    catch (error){

    }
    }

    func();
  },[])
  
  useEffect(()=>{
      if(present==="Partly cloudy" || present==="Cloudy"){
        setimagea(cloud)
      }
      else if (present==="Light rain shower" || present==="Mist" ||present==="Patchy rain nearby"){setimagea(drizzle)}
      else{setimagea(clearimg)}
  },[present])

  return (
    <div className='Weather'>
      <div className="search">
        <input type="text" name="" id="val" placeholder='search' value={searchname} onChange={(e)=>{setsearch(e.target.value)}}/>
        <img src={search} alt="" onClick={()=>{search12()}}/>
      </div>
      <div className='dontkn'>
        <img src={imagea} alt="" className='weatherimg' id="img"/>
        <p className='temp'>{temp}&deg;C</p>
        <div className='location'>
          <p >{cityname},{region},{country}</p>
          <p >{present}</p>
        </div>
        <div className="weatherdata">
          <div className="col">
            <img src={hymidity} alt="" />
            <div>
              <p>{humidity1}%</p>
              <span>Humidity</span> 
            </div>
          </div>
          <div className="col col2">
            <img src={wind} alt="" />
            <div>
              <p>{windspeed1} km/h</p>
              <span>Wind</span> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
