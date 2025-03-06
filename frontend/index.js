const dashboard = document.getElementById('_dashboard')
const assets = document.getElementById('asset')
const repairs = document.getElementById('repair')
const users = document.getElementById('user')
const settings = document.getElementById('setting')

dashboard.addEventListener('click', () => showSection(dashboard.id))
assets.addEventListener('click', () => showSection('assets'))
repairs.addEventListener('click', () => showSection('repairs'))
users.addEventListener('click', () => showSection('users'))
settings.addEventListener('click', () =>{
    
    // document.getElementById('spin').classList.add('show')

    // const timeout = setTimeout(() => {
    // },100)
    
    // return () => clearInterval(timeout)
    
    showSection('settings')

})


//do you want to make this a link instead? It would help with the sidebar nav links
//show section function
async function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    if(section === 'assets'){
        await fetchAssets(`assets/get`, 'assetTable')
    } else if (section ==='users'){
        fetchUsers('customers/get', 'userTable')
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

    const res = await fetch(`http://localhost:3000/api/asset/edit/:id`, 
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
        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
        const data = await response.json();
        datastore = data.data
        const tableBody = document.getElementById(tableId);
        tableBody.innerHTML = '';
        console.log(datastore)
        
        //counter for Serial number
        let count = 1

        data.data.forEach(item => {
            let row = `
            <tr>
                <td>${count++}</td>
                <td>${item.asset_name}</td>
                <td>${item.asset_brand}</td>
                <td>${item.asset_serial_no}</td>
                <td>${item.asset_tag}</td>
                <td>${item.asset_status}</td>
                <td>${item.asset_location}</td>
                <td>${item.asset_custodian}</td>
                <td>${item.vendor}</td>
                <td>
                    <button class='editbtn' onclick="editItem('${endpoint}/edit', ${item.asset_id})">Edit</button>
                    <button class='deletebtn' onclick="deleteItem('${endpoint}', ${item.asset_id})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
            
        }); 
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
    }
}

//fetch users function
async function fetchUsers(endpoint, tableId) {

    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
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
                <td>${item.cust_name}</td>
                <td>${item.cust_phone}</td>
                <td>${item.cust_email}</td>
            </tr>`;
            tableBody.innerHTML += row;
            
        }); 

    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
    }
}

function editItem(endpoint, id) {

    document.getElementById(edit_form).classList.add('showedit')
   
    datastore.map(data => {
        if(id === data.asset_id){
            const name = document.getElementById('asset_name')
            const brand = document.getElementById('asset_brand')
            const status = document.getElementById('asset_status')
            name.value = data.asset_name 
            brand.value = data.asset_name 
            status.value = data.asset_name 
        }
    })

    const edit = async () => {
        const res = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({newValue})
    })
        const data = await res.json()
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
    // const res = await fetch(`http://localhost:3000/api/asset/new`, {
    //     method: "POST",
    //     headers: {"Content-Type" : 'application/json'},
    //     body: JSON.stringify(newAssetData)
    // })
    const data = await res.json()




}


function deleteItem(endpoint, id) {
    fetch(`http://localhost:5000/api/${endpoint}/${id}`, { method: 'DELETE' })
        .then(() => fetchData(endpoint, `${endpoint}Table`));
}

fetchData('assets', 'assetTable');
fetchData('repairs', 'repairTable');
fetchData('users', 'userTable');
