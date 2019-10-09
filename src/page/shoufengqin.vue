<template>
    <div class="bg">
        <div> 
            <!-- <div> -->
            <div  :style="a1[0]"  class="aa1" @mouseover="sss(0)">
                <div class="text">
                    <p>我的个人拉萨之旅丨丨故事之城</p>
                </div>
            </div>
            <div  :style="a1[1]" class="aa2" @mouseover="sss(1)" >
                <div class="text">
                    <p>我的个人拉萨之旅丨丨故事之城</p>
                </div>
            </div>
            <div  :style="a1[2]" v-on:mouseover="sss(2)" class="aa3">
                <div class="text">
                    <p>我的个人拉萨之旅丨丨故事之城</p>
                </div>
            </div>
            <div  :style="a1[3]" @mouseover="sss(3)" class="aa4">
                <div class="text">
                    <p>我的个人拉萨之旅丨丨故事之城</p>
                </div>
            </div>
            
        </div>
    </div> 
</template>
<script>
export default {
    data(){
        return{
            b:4,
            a1:[
                'left:0px',
                'left:100px',
                'left:200px',
                'left:300px'
            ]
        }
    },
    methods:{
         sss(n){
             if(n==3){
                 this.a1=[
                    'left:0px',
                    'left:100px',
                    'left:200px',
                    'left:300px'
                ]
             }else if(n==2){
                 this.a1=[
                    'left:0px',
                    'left:100px',
                    'left:200px',
                    'width:100px;right:0px'
                ]
             }else if(n==1){
                this.a1=[
                    'left:0px',
                    'left:100px',
                    'width:100px;right:100px',
                    'width:100px;right:0px'
                ]
             }else if(n==0){
                 this.a1=[
                    'left:0px',
                    'width:100px;right:200px',
                    'width:100px;right:100px',
                    'width:100px;right:0px'
                ]
             }
         }
    }
}
</script>
<style scoped>
.bg{
    width:100%;
    height:954px;
    background: url('../assets/shoufengqin/bg.jpg') no-repeat center top;
}
.bg::before{
    content:'';
    display:table;
}

.bg>div{
    width:1089px;
    margin:150px auto 0px;
    position: relative;
}
img{
    text-align: left;
}
p{
    padding:0 42px;
}
.bg>div>div{
    height:429px;
    width:789px;
    position: absolute;
}
.text{
    height:429px;
    position: absolute;
    width:100px;
    background: rgba(0,0,0, 0.5);
    top:0px;
    left:0px;
    color:#fff;
}
.aa1{
    background: url('../assets/shoufengqin/1.jpg');
}
.aa2{
    background: url('../assets/shoufengqin/2.jpg');
}
.aa3{
    background: url('../assets/shoufengqin/3.jpg');
}
.aa4{
    background: url('../assets/shoufengqin/4.jpg');
}
</style>
