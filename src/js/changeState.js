(function() {
    const changeStateButtons = document.querySelectorAll('.change-state')
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    changeStateButtons.forEach( button => {
        button.addEventListener('click', changeStateProperty)
    } )


    async function changeStateProperty(e) {

        const { propertyId: id } = e.target.dataset
        
        try {
            const url = `/properties/${id}`

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'CSRF-Token': token
                }
            })

            const { result } = await response.json()

            if(result) {
                if(e.target.classList.contains('bg-yellow-300')) {
                    e.target.classList.add('bg-green-200', 'text-green-800')
                    e.target.classList.remove('bg-yellow-300', 'text-yellow-800')
                    e.target.textContent = 'Published'
                } else {
                    e.target.classList.remove('bg-green-200', 'text-green-800')
                    e.target.classList.add('bg-yellow-300', 'text-yellow-800')
                    e.target.textContent = 'Not Published'
                }
            }
        } catch (error) {
            console.log(error)
        }
       
    }
})()