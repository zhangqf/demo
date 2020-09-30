import request from '@/common/request.js'
module.exports = {
	// 登录
	login(data) {
		return request('api/maintLogin', 'post', data);
	},
	// 修改密码
	editMaintPwd(data){
		return request(`api/editMaintPwd?id=${data.id}&&oldPwd=${data.oldPwd}&&nowPwd=${data.nowPwd}`,'POST',data)
	},
	// 所有工单
	getAllOrderList(data){
		return request("api/getAllOrderList","get",data)
	},
	// 维修接单
	saveRecent(data){
		return request(`api/saveRecent?orderId=${data.orderId}&&workerId=${data.workerId}`,"post")
	},
	// 报修工单列表
	getOrderListByMaint(data){
		return request('api/getOrderListByMaint','get',data)
	},
	// 完成维修
	saveReceives(data){
		return request(`api/saveReceives?orderId=${data.orderId}&&remark=${data.remark}&&receImgs=${data.receImgs}`,'post')
	},
	/* 获取维修工信息 */
	getMaintById(data){
		return request('/api/getMaintById',"get",data)
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 获取报修项目
	getReports(){
		return request("api/getReports","get");
	},
	// 获取报修类型
	getWarrs(){
		return request("api/getWarrs","get")
	},
	// 提交报修工单
	saveWorkOrder(data){
		return request("api/saveWorkOrder","post", data)
	},
	// 提交建议
	saveComplaint(data){
		return request("api/saveComplaint","post", data)
	},
	// 报修工单列表
	getOrderByClientId(data){
		return request("api/getOrderByClientId","get", data)
	},
	// 建议列表
	getComplaintByClientId(data){
		return request("api/getComplaintByClientId","get",data)
	},
	// 广告
	getAdvers(){
		return request("api/getAdvers","get")
	},
	// 公告列表
	getNoticeList(data){
		return request("api/getNoticeList","get",data)
	},
	// 申请车位
	saveApplyCar(data){
		return request("api/saveApplyCar","post",data)
	},
	// 报修工单详情
	getOrderById(data){
		return request("api/getOrderById","get",data)
	},

}
