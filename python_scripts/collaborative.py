import pickle
import sys
import pandas as pd
import json



def get_similar(movie_name,rating):
    similar_ratings = corrMatrix[movie_name]*(rating-2.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
    #print(type(similar_ratings))
    return similar_ratings

corrMatrix = pickle.load(open('py_model/collaborative.pkl','rb'))

uReviews = json.loads(sys.argv[1])
similar_movies = pd.DataFrame()
for mData in uReviews:
    similar_movies = similar_movies.append(get_similar(mData['movie'],int(mData['review'])),ignore_index = True)
    
mvv = similar_movies.head(0)
mList = []
for m in mvv:
    mList.append(m)
print(mList[0:10])

