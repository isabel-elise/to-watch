import pytest
from databaseSQLAlchemy import dbInterfaceSQLAlchemy, DatabaseException
from database import dbInterface

# coverage run -m pytest ./to-watch_back-end/test_database.py 
# coverage report

class TestDatabase: # pragma: no cover
    @pytest.fixture(autouse=True)
    def setup__and_teardown(self):
        # setup code
        setup = True
        if(setup):
            # create local database in memory for unit tests on db manipulation
            self.db = dbInterfaceSQLAlchemy(engine="sqlite:///:memory:")

        yield

        # teardown code
        teardown = True
        if(teardown):
            pass

    def test_db_implements_dbInterface(self):
        assert issubclass(type(self.db), dbInterface)
    
    def test_getting_all_movies_in_db(self):
        assert type(self.db.getAllMoviesIds()) == set

    def test_starting_database_has_no_movies(self):
        assert len(self.db.getAllMoviesIds()) == 0
    
    def test_creating_movie(self):
        self.db.createNewMovie(title="any movie")
        assert len(self.db.getAllMoviesIds()) == 1
    
    def test_searching_for_movie(self):
        id = self.db.createNewMovie(title="any movie")
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["title"] == "any movie"

    def test_searching_for_invalid_movie(self):
        with pytest.raises(DatabaseException) as e:
            self.db.getMovieInfo(movie_id=1)
        assert str(e.value) == "Movie id not found"

    
    def test_creating_movie_with_info(self):
        id = self.db.createNewMovie(title="any movie", year=2000, kind="movie", cover_url="any url", imdb_id="any imdb id", rating=7.7)
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["year"] == 2000
        assert movie["kind"] == "movie"
        assert movie["cover_url"] == "any url"
        assert movie["imdb_id"] == "any imdb id"
        assert movie["rating"] == 7.7
    
    def test_editing_movie_title(self):
        id = self.db.createNewMovie(title="any movie")
        self.db.setMovieTitle(movie_id=id, title="new title")
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["title"] == "new title"
    def test_editing_invalid_movie_title(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setMovieTitle(movie_id=1, title="new title")
        assert str(e.value) == "Movie id not found"
    def test_editing_movie_year(self):
        id = self.db.createNewMovie(title="any movie")
        self.db.setMovieYear(movie_id=id, year=2000)
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["year"] == 2000
    def test_editing_invalid_movie_year(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setMovieYear(movie_id=1, year=2000)
        assert str(e.value) == "Movie id not found"
    def test_editing_movie_kind(self):
        id = self.db.createNewMovie(title="any movie")
        self.db.setMovieKind(movie_id=id, kind="movie")
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["kind"] == "movie"
    def test_editing_invalid_movie_kind(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setMovieKind(movie_id=1, kind="movie")
        assert str(e.value) == "Movie id not found"
    def test_editing_movie_cover_url(self):
        id = self.db.createNewMovie(title="any movie")
        self.db.setMovieCoverUrl(movie_id=id, cover_url="any url")
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["cover_url"] == "any url"
    def test_editing_invalid_movie_cover_url(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setMovieCoverUrl(movie_id=1, cover_url="any url")
        assert str(e.value) == "Movie id not found"
    def test_editing_movie_imdb_id(self):
        id = self.db.createNewMovie(title="any movie")
        self.db.setMovieImdbID(movie_id=id, imdb_id="any imdb id")
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["imdb_id"] == "any imdb id"
    def test_editing_invalid_movie_imdb_id(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setMovieImdbID(movie_id=1, imdb_id="any imdb id")
        assert str(e.value) == "Movie id not found"
    def test_editing_movie_rating(self):
        id = self.db.createNewMovie(title="any movie")
        self.db.setMovieRating(movie_id=id, rating=7.7)
        movie = self.db.getMovieInfo(movie_id=id)
        assert movie["rating"] == 7.7
    def test_editing_invalid_movie_rating(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setMovieRating(movie_id=1, rating=7.7)
        assert str(e.value) == "Movie id not found"

    def test_there_is_no_repeated_id(self):
        numberOfMoviesToTest = 50
        setOfIds = set()

        for i in range(50):
            id = self.db.createNewMovie(title=f"movie number {i}")
            setOfIds.add(id)
        
        assert len(setOfIds) == numberOfMoviesToTest


    def test_getting_all_lists_in_db(self):
        assert type(self.db.getAllListsIds()) == set

    def test_starting_database_has_no_lists(self):
        assert len(self.db.getAllListsIds()) == 0
    
    def test_creating_list(self):
        self.db.createNewList(list_name="any list")
        assert len(self.db.getAllListsIds()) == 1

    def test_searching_for_list_name(self):
        id = self.db.createNewList(list_name="any list")
        name = self.db.getListName(list_id=id)
        assert name == "any list"

    def test_searching_for_invalid_list_name(self):
        with pytest.raises(DatabaseException) as e:
            self.db.getListName(list_id=1)
        assert str(e.value) == "List id not found"

    def test_searching_for_list_order(self):
        id = self.db.createNewList(list_name="any list")
        order = self.db.getListOrder(list_id=id)
        assert type(order) == list
    
    def test_searching_for_invalid_list_order(self):
        with pytest.raises(DatabaseException) as e:
            self.db.getListOrder(list_id=1)
        assert str(e.value) == "List id not found"

    def test_new_list_order_is_empty(self):
        id = self.db.createNewList(list_name="any list")
        order = self.db.getListOrder(list_id=id)
        assert len(order) == 0

    def test_editing_list_name(self):
        id = self.db.createNewList(list_name="any list")
        self.db.setListName(list_id=id, list_name="new name")
        name = self.db.getListName(list_id=id)
        assert name == "new name"
    def test_editing_invalid_list_name(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setListName(list_id=1, list_name="new name")
        assert str(e.value) == "List id not found"
    def test_editing_list_order(self):
        id = self.db.createNewList(list_name="any list")
        self.db.setListOrder(list_id=id, order=[1,2,3])
        order = self.db.getListOrder(list_id=id)
        assert order == [1,2,3]
    def test_editing_invalid_list_order(self):
        with pytest.raises(DatabaseException) as e:
            self.db.setListOrder(list_id=1, order=[1,2,3])
        assert str(e.value) == "List id not found"
