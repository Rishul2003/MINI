from flask import Flask,request, url_for, redirect, render_template
from flask import Flask, request, jsonify 
import os
import time
import pickle
import numpy as np
from Extract import PE_main
from Extract import url_main
app = Flask(__name__)

def sanitization(web):
    web = web.lower()
    token = []
    dot_token_slash = []
    raw_slash = str(web).split('/')
    for i in raw_slash:
        raw1 = str(i).split('-')
        slash_token = []
        for j in range(0,len(raw1)):
            raw2 = str(raw1[j]).split('.')
            slash_token = slash_token + raw2
        dot_token_slash = dot_token_slash + raw1 + slash_token
    token = list(set(dot_token_slash)) 
    if 'com' in token:
        token.remove('com')
    return token

def run_PE(file):
    # file = input("Enter the path and name of the file : ")
    return PE_main.predict_file(file)
    # os.system("python Extract/PE_main.py {}".format(file))

def run_URL(url):
    return url_main.predict(url)

@app.route('/')
def hello_world():
    return render_template("start.html")


@app.route('/predict', methods=['POST'])
def predict():
    # Check if the request contains a file
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # Check if the file is an executable
    if file.filename.endswith('.exe'):
        # Save the file
        file_path = 'uploaded_file.exe'
        # Check if the file already exists
        if os.path.exists(file_path):
            os.remove(file_path) 
        file.save(file_path)
        try:
            result = run_PE(file_path)
            return jsonify({'result': result})
        except Exception as e:
            return jsonify({'error': f'Execution failed: {e}'})
    else:
        return jsonify({'error': 'File is not an executable'})

@app.route('/url', methods=['POST'])
def predict_url():
    if 'text_content' not in request.form:
        return jsonify({'error': 'No text content provided'})

    text_content = request.form['text_content']

    if not text_content.strip():
        return jsonify({'error': 'Empty text content provided'})

    try:
        result = run_URL(text_content)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': f'Execution failed: {e}'})

if __name__ == '__main__':
    app.run(debug=True)