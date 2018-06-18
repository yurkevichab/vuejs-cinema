<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
             <movie-item v-for="movie in filteredMovies" :movie="movie.movie" v-bind:key='movie.Id'></movie-item>
        </div> 
        <div v-else-if="movies.length" class="no-results">
            No results
        </div>
            <div v-else class="no-results">
            Loading....
        </div>
      </div>
</template>
<script>
import genres from '../util/genres';
import MovieItem from './MovieItem.vue'

export default {
            props:[
                'genre', 'time', 'movies'
            ],
            data(){
                return {
                   
                }
            },
            methods:{
                moviePassesGenreFilter(movie){
                    if(this.genre.length==0){
                        return this.movies;
                    }
                    let movieGenres= movie.movie.Genre.split(", ");
                    let matched =true;
                     this.genre.forEach(genre=>{
                         if(!movieGenres.includes(genre)){
                             matched= false;
                         }
                     })
                    return matched;
                }
            },
            computed:{
                filteredMovies(){
                    return this.movies.filter(this.moviePassesGenreFilter)
                }
            },
            components:{
                MovieItem
            }
        }
</script>
