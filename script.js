'use strict'
const getBtnWeather = document.getElementById('Get-weather');
const icon = document.getElementById('weather-icon');
const temp = document.getElementById('temp-div');
const info = document.getElementById('weather-info');
const forecast = document.getElementById('weather-forecast');


getBtnWeather.addEventListener('click',function(){

    const city = document.getElementById('city').value;
    
    if(!city){
        document.querySelector('.message').innerHTML = '<p>please Enter City<p>'
    }else{
        document.querySelector('.message').innerHTML = ''
        document.getElementById('city').value= ""
    }

   



        const showWeather = async function(){
            try{
                const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aba984176dd7f6e6b410ce82495c05f2`);
                const data = await res.json()

                if(data.cod === '404'){
                    info.innerHTML=`<p>${data.message}<p>`
                }else{
                    const cityName = data.name;
                    const description = data.weather[0].description;
                    const iconCode =data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`
                    const temperature = Math.round(data.main.temp);
            
            
                    const temperatureHTML=`<p>${temperature}&degc<p>` 
                    const weatherHTML = `
                    <p> ${cityName}<p>
                    <p> ${description}<p>
                    `
                    temp.innerHTML= temperatureHTML;
                    info.innerHTML= weatherHTML;
                    icon.src=iconUrl;
                    icon.alt =description
                   const icons=`<img id="weather-icon" alt="${description}" scr="${iconUrl}"></img>` 
                   icon.innerHTML = icons


                   showImage()
                }
        
             }catch(err){
                alert('Error fatching cuurent weather data. please try again.')
            }
            
        }
        
        
        
        
        
        const showforecast = async  function (){
            try{
                const rss = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aba984176dd7f6e6b410ce82495c05f2`)
                const datas = await rss.json()
                console.log(datas);

                if(datas.cod === '404'){
                     forecast.innerHTML=`<p>${datas.message}<p>`
                }else{
                    const dat = datas.list.slice(0, 10)

                

                    const next24Hours = dat
                    next24Hours.forEach(function(item){
                        const dateTime = new Date(item.dt * 1000);
                        const hour = dateTime.getHours();
                        const temps = Math.round(item.main.temp);
                        const iconCode = item.weather[0].icon
                        const iconUrl =`https://openweathermap.org/img/wn/${iconCode}@4x.png`
                        const description= item.weather[0].description
    
                        const forecastHTML =`<div class="hourly-item">
                            
                            <p>${hour}:00<p>
                            <img id="weather-icon" alt="${description}" scr="${iconUrl}"></img>
                           <span>${temps}&degc<span>
                            <span>${description}<span>
                            
                            
                     </div>`
    
                    //forecast.innerHTML += forecastHTML;
                    showImage()
                    
                        
                    })
                }
               
            }catch(err){
               
                alert('Error fatching hourly forecast data. please try again.')
            }
        }
        
        
        
    

        function showImage(){
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.style.display= 'block'
        }


        showWeather()
        showforecast()
    


       
        
   


})










