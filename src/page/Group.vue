
<template>
<!-- 群组页面 -->
    <div style="width:1084px;margin:0 auto;padding:5px;">
        <!-- 左侧组织机构选择目录 -->
        <div style="width:350px;height:676.8px;overflow:auto;border:1px #7dc5eb solid;float:left;padding:5px;box-sizing:border-box;">
            <el-input
            placeholder="输入组织机构名称进行过滤"
            v-model="filterText">
            </el-input>
            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                ref="tree">
            </el-tree>
        </div>
        <!-- 右侧查询到的群组详情 -->
        <div style="width:700px;height:676.8px;border:1px #7dc5eb solid;float:left;margin-left:20px;padding:5px;box-sizing:border-box;">
            <div style="padding:5px;">
                <el-input v-model="groupSearchContent" placeholder="请输入内容"></el-input>
            </div>
            <div style="text-align:right;margin-right:20px;padding:5px;">
                <el-button type="primary" icon="el-icon-plus" :disabled="groupSearch.length<=0 ? true : false" @click="group.length!=1?groupUpdateAlert():routerPushGroupmember()">修改群组成员</el-button>
                <el-button type="primary" icon="el-icon-plus" :disabled="groupSearch.length<=0 ? true : false" @click="groupAdd">创建新群组</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="group.length!=1?groupUpdateAlert():groupUpdate()" :disabled="groupSearch.length<=0 ? true : false">修改群组名称</el-button>
                <el-button type="primary" icon="el-icon-delete"  @click="group.length==0?checkNullAlert():groupDelete()" :disabled="groupSearch.length<=0 ? true : false">删除</el-button>
            </div>
            <el-table stripe ref="multipleTable" :data="groupSearch" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @cell-click="selectGroup">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="groupName" label="群组名称" width="120">
                </el-table-column>
                <el-table-column prop="aa" label="群组说明" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="bb" label="群组说明2" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="cc" label="群组说明3" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div v-show="groupSearch.length>=1" style="margin:5px,0 5px,0">
                <el-pagination background layout="prev, pager, next" :page-size="PageSize" :total="56" @current-change="handleCurrentChange"> 
                </el-pagination>
            </div>
        </div>
        <!-- 添加框-添加群组按钮的弹框 -->
        <div>
            <el-dialog title="创建新群组" :visible.sync="groupAddDialog">
                <el-form :model="form">
                    <p style="text-align:left;padding-left:1px;">新群组所属机构为：{{groupAddOrganizationName}}</p>
                    <el-form-item label="群组名称" label-width="70px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="groupAddDialog = false">取 消</el-button>
                    <el-button type="primary" @click="groupAddSubmit">创 建</el-button>
                </div>
            </el-dialog>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>
<script>
  export default {
      watch: {
            filterText(val) {
              this.$refs.tree.filter(val);
      },
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

    methods: {
        selectGroup(val){//右侧列表点击某一行触发的函数
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
        routerPushGroupmember(){//点击修改成员触发
            //跳转群组信息页面
            this.$router.push('/Groupmember')
        },
        handleSelectionChange(val){//当列表选择项发生变化时会触发该事件
            this.group=val;
            console.log(this.group,567)
            
        },
        handleNodeClick(data) {//获取左侧目录--当前选中的组织机构id
            console.log(data,71);
            this.groupAddOrganizationName=data.label
            this.organizationId=data.id;
            this.form.organizationId=data.id
            console.log(this.form.organizationId,333)
            //向后端发送请求查询组织机构id对应的群组----待做
            //接收到对应的群组数据后，存入groupSearch数组----待做
            this.groupajax()
            // console.log(this.groupSearch)
        },
        filterNode(value, data) {//左侧目录--查询
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleCurrentChange(val){//右侧列表页码改变时触发
            this.CurrentPage=val;
            console.log(this.CurrentPage,33);
            //调用后台数据更新列表数组，当前页面，
            // 请求数据的函数
            this.groupajax()
            // this.groupSearch=[
            // {groupId:1,groupName:'分组1',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:2,groupName:'分组2',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:3,groupName:'分组3',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:4,groupName:'分组4',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:5,groupName:'分组5',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:6,groupName:'分组6',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:7,groupName:'分组7',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:8,groupName:'分组8',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:9,groupName:'分组9',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:10,groupName:'分组10',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:11,groupName:'分组11',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:12,groupName:'分组12',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:13,groupName:'分组13',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:14,groupName:'分组14',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:15,groupName:'分组15',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:16,groupName:'分组16',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:17,groupName:'分组17',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:18,groupName:'分组18',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:19,groupName:'分组19',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:20,groupName:'分组20',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:21,groupName:'分组21',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:22,groupName:'分组22',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:23,groupName:'分组23',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:24,groupName:'分组24',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:25,groupName:'分组25',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:26,groupName:'分组26',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:27,groupName:'分组27',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:28,groupName:'分组28',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:29,groupName:'分组29',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:30,groupName:'分组30',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:31,groupName:'分组31',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:32,groupName:'分组32',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'}
                // {groupId:1,groupName:'分组1',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:2,groupName:'分组2',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:3,groupName:'分组3',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:4,groupName:'分组4',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:5,groupName:'分组5',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:6,groupName:'分组6',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:7,groupName:'分组7',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:8,groupName:'分组8',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:9,groupName:'分组9',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:10,groupName:'分组10',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'}
            // ]
        },
        groupajax(){
            this.groupSearch=[
            // {groupId:1,groupName:'分组1',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:2,groupName:'分组2',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:3,groupName:'分组3',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:4,groupName:'分组4',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:5,groupName:'分组5',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:6,groupName:'分组6',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:7,groupName:'分组7',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:8,groupName:'分组8',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:9,groupName:'分组9',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:10,groupName:'分组10',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:11,groupName:'分组11',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:12,groupName:'分组12',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:13,groupName:'分组13',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:14,groupName:'分组14',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:15,groupName:'分组15',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:16,groupName:'分组16',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:17,groupName:'分组17',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:18,groupName:'分组18',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:19,groupName:'分组19',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:20,groupName:'分组20',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:21,groupName:'分组21',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:22,groupName:'分组22',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:23,groupName:'分组23',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:24,groupName:'分组24',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:25,groupName:'分组25',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:26,groupName:'分组26',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:27,groupName:'分组27',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:28,groupName:'分组28',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:29,groupName:'分组29',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:30,groupName:'分组30',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:31,groupName:'分组31',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:32,groupName:'分组32',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'}
                {groupId:1,groupName:'分组1',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:2,groupName:'分组2',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:3,groupName:'分组3',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:4,groupName:'分组4',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:5,groupName:'分组5',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:6,groupName:'分组6',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:7,groupName:'分组7',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:8,groupName:'分组8',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:9,groupName:'分组9',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:10,groupName:'分组10',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'}
            ]
        },
        groupUpdate() {//右侧群组列表--修改按钮
                // 弹框input填写修改的内容
                let name=this.group[0].groupName
                let nameNew
                this.$prompt('请输入新群组名', {
                    confirmButtonText: '确定修改',
                    cancelButtonText: '取消',
                    inputValue:name//输入框的初始文本为原群组名
                    }).then(({ value }) => {
                        console.log(value)
                        nameNew=value;
                    // 向后端发送请求修改数据---待做
                    // 如果请求成功则弹框已成功修改并重新请求此页数据
                    this.$message({
                        type: 'success',
                        message: name+'群组已成功改为'+nameNew
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });       
                });
                // 请求数据的函数
                this.groupajax()
                // console.log(this.group)
        },
        groupUpdateAlert() {//右侧群组列表--修改按钮--如果选择多个进行修改的弹框
                this.$alert('请选择一个群组进行修改', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                }
            })
        },
        groupDelete() {//右侧群组列表--删除按钮
            //给选项升序排序（默认是按选择顺序排的）
            // this.group=this.group.sort(function(a,b){return a-b})
            console.log(this.group)
            let groupDeleteList=this.group
            
            this.$confirm('您是否要删除'+this.group, {
                confirmButtonText: '确定删除',
                cancelButtonText:'取消',
                callback: action => {
                    console.log(48908908)
                    //向后端发送请求删除数据
                    //删除可同时删除多个，需要遍历删除成功的群组，将name改成string弹框告知
                    //if判断，若部分删除成功则弹另一个弹框告知
                    //全部删除成功弹框告知用户
                    this.$message({
                        type: 'success',
                        message: '您已成功删除'+nameNew+'群组'
                    });
                }
            })
      },
      checkNullAlert() {// 提示框-未选择就点击按钮的弹框
          this.$alert('请选择要删除的群组', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                }
        })
      },
      groupAdd(){
          //让
          this.groupAddDialog=true;
      },
      groupAddSubmit(){
          this.groupAddDialog = false;
        //   将form里的name和机构id传给后端
        // 请求成功后，提示创建成功
        this.$message({
          message: '创建成功',
          type: 'success'
        });
        // 创建失败
        this.$message({
          message: '创建失败',
          type: 'warning'
        });
      }
    },

    data() {
        return {
            filterText: '',//左侧目录搜索内容
            CurrentPage:1,//右侧目录当前页码
            PageSize:10,//右侧目录每页条数
            searchTimer:undefined,//自动搜索的定时器
            groupSearchContent:'',//右侧搜索input框内容
            organizationId:-1,//左侧目录选择的组织机构Id
            groupAddDialog:false,//右侧添加新分组的弹框是否显示
            groupAddOrganizationName:'',//右侧添加新分组的弹框的所属机构名
            form: {
                    name: '',
                    organizationId: '',
                },
                    data: [{//左侧目录数据
                        id: 1,
                        label: '一级 1',
                        children: [{
                            id: 4,
                            label: '二级 1-1',
                            children: [{
                                id: 9,
                            label: '三级 1-1-1'
                            }, {
                                id: 10,
                            label: '三级 1-1-2'
                            }]
                        }]
                        }, {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                        }, {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                        },
                        {
                        id: 9,
                        label: '一级 3'},
                        {
                        id: 10,
                        label: '一级 3'},
                        {
                        id: 11,
                        label: '一级 3'},
                        {
                        id: 12,
                        label: '一级 3'},
                        {
                        id: 13,
                        label: '一级 3'},
                        {
                        id: 14,
                        label: '一级 3'},
                        {
                        id: 15,
                        label: '一级 3'},
                        {
                        id: 16,
                        label: '一级 3'},
                        {
                        id: 17,
                        label: '一级 3'},
                        {
                        id: 18,
                        label: '一级 3'},
                        {
                        id: 19,
                        label: '一级 3'},
                        {
                        id: 20,
                        label: '一级 3'},
                        {
                        id: 21,
                        label: '一级 3'},
                        {
                        id: 22,
                        label: '一级 3'},
                    ],
                    defaultProps: {//左侧目录
                    children: 'children',
                    label: 'label'
                    },
                    groupSearch:[//右侧目录获取的列表数据
                    ],
                    group: [],//右侧选择的内容
                    
                    
      };
    }
  };
</script>
<style scoped>
/* 修改右侧群组列表--按钮样式 */
.el-button{
    padding: 8px 12px !important;
}
.el-pagination{
    padding: 10px 5px !important;
}
/* 修改右侧群组列表--创建新群组弹框样式 */
.el-dialog__wrapper /deep/ .el-dialog{
    width:26% !important;
}

</style>

