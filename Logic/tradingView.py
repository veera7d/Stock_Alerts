#https://github.com/brian-the-dev/python-tradingview-ta
#https://python-tradingview-ta.readthedocs.io/en/latest/usage.html#retrieving-multiple-analysis
#https://codepen.io/mrcn/pen/KqyEpM
#https://www.npmjs.com/package/@mathieuc/tradingview
from tradingview_ta import *

def create_tahalenderobj(Stock_name):
    return TA_Handler(
            symbol=str(Stock_name),
            screener="india",
            exchange="NSE",
            interval=Interval.INTERVAL_1_MINUTE
        )

def get_multi_stock_data(list_stocks):
    list_temp=[]
    for i in list_stocks:
        list_temp.append("NSE:"+i)
    dic={}
    try:
        dic=get_multiple_analysis(screener="india", interval=Interval.INTERVAL_1_HOUR, symbols=list_temp)
    except Exception as exc:
        print(exc)
    out=[]
    for i in dic.keys():
        out.append(dic[i].__dict__)
    return out

def get_stock_data(Stock_name):
    name = create_tahalenderobj(Stock_name)
    dic={}
    try:
        dic=name.get_analysis().__dict__
    except Exception as exc:
        print(exc)
    return dic

def get_stock_price(Stock):
    return get_stock_data(Stock)['indicators']['close']

def get_mulit_stock_price(Stocks):
    out={}
    for i in get_multi_stock_data(Stocks):
        out[i['symbol']]=i['indicators']['close']
    return out

if __name__ == "__main__" :
    #dic=get_stock_data("TCS")
    #print(dic)
    print(get_stock_price('TCS'))
    print(get_multi_stock_data(['TCS','ITC'])[1]['indicators']['close'])
    print(get_mulit_stock_price(['TCS','ITC','INFY']))
    