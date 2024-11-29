import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors"

const usr = encodeURIComponent("chslash01")
// const pwd = encodeURIComponent("5MthYCg3py6a2Min")
const pwd = encodeURIComponent("mongo12db")

// const uri = "mongodb://127.0.0.1:27017";
// const uri = `mongodb+srv://${usr}:${pwd}@cluster0.p6lzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = 'mongodb+srv://chslash01:$mongo12db@cluster0.p6lzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const uri = 'mongodb+srv://chslash01:0G1UOvpIK04G9z5I@cluster0.7tsjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const uri = `mongodb+srv://${usr}:${pwd}@cluster0.7tsjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const client = new MongoClient(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if no connection
});

const db = client.db("ecomm1");


const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("Server started at port 8080");
});

app.get("/", async (req, res) => {
  const items = await db.collection("products").find().toArray();
  res.status(200).json(items);
});

app.post("/", async (req, res) => {
  const { name, price } = req.body;
  const data = {
    name: name,
    price: price,
  };
  const newProduct = await db.collection("products").insertOne(data);
  res.status(200).json(newProduct);
});


app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
    res.status(200).json(newProduct);
  });
  