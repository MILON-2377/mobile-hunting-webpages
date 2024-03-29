
const displayPhones = document.getElementById("display-phones-container");
const inputContainer = document.getElementById("input-container");
const enterDisplay = () => {
    inputContainer.addEventListener("keyup", (e) => {
        if(e.key === "Enter"){
            spinLoading(true);
            searchPhones();
        }
    })
}

enterDisplay();

const searchPhones = () => {
    spinLoading(true);
    phoneHuntingSearh()
    document.getElementById("display-phones-container").classList.remove("hidden");
}

const phoneHuntingSearh = async () => {

    const inputVal = takeValueFromInput();
    document.getElementById("input-container").value = "";
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputVal}`);
    const data = await res.json();

    const phones = data.data;
    displayPhones.textContent = "";
    console.log(phones.length);
    // if(phones.data.length < 1){
    //     const p = document.createElement("p");
    //     p.innerText =`The Data Not Fount! Try to search another keywords!!`;
    //     displayPhones.appendChild(p);
    //     spinLoading(false);
    // }
    phones.forEach( (phone) => {
        // console.log(phone);
        displayPhonesItem(phone.image, phone.phone_name, phone.slug);
        phonesDetailsData(phone.slug);
    })
   
}

const displayPhonesItem = (phoneImg, phoneName, phoneId) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
        <img src="${phoneImg}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title"> ${phoneName} </h2>
        <p> 
        There are many variations of passages of available, but the majority have suffered</p>
        <span class="text-2xl font-bold text-black">$99</span>
        <div class="card-actions">
            <button id="${phoneId}" onclick = "my_modal_5.showModal()" class="btn btn-primary text-2xl text-white">Show Details</button>
        </div>
        </div>
        </div>

    `

    displayPhones.appendChild(div);
    spinLoading(false);
}

const takeValueFromInput = () => {
    const inputValue = inputContainer.value;
    return inputValue;
}


const phonesDetailsData = async (idName) => {

    const detailsBtn = document.getElementById(`${idName}`);
    detailsBtn.addEventListener("click", (e) => {

        takePhonesDetailsData(e.target.id);
        async function takePhonesDetailsData (idName) {
            const res = await fetch(`https://openapi.programming-hero.com/api/phone/${idName}`);
            const data = await res.json();
            console.log(data)
            phonesDetailsLoad(data.data.image, data.data.name, data.data?.mainFeatures?.storage, data?.data?.mainFeatures?.displaySize,  data?.data?.mainFeatures?.chipSet, data?.data?.mainFeatures?.memory, data?.data?.slug, data?.data?.releaseDate, data?.data?.brand, data?.data?.others?.GPS  );
        }
    })
}

const phonesDetailsLoad = (phneImg, phoneTitle, phoneStro, phoneDisplay, phoneChip, phoneMem, PhoneSlug, phoneDate, phoneBrand, phoneGps) => {
    const phonesDetails = document.getElementById("phones-details-container");
    phonesDetails.innerHTML = `
            <img src="${phneImg}" alt="Shoes" class="rounded-xl mx-auto text-3xl" />
            <h2 class="card-title">${phoneTitle} </h2>
            <p><span class="text-xl text-black font-bold">Storage: </span> ${phoneStro} </p>
            <p><span class="text-xl text-black font-bold">Display Size: </span> ${phoneDisplay} </p>
            <p><span class="text-xl text-black font-bold">Chipest: </span> ${phoneChip} </p>
            <p><span class="text-xl text-black font-bold">Memory:</span> ${phoneMem} </p>
            <p><span class="text-xl text-black font-bold">Slug: </span> ${PhoneSlug} </p>
            <p><span class="text-xl text-black font-bold">Release Date: </span> ${phoneDate} </p>
            <p><span class="text-xl text-black font-bold">Brand: </span> ${phoneBrand} </p>
            <p><span class="text-xl text-black font-bold">GPS: </span> ${phoneGps} </p>
    `
    phonesDetails.appendChild(div);
}

function spinLoading (value) {
    let isDataLoading = value;
    const spinLoading = document.getElementById("spin-loading-container");
    if(isDataLoading){
        spinLoading.classList.remove("hidden");
    }else{
        spinLoading.classList.add("hidden");
    }
}

spinLoading()