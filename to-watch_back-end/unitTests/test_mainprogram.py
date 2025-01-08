import pytest
from mainProgram import mainProgram, MainProgramException

# coverage run -m pytest ./to-watch_back-end/test_mainprogram.py 
# coverage report -m

class TestMainProgram:
    @pytest.fixture(autouse=True)
    def setup__and_teardown(self):
        # setup code
        setup = True
        if(setup):
            # create main program with database in memory for unit tests on db manipulation
            self.main = mainProgram(engine="sqlite:///:memory:")

        yield

        # teardown code
        teardown = True
        if(teardown):
            pass
    
    def test_user_can_create_movie(self):
        id = self.main.createNewMovie(title="any movie")
        movie = self.main.getMovieInfo(id)
        assert movie["title"] == "any movie"
    
    def test_user_cant_ask_for_invalid_movie(self):
        with pytest.raises(MainProgramException) as e:
            self.main.getMovieInfo(1)
        assert str(e.value) == "Movie id not found"

    def test_user_can_create_list(self):
        id = self.main.createNewList(list_name="any list")
        list = self.main.getListInfo(id)
        assert list["name"] == "any list"
    
    def test_user_can_delete_list(self):
        id = self.main.createNewList(list_name="any list")
        self.main.deleteList(id)
        with pytest.raises(MainProgramException) as e:
            self.main.getListInfo(id)
        assert str(e.value) == "List id not found"

    def test_user_cant_delete_invalid_list(self):
        with pytest.raises(MainProgramException) as e:
            self.main.deleteList(1)
        assert str(e.value) == "List id not found"

    def test_deleting_list_also_delete_any_movie_in_it(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie = self.main.createNewMovie(title="any movie")
        self.main.putMovieOnList(idMovie, idList)
        self.main.deleteList(idList)
        with pytest.raises(MainProgramException) as e:
            self.main.getMovieInfo(idMovie)
        assert str(e.value) == "Movie id not found"

    def test_user_cant_ask_for_invalid_list(self):
        with pytest.raises(MainProgramException) as e:
            self.main.getListInfo(1)
        assert str(e.value) == "List id not found"

    def test_user_created_list_is_initially_empty(self):
        id = self.main.createNewList(list_name="any list")
        order = self.main.getListInfo(id)["order"]
        assert len(order) == 0
    
    def test_user_can_put_movie_on_list(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie = self.main.createNewMovie(title="any movie")
        self.main.putMovieOnList(idMovie, idList)
        order = self.main.getListInfo(idList)["order"]
        assert idMovie in order and len(order) == 1

    def test_user_cant_put_invalid_movie_on_list(self):
        idList = self.main.createNewList(list_name="any list")
        with pytest.raises(MainProgramException) as e:
            self.main.putMovieOnList(1, idList)
        assert str(e.value) == "Movie id not found"
    
    def test_user_cant_put_movie_on_invalid_list(self):
        idMovie = self.main.createNewMovie(title="any movie")
        with pytest.raises(MainProgramException) as e:
            self.main.putMovieOnList(idMovie, 1)
        assert str(e.value) == "List id not found"
    
    def test_user_can_remove_movie_from_list(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie = self.main.createNewMovie(title="any movie")
        self.main.putMovieOnList(idMovie, idList)
        self.main.removeMovieFromList(idMovie, idList)
        order = self.main.getListInfo(idList)["order"]
        assert len(order) == 0
        
        # expect movie to not exist after being deleted from list
        with pytest.raises(MainProgramException) as e:
            self.main.getMovieInfo(idMovie)
        assert str(e.value) == "Movie id not found"
    
    def test_user_can_remove_movie_from_list_with_multiple_movies(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        self.main.removeMovieFromList(idMovie2, idList)
        order = self.main.getListInfo(idList)["order"]
        assert len(order) == 2
    
    def test_user_cant_remove_invalid_movie_from_list(self):
        idList = self.main.createNewList(list_name="any list")
        with pytest.raises(MainProgramException) as e:
            self.main.removeMovieFromList(1, idList)
        assert str(e.value) == "Movie id not found"
    
    def test_user_cant_remove_movie_from_invalid_list(self):
        idMovie = self.main.createNewMovie(title="any movie")
        with pytest.raises(MainProgramException) as e:
            self.main.removeMovieFromList(idMovie, 1)
        assert str(e.value) == "List id not found"
    
    def test_user_cant_remove_movie_from_list_that_doesnt_have_it(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie = self.main.createNewMovie(title="any movie")
        with pytest.raises(MainProgramException) as e:
            self.main.removeMovieFromList(idMovie, idList)
        assert str(e.value) == "Movie not in list"

    def test_new_movie_insertion_always_happens_at_end_of_list(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        order = self.main.getListInfo(idList)["order"]
        assert order == [idMovie1, idMovie2, idMovie3]

    def test_user_can_reorder_movie_in_list_up(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        self.main.reorderSingleMovieOnList(idMovie2, "up", idList)
        order = self.main.getListInfo(idList)["order"]
        assert order == [idMovie2, idMovie1, idMovie3]
    
    def test_user_can_reorder_movie_in_list_down(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        self.main.reorderSingleMovieOnList(idMovie2, "down", idList)
        order = self.main.getListInfo(idList)["order"]
        assert order == [idMovie1, idMovie3, idMovie2]
    
    def test_user_can_reorder_movie_in_list_to_top(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        self.main.reorderSingleMovieOnList(idMovie3, "first", idList)
        order = self.main.getListInfo(idList)["order"]
        assert order == [idMovie3, idMovie1, idMovie2]
    
    def test_user_can_reorder_movie_in_list_to_bottom(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        self.main.reorderSingleMovieOnList(idMovie1, "last", idList)
        order = self.main.getListInfo(idList)["order"]
        assert order == [idMovie2, idMovie3, idMovie1]
    
    def test_user_cant_call_for_invalid_reorder_operation(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.reorderSingleMovieOnList(idMovie1, "invalid", idList)
        assert str(e.value) == "Invalid operation"

    def test_user_cant_reorder_movie_in_invalid_list(self):
        idMovie1 = self.main.createNewMovie(title="movie 1")
        with pytest.raises(MainProgramException) as e:
            self.main.reorderSingleMovieOnList(idMovie1, "up", 1)
        assert str(e.value) == "List id not found"
    
    def test_user_cant_reorder_invalid_movie_in_list(self):
        idList = self.main.createNewList(list_name="any list")
        with pytest.raises(MainProgramException) as e:
            self.main.reorderSingleMovieOnList(1, "up", idList)
        assert str(e.value) == "Movie id not found"

    def test_user_cant_reorder_movie_that_is_not_on_list(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        with pytest.raises(MainProgramException) as e:
            self.main.reorderSingleMovieOnList(idMovie1, "up", idList)
        assert str(e.value) == "Movie is not on list"
    
    def test_user_cant_move_first_movie_up(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.reorderSingleMovieOnList(idMovie1, "up", idList)
        assert str(e.value) == "Movie is already at the top of the list"
    
    def test_user_can_move_last_movie_down(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.reorderSingleMovieOnList(idMovie2, "down", idList)
        assert str(e.value) == "Movie is already at the bottom of the list"

    def test_user_can_initialize_movie_without_information(self):
        idMovie = self.main.createNewMovie(title="movie 1")
        movieInfo = self.main.getMovieInfo(idMovie)
        assert movieInfo["title"] == "movie 1"
        assert movieInfo["year"] == None
        assert movieInfo["kind"] == None
        assert movieInfo["cover_url"] == None
        assert movieInfo["imdb_id"] == None
        assert movieInfo["rating"] == None
    
    def test_user_can_initialize_movie_with_information(self):
        idMovie = self.main.createNewMovie(title="movie 1", year=2000, kind="movie", cover_url="http://example.com/cover", imdb_id="1234567", rating=8.5)
        movieInfo = self.main.getMovieInfo(idMovie)
        assert movieInfo["title"] == "movie 1"
        assert movieInfo["year"] == 2000
        assert movieInfo["kind"] == "movie"
        assert movieInfo["cover_url"] == "http://example.com/cover"
        assert movieInfo["imdb_id"] == "1234567"
        assert movieInfo["rating"] == 8.5
    
    def test_user_can_edit_existing_movie_information(self):
        idMovie = self.main.createNewMovie(title="movie 1")
        self.main.editMovieInfo(idMovie, title="movie 2", year=2000, kind="movie", cover_url="http://example.com/cover", imdb_id="1234567", rating=8.5)
        movieInfo = self.main.getMovieInfo(idMovie)
        assert movieInfo["title"] == "movie 2"
        assert movieInfo["year"] == 2000
        assert movieInfo["kind"] == "movie"
        assert movieInfo["cover_url"] == "http://example.com/cover"
        assert movieInfo["imdb_id"] == "1234567"
        assert movieInfo["rating"] == 8.5

    def test_user_cant_edit_invalid_movie_information(self):
        with pytest.raises(MainProgramException) as e:
            self.main.editMovieInfo(1, title="movie 2", year=2000, kind="movie", cover_url="http://example.com/cover", imdb_id="1234567", rating=8.5)
        assert str(e.value) == "Movie id not found"

    def test_user_can_edit_existing_list_name(self):
        idList = self.main.createNewList(list_name="any list")
        self.main.editListName("new list name", idList)
        listInfo = self.main.getListInfo(idList)
        assert listInfo["name"] == "new list name"
    
    def test_user_cant_edit_invalid_list_name(self):
        with pytest.raises(MainProgramException) as e:
            self.main.editListName(1, "new list name")
        assert str(e.value) == "List id not found"
    
    def test_user_cant_put_movie_on_list_that_already_has_it(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie = self.main.createNewMovie(title="movie 1")
        self.main.putMovieOnList(idMovie, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.putMovieOnList(idMovie, idList)
        assert str(e.value) == "Movie already in list"
    
    def test_user_can_set_order_on_list(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        self.main.setNewOrderOnList(idList, [idMovie3, idMovie2, idMovie1])
        order = self.main.getListInfo(idList)["order"]
        assert order == [idMovie3, idMovie2, idMovie1]
    
    def test_user_cant_remove_movie_while_setting_order(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        self.main.putMovieOnList(idMovie3, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.setNewOrderOnList(idList, [idMovie3, idMovie2])
        assert str(e.value) == "New order is not valid"
    
    def test_user_cant_insert_movie_while_setting_order(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        idMovie3 = self.main.createNewMovie(title="movie 3")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.setNewOrderOnList(idList, [idMovie3, idMovie1, idMovie2])
        assert str(e.value) == "New order is not valid"
    
    def test_user_cant_duplicate_movie_while_setting_order(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1")
        idMovie2 = self.main.createNewMovie(title="movie 2")
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        with pytest.raises(MainProgramException) as e:
            self.main.setNewOrderOnList(idList, [idMovie1, idMovie1])
        assert str(e.value) == "New order is not valid"

    def test_user_cant_set_new_order_on_invalid_list(self):
        idMovie1 = self.main.createNewMovie(title="movie 1")
        with pytest.raises(MainProgramException) as e:
            self.main.setNewOrderOnList(1, [idMovie1])
        assert str(e.value) == "List id not found"

    def test_user_can_request_complete_list_info(self):
        idList = self.main.createNewList(list_name="any list")
        idMovie1 = self.main.createNewMovie(title="movie 1", year=2000, kind="movie", cover_url="http://example.com/cover", imdb_id="1234567", rating=8.5)
        idMovie2 = self.main.createNewMovie(title="movie 2", year=2001, kind="tv series", cover_url="http://example.com/cover2", imdb_id="7654321", rating=5.8)
        self.main.putMovieOnList(idMovie1, idList)
        self.main.putMovieOnList(idMovie2, idList)
        listInfo = self.main.getListCompleteMovieData(idList)
        assert listInfo[0]["id"] == idMovie1 and listInfo[0]["year"] == 2000 and listInfo[0]["kind"] == "movie" and listInfo[0]["cover_url"] == "http://example.com/cover" and listInfo[0]["imdb_id"] == "1234567" and listInfo[0]["rating"] == 8.5
        assert listInfo[1]["id"] == idMovie2 and listInfo[1]["year"] == 2001 and listInfo[1]["kind"] == "tv series" and listInfo[1]["cover_url"] == "http://example.com/cover2" and listInfo[1]["imdb_id"] == "7654321" and listInfo[1]["rating"] == 5.8

    def test_user_cant_request_complete_list_info_on_invalid_list(self):
        with pytest.raises(MainProgramException) as e:
            self.main.getListCompleteMovieData(1)
        assert str(e.value) == "List id not found"

    def test_user_can_request_every_list_name(self):
        idList1 = self.main.createNewList(list_name="any list")
        idList2 = self.main.createNewList(list_name="another list")
        idsAndNames = self.main.getAllListsIdsAndNamesInDatabase()
        assert {"id":idList1, "name":"any list"} in idsAndNames
        assert {"id":idList2, "name":"another list"} in idsAndNames

