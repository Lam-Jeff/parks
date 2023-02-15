#!/usr/bin/env python
import os
import sys
from bs4 import BeautifulSoup
import pandas as pd
import requests
import re
from geopy.geocoders import Nominatim
from random import randint
from time import sleep

if __name__ == "__main__":

    # variables
    names = []
    country = []
    longitude = []
    latitude = []
    search_word = ""
    base_link = "https://en.wikipedia.org/wiki/List_of_amusement_parks"

    r = requests.get(base_link)
    soup = BeautifulSoup(r.text, features="html.parser")
    geolocator = Nominatim(user_agent="user_agent",timeout=5)

    for a in soup.findAll('a', href=True, string=re.compile("List of amusement parks *")):
        link = requests.get("https://en.wikipedia.org" + a['href'])
        soup = BeautifulSoup(link.text, features="html.parser")
        
        # removing useless html parts
        soup.find(class_="navbox").decompose()
        soup.find(class_='mw-footer').decompose()
        soup.find(class_='catlinks').decompose()
        soup.find(class_='toc').decompose()
        soup.find(id='mw-panel').decompose()
        soup.find(id='mw-head').decompose()      

        for ul in soup.findAll('ul'):
                for li in ul.findAll('li'):
                        if 'List' not in li.text and 'closed' not in li.text:  
                                if '(' in li.text:
                                        search_word = li.text.split('(')[0]
                                elif ',' in li.text:
                                        search_word = li.text.split(',')[0]
                                else:
                                        search_word = li.text
                                sleep(randint(10,15))
                                location = geolocator.geocode(search_word + ',' + li.find_previous ("h2").text.split('[')[0])
                                if location:
                                        longitude.append (location.longitude)
                                        latitude.append (location.latitude)
                                        country.append(li.find_previous ("h2").text.split('[')[0])
                                        names.append(search_word)

    # Saving data in a csv file
    print("SAVING DATA")
    df = pd.DataFrame({'Park': names,
                        'country': country,
                        'longitude': longitude,
                        'latitude': latitude

    })
    df.to_csv('../public/link_parks.csv', index=False, encoding='utf-8')
    print("DONE")
