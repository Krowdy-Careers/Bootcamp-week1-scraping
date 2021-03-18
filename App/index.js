let btnScrap = document.getElementById("scrap-profile");

btnScrap.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    btnScrap.addEventListener('click', async () => {
      function: scrapingProfile,
    });
  }
});

const scrapingProfile = () => {
  const wait = function (milliseconds) {
    const scrapingProfile = () => {
    };
  };

  /* 
   *  Get personal information
   */
  const profileName = document.querySelector(
    "div.ph5.pb5 > div.display-flex.mt2 ul li"
  ).innerText;

  const jobTitle = document.querySelector(
    "div.ph5.pb5 > div.display-flex.mt2 h2"
  ).innerText;

  const location = document.querySelector('.pv-top-card--list.pv-top-card--list-bullet .t-normal').innerText
  const seeMore = document.querySelector("section.pv-about-section > p").innerText;

  seeMore.querySelector("span > a")?.click();

  wait(5000);

  const education = document.querySelector(
    "section.pv-profile-section.education-section ul"
  );
  const listEducation = education?.querySelectorAll("li");
  const infoEducation = listEducation.map((el) => {
    const info = element.querySelector(
      "div > div > a > div.pv-entity__summary-info"
    );
    const level =
      info?.querySelector("div > div > p > span.pv-entity__comma-item")
        ?.innerText || "";
    const placeEducation =
      info?.querySelector("div > div > h3.pv-entity__school-name")?.innerText ||
      "";
    const periodEduc =
      info?.querySelector("div > p.pv-entity__dates > span > time")
        ?.innerText || "";
    return {
      level, placeEducation, periodEduc
    }
  });


  const listExperience = document.querySelector(
    "section.pv-profile-section.experience-section ul"
  ).querySelectorAll("li");

  const infoExperience = listExperience.map((exp) => {
    const info = element.querySelector(
      "div > div > a > div.pv-entity__summary-info"
    );
    const business =
      info?.querySelector("p.pv-entity__secondary-title")?.innerText || "";
    const periodExp = {
      range:
        info?.querySelectorAll("div > h4")[0].querySelectorAll("span")[1]
          ?.innerText || "",
      duration:
        info?.querySelectorAll("div > h4")[1].querySelectorAll("span")[1]
          ?.innerText || "",
    };
    const functionExp = info?.querySelector("h3")?.innerText || "";
    return {
      business,
      periodExp,
      functionExp,
    }
  })

  const personalInformation = {
    info: { name, job, location, resume },
    education: infoEducation,
    experience: infoExperience
  }

  console.log(personalInformation);
};