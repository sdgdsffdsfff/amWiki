define(function(require, exports, module) {
  var $ = require('gallery/jquery/1.8.2/jquery');
  $('.entry-content a').attr('target','_blank');

    //���˵���λ
        $(function(){
            //��ȡҪ��λԪ�ؾ�������������ľ���
            var navH = $("#sidebar-wrapper").offset().top;
            //�������¼�
            $(window).scroll(function(){
                //��ȡ�������Ļ�������
                var scroH = $(this).scrollTop();
                //�������Ļ���������ڵ��ڶ�λԪ�ؾ�������������ľ��룬�͹̶�����֮�Ͳ��̶�
                if(scroH>=navH){
                    $("#sidebar-wrapper").css({"position":"fixed","top":0});
                }else if(scroH<navH){
                    $("#sidebar-wrapper").css({"position":"fixed","width":"19%","top":"21%"});
                }
            })
        })

  // var autoc = require('arale/autocomplete/1.2.3/autocomplete');
  // console.log(autoc);
  var contentNode=$('.document .entry-content');
        var titleNodes=contentNode.find('h2,h3');
        var sidebar=$('.threecol.meta');
        $('.sub-nav').hide();
        var htmlStr='';
        htmlStr+='<div id="sidebar-wrapper">';
        htmlStr+='<div id="sidebar-fixed-nav">';
        titleNodes.each(function(index){
            if($(this).attr('id')){
                switch(this.nodeName.toUpperCase()){
                    case 'H2':
                        if(index!==0){
                            htmlStr+='</dl>';
                        }
                        htmlStr+='<dl>';
                        htmlStr+=('<dt data-index="'+index+'"><a href="#'+$(this).attr('id')+'">' +$(this).text()+'</a></dt>');
                        break;
                    case 'H3':
                        htmlStr+=('<dd data-index="'+index+'"><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></dd>');
                        break;
                }
            }
        });
        htmlStr+='</dl>';
        htmlStr+='</div>';
        htmlStr+='</div>';
        sidebar.append(htmlStr);
        titleActive();
        $(window).on('scroll',function(){
            titleActive();
        });
        function titleActive(){
            titleNodes.each(function(index){
                if(this.getBoundingClientRect().bottom>-40 && this.getBoundingClientRect().top<window.innerHeight){
                    var curNode=sidebar.find('[data-index="'+index+'"]');
                    curNode.closest('dl').siblings('dl').removeClass('active');
                    curNode.closest('dl').addClass('active');
                    curNode.closest('dl').find('dd').removeClass('active');
                    switch(this.nodeName.toUpperCase()){
                        case 'H2':
                            curNode.closest('dl').find('dd').eq(0).addClass('active');
                            break;
                        case 'H3':
                            curNode.addClass('active');
                            break;
                    }
                    return false;
                }
            });

        }



});
