from pymongo import MongoClient
from dotenv import dotenv_values

class DatabaseAtlas(object):

    MONGODB_URL = dotenv_values('.env')['MONGODB_URL']
    client = MongoClient(MONGODB_URL, serverSelectionTimeoutMS = 2000)
    db = client["venues"]

    #These methods override default methods, thus different casing

    @staticmethod
    def insertOne(col, data):
        return DatabaseAtlas.db[col].insert_one(data)

    @staticmethod
    def insertMany(col, data):
        return DatabaseAtlas.db[col].insert_many(data)

    @staticmethod
    def find(col, query):
        return DatabaseAtlas.db[col].find_one(query, {"_id":0})

    @staticmethod
    def findAll(col, query = None):
        if query == None:
            query = {}
        findlist = [i for i in DatabaseAtlas.db[col].find(query, {"_id":0})]
        return findlist

    @staticmethod
    def findFields(col, query, *fields):
        dict_fields = {}
        for field in fields:
            dict_fields[field] = 1
            dict_fields["_id"] = 0
        findlist = [i for i in DatabaseAtlas.db[col].find(query, dict_fields)]
        return findlist

    @staticmethod
    def updateOne(col, query, update):
        return DatabaseAtlas.db[col].update_one(query, {'$set': update})

    @staticmethod
    def lenAll(col):
        return len([i for i in DatabaseAtlas.db[col].find({})])

    @staticmethod
    def deleteOne(col, query):
        DatabaseAtlas.db[col].delete_one(query)

    @staticmethod
    def findItemsWithSameKeyValue(col, k):

        pipeline = [
            {
                "$group": {
                    "_id": f"${k}",
                    "count": {"$sum": 1},
                    "docs": {"$push": "$$ROOT"}
                }
            },
            {
                "$match": {
                    "count": {"$gt": 1}
                }
            }
        ]

        result = DatabaseAtlas.db[col].aggregate(pipeline)

        for group in result:
            print(f"Duplicate ascii_name: {group['_id']}, Count: {group['count']}")
            for doc in group['docs']:
                print(doc)

        return result

    @staticmethod
    def dropCol(col):
        return DatabaseAtlas.db[col].drop()

print(DatabaseAtlas.db.list_collection_names())
