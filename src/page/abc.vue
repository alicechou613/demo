<template>
    <div style="width:85%;border:1px #7dc5eb solid;margin:auto;">
        <div style="padding:5px;">
                <el-input v-model="groupMemberAddSearchContent" placeholder="请输入要搜索的成员名"></el-input>
        </div>
        <div>
            <span style="color:#7dc5eb;font-weight:600;padding:0 5px;cursor:pointer" class="fontABC" :class="ABCSelectStyle==i?'fontActive':''" v-for="(elem,i) of ABCD" :key="i" @click="ABCSelectUpdate(elem,i)">{{elem}}</span>
        </div>
        <div>
            <el-table stripe ref="multipleTable" :data="memeberAddSearch" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @cell-click="selectGroupMember">
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
            <div v-show="memeberAddSearch.length>=1" style="padding:5px;">
                <el-pagination background layout="prev, pager, next" :current-page.sync="CurrentPage" :page-size="PageSize" :total="1156" @current-change="handleCurrentChange"> 
                </el-pagination>
            </div>
        </div>
        <div style="padding:3px;">
            <el-button type="primary"  :disabled="groupMember.length<=0 ? true : false" @click="addMember">添加成员</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ABCD:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            groupMemberAddSearchContent:'',//查询框内容
            searchTimer:undefined,//自动搜索的定时器
            PageSize:10,//目录每页条数
            CurrentPage:1,//目录当前页码
            ABCSelect:'A',//ABCD被选择项
            ABCSelectStyle:'0',//ABCD被选择时的样式修改
            groupMember:[//列表选择项
            ],
            memeberAddSearch:[//查询到的群成员数据-默认A开头的第一页
            ],
        }
    },
    methods:{
        load(){
            //刷新时，调用A开头的第一页的数据
            this.searchABC('A',1)
        },
        ABCSelectUpdate(n,m){//点击ABCD字母触发
            //将当前字母保存，样式修改
            this.ABCSelect=n;
            //修改选择字母的样式
            this.ABCSelectStyle=m;
            console.log(this.ABCSelect)
            //将页码改变为1
            this.CurrentPage=1;
            this.searchABC(n,1)
        },
        searchABC(content,page){
            console.log(content,page)
            //将查询内容、页码、每页条数传给后端
            //将接收到的数据存入this.memeberAddSearch
            this.memeberAddSearch=[//群成员数据 
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
        },
        search(content,page){
            //将查询内容、页码、每页条数传给后端
            //将接收到的数据存入this.memeberAddSearch
            this.memeberAddSearch=[//群成员数据 
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
        },
        handleSelectionChange(val){//当列表选择项发生变化时会触发该事件
            // console.log(11)
            // console.log(val)
            this.groupMember=val;
            console.log(this.groupMember,567)
        },
        selectGroupMember(val){//列表点击某一行触发的函数
            let id
            for(var i in this.memeberAddSearch){
                if(this.memeberAddSearch[i].userId==val.userId){
                    id=i
                }
            }
            //右侧列表点击某一行则等于选择此行的复选框
            this.toggleSelection([this.memeberAddSearch[id]])
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
        handleCurrentChange(val){//列表页码改变时触发
            this.CurrentPage=val;
            console.log(this.ABCSelect,this.CurrentPage,33);
            // 判断页码发生改变时。。是用的查询还是ABC
            if(this.groupMemberAddSearchContent.trim().length>=1){
                // 查询的话调用search()
                console.log('chaxun')
            }else{
                // ABC的话调用searchABC()
                console.log('ABC')
            }
            //调用后台数据更新列表数组，当前页面，
            // 请求数据的函数
        },
        addMember(){
            //添加成员
        },
    },
    watch: {
            groupMemberAddSearchContent(){//右侧搜索框改变时触发
                //如果搜索框输入内容，则取消对ABCD的选择
                this.ABCSelect=-1;
                this.ABCSelectStyle=-1;
                //查询时，页码回到1
                this.CurrentPage=1;
                if(this.searchTimer!==undefined){
                    clearTimeout(this.searchTimer);
                }
                this.searchTimer=setTimeout(()=>{
                    console.log(this.groupMemberAddSearchContent,111)
                    //将输入框内开头和结尾的空格去除
                    let content=this.groupMemberAddSearchContent.trim();
                    //将content传给后端。后端传回数组给this.memeberSearch
                    this.searchTimer=undefined;
                },2000)
                
            }
    },
    created(){
        this.load();
    }
}
</script>
<style>
.fontABC:hover{
    text-decoration: underline;
}
.fontActive{
    color:#fff !important;
    background:#7dc5eb;
}
</style>
