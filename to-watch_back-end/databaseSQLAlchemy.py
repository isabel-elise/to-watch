from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from database import dbInterface

Base = declarative_base()

class Movie(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    year = Column(Integer, nullable=True)
    kind = Column(String, nullable=True)
    cover_url = Column(String, nullable=True)
    imdb_id = Column(String, nullable=True)
    rating = Column(Float, nullable=True)



class dbInterfaceSQLAlchemy(dbInterface):
    def __init__(self, createTable=False):
        self.engine = create_engine('sqlite:///towatch.db')
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
    
    def createNewMovie(self, 
                       title:str, 
                       year:int=None, 
                       kind:str=None, 
                       cover_url:str=None, 
                       imdb_id:str=None, 
                       rating:float=None):
        """
        Create a movie in the database with the provided data
        Returns the id of the movie
        """
        movie = Movie(title=title, year=year, kind=kind, cover_url=cover_url, imdb_id=imdb_id, rating=rating)
        self.session.add(movie)
        self.session.commit()
        id = movie.id
        return id
    
    def getMovieInfo(self, movie_id:int):
        """
        Get the movie info from the database
        """
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        return {
            "id": movie.id,
            "title": movie.title,
            "year": movie.year,
            "kind": movie.kind,
            "cover_url": movie.cover_url,
            "imdb_id": movie.imdb_id
            }

    def setMovieTitle(self, movie_id:int, title:str):
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie is None:
            raise Exception("Movie id not found")
        movie.title = title
        self.session.commit()
    def setMovieYear(self, movie_id:int, year:int):
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie is None:
            raise Exception("Movie id not found")
        movie.year = year
        self.session.commit()
    def setMovieKind(self, movie_id:int, kind:str):
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie is None:
            raise Exception("Movie id not found")
        movie.kind = kind
        self.session.commit()
    def setMovieCoverUrl(self, movie_id:int, cover_url:str):
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie is None:
            raise Exception("Movie id not found")
        movie.cover_url = cover_url
        self.session.commit()
    def setMovieImdbID(self, movie_id:int, imdb_id:str):
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie is None:
            raise Exception("Movie id not found")
        movie.imdb_id = imdb_id
        self.session.commit()
    def setMovieRating(self, movie_id:int, rating:float):
        movie = self.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie is None:
            raise Exception("Movie id not found")
        movie.rating = rating
        self.session.commit()

    def getAllMoviesIds(self):
        """
        Get all the movies ids from the database as python dictionary
        """
        movies = self.session.query(Movie).all()
        return {movie.id for movie in movies}

dbInterfaceSQLAlchemy()