crops = [ "bajra","maize","wheat","cotton","bhindi","brinjal","cabbage","carrot","cauliflower","greenchilli","guar","lemon","onion","potato" ]
import pandas as pd
# Update the data folder 
# f = open("predication_04_04.txt", "a")
f = open("predication_11_04.csv", "a")
f.write("12/04/2021,13/04/2021,14/04/2021\n")
for crop_name in crops:
  path = "resources/data/"+ crop_name +".csv"
  price_data = pd.read_csv(path)
  price_data['date']=pd.to_datetime(price_data['date'],format="%d/%m/%Y")
  price_data.set_index('date', inplace=True)
  from statsmodels.tsa.arima.model import ARIMA
  model = ARIMA(price_data['model-price'], order=(1, 1, 1))
  model_fit = model.fit()
  ans = model_fit.predict(len(price_data['model-price']), len(price_data['model-price'])+2, typ='levels')
  ans = ans.to_dict()
  time = list(ans.keys())
  price = list(ans.values())
  for x,y in zip(time, price):
    f.write(str(y)+",")
  f.write("\n")


f.close()
