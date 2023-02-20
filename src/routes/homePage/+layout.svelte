<script>
import { signout , auth} from '../stores/stores'
import { onAuthStateChanged } from 'firebase/auth';
let currentUser
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user
  } 
});


</script>
{#if currentUser}
<nav>
    <img id="title" alt="">
    <div class="navbar">
    <a href="/homePage/activeBets">Active Bets</a>
    <a href="/">Calendar</a>
    <a href="/">Leaderboard</a>
    <a href="/">Kent Game Schedule</a>
    </div>
    <button class="Signout" on:click={signout}>Signout</button>

</nav>

<slot>

</slot>
{:else}
<h1>You got signed out</h1>
<a href="/" style="color: black;">sign back in here</a>
{/if}

<style>
        
    #title {
    height: 90px;
    width: 150px;
    background-image: url(../images/spinning-fish.gif);
    background-size: cover;
    background-position: center;
}


.Signout {
    float: right;
    display: flex;
    align-items: center;
    
}
nav {
    position: sticky;
    top: 0px;
    display: flex;
    padding: 0.5%;
    background-color: #324a69;
}
.navbar {
  float: left;
  display: flex;
  align-items: center;
  width: 100%;
}
a {
    color: white;
    text-decoration: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.2em;
    margin-left: 6%;
}
</style>