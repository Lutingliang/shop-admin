<template>
<el-row type='flex' justify="center" align="middle">
  <el-col :span='8'>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="startLogin()">登录</el-button>
    <el-button type="danger" @click="resetForm()">重置</el-button>
  </el-form-item>
</el-form>
</el-col>
</el-row>

</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // 判断是否输入了内容
          {required: true, message: '请输入用户名', trigger: 'blur'},
          // 判断格式是否之正确
          {min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur'}
        ],
        password: [
          // 判断是否输入了内容
          {required: true, message: '请输入密码', trigger: 'blur'},
          // 判断格式是否之正确
          {min: 6, max: 10, message: '长度在6到10个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.loginForm.validate(async valid => {
        // if (valid) {
        //   console.log('校验成功')
        // } else {
        //   console.log('校验失败')
        // }
        if (!valid) {
          return console.log('校验失败')
        } else {
          // console.log('登录成功')
          let res = await this.$axios.post('login', this.loginForm)
          if (res.data.meta.status === 200) {
            // 把token 保存到本地
            localStorage.setItem('token', res.data.data.token)
            // console.log('登录成功')
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 800
            })
            // 跳转到home
            this.$router.push('/home')
          } else {
            // console.log('失败')
            this.$message({
              message: '用户名或密码错误',
              type: 'error',
              duration: 800
            })
          }
        //   axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
        //     console.log(res)
        //     if (res.data.meta.status === 200) {
        //       // 把token 保存到本地
        //       localStorage.setItem('token', res.data.data.token)
        //       // console.log('登录成功')
        //       this.$message({
        //         message: '登录成功',
        //         type: 'success',
        //         duration: 800
        //       })
        //       // 跳转到home
        //       this.$router.push('/home')
        //     } else {
        //       // console.log('失败')
        //       this.$message({
        //         message: '用户名或密码错误',
        //         type: 'error',
        //         duration: 800
        //       })
        //     }
        //   })
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }

}
</script>

<style>
.el-row{
  height: 100%;
  background-color: #2d434c;
}
.el-form{
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
}

</style>
