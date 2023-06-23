const express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    RateLimit = require('express-rate-limit'),
    cors = require('cors'),
    MongoStore = require('connect-mongo'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose'),
    rankingController = require('./controllers/ranking');

dotenv.config();

// Constants
const PORT = process.env.PORT || 3000;
const MONGO_URL = `mongodb+srv://uipathrpa:${process.env.MONGODB_PASSWORD}@cluster0.u0zjmm5.mongodb.net/?retryWrites=true&w=majority`;
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30,
  });

const app = express();

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err) => {
    throw err;
    process.exit(1);
})

// Install middlewares
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', rankingController.getAllRankings);

app.post('/', rankingController.postCreateRanking);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));