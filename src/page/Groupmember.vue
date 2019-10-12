<template>
    <div style="margin:auto;">Groupmember
        <!-- 群组成员详情列表 -->
        <div style="width:1000px;border:1px #7dc5eb solid;margin:auto;padding:5px;box-sizing:border-box;">
            <div style="padding:5px;">
                <el-input v-model="groupSearchContent" placeholder="请输入内容"></el-input>
            </div>
            <!-- <div style="text-align:right;margin-right:20px;padding:5px;">
                <el-button type="primary" icon="el-icon-plus" :disabled="groupSearch.length<=0 ? true : false" @click="group.length!=1?groupUpdateAlert():routerPushGroupmember()">修改群组成员</el-button>
                <el-button type="primary" icon="el-icon-plus" :disabled="groupSearch.length<=0 ? true : false" @click="groupAdd">创建新群组</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="group.length!=1?groupUpdateAlert():groupUpdate()" :disabled="groupSearch.length<=0 ? true : false">修改群组名称</el-button>
                <el-button type="primary" icon="el-icon-delete"  @click="group.length==0?checkNullAlert():groupDelete()" :disabled="groupSearch.length<=0 ? true : false">删除</el-button>
            </div> -->
            <el-table stripe ref="multipleTable" :data="memeberSearch" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @cell-click="selectGroupMember">
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
            </el-table>
            <!-- <div v-show="groupSearch.length>=1" style="margin:5px,0 5px,0">
                <el-pagination background layout="prev, pager, next" :page-size="PageSize" :total="56" @current-change="handleCurrentChange"> 
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        handleSelectionChange(val){//当列表选择项发生变化时会触发该事件
            this.groupMember=val;
            console.log(this.groupMember,567)
        },
        selectGroupMember(val){//右侧列表点击某一行触发的函数
            let id
            for(var i in this.groupSearch){
                if(this.groupSearch[i].groupId==val.groupId){
                    id=i
                }
            }
            //右侧列表点击某一行则等于选择此行的复选框
            this.toggleSelection([this.groupSearch[id]])
        },
        toggleSelection(rows) {//右侧列表点击某一行则等于选择此行的复选框
            if (rows) {
                    for(var row of rows){
                    this.$refs.multipleTable.toggleRowSelection(row);
                }
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
    },
    data(){
        return{
            groupSearchContent:'',//查询框内容
            groupMember:[//列表选择项
            ],
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
                {userId:12,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:13,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:14,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
            ]
        }
    },
    watch: {
            groupSearchContent(){//右侧搜索框改变时触发
                if(this.searchTimer!==undefined){
                    clearTimeout(this.searchTimer);
                }
                this.searchTimer=setTimeout(()=>{
                    console.log(this.groupSearchContent,111)
                    console.log(this.groupSearch.groupName,111)
                    //将输入框内开头和结尾的空格去除
                    let content=this.groupSearchContent.trim();
                    //将contentc传给后端。后端传回数组给this.groupSearch
                    this.searchTimer=undefined;
                },2000)
                
            }
    },
    
}
</script>
