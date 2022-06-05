# -*- coding: utf-8 -*-
"""
Created on Sat Apr  3 21:47:24 2021

@author: LAPTOP-SANKET
"""

import pandas as pd
import matplotlib.pylab as plt

%matplotlib inline
 
plt.rcParams['figure.figsize']=(20,10)
plt.style.use('ggplot')

price_data = pd.read_csv('./data/bhindi.csv')
price_data['date']=pd.to_datetime(price_data['date'],format="%d/%m/%Y")
price_data.set_index('date', inplace=True)


from statsmodels.tsa.arima.model import ARIMA

model = ARIMA(price_data['model-price'], order=(1, 1, 1))
model_fit = model.fit()
yhat = model_fit.predict(len(price_data['model-price']), len(price_data['model-price'])+2, typ='levels')
yhat = yhat.to_dict()
time = list(yhat.keys())
price = list(yhat.values())
for x,y in zip(time, price):
    print(x.strftime("%d/%m/%Y")+" "+str(y))

print(yhat.keys().strftime("%m/%d/%Y"))

for x in yhat:
    print(x.strftime("%m/%d/%Y))


