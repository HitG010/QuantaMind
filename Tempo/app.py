from transformers import pipeline, RobertaTokenizerFast
 
emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')

result = emotion(input("Enter your data : "))

print(result)