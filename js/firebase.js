function addData(name, mail, url, file, contractValid, local, price, format, showPages) {
    if (listIds.indexOf(name) !== -1) name = name + '-' + generateID(5)
    const nameId = adaptName(name)
    const storageRef = firebase.storage().ref(`${nameId}/` + 'elemMedia')
    const task = storageRef.put(file)

    $('.loading').removeClass('visually-hidden')
    $('body').addClass('ov-hide')

    task.on('state_changed',
        function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            $('#progress-load > div').attr('aria-valuenow', `${percentage}`)
            $('#progress-load > div').css('width', `${percentage}%`)
            $('span[percentage-uploader]').html(`${Math.floor(percentage)}% do arquivo carregado.`)
        },
        function error(err) {
            alert('Um erro ocorreu enquanto o elemento de mídia era carregado. Tente novamente. ' + err)
        },
        function complete() {
            complete.bind(addData)
            task.snapshot.ref.getDownloadURL().then(function (imageURL) {
                $('.loading').addClass('visually-hidden')
                db.collection('anunciantes').doc(nameId)
                    .set({ id: nameId , name, url, mail, image: imageURL, contractValid, local, price, format, showPages })
                alert('Inserido com sucesso!')
                $('body').removeClass('ov-hide')
                $('form').trigger('reset')
                $('#progress-load > div').attr('aria-valuenow', 0)
                $('#progress-load > div').css('width', '0%')
                $('span[percentage-uploader]').html('0% do arquivo carregado.')
            })
        }
    )
}

function updateData(mail, url, file, contractValid, local, price, format, showPages) {
    const storageRef = firebase.storage().ref(`${$('#form').attr('docId')}/` + 'elemMedia')
    const task = storageRef.put(file)
    console.log($('#form').attr('docId'))

    $('.loading').removeClass('visually-hidden')
    $('body').addClass('ov-hide')

    task.on('state_changed',
        function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            $('#progress-load > div').attr('aria-valuenow', `${percentage}`)
            $('#progress-load > div').css('width', `${percentage}%`)
            $('span[percentage-uploader]').html(`${Math.floor(percentage)}% do arquivo carregado.`)
        },
        function error(err) {
            alert('Um erro ocorreu enquanto o elemento de mídia era carregado. Tente novamente. ' + err)
        },
        function complete() {
            complete.bind(updateData)
            task.snapshot.ref.getDownloadURL().then(function (imageURL) {
                $('.loading').addClass('visually-hidden')
                db.collection('anunciantes').doc($('#form').attr('docId'))
                    .update({ url, mail, image: imageURL, contractValid, local, price, format, showPages })
                alert('Editado com sucesso!')
                $('body').removeClass('ov-hide')
                $('form').trigger('reset')
                $('#progress-load > div').attr('aria-valuenow', 0)
                $('#progress-load > div').css('width', '0%')
                $('span[percentage-uploader]').html('0% do arquivo carregado.')
            })
        }
    )
}

$('#form').on('submit', function (e) {
    e.preventDefault()
    const contactName = $('#contact-name').val()
    const contactMail = $('#contact-mail').val()
    const contactRedirect = $('#contact-redirect').val()
    const dateArray = $('#contact-validity').val().split('-')
    const contractValid = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).toString()
    const file = $('#contact-file').get(0).files[0]
    const local = $('#local-ad').val()
    const format = $('#format-ad').val()
    const contractPrice = $('#contract-price').val()
    const showPages = $('#show-pages').val()

    if (auth.currentUser.uid === 'chgz4lxGrTP0lhgnIFcyu0pYTss1') {
        if ($('#form').attr('action') === 'add') {
            addData(contactName, contactMail, contactRedirect, file, contractValid, local, contractPrice, format, showPages)
        }
    
        if ($('#form').attr('action') === 'edite') {
            updateData(contactMail, contactRedirect, file, contractValid, local, contractPrice, format, showPages)
        }
    }
})