<template>
   <div id='overview'>
       <day-select :selected="day"></day-select>
        <div class='main'>
            <movie-list :genre='genre' :time='time' :movies="movies" :day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>
<script>
import movieList from './movieList.vue';
import movieFilter from './movieFilter.vue';
import DaySelect from './DaySelect.vue';
export default {
     props:[
                'genre', 'time', 'movies','day'
            ],
     components:{
        movieList,
        movieFilter,
        DaySelect
    },
}
</script>
