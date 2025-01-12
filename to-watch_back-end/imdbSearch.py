from imdb import Cinemagoer, IMDbDataAccessError

class ImdbSearcherException(Exception):
    pass

class imdbSearcher:
    def __init__(self):
        self.ia = Cinemagoer()

    def imdbSearchMultipleMovies(self, title):
        
        search_result = self.ia.search_movie(title)

        returnVal = [dict() for _ in range(len(search_result))]
        for i in range(len(search_result)):
            returnVal[i]["imdbID"] = search_result[i].getID()

            try:
                returnVal[i]["title"] = search_result[i]["title"]
            except:
                returnVal[i]["title"] = None

            try:
                returnVal[i]["year"] = search_result[i]["year"]
            except KeyError:
                returnVal[i]["year"] = None

            try:
                returnVal[i]["kind"] = search_result[i]["kind"]
            except KeyError:
                returnVal[i]["kind"] = None

            try:
                returnVal[i]["cover url"] = search_result[i]["cover url"]
            except KeyError:
                returnVal[i]["cover url"] = None

            try:
                returnVal[i]["full-size cover url"] = search_result[i]["full-size cover url"]
            except KeyError:
                returnVal[i]["full-size cover url"] = None

        return returnVal

    def imdbSearchSingleMovie(self, imdbID):
        try:
            movie = self.ia.get_movie(imdbID)
        except IMDbDataAccessError:
            raise ImdbSearcherException("Movie id not found")
        returnVal = dict()

        returnVal["imdbID"] = movie.getID()

        try:
            returnVal["title"] = movie["title"]
        except:
            returnVal["title"] = None

        try:
            returnVal["year"] = movie["year"]
        except KeyError:
            returnVal["year"] = None

        try:
            returnVal["kind"] = movie["kind"]
        except KeyError:
            returnVal["kind"] = None

        try:
            returnVal["cover url"] = movie["cover url"]
        except KeyError:
            returnVal["cover url"] = None

        try:
            returnVal["full-size cover url"] = movie["full-size cover url"]
        except KeyError:
            returnVal["full-size cover url"] = None
        
        try:
            returnVal["rating"] = movie["rating"]
        except KeyError:
            returnVal["rating"] = None
        
        try:
            returnVal["genres"] = movie["genres"]
        except KeyError:
            returnVal["genres"] = None
        
        try:
            returnVal["plot outline"] = movie["plot outline"]
        except KeyError:
            returnVal["plot outline"] = None
        
        return returnVal