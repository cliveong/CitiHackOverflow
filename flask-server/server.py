from textblob import TextBlob
from flask_cors import CORS
# TextBlob(sentence).sentiment
from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)
import os
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
import pandas as pd
from urllib.request import urlopen, Request
from nltk.sentiment.vader import SentimentIntensityAnalyzer

@app.route('/sentiment', methods=['POST'])
def predict_sentiment():
    data = request.get_json()
    sentence = data['stock']
    url = 'https://finviz.com/quote.ashx?t=' + sentence
    news_tables = {}
    req = Request(url=url,headers={"User-Agent": "Chrome"}) 
    response = urlopen(req)    
    html = BeautifulSoup(response,"html.parser")
    news_table = html.find(id='news-table')
    news_tables[sentence] = news_table
    amazon = news_tables[sentence]
    amazon_tr = news_table.findAll('tr')
    for x, table_row in enumerate(amazon_tr):
        a_text = table_row.a.text
        td_text = table_row.td.text
        print(a_text)
        print(td_text)
        if x == 3:
            break
    news_list = []

    for file_name, news_table in news_tables.items():
        for i in news_table.findAll('tr'):
            
            text = i.a.get_text() 
            
            date_scrape = i.td.text.split()

            if len(date_scrape) == 1:
                time = date_scrape[0]
                
            else:
                date = date_scrape[0]
                time = date_scrape[1]

            tick = file_name.split('_')[0]
            
            news_list.append([tick, date, time, text])
    vader = SentimentIntensityAnalyzer()

    columns = ['ticker', 'date', 'time', 'headline']

    news_df = pd.DataFrame(news_list, columns=columns)

    scores = news_df['headline'].apply(vader.polarity_scores).tolist()

    scores_df = pd.DataFrame(scores)

    news_df = news_df.join(scores_df, rsuffix='_right')

    news_df['date'] = pd.to_datetime(news_df.date).dt.date

    print(news_df.head())

    mean_scores = news_df.groupby(['ticker','date']).mean()
    mean_scores = mean_scores.unstack()

    mean_scores = mean_scores.xs('compound', axis="columns").transpose()
    print(mean_scores[sentence][-1])
    
    final_score = mean_scores[sentence][-1]

    if final_score >= 0.3:
        res = "Very Positive"
    elif final_score < 0.3 and final_score >= 0:
        res = "Slightly Positive"
    elif final_score < 0 and final_score > -0.3:
        res = "Slightly Negative"
    elif final_score <= -0.3:
        res = "Very Negative"
    print(res)
    return jsonify({"sentiment": res})

@app.route('/', methods=['GET'])
def hello():
    return jsonify({"response":"This is Sentiment Application"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True, port=5001)