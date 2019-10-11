<template>
    <div>
        <!-- 右侧查询到的群组详情 -->
        <div style="width:700px;height:546.8px;border:1px #7dc5eb solid;float:left;margin-left:20px;padding:5px;box-sizing:border-box;">
            <!-- 查询、筛选群组 -->
            <div>
            </div>
            <!-- 群组列表 -->
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="">
                        <el-input v-model="groupSearchContent" placeholder="请输入要查找的群组名"></el-input>
                    </el-form-item>
                    
                    <!-- 群组操作 -->
                    <el-form-item style="text-align:right;margin-right:20px;">
                        <el-button type="primary" icon="el-icon-plus">添加新群组</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="form.group.length==0?checkNullAlert('修改'):groupUpdate()">修改群组名称</el-button>
                        <el-button type="primary" icon="el-icon-delete"  @click="form.group.length==0?checkNullAlert('删除'):groupDelete()">删除</el-button>
                    </el-form-item>
                    <el-checkbox style="text-align:left;margin-left:20px;" v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
                    <el-form-item label="">
                        <el-checkbox-group v-model="form.group" >
                            <el-checkbox v-for="(item,i) in groupSearch" :key="item.groupId" :label="item.groupId" name="group" v-if="i >= (CurrentPage-1)*PageSize && i< PageSize*CurrentPage">{{item.groupName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-pagination background layout="prev, pager, next" :page-size="PageSize" :total="this.groupSearch.length" @current-change="handleCurrentChange" @size-change="handleSizeChange"> 
                    </el-pagination>
                </el-form>
            </div>
        </div>
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
                    //将首次查询状态修改
                    // this.GroupSearchFirst=false;
                    //将输入框内开头和结尾的空格去除
                    // this.GroupSearchClick=this.GroupSearch.trim();
                    // this.SearchList=[];
                    // for(let item in this.GroupList){
                    //     let i=this.GroupList[item].name.indexOf(this.GroupSearchClick)
                    //     if(i!=-1){
                    //         this.SearchList.push(this.GroupList[item])
                    //     }
                    // }
                    this.searchTimer=undefined;
                },2000)
                
            }
    },

    methods: {
        handleNodeClick(data) {//获取左侧目录--当前选中的组织机构id
            console.log(data.id);
            //向后端发送请求查询组织机构id对应的群组----待做
            //接收到对应的群组数据后，存入groupSearch数组----待做
            console.log(this.groupSearch)
        },
        filterNode(value, data) {//左侧目录--查询
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleCheckAllChange(val) {//右侧全选按钮
            // console.log(val)
            // console.log(this.groupSearch[0].groupId)
            if(val==true){
                // this.form.group=[]
                for(var i in this.groupSearch){
                    //单页全选
                    if(i >= (this.CurrentPage-1)*this.PageSize && i< this.PageSize*this.CurrentPage){
                        this.form.group.push(this.groupSearch[i].groupId)
                        console.log(this.form.group)
                    }
                }
                    //数组去重
                    this.form.group=Array.from(new Set(this.form.group))
                    //给选项升序排序（默认是按选择顺序排的）
                    this.form.group=this.form.group.sort(function(a,b){return a-b})
                    console.log(this.form.group,11)
            }else{
                this.form.group=[]
            }
        // this.form.group = val ? groupSearch : [];
      },
        handleSizeChange(){//列表数据变化时。刷新页面
            router.go(0)
        },
        handleCurrentChange(val){//右侧列表页码改变时触发
            this.checkAll=false;
            this.CurrentPage=val;
            console.log(this.CurrentPage,33);
        },
        
        groupUpdate() {//右侧群组列表--修改按钮
            //给选项升序排序（默认是按选择顺序排的）
            this.form.group=this.form.group.sort(function(a,b){return a-b})
            console.log(this.form.group)
      },
        groupDelete() {//右侧群组列表--删除按钮
            //给选项升序排序（默认是按选择顺序排的）
            this.form.group=this.form.group.sort(function(a,b){return a-b})
            console.log(this.form.group)
            let groupDeleteList=this.form.group
            
            this.$confirm('您是否要删除'+this.form.group, {
                confirmButtonText: '确定删除',
                cancelButtonText:'取消',
            })
      },
      checkNullAlert(n) {// 提示框-未选择就点击按钮的弹框
          this.$alert('请选择要'+n+'的群组', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                }
        })
      },
      
    },

    data() {
        return {
            filterText: '',//左侧目录搜索内容
            checkAll:false,//右侧群组列表--全选按钮
            CurrentPage:1,//右侧目录当前页码
            PageSize:10,//右侧目录每页条数
            groupSearchContent:'',//右侧搜索框
            searchTimer:undefined,
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
            {groupId:1,groupName:'分组1',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:2,groupName:'分组2',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:3,groupName:'分组3',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:4,groupName:'分组4',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:5,groupName:'分组5',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:6,groupName:'分组6',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:7,groupName:'分组7',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:8,groupName:'分组8',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:9,groupName:'分组9',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:10,groupName:'分组10',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:11,groupName:'分组11',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:12,groupName:'分组12',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:13,groupName:'分组13',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:14,groupName:'分组14',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:15,groupName:'分组15',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:16,groupName:'分组16',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:17,groupName:'分组17',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:18,groupName:'分组18',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:19,groupName:'分组19',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:20,groupName:'分组20',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:21,groupName:'分组21',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:22,groupName:'分组22',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:23,groupName:'分组23',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:24,groupName:'分组24',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:25,groupName:'分组25',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:26,groupName:'分组26',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:27,groupName:'分组27',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:28,groupName:'分组28',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:29,groupName:'分组29',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:30,groupName:'分组30',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:31,groupName:'分组31',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'},{groupId:32,groupName:'分组32',aa:'ewwfsdfsfsfdfdsdf',bb:'adsadadas',cc:'adasdee3333'}
        ],
        form: {//右侧选择按钮
          group: [],
        }
      };
    }
  };
</script>
<style scoped>
/* 修改右侧群组列表样式 */
.el-checkbox-group{
    text-align: left;
}
.el-checkbox{
    display: block !important;
}

</style>