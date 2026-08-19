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
  stateCode: string;
  zipCode: string;
  phone: string;
  lat: number;
  lng: number;
  mapEmbedUrl?: string;
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
  storeCount?: number;
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
    stateName: "Alabama",
    stateSlug: "alabama",
    stateCode: "AL",
    branchCount: 154,
    cities: [
      {
        cityName: "Birmingham",
        citySlug: "birmingham",
        storeCount: 18,
        stores: [
          {
            name: "Waffle House Birmingham Southside",
            image: locImg6,
            slug: "birmingham-southside",
            address: "951 20th St S",
            city: "Birmingham",
            state: "Alabama",
            stateCode: "AL",
            zipCode: "35205",
            phone: "+1 205-930-0880",
            lat: 33.5015,
            lng: -86.8015,
            mapDirectionUrl: "https://maps.google.com/?q=951+20th+St+S,+Birmingham,+AL+35205",
            doordashUrl: "https://www.doordash.com/store/waffle-house-birmingham-732386/",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours (365 Days)" }
          },
          {
            name: "Waffle House Birmingham Lakeshore",
            image: locImg1,
            slug: "birmingham-lakeshore",
            address: "249 Lakeshore Pkwy",
            city: "Birmingham",
            state: "Alabama",
            stateCode: "AL",
            zipCode: "35209",
            phone: "+1 205-942-0210",
            lat: 33.4682,
            lng: -86.8291,
            mapDirectionUrl: "https://maps.google.com/?q=249+Lakeshore+Pkwy,+Birmingham,+AL+35209",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Huntsville",
        citySlug: "huntsville",
        storeCount: 12,
        stores: [
          {
            name: "Waffle House Huntsville University",
            image: locImg2,
            slug: "huntsville-university",
            address: "4110 University Dr NW",
            city: "Huntsville",
            state: "Alabama",
            stateCode: "AL",
            zipCode: "35816",
            phone: "+1 256-539-6633",
            lat: 34.7335,
            lng: -86.6341,
            mapDirectionUrl: "https://maps.google.com/?q=4110+University+Dr+NW,+Huntsville,+AL+35816",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Mobile",
        citySlug: "mobile",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Mobile Airport",
            image: locImg3,
            slug: "mobile-airport",
            address: "6800 Airport Blvd",
            city: "Mobile",
            state: "Alabama",
            stateCode: "AL",
            zipCode: "36608",
            phone: "+1 251-344-9340",
            lat: 30.6865,
            lng: -88.1972,
            mapDirectionUrl: "https://maps.google.com/?q=6800+Airport+Blvd,+Mobile,+AL+36608",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Montgomery",
        citySlug: "montgomery",
        storeCount: 11,
        stores: [
          {
            name: "Waffle House Montgomery Eastern Blvd",
            image: locImg4,
            slug: "montgomery-eastern-blvd",
            address: "2444 Eastern Blvd",
            city: "Montgomery",
            state: "Alabama",
            stateCode: "AL",
            zipCode: "36117",
            phone: "+1 334-277-2290",
            lat: 32.3682,
            lng: -86.2081,
            mapDirectionUrl: "https://maps.google.com/?q=2444+Eastern+Blvd,+Montgomery,+AL+36117",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Tuscaloosa",
        citySlug: "tuscaloosa",
        storeCount: 8,
        stores: [
          {
            name: "Waffle House Tuscaloosa Strip (Bama)",
            image: locImg5,
            slug: "tuscaloosa-university",
            address: "1217 University Blvd",
            city: "Tuscaloosa",
            state: "Alabama",
            stateCode: "AL",
            zipCode: "35401",
            phone: "+1 205-752-9442",
            lat: 33.2098,
            lng: -87.5501,
            mapDirectionUrl: "https://maps.google.com/?q=1217+University+Blvd,+Tuscaloosa,+AL+35401",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Arizona",
    stateSlug: "arizona",
    stateCode: "AZ",
    branchCount: 16,
    cities: [
      {
        cityName: "Phoenix",
        citySlug: "phoenix",
        storeCount: 6,
        stores: [
          {
            name: "Waffle House Phoenix I-17",
            image: locImg1,
            slug: "phoenix-i17",
            address: "2445 W Thomas Rd",
            city: "Phoenix",
            state: "Arizona",
            stateCode: "AZ",
            zipCode: "85015",
            phone: "+1 602-278-8380",
            lat: 33.4802,
            lng: -112.1125,
            mapDirectionUrl: "https://maps.google.com/?q=2445+W+Thomas+Rd,+Phoenix,+AZ+85015",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Tucson",
        citySlug: "tucson",
        storeCount: 5,
        stores: [
          {
            name: "Waffle House Tucson Speedway",
            image: locImg2,
            slug: "tucson-speedway",
            address: "3920 E Speedway Blvd",
            city: "Tucson",
            state: "Arizona",
            stateCode: "AZ",
            zipCode: "85712",
            phone: "+1 520-325-2420",
            lat: 32.2361,
            lng: -110.9082,
            mapDirectionUrl: "https://maps.google.com/?q=3920+E+Speedway+Blvd,+Tucson,+AZ+85712",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Mesa",
        citySlug: "mesa",
        storeCount: 3,
        stores: [
          {
            name: "Waffle House Mesa Superstition",
            image: locImg3,
            slug: "mesa-superstition",
            address: "1410 S Country Club Dr",
            city: "Mesa",
            state: "Arizona",
            stateCode: "AZ",
            zipCode: "85210",
            phone: "+1 480-833-2820",
            lat: 33.3912,
            lng: -111.8415,
            mapDirectionUrl: "https://maps.google.com/?q=1410+S+Country+Club+Dr,+Mesa,+AZ+85210",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Arkansas",
    stateSlug: "arkansas",
    stateCode: "AR",
    branchCount: 46,
    cities: [
      {
        cityName: "Little Rock",
        citySlug: "little-rock",
        storeCount: 12,
        stores: [
          {
            name: "Waffle House Little Rock Broadway",
            image: locImg4,
            slug: "little-rock-broadway",
            address: "2600 S Broadway St",
            city: "Little Rock",
            state: "Arkansas",
            stateCode: "AR",
            zipCode: "72206",
            phone: "+1 501-375-9240",
            lat: 34.7265,
            lng: -92.2782,
            mapDirectionUrl: "https://maps.google.com/?q=2600+S+Broadway+St,+Little+Rock,+AR+72206",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Fayetteville",
        citySlug: "fayetteville",
        storeCount: 6,
        stores: [
          {
            name: "Waffle House Fayetteville Razorback",
            image: locImg5,
            slug: "fayetteville-razorback",
            address: "2311 W Martin Luther King Jr Blvd",
            city: "Fayetteville",
            state: "Arkansas",
            stateCode: "AR",
            zipCode: "72701",
            phone: "+1 479-521-9988",
            lat: 36.0521,
            lng: -94.1952,
            mapDirectionUrl: "https://maps.google.com/?q=2311+W+Martin+Luther+King+Jr+Blvd,+Fayetteville,+AR+72701",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Colorado",
    stateSlug: "colorado",
    stateCode: "CO",
    branchCount: 11,
    cities: [
      {
        cityName: "Denver",
        citySlug: "denver",
        storeCount: 4,
        stores: [
          {
            name: "Waffle House Denver Airport Blvd",
            image: locImg6,
            slug: "denver-airport",
            address: "15980 E 40th Ave",
            city: "Aurora",
            state: "Colorado",
            stateCode: "CO",
            zipCode: "80011",
            phone: "+1 303-373-0440",
            lat: 39.7712,
            lng: -104.8021,
            mapDirectionUrl: "https://maps.google.com/?q=15980+E+40th+Ave,+Aurora,+CO+80011",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Colorado Springs",
        citySlug: "colorado-springs",
        storeCount: 4,
        stores: [
          {
            name: "Waffle House Colorado Springs Academy",
            image: locImg7,
            slug: "colorado-springs-academy",
            address: "1725 N Academy Blvd",
            city: "Colorado Springs",
            state: "Colorado",
            stateCode: "CO",
            zipCode: "80909",
            phone: "+1 719-574-9844",
            lat: 38.8572,
            lng: -104.7562,
            mapDirectionUrl: "https://maps.google.com/?q=1725+N+Academy+Blvd,+Colorado+Springs,+CO+80909",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Delaware",
    stateSlug: "delaware",
    stateCode: "DE",
    branchCount: 2,
    cities: [
      {
        cityName: "Newark",
        citySlug: "newark",
        storeCount: 2,
        stores: [
          {
            name: "Waffle House Newark S College",
            image: locImg8,
            slug: "newark-college",
            address: "1450 S College Ave",
            city: "Newark",
            state: "Delaware",
            stateCode: "DE",
            zipCode: "19713",
            phone: "+1 302-368-9440",
            lat: 39.6481,
            lng: -75.7512,
            mapDirectionUrl: "https://maps.google.com/?q=1450+S+College+Ave,+Newark,+DE+19713",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Florida",
    stateSlug: "florida",
    stateCode: "FL",
    branchCount: 185,
    cities: [
      {
        cityName: "Jacksonville",
        citySlug: "jacksonville",
        storeCount: 24,
        stores: [
          {
            name: "Waffle House Jacksonville Downtown",
            image: locImg5,
            slug: "jacksonville-downtown",
            address: "100 W Adams St",
            city: "Jacksonville",
            state: "Florida",
            stateCode: "FL",
            zipCode: "32202",
            phone: "+1 904-355-6677",
            lat: 30.3289,
            lng: -81.6599,
            mapDirectionUrl: "https://maps.google.com/?q=100+W+Adams+St,+Jacksonville,+FL+32202",
            doordashUrl: "https://www.doordash.com/store/waffle-house-jacksonville-732385/",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          },
          {
            name: "Waffle House Jacksonville Beach Blvd",
            image: locImg1,
            slug: "jacksonville-beach-blvd",
            address: "10150 Beach Blvd",
            city: "Jacksonville",
            state: "Florida",
            stateCode: "FL",
            zipCode: "32246",
            phone: "+1 904-642-1200",
            lat: 30.2882,
            lng: -81.5312,
            mapDirectionUrl: "https://maps.google.com/?q=10150+Beach+Blvd,+Jacksonville,+FL+32246",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Orlando",
        citySlug: "orlando",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Orlando International Dr",
            image: locImg2,
            slug: "orlando-international-dr",
            address: "5350 International Dr",
            city: "Orlando",
            state: "Florida",
            stateCode: "FL",
            zipCode: "32819",
            phone: "+1 407-352-8500",
            lat: 28.4682,
            lng: -81.4512,
            mapDirectionUrl: "https://maps.google.com/?q=5350+International+Dr,+Orlando,+FL+32819",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Tampa",
        citySlug: "tampa",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Tampa Hillsborough",
            image: locImg3,
            slug: "tampa-hillsborough",
            address: "4702 E Hillsborough Ave",
            city: "Tampa",
            state: "Florida",
            stateCode: "FL",
            zipCode: "33610",
            phone: "+1 813-621-4114",
            lat: 27.9961,
            lng: -82.4012,
            mapDirectionUrl: "https://maps.google.com/?q=4702+E+Hillsborough+Ave,+Tampa,+FL+33610",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Tallahassee",
        citySlug: "tallahassee",
        storeCount: 10,
        stores: [
          {
            name: "Waffle House Tallahassee FSU Strip",
            image: locImg4,
            slug: "tallahassee-tennessee-st",
            address: "2115 W Tennessee St",
            city: "Tallahassee",
            state: "Florida",
            stateCode: "FL",
            zipCode: "32304",
            phone: "+1 850-575-2550",
            lat: 30.4501,
            lng: -84.3215,
            mapDirectionUrl: "https://maps.google.com/?q=2115+W+Tennessee+St,+Tallahassee,+FL+32304",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Georgia",
    stateSlug: "georgia",
    stateCode: "GA",
    branchCount: 435,
    cities: [
      {
        cityName: "Atlanta",
        citySlug: "atlanta",
        storeCount: 48,
        stores: [
          {
            name: "Waffle House Downtown Atlanta",
            image: locImg1,
            slug: "downtown-atlanta",
            address: "135 Andrew Young International Blvd NW",
            city: "Atlanta",
            state: "Georgia",
            stateCode: "GA",
            zipCode: "30303",
            phone: "+1 404-522-8355",
            lat: 33.7599,
            lng: -84.3888,
            mapDirectionUrl: "https://maps.google.com/?q=135+Andrew+Young+International+Blvd+NW,+Atlanta,+GA+30303",
            doordashUrl: "https://www.doordash.com/store/waffle-house-atlanta-732381/",
            ubereatsUrl: "https://www.ubereats.com/store/waffle-house-135-andrew-young/",
            grubhubUrl: "https://www.grubhub.com/restaurant/waffle-house-135-andrew-young-blvd-nw-atlanta/2381273",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours (Including Thanksgiving & Christmas)" }
          },
          {
            name: "Waffle House Midtown Atlanta",
            image: locImg2,
            slug: "midtown-atlanta",
            address: "100 10th St NW",
            city: "Atlanta",
            state: "Georgia",
            stateCode: "GA",
            zipCode: "30309",
            phone: "+1 404-874-5544",
            lat: 33.7815,
            lng: -84.3892,
            mapDirectionUrl: "https://maps.google.com/?q=100+10th+St+NW,+Atlanta,+GA+30309",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          },
          {
            name: "Waffle House Tech Square",
            image: locImg6,
            slug: "atlanta-tech-square",
            address: "66 5th St NW",
            city: "Atlanta",
            state: "Georgia",
            stateCode: "GA",
            zipCode: "30308",
            phone: "+1 404-872-9220",
            lat: 33.7772,
            lng: -84.3895,
            mapDirectionUrl: "https://maps.google.com/?q=66+5th+St+NW,+Atlanta,+GA+30308",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Savannah",
        citySlug: "savannah",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Savannah Historic District",
            image: locImg3,
            slug: "savannah-historic-district",
            address: "318 W Bay St",
            city: "Savannah",
            state: "Georgia",
            stateCode: "GA",
            zipCode: "31401",
            phone: "+1 912-236-4148",
            lat: 32.0815,
            lng: -81.0967,
            mapDirectionUrl: "https://maps.google.com/?q=318+W+Bay+St,+Savannah,+GA+31401",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Augusta",
        citySlug: "augusta",
        storeCount: 18,
        stores: [
          {
            name: "Waffle House Augusta Washington Rd",
            image: locImg4,
            slug: "augusta-washington-rd",
            address: "2821 Washington Rd",
            city: "Augusta",
            state: "Georgia",
            stateCode: "GA",
            zipCode: "30909",
            phone: "+1 706-738-9844",
            lat: 33.5112,
            lng: -82.0415,
            mapDirectionUrl: "https://maps.google.com/?q=2821+Washington+Rd,+Augusta,+GA+30909",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Columbus",
        citySlug: "columbus",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Columbus Airport Thruway",
            image: locImg5,
            slug: "columbus-airport-thruway",
            address: "2905 Airport Thruway",
            city: "Columbus",
            state: "Georgia",
            stateCode: "GA",
            zipCode: "31909",
            phone: "+1 706-324-4411",
            lat: 32.5182,
            lng: -84.9562,
            mapDirectionUrl: "https://maps.google.com/?q=2905+Airport+Thruway,+Columbus,+GA+31909",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Illinois",
    stateSlug: "illinois",
    stateCode: "IL",
    branchCount: 10,
    cities: [
      {
        cityName: "Collinsville",
        citySlug: "collinsville",
        storeCount: 2,
        stores: [
          {
            name: "Waffle House Collinsville Beltline",
            image: locImg7,
            slug: "collinsville-beltline",
            address: "604 S Morrison Ave",
            city: "Collinsville",
            state: "Illinois",
            stateCode: "IL",
            zipCode: "62234",
            phone: "+1 618-344-9330",
            lat: 38.6651,
            lng: -89.9882,
            mapDirectionUrl: "https://maps.google.com/?q=604+S+Morrison+Ave,+Collinsville,+IL+62234",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Indiana",
    stateSlug: "indiana",
    stateCode: "IN",
    branchCount: 26,
    cities: [
      {
        cityName: "Indianapolis",
        citySlug: "indianapolis",
        storeCount: 12,
        stores: [
          {
            name: "Waffle House Indianapolis Southport",
            image: locImg8,
            slug: "indianapolis-southport",
            address: "7125 S Keystone Ave",
            city: "Indianapolis",
            state: "Indiana",
            stateCode: "IN",
            zipCode: "46227",
            phone: "+1 317-786-9040",
            lat: 39.6642,
            lng: -86.1102,
            mapDirectionUrl: "https://maps.google.com/?q=7125+S+Keystone+Ave,+Indianapolis,+IN+46227",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Kansas",
    stateSlug: "kansas",
    stateCode: "KS",
    branchCount: 8,
    cities: [
      {
        cityName: "Overland Park",
        citySlug: "overland-park",
        storeCount: 3,
        stores: [
          {
            name: "Waffle House Overland Park 95th",
            image: locImg1,
            slug: "overland-park-95th",
            address: "9510 Metcalf Ave",
            city: "Overland Park",
            state: "Kansas",
            stateCode: "KS",
            zipCode: "66212",
            phone: "+1 913-642-9844",
            lat: 38.9562,
            lng: -94.6681,
            mapDirectionUrl: "https://maps.google.com/?q=9510+Metcalf+Ave,+Overland+Park,+KS+66212",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Kentucky",
    stateSlug: "kentucky",
    stateCode: "KY",
    branchCount: 64,
    cities: [
      {
        cityName: "Louisville",
        citySlug: "louisville",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Louisville Preston Hwy",
            image: locImg2,
            slug: "louisville-preston",
            address: "4920 Preston Hwy",
            city: "Louisville",
            state: "Kentucky",
            stateCode: "KY",
            zipCode: "40213",
            phone: "+1 502-964-9110",
            lat: 38.1682,
            lng: -85.7182,
            mapDirectionUrl: "https://maps.google.com/?q=4920+Preston+Hwy,+Louisville,+KY+40213",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Lexington",
        citySlug: "lexington",
        storeCount: 10,
        stores: [
          {
            name: "Waffle House Lexington Broadway",
            image: locImg3,
            slug: "lexington-broadway",
            address: "857 S Broadway",
            city: "Lexington",
            state: "Kentucky",
            stateCode: "KY",
            zipCode: "40504",
            phone: "+1 859-254-9440",
            lat: 38.0412,
            lng: -84.5121,
            mapDirectionUrl: "https://maps.google.com/?q=857+S+Broadway,+Lexington,+KY+40504",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Louisiana",
    stateSlug: "louisiana",
    stateCode: "LA",
    branchCount: 53,
    cities: [
      {
        cityName: "Baton Rouge",
        citySlug: "baton-rouge",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Baton Rouge College Dr",
            image: locImg4,
            slug: "baton-rouge-college-dr",
            address: "2445 College Dr",
            city: "Baton Rouge",
            state: "Louisiana",
            stateCode: "LA",
            zipCode: "70808",
            phone: "+1 225-927-4411",
            lat: 30.4215,
            lng: -91.1392,
            mapDirectionUrl: "https://maps.google.com/?q=2445+College+Dr,+Baton+Rouge,+LA+70808",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "New Orleans (Metairie)",
        citySlug: "metairie",
        storeCount: 8,
        stores: [
          {
            name: "Waffle House Metairie Veterans",
            image: locImg5,
            slug: "metairie-veterans",
            address: "4724 Veterans Memorial Blvd",
            city: "Metairie",
            state: "Louisiana",
            stateCode: "LA",
            zipCode: "70006",
            phone: "+1 504-887-9922",
            lat: 30.0051,
            lng: -90.1812,
            mapDirectionUrl: "https://maps.google.com/?q=4724+Veterans+Memorial+Blvd,+Metairie,+LA+70006",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Maryland",
    stateSlug: "maryland",
    stateCode: "MD",
    branchCount: 14,
    cities: [
      {
        cityName: "Baltimore Area (Elkton)",
        citySlug: "elkton",
        storeCount: 4,
        stores: [
          {
            name: "Waffle House Elkton Pulaski Hwy",
            image: locImg6,
            slug: "elkton-pulaski",
            address: "800 Pulaski Hwy",
            city: "Elkton",
            state: "Maryland",
            stateCode: "MD",
            zipCode: "21921",
            phone: "+1 410-398-9440",
            lat: 39.5982,
            lng: -75.8315,
            mapDirectionUrl: "https://maps.google.com/?q=800+Pulaski+Hwy,+Elkton,+MD+21921",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Mississippi",
    stateSlug: "mississippi",
    stateCode: "MS",
    branchCount: 92,
    cities: [
      {
        cityName: "Jackson",
        citySlug: "jackson",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Jackson High St",
            image: locImg7,
            slug: "jackson-high-st",
            address: "820 High St",
            city: "Jackson",
            state: "Mississippi",
            stateCode: "MS",
            zipCode: "39202",
            phone: "+1 601-352-8811",
            lat: 32.3082,
            lng: -90.1762,
            mapDirectionUrl: "https://maps.google.com/?q=820+High+St,+Jackson,+MS+39202",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Gulfport / Biloxi",
        citySlug: "gulfport",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Biloxi Beach Blvd",
            image: locImg8,
            slug: "biloxi-beach-blvd",
            address: "1720 Beach Blvd",
            city: "Biloxi",
            state: "Mississippi",
            stateCode: "MS",
            zipCode: "39531",
            phone: "+1 228-388-9140",
            lat: 30.3951,
            lng: -88.9412,
            mapDirectionUrl: "https://maps.google.com/?q=1720+Beach+Blvd,+Biloxi,+MS+39531",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Missouri",
    stateSlug: "missouri",
    stateCode: "MO",
    branchCount: 42,
    cities: [
      {
        cityName: "St. Louis",
        citySlug: "st-louis",
        storeCount: 15,
        stores: [
          {
            name: "Waffle House St. Louis Hampton Ave",
            image: locImg1,
            slug: "st-louis-hampton",
            address: "3235 Hampton Ave",
            city: "St. Louis",
            state: "Missouri",
            stateCode: "MO",
            zipCode: "63139",
            phone: "+1 314-644-4411",
            lat: 38.6012,
            lng: -90.2852,
            mapDirectionUrl: "https://maps.google.com/?q=3235+Hampton+Ave,+St.+Louis,+MO+63139",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Kansas City",
        citySlug: "kansas-city",
        storeCount: 12,
        stores: [
          {
            name: "Waffle House Kansas City Front St",
            image: locImg2,
            slug: "kansas-city-front-st",
            address: "1801 Universal Ave",
            city: "Kansas City",
            state: "Missouri",
            stateCode: "MO",
            zipCode: "64120",
            phone: "+1 816-483-9110",
            lat: 39.1315,
            lng: -94.5125,
            mapDirectionUrl: "https://maps.google.com/?q=1801+Universal+Ave,+Kansas+City,+MO+64120",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "New Mexico",
    stateSlug: "new-mexico",
    stateCode: "NM",
    branchCount: 6,
    cities: [
      {
        cityName: "Albuquerque",
        citySlug: "albuquerque",
        storeCount: 4,
        stores: [
          {
            name: "Waffle House Albuquerque Coors",
            image: locImg3,
            slug: "albuquerque-coors",
            address: "2410 Coors Blvd NW",
            city: "Albuquerque",
            state: "New Mexico",
            stateCode: "NM",
            zipCode: "87120",
            phone: "+1 505-836-9210",
            lat: 35.1112,
            lng: -106.7021,
            mapDirectionUrl: "https://maps.google.com/?q=2410+Coors+Blvd+NW,+Albuquerque,+NM+87120",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
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
        storeCount: 28,
        stores: [
          {
            name: "Waffle House Charlotte Uptown",
            image: locImg4,
            slug: "charlotte-uptown",
            address: "330 N Tryon St",
            city: "Charlotte",
            state: "North Carolina",
            stateCode: "NC",
            zipCode: "28202",
            phone: "+1 704-377-0909",
            lat: 35.2289,
            lng: -80.8402,
            mapDirectionUrl: "https://maps.google.com/?q=330+N+Tryon+St,+Charlotte,+NC+28202",
            doordashUrl: "https://www.doordash.com/store/waffle-house-charlotte-732384/",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          },
          {
            name: "Waffle House Charlotte South Blvd",
            image: locImg5,
            slug: "charlotte-south-blvd",
            address: "4725 South Blvd",
            city: "Charlotte",
            state: "North Carolina",
            stateCode: "NC",
            zipCode: "28217",
            phone: "+1 704-523-9220",
            lat: 35.1782,
            lng: -80.8752,
            mapDirectionUrl: "https://maps.google.com/?q=4725+South+Blvd,+Charlotte,+NC+28217",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Raleigh",
        citySlug: "raleigh",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Raleigh Hillsborough",
            image: locImg6,
            slug: "raleigh-hillsborough",
            address: "3909 Hillsborough St",
            city: "Raleigh",
            state: "North Carolina",
            stateCode: "NC",
            zipCode: "27607",
            phone: "+1 919-834-8840",
            lat: 35.7925,
            lng: -78.6912,
            mapDirectionUrl: "https://maps.google.com/?q=3909+Hillsborough+St,+Raleigh,+NC+27607",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Greensboro",
        citySlug: "greensboro",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Greensboro High Point Rd",
            image: locImg7,
            slug: "greensboro-high-point",
            address: "2408 Gate City Blvd",
            city: "Greensboro",
            state: "North Carolina",
            stateCode: "NC",
            zipCode: "27403",
            phone: "+1 336-292-4410",
            lat: 36.0451,
            lng: -79.8312,
            mapDirectionUrl: "https://maps.google.com/?q=2408+Gate+City+Blvd,+Greensboro,+NC+27403",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Ohio",
    stateSlug: "ohio",
    stateCode: "OH",
    branchCount: 82,
    cities: [
      {
        cityName: "Columbus",
        citySlug: "columbus",
        storeCount: 22,
        stores: [
          {
            name: "Waffle House Columbus OSU High St",
            image: locImg8,
            slug: "columbus-osu-high-st",
            address: "1712 N High St",
            city: "Columbus",
            state: "Ohio",
            stateCode: "OH",
            zipCode: "43201",
            phone: "+1 614-299-9220",
            lat: 39.9982,
            lng: -83.0075,
            mapDirectionUrl: "https://maps.google.com/?q=1712+N+High+St,+Columbus,+OH+43201",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Cincinnati",
        citySlug: "cincinnati",
        storeCount: 18,
        stores: [
          {
            name: "Waffle House Cincinnati Ridge Rd",
            image: locImg1,
            slug: "cincinnati-ridge-rd",
            address: "3295 Ridge Ave",
            city: "Cincinnati",
            state: "Ohio",
            stateCode: "OH",
            zipCode: "45213",
            phone: "+1 513-531-9840",
            lat: 39.1762,
            lng: -84.4215,
            mapDirectionUrl: "https://maps.google.com/?q=3295+Ridge+Ave,+Cincinnati,+OH+45213",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Dayton",
        citySlug: "dayton",
        storeCount: 12,
        stores: [
          {
            name: "Waffle House Dayton Miller Ln",
            image: locImg2,
            slug: "dayton-miller-ln",
            address: "6800 Miller Ln",
            city: "Dayton",
            state: "Ohio",
            stateCode: "OH",
            zipCode: "45414",
            phone: "+1 937-890-4411",
            lat: 39.8315,
            lng: -84.1852,
            mapDirectionUrl: "https://maps.google.com/?q=6800+Miller+Ln,+Dayton,+OH+45414",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Oklahoma",
    stateSlug: "oklahoma",
    stateCode: "OK",
    branchCount: 32,
    cities: [
      {
        cityName: "Oklahoma City",
        citySlug: "oklahoma-city",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House OKC Meridian",
            image: locImg3,
            slug: "okc-meridian",
            address: "700 S Meridian Ave",
            city: "Oklahoma City",
            state: "Oklahoma",
            stateCode: "OK",
            zipCode: "73108",
            phone: "+1 405-946-8811",
            lat: 35.4592,
            lng: -97.6015,
            mapDirectionUrl: "https://maps.google.com/?q=700+S+Meridian+Ave,+Oklahoma+City,+OK+73108",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Tulsa",
        citySlug: "tulsa",
        storeCount: 10,
        stores: [
          {
            name: "Waffle House Tulsa Memorial",
            image: locImg4,
            slug: "tulsa-memorial",
            address: "7108 S Memorial Dr",
            city: "Tulsa",
            state: "Oklahoma",
            stateCode: "OK",
            zipCode: "74133",
            phone: "+1 918-250-9440",
            lat: 36.0592,
            lng: -95.8862,
            mapDirectionUrl: "https://maps.google.com/?q=7108+S+Memorial+Dr,+Tulsa,+OK+74133",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Pennsylvania",
    stateSlug: "pennsylvania",
    stateCode: "PA",
    branchCount: 12,
    cities: [
      {
        cityName: "Allentown / Bethlehem",
        citySlug: "allentown",
        storeCount: 4,
        stores: [
          {
            name: "Waffle House Bethlehem Airport",
            image: locImg5,
            slug: "bethlehem-airport",
            address: "2161 Schoenersville Rd",
            city: "Bethlehem",
            state: "Pennsylvania",
            stateCode: "PA",
            zipCode: "18017",
            phone: "+1 610-867-9220",
            lat: 40.6481,
            lng: -75.4012,
            mapDirectionUrl: "https://maps.google.com/?q=2161+Schoenersville+Rd,+Bethlehem,+PA+18017",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Lancaster",
        citySlug: "lancaster",
        storeCount: 3,
        stores: [
          {
            name: "Waffle House Lancaster Lincoln Hwy",
            image: locImg6,
            slug: "lancaster-lincoln-hwy",
            address: "2123 Lincoln Hwy E",
            city: "Lancaster",
            state: "Pennsylvania",
            stateCode: "PA",
            zipCode: "17602",
            phone: "+1 717-393-9440",
            lat: 40.0215,
            lng: -76.2415,
            mapDirectionUrl: "https://maps.google.com/?q=2123+Lincoln+Hwy+E,+Lancaster,+PA+17602",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "South Carolina",
    stateSlug: "south-carolina",
    stateCode: "SC",
    branchCount: 172,
    cities: [
      {
        cityName: "Columbia",
        citySlug: "columbia",
        storeCount: 26,
        stores: [
          {
            name: "Waffle House Columbia Five Points",
            image: locImg7,
            slug: "columbia-five-points",
            address: "740 Harden St",
            city: "Columbia",
            state: "South Carolina",
            stateCode: "SC",
            zipCode: "29205",
            phone: "+1 803-779-1144",
            lat: 34.0015,
            lng: -81.0115,
            mapDirectionUrl: "https://maps.google.com/?q=740+Harden+St,+Columbia,+SC+29205",
            doordashUrl: "https://www.doordash.com/store/waffle-house-columbia-732387/",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Charleston",
        citySlug: "charleston",
        storeCount: 22,
        stores: [
          {
            name: "Waffle House Charleston Savannah Hwy",
            image: locImg8,
            slug: "charleston-savannah-hwy",
            address: "1831 Savannah Hwy",
            city: "Charleston",
            state: "South Carolina",
            stateCode: "SC",
            zipCode: "29407",
            phone: "+1 843-766-9110",
            lat: 32.7812,
            lng: -80.0015,
            mapDirectionUrl: "https://maps.google.com/?q=1831+Savannah+Hwy,+Charleston,+SC+29407",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Greenville",
        citySlug: "greenville",
        storeCount: 18,
        stores: [
          {
            name: "Waffle House Greenville Laurens Rd",
            image: locImg1,
            slug: "greenville-laurens",
            address: "1002 Laurens Rd",
            city: "Greenville",
            state: "South Carolina",
            stateCode: "SC",
            zipCode: "29607",
            phone: "+1 864-233-9220",
            lat: 34.8415,
            lng: -82.3812,
            mapDirectionUrl: "https://maps.google.com/?q=1002+Laurens+Rd,+Greenville,+SC+29607",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Myrtle Beach",
        citySlug: "myrtle-beach",
        storeCount: 15,
        stores: [
          {
            name: "Waffle House Myrtle Beach Kings Hwy",
            image: locImg2,
            slug: "myrtle-beach-kings-hwy",
            address: "110 N Kings Hwy",
            city: "Myrtle Beach",
            state: "South Carolina",
            stateCode: "SC",
            zipCode: "29577",
            phone: "+1 843-448-9110",
            lat: 33.6912,
            lng: -78.8815,
            mapDirectionUrl: "https://maps.google.com/?q=110+N+Kings+Hwy,+Myrtle+Beach,+SC+29577",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Tennessee",
    stateSlug: "tennessee",
    stateCode: "TN",
    branchCount: 134,
    cities: [
      {
        cityName: "Nashville",
        citySlug: "nashville",
        storeCount: 26,
        stores: [
          {
            name: "Waffle House Nashville West End (Vanderbilt)",
            image: locImg3,
            slug: "nashville-west-end",
            address: "2104 West End Ave",
            city: "Nashville",
            state: "Tennessee",
            stateCode: "TN",
            zipCode: "37203",
            phone: "+1 615-329-9110",
            lat: 36.1512,
            lng: -86.8015,
            mapDirectionUrl: "https://maps.google.com/?q=2104+West+End+Ave,+Nashville,+TN+37203",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          },
          {
            name: "Waffle House Nashville Music Valley",
            image: locImg4,
            slug: "nashville-music-valley",
            address: "2416 Music Valley Dr",
            city: "Nashville",
            state: "Tennessee",
            stateCode: "TN",
            zipCode: "37214",
            phone: "+1 615-889-4411",
            lat: 36.2182,
            lng: -86.6912,
            mapDirectionUrl: "https://maps.google.com/?q=2416+Music+Valley+Dr,+Nashville,+TN+37214",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Memphis",
        citySlug: "memphis",
        storeCount: 22,
        stores: [
          {
            name: "Waffle House Memphis Union Ave",
            image: locImg5,
            slug: "memphis-union-ave",
            address: "1631 Union Ave",
            city: "Memphis",
            state: "Tennessee",
            stateCode: "TN",
            zipCode: "38104",
            phone: "+1 901-274-9844",
            lat: 35.1362,
            lng: -90.0125,
            mapDirectionUrl: "https://maps.google.com/?q=1631+Union+Ave,+Memphis,+TN+38104",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Knoxville",
        citySlug: "knoxville",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Knoxville Cumberland (UT)",
            image: locImg6,
            slug: "knoxville-cumberland",
            address: "1840 Cumberland Ave",
            city: "Knoxville",
            state: "Tennessee",
            stateCode: "TN",
            zipCode: "37916",
            phone: "+1 865-524-9110",
            lat: 35.9551,
            lng: -83.9382,
            mapDirectionUrl: "https://maps.google.com/?q=1840+Cumberland+Ave,+Knoxville,+TN+37916",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: false },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Chattanooga",
        citySlug: "chattanooga",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Chattanooga Brainerd Rd",
            image: locImg7,
            slug: "chattanooga-brainerd",
            address: "4920 Brainerd Rd",
            city: "Chattanooga",
            state: "Tennessee",
            stateCode: "TN",
            zipCode: "37411",
            phone: "+1 423-622-4411",
            lat: 35.0112,
            lng: -85.2215,
            mapDirectionUrl: "https://maps.google.com/?q=4920+Brainerd+Rd,+Chattanooga,+TN+37411",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Texas",
    stateSlug: "texas",
    stateCode: "TX",
    branchCount: 122,
    cities: [
      {
        cityName: "Houston",
        citySlug: "houston",
        storeCount: 32,
        stores: [
          {
            name: "Waffle House Houston Central (Southwest Fwy)",
            image: locImg8,
            slug: "houston-central",
            address: "2202 Southwest Fwy",
            city: "Houston",
            state: "Texas",
            stateCode: "TX",
            zipCode: "77098",
            phone: "+1 713-520-5544",
            lat: 29.7315,
            lng: -95.4115,
            mapDirectionUrl: "https://maps.google.com/?q=2202+Southwest+Fwy,+Houston,+TX+77098",
            doordashUrl: "https://www.doordash.com/store/waffle-house-houston-732388/",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          },
          {
            name: "Waffle House Houston Westheimer",
            image: locImg1,
            slug: "houston-westheimer",
            address: "10901 Westheimer Rd",
            city: "Houston",
            state: "Texas",
            stateCode: "TX",
            zipCode: "77042",
            phone: "+1 713-784-9110",
            lat: 29.7362,
            lng: -95.5682,
            mapDirectionUrl: "https://maps.google.com/?q=10901+Westheimer+Rd,+Houston,+TX+77042",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Dallas",
        citySlug: "dallas",
        storeCount: 22,
        stores: [
          {
            name: "Waffle House Dallas Stemmons Fwy",
            image: locImg2,
            slug: "dallas-stemmons",
            address: "2444 N Stemmons Fwy",
            city: "Dallas",
            state: "Texas",
            stateCode: "TX",
            zipCode: "75207",
            phone: "+1 214-630-9440",
            lat: 32.7982,
            lng: -96.8315,
            mapDirectionUrl: "https://maps.google.com/?q=2444+N+Stemmons+Fwy,+Dallas,+TX+75207",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Austin",
        citySlug: "austin",
        storeCount: 14,
        stores: [
          {
            name: "Waffle House Austin Ben White",
            image: locImg3,
            slug: "austin-ben-white",
            address: "7809 E Ben White Blvd",
            city: "Austin",
            state: "Texas",
            stateCode: "TX",
            zipCode: "78741",
            phone: "+1 512-385-9844",
            lat: 30.2215,
            lng: -97.6912,
            mapDirectionUrl: "https://maps.google.com/?q=7809+E+Ben+White+Blvd,+Austin,+TX+78741",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "San Antonio",
        citySlug: "san-antonio",
        storeCount: 12,
        stores: [
          {
            name: "Waffle House San Antonio Walzem",
            image: locImg4,
            slug: "san-antonio-walzem",
            address: "5202 Walzem Rd",
            city: "San Antonio",
            state: "Texas",
            stateCode: "TX",
            zipCode: "78218",
            phone: "+1 210-655-4411",
            lat: 29.5082,
            lng: -98.3912,
            mapDirectionUrl: "https://maps.google.com/?q=5202+Walzem+Rd,+San+Antonio,+TX+78218",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "Virginia",
    stateSlug: "virginia",
    stateCode: "VA",
    branchCount: 76,
    cities: [
      {
        cityName: "Richmond",
        citySlug: "richmond",
        storeCount: 16,
        stores: [
          {
            name: "Waffle House Richmond Broad St",
            image: locImg5,
            slug: "richmond-broad-st",
            address: "4715 W Broad St",
            city: "Richmond",
            state: "Virginia",
            stateCode: "VA",
            zipCode: "23230",
            phone: "+1 804-353-9110",
            lat: 37.5782,
            lng: -77.4912,
            mapDirectionUrl: "https://maps.google.com/?q=4715+W+Broad+St,+Richmond,+VA+23230",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      },
      {
        cityName: "Virginia Beach / Norfolk",
        citySlug: "virginia-beach",
        storeCount: 18,
        stores: [
          {
            name: "Waffle House Virginia Beach Blvd",
            image: locImg6,
            slug: "virginia-beach-blvd",
            address: "3804 Virginia Beach Blvd",
            city: "Virginia Beach",
            state: "Virginia",
            stateCode: "VA",
            zipCode: "23452",
            phone: "+1 757-498-9440",
            lat: 36.8482,
            lng: -76.0815,
            mapDirectionUrl: "https://maps.google.com/?q=3804+Virginia+Beach+Blvd,+Virginia+Beach,+VA+23452",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
          }
        ]
      }
    ]
  },
  {
    stateName: "West Virginia",
    stateSlug: "west-virginia",
    stateCode: "WV",
    branchCount: 15,
    cities: [
      {
        cityName: "Charleston",
        citySlug: "charleston",
        storeCount: 4,
        stores: [
          {
            name: "Waffle House Charleston MacCorkle Ave",
            image: locImg7,
            slug: "charleston-maccorkle",
            address: "3901 MacCorkle Ave SE",
            city: "Charleston",
            state: "West Virginia",
            stateCode: "WV",
            zipCode: "25304",
            phone: "+1 304-925-9844",
            lat: 38.3182,
            lng: -81.5912,
            mapDirectionUrl: "https://maps.google.com/?q=3901+MacCorkle+Ave+SE,+Charleston,+WV+25304",
            amenities: { takeout: true, delivery: true, dining24h: true, wheelchair: true, counterSeating: true, parking: true },
            hours: { weekdays: "Open 24 Hours", weekends: "Open 24 Hours", holidays: "Open 24 Hours" }
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
