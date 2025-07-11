const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get('/',function (req,res){
  fs.readdir(`./files`,function(err,files){
      res.render("index",{files:files})
  })

})

app.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'files', req.params.filename);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).send("File not found");

    res.render('show', {
      title: req.params.filename.replace('.txt', ''),
      content: data
    });
  });
});



app.post('/create',function (req,res){
  fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`,req.body.details,function(err){
res.redirect("/")
  })
  })
app.listen(3000)
