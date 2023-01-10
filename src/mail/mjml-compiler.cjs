import fs from 'fs';
import * as path from 'path';
import mjml from 'mjml';
import * as process from 'process';

const mjmlFolder = path.join(process.cwd(), 'src/mail/mjml-mail-templates');
fs.readdir(mjmlFolder, (err, files) => {
  if (err) {
    return console.error(err);
  }
  let hbs;
  let fileContent;

  files.forEach((file) => {
    console.warn('Template: ' + file);
    fileContent = fs.readFileSync(
      path.join(process.cwd(), 'src/mail/mjml-mail-templates', file),
    );
    fileContent = mjml(fileContent.toString());
    hbs = path.join(
      process.cwd(),
      'src/mail/mail-templates/' + file.replace('.mjml', '.hbs'),
    );
    fs.writeFileSync(hbs, fileContent.html);
  });
});
