var charts = [];
window.onresize = function() {
	if (charts.length > 0) {
		for (var i = 0; i < charts.length; i++) {
			charts[i].resize()
		}
	}
}
//线图
function line_chart(chart,data,title,color){
	var series = []
	for(var i=0;i<data.data.length;i++){
		let item = {
			name:data.data[i].name,
			data: data.data[i].data,
	        type: 'line',
	        areaStyle: {
	        	opacity:0.2
	        }
		}
		series.push(item)
	}
	if (echarts.getInstanceByDom(chart)) {
		var mychart = echarts.getInstanceByDom(chart);
		mychart.setOption({
			title:{
				text:title,
			},
			xAxis:{
				data: data.xdata
			},
			series: series
		})
	}else{
		var mychart = echarts.init(chart)
		var option = {
			color:color||["#1ac9d9","#0f9aea","#e6bc13"],
			title:{
				text:title,
				textStyle:{
					color:"#fff",
					fontSize:16,
				}
			},
			tooltip:{
				trigger:"axis"
			},
			xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        axisLabel:{
		        	color:"#fff"
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:"#445e90"
		        	}
		        },
		        data: data.xdata
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel:{
		        	color:"#fff"
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:"#445e90"
		        	}
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:"#445e90"
		        	}
		        }
		    },
			grid:{
				left:"50px",
			},
		    series: series
		}
		mychart.setOption(option)
		charts.push(mychart)
	}
}
//柱图
function bar_chart(chart,data,title,color){
	var series = []
	for(var i=0;i<data.data.length;i++){
		let item = {
			name:data.data[i].name,
			data: data.data[i].data,
	        type: 'bar',
	        barWidth:35,
		}
		series.push(item)
	}
	if (echarts.getInstanceByDom(chart)) {
		var mychart = echarts.getInstanceByDom(chart);
		mychart.setOption({
			title:{
				text:title,
			},
			xAxis:{
				data: data.xdata
			},
			series: series
		})
	}else{
		var mychart = echarts.init(chart)
		var option = {
			color:color||["#0f9aea","#1ac9d9","#e6bc13"],
			title:{
				text:title,
				textStyle:{
					color:"#fff",
					fontSize:16,
				}
			},
			tooltip:{
				trigger:"axis",
				axisPointer: {
		            type: 'shadow'
		        }
			},
			xAxis: {
		        type: 'category',
		        axisLabel:{
		        	color:"#fff"
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:"#445e90"
		        	}
		        },
		        data: data.xdata
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel:{
		        	color:"#fff"
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:"#445e90"
		        	}
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:"#445e90"
		        	}
		        }
		    },
			grid:{
				left:"50px",
			},
		    series: series
		}
		mychart.setOption(option)
		charts.push(mychart)
	}
}
//饼图
function pie_chart(chart,data,title,color){
	if (echarts.getInstanceByDom(chart)) {
		var mychart = echarts.getInstanceByDom(chart);
		mychart.setOption({
			title:{
				text:title,
			},
			series: [{
				name: "占比",
				data:data
			},
			]
		})
	}else{
		var mychart = echarts.init(chart)
		var option = {
			color:color||["#0f9aea","#1ac9d9","#e6bc13"],
			title:{
				text:title,
				textStyle:{
					color:"#fff",
					fontSize:16,
				}
			},
			tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		   	},
		    series: [
		        {
		            name:'占比',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            data:data
		        }
		    ]
		}
		mychart.setOption(option)
		charts.push(mychart)
	}
}
//仪表
function create_dashboard(chart,data,title){
	if (echarts.getInstanceByDom(chart)) {
		var mychart = echarts.getInstanceByDom(chart);
		mychart.setOption({
			series: [{
				name: "占比",
				data: [data]
			},
			]
		})
	} else {
		var mychart = echarts.init(chart);
		var option = {
			title:{
				text:title,
				textStyle:{
					color:"#fff",
					fontSize:16,
				}
			},
			series: [{
				name: '占比',
				type: 'gauge',
				center: ['50%', '60%'],
				detail: {
					formatter: '{value}%'
				},
				splitNumber:5,
				axisTick: {            
					length: 15,        
					lineStyle: {       
						color: 'auto'
					}
				},
				splitLine: {           
					length: 20,         
					lineStyle: {       
						color: 'auto'
					}
				},
				axisLabel:{
					color:"#fff"
				},
				axisLine: {
					show: true,
					lineStyle: {
						width: 20,
						shadowBlur: 0,
						color: [
							[0.25, "#29d07f"],
							[0.5, "#dae113"],
							[0.75, "#e09911"],
							[1, "#e74752"]
						]
					}
				},
				title: {
					show: false
				},
				detail:{
					formatter:"{value}",
					fontSize:14,
				},
				pointer:{
					width:5
				},
				data:[data]
			}]
		}
		mychart.setOption(option)
		charts.push(mychart)
	}
}