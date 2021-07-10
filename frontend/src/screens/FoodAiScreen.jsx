import React, { useState } from "react";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import FoodRecognition from "../components/FoodRecognition/FoodRecognition";
import { useDropzone } from "react-dropzone";
import { Link } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FoodAiScreen.css";
import image1 from "../images/Image1.jpeg";
import image2 from "../images/Image2.jpeg";
import image3 from "../images/Image3.jpeg";
import image4 from "../images/Image4.jpeg";
import image5 from "../images/Image5.jpeg";
import image6 from "../images/Image6.jpeg";
import upload from "../images/upload-photo.png";
import analimg from "../images/analytique.png";
import { Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import FoodTableR from "../components/FoodTableR/FoodTableR";

function FoodAiScreen() {
  const [result, setResult] = useState("");
  const [display, setDisplay] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [input, setInput] = useState("");
  const [send, setSend] = useState(false);

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const onUploadButton = () => {
    if (Image[0]) {
      blobToBase64(Image[0]).then((res) => {
        sendData(res);
      });
    }
  };

  const sendData = (c) => {
    setSend(true);
    console.log("send_true : ", send);
    // sending data to machine learning model
    //test
    const headers = {
      accept: "application/json",
    };

    const fd = new FormData();
    fd.append("image", c);

    axios
      .post("/api/foodai/food/", fd, { headers: headers })
      .then((res) => {
        console.log("sending data :      ", res.data);

        getImageResult(res.data.id);
        setSend(false);
        console.log("send : ", send);
      })
      .catch((err) => console.log(err));

    //getting result from model

    const getImageResult = (id) => {
      axios
        .get(`/api/foodai/food/${id}`)
        .then((res) => {
          console.log("receiving data :      ", res.data);

          setResult(res.data.result);
        })
        .catch((err) => console.log(err));
    };
  };

  const imageHandler = (e) => {
    console.log(e.target.files[0]);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    console.log(imageUrl);
  };

  const uploadImage = async (e) => {
    console.log(e);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [Image, setImage] = useState([]);
  const { getRootProps, getInputProps, isDragAActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  const hideDropBox = () => {
    setDisplay(false);
    console.log("object");
  };

  return (
    <div className="foodaiscreen">
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 70,
              density: {
                enable: true,
                value_area: 700,
              },
            },
            color: "#ff0000",
            line_linked: {
              shadow: {
                enable: false,
                color: "#ff0000",
                blur: 5,
              },
            },
          },
        }}
        style={{
          width: "100%",
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          // z-index: "-1"
        }}
      />

      <div className="center-content api-demo" id="cm_api-fullpage">
        <div className="section cm_fullheight">
          <div className="cm_fullheight_center">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 features">
                  <h1>Features</h1>
                  <Link to="try" smooth={true} duration={1000}>
                    <div className="pr-btns">
                      <span className=" button-big animate-scroll pr-btn pr-btn-foodai ">
                        Try Food AI
                      </span>
                    </div>
                  </Link>

                  <hr />
                </div>
              </div>
              <div className="row feature-list">
                <div className="col-sm-6 col-xs-12 feature">
                  <i class="fas fa-search"></i>
                  <h2>Precise Recognition of Food</h2>
                  <p>
                    <b>Food AI</b> API utilizes EfficientNet highly trained
                    models that are not only able to recognize a variety of
                    dishes but has the granularity to differentiate between
                    different presentation style, preparation methods, and
                    regional variations with accuracy of 80 %.
                  </p>
                </div>

                <div className="col-sm-6  col-xs-12 feature">
                  <i class="fas fa-atom"></i>
                  <h2>Perpetually Evolving Food Identification</h2>
                  <p>
                    Food AI API is developed with the latest in machine learning
                    techniques. With every photo we are able to continuously
                    improve the accuracy of Food AI API by immediately piping
                    those photos into our training sets.
                  </p>
                </div>
              </div>
              <div className="row feature-list">
                <div className="col-sm-6  col-xs-12 feature">
                  <i class="fas fa-pizza-slice"></i>
                  <h2>Highly Diverse Food Database</h2>
                  <p>
                    Our FOOD101 database encompasses many regional and ethnic
                    specialty food items and it has 101 category of food with
                    1000 image for each one. Never before has it been possible
                    to receive analysis on such a wide selection of foods.
                  </p>
                </div>

                <div className="col-sm-6  col-xs-12 feature">
                  <i class="fas fa-chart-bar"></i>
                  <h2>Rapid Analysis</h2>
                  <p>
                    Within a second a photo can become a highly detailed food
                    profile complete with nutrition information and soon even
                    more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section" id="try">
          <div className="container">
            <div className="row api-demo">
              <div className="col-sm-7">
                <h5>You can upload your photo</h5>

                <div
                  className="image-dropbox"
                  onChange={() => {
                    setDisplay(false);
                    console.log("display : ", display);
                  }}
                >
                  {display && (
                    <div
                      className="placeholder"
                      {...getRootProps()}
                      style={{ display: { display } ? "block" : "none" }}
                    >
                      <img src={upload} />
                      <input {...getInputProps()} />
                      {isDragAActive ? (
                        <p>Drop the Image here ...</p>
                      ) : (
                        <p>Add your image here </p>
                      )}
                    </div>
                  )}
                  <h3>{result}</h3>
                  <div className="previews" onChange={hideDropBox}>
                    {Image.map((upFile) => {
                      //   blobToBase64(Image[0]).then((res) => {
                      //     sendData(res);
                      //   });
                      return (
                        <img
                          key={Math.floor(Math.random() * 10)}
                          src={upFile.preview}
                          style={{
                            width: "639.5px",
                            height: "353px",
                            border: "3px solid #ccc",
                          }}
                          alt="preview"
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="upload-section ">
                  <a className="fileUpload button" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragAActive ? (
                      <p>Drop the Image here ...</p>
                    ) : (
                      <p style={{ color: "white", marginBottom: "0" }}>
                        Upload{" "}
                      </p>
                    )}
                  </a>

                  <Button variant="primary" onClick={onUploadButton}>
                    {send && (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {"    "}
                    {send ? "...Loading" : "Send"}
                  </Button>
                  <br />
                  <br />

                  <p clas="notice">
                    Note: By uploading files here you agree to have them
                    temporarily stored in our training dataset to make it better
                    for you
                  </p>
                </div>
                <div className="url-section">URL Section</div>
              </div>
              <div className="col-sm-4 col-sm-offset-1">
                <div className="row api-results">
                  <div className="col-xs-12">
                    <script type="text/html" id="result-template">
                      <div className="food-group" data-role="collapsible">
                        <h4>
                          <div className="score"></div>
                          <div className="group-name">Fruit</div>
                        </h4>
                        <div className="food-list">
                          <div className="food-item">
                            <span className="item-name">Banana</span>{" "}
                            <span className="serving-size"></span>
                            <span className="calories"></span>
                          </div>
                        </div>
                      </div>
                    </script>

                    <div id="test-result" style={{ display: "none" }}>
                      <h5>Food AI </h5>
                      <div className="recognizing-status">Recognizing...</div>
                      <div className="result-content"></div>
                    </div>
                  </div>
                  <div className="col-xs-12" id="json-result"></div>
                </div>

                <div className="row example-images">
                  <div className="col-xs-12">
                    <h5>result</h5>
                    {console.log("im in parent", result)}
                    <FoodTableR result={result} />
                  </div>

                  <div className="col-xs-12">
                    <h5>TRY WITH EXAMPLE IMAGES</h5>
                  </div>
                  <div className="col-xl-6">
                    <img src={image1} />
                  </div>
                  <div className="col-xl-6 ">
                    <img src={image2} />
                  </div>
                  <div className="col-xl-6">
                    <img src={image3} />
                  </div>
                  <div className="col-xl-6">
                    <img src={image4} />
                  </div>
                  {/* <div className="col-xl-6">
                    <img src={image5} />
                  </div>
                  <div className="col-xl-6">
                    <img src={image6} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodAiScreen;
