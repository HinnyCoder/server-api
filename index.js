import languageRouter from './routes/language.js'
import express from 'express'


const app = express()
app.use(express.json());
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', languageRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})