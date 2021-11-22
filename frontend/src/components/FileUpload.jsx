import React from 'react';
import Button from '@mui/material/Button';import { padding } from '@mui/system';
;

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
    //data.append('filename', this.fileName.value);

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
      
      <form style={{
        display: 'flex',
        margin: 'auto',
        marginTop: 0,
        width: 400,
        flexWrap: 'wrap',
        backgroundColor: '#F0E9D2',
        padding: 100,
        }}>
        <div style={{ width: '100%', float: 'left' }}>
          <h1>Python File Compile</h1>
        </div>
        <div >
          <input  ref={(ref) => { this.uploadInput = ref; }} type="file"/>
        </div>
        <br />
        <div htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" onClick={this.handleUpload}>Upload</Button>
        </div>
        <div>
          <a  href="http://localhost:5000/resultt">Download</a>
        </div>
      </form>
    );
  }
}

export default Main;