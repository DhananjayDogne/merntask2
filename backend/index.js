const express = require('express')
const connectToMongo = require('./db');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
var cors = require('cors')

dotenv.config();

//Connect to database
connectToMongo();

const app = express()
const port = process.env.PORT || 3300

//cross origin
app.use(cors(
    {
        origin: ["https://merntask2-frontend.vercel.app/"],
        methods: ["POST", "PUT", "GET", "DELETE"],
        credentials: true
    }
))
//middleware to parse json data from request body
app.use(express.json())
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());
// Morgan is a HTTP request logger middleware for Node. js. It simplifies the process of logging requests to your application. You might think of Morgan as a helper that collects logs from your server, such as your request logs.
app.use(morgan('common'));

//Available routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/posts', require('./routes/posts.js'));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port at: http://www.localhost:${port}`))
