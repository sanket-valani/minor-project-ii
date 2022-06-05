#_*_coding: utf-8_*_

import time

from selenium import webdriver
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

try:
  wd=webdriver.Firefox()
  wd.get("https://website.url")

  selectState = Select(wd.find_element_by_xpath('//*[@id="cphBody_cboState"]'))
  selectState.select_by_visible_text("Gujarat")
  print("\nSelected Gujarat")

  selectMonth = Select(wd.find_element_by_xpath('//*[@id="cphBody_cboMonth"]'))
  selectMonth.select_by_visible_text("April")
  print("\nSelected April")

  selectYear = Select(wd.find_element_by_xpath('//*[@id="cphBody_cboYear"]'))
  selectYear.select_by_visible_text("2021")
  print("\nSelected 2021")

  selectDate = WebDriverWait(wd, 3).until(
      EC.presence_of_element_located((By.XPATH, "/html/body/form/div[3]/div[6]/div[6]/div[1]/table/tbody/tr[8]/td[2]/table/tbody/tr[4]/td[7]/a"))
  )
  selectDate.click()
  print("\nClicked Date")

  submit = WebDriverWait(wd, 3).until(
      EC.presence_of_element_located((By.XPATH, '//*[@id="cphBody_btnSubmit"]'))
  )
  submit.click()
  print("\nClicked Submit")
except Exception as e: 
  print(e)
  print("Exception occured")
  wd.close()
