// const fs = require("fs");
// const fsPromises = require("fs").promises;
// const logEvent = require("./logEvents");
// const EventEmitter = require("events");
// class Emitter extends EventEmitter {};
// // initialize object
// const myEmitter = new Emitter();
// const PORT = process.env.PORT | 3500;
// const server = http.createServer((req,res) => {
//     console.log(req.url,req.method);
//     const extension = path.extname(req.url);
//     let contentType;
    
// });

// MiddleWare

// A middleware is anything that is between a request and a response;
// There are 3 types of middlewares => 1.BuiltIn middlewares, 2.Custom middlewares, 3.Third party middlewares

// 1. BuiltIn middleware
// In other words it is form data
// 'content-type: application/x-www-form-encoded'
// app.use(express.urlencoded({extended: false}));

// // built in middleware for json
// app.use(express.json())

// // serve static files
// app.use(express.static(path.join(__dirname, '/public')))

const express = require("express");
const cors = require("cors");
// const products = require("./products");
const app = express();
// const errorHandler = require("./middleware/errorHandler");
const product = require("./routes/productsRoute");
const redirect = require("./routes/redirect");
const employeesData = require("./routes/api/employees");
const registerNewUser = require("./routes/register");
const handleLogin = require("./routes/login");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
app.use(cors(corsOptions))
// if you are creating a public api using this will be fine
app.use(cors());
app.use(express.json())
// app.use(errorHandler)

// Custom Middleware
// app.use((req,res,next) => {
//     console.log(req.method,req.path);
//     next()
// })

// Routing
app.use("/products", product)
app.use("/products", redirect)
app.use("/employees", employeesData)
app.use("/register", registerNewUser);
app.use("/login", handleLogin);

app.get("/", (req,res) => {
    res.send("Hello Express")
});
// app.get("/products", (req,res) => {
//     res.send(products)
// });

//Page not found

app.get('/*', (req,res) => {
    res.status(404).send("Page not Found")
})

//redirect

// app.get("/item", (req,res) => {
//     res.redirect(301,"/products")
// })

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})

// add listener for the log event
// myEmitter.on('log', (msg) => logEvent(msg))
// setTimeout(() => {
//     myEmitter.emit('log', 'log event emitted')
// },2000);