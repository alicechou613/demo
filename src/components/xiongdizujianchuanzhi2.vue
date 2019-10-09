<template>
    <div>子组件2
        <p v-for="(elem,i) of arr" :key="i">{{elem}}</p>
        <h1>{{obj.d}}</h1>
        <h1>{{obj.e}}</h1>
    </div>
</template>
<script>
export default {
    data(){return{}},
   props:[
        'arr','obj'
    ],
    
}
</script>