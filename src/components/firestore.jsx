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
    listAll(imgListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prev) => [...prev, url]);
        });
      });
    });
  });

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
