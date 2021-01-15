// WEBCAM

const imageUpload = document.getElementById("imageUpload");
const video = document.getElementById("videoInput");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
]).then(start);

async function start() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
  console.log("video added");
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

  document.body.style.backgroundColor = "black";

  const button = document.getElementById("button");

  button.addEventListener("click", async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const results = detections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );
      document.getElementById("aaaaa").outerHTML = "";
      const div = document.createElement("div");
      div.id = "aaaaa";
      document.body.appendChild(div);

      results.forEach((element) => {
        const name = document.createElement("h3");
        name.innerHTML = element._label;
        const div = document.getElementById("aaaaa");
        div.append(name);
        document.body.appendChild(div);
      });
    }, 500);
  });
}

function loadLabeledImages() {
  const labels = ["Aahil Rafiq", "Abdul Razaq", "Dadavali", "Sakhina"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `labeled_images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
