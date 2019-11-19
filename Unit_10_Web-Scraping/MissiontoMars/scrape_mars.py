#Import dependencies
from flask import Flask, render_template, redirect
import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup
from IPython.display import HTML
import time



# path=!which chromedriver
executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)

###########################################################################################################

def scrape():

    # NASA Mars News Section
    url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    # Collect the latest News Title 
    news_title=[]
    title_divs=soup.body.find('div', class_="grid_list_page module content_page").\
        find_all('div', class_="content_title")
    news_title=title_divs[0].find('a').text
    # Collect the latest Paragraph Text
    news_text=[]
    text_divs=soup.body.find('div', class_="grid_list_page module content_page").\
        find_all('div', class_="article_teaser_body")
    news_p=text_divs[0].text
    
    
    ###########################################################################################################
    
    # JPL Mars Space Images Section
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    # navigate the site and find the image url for the current Featured Mars Image
    browser.click_link_by_partial_text('FULL IMAGE')
    time.sleep(2)
    browser.click_link_by_partial_text('more info')
    time.sleep(2)
    browser.click_link_by_partial_href('.jpg')
    featured_image_url=browser.url
    
    
    ###########################################################################################################
    
    # Mars Weather Section
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    mars_weather=soup.body.find('div', class_="tweet").find('p', class_="TweetTextSize").text
    link_text=soup.body.find('div', class_="tweet").find('p', class_="TweetTextSize").find_all('a')
    
    for link in link_text:
        mars_weather=mars_weather.replace(link.text, '')
    
    mars_weather=mars_weather.replace('\n', '')
    
    
    ###########################################################################################################
    
    # Mars Facts Section
    url = 'https://space-facts.com/mars/'
    tables=pd.read_html(url)
    df=tables[0]
    df.columns = ['Property', 'Value']
    table=df.to_html( header=True, index=False, classes=['table', "hoverTable"])
    
    
    
    
    # Mars Hemispheres Section
    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    
    title = []
    img_url = []
    
    items=soup.body.find_all('div', class_="item")
    for item in items:
        path_name=item.h3.text
        title.append(path_name)
        #move to the link listed in the item
        browser.click_link_by_partial_text(path_name)
        time.sleep(2)
        #change browser to the items' link
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')
        href=soup.find('div', class_="downloads").a['href']
        img_url.append(href)
        #return to home page
        browser.visit(url)
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')
        
    hemisphere_image_urls=[]
    for x in range(len(title)):
        hemisphere_image_urls.append({'title': title[x], 'img_url': img_url[x]})
    
    
    ###########################################################################################################
    
    
    dictionary = {'news_title': news_title,
    			  'news_p':news_p,
    			  'featured_image_url':featured_image_url,
    			  'mars_weather': mars_weather,
    			  'table':table , 
    			  'hemisphere_image_urls':hemisphere_image_urls}
    browser.quit()
    
    return(dictionary)