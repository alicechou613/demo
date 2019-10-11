<template>
    <div>
        <el-table
            v-loading="listLoading"
            :data="UserList.data"    
            stripe
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange">
            <el-table-column :label="$t('table.id')" type="index" align="center" min-width="65">
            </el-table-column>
            <el-table-column :label="$t('table.userName')" align="center" min-width="150">
                <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.role')" align="center" min-width="150">
                <template slot-scope="scope">
                <span>{{ roleFormat(scope.row.role) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.description')" align="center" min-width="150">
                <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="text-right pagination"
            :v-show="UserList.total>0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="UserList.curPageNum"
            :page-sizes="[10, 25, 50, 100]"
            :page-size.sync="UserList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total.sync="UserList.total">
        </el-pagination>

    </div>
</template>
<script>
export default {
    data(){
        return {
                UserList: {
                    total: 0,
                    pageSize: 10,
                    curPageNum: 1,
                    order: 'asc',
                    orderIndex: 'id',
                    searchKey: null,
                    searchValue: null,
                    columnsIndex: ['name', 'role', 'description'],
                    filterIndex: null,
                    data: [
                        {id: 0, name: "admin", role: "1", description: "administrator"},
                        {id: 0, name: "control1", role: "3", description: "c1"},
                        {id: 0, name: "control2", role: "3", description: "c2"},
                        {id: 0, name: "log111", role: "4", description: "l1"},
                        {id: 0, name: "log222", role: "4", description: "l2"},
                        {id: 0, name: "system1", role: "2", description: "s1"},
                        {id: 0, name: "system2", role: "2", description: "s2"},
                        {id: 0, name: "control3", role: "3", description: "c3"},
                        {id: 0, name: "system3", role: "2", description: "s3"},
                        {id: 0, name: "log333", role: "4", description: "l3"}
                    ]
                },
            }
         },
         method:{
             handleCurrentChange (val) {
            this.UserList.curPageNum = val
            },
            handleSizeChange (value) {
            this.UserList.pageSize = value
            },
         },
         created () {
                this.UserList.curPageNum = Number(sessionStorage.getItem('curPage')) || 1
                this.UserList.pageSize = Number(sessionStorage.getItem('pagesize')) || 10
            },
            beforeUpdate() {
                sessionStorage.setItem('curPage', this.UserList.curPageNum)
                sessionStorage.setItem('pagesize', this.UserList.pageSize)
            },

            beforeDestroy() {
                sessionStorage.setItem('curPage', '1')
                sessionStorage.setItem('pagesize','10')
            },

            handleCurrentChange (val) {
                this.UserList.curPageNum = val
                sessionStorage.setItem('curPage',val)
                },
                handleSizeChange (value) {
                this.UserList.pageSize = value
                this.UserList.curPageNum = 1
                sessionStorage.setItem('pagesize',value)
                }
            }
</script>
