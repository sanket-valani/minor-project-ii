#_*_coding: utf-8_*_

from selenium import webdriver
import time
from selenium.webdriver.support.select import Select
wd=webdriver.Firefox()
wd.get("https://website.url")
select = Select(wd.find_element_by_name("example_length"))
select.select_by_visible_text("100")
titleList = wd.find_elements_by_xpath("//a[@class='showDetails']")
descriptionList = wd.find_elements_by_xpath("//span[starts-with(@id,'desc_')]")
starttimeList = wd.find_elements_by_xpath("//td[starts-with(@id,'starttime_')]")
endtimeList = wd.find_elements_by_xpath("//td[starts-with(@id,'endtime_')]")

arr = []
for (title,description,starttime,endtime) in zip(titleList,descriptionList,starttimeList,endtimeList):
  tpl = (title.get_attribute("innerHTML"),description.get_attribute("innerHTML"),"DD Kisan",0,starttime.get_attribute("innerHTML"),endtime.get_attribute("innerHTML"))
  arr.append(tpl)
wd.close()

import mysql.connector
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="minorproject2"
)
cr = db.cursor()
sql = "DELETE FROM tvprograms"
cr.execute(sql)
db.commit()
sql = "INSERT INTO tvprograms (title,description,channel_app_url,is_url,start_time,end_time) VALUES (%s,%s,%s,%s,%s,%s)"
cr.executemany(sql, arr)
db.commit()
print(cr.rowcount, "record inserted.")