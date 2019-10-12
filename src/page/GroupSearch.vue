<template>
<!-- 自己做的版本 -->
    <div style="width:600px;margin:0 auto;">
        <!-- 搜索框 -->
        <div>
            <input type="text" v-model="GroupSearch">
            <el-button type="primary" icon="el-icon-search" @click="Search">搜索</el-button>
            <!-- <button @click="Serach">搜索</button> -->
        </div>
        <!-- 显示区 -->
        <div>
            <!-- 如果查询条件为空，则显示全部群组名 -->
            <div v-show="GroupSearchFirst==false && GroupSearchClick.length==0">
                <p style="color:red;">没有符合条件的群组</p>
            </div>
            <!-- 如果查询条件不为空，则显示对应的群组名 -->
            <div>
                <!-- 群组名称 -->
                <div v-for="(item,i) in SearchList" :key="'Search'+i"  class="group_div">
                    <input type="text" v-if="UpdateName[i]==true" v-model="UpdateDetails.content">
                    <el-button type="primary" @click="UpdateNameDefine" v-if="UpdateName[i]==true">确认</el-button>
                    <p style="color:red;float:left;" v-if="UpdateName[i]==false">{{item.name}}</p>
                    <div class="btn" @click="GroupNameUpdate(i)"  v-if="UpdateName[i]==false">
                        <svg t="1570680584098" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3762" width="32" height="32"><path d="M324.266667 523.377778c0-5.688889 0-5.688889 0 0l455.111111-455.111111c11.377778-11.377778 34.133333-22.755556 51.2-22.755556 22.755556 0 45.511111 11.377778 62.577778 28.444445l39.822222 39.822222c17.066667 17.066667 28.444444 39.822222 28.444444 62.577778 0 17.066667-5.688889 39.822222-22.755555 51.2l-449.422223 455.111111h-5.688888l-170.666667 45.511111h-5.688889c-5.688889 0-17.066667-5.688889-22.755556-5.688889-5.688889-5.688889-11.377778-17.066667-5.688888-28.444445l45.511111-170.666666z m500.622222-403.911111L415.288889 529.066667l62.577778 62.577777 415.288889-415.288888-68.266667-56.888889zM341.333333 665.6l79.644445-22.755556-56.888889-62.577777-22.755556 85.333333z" fill="#7dc5eb" p-id="3763"></path><path d="M978.488889 432.355556v432.355555c0 62.577778-51.2 108.088889-108.088889 108.088889H153.6c-56.888889 0-108.088889-51.2-108.088889-108.088889V159.288889c0-62.577778 51.2-113.777778 108.088889-113.777778h460.8c22.755556 0 39.822222 17.066667 39.822222 45.511111 0 22.755556-17.066667 45.511111-39.822222 45.511111h-455.111111c-17.066667 0-28.444444 11.377778-28.444445 28.444445v699.733333c0 17.066667 11.377778 28.444444 28.444445 28.444445h705.422222c17.066667 0 28.444444-11.377778 28.444445-28.444445V432.355556c0-22.755556 17.066667-45.511111 45.511111-45.511112 22.755556 5.688889 39.822222 22.755556 39.822222 45.511112z" fill="#7dc5eb" p-id="3764"></path></svg>
                    </div>
                    <div class="btn" @click="GroupNameDelete(i)"  v-if="UpdateName[i]==false">
                        <svg t="1570690164936" class="icon" viewBox="0 0 1039 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2495" width="32" height="32"><path d="M887.212614 360.983541c0-19.847024-16.087397-35.936467-35.935444-35.936467-19.84293 0-35.931351 16.08535-35.933397 35.928281l-0.00307 0 0 551.302121c0 13.213953-10.747785 23.956621-23.956621 23.956621L232.061286 936.234097c-13.20986 0-23.957645-10.742668-23.957645-23.956621L208.103642 361.215832c0-0.071631 0.010233-0.138146 0.010233-0.209778 0-19.846-16.089443-35.935444-35.936467-35.935444-19.835767 0-35.917024 16.075117-35.935444 35.905768l-0.011256 0 0 551.302121c0 52.842509 42.989093 95.828532 95.829556 95.828532l559.321772 0c52.839439 0 95.828532-42.987047 95.828532-95.828532L887.210567 361.02038C887.212614 361.005031 887.212614 360.995821 887.212614 360.983541z" p-id="2496" fill="#7dc5eb"></path><path d="M409.856645 838.332347c-19.847024 0-35.936467-16.089443-35.936467-35.935444L373.920178 360.975355c0-19.846 16.089443-35.936467 35.936467-35.936467 19.847024 0 35.936467 16.090467 35.936467 35.936467l0 441.420525C445.793112 822.242903 429.702646 838.332347 409.856645 838.332347z" p-id="2497" fill="#7dc5eb"></path><path d="M613.588723 838.332347c-19.847024 0-35.936467-16.089443-35.936467-35.935444L577.652256 360.975355c0-19.846 16.090467-35.936467 35.936467-35.936467s35.935444 16.090467 35.935444 35.936467l0 441.420525C649.524167 822.242903 633.434723 838.332347 613.588723 838.332347z" p-id="2498" fill="#7dc5eb"></path><path d="M987.097532 155.264203 819.301921 155.264203 819.301921 115.272373c0-52.840462-42.990117-95.829556-95.829556-95.829556L299.974026 19.442818c-52.841485 0-95.829556 42.989093-95.829556 95.829556l0 39.99183L36.347836 155.264203c-19.847024 0-35.936467 16.089443-35.936467 35.936467 0 19.846 16.089443 35.935444 35.936467 35.935444l950.749696 0c19.848047 0 35.936467-16.090467 35.936467-35.935444C1023.033999 171.353646 1006.944556 155.264203 987.097532 155.264203zM276.016381 115.272373c0-13.208836 10.746762-23.957645 23.957645-23.957645l423.49834 0c13.208836 0 23.957645 10.747785 23.957645 23.957645l0 39.99183L276.016381 155.264203 276.016381 115.272373z" p-id="2499" fill="#7dc5eb"></path></svg>
                    </div>
                </div>
                <!-- <ul>
                    <li v-for="(elem,i) in item.list" :key="'item'+i">
                        <span>elem</span>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            GroupSearch:'',//搜索框内容
            GroupSearchFirst:true,//是否触发首次查询，未触发则不显示没查询到结果，已触发则按查询
            GroupSearchClick:'',//搜索框点击搜索时的内容
            GroupInsert:{},//添加
            GroupList:[
                { id:'1',name:'qunzu1',list:['aa','bb','cc'] },
                { id:'2',name:'qunzu2',list:['aa2','bb2','cc2'] },
                { id:'3',name:'qunzu3',list:['aa3','bb3','cc3'] }
            ],//后台传回的群组数据
            SearchList:[
            ],//按查询条件搜索出来的群组数据
            UpdateName:[false,false,false],//群组状态（待修改false，正在修改true）
            UpdateDetails:{id:-1,content:''},//正在修改的群组下标

        }
    },
    methods:{
        Search(){//点击搜索按钮  搜索群组
            //将首次查询状态修改
            this.GroupSearchFirst=false;
            //将输入框内开头和结尾的空格去除
            this.GroupSearchClick=this.GroupSearch.trim();
            this.SearchList=[];
            for(let item in this.GroupList){
                let i=this.GroupList[item].name.indexOf(this.GroupSearchClick)
                if(i!=-1){
                    this.SearchList.push(this.GroupList[item])
                }
            }
        },
        GroupNameUpdate(n){//点击修改按钮，修改群组名称
            //将全部群组状态改为待修改
             this.UpdateName.forEach((elem,i,arr)=>{
                 arr[i]=false
              })
            
            //将要修改的群组状态设置为修改中
            this.UpdateName.splice(n,1,true);
            //更新修改中的群组下标
            this.UpdateDetails.id=n;
        },
        GroupNameDelete(n){//点击删除按钮，删除群组
            let name=this.GroupList[n].name
            // 将后台传来的数组中的数据进行部分删除
            this.GroupList.splice(n,1)
            //将删除的数据传给后台----待做
            //删除成功弹框
            alert('您已成功删除'+name+'群组')
            //重新查询
            this.Search()
        },
        UpdateNameDefine(){//修改群组名称后  点击确认按钮
            let name=this.GroupList[this.UpdateDetails.id].name;  //旧群组名
            let UpdateName=this.UpdateDetails.content //新群组名
            // 将后台传来的数组中的数据修改
            this.GroupList[this.UpdateDetails.id].name=this.UpdateDetails.content;
            //将修改的数据传给后台----待做
            //将正在修改的内容清空
            this.UpdateDetails.id=-1;
            this.UpdateDetails.content="";
            //将全部群组状态改为待修改
            this.UpdateName.forEach((elem,i,arr)=>{
                arr[i]=false
              })
            //修改成功弹框
            alert('您已成功将群组'+name+'改为'+UpdateName)
            //重新查询
            // this.Search()
        }
    },
    mounted(){
        this.Search();
        this.GroupSearchFirst=true;
    }
    
}
</script>
<style scoped>
.btn{
    float:right;
    width:32px;
    height:32px;
    margin:9px 5px 0px 0px;
    cursor: pointer;
}
.group_div::after{
    content:'';
    display: block;
    clear: both;
}
input{
    width:500px;
    height:40.4px;
    box-sizing: border-box;
}
</style>
