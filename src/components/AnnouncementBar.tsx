import { enquiryEmail, enquiryEmailHref, enquiryPhone, enquiryPhoneHref } from "@/data/contact";

const AnnouncementBar = () => (
  <div
    className="flex items-center justify-center text-center px-4"
    style={{ height: 44, backgroundColor: "#00706B" }}
  >
    <span className="text-white text-[13px]">
      🏅 CQC Inspected &amp; Rated Good
      <span className="hidden md:inline">{"  "}|{"  "}Serving London &amp; surrounding areas</span>
      <span className="hidden sm:inline">
        {"  "}|{"  "}
        <a
          href={enquiryEmailHref}
          className="font-bold text-white no-underline hover:opacity-80 transition-opacity"
        >
          {enquiryEmail}
        </a>
      </span>
      {"  "}|{"  "}
      <a
        href={enquiryPhoneHref}
        className="font-bold text-white no-underline hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        📞 {enquiryPhone}
      </a>
    </span>
  </div>
);

export default AnnouncementBar;
