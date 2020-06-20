const http = require('http')
const fs = require('fs')
const path = require('path')
const { extname } = require('path')



http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    const extname = path.extname(filePath)

    const allowedFileTypes = ['.html', '.js', '.css']
    const allowed = allowedFileTypes.find(item => item == extname )

    if(!allowed) return

    fs.readFile(
        filePath,
        (err, content) => {
            if (err) throw err

            res.end(content)
        }
    )
}).listen(8000, () => console.log('server running at: http://localhost:3000'))