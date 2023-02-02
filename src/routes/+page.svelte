<script>
    import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
    import { collection, doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; 
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
    <h1>Welcome to Flashes Betting</h1>
    <p>Sign in...</p>
    <form on:submit|preventDefault={onSubmit}>
        <div>
            <label for="name">Email</label>
            <input bind:value={username}
              type="text"
              id="email"
              name="email"
            />
        </div>
        <div>
          <label for="name">Password</label>
          <input bind:value={password}
            type="password"
            id="password"
            name="password"
          />
      </div>
        <button type="submit">Submit</button>
      </form>
      <a href="/createAccount"> Create an account!</a>

      <br>
      <br>

{/if}