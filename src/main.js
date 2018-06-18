import Vue from 'vue';
import './style.scss';
import genres from './util/genres';
import movieList from './components/movieList.vue';
import movieFilter from './components/movieFilter.vue';
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get() { return this.$root.moment}});

new Vue({
    el:'#app',
    data:{
        genre:[],
        time: [],
        movies:[],
        moment
    },
    methods:{
        checkFilter(category, title, checked){
            if(checked){
                this[category].push(title);
            }else{
                let index = this[category].indexOf(title);
                if(index>-1){
                    this[category].splice(index,1)
                }
            }
        }
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
    }
})