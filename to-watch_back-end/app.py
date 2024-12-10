from flask import Flask, request, abort
from mainProgram import mainProgram

app = Flask(__name__)

@app.route("/imdbMultiSearch/<query_term>")
def multisearch(query_term):
    return mainProgram().imdbSearchMultipleMovies(query_term)

@app.route("/imdbSingleSearch/<imdbID>")
def singlesearch(imdbID:str):
    return mainProgram().imdbSearchSingleMovie(str(imdbID))

@app.route("/getMovieInfo/<movie_id>")
def getMovieInfo(movie_id):
    return mainProgram().getMovieInfo(int(movie_id))

@app.route("/createNewMovie/<title>", methods=["POST"])
def createNewMovie(title:str):
    year = request.args.get("year", default=None, type=int)
    kind = request.args.get("kind", default=None, type=str)
    cover_url = request.args.get("cover_url", default=None, type=str)
    imdb_id = request.args.get("imdb_id", default=None, type=str)
    rating = request.args.get("rating", default=None, type=float)
    return mainProgram().createNewMovie(title=title, year=year, kind=kind, cover_url=cover_url, imdb_id=imdb_id, rating=rating)

@app.route("/editMovieInfo/<movie_id>", methods=["POST"])
def editMovieInfo(movie_id):
    title = request.args.get("title", default=None, type=str)
    year = request.args.get("year", default=None, type=int)
    kind = request.args.get("kind", default=None, type=str)
    cover_url = request.args.get("cover_url", default=None, type=str)
    imdb_id = request.args.get("imdb_id", default=None, type=str)
    rating = request.args.get("rating", default=None, type=float)
    return mainProgram().editMovieInfo(int(movie_id), title=title, year=year, kind=kind, cover_url=cover_url, imdb_id=imdb_id, rating=rating)

@app.route("/getListInfo/<list_id>")
def getListInfo(list_id):
    return mainProgram().getListInfo(int(list_id))

@app.route("/createNewList/<list_name>", methods=["POST"])
def createNewList(list_name):
    return mainProgram().createNewList(list_name)

@app.route("/putMovieOnList/<movie_id>/<list_id>", methods=["POST"])
def putMovieOnList(movie_id, list_id):
    return mainProgram().putMovieOnList(int(movie_id), int(list_id))

@app.route("/setNewOrderOnList/<list_id>", methods=["POST"])
def setNewOrderOnList(list_id):
    raise NotImplementedError






# @app.route("/reorder/<list_id>/<movie_id>/<operation>", methods=["POST"])
# def reorderElement(list_id, movie_id, operation):
#     if operation not in ["up", "down", "first", "last"]:
#         abort(400) # Bad request
#     return f"<p> Reordering, on list \"{list_id}\", the movie \"{movie_id}\" with the operation \"{operation}\" </p>"

# @app.route("/getOrder/<list_id>")
# def getListOrder(list_id):
#     return f"<p>Getting list order for \"{list_id}\" </p>"

# @app.route("/setOrder/<list_id>", methods=["POST"])
# def setListOrder(list_id):
#     data = request.get_json()
#     return f"<p>Setting list order for \"{list_id}\", with json = {data} </p>"


if __name__ == '__main__':
    app.run(debug=True, port=5000)