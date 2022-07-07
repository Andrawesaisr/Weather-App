const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6fb91f3ff2e75cf22a6f6fcf6ee795f2&query='+latitude+','+longitude+'&units=f'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!!',undefined)
        }else if(body.error){
            callback('Unable to find the location!!',undefined)
        }else{
            callback(undefined,'It is currently '+body.current.temperature+' degree out.'+'there is a '+body.current.precip+' chance of rain.')
        }
    })
    }

    module.exports=forecast