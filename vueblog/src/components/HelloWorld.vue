<template>
  <div class="hello">
    <label>user</label>
    <input type='text' class='user' placeholder='请输入用户名' v-model='username'>
    <label>手机号</label>
    <input type = 'text' class='phone' placeholder='请输入手机号' v-model='phone'>
    <label>邮箱</label>
    <input type='text' class='email' placeholder='请输入邮箱' v-model='email'>
    <label>密码</label>
    <input type='text' class='password' placeholder='请输入密码' v-model='password'>
    <button type='button' @click='reg'>注册</button>
    <br>
    <label>手机号</label>
    <input type = 'text' class='phone' placeholder='请输入手机号' v-model='loginphone'>
    <label>密码</label>
    <input type='text' class='password' placeholder='请输入密码' v-model='loginpassword'>
    <button type='button' @click='login'>login</button>
    <br>
    <br>
    <button type='button' @click='queryall'>查询</button>
    <br>
    <br>
    <label>标题</label>
    <input type='text' placeholder='标题' v-model='title'>
    <label>内容</label>
    <input type='text' placeholder='文章内容' v-model='des'>
    <button type='button' @click='publishArticle'>发表</button>
    <br>
    <br>
    <button type='button' @click='queryArticle'>查询文章</button>
    <button type='button' @click='deleteArticle'>删除文章</button>
    <button type='button' @click='updateArticle'>更新文章</button>
    <br>
    <br>
    <textarea id='content' @keyup='changemark'></textarea>
    <div id='respond'></div>
  </div>
</template>
<script>
import marked from 'marked'
import hjs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      username: '',
      phone: '',
      email: '',
      password: '',
      loginphone: '',
      loginpassword: '',
      title: '',
      des: ''
    }
  },
  methods: {
    reg () {
      let data = {
        name: this.username,
        phone: this.phone,
        email: this.email,
        password: this.password
      }
      this.axios.post('http://localhost:3000/users/reg', data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    login () {
      let data = {
        phone: this.loginphone,
        password: this.loginpassword
      }
      this.axios.post('http://localhost:3000/users/login', data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    queryall () {
      this.axios.get('http://localhost:3000/users/alluser')
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    publishArticle () {
      let data = {
        name: 'xiaobai',
        article: this.title,
        des: this.des
      }
      this.axios.post('http://localhost:3000/userdetail/title', data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    queryArticle () {
      let data = {
        params: {
          name: 'xiaobai'
        }
      }
      this.axios.get('http://localhost:3000/userdetail/info', data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteArticle () {
      let data = {
        params: {
          name: 'xiaobai'
        }
      }
      this.axios.get('http://localhost:3000/userdetail/delete', data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateArticle () {
      let data = {
        params: {
          article: '天天向上',
          des: '小白的一天',
          name: 'xiaobai'
        }
      }
      this.axios.get('http://localhost:3000/userdetail/update', data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changemark () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hjs.highlightAuto(code).value
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false

      })
      document.getElementById('respond').innerHTML = marked(document.getElementById('content').value)
      $('pre').addClass('hljs');
    }
  }
}
</script>
<style>
  #respond{
    width:300px;
    height:300px;
    font-size:15px;
  }
</style>
