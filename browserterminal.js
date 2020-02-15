class Terminal extends Window{
    terminalDisplay = ""
    input = ""
    ps1 = "$ "

    static create(id){
        let terminal
        let window = Window.create(id)
        window.setContents("<p></p>")
        window.element.classList.add("terminal")
        terminal = new Terminal(window)
        terminal.element = window.element
        terminal.id = window.id
        Terminal.list[Terminal.list.length] = terminal
        terminal.element.children[1].children[0].innerHTML = `${terminal.terminalDisplay}${terminal.ps1}${terminal.input}`
        return terminal
    }

    static get(id){
        let obj
        for(let i = 0; i < Terminal.list.length; i++){
            if(Terminal.list[i].id == id){
                obj = Terminal.list[i]
                break
            }
        }
        return obj
    }
}
Terminal.list = []

document.addEventListener("keydown", function(e){
    let flag = false
    for(let i = 0; i < Terminal.list.length; i++){
        if(Terminal.list[i].id == Window.activeID){
            flag = true
            break
        }
    }
    if(flag){
        let obj = Terminal.get(Terminal.activeID)
        let str = obj.input
        if(e.key == "Backspace"){
            // document.getElementById(Terminal.activeID).getElementsByClassName("winContents")[0].innerHTML
            obj.input = `${str.slice(0, -1)}`
        }
        obj.element.children[1].children[0].innerHTML = `${obj.terminalDisplay}${obj.ps1}${obj.input}`
    }
})

document.addEventListener("keypress", function(e){
    let flag = false
    for(let i = 0; i < Terminal.list.length; i++){
        if(Terminal.list[i].id == Window.activeID){
            flag = true
            break
        }
    }
    // console.log(e)
    if(flag){
        let obj = Terminal.get(Terminal.activeID)
        let str = obj.input

        if(true){
            if(e.key == "Backspace"){
                // document.getElementById(Terminal.activeID).getElementsByClassName("winContents")[0].innerHTML
                obj.input = `${str.slice(0, -1)}`
            }else if(e.key == "Enter"){
                let output
                let skip = false
                try{
                    eval(obj.input)
                    console.log(2)
                }catch(err){
                    console.log(1)
                    skip = true
                }

                if(!skip && !obj.input == ""){
                    if(obj.input == "clear"){
                        obj.terminalDisplay = ""
                        obj.input = ""
                    }else{
                        output = String(eval(obj.input))
                    }
                }else if(obj.input == ""){
                    output = ""
                }else{
                    output = `Error: <span style="color:red;">${obj.input}</span>`
                }
                obj.terminalDisplay = obj.terminalDisplay + obj.ps1 + obj.input + "<br>" + output + "<br>"
                obj.input = ""
                // str += "<br>"
                // terminal.setContents(`<p style="margin:0;">${str}</p>`)
            }else{
                // document.getElementById(Terminal.activeID).getElementsByClassName("winContents")[0].innerHTML
                obj.input = `${str}${e.key}`
            }
        }
        obj.element.children[1].children[0].innerHTML = `${obj.terminalDisplay}${obj.ps1}${obj.input}`
    }
})

ter = Terminal.create("terminal")
ter.setTitle("Terminal")

ter2 = Terminal.create("terminal2")
ter2.setTitle("Terminal2")