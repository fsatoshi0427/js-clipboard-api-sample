async function getClipBoardAsBin(){
    const ret = []
    const items = await navigator.clipboard.read()
    for(const item of items){
        const itemret = {}
        for(const type of item.types){
            const data = await item.getType(type)
                .then(blob => blob.arrayBuffer())
                .then(ab => {
                    const hexortext = document.querySelector("#hexortext").value;
                    if(hexortext == "hex"){
                        return [...new Uint8Array(ab)].map(e => e.toString(16).padStart(2,"0")).join("")
                    }else if(hexortext == "text"){
                        return new TextDecoder().decode(ab)
                    }
                })
            itemret[type] = data
        }
        ret.push(itemret)
    }
    return ret
}

function onclickf(){
    getClipBoardAsBin()
    .then(e => document.querySelector("#result").value = JSON.stringify(e,null,"\t"))
}