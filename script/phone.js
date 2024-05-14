


const loadPhone = async (searchText) => {

    const res = await fetch ( `https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone=data.data;

    const showAll=document.getElementById('show-all');
    if(phone.length>20){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    const phones=phone.slice(0,10);
    


    displayPhone(phones);
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
            <button class="btn btn-primary">Buy Now</button>
            </div>
            </div>
            `

            phoneContainer.appendChild(phoneDiv);
        });

    }



    function searchPhone(){
        const searchInput=document.getElementById('search-field');
        const searchText=searchInput.value;
        console.log(searchText);
        loadPhone(searchText);
    }