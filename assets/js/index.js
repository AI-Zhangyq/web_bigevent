$(function(){
    // 调用getUerInfo获取用户基本信息
    getUserInfo()

    $('#btnLogout').on('click',function(){

        //提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
        //当点击确定触发事件

        // 1.清空本地存储中的token
        localStorage.removeItem('token')
        // 2.重新跳转到登录页面
        location.href='/login.html'
        // 3.关闭confirm询问框
        layer.close(index);
        });
    })
})




// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // 请求头配置对象
        
        success:function(res){
            if(res.status != 0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用complete函数
   
    })
}





// 渲染用户的头像
function renderAvatar(user){
    // 1获取用户的名称
    var name = user.nickname || user.username
    // 2设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 3按需渲染用户的头像
    if(user.user_pic !== null){
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show
        $('.text-avatar').hide()
    }else{
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}



