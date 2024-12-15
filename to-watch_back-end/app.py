from flask import Flask, request, abort
from mainProgram import mainProgram, MainProgramException

app = Flask(__name__)

# Recuperação inicial de dados

# Listas disponíveis
@app.route("/lists")
def getEveryListInfo():
    return mainProgram().getAllListsIdsAndNamesInDatabase()

# Entradas na lista
@app.route("/movies/<list_id>")
def getMovieInfo(list_id:int):
    return mainProgram().getListCompleteMovieData(list_id=list_id)


# Buscar dados do imdb

# Buscar múltiplos filmes
@app.route("/search_movie/<keyword>")
def searchMovieIMDB(keyword:str):
    return mainProgram().imdbSearchMultipleMovies(keyword)

# Buscar único filme
@app.route("/get_movie/<imdb_id>")
def getMovieIMDB(imdb_id:str):
    return mainProgram().imdbSearchSingleMovie(imdb_id)


# Adicionar elementos

# Adicionar entrada na lista
@app.route("/add_movie/<list_id>", methods=["POST"])
def addMovieToList(list_id:int):
    raise NotImplementedError

# Adicionar lista
@app.route("/add_list/", methods=["POST"])
def addNewList():
    raise NotImplementedError


# Salvar

# Salvar lista
@app.route("/save_list/<list_id>", methods=["POST"])
def saveList(list_id:int):
    raise NotImplementedError



if __name__ == '__main__':
    app.run(debug=True, port=5000)