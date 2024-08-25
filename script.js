async function getClipBoardAsBin(){
    const ret = []
    const items = await navigator.clipboard.read()
    for(const item of items){
        const itemret = {}
        for(const type of item.types){
            const hexstr = await item.getType(type)
                .then(blob => blob.arrayBuffer())
                .then(ab => "0x" + ab.map(e => e.toString(16).padStart(2,"0")).join(""))
            itemret[type] = hexstr
        }
        ret.push(itemret)
    }
    return ret
}

function onclick(){
    getClipBoardAsBin()
    .then(e => document.querySelector("#result").value = JSON.stringify(e,null,"\t"))
}