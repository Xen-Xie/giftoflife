import React, { useState, useEffect } from "react";
import axios from "axios";

function IncidentPhotoUploader() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPhotos();
  }, []);

const fetchPhotos = () => {
  if (!token) {
    console.warn("No token found — user might not be logged in");
    return;
  }

  axios
    .get("https://giftoflife.onrender.com/api/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setPhotos(res.data))
    .catch((err) => console.error("Fetch failed", err));
};

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !caption) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await axios.post(
        "https://giftoflife.onrender.com/api/images/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCaption("");
      setImage(null);
      fetchPhotos();
      
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://giftoflife.onrender.com/api/images/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPhotos();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 px-4">
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="file-input w-full"
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Upload
        </button>
      </form>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {photos.map((photo) => (
          <div key={photo._id} className="relative group">
            <img
              src={photo.imageUrl}
              alt={photo.caption}
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm mt-1 text-center">{photo.caption}</p>
            <button
              onClick={() => handleDelete(photo._id)}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded opacity-80 hover:opacity-100"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentPhotoUploader;
