let btnscrap = document.getElementById('scrap-profile')



btnscrap.addEventListener('click', async ()=>{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if(tab!==null){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: scrapingProfile,
          });
    }
})

const scrapingProfile = ()=>{
    const wait = function(milliseconds){
        return new Promise(function(resolve){
            setTimeout(function() {
                resolve();
            }, milliseconds);
        });
    };

    const atuoScrollScanner = async ()=>{
        let exist = document.querySelector('body');
        let oldY = -1;
        while (exist) {
            let actualY = window.scrollY;
            if (oldY === actualY){
                break;
            } 
            await wait(30);
            window.scrollTo(0, actualY + 30);
            oldY = actualY;
        }
        

        /////////////////obteniendo Experiencia
        const btnMoreExperience = document.querySelectorAll("#experience-section button");
        Array.from(btnMoreExperience).map((btn)=>{ btn.click()})

        const elementExperience = document.querySelectorAll("#experience-section ul.pv-profile-section__section-info > li section");
        const experience = elementExperience? Array.from(elementExperience).map((section)=>{
            return section.querySelectorAll('ul').length
            ?{empresa:section.querySelectorAll('a div div h3')[0].children[1].innerText,cargos:[Array.from(section.querySelectorAll('ul li')).map((li)=>{
                return {cargo: li.querySelectorAll('h3')[0].children[1].innerText,periodo:li.querySelectorAll('div h4')[0].innerText};
            })]} 
            : {empresa:section.querySelectorAll('div.pv-entity__summary-info p')[1].innerText,cargos:[{cargo:section.querySelectorAll('div.pv-entity__summary-info h3')[0].innerText,periodo:section.querySelectorAll('div.pv-entity__summary-info h4')[0].children[1].innerText}]};
        }):[];
           
        
        data.experiencia=experience;     



        /////////////Oteniendo Educacion
        const btnMoreEducation = document.querySelectorAll("#education-section button");
        Array.from(btnMoreEducation).map((btn)=>{ btn.click()})


        const elementEducation = document.querySelectorAll("section.education-section  ul li.pv-profile-section__list-item div.pv-entity__summary-info");
        const education = elementEducation? Array.from(elementEducation).map((li)=>{
            return {
                centroDeEstudios: li.children[0].children[0]? li.children[0].children[0].innerText:'',
                grado: li.children[0].children[1]? li.children[0].children[1].children[1].innerText:'',
                especialidad: li.children[0].children[2]? li.children[0].children[2].children[1].innerText:'',
                periodo:li.children[1]? li.children[1].children[1].innerText:'',
            };
        }):[];
        
        data.educacion= education;


        ////////////////////////////////////
        console.log(data);

    };
    
    ////// El algoritmo en si
    const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")
    const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")
    const elemntUbicacion = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul.pv-top-card--list.pv-top-card--list-bullet.mt1 li.t-16.t-black.t-normal.inline-block");//por ahora
    const name = elementNameProfile? elementNameProfile.innerText:'';
    const title = elementNameTitle? elementNameTitle.innerText:'';
    const ubicacion = elemntUbicacion? elemntUbicacion.innerText:'';
    wait(2000)
    const elementMoreResume = document.getElementById('line-clamp-show-more-button')
    if(elementMoreResume) elementMoreResume.click();
    const elementResume = document.querySelector('section.pv-about-section > p')
    const resume = elementResume? elementResume.innerText: '...';

    let data = {
        nombre:name,
        titulo:title,
        acercade:resume,
        ubicacion:ubicacion,
        experiencia:undefined,
        educacion:undefined
    };
   
    atuoScrollScanner();
    
}



