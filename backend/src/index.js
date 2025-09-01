import express from "express"
import { createConnection } from "mysql"
const app = express()
const port = 3000

const db = createConnection({
    host: "mariadb",
    user: "test",
    password: "test",
    database: "projects"
})

db.connect();

app.get('/', (req, res) => {
    const projects = db.query('SELECT * FROM projects', (error, result) => {
        if (!error) {
            res.header("Access-Control-Allow-Origin", "*")
            res.send(result)
        } else {
            res.status(500)
            res.send(error)
        }
    });
})

app.listen(port, () => {
    console.log(`listening on : ${port}`)
})