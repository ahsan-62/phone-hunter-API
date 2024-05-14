


const loadPhone = async (searchText='iphone',isShowAll) => {

    const res = await fetch ( `https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone=data.data;

    // console.log(isShowAll);
    const showAll=document.getElementById('show-all');
    if(phone.length>10 ){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }

    if(isShowAll){
        displayPhone(phone);
        showAll.classList.add('hidden');

    }
    else{
        const phones=phone.slice(0,10);
        displayPhone(phones);
    }
    
}

    function displayPhone(phones){

        const phoneContainer = document.getElementById('phone-container');

        phoneContainer.innerHTML=``; //search kore na paile ba same jinish search dile jno 1tai show koree

        phones.forEach( phone => {
            const phoneDiv= document.createElement('div');
            phoneDiv.classList=`card bg-gray-100 shadow-xl`;
            phoneDiv.innerHTML=`

            <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>
            `

            phoneContainer.appendChild(phoneDiv);
        });

        loader(false);

    }



    function searchPhone(isShowAll){

        loader( true);
        const searchInput=document.getElementById('search-field');
        const searchText=searchInput.value;
        console.log(searchText);
        loadPhone(searchText,isShowAll);
    }

    function loader(isLoading){

        const spinner=document.getElementById('loader');
        if(isLoading){
            spinner.classList.remove('hidden');
           }
           else{
            spinner.classList.add('hidden');
           }
         }

         function showAllPhone(){
                
            searchPhone(true);
         }

         const showDetails= async (id)=>{

            const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
            const phoneDetails = await res.json();
           const data= phoneDetails.data;

            displayDetails(phoneDetails.data);
         }

         const displayDetails= (phoneData)=>{

            console.log(phoneData);
            details_modal.showModal();
            const modalDetails=document.getElementById('modal-details');

            modalDetails.innerHTML=`
            <h3 class="text-2xl font-bold   " >${phoneData.name}</h3>

            <img class="w-1/2" src="${phoneData.image}">

            <h2>Brand: ${phoneData.brand}</h2>
            
            <p>Release Date: ${phoneData.releaseDate?phoneData.releaseDate:'No Release Date'}</p>
            <p>Display Size: ${phoneData.mainFeatures.displaySize?phoneData.mainFeatures.displaySize:'No Display Size'}</p>
            <p>Memory: ${phoneData.mainFeatures.memory?phoneData.mainFeatures.memory:'No Memory'}</p>
            <p>Storage: ${phoneData.mainFeatures.storage?phoneData.mainFeatures.storage:'No Storage'}</p>
            <p>Sensors: ${phoneData.mainFeatures.sensors?phoneData.mainFeatures.sensors:'No Sensors'}</p>
            `
            
         }
         

         loadPhone();