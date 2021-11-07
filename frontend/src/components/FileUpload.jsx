import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:5000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <form >
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button onClick={this.handleUpload}>Upload</button>
        </div>
        <div>
          <a target = '_blank' href="http://localhost:5000/resultt">Download</a>
        </div>
      </form>
    );
  }
}

export default Main;