<script>
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../stores/firebaseConfig'
let currentUser
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user

  } 
});
</script>

{#if currentUser}
<section class="background">
<div>
    <h1 style="color: white; margin:0;">Hi There {currentUser.email}</h1>
</div>
</section>
{:else}
<p></p>
{/if}



<style>
    .background {
        background-color: #000f24;
        height: 100vh;
    }

</style>