export default {
  data () {
    return {
      userData: [
        {
          username: '王小虎',
          email: '20160502@qq.com',
          mobile: '1231231231'
        }
      ],
      total: 0,
      value: true,
      pagenum: 1,
      searchText: '',
      dialogAddUserVisible: false,
      dialogEditUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度3到5之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度6到10之间', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: '正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      editUserForm: {
        id: 0,
        username: 'zs',
        email: '5444',
        mobile: '123456'
      }
    }
  },
  created () {
    this.loadUsersData(this.pagenum)
  },
  methods: {
    async loadUsersData (pagenum = '1', query = '') {
      let url = 'users'
      let options = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get(url, options)

      this.userData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
      // axios
      //   .get('http://localhost:8888/api/private/v1/users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     },
      //     headers: {
      //       Authorization: localStorage.getItem('token')
      //     }
      //   })
      //   .then(res => {
      //     console.log(res)
      //     this.userData = res.data.data.users
      //     this.total = res.data.data.total
      //     this.pagenum = res.data.data.pagenum
      //   })
    },
    currentPage (curPage) {
      this.loadUsersData(curPage, this.searchText)
    },
    startQuery () {
      this.loadUsersData(this.pagenum, this.searchText)
    },
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.dialogAddUserVisible = false
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 800
        })
        this.loadUsersData()
      } else {
        this.$message({
          message: '添加失败',
          type: 'error',
          duration: 800
        })
      }
    },
    dialogClosed () {
      // console.log('对话框关闭了')
      this.$refs.addUserRef.resetFields()
    },
    async delUser (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.$axios.delete(`users/${id}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
          this.loadUsersData()
        }
      } catch (err) {
        this.$message({
          message: '取消删除',
          type: 'error',
          duration: 800
        })
      }
    },
    async stateChanged (row) {
      const { id, mg_state: mgState } = row
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '状态修改成功',
          type: 'success',
          duration: 800
        })
      }
    },
    showEditUserForm (row) {
      const { id, username, mobile, email } = row
      this.editUserForm.id = id
      this.editUserForm.username = username
      this.editUserForm.mobile = mobile
      this.editUserForm.email = email
      this.dialogEditUserVisible = true
    },
    async editUser () {
      const { id, email, mobile } = this.editUserForm
      console.log(id, email, mobile)
      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })
      if (res.data.data.status === 200) {
        this.dialogEditUserVisible = false
        this.$message({
          message: '更新用户成功',
          type: 'success',
          duration: 800
        })
        this.loadUsersData(this.pagenum)
      }
    }
  }
}
