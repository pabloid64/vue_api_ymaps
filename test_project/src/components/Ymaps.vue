<template>

</template>

<script>


export default {
    name: 'Ymaps',
    data: () => ({
    coords: [
      54.82896654088406,
      39.831893822753904,
    ],
  }),
  methods: {
    onClick(e) {
      this.coords = e.get('coords');
    },
  }
}

</script>

<style>

</style>