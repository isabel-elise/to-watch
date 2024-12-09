from flask import Flask, request, abort
from interfaceFrontend import interfaceFrontend

app = Flask(__name__)

@app.route("/imdbsearch/<query_term>")
@app.route("/imdbSearch/<query_term>")
def search(query_term):
    return interfaceFrontend().imdbSearchMultipleMovies(query_term)

@app.route("/movie/<movie_id>")
def getMovieInfo(movie_id):
    return f"<p>Getting movie info for \"{movie_id}\" </p>"

@app.route("/reorder/<list_id>/<movie_id>/<operation>", methods=["POST"])
def reorderElement(list_id, movie_id, operation):
    if operation not in ["up", "down", "first", "last"]:
        abort(400) # Bad request
    return f"<p> Reordering, on list \"{list_id}\", the movie \"{movie_id}\" with the operation \"{operation}\" </p>"

@app.route("/getOrder/<list_id>")
def getListOrder(list_id):
    return f"<p>Getting list order for \"{list_id}\" </p>"

@app.route("/setOrder/<list_id>", methods=["POST"])
def setListOrder(list_id):
    data = request.get_json()
    return f"<p>Setting list order for \"{list_id}\", with json = {data} </p>"


if __name__ == '__main__':
    app.run(debug=True, port=5000)