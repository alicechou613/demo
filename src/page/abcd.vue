<template>
    <div>
        <!-- <el-table stripe ref="multipleTable" :data="memeberSearch" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @cell-click="selectGroupMember">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="成员" width="120">
                </el-table-column>
                <el-table-column prop="department1" label="所属机构" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="department2" label="所属部门" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="department3" label="所属小组" show-overflow-tooltip>
                </el-table-column>
        </el-table> -->
        <p>{{aa}}</p>
        <button @click="bb"></button>
    </div>
</template>
<script>
export default {
    methods:{
        bb(){
            var e=Mock.mock('@email')
            console.log(e)
        }
    },
    data(){
        return{
            aa:'',
            memeberSearch:[//群成员数据 
                {userId:1,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:2,name:'张2三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:3,name:'张3三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:4,name:'张4三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:5,name:'张5三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:6,name:'张6三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:7,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:8,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:9,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:10,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:11,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:12,name:'张2三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:13,name:'张3三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:14,name:'张4三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:15,name:'张5三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:16,name:'张6三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:17,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:18,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:19,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:20,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:21,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:22,name:'张2三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:23,name:'张3三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:24,name:'张4三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:25,name:'张5三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:26,name:'张6三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:27,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:28,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:29,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:30,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
            ]
        }
    }
}
</script>

