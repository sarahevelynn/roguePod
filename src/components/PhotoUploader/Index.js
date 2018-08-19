import React, { Component } from "react";
import smiley from "./assets/smiley.png";

export default class PhotoUploader extends Component {
  constructor() {
    super();
    this.state = {
      imageURL: ""
    };
  }

  handleUploadImage = event => {
    event.preventDefault();

    const data = new FormData();
    data.append("photo", this.uploadInput.files[0]);
    data.append("photoTitle", this.photoTitle.value);
    data.append("photoCap", this.photoCap.value);

    fetch("http://localhost:8080/photos/upload", {
      method: "POST",
      body: data
    }).then(response => {
      response.json().then(body => {
        console.log(body);
      });
    });
  };

  render() {
    return (
      <div>
        <h1> Please Upload Your Photos Below!</h1>
        <div id="uploadBlock">
          <form id="imageInfoUplaod">
            <div id="formSection">
              <label htmlFor="photoTitle"> Photo Title </label>
              <input
                ref={ref => {
                  this.photoTitle = ref;
                }}
                id="photoTitle"
                type="text"
                name="photoTitle"
              />
            </div>

            <div id="formSection">
              <label htmlFor="photoCap"> Photo Caption </label>
              <input
                ref={ref => {
                  this.photoCap = ref;
                }}
                id="photoCap"
                type="text"
                name="photoCap"
              />
            </div>
            <input
              type="file"
              ref={ref => {
                this.uploadInput = ref;
              }}
            />
            <button onClick={this.handleUploadImage}>Upload!</button>
            <div id="formSection" />
          </form>
        </div>
        <div id="imagePreview">
          <img src={this.state.imageURL} alt="imgage Upload" />
        </div>
      </div>
    );
  }
}
