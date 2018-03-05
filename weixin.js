//微信单页面应用SPA更换title //window.onhashchange 
function changeTitle(title){
    let body = document.body    
    let iframe = document.createElement('iframe')
    
    document.title = title
    iframe.setAttribute('src', '/favicon.ico')

    iframe.addEventListener('load', () => {
        setTimeout(() => {
            iframe.removeEventListener('load')
            body.removeChild(iframe)
        }, 0)
    })
    body.appendChild(iframe)
}

