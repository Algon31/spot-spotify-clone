let currentsong = new Audio();


async function get_songs() {
    let apis = await fetch('http://127.0.0.1:5500/assests/songs');
    let res = await apis.text();
    let ele = document.createElement("div"); // dreating a div for stroring the fetched 
    ele.innerHTML = res; // stroing
    let as = ele.getElementsByTagName("a"); // getting only elements with tag a coz, mp3 are there
    let sArr = []; // creating array for stroing the musics
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            let cuting = element.href.split("/songs/")[1].replaceAll("%20", " ").split(".mp3")[0]; // trimingthe un needed like .mp3 or %20 etc
            sArr.push(cuting); // putting them into array
        }
    }

    return sArr;

}
const playMusic = (x)=>{

    currentsong.src = "/assests/songs/"+ x; // setting the song as current song
    if(currentsong.paused){
        currentsong.play();
        play.src = "/assests/svgs/pause.svg";

    }
    else{
        currentsong.pause();
        play.src= "/assests/svgs/play.svg";
    }
    
}
async function main() {

    let songs = await get_songs();// waiting till the songs are fetched
    // console.log(songs);
    let sul = document.querySelector(".songlist").getElementsByTagName("ul")[0]; // setting to location of songs to be put

    currentsong.src = "/assests/songs/"+songs[0].toLowerCase()+".mp3";
    
    for (const song of songs) { // itreating the songs to get each song

        sul.innerHTML = sul.innerHTML + `<li class="flexy flexy-a" >
                        <img width="50px" src="/assests/imgs/${song.split(" - ")[0].toLowerCase()}.jpeg" alt="mp3">
                        <div class="name flexy flexy-dc">
                            <span class="songName">${song.split(" - ")[0]} </span>
                            <span class="artiyName">${song.split("-")[1]} </span>
                        </div>
                    </li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{ // addding event listener to pressing on song

        e.addEventListener("click",element=>{
            let tracky = e.querySelector(".name").getElementsByTagName("span")[0].innerHTML.trim()+" - "+e.querySelector(".name").getElementsByTagName("span")[1].innerHTML.trim(); // making sure that the song is named properly before searching
            // console.log(tracky.trim()+".mp3");
            playMusic(tracky.trim()+".mp3"); // uploding the song with .mp for searching purpuse
            let cplaying = document.createElement("div");
            cplaying.setAttribute("class","cName");
            let cplaying2 = document.createElement("div");
            cplaying2.setAttribute("class","time")
            cplaying.innerHTML = `${tracky.split(" - ")[0]} - ${tracky.split("- ")[1]}`;
            let sName = document.querySelector(".imgs");

            cplaying2.innerHTML = `
            00:00/00:00
            `;
            document.querySelectorAll(".cName, .time").forEach(el => el.remove());
            sName.before(cplaying)
            sName.after(cplaying2)
            document.getElementById("imgs").setAttribute("flexy-sb");
        })
    })

    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play();
            play.src = "/assests/svgs/pause.svg";

        }
        else{
            currentsong.pause();
            play.src= "/assests/svgs/play.svg";
        }
    })



    // this for playing songs
    // let audio = new Audio(songs[0]);
    // audio.play();
}
main();