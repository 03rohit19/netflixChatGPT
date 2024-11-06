import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <>
      <Header />
      {/*

MainContainer 
- VideoBackground
- VideoTitle
SecondaryContainer
-MovieList *
- cards * n 

        */}
    </>
  );
};

export default Browse;
