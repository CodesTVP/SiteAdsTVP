const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

$('[btn-login]').click(() => {
    auth.signInWithRedirect(provider)
})

function logout() {
    $('[btn-add]').addClass('disabled').attr('disabled', '')
    firebase.auth().signOut().then(function () {
        $('[user-img]').attr('src', 'https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gP7gIEkegVFwLYWEbMP61JUwJ840YQ_FBQmEsrQaYj2yhAL-q4ddApiIhfO6r-Wt7H-yIvRT6LXBpxAitW3JUvqpOORMQ=w1366-h695')
        $('[user-name]').html('User')
        $('[user-email]').html('exmail@gmail.com')
        $('[btn-logout]').addClass('disabled').attr('disabled', '')
        $('[btn-login]').removeClass('disabled').removeAttr('disabled')
        window.localStorage.setItem('userId', 'no-id')
    }, function (error) {
        console.error('Sign Out Error', error)
    })
        .then(() => window.location.reload(true))
}

$('[btn-logout]').click(function () {
    logout()
})

firebase.auth().onAuthStateChanged(async user => {
    $('.loader-main').css('display', 'none')
    if (user) {
        $('[user-img]').attr('src', user.photoURL)
        $('[user-name]').html(user.displayName)
        $('[user-email]').html(user.email)
        $('[btn-login]').addClass('disabled').attr('disabled', '')
        $('[btn-logout]').removeClass('disabled').removeAttr('disabled')
        if (user.email === 'tvpovaoweb@gmail.com') {
            $('[btn-add]').removeClass('disabled').removeAttr('disabled')
            $('.blocked').css('display', 'none')
        } else {
            logout()
        }
        this.userId = user.uid
        window.localStorage.setItem('userId', this.userId)
    }
})