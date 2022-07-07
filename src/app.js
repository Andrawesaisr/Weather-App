const geocode= require('./utils/geocode')
const forecast=require('./utils/forecast')
const express=require('express')
const path=require('path')
const hbs =require('hbs')
const app=express()
// comment about the path ->>
// there's difference between ( __dirname and __filename )
//the filename contain the complete path
//but dirname just to the directory 

// Define path for express config
const publiccc=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

// Setup handelbars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Andrew Aisr'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Andrew Aisr'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
      title:'help page opened',
      name:'Andrew Aisr',
      helpText:'This is some helpful text'
    })
})
 app.use(express.static(publiccc))
 
//app.com
// app.get('',(req,res)=>{
//     res.send('Hello express')
// })


//app.com/help
// app.get('/help',(req,res)=>{
//     res.send('<h1>Help page</h1>')
// })


//app.com/about
// app.get('/about',(req,res)=>{
//     res.send('About page')
// })


//app.com/weather




app.get('/weather',(req,res)=>{
//  if(!req.query.Address){
//   return res.send({
//     error:'Please provide address'
//   })  
//  }
 geocode(req.query.Address,(error,{longitude,latitude,location}={})=>{
    if(error){
        return res.send({
            error:'please provid address'
        })
    }
   forecast(latitude,longitude,(error,forecastData)=>{
       if(error){
           return res.send({
            error:'Please provid address'
           })
       }
       res.send({
        location:location,
        forecast:forecastData,
        address:req.query.Address
       })
       })
        
   })


//  res.send({
//     address:req.query.Address,
//     forecast:'it is snowing',
//     location: 'egypt'
// })
})






app.get('/products',(req,res)=>{
res.send({
    products: []
})
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
    title:'404',
    name:'Andrew Aisr',
    errorMessage:'Help article not found'
   })
})

app.get('*',(req,res)=>{
    res.render('404',{
    title:'404',
    name:'Andrew Aisr',
    errorMessage:'This page not found'
})
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})