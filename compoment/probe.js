Vue.component("probe",{
	data(){
		return {
			probePopup:false,
			company_stat_company_name:"",
			probe:{
				company_id:"",
				area_id:"",
				ip:"",
				task_name:"",
				task_desc:"",
			},
			areaListScreen:[]
		}
	},
	created(){},
	mounted(){},
	methods:{
		save(){
			var that = this
			$.ajax({
				type: "post",
				url: urll + "/req/create_network_task",
				async: true,
				data:that.probe,
				success: function(res) {
					if (res.res_code == 0) {
						that.$message.success(res.res_msg)
						that.$emit('comp')
						that.probePopup = false
					} else {
						that.$message.error(res.res_msg)
					}
				},
				error: function() {
					that.$message.error("系统错误请联系管理员")
				}
			})
		},
	},
	template:`,
	<el-dialog title="探测任务" :visible.sync="probePopup" width="50%" >
		<div>
			<table class="yby_table">
				<tr>
					<td>
						当前待检测的企业名称:{{company_stat_company_name}}
					</td>
					<td>
						<div class="flex">
							<span>选择要扫描的企业区域</span>
							<div>
								<div style="margin-left: 20px;">
									<el-select v-model="probe.area_id" placeholder="请选择" >
										<el-option
										  label="无"
										  value="">
										</el-option>
									    <el-option
									      v-for="item in areaListScreen"
									      :key="item.value"
									      :label="item.name"
									      :value="item.value">
									    </el-option>
									</el-select>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div class="flex input-box">
							<span>IP网段</span>
							<input v-model="probe.ip" class="input-bg" type="text" placeholder="例如:192.168.1.1"/>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div class="flex input-box">
							<span>任务名称</span>
							<input v-model="probe.task_name" class="input-bg" type="text" />
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div class="flex input-box">
							<span>任务描述</span>
							<textarea v-model="probe.task_desc" class="input-bg" rows="8" cols=""></textarea>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="save">确 定</el-button>
		</span>
	</el-dialog>
	`
})