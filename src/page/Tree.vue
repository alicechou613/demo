<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
	  :check-strictly="checks"
	  @check="clickDeal"
	  node-key="menuId"
	  :expand-on-click-node="false"
	  >
    </el-tree>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
		checks:true,
        data1: [{
            isLeaf: false,
            name: '北研 1'
          }, {
            isLeaf: false,
            name: '北研 2'
          }, {
            isLeaf: false,
            name: '北研 3'
          }, {
            isLeaf: false,
            name: '广研 1',
          }, {
            isLeaf: false,
            name: '广研 2',
          }, {
            isLeaf: false,
            name: '广研 3',
        }],
        data2: [{
                isLeaf: true,
                name: '成员1',
				reallCheck:true
              },
              {
                isLeaf: true,
                name: '成员2',
				reallCheck:true
              },{
                isLeaf: false,
                name: '平台 1'
              },{
                isLeaf: false,
                name: '平台 2'
        }],
        data3: [{
                isLeaf: true,
                name: '成员1',
				reallCheck:true
              }, {
                isLeaf: true,
                name: '成员2',
				reallCheck:true
              },{
                isLeaf: false,
                name: '1组'
              },{
                isLeaf: false,
                name: '2组'
        }],
        data4: [{
                isLeaf: true,
                name: '成员1',
				reallCheck:true
              }, {
                isLeaf: true,
                name: '成员2',
				reallCheck:true
        }],
        props: {
          label: 'name',
          children: [],
          isLeaf: 'leaf'
        },
      }
    },

    methods: {
		// 勾选父节点，只选中下方的组成员
		clickDeal (node) {
			console.log(node)
			if(node.isLeaf==true){
				this.checks=false;
			}else{
				this.checks=true;
			}
			
		},
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: '组织架构' }]);
        }
        if (node.level>4) return resolve([]);
        const thisdata1 = this.data1;
        const thisdata2 = this.data2;
        const thisdata3 = this.data3;
        const thisdata4 = this.data4;
        setTimeout(() => {
          if (node.level === 1) {
            const data =  node.data.isLeaf ? [] : thisdata1;	
            resolve(data);
          } else if (node.level === 2) {
			 const data =  node.isLeaf ? [] : thisdata2;
            resolve(data);
          } else if (node.level === 3) {
           const data =  node.data.isLeaf ? [] : thisdata3;
            resolve(data);
          } else if (node.level === 4) {
           const data =  node.data.isLeaf ? [] : thisdata4;
            resolve(data);
          }
        },500);

      }
      
    }
  };
  
  
  // export default {
  //   data() {
  //     return {
  //       props: {
  //         label: 'name',
  //         children: 'zones',
  //         isLeaf: 'leaf'
  //       },
  //     };
  //   },
  //   methods: {
  //     loadNode(node, resolve) {
  //       if (node.level === 0) {
  //         return resolve([{ name: 'region' }]);
  //       }
  //       if (node.level > 1) return resolve([]);
  
  //       setTimeout(() => {
  //         const data = [{
  //           name: 'leaf',
  //           leaf: true
  //         }, {
  //           name: 'zone',
  // 			leaf: true
  //         }];
  
  //         resolve(data);
  //       }, 500);
  //     }
  //   }
  // };
</script>
<style scoped>
  .el-tree {
    width: 300px;
    height: 600px;
    border: 1px solid #409EFF;
    margin: 100px;
    padding: 20px;
  }

</style>