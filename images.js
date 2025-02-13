window.addEventListener('load', () => {

  // Add button to allow downloading zip file of
  // student images.
  const learningModeBtn = document.getElementById('report-roster-toggle');
  const newBtn = document.createElement('button');
  newBtn.innerHTML = "Download images";
  newBtn.style = 'margin-left: 1rem';
  newBtn.onclick = makeZipFileWithImages;

  // insert new button after the "Learning mode off" button.
  // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
  learningModeBtn.parentNode.insertBefore(newBtn, learningModeBtn.nextSibling);

  const zip = new JSZip();

  // Lots of help from https://www.cjoshmartin.com/blog/creating-zip-files-with-javascript
  async function addImgsToZipFile() {
    const images = document.querySelectorAll('img.userpicture');

    for (const im of images) {
      const imageDnld = await fetch(im.src).then(r => r.blob());
      const fname = im.title.replaceAll(' ', '_');
      zip.file(`${fname}.jpg`, imageDnld);
    }
  }
  async function generateFile() {
    const zipData = await zip.generateAsync({
      type: "blob",
      streamFiles: true
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(zipData);
    link.download = `student-images.zip`;
    link.click();
  }

  function makeZipFileWithImages() {
    addImgsToZipFile().then(() => {
      generateFile();
    });
  }
});
