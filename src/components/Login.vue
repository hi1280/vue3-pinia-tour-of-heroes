<template>
  <div id="recaptcha-container"></div>
  <form @submit.prevent="signIn">
    <div class="form-control">
      <label for="email">メールアドレス</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model.trim="password" />
    </div>
    <button>ログイン</button>
  </form>
  <div v-if="verificationId">
    <div class="form-control">
      <label for="verificationCode">認証コード</label>
      <input type="text" id="verificationCode" v-model="verificationCode" />
    </div>
    <button @click="verifyLogin">認証</button>
  </div>
</template>

<script setup lang="ts">
import {
  getAuth,
  RecaptchaVerifier,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  signInWithEmailAndPassword,
  type MultiFactorResolver,
} from 'firebase/auth';
import type { MultiFactorError } from 'firebase/auth';
import { firebaseApp } from '../main';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let verificationId = ref('');
let verificationCode = ref('');
let email = ref('');
let password = ref('');
let resolver: MultiFactorResolver;
let recaptchaVerifier: RecaptchaVerifier;

onMounted(async () => {
  const auth = getAuth(firebaseApp);
  recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
    },
    auth
  );
  await recaptchaVerifier.render();
});

async function signIn() {
  const auth = getAuth(firebaseApp);
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (error: any) {
    if (error.code == 'auth/multi-factor-auth-required') {
      resolver = getMultiFactorResolver(auth, error as MultiFactorError);
      const phoneInfoOptions = {
        multiFactorHint: resolver.hints[0],
        session: resolver.session,
      };
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      verificationId.value = await phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        recaptchaVerifier
      );
    }
  }
}

async function verifyLogin() {
  const cred = PhoneAuthProvider.credential(
    verificationId.value,
    verificationCode.value
  );
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
  await resolver.resolveSignIn(multiFactorAssertion);
  router.push('/dashboard');
}
</script>
