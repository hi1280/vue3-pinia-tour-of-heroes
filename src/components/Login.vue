<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script setup lang="ts">
import firebase from 'firebase/compat/app';
import * as firebaseui from '../lib/firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../main';
import { onMounted } from 'vue';

onMounted(() => {
  const ui = new firebaseui.auth.AuthUI(getAuth(firebaseApp));
  ui.start('#firebaseui-auth-container', {
    signInSuccessUrl: '/dashboard',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  });
});
</script>
