<template>
  <div class="login-container">
    <div class="logo">
      <Logo />
    </div>
    <div class="input-container">
      <div class="input-item">
        <NInput placeholder="Plase Input Username" size="large" maxlength="20" style="--text-color:#fff;--caret-color:#fff;" v-model:value="loginInfos.userName" @input="handlerInput($event, 'userName')">
          <template #prefix>
            <n-icon class="icon-container" size="20">
              <Person class="icon" />
            </n-icon>
          </template>
        </NInput>
      </div>
      
      <div class="input-item">
        <NInput placeholder="Plase Input Password" size="large" type="password" show-password-on="click" maxlength="18" style="--text-color:#fff;--caret-color:#fff;" v-model:value="loginInfos.password">
          <template #prefix>
            <n-icon class="icon-container" size="20">
              <Key class="icon" />
            </n-icon>
          </template>
        </NInput>
      </div>

      <div class="btn-container">
        <n-button strong type="info" :block="true" @click="login">Login</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { NInput, NButton, NIcon } from 'naive-ui'
import { PersonOutline as Person, KeyOutline as Key, LogoGithub as Logo } from '@vicons/ionicons5'

const router = useRouter()

const loginInfos = reactive({
  userName: '',
  password: ''
})
const errorToast = {
  userName: '请输入用户名',
  password: '请输入密码'
}

const handlerInput = (val, type) => {
  const temVal = val.replace(/[\s\n\r\t]/g, '')
  loginInfos[type] = temVal
}

const checkUserName = userName => {
  if (!userName) {
    return false
  }
  return true
}
const checkPassword = password => {
  if (!password) {
    return false
  }
  return true
}
const checkInfos = infos => {
  if (!checkUserName(infos.userName)) return false
  if (!checkPassword(infos.password)) return false
}
const login = () => {
  if (!checkInfos(loginInfos)) {
    return
  }
  router.replace('/')
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  height: 100vh;
  background: url('../assets/img/login_bg.jpg') no-repeat center center;
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
  }
}

</style>