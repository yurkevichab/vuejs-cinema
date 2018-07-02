<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
             <movie-item v-for="movie in filteredMovies" 
             :movie="movie.movie" 
             :key='movie.Id'>
                  <div class="movie-sessions">
            <div v-for="session in filterSessions(movie.sessions)" class="session-time-wrapper" :key="session.id">
                <div class ="session-time">
                    {{formatSessionTime(session.time)}}
                </div>
            </div>
        </div></movie-item>
        </div> 
        <div v-else-if="movies.length" class="no-results">
            {{noResults}}
        </div>
            <div v-else class="no-results">
            Loading....
        </div>
      </div>
</template>
<script>
import genres from "../util/genres";
import times from "../util/times";
import MovieItem from "./MovieItem.vue";

export default {
  props: ["genre", "time", "movies", "day"],
  data() {
    return {};
  },
  methods: {
    formatSessionTime(time) {
      return this.$moment(time).format("h:mm A");
    },
    filterSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    },
    moviePassesGenreFilter(movie) {
      if (this.genre.length == 0) {
        return this.movies;
      }
      let movieGenres = movie.movie.Genre.split(", ");
      let matched = true;
      this.genre.forEach(genre => {
        if (!movieGenres.includes(genre)) {
          matched = false;
        }
      });
      return matched;
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), "day")) {
        return false;
      } else if (this.time.length == 0 || this.time.length == 2) {
        return true;
      } else if (this.time[0] == times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      }
      return this.$moment(session.time).hour() < 18;
    }
  },
  computed: {
    filteredMovies() {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults() {
      let times = this.time.join(", ");
      let genres = this.genre.join(", ");
      return `No results for ${times}${
        times.length && genres.length ? ", " : ""
      } ${genres}`;
    }
  },
  components: {
    MovieItem
  }
};
</script>
