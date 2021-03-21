const wait = function (milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
};

const autoScroll = (scrollTo) => {
    window.scroll({
        top: scrollTo,
        left: 0,
        behavior: 'smooth'
    });
}

const scrapingProfile = async () => {

    const clickOnMoreResume = () => {
        const elementMoreResume = document.getElementById("line-clamp-show-more-button");

        if (elementMoreResume) {
        elementMoreResume.click();
        }
    }

    const getPersonalInformation = async () => {
        try {
            clickOnMoreResume();
            const name = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")?.innerText;
            const title = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")?.innerText;
            const location = document.querySelector("ul.pv-top-card--list-bullet > li")?.innerText;
            const resume = document.querySelector("section.pv-about-section > p")?.innerText;
            
            return { name, title, location, resume }
        } catch (error) {
            throw error;
        }
    }

    const clickOnMoreExperience = () => {
        const elementMoreExperience = document.querySelector("section.experience-section > div.pv-experience-section__see-more > button.pv-profile-section__see-more-inline");

        if(elementMoreExperience) {
            elementMoreExperience.click();
        }
    }
    
    const getExperienceInformation = async () => {
        try {
            clickOnMoreExperience();
            const elementAllExperience = document.querySelectorAll("ul.pv-profile-section__section-info > li > section");
            const experienceArray = Array.from(elementAllExperience);
    
            const experienceData = experienceArray.map((experienceItem) => {
                const elementPositionGroup = experienceItem.querySelector("ul.pv-entity__position-group");
    
                const getMultipleRoles = (experienceItem) => {
                    const elementPositionInfo = experienceItem.querySelector("div > a");
    
                    const companyName = elementPositionInfo.querySelector("div.pv-entity__company-summary-info > h3 > span:nth-child(2)")?.innerText;
                    const companyTotalDuration = elementPositionInfo.querySelector("div.pv-entity__company-summary-info > h4 > span:nth-child(2)")?.innerText;
    
                    const elementAllCompaniesPosition = elementPositionGroup.querySelectorAll("li.pv-entity__position-group-role-item");
                    const experienceArray = Array.from(elementAllCompaniesPosition);
    
                    const positionRolesList = experienceArray.map((roleItem) => {
                        const elementRoleContainer = roleItem.querySelector("div.pv-entity__role-container > div");
                        const roleName = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > h3 > span:nth-child(2)")?.innerText;
                        const roleWorkday = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > h4")?.innerText;
                        const employmentDate = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > div > h4 > span:nth-child(2)")?.innerText;
                        const employmentDuration = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > div > h4:nth-child(2) > span:nth-child(2)")?.innerText;
                        const roleLocation = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > h4.pv-entity__location > span:nth-child(2)")?.innerText;
                        const roleDetails = elementRoleContainer.querySelector("div.pv-entity__extra-details > p")?.innerText;
    
                        return ({ roleName, roleWorkday, employmentDate, employmentDuration, roleLocation, roleDetails })
                    });
                    
                    return ({ companyName, companyTotalDuration, companyRoles: { ...positionRolesList}})
                }
    
                const getIndividualRole = (experienceItem) => {
                    const elementPositionInfo = experienceItem.querySelector("div > div");
                    const roleName = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > h3")?.innerText;
                    const companyName = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > p.pv-entity__secondary-title")?.innerText;
                    const roleWorkday = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > p.pv-entity__secondary-title > span.pv-entity__secondary-title")?.innerText;
                    const employmentDate = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > div > h4.pv-entity__date-range > span:nth-child(2)")?.innerText;
                    const employmentDuration = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > div > h4:nth-child(2) > span:nth-child(2)")?.innerText;
                    const roleLocation = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > h4.pv-entity__location > span:nth-child(2)")?.innerText;
                    const roleDetails = elementPositionInfo.querySelector("div.pv-entity__extra-details > p")?.innerText;
                    
                    return ({ roleName, companyName, roleWorkday, employmentDate, employmentDuration, roleLocation, roleDetails });
                }
    
                if(elementPositionGroup) {
                    return (getMultipleRoles(experienceItem))
                } else {
                    return (getIndividualRole(experienceItem))
                }
            });
            
            return { ...experienceData }
        } catch (error) {
            throw error
        }
    }

    const clickOnMoreEducation = () => {
        const elementMoreEducation = document.querySelector("section.education-section > div.pv-profile-section__actions-inline > button.pv-profile-section__see-more-inline");

        if(elementMoreEducation) {
            elementMoreEducation.click();
        }
    }

    const getEducationInformation = async () => {
        try {
            clickOnMoreEducation();
            const elementAllEducation = document.querySelectorAll("section#education-section > ul.pv-profile-section__section-info > li");
            const educationArray = Array.from(elementAllEducation);
    
            const educationList = educationArray.map((educationItem) => {
                const schoolName = educationItem.querySelector("div.pv-entity__degree-info > h3")?.innerText;
                const degreeName = educationItem.querySelector("div.pv-entity__summary-info > div.pv-entity__degree-info > p.pv-entity__degree-name > span:nth-child(2)")?.innerText;
                const disciplineName = educationItem.querySelector("div.pv-entity__summary-info > div.pv-entity__degree-info > p.pv-entity__fos > span:nth-child(2)")?.innerText;
                const schoolStartDate = educationItem.querySelector("div.pv-entity__summary-info > p.pv-entity__dates > span:nth-child(2) > time:nth-child(1)")?.innerText;
                const schoolEndDate = educationItem.querySelector("div.pv-entity__summary-info > p.pv-entity__dates > span:nth-child(2) > time:nth-child(2)")?.innerText;
                
                return ({ schoolName, degreeName, disciplineName, schoolStartDate, schoolEndDate })
            });
            
            return { ...educationList}
        } catch (error) {
            throw error
        }
    }

    await wait(3000)
    .then(() => {
        autoScroll(document.body.scrollHeight);
    })

    const personalInformation = await getPersonalInformation();
    const experienceInformation = await getExperienceInformation();
    const educationInformation = await getEducationInformation();

    if (window.localStorage.getItem('profilesData') !== null) {
        let profilesData = JSON.parse(window.localStorage.getItem('profilesData'));
        profilesData = [ ...profilesData, { personalInformation, experienceInformation, educationInformation } ];
        window.localStorage.setItem('profilesData', JSON.stringify(profilesData));
        console.log(JSON.parse(window.localStorage.getItem('profilesData')));
    } else {
        let profilesData = [];
        profilesData =  [ ...profilesData, { personalInformation, experienceInformation, educationInformation } ];
        window.localStorage.setItem('profilesData', JSON.stringify(profilesData));
        console.log(JSON.parse(window.localStorage.getItem('profilesData')));
    }
}

const newTab = (urlTo) => {
    const profileHash = 'scrap';
    let url = new URL(urlTo);
    url.hash = `${profileHash}`;
    const goToProfile = window.open(url);
    goToProfile.focus();
}

const scanningProfiles = async () => {
    const elementAllProfiles = document.querySelectorAll("ul.reusable-search__entity-results-list > li.reusable-search__result-container");
    const profilesArray = Array.from(elementAllProfiles);

    const profilesList = profilesArray.map((profileItem) => {
        const elementProfileContainer = profileItem.querySelector("div.entity-result > div.entity-result__item > div.entity-result__content > div > div");
        const profileLink = elementProfileContainer.querySelector("div > span > div > span.entity-result__title-line > span.entity-result__title-text > a.app-aware-link").href;
        return ( profileLink )
    });

    if(profilesList.length > 0) {
        window.localStorage.removeItem('profilesData');
        window.localStorage.setItem('profilesList', JSON.stringify(profilesList));
        newTab(profilesList[0]);
    }
}

( async () => {
    chrome.runtime.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(message) {
            const { action } = message;

            switch( action ) {
                case 'scraping':
                    scrapingProfile();
                    break;
                case 'scanning': 
                    scanningProfiles();
                    break;
            }
        });
    });

    try {
        const currentPathname = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

        if (window.localStorage.getItem('profilesList') !== null) {
            const getProfileListLS = JSON.parse(window.localStorage.getItem('profilesList'));
            const currentProfile = currentPathname.substring(0, currentPathname.length - 1);
            const currentProfileIndex = getProfileListLS.indexOf(currentProfile);

            if(getProfileListLS.includes(currentProfile)) {
                await scrapingProfile();

                wait(3000).then(() => {
                    if(getProfileListLS.indexOf(currentProfile) > - 1 ) {
                        getProfileListLS.splice(currentProfileIndex, 1);
                        window.localStorage.setItem('profilesList', JSON.stringify(getProfileListLS) );

                        if(getProfileListLS.length > 0) {
                            newTab(getProfileListLS[0]);
                        } else {
                            localStorage.removeItem('profilesList');
                        }
                    }
                });
            }
        }
    } catch (error) {
        throw error
    }
})();