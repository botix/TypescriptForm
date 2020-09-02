import * as express from "express";
import * as path from "path";
import * as fs from "fs";

const app: express.Application = express();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(express.json()); 

app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile("index.html",
  {root: path.join(__dirname, "/client/dist")});
});

const formEndpoint: string = "/formsubmit"

app.post(formEndpoint, (req: express.Request, res: express.Response) => {
  fs.writeFile("formData", JSON.stringify(req.body), (err) => {
    if(err) throw err;
    
    res.status(200).send("Success");
    console.log("Form data written to the formData file");
  })
})

const PORT: number = 8080;

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});