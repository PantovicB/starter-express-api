const express = require("express");
const app = express();
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send(process.env);
  res.send(process.env.ePass);
});

app.post("/send-mail", async (req, res) => {
  console.log("POST: /send-mail");
  const { projectName, date, mentor, user, teacher } = req.body;
  if (!projectName || !date || !mentor || !user || !teacher) {
    console.log("Invalid data", projectName, date, mentor, user, teacher);
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
    // const myFile = await admin
    //   .storage()
    //   .bucket("gs://digitrainmentoring.appspot.com")
    //   .file("email-template/Certificat.docx")
    //   .download();
    // const buf = genrateTemplate(dto, myFile[0]);
    // await sendMail(dto, buf);
    return res.send(dto);
  }
});

app.listen(process.env.PORT || 3000);
