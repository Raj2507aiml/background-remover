
const API_KEY = "GtjBhCsAZp3Ym3WHZpPD9enD"; // still unsafe but works for demo

const upload = document.getElementById("upload");
const output = document.getElementById("output");
const preview = document.querySelector(".preview");

let processedBlob = null;

let currentBg = 'transparent';

upload.addEventListener("change", async () => {
  const file = upload.files[0];
  if (!file) return;

  preview.style.background = "transparent";
  output.src = "";
  preview.classList.add("loading");

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const blob = await response.blob();
    processedBlob = blob;
    output.src = URL.createObjectURL(blob);
    document.getElementById('downloadBtn').style.display = 'block';
  } catch (err) {
    alert("❌ Background removal failed.\n\n" + err.message);
  } finally {
    preview.classList.remove("loading");
  }
});

function changeBg(color) {
  preview.style.background = color;
}
function downloadImage() {
  if (!processedBlob) {
    alert("No image to download");
    return;
  }

  const url = URL.createObjectURL(processedBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "background-removed.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
