import { useState } from "react";
import { Button, Input } from "@material-ui/core";
import React from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username, setOpenPost }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImage(selected);
    } else {
      setImage(null);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please choose a Image");
      return;
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //   insert into database
            const obj = {
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageURL: url,
              username: username,
            };
            console.log(obj);
            db.collection("posts").add(obj);

            setProgress(0);
            setCaption("");
            setImage(null);
            setOpenPost(false)
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <progress className="imageupload__progress item" value={progress} max="100" />
      <Input
        className="item"
        type="text"
        placeholder="What's on your mind"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <label className="item">
      <input type="file" onChange={handleChange} />
      <span>{image ? 'Image Selected ✅' : 'Select Image'}</span>
      </label>
      <Button className="item" onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
