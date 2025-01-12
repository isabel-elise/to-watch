import pytest
from imdbSearch import imdbSearcher, ImdbSearcherException
from mainProgram import mainProgram
from unittest import mock
from imdb import IMDbDataAccessError



class TestImdbSearcher:
    @pytest.fixture(autouse=True)
    def setup__and_teardown(self):
        # setup code
        setup = True
        if(setup):
            # create main program with database in memory for unit tests
            self.main = mainProgram(engine="sqlite:///:memory:")

            # creating a stub for a movie for ngnl
            movieExampleStubNGNL = mock.MagicMock()
            movieExampleStubNGNL.getID = mock.MagicMock()
            movieExampleStubNGNL.getID.return_value = "3431758"
            movieExampleStubNGNL.__getitem__ = mock.MagicMock()
            def stubGetItem(key):
                values = {
                    'cover url': 'https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@._V1_QL75_UY74_CR0,0,50,74_.jpg',
                    'full-size cover url': 'https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg',
                    'imdbID': '3431758',
                    'kind': 'tv series',
                    'title': 'No Game, No Life',
                    'year': 2014
                }
                return values[key]
            movieExampleStubNGNL.__getitem__.side_effect = stubGetItem

            # creating a stub for a movie without the keys
            movieExampleStubEmptyKeys = mock.MagicMock()
            movieExampleStubEmptyKeys.getID = mock.MagicMock()
            movieExampleStubEmptyKeys.getID.return_value = "1234567"
            movieExampleStubEmptyKeys.__getitem__ = mock.MagicMock()
            def stubGetItemEmpty(key):
                values = {
                }
                return values[key]
            movieExampleStubEmptyKeys.__getitem__.side_effect = stubGetItemEmpty


            # creating a stub for replacing the imdb external service search_movie
            self.main.imdbSearcher.ia.search_movie = mock.MagicMock()
            def stubSearchMovie(title):
                if title == "No Game No Life":
                    return [movieExampleStubNGNL, movieExampleStubEmptyKeys]
                return []
            self.main.imdbSearcher.ia.search_movie.side_effect = stubSearchMovie

            # creating a stub for replacing the imdb external service get_movie
            self.main.imdbSearcher.ia.get_movie = mock.MagicMock()
            def stubGetMovie(imdbID):
                if imdbID == "3431758":
                    return movieExampleStubNGNL
                elif imdbID == "1234567":
                    return movieExampleStubEmptyKeys
                raise IMDbDataAccessError
            self.main.imdbSearcher.ia.get_movie.side_effect = stubGetMovie

        yield

        # teardown code
        teardown = True
        if(teardown):
            pass
    

    def test_imdbSearcher_multiple_movies_calls_search_movie_with_same_title_as_parameter(self):

        movieTitle = "random movie"

        self.main.imdbSearcher.imdbSearchMultipleMovies(movieTitle)

        self.main.imdbSearcher.ia.search_movie.assert_called_once_with(movieTitle)

    def test_imdbSearcher_multiple_movies_correctly_access_indexed_data_from_the_returned_list(self):
        movieTitle = "No Game No Life"

        result = self.main.imdbSearcher.imdbSearchMultipleMovies(movieTitle)

        correctEntryIsInReturnedList = False
        for element in result:
            if element["imdbID"] == "3431758" and element["title"] == "No Game, No Life" and element["year"] == 2014:
                correctEntryIsInReturnedList = True
        
        assert correctEntryIsInReturnedList

    def test_imdbSearcher_single_movie_calls_get_movie_with_same_imdbID_as_parameter(self):
        imdbID = "3431758"

        self.main.imdbSearcher.imdbSearchSingleMovie(imdbID)

        self.main.imdbSearcher.ia.get_movie.assert_called_once_with(imdbID)
    
    def test_imdbSearcher_single_movie_correctly_access_indexed_data_from_the_returned_object(self):
        imdbID = "3431758"

        result = self.main.imdbSearcher.imdbSearchSingleMovie(imdbID)

        assert result["imdbID"] == "3431758"
        assert result["title"] == "No Game, No Life"
        assert result["year"] == 2014
    
    def test_imdbSearcher_single_movie_correctly_access_indexed_data_from_the_returned_object_without_keys(self):
        imdbID = "1234567"

        result = self.main.imdbSearcher.imdbSearchSingleMovie(imdbID)

        assert result["imdbID"] == "1234567"
        assert result["title"] == None
        assert result["year"] == None
        assert result["kind"] == None
        assert result["cover url"] == None
        assert result["full-size cover url"] == None
        assert result["rating"] == None
        assert result["genres"] == None
        assert result["plot outline"] == None
    
    def test_imdbSearcher_single_movie_raises_error_if_imdbID_is_not_found(self):
        imdbID = "123456789123"

        with pytest.raises(ImdbSearcherException) as e:
            self.main.imdbSearcher.imdbSearchSingleMovie(imdbID)
        assert str(e.value) == "Movie id not found"
    
    def test_mainProgram_can_call_imdbSearcher_imdbSearchSingleMovie(self):
        imdbID = "3431758"

        result = self.main.imdbSearchSingleMovie(imdbID)

        assert result["imdbID"] == "3431758"
        assert result["title"] == "No Game, No Life"
        assert result["year"] == 2014
    
    def test_mainProgram_can_call_imdbSearcher_imdbSearchMultipleMovies(self):
        movieTitle = "No Game No Life"

        result = self.main.imdbSearchMultipleMovies(movieTitle)

        correctEntryIsInReturnedList = False
        for element in result:
            if element["imdbID"] == "3431758" and element["title"] == "No Game, No Life" and element["year"] == 2014:
                correctEntryIsInReturnedList = True
        
        assert correctEntryIsInReturnedList







