<script>
    import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
    import {app} from './stores/firebaseConfig';

    const auth = getAuth(app);
    let username = ""
    let password = ""
    let currentUser
    function onSubmit(){
        console.log(username, password)
        signInWithEmailAndPassword(auth, username, password).catch((error) => {console.log("it broke :(", error)}).then(()=>{currentUser = auth.currentUser})
        console.log(auth.currentUser)
        
    }
    function signout(){
        signOut(auth).then(() => {
        currentUser = auth.currentUser
        console.log("you did it!")
        }).catch((error) => {
        console.log("it broke :(", error)
        });
        
    }

</script>


{#if currentUser}
    <p>Hi {currentUser.email}</p> <button on:click={signout}>Signout</button>
    <section>

  </section>

{:else}
    <h1>Welcome to Flashes Betting</h1>
    <p>Sign in...</p>
    <a href="/createAccount"> Create an account!</a>
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

      <br>
      <br>

{/if}