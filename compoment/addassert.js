Vue.component("addassert", {
	data() {
		return {
			assertPopup: false,
			assert: {
				company_id: "",
				area_id: "",
				assert_id: "",
				assert_name: "",
				assert_ip: "",
				assert_mac: "",
				assert_vendor: "",
				product_name: "",
				assert_num: "",
				assert_type: "",
				assert_firmware_version: "",
				assert_importance: "3",
			},
			vendor_list:[],
			product_name_list:[],
			num_list:[],
			type_list:[],
			firmware_version:[],
		}
	},
	created() {
		var that = this
		if(getCookie("ivass-name")){
			$.ajax({
				type: "get",
				url: urll + "/req/assert_currency",
				async: true,
				success: function(res) {
					if (res.res_code == 0) {
						that.vendor_list = res.res_obj.vendor_list
						that.product_name_list = res.res_obj.product_name_list
						that.num_list = res.res_obj.num_list
						that.type_list = res.res_obj.type_list
						that.firmware_version = res.res_obj.firmware_version
					} else {
						that.$message.error(res.res_msg)
					}
				},
				error: function() {
					that.$message.error("系统错误请联系管理员")
				}
			})
		}
		
	},
	mounted() {},
	methods: {
		save() {
			this.$emit('newassert', this.assert)
		}
	},
	template: `
	<el-dialog title="资产参数" :visible.sync="assertPopup" width="50%" >
		<div>
			<table class="yby_table">
				<tr>
					<td>
						<div class="flex input-box">
							<span>资产名</span>
							<input v-model="assert.assert_name" class="input-bg" type="text" />
						</div>
					</td>
					<td>
						<div class="flex input-box">
							<span>资产重要性</span>
							<el-rate :colors="['#ff5353','#ff5353','#ff5353']" v-model="assert.assert_importance"></el-rate>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="flex input-box">
							<span>ip</span>
							<input v-model="assert.assert_ip" class="input-bg" type="text" />
						</div>
					</td>
					<td colspan="2">
						<div class="flex input-box">
							<span>Mac</span>
							<input v-model="assert.assert_mac" class="input-bg" type="text" placeholder="例如:18-31-bf-0c-60-5e" />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="flex input-box">
							<span>厂商</span>
							<div style="flex:1 1 auto">
								<el-select
								    v-model="assert.assert_vendor"
									clearable
								    filterable
								    allow-create
								    default-first-option>
								    <el-option
								      v-for="item in vendor_list"
								      :key="item.id"
								      :label="item"
								      :value="item">
								    </el-option>
								  </el-select>
							</div>
						</div>
					</td>
					<td>
						<div class="flex input-box">
							<span>产品名称</span>
							<div style="flex:1 1 auto">
								<el-select
								    v-model="assert.product_name"
									clearable
								    filterable
								    allow-create
								    default-first-option>
								    <el-option
								      v-for="item in product_name_list"
								      :key="item.id"
								      :label="item"
								      :value="item">
								    </el-option>
								  </el-select>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="flex input-box">
							<span>资产型号</span>
							<div style="flex:1 1 auto">
								<el-select
								    v-model="assert.assert_num"
									clearable
								    filterable
								    allow-create
								    default-first-option>
								    <el-option
								      v-for="item in num_list"
								      :key="item.id"
								      :label="item"
								      :value="item">
								    </el-option>
								  </el-select>
							</div>
						</div>
					</td>
					<td>
						<div class="flex input-box">
							<span>产品类型</span>
							<div style="flex:1 1 auto">
								<el-select
								    v-model="assert.assert_type"
									clearable
								    filterable
								    allow-create
								    default-first-option>
								    <el-option
								      v-for="item in type_list"
								      :key="item.id"
								      :label="item"
								      :value="item">
								    </el-option>
								  </el-select>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="flex input-box">
							<span>固件版本</span>
							<div style="flex:1 1 auto">
								<el-select
								    v-model="assert.assert_firmware_version"
									clearable
								    filterable
								    allow-create
								    default-first-option>
								    <el-option
								      v-for="item in firmware_version"
								      :key="item.id"
								      :label="item"
								      :value="item">
								    </el-option>
								  </el-select>
							</div>
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
