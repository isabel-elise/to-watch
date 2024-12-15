from imdbSearch import imdbSearcher
from database import dbInterface
from databaseSQLAlchemy import dbInterfaceSQLAlchemy

class MainProgramException(Exception):
    pass

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

    def imdbSearchSingleMovie(self, imdbID:str):
        """
        Search for a movie in IMDB, returns dict

        Keys:
        - title
        - year
        - kind
        - cover url
        - full-size cover url
        - imdbID
        - rating
        - genres
        - plot outline
        """
        return self.imdbSearcher.imdbSearchSingleMovie(imdbID)
    
    def getMovieInfo(self, movie_id:int):
        if movie_id not in self.db.getAllMoviesIds():
            raise MainProgramException("Movie id not found")
        return self.db.getMovieInfo(movie_id=movie_id)


    def createNewMovie(self, title:str, year:int=None, kind:str=None, cover_url:str=None, imdb_id:str=None, rating:float=None):
        return self.db.createNewMovie(title=title, year=year, kind=kind, cover_url=cover_url, imdb_id=imdb_id, rating=rating)

    def editMovieInfo(self, movie_id:int, title:str=None, year:int=None, kind:str=None, cover_url:str=None, imdb_id:str=None, rating:float=None):
        if movie_id not in self.db.getAllMoviesIds():
            raise MainProgramException("Movie id not found")

        if title is not None:
            self.db.setMovieTitle(movie_id=movie_id, title=title)
        if year is not None:
            self.db.setMovieYear(movie_id=movie_id, year=year)
        if kind is not None:
            self.db.setMovieKind(movie_id=movie_id, kind=kind)
        if cover_url is not None:
            self.db.setMovieCoverUrl(movie_id=movie_id, cover_url=cover_url)
        if imdb_id is not None:
            self.db.setMovieImdbID(movie_id=movie_id, imdb_id=imdb_id)
        if rating is not None:
            self.db.setMovieRating(movie_id=movie_id, rating=rating)

    def getListInfo(self, list_id:int):
        
        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")

        name = self.db.getListName(list_id=list_id)
        order = self.db.getListOrder(list_id=list_id)
        return {"name":name, "order":order}


    def createNewList(self, list_name:str):
        return self.db.createNewList(list_name=list_name)

    def editListName(self, new_list_name:str, list_id:int):
        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")
        self.db.setListName(list_id=list_id, list_name=new_list_name)

    def putMovieOnList(self, movie_id:int, list_id:int):

        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")
        if movie_id not in self.db.getAllMoviesIds():
            raise MainProgramException("Movie id not found")

        order = self.db.getListOrder(list_id=list_id)

        if movie_id in order:
            raise MainProgramException("Movie already in list")

        newOrder = order.copy()
        newOrder.append(movie_id)
        self.db.setListOrder(list_id=list_id, order=newOrder)
    
    def removeMovieFromList(self, movie_id:int, list_id:int):
        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")
        if movie_id not in self.db.getAllMoviesIds():
            raise MainProgramException("Movie id not found")
        if movie_id not in self.db.getListOrder(list_id=list_id):
            raise MainProgramException("Movie not in list")

        order = self.db.getListOrder(list_id=list_id)

        newOrder = order.copy()
        newOrder.remove(movie_id)
        self.db.setListOrder(list_id=list_id, order=newOrder)

    def setNewOrderOnList(self, list_id:int, newOrder:list[int]):
        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")
        
        oldOrder = self.db.getListOrder(list_id=list_id)

        dictOld = dict()
        dictNew = dict()

        for indice in oldOrder:
            if indice not in dictOld:
                dictOld[indice] = 0
            dictOld[indice] += 1

        for indice in newOrder:
            if indice not in dictNew:
                dictNew[indice] = 0
            dictNew[indice] += 1
        
        if dictOld != dictNew:
            raise MainProgramException("New order is not valid")

        self.db.setListOrder(list_id=list_id, order=newOrder)

    def reorderSingleMovieOnList(self, movie_id:int, operation:str, list_id:int):
        if operation not in ["up", "down", "first", "last"]:
            raise MainProgramException("Invalid operation")
        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")
        if movie_id not in self.db.getAllMoviesIds():
            raise MainProgramException("Movie id not found")

        currentOrder:list[int] = self.db.getListOrder(list_id)
        
        position = -1
        for i in range(len(currentOrder)):
            if currentOrder[i] == movie_id:
                position = i
                break
        
        if position == -1:
            raise MainProgramException("Movie is not on list")

        if operation == "up" and position == 0:
            raise MainProgramException("Movie is already at the top of the list")
        if operation == "down" and position == len(currentOrder) - 1:
            raise MainProgramException("Movie is already at the bottom of the list")
        
        newOrder = currentOrder.copy()
        if operation == "up":
            newOrder[position-1], newOrder[position] = newOrder[position], newOrder[position-1]
        elif operation == "down":
            newOrder[position+1], newOrder[position] = newOrder[position], newOrder[position+1]
        elif operation == "first":
            newOrder.pop(position)
            newOrder.insert(0, movie_id)
        elif operation == "last":
            newOrder.pop(position)
            newOrder.append(movie_id)

        self.db.setListOrder(list_id, newOrder)

    def getListCompleteMovieData(self, list_id:int):
        if list_id not in self.db.getAllListsIds():
            raise MainProgramException("List id not found")
        order = self.db.getListOrder(list_id=list_id)
        return [self.db.getMovieInfo(movie_id) for movie_id in order]

    def getAllListsIdsAndNamesInDatabase(self):
        ids = self.db.getAllListsIds()
        return [{"id":id, "name":self.db.getListName(list_id=id)} for id in ids]