<template>
    <div id="day-select">
        <ul class="days">
            <li :class="{day:true, active:isActive(day)}" v-for="day in days" @click="selectDay(day)">
                {{formatDay(day)}}</li>
                  <li class="day-selecter">
                <span class="dec" @click="changeDay"></span>
                <span class="inc" @click="changeDay"></span>
                </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['selected'],
    data(){
        return {
            days:[0,1,2,3,4,5,6].map(n=>this.$moment().add(n,'days'))
        }
    },
    methods:{
        formatDay(day){
            if(this.$moment().isSame(day, 'day')){
                return 'Today';
            }
            return day.format('ddd DD/MM');
        },
        isActive(day){
             return this.selected.isSame(day, 'day');
        },
        selectDay(day){
            this.$bus.$emit('set-day', day);
        }
    }
}
</script>
