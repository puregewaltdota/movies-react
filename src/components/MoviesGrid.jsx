import { useEffect, useState } from "react"
import { MovieCard } from "./MovieCard"
import styles from "./MoviesGrid.module.css"
import { get } from "../utils/httpCliente"
import { Spinner } from "./Spinner"
import InfiniteScroll from "react-infinite-scroll-component"
import { Empty } from "./Empty"

export function MoviesGrid({search}) {

    const [movies,setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=> {
        let isMounted = true; 

        if(isMounted){
            setIsLoading(true)
            const searchURL = search ? "/search/movie?query=" + search + "&page=" + page : "/discover/movie?page=" + page
            get(searchURL).then((data) => {
                setMovies(prevMovies => prevMovies.concat(data.results));
                setHasMore(data.page < data.total_pages)
                setIsLoading(false);
              });
        }
        return () => {
          isMounted = false
          }
        
    },[search,page])

    if(!isLoading && movies.length === 0){
        return <Empty />
    }
    
    return(
        <InfiniteScroll
            dataLength={movies.length}
            hasMore={hasMore}
            next={() => setPage(prevPage => prevPage + 1)}
            loader={<Spinner />}
        >
            <ul className={styles.moviesGrid}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </ul>
        </InfiniteScroll>
    )
}