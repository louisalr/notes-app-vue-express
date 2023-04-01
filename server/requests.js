async function fetchTest(){
    const url = await fetch(`http://localhost:9000/notes`)
    const data = await url.json()
    console.log(data)
}

fetchTest()