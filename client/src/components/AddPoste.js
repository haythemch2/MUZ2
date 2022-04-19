import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-feather";

const AddPoste = ({ setShowUpload }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    let URI = process.env.REACT_APP_API;
    if (url) {
      fetch(URI + "/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          body,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            M.toast({
              html: data.error,
              classes: "#e53935 red darken-1",
            });
          } else {
            M.toast({ html: "posted", classes: "#43a047 green darken-1" });
            navigate("/");
            setShowUpload(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      M.toast({
        html: "Veuillez attendre",
        classes: "#e53935 red darken-1",
      });
    }
  }, [url]);

  const postDetails = () => {
    setloading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ywtxhaze");
    data.append("resource_type", "raw");
    data.append("cloud_name", "dh8bgpvun");
    fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/video/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setloading(false);
          M.toast({
            html: data.error.message,
            classes: "#e53935 red darken-1",
          });
        } else {
          console.log(data.url);
          setloading(false);
          setUrl(data.url);
        }
      });
  };
  return (
    <div
      className="card input-filed mt-5"
      style={{
        margin: "30px",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {loading ? <Icon.Loader size={64} /> : <span>Upload Music</span>}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <input
        type="text"
        placeholder="Titre"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        className="btn waves-effect blue darken-1"
        onClick={() => postDetails()}
      >
        Valider
      </button>
    </div>
  );
};

export default AddPoste;
