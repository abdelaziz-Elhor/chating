const mongoCleint = require("mongodb").MongoClient
const express = require("express")
const app = express()
const multer = require('multer')
const upload = multer()
let router = express.Router()
const bodyParser = require("body-parser")
let url = "mongodb+srv://zizo--:741852@chat.npitnxe.mongodb.net/?retryWrites=true&w=majority"
let client = new mongoCleint(url, {
    family: 4,
})
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    next()
})
app.use(router)
app.get("/get", upload.array(), (req, res) => {

    client.connect().then((client) => {
        let db = client.db("chat")
        db.collection("chat").find({}).toArray().then((data) => {
            res.json(data)
            //setTimeout(() => { client.close() }, 1500)
        }).catch(err => {
            console.log("ssssssss" + err)
        })

    }).catch(err => {
        console.log("ssssssss" + err)
    })
})
app.get("/get/:id", upload.array(), (req, res) => {
    let id = req.params.id

    client.connect().then((client) => {
        let db = client.db("chat")
        db.collection(`chat-${id}`).find({}).toArray().then((data) => {
            res.json(data)
            //setTimeout(() => { client.close() }, 1500)
        }).catch(err => {
            console.log("ssssssss" + err)
        })

    }).catch(err => {
        console.log("ssssssss" + err)
    })
})
router.post("/add", (req, res, next) => {
    console.log(req.body)
    const all = req.body
    client.connect().then((client) => {
        let db = client.db("chat")


        db.collection("chat").insertOne(all)
            .catch(err => {
                console.log(err)
            })
    }).catch(err => {
        console.log("ssssssss" + err)
    })
})
router.post("/add/:id", (req, res, next) => {
    let id = req.params.id
    console.log(req.body)
    const all = req.body
    client.connect().then((client) => {
        let db = client.db("chat")


        db.collection(`chat-${id}`).insertOne(all)
            .catch(err => {
                console.log(err)
            })
    }).catch(err => {
        console.log("ssssssss" + err)
    })
})
// app.post("/add", (req, res) => {
//     console.log("ss")
//     console.log(req.body)

// })




app.listen(process.env.PORT || 6060)