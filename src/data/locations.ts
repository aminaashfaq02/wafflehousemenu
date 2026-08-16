import locImg1 from "@/assets/iloveimg-compressed (8)/loc-4-exterior.jpeg";
import locImg2 from "@/assets/iloveimg-compressed (8)/loc-5-exterior-twilight.jpeg";
import locImg3 from "@/assets/iloveimg-compressed (8)/loc-6-highway.jpeg";
import locImg4 from "@/assets/iloveimg-compressed (8)/loc-8-yellow-signboard.jpeg";
import locImg5 from "@/assets/iloveimg-compressed (8)/loc-1-diner-booths.jpeg";
import locImg6 from "@/assets/iloveimg-compressed (8)/loc-7-signboard-sky.jpeg";
import locImg7 from "@/assets/iloveimg-compressed (8)/loc-2-empty-diner.jpeg";
import locImg8 from "@/assets/iloveimg-compressed (8)/loc-3-dining-area.jpeg";

export interface StoreBranch {
  name: string;
  image: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  lat: number;
  lng: number;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
  doordashUrl?: string;
  ubereatsUrl?: string;
  grubhubUrl?: string;
  amenities: {
    takeout: boolean;
    delivery: boolean;
    dining24h: boolean;
    wheelchair: boolean;
    counterSeating: boolean;
    parking: boolean;
  };
  hours: {
    weekdays: string;
    weekends: string;
    holidays: string;
  };
}

export interface CityLocations {
  cityName: string;
  citySlug: string;
  stores: StoreBranch[];
}

export interface StateLocations {
  stateName: string;
  stateSlug: string;
  stateCode: string;
  branchCount: number;
  cities: CityLocations[];
}

export const locationsData: StateLocations[] = [
  {
    stateName: "Georgia",
    stateSlug: "georgia",
    stateCode: "GA",
    branchCount: 435,
    cities: [
      {
        cityName: "Atlanta",
        citySlug: "atlanta",
        stores: [
          {
            name: "Waffle House Downtown Atlanta",
            image: locImg1,
            slug: "downtown-atlanta",
            address: "135 Andrew Young International Blvd NW",
            city: "Atlanta",
            state: "Georgia",
            zipCode: "30303",
            phone: "(404) 522-8355",
            lat: 33.7599,
            lng: -84.3888,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.9209598284564!2d-84.39139632429623!3d33.75992987326848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f50387b99c7553%3A0xea8bcf856b37cf01!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=135+Andrew+Young+International+Blvd+NW,+Atlanta,+GA+30303",
            doordashUrl: "https://www.doordash.com/store/waffle-house-atlanta-732381/",
            ubereatsUrl: "https://www.ubereats.com/store/waffle-house-135-andrew-young/",
            grubhubUrl: "https://www.grubhub.com/restaurant/waffle-house-135-andrew-young-blvd-nw-atlanta/2381273",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: false
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours (Including Thanksgiving & Christmas)"
            }
          },
          {
            name: "Waffle House Midtown Atlanta",
            image: locImg2,
            slug: "midtown-atlanta",
            address: "100 10th St NW",
            city: "Atlanta",
            state: "Georgia",
            zipCode: "30309",
            phone: "(404) 875-1033",
            lat: 33.7816,
            lng: -84.3881,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.082729910903!2d-84.3906471!3d33.7815545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5047ae91b1dbf%3A0xe5ad4c2053156cfd!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000001!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=100+10th+St+NW,+Atlanta,+GA+30309",
            doordashUrl: "https://www.doordash.com/store/waffle-house-atlanta-732382/",
            ubereatsUrl: "https://www.ubereats.com/store/waffle-house-100-10th-st/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: true
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      },
      {
        cityName: "Savannah",
        citySlug: "savannah",
        stores: [
          {
            name: "Waffle House Savannah Historic District",
            image: locImg3,
            slug: "savannah-historic-district",
            address: "318 W Bay St",
            city: "Savannah",
            state: "Georgia",
            zipCode: "31401",
            phone: "(912) 236-4148",
            lat: 32.0815,
            lng: -81.0967,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.71882833075!2d-81.098877!3d32.081498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fb9e67ab9fb359%3A0x6b490f8452ef58ee!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000002!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=318+W+Bay+St,+Savannah,+GA+31401",
            doordashUrl: "https://www.doordash.com/store/waffle-house-savannah-732383/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: false
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      }
    ]
  },
  {
    stateName: "North Carolina",
    stateSlug: "north-carolina",
    stateCode: "NC",
    branchCount: 182,
    cities: [
      {
        cityName: "Charlotte",
        citySlug: "charlotte",
        stores: [
          {
            name: "Waffle House Charlotte Uptown",
            image: locImg4,
            slug: "charlotte-uptown",
            address: "330 N Tryon St",
            city: "Charlotte",
            state: "North Carolina",
            zipCode: "28202",
            phone: "(704) 377-0909",
            lat: 35.2289,
            lng: -80.8402,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.9193798284564!2d-80.84279632429623!3d35.22892987326848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856a025b99c7553%3A0xea8bcf856b37cf01!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000003!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=330+N+Tryon+St,+Charlotte,+NC+28202",
            doordashUrl: "https://www.doordash.com/store/waffle-house-charlotte-732384/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: false
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      }
    ]
  },
  {
    stateName: "Florida",
    stateSlug: "florida",
    stateCode: "FL",
    branchCount: 165,
    cities: [
      {
        cityName: "Jacksonville",
        citySlug: "jacksonville",
        stores: [
          {
            name: "Waffle House Jacksonville Downtown",
            image: locImg5,
            slug: "jacksonville-downtown",
            address: "100 W Adams St",
            city: "Jacksonville",
            state: "Florida",
            zipCode: "32202",
            phone: "(904) 355-6677",
            lat: 30.3289,
            lng: -81.6599,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.9209598284564!2d-81.66249632429623!3d30.32892987326848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b025b99c7553%3A0xea8bcf856b37cf01!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000004!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=100+W+Adams+St,+Jacksonville,+FL+32202",
            doordashUrl: "https://www.doordash.com/store/waffle-house-jacksonville-732385/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: true
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      }
    ]
  },
  {
    stateName: "Alabama",
    stateSlug: "alabama",
    stateCode: "AL",
    branchCount: 154,
    cities: [
      {
        cityName: "Birmingham",
        citySlug: "birmingham",
        stores: [
          {
            name: "Waffle House Birmingham Southside",
            image: locImg6,
            slug: "birmingham-southside",
            address: "951 20th St S",
            city: "Birmingham",
            state: "Alabama",
            zipCode: "35205",
            phone: "(205) 930-0880",
            lat: 33.5015,
            lng: -86.8015,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.9209598284564!2d-86.80409632429623!3d33.50152987326848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88891025b99c7553%3A0xea8bcf856b37cf01!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000005!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=951+20th+St+S,+Birmingham,+AL+35205",
            doordashUrl: "https://www.doordash.com/store/waffle-house-birmingham-732386/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: true
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      }
    ]
  },
  {
    stateName: "South Carolina",
    stateSlug: "south-carolina",
    stateCode: "SC",
    branchCount: 147,
    cities: [
      {
        cityName: "Columbia",
        citySlug: "columbia",
        stores: [
          {
            name: "Waffle House Columbia Five Points",
            image: locImg7,
            slug: "columbia-five-points",
            address: "740 Harden St",
            city: "Columbia",
            state: "South Carolina",
            zipCode: "29205",
            phone: "(803) 779-1144",
            lat: 34.0015,
            lng: -81.0115,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.9209598284564!2d-81.01409632429623!3d34.00152987326848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f8b025b99c7553%3A0xea8bcf856b37cf01!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000006!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=740+Harden+St,+Columbia,+SC+29205",
            doordashUrl: "https://www.doordash.com/store/waffle-house-columbia-732387/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: false
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      }
    ]
  },
  {
    stateName: "Texas",
    stateSlug: "texas",
    stateCode: "TX",
    branchCount: 110,
    cities: [
      {
        cityName: "Houston",
        citySlug: "houston",
        stores: [
          {
            name: "Waffle House Houston Central",
            image: locImg8,
            slug: "houston-central",
            address: "2202 Southwest Fwy",
            city: "Houston",
            state: "Texas",
            zipCode: "77098",
            phone: "(713) 520-5544",
            lat: 29.7315,
            lng: -95.4115,
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.9209598284564!2d-95.41409632429623!3d29.73152987326848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b025b99c7553%3A0xea8bcf856b37cf01!2sWaffle%20House!5e0!3m2!1sen!2sus!4v1700000000007!5m2!1sen!2sus",
            mapDirectionUrl: "https://maps.google.com/?q=2202+Southwest+Fwy,+Houston,+TX+77098",
            doordashUrl: "https://www.doordash.com/store/waffle-house-houston-732388/",
            amenities: {
              takeout: true,
              delivery: true,
              dining24h: true,
              wheelchair: true,
              counterSeating: true,
              parking: true
            },
            hours: {
              weekdays: "Open 24 Hours",
              weekends: "Open 24 Hours",
              holidays: "Open 24 Hours"
            }
          }
        ]
      }
    ]
  }
];

export function getStoreBySlug(stateSlug: string, storeSlug: string): StoreBranch | undefined {
  const state = locationsData.find((s) => s.stateSlug === stateSlug);
  if (!state) return undefined;
  for (const city of state.cities) {
    const store = city.stores.find((st) => st.slug === storeSlug);
    if (store) return store;
  }
  return undefined;
}
