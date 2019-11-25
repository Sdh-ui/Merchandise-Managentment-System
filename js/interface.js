(function () {

    $(function () {

        //用户名 匿名 密码正则验证
        var usernameReg = /^[0-9A-Za-z]{6,16}$/;
        var nicknameReg = /^[\u4e00-\u9fa5A-Za-z]{4-8}$/;
        var pwdReg = /^[0-9A-Za-z]{6,12}$/;

        var username;

        //获取本地用户
        var localUsers = JSON.parse(localStorage.getItem('users')) == null || undefined ? [] : JSON.parse(localStorage.getItem('users'))

        //获取本地用户商品类型
        var localUsertype = JSON.parse(localStorage.getItem('usertype')) == null || undefined ? {} : JSON.parse(localStorage.getItem('usertype'))

        //获取本地用户商品
        var localUserprd = JSON.parse(localStorage.getItem('userprd')) == null || undefined ? {} : JSON.parse(localStorage.getItem('userprd'))


        //更新左侧分类列表
        function initTemplate(ele, name, slector) {
            $(slector).find('ul').empty()

            if ($.isEmptyObject(ele)) {
                console.log('a');

                return;
            } else {


                for (var key in ele) {

                    if (name == key) {
                        console.log(ele[key]);
                        for (var i = 0; i < ele[key].length; i++) {

                            var typeli = $(`<li class="text-secondary" data-type="${ele[key][i].type}">${ele[key][i].title}</li>`);

                            $(slector).find('ul').append(typeli)


                        }
                    }
                }

            }


        }

        //渲染商品数据
        function initPrd(data, user) {


            $('tbody').empty()

            $('.p-t').text($('.showdata .pro-active').text());



            var type = $('.showdata .pro-active').data('type');

            for (var key in data) {

                if (user == key) {



                    $.each(data[key][type], function (i, item) {


                        var $tr = $(`<tr><td>${i + 1}</td>
                        <td>
                            <div class="pro-img">
                                <img class="d-block w-100" src="${item.img}" alt="">
                            </div>
                        </td>
                        <td>
                            <div class="pro-title">${item.name}</div>
                        </td>
                        <td>
                            <div class="pro-price">${item.price}</div>
                        </td>
                        <td class="change-btn">
                                <button type="button" class="btn btn-warning btn-sm eidt" data-id="${item.id}">编辑</button>
                                <button type="button" class="btn btn-danger btn-sm rm" data-id="${item.id}">删除</button>
                        </td></tr>`);

                        $('tbody').append($tr);
                    })
                }
            }




        }

        //编辑商品
        function eidtPrd(data, user, num) {




            var name = $('#editm1').find('.edit-title').val()
            var price = $('#editm1').find('.edit-price').val()
            var img = $('#editm1').find('.edit-url').val();
            var type = $('#three .pro-active').data('type')

            for (var key in data) {


                if (key == user) {
                    for (var k in data[key]) {
                        if (k == type) {

                            console.log(11);
                            for (var j = 0; j < data[key][k].length; j++) {
                                if (data[key][k][j].id == num) {
                                    data[key][k][j].name = name;
                                    data[key][k][j].price = price;
                                    data[key][k][j].img = img;

                                    console.log(data);

                                    localStorage.setItem('userprd', JSON.stringify(data))
                                    localUserprd = JSON.parse(localStorage.getItem('userprd'))

                                    return
                                }
                            }
                        }
                    }
                }
            }


        }

        //删除商品
        function rmPrd(data, user, num) {

            type = $('#three .pro-active').data('type')

            for (var key in data) {
                if (key == user) {
                    for (var k in data[key]) {
                        if (k == type) {



                            for (var i = 0; i < data[key][k].length; i++) {

                                console.log(data);
                                if (data[key][k][i].id == num) {

                                    console.log(data);

                                    data[key][k].splice(i, 1);

                                    console.log(data);

                                    localStorage.setItem('userprd', JSON.stringify(data))
                                    localUserprd = JSON.parse(localStorage.getItem('userprd'))
                                    return;
                                }
                            }
                        }
                    }
                }
            }



        }


        //登陆界面
        $('.landbtn').on('click', function () {
            var a = $(this).data('status');
            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).parent('.interface-title').find('.active').removeClass('active');
                $(this).addClass('active');
                console.log($(this).parents('.interface').find('.' + a));
                var inteface = $(this).parents('.interface');
                // inteface.find('.login-text').css({
                //     transform: 'rotateY(130 deg)'

                // })
                inteface.find('.login-text').hide();
                inteface.find('.land-text').show();

            }

        })

        //注册界面
        $('.loginbtn').on('click', function () {
            var a = $(this).data('status');
            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).parent('.interface-title').find('.active').removeClass('active');
                $(this).addClass('active');
                console.log($(this).parents('.interface').find('.' + a));
                var inteface = $(this).parents('.interface');
                inteface.find('.land-text').hide();
                inteface.find('.login-text').show();

            }

        })




        //注册事件
        $('.sign-up').on('click', function () {
            username = $('.login-text>.username>input').val();
            var nickname = $('.login-text>.nickname>input').val();
            var pwd = $('.login-text>.pwd>input').val();
            var pwdagain = $('.login-text>.pwdagain>input').val();


            if (username == null || nickname == null || pwd == null || pwdagain == null) {
                alert('请输入完整注册信息');
                return
            }

            if (!(usernameReg.test(username) || nicknameReg.test(nickname) || pwdReg.test(pwd) || pwd != pwdagain)) {
                $('.login-text input').val('')
                alert('用户名或匿名或密码错误，请重新注册')
            } else {
                var o = {
                    username,
                    nickname,
                    pwd
                };
                if (localUsers.length > 0) {
                    for (var i = 0; i < localUsers.length; i++) {
                        for (var key in localUsers[i]) {
                            if (key == 'pwd') {
                                continue;
                            }
                            for (var k in o) {

                                if (k == key && localUsers[i][key] == o[k]) {
                                    $('.login-text input').val('')
                                    alert(key + '重复,请重新注册');
                                    return;
                                }
                            }
                        }
                    }
                    $('.login-text input').val('')
                    // o.id =  o.id = new Date().getTime() + Math.random().toString().slice(2)
                    localUsers.push(o)

                    console.log(localUsers);

                    localUserprd[username] = {};


                    localStorage.setItem('users', JSON.stringify(localUsers))
                    localStorage.setItem('userprd', JSON.stringify(localUserprd))

                    alert('注册成功')
                    $('.interface').find('.active').removeClass('active');

                    $('.interface').find('.landbtn').addClass('active');

                    $('.interface').find('.login-text').hide();
                    $('.interface').find('.land-text').show();

                } else {
                    $('.login-text input').val('')
                    // o.id = new Date().getTime() + Math.random().toString().slice(2)
                    localUsers.push(o)

                    localUserprd[username] = {};


                    localStorage.setItem('users', JSON.stringify(localUsers))
                    localStorage.setItem('userprd', JSON.stringify(localUserprd))

                    alert('注册成功')
                    $('.interface').find('.active').removeClass('active');

                    $('.interface').find('.landbtn').addClass('active');


                    $('.interface').find('.login-text').hide();
                    $('.interface').find('.land-text').show();

                }



            }

        })

        //登陆事件
        $('.sign-in').on('click', function () {

            var land = $(this).parent('.land-text');
            username = land.find('.username>input').val();
            // var nickname = land.find('.nickname>input').val();
            var pwd = land.find('.pwd>input').val();

            console.log(localUsers);

            if (localUsers.length == 0) {
                alert('账号不存在,请先进入sign-up注册界面')
                $('.land-text input').val('')
                $('.interface-title').find('.active').removeClass('active');
                $('.interface-title').find('.loginbtn').addClass('active');
                $('.interface').find('.login-text').show();
                $('.interface').find('.land-text').hide();
                return;
            } else {
                var o = {
                    username,
                    // nickname,
                    pwd
                };
                for (var i = 0; i < localUsers.length; i++) {
                    var localUserName = localUsers[i].username
                    if (o.username == localUsers[i].username && o.pwd == localUsers[i].pwd) {
                        var nickname = localUsers[i].nickname;
                        alert('登陆成功');
                        $('.prd-interface').show()
                        $('.interface-box').hide()

                        $('.prd-username').text(nickname);


                        localUsertype = JSON.parse(localStorage.getItem('usertype')) == null || undefined ? {} : JSON.parse(localStorage.getItem('usertype'))

                        localUserprd = JSON.parse(localStorage.getItem('userprd')) == null || undefined ? {} : JSON.parse(localStorage.getItem('userprd'))

                        // localUserprdName = localUserprd[username] ? localUserprd[username] : {};

                        initTemplate(localUsertype, username, '#two')
                        initTemplate(localUsertype, username, '#three')




                        $('.prd-interface').find('.showdata>li:first-child').addClass('pro-active')



                        initPrd(localUserprd, username)





                        return;


                    }
                }
                alert('账号或密码错误');
                $('.land-text input').val('')
            }



        })



        //退出账号
        $('.leave').on('click',function(){
            $('.prd-interface').hide();

            $('.interface-box').show()
            $('.login input').val('')

        })


        // var type;

        //添加商品类型事件
        $('.add-type').on('click', function () {

            $('#m0').modal();
        })

        //保存添加商品类型事件
        $('#savetype').on('click', function () {



            var title = $('#type-title').val()
            var type = $('#type-type').val()
            if (title == ''|| type == '') {
                alert('信息不完整')

                $('#m0 input').val('')
                return;
            }




            localUsertype[username] = localUsertype[username] ? localUsertype[username] : [];

            if (localUsertype[username].length == 0) {
                var tp = {
                    title,
                    type
                }
            } else {
                for (var i = 0; i < localUsertype[username].length; i++) {
                    console.log(title, type);
                    if (title == localUsertype[username][i].title || type == localUsertype[username][i].type) {


                        alert('商品类型或类型分类重复');
                        $('#m0 input').val('')
                        return;
                    }
                }

                var tp = {
                    title,
                    type
                }
            }
            localUsertype[username].push(tp);

            localStorage.setItem('usertype', JSON.stringify(localUsertype))

            console.log(localUsertype, username);
            $('#pro-title').val('')
            $('#pro-type').val('')

            initTemplate(localUsertype, username, '#two')
            initTemplate(localUsertype, username, '#three')




            $('#m0').modal('hide');


        })


        //删除商品类型事件
        $('.rm-type').on('click',function(){
            $('#m4').modal();
        })

        //保存删除商品类型事件
        $('#saverm').on('click',function(){
            var rmTitle = $('#rm-title').val();
            // var rmType = $('#rm-type').val();
            console.log($('#rm-title').val());

            if (rmTitle == '') {
                alert('信息不完整')

                $('#m4 input').val('')
                return;
            }


            localUsertype[username] = localUsertype[username] ? localUsertype[username] : [];

            if (localUsertype[username].length == 0) {
               alert('当前没有任何商品类型,请先去添加商品类型')
            } else {
                for (var i = 0; i < localUsertype[username].length; i++) {
                    // console.log(title, type);
                    if (rmTitle == localUsertype[username][i].title) {

                        localUsertype[username].splice(i,1)
                        localStorage.setItem('usertype', JSON.stringify(localUsertype))
                        console.log(localUsertype);



                        $('#m4 input').val('')
                   
                        break;
                    }
                }

                for(var k in localUserprd[username]){
                    if(k == rmTitle){
                        delete(localUserprd[username][k]);

                        localStorage.setItem('usertype', JSON.stringify(localUserprd))
                        console.log(localUserprd);
                       break;
                        
                    }

                    // if()
                }

      

            // console.log(localUsertype, username);
            $('#rm-title').val('')


            initTemplate(localUsertype, username, '#two')
            initTemplate(localUsertype, username, '#three')




            $('#m4').modal('hide');
            }
            
        })

        //添加商品事件
        $('.add').on('click', 'li', function () {
            $('#m1').modal();

            $('#m1 input').val('')
            console.log('a');

            $('#m1').find('#pro-title').val($(this).data('type'))

            $(this).addClass('pro-active').siblings().removeClass('pro-active')
        })

        //保存商品事件
        $('#save').on('click', function () {
            var name = $('#pro-name').val()
            var price = $('#pro-price').val()
            var img = $('#pro-url').val()
            var id = new Date().getTime() + Math.random().toString().slice(2)
            var type = $('.pro-active').data('type')

            if (name == null || price == null || img == null) {
                $('#m1').modal('hide');
                return;
            }

            localUserprd[username] = localUserprd[username] ? localUserprd[username] : {};

            userType = localUserprd[username][type] ? localUserprd[username][type] : [];
            var prd = {
                id,
                img,
                price,
                name,

            }

            userType.push(prd)
            localUserprd[username][type] = userType


            localStorage.setItem('userprd', JSON.stringify(localUserprd))

            localUserprd = JSON.parse(localStorage.getItem('userprd'));
            initPrd(localUserprd, username)

            $('#m1').modal('hide');
            return

        })

        // $('.showdata').on('click',function(){
        //     initPrd(localUserprd, username)
        // })

        //查看商品数据
        $('.showdata').on('click','li',function () {
            $(this).addClass('pro-active').siblings().removeClass('pro-active')
            initPrd(localUserprd, username)

        })



        //编辑商品事件
        $('table').on('click', '.eidt', function () {
            $('#editm1 input').val('');
            $('#editm1').modal();
            var id = $(this).data('id')

            console.log(id);




            $('#editm1').find('#edit-pro-type').val($('#three .pro-active').data('type'))
            $('#editm1').find('.edit-title').val($(this).parents('tr').find('.pro-title').text())
            $('#editm1').find('.edit-price').val($(this).parents('tr').find('.pro-price').text())
            $('#editm1').find('.edit-url').val($(this).parents('tr').find('.pro-img>img').attr('src'))

            $('#saveedit').on('click', function () {

                console.log(localUserprd);


                // console.log(name,price,img);



                eidtPrd(localUserprd, username, id);

                initPrd(localUserprd, username);

                localUserprd = JSON.parse(localStorage.getItem('userprd'))

                $('#editm1').modal('hide');

                return

            })


        })

        //删除商品事件
        $('table').on('click', '.rm', function () {

            // $(this).parents('tr').remove();
            var id = $(this).data('id')

            console.log(id);

            

            localUserprd = JSON.parse(localStorage.getItem('userprd'))

            console.log(localUserprd);
            
            rmPrd(localUserprd, username, id)

            initPrd(localUserprd, username)
        })

    })
})()