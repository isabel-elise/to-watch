class dbInterface():
    def __init__(self):
        pass

    def createNewMovie(self, title:str, year:int, kind:str, cover_url:str, imdb_id:str):
        raise NotImplementedError
    
    def getMovieInfo(self, movie_id:int):
        raise NotImplementedError
    
    def setMovieTitle(self, movie_id:int, title:str):
        raise NotImplementedError
    def setMovieYear(self, movie_id:int, year:int):
        raise NotImplementedError
    def setMovieKind(self, movie_id:int, kind:str):
        raise NotImplementedError
    def setMovieCoverUrl(self, movie_id:int, cover_url:str):
        raise NotImplementedError
    def setMovieImdbID(self, movie_id:int, imdb_id:str):
        raise NotImplementedError
    def setMovieRating(self, movie_id:int, rating:float):
        raise NotImplementedError

    def getAllMoviesIds(self):
        raise NotImplementedError

    # def reorderElement(self, list_id, movie_id, operation):
    #     raise NotImplementedError
    
    # def getListOrder(self, list_id):
    #     raise NotImplementedError
    
    # def setListOrder(self, list_id, newOrder):
    #     raise NotImplementedError



