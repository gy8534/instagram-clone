import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import { Button, Input } from "@material-ui/core";
import firebase from "firebase";

function Post({ username, imageURL, caption, postID, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postID) {
      unsubscribe = db
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postID]);

  const postComment = (e) => {
    e.preventDefault();

    if (comment == "") {
      alert("Comment cannot be empty!!");
      return;
    }
    db.collection("posts").doc(postID).collection("comments").add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__left">
          <Avatar className="post__avatar" alt="Gaurav" src="" />
          <h3>{username}</h3>
        </div>
        <div>
          <div className="post__right"></div>
        </div>
      </div>
      <img className="post__image" src={imageURL} alt="" />
      <h4 className="post__text">{caption}</h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p className="post_comment">
            <strong>{comment.username} </strong>
            {comment.comment}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <Input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className="post__button" type="submit" onClick={postComment}>
            Add Comment
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;
