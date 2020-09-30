let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://192.168.0.13:8080/'
		url_config = 'http://47.114.4.78:10000/'
}else{
    // 生产环境
    url_config = 'https://47.114.4.78:10000/'
}

export default url_config

