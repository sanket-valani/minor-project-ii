import csv
import pandas as pd
df = pd.read_csv('./data.csv')
dates = df['CropName']

Bajra = df['Bajra']
file = open("./bajra.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Bajra[w]])
file.close()

Maize = df['Maize']
file = open("./maize.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Maize[w]])
file.close()

Wheat = df['Wheat']
file = open("./wheat.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Wheat[w]])
file.close()

Cotton = df['Cotton']
file = open("./cotton.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Cotton[w]])
file.close()

Bhindi = df['Bhindi']
file = open("./bhindi.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Bhindi[w]])
file.close()

Brinjal = df['Brinjal']
file = open("./brinjal.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Brinjal[w]])
file.close()

Cabbage = df['Cabbage']
file = open("./cabbage.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Cabbage[w]])
file.close()

Carrot = df['Carrot']
file = open("./carrot.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Carrot[w]])
file.close()

Cauliflower = df['Cauliflower']
file = open("./cauliflower.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Cauliflower[w]])
file.close()

GreenChilli = df['Green Chilli']
file = open("./greenchilli.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], GreenChilli[w]])
file.close()

Guar = df['Guar']
file = open("./guar.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Guar[w]])
file.close()

Lemon = df['Lemon']
file = open("./lemon.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Lemon[w]])
file.close()

Onion = df['Onion']
file = open("./onion.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Onion[w]])
file.close()

Potato = df['Potato']
file = open("./potato.csv", "w",newline='')
writer = csv.writer(file)
for w in range(len(Bajra)):
  writer.writerow([dates[w], Potato[w]])
file.close()

