let btnscrap = document.getElementById('btnscrap')

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
    const scrollNumber = document.getElementById("main").scrollHeight;
    window.scroll({
        top: scrollNumber,
        left: 0,
        behavior: 'smooth'
    })

    const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")
    const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")
    const name = elementNameProfile? elementNameProfile.innerText:'';
    const title = elementNameTitle? elementNameTitle.innerText:'';
 
    const elementMoreResume = document.getElementById('line-clamp-show-more-button')
    if(elementMoreResume) elementMoreResume.click();
    const elementResume = document.querySelector('section.pv-about-section > p')
    const resume = elementResume.innerText


    const experience = document.getElementsByClassName("pv-entity__position-group-pager pv-profile-section__list-item ember-view");
    var experienceInfo = [];
    const moreEachExperience = document.getElementsByClassName("inline-show-more-text__button  link");
    for (let i =0; i<moreEachExperience.length; i++){
        moreEachExperience[i].click();
    }
    for(let i=0; i<experience.length; i++){
        if(experience[i].getElementsByTagName("ul").length == 0){
            experienceInfo.push({
                "company" : experience[i].getElementsByClassName("pv-entity__secondary-title t-14 t-black t-normal")[0].innerText,
                "job": experience[i].getElementsByClassName("t-16 t-black t-bold")[0].innerText,
                "time": experience[i].getElementsByClassName("pv-entity__date-range t-14 t-black--light t-normal")[0].innerText,
                "location": experience[i].getElementsByClassName("pv-entity__location t-14 t-black--light t-normal block")[0].innerText,
                "functions": experience[i].getElementsByTagName("p")[0].innerText
            })
        } else{
            var jobs = [];
            const liExperience = experience[i].getElementsByTagName("li");
            for(a=0; a < liExperience.length; a++){
                const func = liExperience[a].getElementsByTagName("p")[0];
                const location =liExperience[a].getElementsByClassName("pv-entity__location t-14 t-black--light t-normal block")[0];
                jobs.push({
                    "job": liExperience[a].getElementsByClassName("t-14 t-black t-bold")[0].innerText,
                    "time": liExperience[a].getElementsByClassName("pv-entity__date-range t-14 t-black--light t-normal")[0].innerText,
                    "location": location? location.innerText : "",
                    "functions": func? func.innerText : ""
                })
            }
            experienceInfo.push({
                "company": experience[i].getElementsByClassName("t-16 t-black t-bold")[0].innerText,
                "job" : jobs
            })
        }
    }


    const moreEducation = document.getElementsByClassName("pv-profile-section__see-more-inline pv-profile-section__text-truncate-toggle artdeco-button artdeco-button--tertiary artdeco-button--muted");
    for(let i= (moreEducation.length -1) ; i>=0; i--){
            moreEducation[i].click()
    }

    const education = document.getElementsByClassName("pv-profile-section__list-item pv-education-entity pv-profile-section__card-item ember-view");
    var educationInfo = [];
    for(var i=0; i< education.length; i++){
        let activities = education[i].getElementsByClassName("pv-entity__secondary-title t-14 t-black--light t-normal")[0];
        let description = education[i].getElementsByClassName("pv-entity__description t-14 t-normal mt4")[0];
        educationInfo.push({
            "institution" : document.getElementsByClassName("pv-entity__school-name t-16 t-black t-bold")[i].innerHTML,
            "degree" : education[i].getElementsByClassName("pv-entity__comma-item")[0].innerHTML,
            "start" : education[i].getElementsByTagName("time")[0].innerHTML,
            "finish" : education[i].getElementsByTagName("time")[1].innerHTML,
            "activities" : activities? activities.innerText : "",
            "description" : description? description.innerText : ""
        });
    }

    console.log({name,title,resume,experienceInfo,educationInfo});
}