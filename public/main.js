const deleteBtn = document.querySelectorAll('.fa-trash')
const paidBtn = document.querySelectorAll('.markPaid')
const unpaidBtn = document.querySelectorAll('.markUnpaid')



Array.from(deleteBtn).forEach(element =>{
    element.addEventListener('click', deleteName)
})

Array.from(paidBtn).forEach(element =>{
    element.addEventListener('click', markPaid)
})

Array.from(unpaidBtn).forEach(element =>{
    element.addEventListener('click', markUnpaid)
})

async function deleteName(){
  const nameText = this.parentNode.childNodes[1].innerText
  console.log(nameText)
  try{
      const response = await fetch('/remove', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': nameText
          })
        })
      const data = await response.json()
       console.log(data)
       

  }catch(err){
      console.log(err)
  }
  window.location.reload()
}

async function markComplete(){
  console.log(this.innerText)
 
}


async function markUnpaid(){
    const nameText = this.parentNode.childNodes[1].innerText
    console.log(nameText)
    try{
        const response = await fetch('/markUnPaid', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': nameText
            })
          })
        const data = await response.json()
         console.log(data)
         

    }catch(err){
        console.log(err)
    }
    window.location.reload()
}

async function markPaid(){
    const nameText = this.parentNode.childNodes[1].innerText
    console.log(nameText)
    try{
        const response = await fetch('/markPaid', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': nameText
            })
          })
        const data = await response.json()
         console.log(data)
         

    }catch(err){
        console.log(err)
    }
     window.location.reload()
}