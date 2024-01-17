const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const url = 'https://www.bbc.com/'

axios(url)
       .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        const article = []

        $('.media__title', html).each(function(){
           const title =  $(this).find('a').text()
           const link = $(this).find('a').attr('href')

         article.push({
            title,
            link
            
        })   
        })

        app.get('/', (req, res)=>{
            res.send(article)
        })

       })

app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))