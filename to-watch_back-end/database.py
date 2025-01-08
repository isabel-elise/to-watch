class DatabaseException(Exception):
    pass

class dbInterface(): # pragma: no cover
    def __init__(self):
        pass

    def createNewMovie(self, title:str, year:int, kind:str, cover_url:str, imdb_id:str):
        raise NotImplementedError
    def deleteMovie(self, movie_id:int):
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
    


    def createNewList(self, list_name):
        raise NotImplementedError
    def deleteList(self, list_id:int):
        raise NotImplementedError

    def getAllListsIds(self):
        raise NotImplementedError
    
    def setListName(self, list_id:int, list_name:str):
        raise NotImplementedError   
    def getListName(self, list_id:int):
        raise NotImplementedError
    def setListOrder(self, list_id:int, order:list[int]):
        raise NotImplementedError
    def getListOrder(self, list_id:int):
        raise NotImplementedError

