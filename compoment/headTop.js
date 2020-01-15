Vue.component("headtop",{
	data(){
		return {
			name:getCookie("ivass-name"),
			role:"",
			loginPopup:false,
			user:{
				name:"",
				pwd:"",
			},
			iscreate:true,
		}
	},
	created(){
		//取cookie
		if(document.location.toString().indexOf("Overview") == -1){
			if(getCookie("ivass-name")){
				this.loginPopup = false 
			}else{
				this.loginPopup = true
			}
		}else{
			this.loginPopup = false 
			
		}
	},
	mounted(){
		this.iscreate = document.location.toString().indexOf("Overview") == -1
	},
	methods:{
		//登录
		login(){
			var that = this
			if(that.user.name==""){
				that.$message.error("用户名不能为空！")
			}else if(that.user.pwd==""){
				that.$message.error("密码不能为空！")
			}else{
				$.ajax({
					type: "post",
					url: urll + "/req/login",
					async: true,
					data:that.user,
					success: function(res) {
						if (res.res_code == 0) {
							that.$message.success(res.res_msg)
							that.name = that.user.name
							that.loginPopup = false
							setCookie("ivass-name",that.user.name)
							setCookie("ivass-userid",res.res_obj.userid)
							setCookie("ivass-step",res.res_obj.step)
							setCookie("ivass-companyid",res.res_obj.company_id)
							// that.$emit('step',[res.res_obj.step,res.res_obj.company_id])
							location.reload()
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
		logout(){
			var that = this
			$.ajax({
				type: "get",
				url: urll + "/req/logout",
				async: true,
				success: function(res) {
					if (res.res_code == 0) {
						clearCookie("ivass-name")
						clearCookie("ivass-step")
						clearCookie("ivass-companyid")
						clearCookie("ivass-userid")
						location.reload()
					} else {
						that.$message.error(res.res_msg)
					}
				},
				error: function() {
					that.$message.error("系统错误请联系管理员")
				}
			})
		},
		openlogin(){
			var that = this
			that.user = {
				name:"",
				pwd:"",
			}
			that.loginPopup = true
		}
	},
	template:`
		<div>
			<div class="headtop flex flex-between">
				<b>IVASS</b>
				<div class="flex flex-around">
					<div class="flex"><i class="headtop1"></i><span>{{name}}</span></div>
					<!--div class="flex"><i class="headtop2"></i><span>{{role}}</span></div-->
					<div v-if="iscreate" v-show="name==''" class="out-btn" @click="openlogin">登录</div>
					<div v-if="iscreate" v-show="name!=''" class="out-btn" @click="logout">退出登录</div>
				</div>
			</div>
			<!-- 弹窗&登录 -->
			<el-dialog title="欢迎登录" :visible.sync="loginPopup" width="30%" >
				<div>
					<table class="yby_table">
						<tr>
							<td>
								<div class="flex input-box">
									<span>用户名：</span>
									<input v-model="user.name" class="input-bg" type="text" @keyup.enter="login"/>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="flex input-box">
									<span>密码：</span>
									<input v-model="user.pwd" class="input-bg" type="password" @keyup.enter="login"/>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="login">确 定</el-button>
				  </span>
			</el-dialog>
		</div>
	`
})