<template>
  <div class="register-container">
    <div class="logo">
      <Logo />
    </div>

    <div class="input-container">
      <div class="input-item">
        <NInput placeholder="Plase Input Username" size="large" maxlength="20" style="--text-color:#fff;--caret-color:#fff;" v-model:value="registerInfos.username" @input="handlerInput($event, 'username')">
          <template #prefix>
            <n-icon class="icon-container" size="20">
              <Person class="icon" />
            </n-icon>
          </template>
        </NInput>
      </div>
      
      <div class="input-item">
        <NInput placeholder="Plase Input Password" size="large" type="password" show-password-on="click" maxlength="18" style="--text-color:#fff;--caret-color:#fff;" v-model:value="registerInfos.password">
          <template #prefix>
            <n-icon class="icon-container" size="20">
              <Key class="icon" />
            </n-icon>
          </template>
        </NInput>
      </div>

      <div class="btn-container">
        <n-button strong type="info" :block="true" @click="register">Register</n-button>
      </div>

      <div class="other-info-container">
        <div class="reg-btn" @click="goPage('login')">去登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import customer from '../api/customer'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { NInput, NButton, NIcon, useMessage, } from 'naive-ui'
import { PersonOutline as Person, KeyOutline as Key, LogoGithub as Logo } from '@vicons/ionicons5'
import md5 from 'js-md5'

const Router = useRouter()
const Store = useStore()
const registerInfos = reactive({
  username: '',
  password: ''
})
const errorToast = {
  username: '请输入用户名',
  password: '请输入密码'
}
const Toast = useMessage()

const handlerInput = (val, type) => {
  const temVal = val.replace(/[\s\n\r\t]/g, '')
  registerInfos[type] = temVal
}

const useToastError = type => {
  Toast.error(errorToast[type], { duration: 1300})
}

const checkUsername = username => {
  if (!username) {
    useToastError('username')
    return false
  }
  return true
}
const checkPassword = password => {
  if (!password) {
    useToastError('password')
    return false
  }
  return true
}
const checkInfos = infos => {
  if (!checkUsername(infos.username)) return false
  if (!checkPassword(infos.password)) return false
  return true
}

const goPage = type => {
  const types = {
    login: '/login',
  }
  if (!type || !types[type]) return
  Router.replace(types[type])
}

const register = () => {
  if (!checkInfos(registerInfos)) {
    return
  }
  customer.register({ username: registerInfos.username, password: md5(registerInfos.password) }).then(res => {
    console.log('res', res)
    if (res.result !== 0) {
      Toast.info(res.resultMessage)
      return
    }
    Store.dispatch('setToken', res.token)
    Router.replace('/')
  })
}
</script>

<style lang="less" scoped>
.register-container {
  position: relative;
  height: 100vh;
  background: url('../assets/img/register_bg.jpg') no-repeat center center;
  background-size: cover;

  .logo {
    width: 100px;
    position: absolute;
    left: 50%;
    top: 2%;
    transform: translate(-50%, 0);
    color: #fff;
  }

  .input-container {
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    min-height: 200px;
    margin: 0 auto;

    .input-item {
      width: 100%;
      margin-bottom: 40px;

      .n-input {
        background: transparent;
      }

      .icon-container {
        color: #fff;
      }
    }

    .btn-container {
      width: 100%;
    }

    .other-info-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
      text-align: right;
      color: #fff;
      padding: 0 10px;
      font-size: 24px;
      line-height: 24px;
    }
  }
}

</style>