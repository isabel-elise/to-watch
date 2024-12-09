from imdbSearch import imdbSearcher
from database import dbInterface
from databaseSQLAlchemy import dbInterfaceSQLAlchemy

class mainProgram:
    def __init__(self, engine="sqlite:///towatch.db"):
        self.imdbSearcher:imdbSearcher = imdbSearcher()
        self.db:dbInterface = dbInterfaceSQLAlchemy(engine=engine)

    def imdbSearchMultipleMovies(self, query_term):
        """
        Search for a movie in IMDB, returns dict

        Keys:
        - title
        - year
        - kind
        - cover url
        - full-size cover url
        - imdbID
        """
        return self.imdbSearcher.imdbSearchMultipleMovies(query_term)