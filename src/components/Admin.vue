<template>
  <div class="container">
      <h4> Welcome {{ name }} </h4>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      name: JSON.parse(localStorage.getItem('user')).name
    }
  }
}
</script>
