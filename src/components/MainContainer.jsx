import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import SecondaryContainer from "./SecondaryContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // early return if movies in not present there

  if (movies === null) return;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
      <SecondaryContainer />
    </>
  );
};
export default MainContainer;
