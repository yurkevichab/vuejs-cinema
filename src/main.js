import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el:'#app',
    components:{
        'movie-list':{
            template: `<div id="movie-list">
             <div v-for="movie in movies" class="movie">{{movie.title}}</div>
            </div>`,
            data(){
                return {
                    movies:[{
                        title:'Pop1'
                    },
                    {
                        title:'Pop2'
                    }]  
                }
            }

        },
        'movie-filter':{
            data(){
                return {
                    genres
                }
            },
            template: `<div id="movie-filter">
            <h2>FILTER</h2>
             <div class="filter-group">
                 <check-filter v-for="genre in genres" v-on:check-filter="checkFIlter" :title="genre"></check-filter>
             </div>
            </div>`,
            methods: {
                checkFIlter(){
                    console.log('!')
                    }
            },
            components:{  
                'check-filter':{
                    data(){
                        return {
                            checked:false
                        }
                    },
                    methods:{
                        checkFilter(){
                            this.checked=!this.checked
                            this.$emit('check-filter');
                        }

                    },
                    props:[
                        'title'
                    ],

                    template:`<div :class="{'check-filter':true, 'active': checked}" 
                    v-on:click="checkFilter">
                    <span class="checkbox"></span>
                    <span class="check-filter-title">{{title}}</span>
                    </div>`
                }
            }
        }
    }
})