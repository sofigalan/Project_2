# Dependencies and Setup
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import requests
import os
import datetime
from datetime import date

from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd

def iiniciar_browser(): 
    exec_path = {'executable_path': 'chromedriver'}
    return Browser('chrome', headless=True, **exec_path)


mag=[]
place=[]
time=[]
geometry=[]
data_dic=[]
helpdata={}
diccionario={}
datechange=""
fmt = "%Y-%m-%d"

today=date.today()
today=today.strftime(fmt)    

base_url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime="+today+"&maxlongitude=-86.76&minlongitude=-117&maxlatitude=32.7183333333&minlatitude=14.5408333333"
response = requests.get(base_url).json()
for index in response['features']:
    mag.append(index['properties']['mag'])
    place.append(index['properties']['place'])
    datechange=datetime.datetime.fromtimestamp(index['properties']['time']/1000)
    time.append(datechange.strftime(fmt))
    geometry.append(index['geometry']['coordinates'])
    diccionario = {'mag': index['properties']['mag'],'place':index['properties']['place'],'time':datechange.strftime(fmt)}
    data_dic.append(diccionario)


dic={"Place": place,
 	"mag":mag, 
    "time":time, 
    "geometry": geometry,
    "data_dic":data_dic}


def last_quake():
	browser = iiniciar_browser()
	url = "http://www.ssn.unam.mx/" 
	browser.visit(url)
	html = browser.html
	soup = BeautifulSoup(html, "html.parser")
	last_quake_mx = soup.find("div", class_="tab-pane fade in active text-uppercase")
	last_queake_text=last_quake_mx.text
	last_queake_list=last_queake_text.split("\n")
	del last_queake_list[0]
	del last_queake_list[-1]
	del last_queake_list[1]
	del last_queake_list[6]
	del last_queake_list[6]
	dic['last_quake']=last_queake_list
	browser.quit()
	return dic

