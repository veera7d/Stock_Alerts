from pymongo import MongoClient
class Mongo_Client:
    def __init__(self,ConString) -> None:
        self.CONNECTIONSTRING = ConString
    def connect(self,DB):
        self.client=MongoClient(self.CONNECTIONSTRING)
        return self.client[DB]