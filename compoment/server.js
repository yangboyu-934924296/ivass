Vue.component("server",{
	data(){
		return{
			ip:"",
			progress:"0",
			serverPopup:false,
			List:[],
		}
	},
	created(){},
	mounted(){},
	methods:{
		//关闭弹窗
		handleClose(done){
			var that = this
			if(that.progress=="100"){
				that.$emit("handclose")
				done()
			}else{
				that.$confirm('是否确认关闭,关闭后终止扫描,下次重新开始扫描,是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//确定
					that.$emit("handclose")
					done()
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		},
	},
	template:`
		<el-dialog title="服务探测" :visible.sync="serverPopup" width="70%" :before-close="handleClose">
			<div class="flex" style="margin-bottom:10px"><span>{{ip}}的探测进度</span>
				<div style="flex:1;padding-left:20px"><el-progress :text-inside="true" :stroke-width="20" :percentage="progress"></el-progress></div>
			</div>
			<div>
				<table class="yby_table ivass_table">
					<tr class="shadow">
						<th>服务名称</th>
						<th>端口</th>
						<th>协议</th>
					</tr>
					<tr v-show="List.length==0">
						<td colspan="3">
							<h2><center>暂无发现服务</center></h2>
						</td>
					</tr>
					<tr v-for="item in List" :key="item.id">
						<td>{{item.server}}</td>
						<td>{{item.port}}</td>
						<td>{{item.agree}}</td>
					</tr>
				</table>
			</div>
		</el-dialog>
	`
})