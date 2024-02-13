import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();
const router = express.Router();

app.set('view engine', 'ejs');

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));


router.get('/', (req,res) => {
  res.render('home');
});

router.get('/:duration/:category', (req,res) => {
  let duration = req.params.duration;
  let category = req.params.category;
  // console.log(`duration: ${duration} \n category: ${category}`);
  res.render('meditate', {duration: duration, category: category});
});

// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

// module.exports = router;
export {router};