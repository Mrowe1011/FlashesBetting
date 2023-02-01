<script>
    import {app} from '../stores/firebaseConfig';
    import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
    const auth = getAuth(app);
    let username = ""
    let password = ""
    function onSubmit(){
        createUserWithEmailAndPassword(auth, username, password).catch((error) => {alert(error + "broke")})
        alert("User "+username+" created!")
        location.href = '/'
     }
</script>





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