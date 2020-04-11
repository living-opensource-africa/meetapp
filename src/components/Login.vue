<template>
  <div class="container">
      <div class="col-md-12 row">
        <h4> Login </h4>
      </div>
      <div class="col-md-12 row">
        <form>
            <div class="form-group">
              <label for="email" >E-Mail Address</label>
              <div>
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  required
                  class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label for="password" >Password</label>
              <div>
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  required
                  class="form-control">
              </div>
            </div>
            <div class="form-group">
              <i> {{ err }} </i>
            </div>
            <div>
                <button
                type="submit"
                @click="handleSubmit"
                class="btn btn-los">
                    Login
                </button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      err: ''
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      if (this.password.length > 0) {
        this.$http.post(process.env.VUE_APP_LOGIN, {
          email: this.email,
          password: this.password
        }, options)
          .then(response => {
            const isAdmin = response.data.user.is_admin
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
                window.location.reload()
              } else {
                if (isAdmin === 1) {
                  this.$router.push('admin')
                  window.location.reload()
                } else {
                  this.$router.push('home')
                  window.location.reload()
                }
              }
            }
          })
          .catch(error => {
            alert('Wrong username/password')
            console.log(error)
          })
      }
    }
  }
}
</script>
