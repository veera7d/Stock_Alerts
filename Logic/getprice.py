import requests
from bs4 import BeautifulSoup

class_dic = {"amazon":'a-price-whole',
                "flipkart":'_30jeq3 _16Jk6d',
                "myntra":"pdp-price",
                "ajio":"prod-sp"}

def text_to_num(price_str):
    price=""
    for i in price_str:
        if i.isnumeric():
            price=price+i
    return float(price)


def get_amazon_flipkart_myntra_price(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    #<div class="_30jeq3 _16Jk6d">₹54,999</div>
    prices= soup.find_all(class_=class_dic[url.split('.')[1]])
    if len(prices)==0:
        return "null"
    for i in prices:
        print(text_to_num(i.text))
    

if __name__=="__main__":
    get_amazon_flipkart_myntra_price('https://www.flipkart.com/oneplus-10r-5g-prime-blue-128-gb/p/itmccf45a394ea16?pid=MOBGGJMR6SNFJ7H7&lid=LSTMOBGGJMR6SNFJ7H7TX4OVY&marketplace=FLIPKART&q=oneplus&store=search.flipkart.com&srno=s_1_8&otracker=search&otracker1=search&fm=Search&iid=cbf38e35-47fc-413f-b8a3-8d408bebedf0.MOBGGJMR6SNFJ7H7.SEARCH&ppt=sp&ppn=sp&ssid=11fag57q3t6w93401671603207987&qH=43780d550576947f')
    get_amazon_flipkart_myntra_price('https://www.amazon.in/dp/B07WDKLN4T/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B07WDKLN4T&pd_rd_w=AGfMl&content-id=amzn1.sym.c2dadbae-a5ca-4027-bbeb-67cd3d5a31f6&pf_rd_p=c2dadbae-a5ca-4027-bbeb-67cd3d5a31f6&pf_rd_r=AFM1C1G0BY84EVX0QXRY&pd_rd_wg=paHhU&pd_rd_r=25fb298f-7af4-4e7c-92e1-a2db586c449f&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyM1FHS1RMSDU1TUFWJmVuY3J5cHRlZElkPUEwNjQ4MDA5MkhPSjVWMTZPUlRLTiZlbmNyeXB0ZWRBZElkPUEwMTc0NTI3UzlUR1pNNkVWTVZHJndpZGdldE5hbWU9c3BfZGV0YWlsX3RoZW1hdGljJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==')
    get_amazon_flipkart_myntra_price('https://www.ajio.com/fort-collins-striped-zip-front-jacket/p/469285176_navy')
#print(get_amazon_flipkart_myntra_price('https://www.myntra.com/jackets/hrx-by-hrithik-roshan/hrx-by-hrithik-roshan-men-olive-green-solid-active-bomber-jacket/4453297/buy'))
#https://www.myntra.com/jackets/hrx-by-hrithik-roshan/hrx-by-hrithik-roshan-men-olive-green-solid-active-bomber-jacket/4453297/buy
# mintra class pdp-price

#https://www.ajio.com/fort-collins-striped-zip-front-jacket/p/469285176_navy
#ajio prod-sp