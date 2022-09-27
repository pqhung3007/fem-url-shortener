const hamburgerBtn = document.querySelector('#menu-btn')
const menu = document.querySelector('#menu')
const form = document.querySelector('#form')
const input = document.querySelector('#input')
const inputLink = document.querySelector('#input-link')
const outputLink = document.querySelector('#output-link')
const errorMsg = document.querySelector('#error')
const shortener = document.querySelector('#shortener')
const linkRepo = []

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open')
    menu.classList.toggle('flex')
    menu.classList.toggle('hidden')
})

form.addEventListener('submit', validateForm)

function validateForm(e) {
    e.preventDefault()
    if (!input.value) {
        errorMsg.innerHTML = 'Please enter something'
        input.classList.add('border-red')
    } else if (!checkValidUrl(input.value)) {
        errorMsg.innerHTML = 'Invalid URL'
        input.classList.add('border-red')
    } else {
        shortenURL()
        errorMsg.innerHTML = ''
    }
}

function checkValidUrl(str) {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
        'i'
    )
    return pattern.test(str)
}

async function shortenURL() {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    const data = await response.json()
    getShortedLink(data.result.short_link)
}

function getShortedLink(link) {
    const linkBox = document.createElement('div')
    linkBox.classList.add('flex', 'flex-col', 'items-center', 'break-words', 'justify-between', 'w-full', 'p-4', 'bg-white', 'rounded-lg', 'md:flex-row')
    linkBox.innerHTML = `
    <p id="input-link" class="font-bold text-center break-words max-w-sm text-veryDarkViolet md:text-left">
        ${input.value}
        </p>
        <div class="flex flex-col items-center justify-center space-x-4 space-y-2 md:flex-row md:space-y-0">
          <div id="output-link" class="font-bold text-teal-400">${link}</div>
          <button class="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none" id="copy-btn">
            Copy
          </button>
        </div>
    `

    linkRepo.push(linkBox)
    console.log(linkRepo);
    shortener.appendChild(linkBox)

    // copy generated link to clipboard
    document.querySelector('#copy-btn').addEventListener('click', () => {
        navigator.clipboard.writeText(link)
        alert('Link copied to clipboard!')
    })
}

//todo Implement localStorage to save shortened links