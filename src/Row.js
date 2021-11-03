import axios from './axios';
import React, { useEffect, useState } from 'react';
import "./Row.css";
function Row(props) {
    const {title,fetchUrl,isLargeRow=false} = props;
    const [movies,setMovies] = useState([]);
    

    const base_url= "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    },[fetchUrl])


    const selectedVideo = (movieName) => {
        console.log(movieName)
        
    }

    
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
            {
                movies.map(movie =>((isLargeRow && movie.poster_path)||
                (!isLargeRow && movie.backdrop_path))&&(
                    
                    <img
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    key={movie.id}
                    onClick={()=>selectedVideo(movie?.name)}
                    src={`${base_url}${isLargeRow?movie?.poster_path:movie?.backdrop_path}`}
                     alt={movie?.name}/>
                ))
            }
            </div>
        </div>
    )
}

export default Row
