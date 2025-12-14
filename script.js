
const API_KEY = "GtjBhCsAZp3Ym3WHZpPD9enD"; // still unsafe but works for demo

const upload = document.getElementById("upload");
const output = document.getElementById("output");
const preview = document.querySelector(".preview");

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
    output.src = URL.createObjectURL(blob);
  } catch (err) {
    alert("❌ Background removal failed.\n\n" + err.message);
  } finally {
    preview.classList.remove("loading");
  }
});

function changeBg(color) {
  preview.style.background = color;
}
