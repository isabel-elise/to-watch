from imdb import Cinemagoer

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
        movie = self.ia.get_movie(imdbID)