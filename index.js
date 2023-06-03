const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: String,
    title: String,
    body: String,
    likeCount: String
})

const Category = mongoose.model('category', categorySchema);

//MNll1YHz2DySAxLz
// GtTkyHgtPbIP6Dr3
mongoose.connect("mongodb+srv://isa:MNll1YHz2DySAxLz@cluster0.lqqv2hi.mongodb.net/")
    .then(res => console.log("connected"))
    .catch(err => {
        console.log('ERR', err);
    })
app.use(express.json());


app.get('/api/category', (req, res) => {
    Category.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

app.post('/api/category', (req, res) => {
    var category = new Category({
        name: req.body.name,
        title : req.body.title,
        body : req.body.body,
        likeCount:req.body.likeCount

    })

    category.save();

    res.json(category)
});

app.get("/api/category/:id", (req, res) => {
    let id = req.params.id
  Category.findById(id)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messagge: err });
    });
});


app.delete('/api/category/:id', (req, res) => {
    let id = req.params.id;
    Category.findByIdAndDelete(id)
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ messagge: err });
      });
});

app.put('/api/category/:id', (req, res) => {
    let id = req.params.id;
    let updatedCategory = {
        name: req.body.name,
        title: req.body.title,
        body: req.body.body,
        likeCount: req.body.likeCount
    };

    Category.findByIdAndUpdate(id, updatedCategory, { new: true })
        .then((data) => res.json(data))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err });
        });
});


app.listen(8080, () => {
    console.log('Server running on port 8080');
});