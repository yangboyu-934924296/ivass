Vue.component("batch",{
	data(){
		return {
			company_id:"",
			area_id:"",
			companyFilePopup:false,
			filepercent:"0",
			ws:"",
		}
	},
	created(){
	},
	mounted(){},
	watch:{
		companyFilePopup(val){
			if(val){
				this.filepercent = 0
			}
		}
	},
	methods:{
		//文件弹窗关闭之前
		fileClose(done){
			var that = this
			if(that.filepercent=="100"||that.filepercent=="0"){
				done()
				if(that.ws!=""){
					that.ws.close()
					that.$emit('complete')
				}
			}else{
				that.$message.warning("导入完成后，才可关闭弹窗！")
			}
		},
		//文件上传成功时
		fileSuccess(){
			var that = this
			that.filepercent = "0"
			that.ws = new WebSocket(urllws + '/req/get_file_process');
			that.ws.onmessage = function (event) {
				that.filepercent = JSON.parse(event.data).res_obj.percent
			};
		},
		reback(response){
			var that = this
			if(response.res_code==0){
				that.$message.success(response.res_msg)
			}else{
				that.$message.warning(response.res_msg)
			}
			
		}
	},
	template:`
	<el-dialog title="资产批量导入" :visible.sync="companyFilePopup" width="50%" :before-close="fileClose">
		<div style="text-align: center;">
			<!-- 文件上传 -->
			<div style="display:inline-block">
				<el-upload
				  class="upload-demo"
				  drag
				  :action="urll+'/req/batch_import'"
				  :data="{'company_id':company_id,'area_id':area_id}"
				  :before-upload="fileSuccess"
				  :on-success="reback"
				  :show-file-list = false
				  multiple>
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				</el-upload>
			</div>
			<!-- 文件解析进度 -->
			<div style="width: 50%;margin: 0 auto;">
				<el-progress :text-inside="true" :stroke-width="20" :percentage="filepercent"></el-progress>
			</div>
		</div>
	</el-dialog>
	`
})