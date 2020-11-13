<template>
<el-container>
  <el-header>
    <el-row>
      <el-col :span='8'>
        <img src="../../assets/logo.png" alt="">
      </el-col>
      <el-col :span='8'>
        <h1>电商后台管理系统</h1>
      </el-col>
      <el-col class="right_col" :span='8'>
        6666666
        <a href="#" @click.prevent='logout'>退出</a>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      :router='true'
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/users">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/roles">角色列表</el-menu-item>
          <el-menu-item index="/rights">权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    async logout () {
      try {
        await this.$confirm('此操作将退出该账户 , 是否继续 ', '提示', {
          confirmButton: '确定',
          cancelButton: '取消',
          type: 'warning'
        })
        // 1.清除本地的token
        localStorage.removeItem('token')
        this.$message({
          message: '退出成功',
          type: 'success',
          duration: 800
        })
        // 跳转到login
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          message: '取消退出',
          type: 'info',
          duration: 800
        })
      }
      // this.$confirm('此操作将退出该账户 , 是否继续 ', '提示', {
      //   confirmButton: '确定',
      //   cancelButton: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   // 1.清除本地的token
      //   localStorage.removeItem('token')
      //   this.$message({
      //     message: '退出成功',
      //     type: 'success',
      //     duration: 800
      //   })
      //   // 跳转到login
      //   this.$router.push('/login')
      // }).catch(() => {
      //   this.$message({
      //     message: '取消退出',
      //     type: 'info',
      //     duration: 800
      //   })
      // })
    },
    handleOpen () {
      console.log('打开了')
    },
    handleClose () {
      console.log('关闭了')
    }
  }

}
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
  min-width: 900px;
}

/* 头部 */
.el-header {
  background: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
  }
  .right_col {
    line-height: 60px;
    text-align: right;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
}

/* 侧栏 */
.el-aside {
  background: #545c64;
}

/*  主体部分 */
.el-main {
  background: #eaeef1;
}

</style>
