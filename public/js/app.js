const form = document.querySelector('form')
const search = document.querySelector('input')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const paraOne = document.querySelector('#msg_1')
    const paraTwo = document.querySelector('#msg_2')
    paraOne.textContent = 'Loading...'
    paraTwo.textContent = ''    
    fetch(`/weather?address=${search.value}`).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch the forecast!')
        }
    }).then((data) => {
        if (data.error) {
            paraOne.textContent = data.error
        } else {
            paraOne.textContent = `${data.location}`
            paraTwo.textContent = `${data.forecast}`
        }
    })
})