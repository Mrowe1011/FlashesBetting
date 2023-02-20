<script>
    import { db } from "../../stores/stores";
    import {getDocs, collection } from "firebase/firestore";

    let games = []
    async  function getdata(){

        let querySnapshot = await getDocs(collection(db, "Games"))
        querySnapshot.forEach((doc) => {
        games.push(doc.data())
        });

        return games
    }

</script>
{#await getdata() then games}
{#each games as { date, gameID , image1 , team1 , image2 , team2 , }, i}
<div id={gameID} class="container">
    <div class="games">
        <div class="teams">
            <div >
                <img src={image1} alt="">
                <h1>
                    {team1}
                </h1>
            </div>
            <hr>
            <div>
                <img src={image2} alt="">
                <h1>
                {team2}
                </h1>
            </div>
            <div class="date">
                <h1>{date}</h1>
            </div>
        </div>
    </div>
</div>
{/each}
{/await}
<style>
    .container {
        width: 80%;
        height: 20%;
        background-color: aqua;
    }
    .games {
        font-size: 1em;
    }
    .teams {
        float: left;
    }
    .date {
        float: right;
    }
</style>