let btnscrap = document.getElementById('scrap-profile');

btnscrap.addEventListener('click', async ()=>{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if(tab!==null){
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: scrapingProfile,
          });
    }
})

const scrapingProfile = async ()=>{
    const wait = function(milliseconds){
        return new Promise(function(resolve){
            setTimeout(function() {
                resolve();
            }, milliseconds);
        });

    };

    const profileInfo = {
        personalInfo : {},
        educationInfo : new Array()

    };

    //Personal information
    const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")
    const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")
    const elementNameLocation = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul.pv-top-card--list-bullet li")

    //Aditional information
    wait(2000)
    const elementMoreResume = document.getElementById('line-clamp-show-more-button')
    if(elementMoreResume) elementMoreResume.click();
    const elementResume = document.querySelector('section.pv-about-section > p')

    profileInfo.personalInfo.name = elementNameProfile? elementNameProfile.innerText:'';
    profileInfo.personalInfo.title = elementNameTitle? elementNameTitle.innerText:'';
    profileInfo.personalInfo.location = elementNameLocation? elementNameLocation.innerText:'';
    profileInfo.personalInfo.resume = elementResume.innerText

    //Education informaction
    const elementsEducation = document.querySelectorAll('#education-section ul li');
    const elementMoreEducation = document.getElementById('ember174');
    if(elementMoreEducation && elementMoreEducation.children) {
        console.log(elementMoreEducation, elementMoreEducation.attributes);
        elementMoreEducation.children[0].click();
        await sleep(2000);
    }

    elementsEducation.forEach((element => {
        const education = {};
        const elementEducationSchoolName = element.querySelector('.pv-entity__school-name');
        const elementEducationTitulation = element.querySelector('.pv-entity__secondary-title.pv-entity__degree-name');
        const elementEducationDiscipline = element.querySelector('.pv-entity__secondary-title.pv-entity__fos');
        const elementEducationDates = element.querySelector('.pv-entity__dates');

        education.schoolName = elementEducationSchoolName? elementEducationSchoolName.innerText:'';
        education.titulation = elementEducationTitulation? elementEducationTitulation.lastElementChild.innerText:'';
        education.discipline = elementEducationDiscipline? elementEducationDiscipline.lastElementChild.innerText:'';
        education.dates = elementEducationDates? elementEducationDates.lastElementChild.innerText:'';

        profileInfo.educationInfo.push(education);
    }));

    console.log(profileInfo);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
}
