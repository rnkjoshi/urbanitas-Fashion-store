const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const {MongoClient} = require('mongodb');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true})
  
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Models
const shopsRoutes = require("./routes/shops-routes");
const dressesRoutes = require("./routes/dresses-routes");
//const usersRoutes = require("./routes/users-routes");
const ownerRoutes = require("./routes/owner-routes");
const HttpError = require("./models/http-error");
const { User } = require('./models/users');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');
const Dress = require('./models/dress')
//Routes
app.use("/api/shops", shopsRoutes);
app.use("/api/dresses", dressesRoutes);
//app.use("/api/users", usersRoutes);
app.use("/api/owners", ownerRoutes);

//HTTP-Headers Configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

// app.use((req, res, next) => {
//     throw new HttpError("Page not found.", 404);
// });
  
// app.use((error, req, res, next) => {
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         console.log(err);
//       });
//     }
//     if (res.headerSent) {
//       return next(error);
//     }
//     res
//       .status(error.code || 500)
//       .json({ message: error.message || "An unknown error occured." });
// });
// =================================
//             PRODUCTS
// =================================

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100&skip=5
app.get('/api/product/articles',(req,res)=>{

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })
})

// app.get('/api/dresses',(req,res)=>{
//     Dress.
//   find().
//   exec((err,articles)=>{
//     if(err) return res.status(400).send(err);
//     console.log("Got dresses.")
//     res.send(articles);
//   })
// })

/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({ '_id':{$in:items}}).
    populate('brand').
    populate('wood').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
});


app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

// =================================
//              WOODS
// =================================

app.post('/api/product/wood',auth,admin,(req,res)=>{
    const wood = new Wood(req.body);

    wood.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            wood: doc
        })
    })
});

app.get('/api/product/woods',(req,res)=>{
    Wood.find({},(err,woods)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(woods)
    })
})


// =================================
//              BRAND
// =================================

app.post('/api/product/brand',auth,admin,(req,res)=>{
    const brand = new Brand(req.body);

    brand.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            brand: doc
        })
    })
})

app.get('/api/product/brands',(req,res)=>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands)
    })
})


// =================================
//              USERS
// =================================

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000"
// }))


app.get('/api/users/auth',auth,(req,res)=>{
    console.log("auth called")
        res.status(200).json({
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            cart: req.user.cart,
            history: req.user.history
        })
})

app.post('/api/users/register',(req,res)=>{
    // console.log(req.body);
    const user = new User(req.body);
    console.log(user);
    console.log("registering");
    user.save((err,user)=>{
        console.log("saving user");
        if(err) {
            console.log("error occured")
            return res.json({success:false,err});
        }
        res.status(200).json({
            success: true,
            userBody:user
        })
    })
});

app.post('/api/users/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:'Auth failed, email not found'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth',user.token,{ maxAge: 9000000, httpOnly: true, withCredentials:true }).status(200).json({
                    loginSuccess: true
                })
                if (typeof localStorage === "undefined" || localStorage === null) {
                    var LocalStorage = require('node-localstorage').LocalStorage;
                    localStorage = new LocalStorage('./scratch');
                }
                // document.cookie('w_auth',user.token,{maxAge:9000000,withCredentials:true}).status(200).json({
                //     isAuth:true,
                //     loginSuccess: true,
                //     userBody:user
                // })
                localStorage.setItem('w_auth',user.token);
                console.log("Cookie set");
            })
        })
    })
})


app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            if (typeof localStorage === "undefined" || localStorage === null) {
                var LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            localStorage.removeItem('w_auth');
            console.log("logging out ")
            //console.log(token)
            return res.status(200).send({
                success: true
            })
        }
    )
})

const port = 5000;
// mongoose
//   .connect(
//     "mongodb+srv://urbanitas:urbanitas789@cluster0-ppw6k.mongodb.net/design?retryWrites=true&w=majority"
//   ,{useNewUrlParser:true})
//   .then(() => {
//     console.log("database connected!");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
mongoose
.connect(
  "mongodb+srv://urbanitas:urbanitas789@cluster0-ppw6k.mongodb.net/design?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology:true }
)
.then(() => {
    console.log("databse connected")
  app.listen(5000);
  console.log("server up")
})
.catch((error) => {
  console.log(error);
});

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function main(){
//     const uri="mongodb+srv://urbanitas:urbanitas789@cluster0-ppw6k.mongodb.net/design?retryWrites=true&w=majority&authSource=admin";
//     const client = new MongoClient(uri);
//     try{
//         await client.connect();

//         await listDatabses(client);
//     }catch(e){
//         console.error(e);
//     }finally{
//         await client.close();
//     }
// }
// main().catch(console.error);
// const onError = error => {
//     console.log("error has occured");
//         if (error.syscall !== "listen") {
//             throw error;
//         }
// }
// const func = () =>{
//     console.log("connceted server");
// }
// const port = process.env.PORT || 3002;

// app.on("listening",()=>{console.log("listening...")});

// app.listen(port,()=>{
//     console.log(`Server Running at ${port}`);
//     app.on("error", onError);
//     func();
// })



// const normalizePort = val => {
//     var port = parseInt(val, 10);

//     if (isNaN(port)) {
//         // named pipe
//         return val;
//     }

//     if (port >= 0) {
//         // port number
//         return port;
//     }

//     return false;
// };

// const onError = error => {
//     if (error.syscall !== "listen") {
//         throw error;
//     }
//     const bind = typeof port === "string" ? "pipe " + port : "port " + port;
//     switch (error.code) {
//         case "EACCES":
//             console.error(bind + " requires elevated privileges");
//             process.exit(1);
//             break;
//         case "EADDRINUSE":
//             console.error(bind + " is already in use");
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// };

// const onListening = () => {
//     const addr = server.address();
//     const bind = typeof port === "string" ? "pipe " + port : "port " + port;
//     debug("Listening on " + bind);
//     console.log("Listening on " + bind);
//     console.log("Connected!");
// };

// const port = normalizePort(process.env.PORT || "3000");
// app.set("port", port);

// const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
// server.listen(port);