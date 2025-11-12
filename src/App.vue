<template>
  <div id="app">
    <div v-if="isAuthPage">
      <router-view />
    </div>
    <a-layout
      v-else
      class="app-shell h-100vh flex flex-row"
      style="position: relative; z-index: 1;"
    >
      <LeftLayout v-if="!isMobile" class="flex-0 h-100vh" />
      <a-drawer
        v-else
        placement="left"
        :open="showSidebar"
        :width="320"
        @close="showSidebar = false"
        class="mobile-sider"
      >
        <LeftLayout />
      </a-drawer>
      <a-layout class="flex-1 h-100vh overflow-y-auto main-content">
        <HeaderMenu
          :show-menu-toggle="isMobile"
          @toggle-sidebar="showSidebar = true"
        />
        <a-layout-content class="w-100 min-w-100 max-w-fit p-5 content-wrapper">
          <div class="page-shell">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { reactive, provide, onMounted, computed, ref, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import LeftLayout from "./components/LeftLayout.vue";
import HeaderMenu from "./components/HeaderMenu.vue";

const route = useRoute();
const isAuthPage = computed(() => route.path.startsWith("/auth"));

// language state
const state = reactive({
  currentLang: "en",
  translations: {},
});

const isMobile = ref(false);
const showSidebar = ref(false);

async function loadLanguage(lang) {
  try {
    const langmodule = await import(`@/lang/${lang}.js`);
    state.translations = langmodule.default;
  } catch (e) {
    console.error(`Failed to load language ${lang}`, e);
  }
}

provide("langState", state);

const updateViewport = () => {
  isMobile.value = window.innerWidth <= 992;
  if (!isMobile.value) {
    showSidebar.value = false;
  }
};

onMounted(() => {
  loadLanguage(state.currentLang);
  updateViewport();
  window.addEventListener("resize", updateViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewport);
});

watch(
  () => route.path,
  () => {
    showSidebar.value = false;
  }
);
</script>
