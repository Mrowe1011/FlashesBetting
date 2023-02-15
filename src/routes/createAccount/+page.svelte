<script>
    import {app} from '../stores/firebaseConfig';
    import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
    import { getDatabase, ref, set } from "firebase/database";
    import { doc, setDoc, getFirestore } from "firebase/firestore"; 

    const auth = getAuth(app);
    let email = ""
    let password = ""
    let password2 = ""
    let Fname = ""
    let points = 100
    let picture = Math.floor(Math.random() * 5);
    const db = getFirestore(app);
    async function onSubmit(){
        createUserWithEmailAndPassword(auth, email, password).catch((error) => {alert(error)})
        console.log(db)
        await setDoc(doc(db, "users", email), {
          name: Fname,
          email: email,
          points: points,
          picture: picture
        });

        alert("User "+email+" created!")
        location.href = '/'
     }
</script>




<h1>Let's get to know each other!</h1>
<form on:submit|preventDefault={onSubmit}>
  <div>
    <label for="name">Username</label>
    <input bind:value={Fname}
      type="text"
      id="name"
      name="name"
    />
</div>
    <div>
        <label for="name">Email</label>
        <input bind:value={email}
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
      <div>
      <label for="name">Retype Password</label>
      <input bind:value={password2}
        type="password"
        id="password2"
        name="password2"
      />
    </div>
  </div>
    {#if password != ""}
    {#if password2 === password}
    {#if password === password2}
    <button type="submit">Submit</button>
    {:else}
    <br>
    {/if}

  {:else}
  <p>Passwords do not match!</p>
  {/if}
  {:else}
  <p></p>
  {/if}
  </form>