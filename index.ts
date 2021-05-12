// @ts-ignore
const fetch = require('node-fetch')
http('https://cat-fact.herokuapp.com/facts').then(a=>console.log(a)).catch(e=>console.error(e))

async function http(url: string): Promise<any>{
    const res = await fetch(url);
    return await res.json()
}