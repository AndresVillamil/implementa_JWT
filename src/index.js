import express from 'express';
import morgan from 'morgan';
import indexroutes from './routes/indexroutes.js';


const app = express();
const PORT = 2000;
app.use(morgan('dev'));
app.use(express.json());

app.use(indexroutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});