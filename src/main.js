import Vue from 'vue';
import './style.scss';
import {checkFilter} from './util/bus';
import movieList from './components/movieList.vue';
import movieFilter from './components/movieFilter.vue';
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get() { return this.$root.moment}});

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get() { return this.$root.bus}});

new Vue({
    el:'#app',
    data:{
        genre:[],
        time: [],
        movies:[],
        moment,
        day: moment(),
        bus
    },
    components:{
        movieList,
        movieFilter
    },
    created(){
        fetch('/api',{method:'get'})
        .then(res=>{
            return res.json()
        })
        .then(data=>{
           this.movies = data;
        })
        .catch( alert );
        this.$bus.$on('check-filter', checkFilter.bind(this));
    }
})