var express = require("express")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var app = express()
const uri = "mongodb+srv://angeloremmilbautista:angelo12345@cluster0.meijlvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var port = process.env.port || 3000;
const bodyParser = require('body-parser'); // For parsing request body data

let collection;
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new MongoClient (uri, {
    serverApi :{
    version: ServerApiVersion.v1,
    strict: true,
    depreciationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        collection = client.db('database1').collection('Cat');
        // console.log(collection);
    } catch (err) {
        console.error(err);
    } finally {
      await client.close();
    }
}

app.get('/', (req,res) => {
    res.render('index.html');
});

app.get('/api/cards', async (req, res) => {
  try {
    await client.connect();
    collection = client.db('database1').collection('Cat');

    // Optional filter for finding specific cards based on query parameters
    const filter = {}; // Modify this to add filters based on req.query

    // Find documents with the specified filter
    const cursor = await collection.find();

    // Convert the cursor to an array (replace with option 1 for iteration if needed)
    const cards = await cursor.toArray();

    // console.log(Array.from(new Set(cards)))
    // console.log(typeof(Array.from(new Set(cards))))
    // Send the cards data as JSON response
    res.json(cards);

  } catch (err) {
    console.error("Error fetching cards:", err);
    res.status(500).json({ message: "Error retrieving cards" });
  } finally {
    await client.close();
  }
});

app.post('/api/cards', async (req, res) => {
  try {
    await client.connect();
    collection = client.db('database1').collection('Cat');
    const result = await collection.insertOne(req.body);
    console.log({cardId: result.insertedId })
    res.json({ message: 'Card created successfully!' });
  } catch (err) {
    console.error("Error posting cards:", err);
    res.status(500).json({ message: "Error posting cards" });
  } finally {
    await client.close();
  }
});

app.delete('/api/cards/:id', async (req, res) => {
  try {
    await client.connect();
    collection = client.db('database1').collection('Cat');
    // const itemId = new MongoClient.ObjectID(req.params.id); // Ensure proper ObjectID conversion
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 1) {
      res.json({ message: "Item deleted successfully!" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }

  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Error deleting item" });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
    console.log('express server started');
    runDBConnection();
 });
