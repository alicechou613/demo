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
        <button @click="bb">btn</button>
        <!-- <div v-for="(elem,i) of mmmm" :key="i">
            <span>{{elem.name}}</span>
            <span>{{elem.department1}}</span>
            <span>{{elem.department2}}</span>
            <span>{{elem.department3}}</span>
        </div> -->
    </div>
</template>
<script>
export default {
    methods:{
        bb(){
            // var a=this.pySort([{name:'wfsa'},{name:'fdb'},{name:'qaaa'},{name:'acde'},{name:'abcf'},{name:'arbn'},{name:'我啊'},{name:'你我'},{name:'啊是'},{name:'我吧'},{name:'你'},{name:'啊'},{name:'我放'},{name:'你'},{name:'啊'},{name:'我噗'},{name:'你'},{name:'啊'},{name:'我在'},{name:'你'},{name:'啊'},{name:'呀'},{name:'嗯'},{name:'晚'},{name:'噗'},{name:'放'}])
            // var a=this.pySort([{name:'wfsa'},{name:'acde'},{name:'abcf'},{name:'arbn'},{name:'我啊'},{name:'我吧'},{name:'我放'},{name:'我噗'},{name:'我在'}])
            var a=this.pySort(this.memeberSearch)
            // console.log(a)
        },
        pySort:function(arr,empty){
            var $this = this;
            if(!String.prototype.localeCompare)
                return null;
            var letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
            var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
            var arrList = [];
            for(var m =0;m<arr.length;m++){
                arrList.push(arr[m].name);//取数组中每个下标的name
            }
            var result = [];
            var curr;
            for(var i=0;i<letters.length;i++){
                curr = {letter: letters[i], data:[]};
                if(i!=26){
                for(var j =0;j<arrList.length;j++){
                    var initial = arrList[j].charAt(0);//截取第一个字符
                    // console.log(initial,79)
                    if(arrList[j].charAt(0)==letters[i]||arrList[j].charAt(0)==letters[i].toLowerCase()){  //首字符是英文的
                        curr.data.push(arrList[j]);
                    }else if(zh[i]!='*'&&$this.isChinese(initial)){   //判断是否是无汉字,是否是中文
                        if(initial.localeCompare(zh[i]) >= 0 &&(!zh[i+1]||initial.localeCompare(zh[i+1]) <0)) {  //判断中文字符在哪一个类别
                            curr.data.push(arrList[j]);
                        }
                    }
                }
                }else{
                for(var k =0;k<arrList.length;k++){
                    var ini = arrList[k].charAt(0);      //截取第一个字符
                    if(!$this.isChar(ini)&&!$this.isChinese(ini)){
                        curr.data.push(arrList[k]);
                    }
                }
                }
                if(empty || curr.data.length) {
                result.push(curr);
                curr.data.sort(function(a,b){
                 return b.localeCompare(a);    //排序,英文排序,汉字排在英文后面
                });
                }
            }
            // console.log(result)
            this.mmmm=result;
            console.log(this.mmmm,56)
            return result;
        },
        isChinese:function(temp){
            var re=/[^\u4E00-\u9FA5]/;
            if (re.test(temp)){return false;}
            return true ;
        },
        isChar:function(char){
            var reg = /[A-Za-z]/;
            if (!reg.test(char)){return false ;}
            return true ;
        }
    },
    data(){
        return{
            aa:'',
            mmmm:[],
            memeberSearch:[//群成员数据 
                {userId:1,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:2,name:'阿三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:3,name:'包三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:9,name:'张在三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:4,name:'财三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:8,name:'张吧三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:5,name:'晚三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:6,name:'何三',department1:'北研',department2:'一处',department3:'一组'},
                {userId:7,name:'张啊三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:10,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:11,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:12,name:'张2三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:13,name:'张3三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:14,name:'张4三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:15,name:'张5三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:16,name:'张6三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:17,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:18,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:19,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:20,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:21,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:22,name:'张2三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:23,name:'张3三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:24,name:'张4三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:25,name:'张5三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:26,name:'张6三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:27,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:28,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:29,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
                // {userId:30,name:'张三',department1:'北研',department2:'一处',department3:'一组'},
            ]
        }
    }
}
</script>

