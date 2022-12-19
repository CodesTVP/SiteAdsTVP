function changeFormData(docId, action, textAction) {
    $('#form').attr('docId', docId)
    $('#form').attr('action', action)
    $('#form > h2').html(textAction)
    $('#form > button').html(textAction)
}

function displayData(data) {
    $('ul').empty()
    if (data.docs.length === 0) {
        $('ul').append(`<li class="mt-5 text-center">
                <h2>Nenhum anunciante encontrado</h2>
            </li>`)
    } else {
        data.docs.map(user => {
            listIds.push(user.data().name)
            $('ul').append(`<li class="mt-4 p-3 bg-black rounded-2 position-relative">
                    <div class="button-actions position-absolute end-0 top-0 m-3">
                        <button edite="${adaptName(user.data().name)}" class="btn-delete btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                             Editar
                        </button>
                        <button remove="${adaptName(user.data().name)}" class="btn-edite btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                             Excluir
                        </button>
                    </div>
                    <div class="data-ad">
                        <h3>Dados:</h3>
                        <p data-name="${user.data().name}" class="m-0"><strong>Nome do anunciante</strong>: ${user.data().name}</p>
                        <p class="m-0"><strong>Url da imagem</strong>: <a target="_blank" href="${user.data().image}">${user.data().image}</a></p>
                        <p class="m-0"><strong>URL de redirecionamento</strong>: <a target="_blank" href="${user.data().url}">${user.data().url}</a></p>
                        <p class="m-0"><strong>E-mail de contato</strong>: <a class="" href="mailto:${user.data().mail}">${user.data().mail}</a></p>
                        <p class="m-0"><strong>Data de validade do contrato</strong>: ${new Date(user.data().contractValid).toLocaleDateString()}</p>
                        <p class="m-0"><strong>Dias restantes de validade do contrato</strong>: ${Math.floor((new Date(user.data().contractValid) - new Date) / (1000 * 60 * 60 * 24))} dias</p>
                        <p class="m-0"><strong>Local de exibição</strong>: ${renameLocal(user.data().local)}</p>
                        <p class="m-0"><strong>Formato do anúncio</strong>: ${renameFormat(user.data().format)}</p>
                        <p class="m-0"><strong>Preço do contrato</strong>: ${user.data().price}</p>
                    </div>
                    <hr class="bg-white border-2 border-top border-white">
                    <div class="previa-ad d-flex flex-column justify-content-center align-items-center">
                        <h3><strong>Prévia:</strong></h3>
                        <div class="ad">
                            <a href="${user.data().url}" target="_blank">
                                <img src="${user.data().image}" alt="anuncio" width="480px" />
                            </a>
                        </div>
                    </div>
                </li>`)
        })
    }
    const allBtnsEdite = document.querySelectorAll('button[edite]')

    allBtnsEdite.forEach(btn => {
        btn.onclick = () => {
            $('#region-contact-name').css('display', 'none')
            $('button[toggle-form]').html('Fechar formulário')
            $('#form').slideDown("slow")
            $('#form').addClass('active')
            changeFormData(btn.getAttribute('edite'), 'edite', 'Editar anunciante')
        }
    })
}

function renameLocal(local) {
    switch (local) {
        case 'header':
            return 'Somente no cabeçalho'
        case 'footer':
            return 'Somente no rodapé'
        case 'main':
            return 'Somente no conteúdo principal'
        case 'header-main':
            return 'No cabeçalho e no conteúdo principal'
        case 'footer-main':
            return 'No rodapé e no conteúdo principal'
        case 'header-footer':
            return 'No cabeçalho e no rodapé'
        case 'all-locals':
            return 'Todos os lugares'
        case 'anchor':
            return 'Ancora: Fixo no topo ou no "chão"'
        default:
            return 'Erro: Local inesperado!'
    }
}

function renameFormat(format) {
    switch (format) {
        case 'vertical rectangle':
            return 'Retângulo vertical'
        case 'horizontal-rectangle':
            return 'Retângulo horizontal'
        default:
            return 'Erro: Formato inesperado!'
    }
}

if (this.userId === 'chgz4lxGrTP0lhgnIFcyu0pYTss1') {
    db.collection('anunciantes').onSnapshot(data => {
        if (auth.currentUser.uid === 'chgz4lxGrTP0lhgnIFcyu0pYTss1') {
            displayData(data)

            const btnsDelete = document.querySelectorAll('button[remove]')
            btnsDelete.forEach(func = (btn) => {
                btn.onclick = function () {
                    const confirmed = window.confirm('Tem certeza que deseja excluir este anunciante? Essa ação não é reversivel.')
                    if (confirmed) {
                        db.collection('anunciantes').doc(btn.getAttribute("remove")).delete()
                            .then(() => alert('Anunciante removido com sucesso!'))
                            .then(() => firebase.storage().ref(`${btn.getAttribute("remove")}/elemMedia`).delete())
                            .then(() => window.location.reload(true))
                            .catch(e => alert('Erro: ' + e))
                    }
                }
            })
        }
    })
}

$('main form').slideUp(0)

$('button[toggle-form]').click(() => {
    if ($('#form').hasClass('active')) {
        $('button[toggle-form]').html('Abrir formulário')
        $('#form').slideUp("slow")
        $('#form').removeClass('active')
    } else {
        $('button[toggle-form]').html('Fechar formulário')
        $('#form').slideDown("slow")
        $('#form').addClass('active')
        $('#region-contact-name').css('display', 'block')
        changeFormData('', 'add', 'Adicionar anunciante')
    }
})