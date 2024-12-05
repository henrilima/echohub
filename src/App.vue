<template>
    <router-view />
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
    name: "App",
};

AOS.init();
</script>