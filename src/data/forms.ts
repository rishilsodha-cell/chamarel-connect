// Google Forms behind the website's three forms. Created 15 Oct 2026.
// Responses: Google Form -> Apps Script -> Telegram (@ChamarelHR_bot) + email.
// Entry ids come from the published form; they are stable for the life of the form.

export const careersForm = {
  embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf2VykkEB9yafRes9UpyvDD5W--ciR-RV-1QwTlxsJAmXJiFg/viewform?embedded=true",
  openUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf2VykkEB9yafRes9UpyvDD5W--ciR-RV-1QwTlxsJAmXJiFg/viewform",
};

export const contactForm = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLSfk2U6QgcHLfncDXlxGiZ1Fo5jGJXFv9lKajxADQEMObPxN1Q/formResponse",
  openUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfk2U6QgcHLfncDXlxGiZ1Fo5jGJXFv9lKajxADQEMObPxN1Q/viewform",
  fields: {
    firstName: "entry.711296416",
    lastName: "entry.76232879",
    email: "entry.979565577",
    phone: "entry.1080626584",
    message: "entry.1072369241",
  },
};

export const referralForm = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLScUTEspZI4q-u--RygbgYkU0ODNLjxv4SRK5kwcIbLVLyPc1w/formResponse",
  openUrl: "https://docs.google.com/forms/d/e/1FAIpQLScUTEspZI4q-u--RygbgYkU0ODNLjxv4SRK5kwcIbLVLyPc1w/viewform",
  fields: {
    fullName: "entry.7900843",
    organisation: "entry.900466824",
    jobTitle: "entry.1596263776",
    email: "entry.1356385537",
    phone: "entry.274531908",
    supportType: "entry.713710847",
    urgency: "entry.555936377",
    situation: "entry.846084535",
    heardAbout: "entry.1009028209",
  },
};

// Lead-magnet form behind /our-homes. Created 10 Nov 2026 in paresh@chamarelhealthcare.com.
// Gates the video tours and brochures: a visitor leaves name/email/phone to get them.
export const tourForm = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLSc_B2LNy_FHGD0WrvpdNpyyCfJ5CnXjTwIl7SbiWrrX4lHfag/formResponse",
  openUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc_B2LNy_FHGD0WrvpdNpyyCfJ5CnXjTwIl7SbiWrrX4lHfag/viewform",
  fields: {
    fullName: "entry.886039819",
    email: "entry.1365362769",
    phone: "entry.232949238",
    home: "entry.2013461368",
    wants: "entry.119847565",
    role: "entry.1292712295",
    message: "entry.799882452",
  },
  // Must match the Google Form's option strings exactly or the answer is dropped.
  homeOptions: {
    longstanton: "Chamarel, Longstanton (residential care home, Cambridgeshire)",
    egreemont: "Egreemont Court, Wembley (supported living, London)",
    perrin: "Perrin House, 145 Perne Road, Cambridge (supported living)",
    millRoad: "280 Mill Road, Cambridge (opening soon)",
    cedar: "Cedar House, 46 Perne Road, Cambridge (opening soon)",
    unsure: "Not sure yet / more than one",
  },
  wantOptions: ["Video tour", "Brochure", "Arrange a visit in person", "A call from the team"],
  roleOptions: [
    "Family member or friend",
    "Social worker / care manager",
    "Commissioner / brokerage",
    "ICB or health professional",
    "Prospective resident",
    "Other",
  ],
};
