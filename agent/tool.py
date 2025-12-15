from langchain_community.tools.tavily_search import TavilySearchResults
import yfinance as yf
import os 
from dotenv import load_dotenv

load_dotenv()

#websearch tool

def web_search():
    """
    Search the web for the general news of the stocks related to indian markets
    """
    return TavilySearchResults(max_results=5, api_key=os.getenv("TAVILY_API_KEY"))

#money control scrapper

import requests
from bs4 import BeautifulSoup

def money_control_scrap(stock_name:str):
    """
    Scrape the money control website for the stock details
    return the stock details , price, change, market cap, PE ratio, etc.
    """
    money_control_url = f"https://www.moneycontrol.com/india/stockpricequote/{stock_name}"
    response = requests.get(money_control_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup

#Financial tool

def get_financial_summary(stock_name:str):
    """
    Get the financial summary of the stock
    """
    stock = yf.Ticker(stock_name)
    return {
        "stock_name": stock_name,
        "price": stock.info.get('currentPrice'),
        "change": stock.info.get('change'),
        "market_cap": stock.info.get('MarketCap'),
        "PE_ratio": stock.info.get('PE Ratio'),
        "dividend_yield": stock.info.get('DividendYield'),
        "52_week_high": stock.info.get('fiftyTwoWeekHigh'),
        "52_week_low": stock.info.get('fiftyTwoWeekLow'),
    }