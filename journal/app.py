from flask import Flask,render_template, request 
from transformers import pipeline, RobertaTokenizerFast
 
emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

app = Flask(__name__,template_folder="templates") 

@app.route("/") 
def hello(): 
	return render_template('index.html') 

@app.route('/emotions', methods=['POST']) 
def process(): 
	data = request.form.get('data') 
	data = data.split()
	
	ans = []
 
	i = 0
	while i+350<len(data):
		ans.append(emotion(" ".join(data[i:i+350]))[0]['label'])
		i+=350
  
	ans.append(emotion(" ".join(data[i:]))[0]['label'])
	string = " ".join(ans)
	result = emotion(string)
	return result[0]

if __name__ == '__main__': 
	app.run(debug=True) 
