const nodemailer = require("nodemailer");

const sendMail = (data, buf) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "digitrainportal@gmail.com",
          pass: process.env.ePass,
        },
      });
    
      var mailOptions = {
        from: "digitrainportal@gmail.com",
        to: data.email,
        subject: "Certificate",
        text: "Congratulations on a successfully completed project through the DigiTrain portal, Your DigiTrain team",
        attachments: [
          {
            filename: "Certificat.docx",
            content: buf,
          },
        ],
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          buf = null;
          resolve(info.response);
        }
      });
  });
 
};

module.exports = {
  sendMail,
};
