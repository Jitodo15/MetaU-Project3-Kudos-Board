import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';
import env from 'dotenv';

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({

})

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
} );
