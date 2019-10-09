<template>
    <div>父组件
        <div>{{obj}}99999</div>
        <div>{{arr}}99999</div>
        <xiongdizujianchuanzhi1 :arr="arr" :obj="obj"></xiongdizujianchuanzhi1>
        <xiongdizujianchuanzhi2 :arr="arr" :obj="obj"></xiongdizujianchuanzhi2>
    </div>
</template>
<script>
import xiongdizujianchuanzhi1 from './xiongdizujianchuanzhi1.vue'
import xiongdizujianchuanzhi2 from './xiongdizujianchuanzhi2.vue'
export default {
    data(){return{
        arr:[5,8,6],
        obj:{d:555,e:666}
    }},
    components:{
        xiongdizujianchuanzhi1,
        xiongdizujianchuanzhi2
    }
}
</script>