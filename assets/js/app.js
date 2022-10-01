document.getElementById("mainMenuUL").addEventListener('click', (event) => {
   const activeMenu = document.querySelector("#mainMenuUL .active");
   const targetedMenu = event.target;
   if (targetedMenu.classList.contains('nav-link') && activeMenu !== targetedMenu) {
       websiteLoadingPreloader(true);
       activeMenu.classList.remove('active');
       targetedMenu.classList.add('active');
       switchMainSectionByMenuId(event.target.id);
   }
});


const switchMainSectionByMenuId = (id) => {
    websiteLoadingPreloader(false);

    document.querySelector('.active-section').classList.remove('active-section');
    switch (id){
        case "countryGuideMenu":
            document.getElementById("countryGuideSection").classList.add('active-section');
            return;
        case "allCountriesMenu":
            document.getElementById("allCountriesSection").classList.add('active-section');
            return;
    }
    
}


const websiteLoadingPreloader = isActive => {
    const preloaderSection = document.getElementById("preloaderSection");
    if (isActive) {
        preloaderSection.style.display = 'block';
    } else {
        preloaderSection.style.display = 'none';
    }
}