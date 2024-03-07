var encryptor = require("file-encryptor");
var fs = require("fs");
const readline = require("readline");

const TestFolder = "./testfolder/";
var encryptKey = "This is a sample";
var decryptKey = "";

async function encryptFiles() {
  const files = fs.readdirSync(TestFolder);
  for (const file of files) {
    await new Promise((resolve) => {
      encryptor.encryptFile(
        `${TestFolder}/${file}`,
        `${TestFolder}/${file}.encrypted`,
        encryptKey,
        function (err) {
          if (err) {
            console.error("Encryption error:", err);
          } else {
            fs.unlinkSync(`${TestFolder}/${file}`);
            console.log(`Encryption of ${file} is complete.`);
          }
          resolve(); // Resolve the promise to indicate encryption for this file is complete
        }
      );
    });
  }
}

function decryptFiles() {
  fs.readdirSync(TestFolder).forEach((file) => {
    encryptor.decryptFile(
      `${TestFolder}/${file}`,
      `${TestFolder}/${file.replace(".encrypted", "")}`,
      decryptKey,
      function (err) {
        if (err) {
          console.error("Decryption error:", err);
        } else {
          fs.unlinkSync(`${TestFolder}/${file}`);
          console.log(`Decryption of ${file} is complete.`);
        }
      }
    );
  });
}

function promptDecryptionKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter decryption key: ", (decryptAnswer) => {
    decryptKey = decryptAnswer;
    rl.close();
    decryptFiles();
  });
}
3
// Start encryption process
console.log("Encrypting files...");
encryptFiles().then(() => {
  promptDecryptionKey();
});
