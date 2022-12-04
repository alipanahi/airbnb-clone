import { useState } from "react";

export default function ImageUpload() {
  const [url, setUrl] = useState("");
  const [isLoading, setLoading] = useState(false)

  const handleChange = async (event) => {
    setLoading(true)
    // setUrl(imageUrl);
    const file = event.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", "a2nfko1n");

    const responseCloudinary = await fetch(
      "https://api.cloudinary.com/v1_1/dc24zff14/image/upload",
      {
        method: "POST",
        body: imageFormData,
      }
    );
    const response = await responseCloudinary.json();
    setUrl(response.secure_url);
    setLoading(false)
  };

  return (
    <div className="col-sm-6">
      <label for="image" class="form-label">
        Flat Image
      </label>

      <input
        onChange={handleChange}
        type="file"
        name="image"
        class="form-control-file"
        id="image"
        accept=".jpg, .png, .jpeg"
      />
      <input hidden={true} defaultValue={url} id="imageUrl" name="imageUrl" />
      {isLoading ? (<p style={{color: "red"}}>Uploading ... please wait!</p>) : (<p></p>)}
    </div>
  );
}
