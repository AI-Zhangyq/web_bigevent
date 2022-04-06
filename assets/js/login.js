$(function(){
    // 点击去‘注册账号’的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    
    // 点击‘去登陆’的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    
// 从layui中获取from对象

var form = layui.form
// 从layui中获取提示信息
var layer = layui.layer
// 通过form.verify()函数自定义校验规则
form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    //   校验两次密码是否一致的规则
    repwd:function(value){
        // 通过形参拿到的是确认密码框张的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则return一个提示消息
       var pwd = $('.reg-box [name=password]').val()
       if(pwd !=value){
           return '两次密码不一致！'
       }
    }
})

// 监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    // 1.先组织默认的提交行为
    e.preventDefault()
    // 2.发起ajax的post请求
    $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
    function(res){
        if(res.status !== 0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // 注册成功后模拟点击行为，跳转到登录页面
        $('#link_login').click()
    })
})

// 监听登录表单的提交行为
$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'post',
        // 快熟获取表单中的数据
        data:$(this).serialize(),
        success:function(res){
            if(res.status !==0){
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)
            // 跳转到后台主页
            location.href = '/index.html'
        }
    })
})
})

