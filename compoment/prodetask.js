Vue.component("prodetask",{
	data(){
		return{
			company_id:"",
			probeTaskPopup:false,
			probeList:[],
		}
	},
	created(){},
	mounted(){},
	methods:{
		dele_probe(task_id){
			var that = this
			that.$confirm('删除操作不可逆, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				//确定
				$.ajax({
					type: "get",
					url: urll + "/req/del_task?task_id=" + task_id,
					async: true,
					success: function(res) {
						if (res.res_code == 0) {
							that.$message.success(res.res_msg)
						} else {
							that.$message.error(res.res_msg)
						}
					},
					error: function() {
						that.$message.error("系统错误请联系管理员")
					}
				})
			}).catch(() => {
				that.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		//关闭弹窗
		handleClose(done){
			this.$emit("handclose")
			done()
		},
	},
	template:`
		<el-dialog title="探测任务" :visible.sync="probeTaskPopup" width="70%" :before-close="handleClose">
				<div>
					<table class="yby_table ivass_table">
						<tr class="shadow">
							<th>任务名称</th>
							
							<th>网段</th>
							<th>区域</th>
							<th>状态</th>
							<th>扫描进度</th>
							<th>创建时间</th>
							<th>更新时间</th>
							<th>操作</th>
						</tr>
						<tr v-show="probeList.length==0">
							<td colspan="9">
								<h2><center>暂无资产</center></h2>
							</td>
						</tr>
						<tr v-for="item in probeList" :key="item.id">
							<td>{{item.task_name}}</td>
							
							<td>{{item.task_network}}</td>
							<td>{{item.area}}</td>
							<td>{{item.state}}</td>
							<td>{{item.task_percent}}%</td>
							<td>{{item.create_time}}</td>
							<td>{{item.update_time}}</td>
							<td width="100px">
								<div class="flex flex-around">
									<div class="table-btn" @click="dele_probe(item.task_id)">删除</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</el-dialog>
	`
})