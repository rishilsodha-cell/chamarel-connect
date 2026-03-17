const AnnouncementBar = () => (
  <div
    className="flex items-center justify-center text-center px-4"
    style={{ height: 44, backgroundColor: "#00706B" }}
  >
    <span className="text-white text-[13px]">
      🏅 CQC Inspected &amp; Rated Good
      <span className="hidden md:inline">{"  "}|{"  "}Serving London &amp; surrounding areas</span>
      {"  "}|{"  "}
      <a
        href="mailto:enquiry@chamarelhealthcare.com"
        className="font-bold text-white no-underline hover:opacity-80 transition-opacity"
      >
        enquiry@chamarelhealthcare.com
      </a>
    </span>
  </div>
);

export default AnnouncementBar;
