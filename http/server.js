const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res)  => {
    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', 'index.html')
    const extname = path.extname(filePath)

    const allowedFiles = ['.html', '.css', '.js']
    const allowed = allowedFiles.find( item => item == extname)

    if (!allowed) return 

    if(req.url === '/') {
        fs.readFile(filePath,
        (err, content) => {
            if (err) throw err;

            res.end(content)
        }
        
        )
    }
}).listen(3333, () => console.log('Server is Running'));