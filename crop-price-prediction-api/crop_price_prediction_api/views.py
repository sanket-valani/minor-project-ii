from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

@csrf_exempt
def api(request):
  import json
  post_data = json.loads(request.body.decode("utf-8"))
  crop_name = ""
  crop_name = post_data.get("crop_name")
  predict_days = post_data.get("days")-1

  if crop_name != "" :
    import pandas as pd
    path = "./resources/data/"+ crop_name +".csv"
    price_data = pd.read_csv(path)
    price_data['date']=pd.to_datetime(price_data['date'],format="%d/%m/%Y")
    price_data.set_index('date', inplace=True)
    from statsmodels.tsa.arima.model import ARIMA
    model = ARIMA(price_data['model-price'], order=(1, 1, 1))
    model_fit = model.fit()
    ans = model_fit.predict(len(price_data['model-price']), len(price_data['model-price'])+predict_days, typ='levels')
    ans = ans.to_dict()
    time = list(ans.keys())
    price = list(ans.values())
    json_output = []
    for x,y in zip(time, price):
        json_output.append( { "date":x.strftime("%d/%m/%Y"),"price":str(y) } )
    # print(json.dumps(json_output))
  return JsonResponse({"answer":json_output})