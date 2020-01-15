Vue.component("addarea", {
	data() {
		return {
			areaPopup: false,
			area: {
				company_id: "",
				area_id: "",
				area_name: "",
				area_alias: "",
				area_desc: "",
				area_contact: "",
				area_contact_phone: "",
				area_importance: "3",
			}
		}
	},
	created() {},
	mounted() {},
	methods: {
		save(){
			this.$emit('area',this.area)
		}
	},
	template: `
	<el-dialog title="区域参数" :visible.sync="areaPopup" width="50%" >
		<div>
			<table class="yby_table">
				<tr>
					<td>
						<div class="flex input-box">
							<span>区域名称</span>
							<input v-model="area.area_name" class="input-bg" type="text" />
						</div>
					</td>
					<td>
						<div class="flex input-box">
							<span>别名</span>
							<input v-model="area.area_alias" class="input-bg" type="text" />
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div class="flex input-box">
							<span>区域描述</span>
							<textarea v-model="area.area_desc" class="input-bg" rows="8" cols=""></textarea>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="flex input-box">
							<span>区域联系人</span>
							<input v-model="area.area_contact" class="input-bg" type="text" />
						</div>
					</td>
					<td>
						<div class="flex input-box">
							<span>联系人电话</span>
							<input v-model="area.area_contact_phone" class="input-bg" type="text" />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="flex input-box">
							<span>区域重要性</span>
							<el-rate :colors="['#ff5353','#ff5353','#ff5353']" v-model="area.area_importance"></el-rate>
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
