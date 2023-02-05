<script>
    import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
    import {app} from './stores/firebaseConfig';
    const auth = getAuth(app);
    let username = ""
    let password = ""
    let currentUser
    function onSubmit(){
        signInWithEmailAndPassword(auth, username, password).catch((error) => {alert("Invalid Login: "+error)}).then(()=>{currentUser = auth.currentUser})
    }
</script>

<div class="login">
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
    </div>

    <style>
        .login {
            background-color: aqua;
        }
    </style>