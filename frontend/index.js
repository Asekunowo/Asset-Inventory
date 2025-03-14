
const url = 'http://localhost:3000/api/'


const dashboard = document.getElementById('_dashboard')
const assets = document.getElementById('asset')
const repairs = document.getElementById('repair')
const users = document.getElementById('user')
const settings = document.getElementById('setting')

dashboard.addEventListener('click', () => showSection('dashboard'))
assets.addEventListener('click', () => showSection('assets'))
repairs.addEventListener('click', () => showSection('repairs'))
users.addEventListener('click', () => showSection('users'))
settings.addEventListener('click', () =>{showSection('settings')})

const assetNo = document.getElementById('total-assets')
const getNumber =  async () => {
      const res = await fetch(`http://localhost:3000/api/assets/get`)
      const data = await res.json()
      return data.data.length
}
assetNo.textContent = await getNumber()


//do you want to make this a link instead? It would help with the sidebar nav links
//show section function
async function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    if(section === 'assets'){
        await fetchAssets(`assets/get`, 'assetTable')
    } else if (section ==='users'){
        fetchUsers('user', 'userTable')
    } else if(section === 'repairs'){
     
    }
    
}


//stores data held
var datastore

const edit_form = document.getElementById('edit_form')
edit_form.addEventListener('submit', saveData)

async function saveData(e){
    e.preventDefault()
    
    const formdata = new FormData(edit_form)
    const editFormData = Object.fromEntries(formdata)

    const res = await fetch(`${url}asset/edit/:id`, 
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
    });
    const data = await res.json()
}

//fetch assets function
async function fetchAssets(endpoint, tableId) {
    try {
        const tableBody = document.getElementById(tableId);

        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
        const data = await response.json();

        tableBody.classList.remove('spinner')
        datastore = data.data
        tableBody.innerHTML = '';
        
        //counter for Serial number
        let count = 1

        data.data.forEach((item) => {
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            const td5 = document.createElement('td')
            const td6 = document.createElement('td')
            const td7 = document.createElement('td')
            const td8 = document.createElement('td')
            const td9 = document.createElement('td')
            const edit_btn = document.createElement('button')
            const delete_btn = document.createElement('button')

            edit_btn.classList.add('editbtn')
            delete_btn.classList.add('deletebtn')
          
            td1.innerText = count++
            td2.innerText = item.asset_name
            td3.innerText = item.asset_brand
            td4.innerText = item.asset_serial_no
            td5.innerText = item.asset_tag
            td6.innerText = item.asset_status
            td7.innerText = item.asset_location
            td8.innerText = item.asset_custodian
            td9.innerText = item.asset_vendor
            tr.setAttribute('data-key', item._id)
            edit_btn.innerText = 'Edit'
            delete_btn.innerText = 'Delete'



            delete_btn.addEventListener('click', () => handleDelete(item))
            edit_btn.addEventListener('click', () => handleEdit(item))


            
            tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9)
            tr.append(edit_btn, delete_btn)

            tableBody.appendChild(tr)
            
        }); 
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
    }
    // const edit_btn = document.getElementById("edit_btn")
    // edit_btn.addEventListener('click', () => {
    //     console.log(edit_btn.value)
    // })
}


const handleDelete = async (params) => {
      
const deleteConfirm = confirm(`Are you sure you want to delete this asset?`)
const id = params._id
    
    
    const deleteAsset = async (id) => {
     
        try {
            const res = await fetch(`http://localhost:3000/api/assets/del/${id}`, 
                {
                    method: "delete"
                }
            )
            const data = await res.json()
            console.log(data)
            return data
    
        } catch (error) {
    
        }
    }

    if(deleteConfirm){
     await deleteAsset(id)
     window.location.reload()
    }


}


const handleEdit = async (params) => {

    const response = await fetch(`${url}assets/get`);
    const data = await response.json();
   
    data.data.map(data => {
        if(params._id === data._id){
            const name = document.getElementById('e_asset_name')
            const brand = document.getElementById('e_asset_brand')
            const status = document.getElementById('e_asset_status')
            name.value = data.asset_name 
            brand.value = data.asset_brand
            status.value = data.asset_status 
        }
    })




    const editsubmit = document.getElementById("edit_submit")
    editsubmit.addEventListener("click", () => {

        const editform = document.getElementById('edit_form')
    
        const formdata = new FormData(editform)
        const editData = Object.fromEntries(formdata)
        console.log(editData)
        
        const confirmEdit = confirm("Are you sure? (These changes cannot be reversed) ")
        
        const edit = async (e_id, e_data) => {
            const res = await fetch(`http://localhost:3000/api/assets/edit/${e_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({e_data})
        })
            const data = await res.json()
            // window.location.reload()
        }
    
        if(confirmEdit){
            edit(params._id, editData)
        }
    })


    
}








//fetch users function
async function fetchUsers(endpoint, tableId) {

    try {
        const response = await fetch(`${url}users/get`);
        const data = await response.json();
        datastore = data.data
        const tableBody = document.getElementById(tableId);
        tableBody.innerHTML = '';
        
        //counter for Serial number
        let count = 1

        data.data.forEach(item => {
            let row = `
            <tr>
                <td>${count++}</td>
                <td>${item.name}</td>
                <td>${item.role}</td>
            </tr>`
            tableBody.innerHTML += row;
            
        }); 

    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
    }
}


const newasset = document.getElementById('newasset')
newasset.addEventListener('submit', (e) => {
    e.preventDefault()
    addNew()
})

async function addNew() {

    const formdata = new FormData(newasset)
    const newAssetData = Object.fromEntries(formdata)

    console.log(newAssetData)
    const res = await fetch(`http://localhost:3000/api/assets/new`, {
        method: "POST",
        headers: {"Content-Type" : 'application/json'},
        body: JSON.stringify(newAssetData)
    })
    const data = await res.json()
return data



}
