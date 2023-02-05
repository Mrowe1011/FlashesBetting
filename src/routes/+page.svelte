<script>
    import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
    import { collection, doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; 
	  import Login from './login.svelte';
    import {app} from './stores/firebaseConfig';

    const auth = getAuth(app);
    let username = ""
    let password = ""
    let currentUser
    const db = getFirestore(app);
    function onSubmit(){
        signInWithEmailAndPassword(auth, username, password).catch((error) => {alert("Invalid Login: "+error)}).then(()=>{currentUser = auth.currentUser})
    }
    function signout(){
        signOut(auth).then(() => {
        currentUser = auth.currentUser
        }).catch((error) => {
        alert(error)
        });
        
    }
    async function getPoints(){
      const docRef = doc(db, "users" , currentUser.email);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      const profile = docSnap.data()
      return profile
    }

</script>

<div class="everything">
{#if currentUser}
    
    {#await getPoints()}
      <p>Loading</p>
    {:then profile} 
      <h1>Hi {profile.name}</h1> 
      <h1>You have {profile.points} Points!</h1>
    {/await}
    <button on:click={signout}>Signout</button>
    
    <section>

  </section>

{:else}
<div class="login">
  <h1 id="welcome">Welcome</h1>
  <hr>
  <form on:submit|preventDefault={onSubmit}>
      <div>
          <label class="stuff" for="name">Email</label><br>
          <input bind:value={username}
            type="text"
            id="email"
            name="email"
            class="stuff"
          />
      </div>
      <div>
        <label class="stuff" for="name">Password</label><br>
        <input bind:value={password}
          type="password"
          id="password"
          name="password"
          class="stuff"
        />
    </div>
      <button class="stuff" id="submit" type="submit">Login</button>
    </form>
    <p style="text-align:center;">New Here?</p>
    <a href="/createAccount" id="create"> Create an account!</a>

    <br>
    <br>
  </div>
{/if}
</div>
<style>
  * {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  .everything {
    position: absolute;

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('./images/QQKIWTGKB5E2NBBZI5MB4GXEDM.jpg');
    background-size: cover;
    background-position: center;
  }
  .login {
    background-color: #001b3fe1;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-weight: lighter;
    border-radius: 4%;

    height: 30%;
    width: 20%;
    padding: 3%;
    box-shadow: 0px 0px 2em #00275ad7;
  }
 hr{
  border: 0;
  clear:both;
  display:block;
  width: 80%;               
  background-color:#000000;
  height: 1px;
 }
input {
  border-radius: 5px;
  border: 3px solid #004297d7;
  width: 100%;
  height: 30px;
  color: white;
  background-color: #324a69d7;
     
}
.stuff:focus {
     outline: none;
     border: 3px solid #5e728dd7;
}
#submit {
  margin-top: 5%;
  border-radius: 5px;
  padding: 0.5em;
  width: 102.6%;
  background-color: #324a69d7;
  color: white;
  border: 2px solid #2e5b97d7;
}

.stuff {
  margin-top: 2.5%;
}
#welcome {
  text-align: center;
  font-size: 2em;
}
label {
  margin-top: 5%;
}
#create{
  border-radius: 5px;
  text-align: center;
  color: white;
  background-color: #324a69d7;
  color: white;
  border: 2px solid #2e5b97d7;
  width: 100%;
  padding: 0.25em;
  text-decoration: none;
}
</style>