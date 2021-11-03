import React from "react";
import "./HomeScreen.css";
import Nav from "../Nav";
import Banner from "../Banner";
import ReactPlayer from 'react-player/youtube'
import requests from "../Request";
import Row from "../Row";

function HomeScreen() {
  const [youtubeComponent,setYoutubeComponent] = useState('')
  setYoutubeComponent(<ReactPlayer width='100%' url="https://www.youtube.com/watch?v=UnRrBfJp0Ls"/>)

  return (
    <div className="homeScreen">
      <Nav />

      <Banner />
      <div>
            {youtubeComponent}
            </div>

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen;
