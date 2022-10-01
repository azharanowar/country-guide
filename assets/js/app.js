document.getElementById("mainMenuUL").addEventListener('click', (event) => {
   const activeMenu = document.querySelector("#mainMenuUL .active");
   const targetedMenu = event.target;
   if (targetedMenu.classList.contains('nav-link') && activeMenu !== targetedMenu) {
    websitePreloader(true);
       activeMenu.classList.remove('active');
       targetedMenu.classList.add('active');
       switchMainSectionByMenuId(event.target.id);
   }
});


const switchMainSectionByMenuId = (id) => {
    document.querySelector('.active-section').classList.remove('active-section');
    switch (id){
        case "countryGuideMenu":
            document.getElementById("countryGuideSection").classList.add('active-section');
            return;
        case "allCountriesMenu":
            document.getElementById("allCountriesSection").classList.add('active-section');
            return;
    }

    websitePreloader(false);
}


const websitePreloader = isActive => {
    const preloaderSection = document.getElementById("preloaderSection");
    if (isActive) {
        preloaderSection.style.display = 'block';
    } else {
        preloaderSection.style.display = 'none';
    }
}

const noDataFoundMessage = notFoundStatus => {
    const noDataFoundMessageSection = document.getElementById("noDataFoundMessageSection");
    if (notFoundStatus) {
        noDataFoundMessageSection.style.display = 'block';
    } else {
        noDataFoundMessageSection.style.display = 'none';
    }
}


// Load country data from RESTCountryAPI by country name...
const getCountryDetailedInformationByCountryName = async(countryName) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if(response.ok) {
        noDataFoundMessage(false);
        const data = await response.json();
        displayCountryDetailedInformation(data);
    } else{
        websitePreloader(false);
        noDataFoundMessage(true);
    }
    
}

const displayCountryDetailedInformation = countryData => {
    console.log(countryData)
    const countryFlagSVG = countryData[0].flags.svg;
    const countryName = countryData[0].name.common;
    const countryOfficialName = countryData[0].name.official;
    const countryCapital = countryData[0].capital ? Object.values(countryData[0].capital) : "Has No Capital";
    const countryTotalArea = countryData[0].area;
    const countryTotalPopulation = countryData[0].population;
    const countryLanguage = Object.values(countryData[0].languages);
    const countryRegion = countryData[0].region;
    const countryMap = countryData[0].maps.googleMaps;
    const countryCurrencies = Object.keys(countryData[0].currencies);
    const countryTimeZone = Object.values(countryData[0].timezones);
    const countryIDD = `${countryData[0].idd.root} ${Object.values(countryData[0].idd.suffixes)}`;
    const countryTLD = Object.values(countryData[0].tld);
    let countryGiniStatus = Object.keys(countryData[0].gini);
    countryGiniStatus = countryGiniStatus.map(key => key + ': ' + countryData[0].gini[key]);
    const countryIndependentStatus = countryData[0].independent ? "Independent Country" : "Not an Independent Country";
    const countryLandlockedStatus = countryData[0].landlocked ? "Landlocked Country" : "Not a Landlocked Country";

    document.getElementById("countryFlagSVG").src = countryFlagSVG;
    document.getElementById("displayCountryName").innerText = countryName;
    document.getElementById("displayCountryOfficialName").innerText = countryOfficialName;
    document.getElementById("displayCountryCapital").innerText = countryCapital;
    document.getElementById("displayCountryTotalArea").innerText = countryTotalArea;
    document.getElementById("displayCountryPopulation").innerText = countryTotalPopulation;
    document.getElementById("displayCountryLanguage").innerText = countryLanguage;
    document.getElementById("displayCountryRegion").innerText = countryRegion;
    document.getElementById("displayCountryMap").href = countryMap;
    document.getElementById("displayCountryCurrencies").innerText = countryCurrencies;
    document.getElementById("displayCountryTimeZone").innerText = countryTimeZone;
    document.getElementById("displayCountryIDD").innerText = countryIDD;
    document.getElementById("displayCountryTLD").innerText = countryTLD;
    document.getElementById("displayCountryGiniStatus").innerText = countryGiniStatus;
    document.getElementById("displayCountryIndependentStatus").innerText = countryIndependentStatus;
    document.getElementById("displayCountryLandlocked").innerText = countryLandlockedStatus;

    websitePreloader(false);
}


document.getElementById("detailedInformationSearchBtn").addEventListener('click', () => {
    websitePreloader(true);

    const detailedInformationSearchInput = document.getElementById("detailedInformationSearchInput");
    const userSearchValue = detailedInformationSearchInput.value;
    if (userSearchValue !== "") {
        getCountryDetailedInformationByCountryName(userSearchValue);
    }

    detailedInformationSearchInput.value = '';
});