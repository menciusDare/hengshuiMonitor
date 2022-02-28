<template>
    <!-- 左侧 -->
    <div class="sidebar">
        <ul class="sidebar-menu" v-html="addHtml"></ul>
    </div>
</template>

<script>
    export default {
        name: "AmfNavHtml",
        data() {
            return {
                menuData: [],
                entType:null,
                addHtml:'',
                typeName:'',
                username: sessionStorage.getItem('username')
            }
        },
        mounted() {
            this.query();
        },

        methods: {
            query(){
                var that = this;
                var url = '/api/permissions/sysMenu/queryMenuByRoleIdList';
                //var url = '/api2/sysMenu/queryMenuByRoleIdList';
                that.$axios.get(url,{
                }).then(function (res) {
                    if(res.code == 0){
                        that.menuData = res.data;
                        that.$store.commit('getMenuList', res.data)
                        if(res.data!=null){
                            that.addHtml = "";
                            var html = "";
                            for(var i = 0;i < res.data.length; i++){
                                var obj = res.data[i];
                                if(i == 0){
                                    if(null != obj.path && obj.path != ''){
                                        html = html +"<li class=\"menu-item active\"  onclick =\"returnAddress('"+obj.path+"')\">";
                                    }else{
                                        html = html +"<li class=\"menu-item active\">";
                                    }
                                }else{
                                    if(null != obj.path && obj.path != ''){
                                        html = html +"<li class=\"menu-item\"  onclick = \"returnAddress('"+obj.path+"')\">";
                                    }else{
                                        html = html +"<li class=\"menu-item\">";
                                    }
                                }

                                html = html +"<a href=\"#\"><i class=\""+obj.icon+"\"></i><span class=\"menu-txt\">"+obj.name+"</span>";
                                if(null != obj.children && obj.children.length>0){
                                    html = html +"<i class=\"icon icon-down menu-toggle\"></i></a><ul class=\"menu-child\">";
                                    for(var j = 0 ; j < obj.children.length ; j++){
                                        html = html + "<li onclick = \"returnAddress('"+obj.children[j].path+"')\"><a href=\"#\"><span class=\"menu-txt\">"+obj.children[j].name+"</span></a></li>";
                                    }
                                    html = html +" </ul>";
                                }else{
                                    html = html + "</a>";
                                }
                                html =   html+"</li>";
                            }
                            that.addHtml = html;

                            var oJs = document.createElement('script');
                            oJs.setAttribute("type", "text/javascript");
                            oJs.setAttribute("src", "static/css/js/sidebar.js"); //文件的地址 ,可为绝对及相对路径
                            document.getElementsByTagName("head")[0].appendChild(oJs); //绑定*/
                        }
                    }else{
                        that.$message.error("查询失败!")
                    }
                }).catch(function (err) {
                    // console.log(err);
                    that.$message.error("查询失败!")
                })
            },
            jumpAddress (adress){
                if(null!=adress && adress!=""){
                   this.$router.push('/'+adress);
                }
            }
        },
    }
</script>

<style>
.sidebar{
    overflow: scroll;
}
</style>
