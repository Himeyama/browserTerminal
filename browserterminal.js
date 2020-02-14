class Terminal extends Window{
    static create(id){
        let terminal
        let window = Window.create(id)
        window.setContents("<p></p>")
        window.element.classList.add("terminal")
        terminal = new Terminal(window)
        terminal.element = window.element
        terminal.id = window.id
        
        document.body.onclick = function(e){
            if(e.target.parentElement.className == "winTitle"){
                Terminal.activeID = e.target.parentElement.parentElement.id
            }else{
                Terminal.activeID = e.target.parentElement.id
            }
        }

        return terminal
    }
}

document.addEventListener("keydown", function(e){
    let str = document.getElementById(Terminal.activeID).getElementsByClassName("winContents")[0].getElementsByTagName("p")[0].innerHTML
    if(e.key == "Backspace"){
        document.getElementById(Terminal.activeID).getElementsByClassName("winContents")[0].innerHTML
        = `<p style="margin:0;">${str.slice(0, -1)}</p>`
    }else if(e.key == "Enter"){
        // str += "<br>"
        // terminal.setContents(`<p style="margin:0;">${str}</p>`)
    }else{
        document.getElementById(Terminal.activeID).getElementsByClassName("winContents")[0].innerHTML
        = `<p style="margin:0;">${str}${e.key}</p>`
    }
})

ter = Terminal.create("terminal")
ter.setTitle("Terminal")