document.querySelector('#search-anunciantes').onkeyup = e => {
    if (e.target.value.length > 0) {
        const anunciantes = document.querySelectorAll('ul li .data-ad p[data-name]')
        anunciantes.forEach(function (anun) {
            const valueInput = e.target.value
            console.log(valueInput.length)
            let dataAd = ''
            if (anun.getAttribute('data-name').toLocaleLowerCase().indexOf(valueInput) === -1) {
                dataAd = anun.parentNode
                console.log(dataAd.parentNode)
                dataAd.parentNode.style.display = 'none'
            } else if (anun.getAttribute('data-name').toLocaleLowerCase().indexOf(valueInput) === 1) {
                dataAd = anun.parentNode
                console.log(dataAd.parentNode)
                dataAd.parentNode.style.display = 'block'
            }
            if (valueInput.length === 1) {
                dataAd = anun.parentNode
                console.log(dataAd.parentNode)
                dataAd.parentNode.style.display = 'block'
            }
        })
    }
}

$('#search-anunciantes').onsubmit = e => {
    e.preventDefault()
}