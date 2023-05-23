const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");


const genrateTemplate = (data, content) => {
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render(data);

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  return buf;
};

module.exports = {
  genrateTemplate,
};
