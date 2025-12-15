from langgraph.graph import START, StateGraph,END
from langchain_openai import ChatOpenAI
from typing import TypedDict, Annotated
import operator
from .tool import web_search, money_control_scrap, get_financial_summary
from langgraph.prebuilt import ToolNode, tools_condition
import os
from dotenv import load_dotenv

load_dotenv()

class AgentState(TypedDict):
    stock_name: str
    stock_symobol: str
    messages: Annotated[list, operator.add]
    web_search_results: str
    money_control_data:str
    financial_analysis: str


open_api_key = os.getenv("OPENAI_API_KEY")
llm = ChatOpenAI(model="gpt-4o", temperature=0, api_key=open_api_key)
tools = [web_search, money_control_scrap, get_financial_summary]


workflow = StateGraph(AgentState)

#Prepare a node

#Node1

def identify_stock(state: AgentState):
    """
    convert the stock name to stock symbol
    """
    prompt = f"""Convert the stock name '{state['stock_name']}' to its NSE (National Stock Exchange) stock symbol.
    Return only the stock symbol with .NS suffix (e.g., TCS.NS, RELIANCE.NS).
    If the input is already a symbol, return it as is.

    Stock name: {state['stock_name']}
    Stock symbol:"""

    response = llm.invoke(prompt)
    symbol = response.content.strip()

    return {
        "stock_symobol": symbol
    }

#node2 news serach

def news_search(state: AgentState):
    """
    Search the web for the general news of the stocks related to indian markets
    """
    tools = [web_search(), money_control_scrap, get_financial_summary]
    llm_with_tools = llm.bind_tools(tools)

    prompt = f"Search for news about {state['stock_symobol']} stock in indian markets and get money control data"
    result = llm_with_tools.invoke(prompt)

    return {
        "messages": [result]
    }


#node3 money control scrapper

def money_control_scrapper(state: AgentState):
    """
    Scrape the money control website for the stock details
    return the stock details , price, change, market cap, PE ratio, etc.
    """
    money_control_tool = money_control_scrap()
    result = money_control_tool.invoke(state["stock_symobol"])
    return {
        "money_control_data": result
        }    

#node4 process tool results
def process_tools(state: AgentState):
    """
    Process the tool results and extract data
    """
    messages = state.get("messages", [])
    search_results = []

    # Extract tool results from messages
    for msg in messages:
        if hasattr(msg, 'content') and isinstance(msg.content, str) and msg.content:
            # Limit to first 2000 characters to avoid token limits
            search_results.append(msg.content[:2000])

    return {"web_search_results": "\n".join(search_results)}

#node5 financial analysis

def financial_analysis(state: AgentState):
    """
    Get the financial summary of the stock and draft a final report
    """
    # Limit the search results to avoid token limits
    search_data = state.get('web_search_results', '')[:5000]

    prompt = f"""Analyze the following information about {state['stock_symobol']} stock:

Search Results: {search_data}

Provide a concise analysis covering:
1. Current market position
2. Recent news impact
3. Investment recommendation with disclaimer
"""
    analysis = llm.invoke(prompt)
    return {
        "financial_analysis": analysis.content
    }

# Define tools for ToolNode
tools_list = [web_search(), money_control_scrap, get_financial_summary]

workflow.add_node("identify_stock", identify_stock)
workflow.add_node("news_search", news_search)
workflow.add_node("tools", ToolNode(tools_list))
workflow.add_node("process_tools", process_tools)
workflow.add_node("financial_analysis", financial_analysis)

workflow.add_edge(START, "identify_stock")
workflow.add_edge("identify_stock", "news_search")
workflow.add_conditional_edges("news_search", tools_condition)
workflow.add_edge("tools", "process_tools")
workflow.add_edge("process_tools", "financial_analysis")
workflow.add_edge("financial_analysis", END)

app = workflow.compile()

