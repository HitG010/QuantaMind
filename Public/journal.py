from flask import Flask,render_template, request 
from transformers import pipeline, RobertaTokenizerFast
 
emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

app = Flask(__name__,template_folder="templates") 

@app.route("/journal") 
def hello(): 
	return render_template('index.html') 

@app.route('/journal/emotions', methods=['POST']) 
def process(): 
	data = request.form.get('data') 
	result = emotion(data) 
	return result[0]
	# return "Hello"

if __name__ == '__main__': 
	app.run(debug=True) 
