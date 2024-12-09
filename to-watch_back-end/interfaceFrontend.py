from imdbSearch import imdbSearcher

class interfaceFrontend:
    def __init__(self):
        self.imdbSearcher:imdbSearcher = imdbSearcher()

    def imdbSearchMultipleMovies(self, query_term):
        """
        Search for a movie in IMDB

        Keys:
        - title
        - year
        - kind
        - cover url
        - full-size cover url
        - imdbID
        """
        return self.imdbSearcher.imdbSearchMultipleMovies(query_term)