import { tourForm } from "@/data/forms";

import longstantonImg from "@/assets/homes/longstanton.jpg";
import longstantonGardenImg from "@/assets/homes/longstanton-garden.jpg";
import longstantonActivityImg from "@/assets/homes/longstanton-activity.jpg";
import egreemontImg from "@/assets/homes/egreemont-court.jpg";
import egreemontDrivewayImg from "@/assets/homes/egreemont-driveway.jpg";
import egreemontGardenImg from "@/assets/homes/egreemont-garden.jpg";
import perrinImg from "@/assets/homes/perrin-house.jpg";
import perrinFlat2Img from "@/assets/homes/perrin-flat2.jpg";
import perrinFlat3Img from "@/assets/homes/perrin-flat3.jpg";
import perrinFlat4Img from "@/assets/homes/perrin-flat4.jpg";
import perrinSensoryImg from "@/assets/homes/perrin-sensory-room-labelled.jpg";
import millRoadImg from "@/assets/homes/mill-road.jpg";

export interface Home {
  /** Stable key; also the ?home= value that pre-selects this home on the form. */
  slug: string;
  name: string;
  /** Exact option string on the Google Form — must match or the answer is dropped. */
  formValue: string;
  area: string;
  address: string;
  /** "LD residential care home" is the required phrasing for Longstanton. */
  serviceType: string;
  status: "open" | "opening-soon";
  /** Short line under the name; what a family or commissioner is actually buying. */
  blurb: string;
  facts: string[];
  /** CQC is only claimed where the location is actually registered and rated. */
  cqcRated?: boolean;
  hero?: string;
  gallery: string[];
}

export const homes: Home[] = [
  {
    slug: "longstanton",
    name: "Chamarel, Longstanton",
    formValue: tourForm.homeOptions.longstanton,
    area: "Cambridgeshire",
    address: "8 High Street, Longstanton, Cambridge CB24 3BP",
    serviceType: "LD residential care home",
    status: "open",
    blurb:
      "Our established seven-bed LD residential care home in a Cambridgeshire village, for adults with learning disabilities, autism and mental health needs who want the security of a staffed home and a life out in the community.",
    facts: [
      "7 bedrooms, single occupancy",
      "Waking night and sleep-in cover",
      "Large rear garden and communal lounge",
      "Village setting, on the Cambridge guided busway",
    ],
    cqcRated: true,
    hero: longstantonImg,
    gallery: [longstantonImg, longstantonGardenImg, longstantonActivityImg],
  },
  {
    slug: "egreemont-court",
    name: "Egreemont Court",
    formValue: tourForm.homeOptions.egreemont,
    area: "Wembley, London",
    address: "Sudbury Hill Close, Wembley HA0",
    serviceType: "Supported living",
    status: "open",
    blurb:
      "A purpose-built scheme of eight self-contained flats across three floors in north-west London, with flexible 1:1 and shared support, so people hold their own tenancy and their own front door.",
    facts: [
      "8 self-contained flats, 1, 2 and 3 bedrooms",
      "Own tenancy, own front door",
      "Flexible 1:1 and enhanced support",
      "On-site staff, waking and sleep-in",
    ],
    hero: egreemontImg,
    gallery: [egreemontImg, egreemontDrivewayImg, egreemontGardenImg],
  },
  {
    slug: "perrin-house",
    name: "Perrin House",
    formValue: tourForm.homeOptions.perrin,
    area: "Cambridge",
    address: "145 Perne Road, Cambridge CB1 3NT",
    serviceType: "Supported living",
    status: "open",
    blurb:
      "Newly completed and fully accessible, five minutes from Addenbrooke's. Eight bedrooms across four flats, built for adults with learning disabilities, complex care needs, autism and mental health needs.",
    facts: [
      "8 bedrooms across 4 flats",
      "9 wet rooms, step-free throughout",
      "Dedicated sensory room",
      "5 minutes from Addenbrooke's Hospital",
    ],
    hero: perrinImg,
    gallery: [perrinImg, perrinSensoryImg, perrinFlat3Img, perrinFlat2Img, perrinFlat4Img],
  },
  {
    slug: "mill-road",
    name: "Mill House, 280 Mill Road",
    formValue: tourForm.homeOptions.millRoad,
    area: "Cambridge",
    address: "280 Mill Road, Cambridge CB1 3NL",
    serviceType: "Supported living",
    status: "opening-soon",
    blurb:
      "Self-contained flats in central Cambridge, part of our three-home Cambridge group. Register your interest now and we will send the tour and floor plans as soon as they are ready.",
    facts: ["Central Cambridge", "Self-contained flats", "Part of the 20-room Cambridge group"],
    hero: millRoadImg,
    gallery: [millRoadImg],
  },
  {
    slug: "cedar-house",
    name: "Cedar House, 46 Perne Road",
    formValue: tourForm.homeOptions.cedar,
    area: "Cambridge",
    address: "46 Perne Road, Cambridge CB1 3NT",
    serviceType: "Supported living",
    status: "opening-soon",
    blurb:
      "Three self-contained flats a few doors from Perrin House, currently being completed. Register your interest and we will send photographs and a tour as soon as the work finishes.",
    facts: ["3 self-contained flats", "Alongside Perrin House", "Completing shortly"],
    gallery: [],
  },
];

export const openHomes = homes.filter((h) => h.status === "open");
export const upcomingHomes = homes.filter((h) => h.status === "opening-soon");
