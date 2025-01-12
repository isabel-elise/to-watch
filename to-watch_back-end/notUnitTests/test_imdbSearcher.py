import pytest
from imdbSearch import imdbSearcher, ImdbSearcherException

class TestImdbSearcher: # pragma: no cover

    def test_imdbSearcher_can_find_charlotte_anime(self):
        searcher = imdbSearcher()

        charlotteIMDBID = "4574736"
        foundCharlotteID = False

        for element in searcher.imdbSearchMultipleMovies("charlotte"):
            try:
                if element["imdbID"] == charlotteIMDBID:
                    foundCharlotteID = True
            except:
                pass
        
        assert foundCharlotteID
    
    def test_imdbSearcher_can_find_matrix_movie(self):
        searcher = imdbSearcher()

        matrixIMDBID = "0133093"
        foundMatrixID = False

        for element in searcher.imdbSearchMultipleMovies("matrix"):
            try:
                if element["imdbID"] == matrixIMDBID:
                    foundMatrixID = True
            except:
                pass
        
        assert foundMatrixID
    
    def test_imdbSearcher_can_find_miraculous_tv_show(self):
        searcher = imdbSearcher()

        miraculousIMDBID = "2580046"
        foundMiraculousID = False

        for element in searcher.imdbSearchMultipleMovies("miraculous"):
            try:
                if element["imdbID"] == miraculousIMDBID:
                    foundMiraculousID = True
            except:
                pass
        
        assert foundMiraculousID
    
    def test_imdbSearcher_returns_empty_list_on_absurd_query(self):
        searcher = imdbSearcher()

        # this shouldnt return anything, because there is no lorem ipsum movie nor any reasonable fuzzy matching
        listReturned = searcher.imdbSearchMultipleMovies("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")

        assert listReturned == []

    def test_imdbSearcher_for_single_movie_returns_dict_with_every_expected_key(self):
        searcher = imdbSearcher()
        movieID = "0133093" # matrix

        dictReturned = searcher.imdbSearchSingleMovie(movieID)
        expectedKeys = ["imdbID", "title", "year", "kind", "cover url", "full-size cover url", "rating", "genres", "plot outline"]

        keysFailedExpectation = [key for key in expectedKeys if key not in dictReturned.keys()]

        assert len(keysFailedExpectation) == 0

    def test_imdbSearcher_for_single_movie_returns_dict_with_valid_information(self):
        searcher = imdbSearcher()
        movieID = "0133093" # matrix

        dictReturned = searcher.imdbSearchSingleMovie(movieID)

        assert dictReturned["imdbID"] is not None
        assert dictReturned["title"] is not None
        assert dictReturned["year"] is not None
        assert dictReturned["kind"] is not None
        assert dictReturned["cover url"] is not None
        assert dictReturned["full-size cover url"] is not None
        assert dictReturned["rating"] is not None
        assert dictReturned["genres"] is not None
        assert dictReturned["plot outline"] is not None

    def test_imdbSearcher_searching_for_single_movie_with_invalid_id_raises_exception(self):
        searcher = imdbSearcher()
        invalidID = "0123456789"

        with pytest.raises(ImdbSearcherException):
            searcher.imdbSearchSingleMovie(invalidID)






if __name__ == "__main__":


    pytest.main([__file__])

    # imdbSearcher = imdbSearcher()

    # print(imdbSearcher.imdbSearchSingleMovie("0133093333"))
