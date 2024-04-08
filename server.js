var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

    const cardList = [ 
        {
        title: "Are you in love?",
        image: "images/Sailor3.png",
        link: "Find tips in getting your love",
        desciption: "Demo desciption about love"
        }, 
        {
        title: "Do you love to shop?",
        image: "images/Sailor4.png",
        link: "Get to know the latest trends",
        desciption: "Demo desciption about shopping"
        } 
    ]

    app.get('/api/cards',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
    })

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port)
})


