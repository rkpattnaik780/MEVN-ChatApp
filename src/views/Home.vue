<template>
  <LoginCard/>
</template>

<script>
import LoginCard from "@/components/LoginCard";

export default {
  components: {
    LoginCard
  },
  mounted() {
    console.log($cookies)
  }
};
</script>
