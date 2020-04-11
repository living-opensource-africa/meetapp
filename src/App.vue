<template>
  <div id="app">
    <div id="nav">
      <div class="top-bar shadow-lg p-3 mb-5 bg-white rounded">
        <span class="app-name">
          <span class="text-los" @click="home">  Living Open Source Africa </span>| meetapp
        </span>
        <span class="float-right">
          <router-link
          v-if="auth == true"
          to="/home">Home</router-link> &nbsp;

          <router-link
          v-if="auth == false"
          to="/login">Login</router-link> &nbsp;

          <router-link
          v-if="admin == true"
          to="/admin">Admin</router-link> &nbsp;

          <router-link
          v-if="auth == false"
          to="/register">Register</router-link> &nbsp;

          <router-link
          to="/about">About</router-link> &nbsp;

          <i
          v-if="auth == true"
          @click="logout"
          class="fa fa-sign-out signout">SignOut</i>
        </span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      auth: '',
      admin: '',
      isMobile: this.$isMobile()
    }
  },
  mounted () {
    if (localStorage.getItem('jwt') !== null) {
      this.auth = true
    } else {
      this.auth = false
    }

    if (JSON.parse(localStorage.getItem('user')).is_admin === 1) {
      this.admin = true
    } else {
      this.admin = false
    }
  },
  methods: {
    home (e) {
      this.$router.push('/')
    },
    logout (e) {
      e.preventDefault()
      localStorage.clear()
      this.$router.push('/')
      window.location.reload()
    }
  }
}
</script>
<style>
.text-los {
  color:#f18840;
}
.text-los:hover {
  cursor: pointer;
}
.top-bar {
  height: 80px;
  margin: auto;
}
.app-name {
  font-size: 25px;
}
a:hover {
  color: #f18840;
}
#nprogress .bar {
background: #f18840 !important;
}
</style>
