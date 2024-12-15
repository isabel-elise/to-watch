from flask import Flask, request, abort
from mainProgram import mainProgram, MainProgramException

app = Flask(__name__)


@app.route("/test")
def test():
    aux = mainProgram().getListCompleteMovieData(1)
    return str(aux)


# Recuperação inicial de dados

# Listas disponíveis
@app.route("/lists")
def getEveryListInfo():
    return mainProgram().getAllListsIdsAndNamesInDatabase()

# Entradas na lista
@app.route("/movies/<list_id>")
def getMovieInfo(list_id):
    return mainProgram().getListCompleteMovieData(list_id=int(list_id))


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
    data = request.get_json()

    list_id = int(list_id)

    if data is None:
        abort(400, "Missing data")

    if "title" in data:
        title = data["title"]
    else:
        abort(400, "Missing title")

    year = None
    if "year" in data:
        year = int(data["year"])
    
    kind = None
    if "kind" in data:
        kind = data["kind"]

    cover_url = None
    if "cover_url" in data:
        cover_url = data["cover_url"]

    imdb_id = None
    if "imdb_id" in data:
        imdb_id = data["imdb_id"]

    rating = None
    if "rating" in data:
        rating = float(data["rating"])

    try:
        movie_id = mainProgram().createNewMovie(title=title, year=year, kind=kind, cover_url=cover_url, imdb_id=imdb_id, rating=rating)
        mainProgram().putMovieOnList(movie_id=movie_id, list_id=list_id)
    except MainProgramException as e:
        abort(400, str(e))

    return mainProgram().getListCompleteMovieData(list_id=int(list_id))

# Adicionar lista
@app.route("/add_list", methods=["POST"])
def addNewList():
    data = request.get_json()

    if data is None:
        abort(400, "Missing data")
    if "list_name" not in data:
        abort(400, "Missing list name")

    list_name = data["list_name"]
    list_id = mainProgram().createNewList(list_name)
    
    return mainProgram().getAllListsIdsAndNamesInDatabase()


# Salvar

# Salvar lista (salvar nova ordem da lista)
@app.route("/save_list/<list_id>", methods=["POST"])
def saveList(list_id:int):
    data = request.get_json()

    list_id = int(list_id)

    if data is None:
        abort(400, "Missing data")
    if "order" not in data:
        abort(400, "Missing order")

    order = data["order"]
    
    try:
        mainProgram().setNewOrderOnList(list_id=list_id, newOrder=order)
    except MainProgramException as e:
        abort(400, str(e))

    return mainProgram().getListCompleteMovieData(list_id=list_id)



if __name__ == '__main__':
    app.run(debug=True, port=5000)