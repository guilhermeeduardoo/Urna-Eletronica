let seuVoto = document.querySelector('.divisao-1-1 span')
let cargo = document.querySelector('.divisao-1-2 span')
let description = document.querySelector('.divisao-1-4')
let aviso = document.querySelector('.divisao-2')
let lateral =  document.querySelector('.divisao-1-right')
let numeros = document.querySelector('.divisao-1-3')

// Variaveis de controle de etapas, ao colocar o vetor "etapas" no local "etapaAtual": etapas[etapaAtual], ele irá retornar "vereadores"
let etapaAtual = 0
let numero = ''
let emBranco = false
let votos = []

function iniciarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHTML = ''
    numero = ''     // O numero é zerado que se inicia a função
    emBranco = false

    for(let i=0; i<etapa.numeros; i++) {
        if(i === 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>'
        }
    }

    seuVoto.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    description.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
}

function updateInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        description.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

        let fotosHTML = ''
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="divisao-1-image pequeno"><img src="Imagens/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHTML += `<div class="divisao-1-image"><img src="Imagens/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHTML
    } else {
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        description.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(num) {
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null) {
        elNumero.innerHTML = num
        numero = `${numero}${num}`

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            updateInterface()
        }
    }

}

function branco() {
    if(numero === '') {
        emBranco = true
        seuVoto.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        description.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    }
}

function corrige() {
    iniciarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if(emBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado === true) {
        etapaAtual++
        if(etapas[etapaAtual] !== undefined) {
            iniciarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--grandao pisca">FIM</div>'
            console.log(votos)
        }
    }
}

iniciarEtapa()