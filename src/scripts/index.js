document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const insEnterKeyPress = key === 13

    if (insEnterKeyPress) {
        getUserProfile(userName)
    }
})

async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await response.json()
}

function getUserProfile(userName) {
    
    
    
    user(userName).then(userData => {
        let userInfo = `<img src="${userData.avatar_url}" alt="Foto de perfil">
        <div>
        <h1>${userData.name ?? 'Esse usuário não possui nome!'}</h1>
        <p>${userData.bio ?? 'Esse usuário não possui biografia'}</p>
        </div>`
        
        document.querySelector('.profile-data').innerHTML = userInfo
        
        getUserRepositories(userName)
    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href=" ${repo.html_url}"target="_blank">${repo.name}</a></li>`
        });
        
        document.querySelector('.profile-data').innerHTML += `
                                                                <div class="repositories section">
                                                                    <h2>Repositórios</h2>
                                                                    <ul>${repositoriesItens}</ul>
                                                                </div>`

    })

}


//nome alterado do projeto

