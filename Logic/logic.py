import json
import tradingView as TV
import mongoClient as mogClient

#rule_dic = { script ,[[ activeORinactive, condition , value ],[ activeORinactive, condition , value ]]}
def get_stock_prices(rule_dic):
    return TV.get_mulit_stock_price(list(set(rule_dic.keys())))

def cal(price,condition,value):
    if condition=='greater than':
        if price>value:
            return True
    elif condition=='less than':
        if price<value:
            return True
    elif condition=='greater than eql':
        if price>=value:
            return True
    elif condition=='les than eql':
        if price<=value:
            return True
    return False

def logic(rule_dic):
    stock_prices = get_stock_prices(rule_dic)
    out={}
    for i in rule_dic.keys():
        listt=rule_dic[i]
        for j in range(len(listt)):
            if listt[j][0]=='Active':
                out[i]=[j,cal(stock_prices[i],listt[j][1],listt[j][2])]
    return out

if __name__=="__main__":
    '''
    f=open("rules.json",'r')
    rule_json_obj=json.load(f)
    f.close()
    print(logic(rule_json_obj))
    '''
    testdb=mogClient.Mongo_Client("mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=2000&connectTimeoutMS=10000").connect('test')
    ruleColl=testdb['rules']
    ruleCursor=ruleColl.find({"active":1})
    stockList=[]
    rules=[]
    for i in ruleCursor:
        rules.append(i)
        stockList.append(i['stock'])
    price=TV.get_mulit_stock_price(list(set(stockList)))
    print(price)
    out=[]
    for i in rules:
        trf=cal(price[i['stock']],i['condition'],i['value'])
        out.append(trf)
    print(out)