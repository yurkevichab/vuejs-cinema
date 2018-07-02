import Vue from 'vue';
import './style.scss';
import {checkFilter} from './util/bus';
import routes from './util/routes';
import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', {get() { return this.$root.moment}});

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get() { return this.$root.bus}});
import VueRouter from 'vue-router';
Vue.use(VueRouter)

const router = new VueRouter({
    routes
})
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
        this.$bus.$on('set-day', (day)=>{
            this.day=day;
        });
    },
    router
})