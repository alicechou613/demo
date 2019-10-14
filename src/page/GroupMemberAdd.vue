<template>
    <div>
        <div style="display:flex;justify-content:space-around;margin:10px 100px;">
            <div style="background:#7dc5eb;color:#fff;padding:8px;font-size:18px;cursor:pointer;" @click="show=1">按组织机构添加成员</div>
            <div style="background:#7dc5eb;color:#fff;padding:8px;font-size:20px;cursor:pointer;" @click="show=2">按群组添加成员</div>
            <div style="background:#7dc5eb;color:#fff;padding:8px;font-size:20px;cursor:pointer;" @click="show=3">按首字母或查询添加</div>
        </div>
        <div>
            <abc v-if="show==3"></abc>
        </div>
    </div>
    
</template>
<script>
import abc from './abc.vue'
export default {
    methods:{
    },
    data(){
        return{
            show:1,
        }
    },
    components:{
        abc
    }
}
</script>
