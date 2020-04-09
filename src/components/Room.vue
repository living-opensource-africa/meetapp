<template>
    <div id="meet">
    </div>
</template>

<script>
export default {
  name: 'RoomComponent',
  data () {
    return {
      jvb_url: process.env.VUE_APP_JVB_URL
    }
  },
  mounted () {
    const div = document.querySelector('#meet')
    window.addEventListener('resize', (evt) => {
      div.style.maxWidth = 100 + '%'
    })
  }
}
</script>
