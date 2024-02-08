import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { storage } from "./config/firebase";
import "./firestore.css";

const Firestore = () => {
  const [uploadImg, setUploadImg] = useState(null);
  const [imgList, setImgList] = useState([]);

  const handleUpload = () => {
    if (uploadImg == null) return;
    const imageRef = ref(storage, `images/${uploadImg.name + v4()}`);
    uploadBytes(imageRef, uploadImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgList((prev) => [...prev, url]);
      });
    });
  };

  const imgListRef = ref(storage, "images/");

  useEffect(() => {
    const fetchImgUrl = async () => {
      try {
        const response = await listAll(imgListRef);
        const urls = await Promise.all(
          response.items.map(async (item) => {
            return await getDownloadURL(item);
          })
        );
        setImgList(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };
    fetchImgUrl();
  }, [imgListRef]);

  return (
    <div className="container">
      <input type="file" onChange={(e) => setUploadImg(e.target.files[0])} />
      <button onClick={handleUpload}>Upload image</button>
      {imgList.map((url) => {
        return <img src={url} alt="" />;
      })}
    </div>
  );
};

export default Firestore;
