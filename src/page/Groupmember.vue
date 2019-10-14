<template>
    <div style="margin:auto;">
        <!-- 群组成员详情列表 -->
        <div style="width:1000px;border:1px #7dc5eb solid;margin:auto;padding:5px;box-sizing:border-box;">
            <div style="padding:5px;">
                <el-input v-model="groupSearchContent" placeholder="请输入要搜索的成员名"></el-input>
            </div>
            <div style="text-align:right;margin-right:20px;padding:5px;">
                <el-button type="primary" icon="el-icon-plus">添加成员</el-button>
                <el-button type="primary" icon="el-icon-delete"  @click="groupMember.length==0?checkNullAlert():groupDelete()">移除成员</el-button>
            </div>
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
            <!-- 如果数据大于单页数据size才显示分页-等接口 -->
            <!-- v-show条件到时候要改成>=size+1 -->
            <div v-show="memeberSearch.length>=1" style="padding:10px;">
                <el-pagination background layout="prev, pager, next"  :current-page.sync="CurrentPage" :page-size="PageSize" :total="56" @current-change="handleCurrentChange"> 
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        handleCurrentChange(val){//列表页码改变时触发
            this.CurrentPage=val;
            console.log(this.CurrentPage,33);
            //调用后台数据更新列表数组，当前页面，
            // 请求数据的函数
            this.groupajax()
        },
        groupajax(){// 请求单页列表数据的函数
            // memeberSearch=[
            // ]
        },
        handleSelectionChange(val){//当列表选择项发生变化时会触发该事件
            // console.log(11)
            // console.log(val)
            this.groupMember=val;
            console.log(this.groupMember,567)
        },
        selectGroupMember(val){//列表点击某一行触发的函数
            let id
            for(var i in this.memeberSearch){
                if(this.memeberSearch[i].userId==val.userId){
                    id=i
                }
            }
            //右侧列表点击某一行则等于选择此行的复选框
            this.toggleSelection([this.memeberSearch[id]])
        },
        toggleSelection(rows) {//列表点击某一行则等于选择此行的复选框
            if (rows) {
                    for(var row of rows){
                    this.$refs.multipleTable.toggleRowSelection(row);
                }
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        checkNullAlert() {// 删除提示框-未选择就点击按钮的弹框
            this.$alert('请选择要删除的', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                }
            })
        },
        groupDelete() {//右侧群组列表--移除按钮
            console.log(this.groupMember)
            let list=[];
            for(let item of this.groupMember){
                list.push(item.name)
                console.log(list)
            }
            this.groupNameDeleteString=list.join('、')
            // console.log(nameString,65)
            // console.log(groupDeleteList,12)
            this.$confirm('您是否要移除'+this.groupNameDeleteString+'？', {
                confirmButtonText: '确定移除',
                cancelButtonText:'取消',
                type: 'warning'
            }).then(()=>{
                 //向后端发送请求删除数据
                    //删除可同时删除多个，需要遍历删除成功的群组，将name改成string弹框告知
                    //if判断，若部分删除成功则弹另一个弹框告知
                    //全部删除成功弹框告知用户
                this.$message({
                        type: 'success',
                        message: '您已成功移除'+this.groupNameDeleteString+'成员'
                    });
            }).catch(()=>{
            })
        },
    },
    data(){
        return{
            groupSearchContent:'',//查询框内容
            groupMember:[//列表选择项
            ],
            searchTimer:undefined,//自动搜索的定时器
            groupNameDeleteString:'',//删除成员的提示语
            PageSize:10,//目录每页条数
            CurrentPage:1,//目录当前页码
            memeberSearch:[//群成员数据 
                {userId:1,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:2,name:'李四',department1:'北研',department2:'一处',department3:'一组'},
                {userId:3,name:'王伟',department1:'北研',department2:'一处',department3:'一组'},
                {userId:4,name:'乌日图',department1:'北研',department2:'一处',department3:'一组'},
                {userId:5,name:'赵丽丽',department1:'北研',department2:'一处',department3:'一组'},
                {userId:6,name:'陈磊',department1:'北研',department2:'一处',department3:'一组'},
                {userId:7,name:'应盈',department1:'北研',department2:'一处',department3:'一组'},
                {userId:8,name:'蒋群',department1:'北研',department2:'一处',department3:'一组'},
                {userId:9,name:'晚晚',department1:'北研',department2:'一处',department3:'一组'},
                {userId:10,name:'高峰',department1:'北研',department2:'一处',department3:'一组'},
            ]
        }
    },
    watch: {
            groupSearchContent(){//右侧搜索框改变时触发
                //查询时，页码回到1
                this.CurrentPage=1;
                if(this.searchTimer!==undefined){
                    clearTimeout(this.searchTimer);
                }
                this.searchTimer=setTimeout(()=>{
                    console.log(this.groupSearchContent,111)
                    //将输入框内开头和结尾的空格去除
                    let content=this.groupSearchContent.trim();
                    //将content传给后端。后端传回数组给this.memeberSearch
                    this.searchTimer=undefined;
                },2000)
                
            }
    },
    
}
</script>
<style scoped>
/* 修改群组列表--按钮样式 */
.el-button{
    padding: 8px 12px !important;
}
.el-pagination{
    padding: 10px 5px !important;
}
</style>
