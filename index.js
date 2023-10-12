import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import apiRoutes from './routes/api.js';

const appl = express();
dotenv.config();

// const app = express();

appl.use(bodyParser.json({limit: "30 mb", extended: true}));
appl.use(bodyParser.urlencoded({limit: "30 mb", extended: true}));
appl.use(cors());

appl.use('/posts',postRoutes);
appl.use('/user',userRoutes);
appl.use('/api', apiRoutes);


const CONNECTION_URL  = process.env.LINK;
const PORT =  process.env.PORT;
// mongoose.set("strictQuery",true); 

// mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
mongoose.connect(CONNECTION_URL)
    .then(()=>appl.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    // mongoose.set('useFindAndModify', false); no





// Below as per video ===================================================================================================


// import bodyParser from 'body-parser';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// const app = express();

// app.use(bodyParser.json({limit:'30mb', extended: true}));
// app.use(bodyParser.urlencoded({limit:'30mb', extended: true}));
// app.use(cors());

// const CONNECTION_URL = 'mongodb+srv://mydb:mydb123@cluster0.6qltgak.mongodb.net/?retryWrites=true&w=majority';
// const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL, {useNewParser: true, useUnifiedTopology: true})
//     .then(()=> app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
//     .catch(() => console.log(error.message))
    
//     mongoose.set('useFindAndModify', false);