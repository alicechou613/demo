<template>
    <div>子组件1
        <p v-for="(elem,i) of arr" :key="i">{{elem}}</p>
        <button @click=fun()>button</button>
        <h1>{{arr}}</h1>
        <h1>{{obj.d}}</h1>
        <h1>{{obj.e}}</h1>

    </div>
    
</template>
<script>
export default {
    data(){
        return{
            myCount:0
    }},
    props:{
        'arr':Array,
        'obj':Object
    },
    
    mounted(){console.log(this.arr)},
    methods:{
        fun(){
            //  this.arr=[1,2,5];
            // this.obj.d=155
            // this.arr[0]=1  
            this.arr.splice(0,1,1)
            console.log(this.arr)
        }
    },
   
}
</script>

