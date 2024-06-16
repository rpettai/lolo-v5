<template>
  <div v-if="isOpen" class="modal">
    <button @click="closeModal">Close</button>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
  }
};
</script>

<style scoped>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(38, 99, 117, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.modal button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.modal div {
  background-color: #ffffff;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
}

button {
  background-color: #246b72;
  color: white;
  border-radius: 8px;
  border: none;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
  font-size: 20px;

}

button text {
  color: white;

}

</style>
