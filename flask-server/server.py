from textblob import TextBlob
from flask_cors import CORS
# TextBlob(sentence).sentiment
from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)

@app.route('/sentiment', methods=['POST'])
def predict_sentiment():
    data = request.get_json()
    sentence = data['stock']
    sentiment = TextBlob(sentence).sentiment
    res = sentence
    return jsonify({"sentiment": res})

@app.route('/', methods=['GET'])
def hello():
    return jsonify({"response":"This is Sentiment Application"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True, port=5001)