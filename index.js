const express = require("express");
const { genrateTemplate } = require("./template-generator");
const { sendMail } = require("./mail-sender");
const cors = require("cors");

var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.serviceAccountKey)),
  databaseURL:
    "https://digitrainmentoring-default-rtdb.europe-west1.firebasedatabase.app",
});

const app = express();
app.use(cors());
app.use(express.json());

app.all("/", (req, res) => {
  console.log("Just got a request!");
  console.log(JSON.parse(process.env.serviceAccountKey));
  res.send(process.env);
});

app.post("/send-mail", async (req, res) => {
  console.log("POST: /send-mail");
  const { projectName, date, mentor, user, teacher } = req.body;
  if (!projectName || !date || !mentor || !user || !teacher) {
    console.log("INVALID DATA");
    console("projectName:  " + projectName);
    console("date:  " + date);
    console("mentor:  " + mentor);
    console("user:  " + user);
    console("teacher: " + teacher);
    return res.status(400).send("Bad request");
  } else {
    const dto = {
      projectName,
      date,
      mentor,
      teacher,
      fullName: user.fullName,
      email: user.email,
    };
    const myFile = await admin
      .storage()
      .bucket("gs://digitrainmentoring.appspot.com")
      .file("email-template/Certificat.docx")
      .download();
    const buf = genrateTemplate(dto, myFile[0]);
    try {
      await sendMail(dto, buf);
      return res.status(2000).send({ message: "Email sent successfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong sending the email");
    }
  }
});

app.listen(process.env.PORT || 3000);
