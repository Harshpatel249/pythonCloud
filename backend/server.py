import os
from flask import Flask, flash, request, redirect, url_for, session,render_template,send_file
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import subprocess

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = './upload'
DOWNLOAD_FILE = 'results.txt'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','py'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)
@cross_origin()

@app.route('/upload', methods=['POST'])
def fileUpload():
    target=UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("Uploading Python File")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    print(destination)
    result = subprocess.check_output(["python", destination])
    result = str(result)
    f = open("results.txt", "w")
    f.write(result)
    f.close()
    print(result)
    response="====================================="
    return response

@app.route("/result1")
def downloadFile():
    path = DOWNLOAD_FILE
    return send_file(path, as_attachment=False)
if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

