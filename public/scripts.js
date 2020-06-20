const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

const addedUrls = []

async function load() {
    const res = await fetch("http://localhost:3000").then(data => data.json())
    res.urls.map(item => addElement(item, true))
}

load()

function addElement({ name, url }, firstLoad = false) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    function visualLoad() {
        a.href = url
        a.innerHTML = name
        a.target = "_blank" // abre o link em uma nova aba

        trash.innerHTML = "x"
        trash.onclick = () => removeElement(trash, name, url)

        li.append(a)
        li.append(trash)
        ul.append(li)
    }


    if (addedUrls.findIndex(item => item == String(name)) != -1) {
        alert(`Já existe ${name} no banco de dados, tente outro nome`)
    } else {
        visualLoad()
        addedUrls.push(name)

        if (!firstLoad) {
            fetch(`http://localhost:3000/?name=${name}&url=${url}`).then(data => data.json())
        }
    }
}

function removeElement(el, name, url) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
        fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`).then(data => data.json())
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value)
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url)
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url))
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    input.value = ""
})