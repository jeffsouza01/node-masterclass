const http = require('http')
const URL = require('url')
const path = require('path')
const fs = require('fs')
const data = require('./urls.json');

// Delete and create file
function updateFile(cb) {
    fs.updateFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        error => {
            if(error) throw error

            cb(JSON.stringify({message: "OK"}))
        }
    )
}

http.createServer((req, res)  => {
   const { name, url, del } = URL.parse(req.url, true).query

   // All resources
   if (!name || !url)
        return res.end(JSON.stringify(data))

    if (del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return updateFile((message) => res.end(message))
    }

    
    data.urls.push({name, url})

    return updateFile((message) => res.end(message))

}).listen(3000, () => console.log('API is Running'));