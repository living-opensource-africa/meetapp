<template>
  <div id="app">
    <div id="nav">
      <div class="top-bar shadow-lg p-3 mb-5 bg-white rounded">
        <span class="app-name">
          <span class="text-los">  Living Open Source Africa </span>| meetapp
        </span>
        <span class="float-right">
          <router-link
          to="/">Home</router-link> &nbsp;

          <router-link
          v-if="auth == false"
          to="/login">Login</router-link> &nbsp;

          <router-link
          v-if="auth == false"
          to="/register">Register</router-link> &nbsp;

          <router-link
          to="/about">About</router-link> &nbsp;
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
      auth: ''
    }
  },
  mounted () {
    if (localStorage.getItem('jwt') !== null) {
      this.auth = true
    } else {
      this.auth = false
    }
  }
}
</script>
<style>
.text-los {
  color:#f18840;
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
