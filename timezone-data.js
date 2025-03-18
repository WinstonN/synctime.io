const timezoneData = [
    {
        city: "UTC",
        country: "Universal Time Coordinated",
        timezone: "UTC",
        utcOffset: "+00:00",
        coordinates: { latitude: 0, longitude: 0 }
    },
    {
        city: "UTC-11",
        country: "Samoa Standard Time",
        timezone: "Pacific/Samoa",
        utcOffset: "-11:00",
        coordinates: { latitude: -14.2770, longitude: -170.7020 }
    },
    {
        city: "UTC-10",
        country: "Hawaii-Aleutian Standard Time",
        timezone: "Pacific/Honolulu",
        utcOffset: "-10:00",
        coordinates: { latitude: 21.3069, longitude: -157.8583 }
    },
    {
        city: "UTC-9:30",
        country: "Marquesas Islands Time",
        timezone: "Pacific/Marquesas",
        utcOffset: "-09:30",
        coordinates: { latitude: -9.7800, longitude: -139.0817 }
    },
    {
        city: "UTC-9",
        country: "Alaska Standard Time",
        timezone: "America/Anchorage",
        utcOffset: "-09:00",
        coordinates: { latitude: 61.2181, longitude: -149.9003 }
    },
    {
        city: "UTC-8",
        country: "Pacific Standard Time",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00",
        coordinates: { latitude: 34.0522, longitude: -118.2437 }
    },
    {
        city: "UTC-7",
        country: "Mountain Standard Time",
        timezone: "America/Denver",
        utcOffset: "-07:00",
        coordinates: { latitude: 39.7392, longitude: -104.9903 }
    },
    {
        city: "UTC-6",
        country: "Central Standard Time",
        timezone: "America/Chicago",
        utcOffset: "-06:00",
        coordinates: { latitude: 41.8781, longitude: -87.6298 }
    },
    {
        city: "UTC-5",
        country: "Eastern Standard Time",
        timezone: "America/New_York",
        utcOffset: "-05:00",
        coordinates: { latitude: 40.7128, longitude: -74.0060 }
    },
    {
        city: "UTC-4",
        country: "Atlantic Standard Time",
        timezone: "America/Halifax",
        utcOffset: "-04:00",
        coordinates: { latitude: 44.6488, longitude: -63.5752 }
    },
    {
        city: "UTC-3:30",
        country: "Newfoundland Standard Time",
        timezone: "America/St_Johns",
        utcOffset: "-03:30",
        coordinates: { latitude: 47.5615, longitude: -52.7126 }
    },
    {
        city: "UTC-3",
        country: "Argentina Standard Time",
        timezone: "America/Argentina/Buenos_Aires",
        utcOffset: "-03:00",
        coordinates: { latitude: -34.6037, longitude: -58.3816 }
    },
    {
        city: "UTC-2",
        country: "Fernando de Noronha Time",
        timezone: "America/Noronha",
        utcOffset: "-02:00",
        coordinates: { latitude: -3.8542, longitude: -32.4248 }
    },
    {
        city: "UTC-1",
        country: "Azores Standard Time",
        timezone: "Atlantic/Azores",
        utcOffset: "-01:00",
        coordinates: { latitude: 37.7412, longitude: -25.6756 }
    },
    {
        city: "UTC+0",
        country: "Greenwich Mean Time",
        timezone: "Etc/GMT",
        utcOffset: "+00:00",
        coordinates: { latitude: 51.4779, longitude: -0.0015 }
    },
    {
        city: "UTC+1",
        country: "Central European Time",
        timezone: "Europe/Paris",
        utcOffset: "+01:00",
        coordinates: { latitude: 48.8566, longitude: 2.3522 }
    },
    {
        city: "UTC+2",
        country: "Eastern European Time",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00",
        coordinates: { latitude: 50.4501, longitude: 30.5234 }
    },
    {
        city: "UTC+3",
        country: "Moscow Standard Time",
        timezone: "Europe/Moscow",
        utcOffset: "+03:00",
        coordinates: { latitude: 55.7558, longitude: 37.6173 }
    },
    {
        city: "UTC+3:30",
        country: "Iran Standard Time",
        timezone: "Asia/Tehran",
        utcOffset: "+03:30",
        coordinates: { latitude: 35.6892, longitude: 51.3890 }
    },
    {
        city: "UTC+4",
        country: "Gulf Standard Time",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00",
        coordinates: { latitude: 25.2048, longitude: 55.2708 }
    },
    {
        city: "UTC+4:30",
        country: "Afghanistan Time",
        timezone: "Asia/Kabul",
        utcOffset: "+04:30",
        coordinates: { latitude: 34.5553, longitude: 69.2075 }
    },
    {
        city: "UTC+5",
        country: "Pakistan Standard Time",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00",
        coordinates: { latitude: 24.8607, longitude: 67.0011 }
    },
    {
        city: "UTC+5:30",
        country: "India Standard Time",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 22.5726, longitude: 88.3639 }
    },
    {
        city: "UTC+5:45",
        country: "Nepal Time",
        timezone: "Asia/Kathmandu",
        utcOffset: "+05:45",
        coordinates: { latitude: 27.7172, longitude: 85.3240 }
    },
    {
        city: "UTC+6",
        country: "Bangladesh Standard Time",
        timezone: "Asia/Dhaka",
        utcOffset: "+06:00",
        coordinates: { latitude: 23.8103, longitude: 90.4125 }
    },
    {
        city: "UTC+6:30",
        country: "Myanmar Time",
        timezone: "Asia/Yangon",
        utcOffset: "+06:30",
        coordinates: { latitude: 16.8661, longitude: 96.1951 }
    },
    {
        city: "UTC+7",
        country: "Indochina Time",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00",
        coordinates: { latitude: 13.7563, longitude: 100.5018 }
    },
    {
        city: "UTC+8",
        country: "China Standard Time",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 31.2304, longitude: 121.4737 }
    },
    {
        city: "UTC+8:45",
        country: "Australian Central Western Time",
        timezone: "Australia/Eucla",
        utcOffset: "+08:45",
        coordinates: { latitude: -31.6777, longitude: 128.8853 }
    },
    {
        city: "UTC+9",
        country: "Japan Standard Time",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 35.6762, longitude: 139.6503 }
    },
    {
        city: "UTC+9:30",
        country: "Australian Central Standard Time",
        timezone: "Australia/Darwin",
        utcOffset: "+09:30",
        coordinates: { latitude: -12.4634, longitude: 130.8456 }
    },
    {
        city: "UTC+10",
        country: "Australian Eastern Standard Time",
        timezone: "Australia/Sydney",
        utcOffset: "+10:00",
        coordinates: { latitude: -33.8688, longitude: 151.2093 }
    },
    {
        city: "UTC+10:30",
        country: "Lord Howe Standard Time",
        timezone: "Australia/Lord_Howe",
        utcOffset: "+10:30",
        coordinates: { latitude: -31.5533, longitude: 159.0828 }
    },
    {
        city: "UTC+11",
        country: "Solomon Islands Time",
        timezone: "Pacific/Guadalcanal",
        utcOffset: "+11:00",
        coordinates: { latitude: -9.4456, longitude: 159.9728 }
    },
    {
        city: "UTC+12",
        country: "New Zealand Standard Time",
        timezone: "Pacific/Auckland",
        utcOffset: "+12:00",
        coordinates: { latitude: -36.8509, longitude: 174.7645 }
    },
    {
        city: "UTC+12:45",
        country: "Chatham Standard Time",
        timezone: "Pacific/Chatham",
        utcOffset: "+12:45"
    },
    {
        city: "UTC+13",
        country: "Phoenix Islands Time",
        timezone: "Pacific/Enderbury",
        utcOffset: "+13:00",
        coordinates: { latitude: -3.1274, longitude: -171.0833 }
    },
    {
        city: "UTC+14",
        country: "Line Islands Time",
        timezone: "Pacific/Kiritimati",
        utcOffset: "+14:00",
        coordinates: { latitude: 1.8721, longitude: -157.3730 }
    },
    {
        city: "GMT",
        country: "Greenwich Mean Time",
        timezone: "Etc/GMT",
        utcOffset: "+00:00"
    },
    {
        city: "CET",
        country: "Central European Time",
        timezone: "Europe/Paris",
        utcOffset: "+01:00"
    },
    {
        city: "CEST",
        country: "Central European Summer Time",
        timezone: "Europe/Paris",
        utcOffset: "+02:00"
    },
    {
        city: "EET",
        country: "Eastern European Time",
        timezone: "Europe/Athens",
        utcOffset: "+02:00"
    },
    {
        city: "EEST",
        country: "Eastern European Summer Time",
        timezone: "Europe/Athens",
        utcOffset: "+03:00",
        coordinates: { latitude: 37.9838, longitude: 23.7275 }
    },
    {
        city: "EST",
        country: "Eastern Standard Time",
        timezone: "America/New_York",
        utcOffset: "-05:00",
        coordinates: { latitude: 40.7128, longitude: -74.0060 }
    },
    {
        city: "EDT",
        country: "Eastern Daylight Time",
        timezone: "America/New_York",
        utcOffset: "-04:00",
        coordinates: { latitude: 40.7128, longitude: -74.0060 }
    },
    {
        city: "CST",
        country: "Central Standard Time",
        timezone: "America/Chicago",
        utcOffset: "-06:00",
        coordinates: { latitude: 41.8781, longitude: -87.6298 }
    },
    {
        city: "CDT",
        country: "Central Daylight Time",
        timezone: "America/Chicago",
        utcOffset: "-05:00",
        coordinates: { latitude: 41.8781, longitude: -87.6298 }
    },
    {
        city: "MST",
        country: "Mountain Standard Time",
        timezone: "America/Denver",
        utcOffset: "-07:00",
        coordinates: { latitude: 39.7392, longitude: -104.9903 }
    },
    {
        city: "MDT",
        country: "Mountain Daylight Time",
        timezone: "America/Denver",
        utcOffset: "-06:00",
        coordinates: { latitude: 39.7392, longitude: -104.9903 }
    },
    {
        city: "PST",
        country: "Pacific Standard Time",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00",
        coordinates: { latitude: 34.0522, longitude: -118.2437 }
    },
    {
        city: "PDT",
        country: "Pacific Daylight Time",
        timezone: "America/Los_Angeles",
        utcOffset: "-07:00",
        coordinates: { latitude: 34.0522, longitude: -118.2437 }
    },
    {
        city: "IST",
        country: "India Standard Time",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 22.5726, longitude: 88.3639 }
    },
    {
        city: "JST",
        country: "Japan Standard Time",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 35.6762, longitude: 139.6503 }
    },
    {
        city: "AEST",
        country: "Australian Eastern Standard Time",
        timezone: "Australia/Sydney",
        utcOffset: "+10:00",
        coordinates: { latitude: -33.8688, longitude: 151.2093 }
    },
    {
        city: "AEDT",
        country: "Australian Eastern Daylight Time",
        timezone: "Australia/Sydney",
        utcOffset: "+11:00",
        coordinates: { latitude: -33.8688, longitude: 151.2093 }
    },
    {
        city: "NZST",
        country: "New Zealand Standard Time",
        timezone: "Pacific/Auckland",
        utcOffset: "+12:00",
        coordinates: { latitude: -36.8509, longitude: 174.7645 }
    },
    {
        city: "NZDT",
        country: "New Zealand Daylight Time",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        coordinates: { latitude: -36.8509, longitude: 174.7645 }
    },
    {
        city: "London",
        country: "United Kingdom",
        timezone: "Europe/London",
        utcOffset: "+00:00",
        coordinates: { latitude: 51.5074, longitude: -0.1278 }
    },
    {
        city: "Manchester",
        country: "United Kingdom",
        timezone: "Europe/London",
        utcOffset: "+00:00",
        coordinates: { latitude: 53.4808, longitude: -2.2426 }
    },
    {
        city: "Edinburgh",
        country: "United Kingdom",
        timezone: "Europe/London",
        utcOffset: "+00:00",
        coordinates: { latitude: 55.9533, longitude: -3.1883 }
    },
    {
        city: "Paris",
        country: "France",
        timezone: "Europe/Paris",
        utcOffset: "+01:00",
        coordinates: { latitude: 48.8566, longitude: 2.3522 }
    },
    {
        city: "Lyon",
        country: "France",
        timezone: "Europe/Paris",
        utcOffset: "+01:00",
        coordinates: { latitude: 45.7640, longitude: 4.8357 }
    },
    {
        city: "Marseille",
        country: "France",
        timezone: "Europe/Paris",
        utcOffset: "+01:00",
        coordinates: { latitude: 43.2965, longitude: 5.3698 }
    },
    {
        city: "Berlin",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00",
        coordinates: { latitude: 52.5200, longitude: 13.4050 }
    },
    {
        city: "Munich",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00",
        coordinates: { latitude: 48.1351, longitude: 11.5820 }
    },
    {
        city: "Hamburg",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00",
        coordinates: { latitude: 53.5511, longitude: 9.9937 }
    },
    {
        city: "Frankfurt",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00",
        coordinates: { latitude: 50.1109, longitude: 8.6821 }
    },
    {
        city: "Rome",
        country: "Italy",
        timezone: "Europe/Rome",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.9028, longitude: 12.4964 }
    },
    {
        city: "Milan",
        country: "Italy",
        timezone: "Europe/Rome",
        utcOffset: "+01:00",
        coordinates: { latitude: 45.4642, longitude: 9.1900 }
    },
    {
        city: "Naples",
        country: "Italy",
        timezone: "Europe/Rome",
        utcOffset: "+01:00",
        coordinates: { latitude: 40.8518, longitude: 14.2681 }
    },
    {
        city: "Madrid",
        country: "Spain",
        timezone: "Europe/Madrid",
        utcOffset: "+01:00",
        coordinates: { latitude: 40.4168, longitude: -3.7038 }
    },
    {
        city: "Barcelona",
        country: "Spain",
        timezone: "Europe/Madrid",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.3851, longitude: 2.1734 }
    },
    {
        city: "Valencia",
        country: "Spain",
        timezone: "Europe/Madrid",
        utcOffset: "+01:00",
        coordinates: { latitude: 39.4699, longitude: -0.3763 }
    },
    {
        city: "Amsterdam",
        country: "Netherlands",
        timezone: "Europe/Amsterdam",
        utcOffset: "+01:00",
        coordinates: { latitude: 52.3676, longitude: 4.9041 }
    },
    {
        city: "Rotterdam",
        country: "Netherlands",
        timezone: "Europe/Amsterdam",
        utcOffset: "+01:00"
    },
    {
        city: "Brussels",
        country: "Belgium",
        timezone: "Europe/Brussels",
        utcOffset: "+01:00",
        coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    {
        city: "Copenhagen",
        country: "Denmark",
        timezone: "Europe/Copenhagen",
        utcOffset: "+01:00",
        coordinates: { latitude: 55.6761, longitude: 12.5683 }
    },
    {
        city: "Oslo",
        country: "Norway",
        timezone: "Europe/Oslo",
        utcOffset: "+01:00",
        coordinates: { latitude: 59.9139, longitude: 10.7522 }
    },
    {
        city: "Stockholm",
        country: "Sweden",
        timezone: "Europe/Stockholm",
        utcOffset: "+01:00",
        coordinates: { latitude: 59.3293, longitude: 18.0686 }
    },
    {
        city: "Helsinki",
        country: "Finland",
        timezone: "Europe/Helsinki",
        utcOffset: "+02:00",
        coordinates: { latitude: 60.1699, longitude: 24.9384 }
    },
    {
        city: "Warsaw",
        country: "Poland",
        timezone: "Europe/Warsaw",
        utcOffset: "+01:00",
        coordinates: { latitude: 52.2297, longitude: 21.0122 }
    },
    {
        city: "Prague",
        country: "Czech Republic",
        timezone: "Europe/Prague",
        utcOffset: "+01:00",
        coordinates: { latitude: 50.0755, longitude: 14.4378 }
    },
    {
        city: "Vienna",
        country: "Austria",
        timezone: "Europe/Vienna",
        utcOffset: "+01:00",
        coordinates: { latitude: 48.2082, longitude: 16.3738 }
    },
    {
        city: "Budapest",
        country: "Hungary",
        timezone: "Europe/Budapest",
        utcOffset: "+01:00"
    },
    {
        city: "Athens",
        country: "Greece",
        timezone: "Europe/Athens",
        utcOffset: "+02:00",
        coordinates: { latitude: 37.9838, longitude: 23.7275 }
    },
    {
        city: "Moscow",
        country: "Russia",
        timezone: "Europe/Moscow",
        utcOffset: "+03:00",
        coordinates: { latitude: 55.7558, longitude: 37.6173 }
    },
    {
        city: "St. Petersburg",
        country: "Russia",
        timezone: "Europe/Moscow",
        utcOffset: "+03:00",
        coordinates: { latitude: 59.9311, longitude: 30.3609 }
    },
    {
        city: "Kiev",
        country: "Ukraine",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00",
        coordinates: { latitude: 50.4501, longitude: 30.5234 }
    },
    {
        city: "Kharkiv",
        country: "Ukraine",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00"
    },
    {
        city: "Lviv",
        country: "Ukraine",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00"
    },
    {
        city: "Odessa",
        country: "Ukraine",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00"
    },
    {
        city: "Baku",
        country: "Azerbaijan",
        timezone: "Asia/Baku",
        utcOffset: "+04:00"
    },
    {
        city: "Ganja",
        country: "Azerbaijan",
        timezone: "Asia/Baku",
        utcOffset: "+04:00"
    },
    {
        city: "Tbilisi",
        country: "Georgia",
        timezone: "Asia/Tbilisi",
        utcOffset: "+04:00"
    },
    {
        city: "Batumi",
        country: "Georgia",
        timezone: "Asia/Tbilisi",
        utcOffset: "+04:00"
    },
    {
        city: "Yerevan",
        country: "Armenia",
        timezone: "Asia/Yerevan",
        utcOffset: "+04:00"
    },
    {
        city: "Minsk",
        country: "Belarus",
        timezone: "Europe/Minsk",
        utcOffset: "+03:00"
    },
    {
        city: "Gomel",
        country: "Belarus",
        timezone: "Europe/Minsk",
        utcOffset: "+03:00"
    },
    {
        city: "Chisinau",
        country: "Moldova",
        timezone: "Europe/Chisinau",
        utcOffset: "+02:00"
    },
    {
        city: "Riga",
        country: "Latvia",
        timezone: "Europe/Riga",
        utcOffset: "+02:00"
    },
    {
        city: "Vilnius",
        country: "Lithuania",
        timezone: "Europe/Vilnius",
        utcOffset: "+02:00"
    },
    {
        city: "Tallinn",
        country: "Estonia",
        timezone: "Europe/Tallinn",
        utcOffset: "+02:00"
    },
    {
        city: "Dubai",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00",
        coordinates: { latitude: 25.2048, longitude: 55.2708 }
    },
    {
        city: "Mumbai",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 19.0760, longitude: 72.8777 }
    },
    {
        city: "Bangkok",
        country: "Thailand",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00",
        coordinates: { latitude: 13.7563, longitude: 100.5018 }
    },
    {
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore",
        utcOffset: "+08:00",
        coordinates: { latitude: 1.3521, longitude: 103.8198 }
    },
    {
        city: "Hong Kong",
        country: "China",
        timezone: "Asia/Hong_Kong",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.3193, longitude: 114.1694 }
    },
    {
        city: "Beijing",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 39.9042, longitude: 116.4074 }
    },
    {
        city: "Tokyo",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 35.6762, longitude: 139.6503 }
    },
    {
        city: "Seoul",
        country: "South Korea",
        timezone: "Asia/Seoul",
        utcOffset: "+09:00",
        coordinates: { latitude: 37.5665, longitude: 126.9780 }
    },
    {
        city: "Sydney",
        country: "Australia",
        timezone: "Australia/Sydney",
        utcOffset: "+11:00",
        coordinates: { latitude: -33.8688, longitude: 151.2093 }
    },
    {
        city: "Melbourne",
        country: "Australia",
        timezone: "Australia/Melbourne",
        utcOffset: "+11:00",
        coordinates: { latitude: -37.8136, longitude: 144.9631 }
    },
    {
        city: "Brisbane",
        country: "Australia",
        timezone: "Australia/Brisbane",
        utcOffset: "+10:00",
        coordinates: { latitude: -27.4705, longitude: 153.0260 }
    },
    {
        city: "Perth",
        country: "Australia",
        timezone: "Australia/Perth",
        utcOffset: "+08:00",
        coordinates: { latitude: -31.9505, longitude: 115.8605 }
    },
    {
        city: "Adelaide",
        country: "Australia",
        timezone: "Australia/Adelaide",
        utcOffset: "+10:30"
    },
    {
        city: "Hobart",
        country: "Australia",
        timezone: "Australia/Hobart",
        utcOffset: "+11:00"
    },
    {
        city: "Darwin",
        country: "Australia",
        timezone: "Australia/Darwin",
        utcOffset: "+09:30"
    },
    {
        city: "Canberra",
        country: "Australia",
        timezone: "Australia/Sydney",
        utcOffset: "+11:00"
    },
    {
        city: "Auckland",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        coordinates: { latitude: -36.8509, longitude: 174.7645 }
    },
    {
        city: "Wellington",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        coordinates: { latitude: -41.2866, longitude: 174.7756 }
    },
    {
        city: "Christchurch",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true
    },
    {
        city: "Hamilton",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true
    },
    {
        city: "Dunedin",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true
    },
    {
        city: "Tokyo",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00"
    },
    {
        city: "Osaka",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00"
    },
    {
        city: "Kyoto",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00"
    },
    {
        city: "Sapporo",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00"
    },
    {
        city: "Seoul",
        country: "South Korea",
        timezone: "Asia/Seoul",
        utcOffset: "+09:00"
    },
    {
        city: "Busan",
        country: "South Korea",
        timezone: "Asia/Seoul",
        utcOffset: "+09:00"
    },
    {
        city: "Beijing",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00"
    },
    {
        city: "Shanghai",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00"
    },
    {
        city: "Guangzhou",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00"
    },
    {
        city: "Shenzhen",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.5431, longitude: 114.0579 }
    },
    {
        city: "Hong Kong",
        country: "China",
        timezone: "Asia/Hong_Kong",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.3193, longitude: 114.1694 }
    },
    {
        city: "Taipei",
        country: "Taiwan",
        timezone: "Asia/Taipei",
        utcOffset: "+08:00",
        coordinates: { latitude: 25.0330, longitude: 121.5654 }
    },
    {
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore",
        utcOffset: "+08:00",
        coordinates: { latitude: 1.3521, longitude: 103.8198 }
    },
    {
        city: "Bangkok",
        country: "Thailand",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00",
        coordinates: { latitude: 13.7563, longitude: 100.5018 }
    },
    {
        city: "Phuket",
        country: "Thailand",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00",
        coordinates: { latitude: 7.8804, longitude: 98.3923 }
    },
    {
        city: "Ho Chi Minh City",
        country: "Vietnam",
        timezone: "Asia/Ho_Chi_Minh",
        utcOffset: "+07:00",
        coordinates: { latitude: 10.8231, longitude: 106.6297 }
    },
    {
        city: "Hanoi",
        country: "Vietnam",
        timezone: "Asia/Ho_Chi_Minh",
        utcOffset: "+07:00",
        coordinates: { latitude: 21.0285, longitude: 105.8542 }
    },
    {
        city: "Jakarta",
        country: "Indonesia",
        timezone: "Asia/Jakarta",
        utcOffset: "+07:00",
        coordinates: { latitude: -6.2088, longitude: 106.8456 }
    },
    {
        city: "Bali",
        country: "Indonesia",
        timezone: "Asia/Makassar",
        utcOffset: "+08:00",
        coordinates: { latitude: -8.3405, longitude: 115.0920 }
    },
    {
        city: "Manila",
        country: "Philippines",
        timezone: "Asia/Manila",
        utcOffset: "+08:00",
        coordinates: { latitude: 14.5995, longitude: 120.9842 }
    },
    {
        city: "Kuala Lumpur",
        country: "Malaysia",
        timezone: "Asia/Kuala_Lumpur",
        utcOffset: "+08:00",
        coordinates: { latitude: 3.1390, longitude: 101.6869 }
    },
    {
        city: "Mumbai",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 19.0760, longitude: 72.8777 }
    },
    {
        city: "Delhi",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 28.6139, longitude: 77.2090 }
    },
    {
        city: "Bangalore",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 12.9716, longitude: 77.5946 }
    },
    {
        city: "Chennai",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 13.0827, longitude: 80.2707 }
    },
    {
        city: "Kolkata",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 22.5726, longitude: 88.3639 }
    },
    {
        city: "Hyderabad",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30",
        coordinates: { latitude: 17.3850, longitude: 78.4867 }
    },
    {
        city: "Dubai",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00",
        coordinates: { latitude: 25.2048, longitude: 55.2708 }
    },
    {
        city: "Abu Dhabi",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00",
        coordinates: { latitude: 24.4539, longitude: 54.3773 }
    },
    {
        city: "Doha",
        country: "Qatar",
        timezone: "Asia/Qatar",
        utcOffset: "+03:00",
        coordinates: { latitude: 25.2854, longitude: 51.5310 }
    },
    {
        city: "Riyadh",
        country: "Saudi Arabia",
        timezone: "Asia/Riyadh",
        utcOffset: "+03:00",
        coordinates: { latitude: 24.7136, longitude: 46.6753 }
    },
    {
        city: "Tehran",
        country: "Iran",
        timezone: "Asia/Tehran",
        utcOffset: "+03:30",
        coordinates: { latitude: 35.6892, longitude: 51.3890 }
    },
    {
        city: "Baghdad",
        country: "Iraq",
        timezone: "Asia/Baghdad",
        utcOffset: "+03:00",
        coordinates: { latitude: 33.3152, longitude: 44.3661 }
    },
    {
        city: "Basra",
        country: "Iraq",
        timezone: "Asia/Baghdad",
        utcOffset: "+03:00",
        coordinates: { latitude: 30.5085, longitude: 47.7831 }
    },
    {
        city: "Beirut",
        country: "Lebanon",
        timezone: "Asia/Beirut",
        utcOffset: "+02:00",
        coordinates: { latitude: 33.8938, longitude: 35.5018 }
    },
    {
        city: "Damascus",
        country: "Syria",
        timezone: "Asia/Damascus",
        utcOffset: "+02:00",
        coordinates: { latitude: 33.5138, longitude: 36.2765 }
    },
    {
        city: "Aleppo",
        country: "Syria",
        timezone: "Asia/Damascus",
        utcOffset: "+02:00",
        coordinates: { latitude: 36.2021, longitude: 37.1343 }
    },
    {
        city: "Amman",
        country: "Jordan",
        timezone: "Asia/Amman",
        utcOffset: "+02:00",
        coordinates: { latitude: 31.9454, longitude: 35.9284 }
    },
    {
        city: "Muscat",
        country: "Oman",
        timezone: "Asia/Muscat",
        utcOffset: "+04:00",
        coordinates: { latitude: 23.5880, longitude: 58.3829 }
    },
    {
        city: "Manama",
        country: "Bahrain",
        timezone: "Asia/Bahrain",
        utcOffset: "+03:00",
        coordinates: { latitude: 26.2285, longitude: 50.5860 }
    },
    {
        city: "Kuwait City",
        country: "Kuwait",
        timezone: "Asia/Kuwait",
        utcOffset: "+03:00",
        coordinates: { latitude: 29.3759, longitude: 47.9774 }
    },
    {
        city: "Sanaa",
        country: "Yemen",
        timezone: "Asia/Aden",
        utcOffset: "+03:00",
        coordinates: { latitude: 15.3694, longitude: 44.1910 }
    },
    {
        city: "Phoenix",
        country: "United States",
        timezone: "America/Phoenix",
        utcOffset: "-07:00",
        coordinates: { latitude: 33.4484, longitude: -112.0740 }
    },
    {
        city: "Philadelphia",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00",
        coordinates: { latitude: 39.9526, longitude: -75.1652 }
    },
    {
        city: "San Francisco",
        country: "United States",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00",
        coordinates: { latitude: 37.7749, longitude: -122.4194 }
    },
    {
        city: "Boston",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00",
        coordinates: { latitude: 42.3601, longitude: -71.0589 }
    },
    {
        city: "Seattle",
        country: "United States",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00",
        coordinates: { latitude: 47.6062, longitude: -122.3321 }
    },
    {
        city: "Miami",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00",
        coordinates: { latitude: 25.7617, longitude: -80.1918 }
    },
    {
        city: "Vancouver",
        country: "Canada",
        timezone: "America/Vancouver",
        utcOffset: "-08:00",
        coordinates: { latitude: 49.2827, longitude: -123.1207 }
    },
    {
        city: "Toronto",
        country: "Canada",
        timezone: "America/Toronto",
        utcOffset: "-05:00",
        coordinates: { latitude: 43.6532, longitude: -79.3832 }
    },
    {
        city: "Vancouver",
        country: "Canada",
        timezone: "America/Vancouver",
        utcOffset: "-08:00",
        coordinates: { latitude: 49.2827, longitude: -123.1207 }
    },
    {
        city: "Montreal",
        country: "Canada",
        timezone: "America/Montreal",
        utcOffset: "-05:00"
    },
    {
        city: "Calgary",
        country: "Canada",
        timezone: "America/Edmonton",
        utcOffset: "-07:00",
        coordinates: { latitude: 51.0447, longitude: -114.0719 }
    },
    {
        city: "Ottawa",
        country: "Canada",
        timezone: "America/Toronto",
        utcOffset: "-05:00",
        coordinates: { latitude: 45.4215, longitude: -75.6972 }
    },
    {
        city: "Mexico City",
        country: "Mexico",
        timezone: "America/Mexico_City",
        utcOffset: "-06:00",
        coordinates: { latitude: 19.4326, longitude: -99.1332 }
    },
    {
        city: "Guadalajara",
        country: "Mexico",
        timezone: "America/Mexico_City",
        utcOffset: "-06:00",
        coordinates: { latitude: 20.6597, longitude: -103.3496 }
    },
    {
        city: "Monterrey",
        country: "Mexico",
        timezone: "America/Monterrey",
        utcOffset: "-06:00",
        coordinates: { latitude: 25.6866, longitude: -100.3161 }
    },
    {
        city: "São Paulo",
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        utcOffset: "-03:00",
        coordinates: { latitude: -23.5505, longitude: -46.6333 }
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        utcOffset: "-03:00",
        coordinates: { latitude: -22.9068, longitude: -43.1729 }
    },
    {
        city: "Brasília",
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        utcOffset: "-03:00",
        coordinates: { latitude: -15.7975, longitude: -47.8919 }
    },
    {
        city: "Buenos Aires",
        country: "Argentina",
        timezone: "America/Argentina/Buenos_Aires",
        utcOffset: "-03:00",
        coordinates: { latitude: -34.6037, longitude: -58.3816 }
    },
    {
        city: "Lima",
        country: "Peru",
        timezone: "America/Lima",
        utcOffset: "-05:00",
        coordinates: { latitude: -12.0464, longitude: -77.0428 }
    },
    {
        city: "Cusco",
        country: "Peru",
        timezone: "America/Lima",
        utcOffset: "-05:00",
        coordinates: { latitude: -13.5319, longitude: -71.9675 }
    },
    {
        city: "La Paz",
        country: "Bolivia",
        timezone: "America/La_Paz",
        utcOffset: "-04:00",
        coordinates: { latitude: -16.4897, longitude: -68.1193 }
    },
    {
        city: "Santa Cruz",
        country: "Bolivia",
        timezone: "America/La_Paz",
        utcOffset: "-04:00",
        coordinates: { latitude: -17.7863, longitude: -63.1812 }
    },
    {
        city: "Asunción",
        country: "Paraguay",
        timezone: "America/Asuncion",
        utcOffset: "-04:00",
        coordinates: { latitude: -25.2867, longitude: -57.3333 }
    },
    {
        city: "Montevideo",
        country: "Uruguay",
        timezone: "America/Montevideo",
        utcOffset: "-03:00",
        coordinates: { latitude: -34.9011, longitude: -56.1645 }
    },
    {
        city: "Punta del Este",
        country: "Uruguay",
        timezone: "America/Montevideo",
        utcOffset: "-03:00",
        coordinates: { latitude: -34.9368, longitude: -54.9338 }
    },
    {
        city: "Quito",
        country: "Ecuador",
        timezone: "America/Guayaquil",
        utcOffset: "-05:00",
        coordinates: { latitude: -0.1807, longitude: -78.4678 }
    },
    {
        city: "Guayaquil",
        country: "Ecuador",
        timezone: "America/Guayaquil",
        utcOffset: "-05:00",
        coordinates: { latitude: -2.1962, longitude: -79.8862 }
    },
    {
        city: "Caracas",
        country: "Venezuela",
        timezone: "America/Caracas",
        utcOffset: "-04:00",
        coordinates: { latitude: 10.4806, longitude: -66.9036 }
    },
    {
        city: "Maracaibo",
        country: "Venezuela",
        timezone: "America/Caracas",
        utcOffset: "-04:00",
        coordinates: { latitude: 10.6427, longitude: -71.6125 }
    },
    {
        city: "Port Moresby",
        country: "Papua New Guinea",
        timezone: "Pacific/Port_Moresby",
        utcOffset: "+10:00",
        coordinates: { latitude: -9.4438, longitude: 147.1803 }
    },
    {
        city: "Lae",
        country: "Papua New Guinea",
        timezone: "Pacific/Port_Moresby",
        utcOffset: "+10:00",
        coordinates: { latitude: -6.7330, longitude: 146.9990 }
    },
    {
        city: "Honiara",
        country: "Solomon Islands",
        timezone: "Pacific/Guadalcanal",
        utcOffset: "+11:00",
        coordinates: { latitude: -9.4438, longitude: 159.9498 }
    },
    {
        city: "Nouméa",
        country: "New Caledonia",
        timezone: "Pacific/Noumea",
        utcOffset: "+11:00",
        coordinates: { latitude: -22.2711, longitude: 166.4416 }
    },
    {
        city: "Port Vila",
        country: "Vanuatu",
        timezone: "Pacific/Efate",
        utcOffset: "+11:00",
        coordinates: { latitude: -17.7334, longitude: 168.3220 }
    },
    {
        city: "Suva",
        country: "Fiji",
        timezone: "Pacific/Fiji",
        utcOffset: "+12:00",
        coordinates: { latitude: -18.1416, longitude: 178.4419 }
    },
    {
        city: "Nadi",
        country: "Fiji",
        timezone: "Pacific/Fiji",
        utcOffset: "+12:00",
        coordinates: { latitude: -17.7765, longitude: 177.4356 }
    },
    {
        city: "Apia",
        country: "Samoa",
        timezone: "Pacific/Apia",
        utcOffset: "+13:00",
        coordinates: { latitude: -13.8506, longitude: -171.7513 }
    },
    {
        city: "Pago Pago",
        country: "American Samoa",
        timezone: "Pacific/Pago_Pago",
        utcOffset: "-11:00",
        coordinates: { latitude: -14.2757, longitude: -170.7020 }
    },
    {
        city: "Cairo",
        country: "Egypt",
        timezone: "Africa/Cairo",
        utcOffset: "+02:00",
        coordinates: { latitude: 30.0444, longitude: 31.2357 }
    },
    {
        city: "Alexandria",
        country: "Egypt",
        timezone: "Africa/Cairo",
        utcOffset: "+02:00",
        coordinates: { latitude: 31.2001, longitude: 29.9187 }
    },
    {
        city: "Lagos",
        country: "Nigeria",
        timezone: "Africa/Lagos",
        utcOffset: "+01:00",
        coordinates: { latitude: 6.5244, longitude: 3.3792 }
    },
    {
        city: "Abuja",
        country: "Nigeria",
        timezone: "Africa/Lagos",
        utcOffset: "+01:00",
        coordinates: { latitude: 9.0765, longitude: 7.3986 }
    },
    {
        city: "Nairobi",
        country: "Kenya",
        timezone: "Africa/Nairobi",
        utcOffset: "+03:00",
        coordinates: { latitude: -1.2921, longitude: 36.8219 }
    },
    {
        city: "Mombasa",
        country: "Kenya",
        timezone: "Africa/Nairobi",
        utcOffset: "+03:00",
        coordinates: { latitude: -4.0435, longitude: 39.6682 }
    },
    {
        city: "Johannesburg",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00",
        coordinates: { latitude: -26.2041, longitude: 28.0473 }
    },
    {
        city: "Cape Town",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00",
        coordinates: { latitude: -33.9249, longitude: 18.4241 }
    },
    {
        city: "Durban",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00",
        coordinates: { latitude: -29.8587, longitude: 31.0218 }
    },
    {
        city: "Pretoria",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00",
        coordinates: { latitude: -25.7479, longitude: 28.2293 }
    },
    {
        city: "Rabat",
        country: "Morocco",
        timezone: "Africa/Casablanca",
        utcOffset: "+01:00",
        coordinates: { latitude: 34.0209, longitude: -6.8416 }
    },
    {
        city: "Kampala",
        country: "Uganda",
        timezone: "Africa/Kampala",
        utcOffset: "+03:00",
        coordinates: { latitude: 0.3476, longitude: 32.5825 }
    },
    {
        city: "Kigali",
        country: "Rwanda",
        timezone: "Africa/Kigali",
        utcOffset: "+02:00",
        coordinates: { latitude: -1.9441, longitude: 30.0619 }
    },
    {
        city: "Accra",
        country: "Ghana",
        timezone: "Africa/Accra",
        utcOffset: "+00:00",
        coordinates: { latitude: 5.6037, longitude: -0.1870 }
    },
    {
        city: "Dakar",
        country: "Senegal",
        timezone: "Africa/Dakar",
        utcOffset: "+00:00",
        coordinates: { latitude: 14.7167, longitude: -17.4677 }
    },
    {
        city: "Luanda",
        country: "Angola",
        timezone: "Africa/Luanda",
        utcOffset: "+01:00",
        coordinates: { latitude: -8.8147, longitude: 13.2302 }
    },
    {
        city: "Kinshasa",
        country: "Democratic Republic of the Congo",
        timezone: "Africa/Kinshasa",
        utcOffset: "+01:00",
        coordinates: { latitude: -4.4419, longitude: 15.2663 }
    },
    {
        city: "Khartoum",
        country: "Sudan",
        timezone: "Africa/Khartoum",
        utcOffset: "+02:00",
        coordinates: { latitude: 15.5007, longitude: 32.5599 }
    },
    {
        city: "Lusaka",
        country: "Zambia",
        timezone: "Africa/Lusaka",
        utcOffset: "+02:00",
        coordinates: { latitude: -15.3875, longitude: 28.3228 }
    },
    {
        city: "Karachi",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00",
        coordinates: { latitude: 24.8607, longitude: 67.0011 }
    },
    {
        city: "Lahore",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00",
        coordinates: { latitude: 31.5204, longitude: 74.3587 }
    },
    {
        city: "Islamabad",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00",
        coordinates: { latitude: 33.6844, longitude: 73.0479 }
    },
    {
        city: "Dhaka",
        country: "Bangladesh",
        timezone: "Asia/Dhaka",
        utcOffset: "+06:00",
        coordinates: { latitude: 23.8103, longitude: 90.4125 }
    },
    {
        city: "Chittagong",
        country: "Bangladesh",
        timezone: "Asia/Dhaka",
        utcOffset: "+06:00",
        coordinates: { latitude: 22.3569, longitude: 91.7832 }
    },
    {
        city: "Colombo",
        country: "Sri Lanka",
        timezone: "Asia/Colombo",
        utcOffset: "+05:30",
        coordinates: { latitude: 6.9271, longitude: 79.8612 }
    },
    {
        city: "Kathmandu",
        country: "Nepal",
        timezone: "Asia/Kathmandu",
        utcOffset: "+05:45",
        coordinates: { latitude: 27.7172, longitude: 85.3240 }
    },
    {
        city: "Thimphu",
        country: "Bhutan",
        timezone: "Asia/Thimphu",
        utcOffset: "+06:00",
        coordinates: { latitude: 27.4716, longitude: 89.6386 }
    },
    {
        city: "Male",
        country: "Maldives",
        timezone: "Indian/Maldives",
        utcOffset: "+05:00",
        coordinates: { latitude: 4.1755, longitude: 73.5093 }
    },
    {
        city: "Kabul",
        country: "Afghanistan",
        timezone: "Asia/Kabul",
        utcOffset: "+04:30",
        coordinates: { latitude: 34.5553, longitude: 69.2075 }
    },
    {
        city: "Tashkent",
        country: "Uzbekistan",
        timezone: "Asia/Tashkent",
        utcOffset: "+05:00",
        coordinates: { latitude: 41.2995, longitude: 69.2401 }
    },
    {
        city: "Ashgabat",
        country: "Turkmenistan",
        timezone: "Asia/Ashgabat",
        utcOffset: "+05:00",
        coordinates: { latitude: 37.9601, longitude: 58.3261 }
    },
    {
        city: "Dushanbe",
        country: "Tajikistan",
        timezone: "Asia/Dushanbe",
        utcOffset: "+05:00",
        coordinates: { latitude: 38.5598, longitude: 68.7870 }
    },
    {
        city: "Bishkek",
        country: "Kyrgyzstan",
        timezone: "Asia/Bishkek",
        utcOffset: "+06:00",
        coordinates: { latitude: 42.8746, longitude: 74.5698 }
    },
    {
        city: "Nur-Sultan",
        country: "Kazakhstan",
        timezone: "Asia/Almaty",
        utcOffset: "+06:00",
        coordinates: { latitude: 51.1605, longitude: 71.4704 }
    },
    {
        city: "Almaty",
        country: "Kazakhstan",
        timezone: "Asia/Almaty",
        utcOffset: "+06:00",
        coordinates: { latitude: 43.2220, longitude: 76.8512 }
    },
    {
        city: "Yerevan",
        country: "Armenia",
        timezone: "Asia/Yerevan",
        utcOffset: "+04:00",
        coordinates: { latitude: 40.1776, longitude: 44.5126 }
    },
    {
        city: "Tbilisi",
        country: "Georgia",
        timezone: "Asia/Tbilisi",
        utcOffset: "+04:00",
        coordinates: { latitude: 41.7151, longitude: 44.8271 }
    },
    {
        city: "Baku",
        country: "Azerbaijan",
        timezone: "Asia/Baku",
        utcOffset: "+04:00",
        coordinates: { latitude: 40.4093, longitude: 49.8671 }
    },
    {
        city: "Ulaanbaatar",
        country: "Mongolia",
        timezone: "Asia/Ulaanbaatar",
        utcOffset: "+08:00",
        coordinates: { latitude: 47.8864, longitude: 106.9057 }
    },
    {
        city: "Sofia",
        country: "Bulgaria",
        timezone: "Europe/Sofia",
        utcOffset: "+02:00",
        coordinates: { latitude: 42.6977, longitude: 23.3219 }
    },
    {
        city: "Plovdiv",
        country: "Bulgaria",
        timezone: "Europe/Sofia",
        utcOffset: "+02:00",
        coordinates: { latitude: 42.1354, longitude: 24.7453 }
    },
    {
        city: "Varna",
        country: "Bulgaria",
        timezone: "Europe/Sofia",
        utcOffset: "+02:00",
        coordinates: { latitude: 43.2141, longitude: 27.9147 }
    },
    {
        city: "Belgrade",
        country: "Serbia",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00",
        coordinates: { latitude: 44.7866, longitude: 20.4489 }
    },
    {
        city: "Novi Sad",
        country: "Serbia",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00",
        coordinates: { latitude: 45.2671, longitude: 19.8335 }
    },
    {
        city: "Zagreb",
        country: "Croatia",
        timezone: "Europe/Zagreb",
        utcOffset: "+01:00",
        coordinates: { latitude: 45.8150, longitude: 15.9819 }
    },
    {
        city: "Split",
        country: "Croatia",
        timezone: "Europe/Zagreb",
        utcOffset: "+01:00",
        coordinates: { latitude: 43.5081, longitude: 16.4402 }
    },
    {
        city: "Dubrovnik",
        country: "Croatia",
        timezone: "Europe/Zagreb",
        utcOffset: "+01:00",
        coordinates: { latitude: 42.6507, longitude: 18.0944 }
    },
    {
        city: "Ljubljana",
        country: "Slovenia",
        timezone: "Europe/Ljubljana",
        utcOffset: "+01:00",
        coordinates: { latitude: 46.0569, longitude: 14.5058 }
    },
    {
        city: "Maribor",
        country: "Slovenia",
        timezone: "Europe/Ljubljana",
        utcOffset: "+01:00",
        coordinates: { latitude: 46.5547, longitude: 15.6459 }
    },
    {
        city: "Sarajevo",
        country: "Bosnia and Herzegovina",
        timezone: "Europe/Sarajevo",
        utcOffset: "+01:00",
        coordinates: { latitude: 43.8563, longitude: 18.4131 }
    },
    {
        city: "Mostar",
        country: "Bosnia and Herzegovina",
        timezone: "Europe/Sarajevo",
        utcOffset: "+01:00",
        coordinates: { latitude: 43.3438, longitude: 17.8078 }
    },
    {
        city: "Skopje",
        country: "North Macedonia",
        timezone: "Europe/Skopje",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.9973, longitude: 21.4280 }
    },
    {
        city: "Ohrid",
        country: "North Macedonia",
        timezone: "Europe/Skopje",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.1231, longitude: 20.8016 }
    },
    {
        city: "Tirana",
        country: "Albania",
        timezone: "Europe/Tirane",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.3275, longitude: 19.8187 }
    },
    {
        city: "Durres",
        country: "Albania",
        timezone: "Europe/Tirane",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.3233, longitude: 19.4562 }
    },
    {
        city: "Podgorica",
        country: "Montenegro",
        timezone: "Europe/Podgorica",
        utcOffset: "+01:00",
        coordinates: { latitude: 42.4304, longitude: 19.2594 }
    },
    {
        city: "Budva",
        country: "Montenegro",
        timezone: "Europe/Podgorica",
        utcOffset: "+01:00",
        coordinates: { latitude: 42.2911, longitude: 18.8401 }
    },
    {
        city: "Pristina",
        country: "Kosovo",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00",
        coordinates: { latitude: 42.6629, longitude: 21.1655 }
    },
    {
        city: "Prizren",
        country: "Kosovo",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00",
        coordinates: { latitude: 42.2139, longitude: 20.7397 }
    },
    {
        city: "Reykjavik",
        country: "Iceland",
        timezone: "Atlantic/Reykjavik",
        utcOffset: "+00:00",
        coordinates: { latitude: 64.1466, longitude: -21.9426 }
    },
    {
        city: "Malta",
        country: "Malta",
        timezone: "Europe/Malta",
        utcOffset: "+01:00",
        coordinates: { latitude: 35.9375, longitude: 14.3754 }
    },
    {
        city: "Valletta",
        country: "Malta",
        timezone: "Europe/Malta",
        utcOffset: "+01:00",
        coordinates: { latitude: 35.8989, longitude: 14.5146 }
    },
    {
        city: "Luxembourg",
        country: "Luxembourg",
        timezone: "Europe/Luxembourg",
        utcOffset: "+01:00",
        coordinates: { latitude: 49.6116, longitude: 6.1319 }
    },
    {
        city: "Andorra la Vella",
        country: "Andorra",
        timezone: "Europe/Andorra",
        utcOffset: "+01:00",
        coordinates: { latitude: 42.5063, longitude: 1.5218 }
    },
    {
        city: "Monaco",
        country: "Monaco",
        timezone: "Europe/Monaco",
        utcOffset: "+01:00",
        coordinates: { latitude: 43.7384, longitude: 7.4246 }
    },
    {
        city: "San Marino",
        country: "San Marino",
        timezone: "Europe/San_Marino",
        utcOffset: "+01:00",
        coordinates: { latitude: 43.9424, longitude: 12.4578 }
    },
    {
        city: "Vatican City",
        country: "Vatican City",
        timezone: "Europe/Vatican",
        utcOffset: "+01:00",
        coordinates: { latitude: 41.9029, longitude: 12.4534 }
    },
    {
        city: "Nassau",
        country: "Bahamas",
        timezone: "America/Nassau",
        utcOffset: "-05:00",
        coordinates: { latitude: 25.0443, longitude: -77.3504 }
    },
    {
        city: "Kingston",
        country: "Jamaica",
        timezone: "America/Jamaica",
        utcOffset: "-05:00",
        coordinates: { latitude: 18.0179, longitude: -76.8099 }
    },
    {
        city: "Havana",
        country: "Cuba",
        timezone: "America/Havana",
        utcOffset: "-05:00",
        coordinates: { latitude: 23.1136, longitude: -82.3666 }
    },
    {
        city: "Santo Domingo",
        country: "Dominican Republic",
        timezone: "America/Santo_Domingo",
        utcOffset: "-04:00",
        coordinates: { latitude: 18.4861, longitude: -69.9312 }
    },
    {
        city: "Port-au-Prince",
        country: "Haiti",
        timezone: "America/Port-au-Prince",
        utcOffset: "-05:00",
        coordinates: { latitude: 18.5944, longitude: -72.3074 }
    },
    {
        city: "San Juan",
        country: "Puerto Rico",
        timezone: "America/Puerto_Rico",
        utcOffset: "-04:00",
        coordinates: { latitude: 18.4655, longitude: -66.1057 }
    },
    {
        city: "Belmopan",
        country: "Belize",
        timezone: "America/Belize",
        utcOffset: "-06:00",
        coordinates: { latitude: 17.2514, longitude: -88.7705 }
    },
    {
        city: "Tripoli",
        country: "Libya",
        timezone: "Africa/Tripoli",
        utcOffset: "+02:00",
        coordinates: { latitude: 32.8872, longitude: 13.1913 }
    },
    {
        city: "Benghazi",
        country: "Libya",
        timezone: "Africa/Tripoli",
        utcOffset: "+02:00",
        coordinates: { latitude: 32.1167, longitude: 20.0667 }
    },
    {
        city: "Algiers",
        country: "Algeria",
        timezone: "Africa/Algiers",
        utcOffset: "+01:00",
        coordinates: { latitude: 36.7538, longitude: 3.0588 }
    },
    {
        city: "Oran",
        country: "Algeria",
        timezone: "Africa/Algiers",
        utcOffset: "+01:00",
        coordinates: { latitude: 35.6987, longitude: -0.6349 }
    },
    {
        city: "Casablanca",
        country: "Morocco",
        timezone: "Africa/Casablanca",
        utcOffset: "+01:00",
        coordinates: { latitude: 33.5731, longitude: -7.5898 }
    },
    {
        city: "Bamako",
        country: "Mali",
        timezone: "Africa/Bamako",
        utcOffset: "+00:00",
        coordinates: { latitude: 12.6392, longitude: -8.0029 }
    },
    {
        city: "Ouagadougou",
        country: "Burkina Faso",
        timezone: "Africa/Ouagadougou",
        utcOffset: "+00:00",
        coordinates: { latitude: 12.3714, longitude: -1.5197 }
    },
    {
        city: "Niamey",
        country: "Niger",
        timezone: "Africa/Niamey",
        utcOffset: "+01:00",
        coordinates: { latitude: 13.5117, longitude: 2.1251 }
    },
    {
        city: "Conakry",
        country: "Guinea",
        timezone: "Africa/Conakry",
        utcOffset: "+00:00",
        coordinates: { latitude: 9.6412, longitude: -13.5784 }
    },
    {
        city: "Freetown",
        country: "Sierra Leone",
        timezone: "Africa/Freetown",
        utcOffset: "+00:00",
        coordinates: { latitude: 8.4849, longitude: -13.2343 }
    },
    {
        city: "Monrovia",
        country: "Liberia",
        timezone: "Africa/Monrovia",
        utcOffset: "+00:00",
        coordinates: { latitude: 6.3004, longitude: -10.7969 }
    },
    {
        city: "Abidjan",
        country: "Ivory Coast",
        timezone: "Africa/Abidjan",
        utcOffset: "+00:00",
        coordinates: { latitude: 5.3600, longitude: -4.0083 }
    },
    {
        city: "Yamoussoukro",
        country: "Ivory Coast",
        timezone: "Africa/Abidjan",
        utcOffset: "+00:00",
        coordinates: { latitude: 6.8276, longitude: -5.2893 }
    },
    {
        city: "Lome",
        country: "Togo",
        timezone: "Africa/Lome",
        utcOffset: "+00:00",
        coordinates: { latitude: 6.1375, longitude: 1.2123 }
    },
    {
        city: "Cotonou",
        country: "Benin",
        timezone: "Africa/Porto-Novo",
        utcOffset: "+01:00",
        coordinates: { latitude: 6.3703, longitude: 2.3912 }
    },
    {
        city: "Porto-Novo",
        country: "Benin",
        timezone: "Africa/Porto-Novo",
        utcOffset: "+01:00",
        coordinates: { latitude: 6.4969, longitude: 2.6283 }
    },
    {
        city: "Yaounde",
        country: "Cameroon",
        timezone: "Africa/Douala",
        utcOffset: "+01:00",
        coordinates: { latitude: 3.8480, longitude: 11.5021 }
    },
    {
        city: "Douala",
        country: "Cameroon",
        timezone: "Africa/Douala",
        utcOffset: "+01:00",
        coordinates: { latitude: 4.0511, longitude: 9.7679 }
    },
    {
        city: "Bangui",
        country: "Central African Republic",
        timezone: "Africa/Bangui",
        utcOffset: "+01:00",
        coordinates: { latitude: 4.3947, longitude: 18.5582 }
    },
    {
        city: "Libreville",
        country: "Gabon",
        timezone: "Africa/Libreville",
        utcOffset: "+01:00",
        coordinates: { latitude: 0.4162, longitude: 9.4673 }
    },
    {
        city: "Malabo",
        country: "Equatorial Guinea",
        timezone: "Africa/Malabo",
        utcOffset: "+01:00",
        coordinates: { latitude: 3.7523, longitude: 8.7742 }
    },
    {
        city: "Brazzaville",
        country: "Republic of the Congo",
        timezone: "Africa/Brazzaville",
        utcOffset: "+01:00",
        coordinates: { latitude: -4.2634, longitude: 15.2429 }
    },
    {
        city: "N'Djamena",
        country: "Chad",
        timezone: "Africa/Ndjamena",
        utcOffset: "+01:00",
        coordinates: { latitude: 12.1348, longitude: 15.0557 }
    },
    {
        city: "Bujumbura",
        country: "Burundi",
        timezone: "Africa/Bujumbura",
        utcOffset: "+02:00",
        coordinates: { latitude: -3.3822, longitude: 29.3644 }
    },
    {
        city: "Djibouti",
        country: "Djibouti",
        timezone: "Africa/Djibouti",
        utcOffset: "+03:00",
        coordinates: { latitude: 11.5886, longitude: 43.1457 }
    },
    {
        city: "Tokyo",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 35.6762, longitude: 139.6503 }
    },
    {
        city: "Osaka",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 34.6937, longitude: 135.5023 }
    },
    {
        city: "Kyoto",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 35.0116, longitude: 135.7681 }
    },
    {
        city: "Sapporo",
        country: "Japan",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00",
        coordinates: { latitude: 43.0618, longitude: 141.3545 }
    },
    {
        city: "Seoul",
        country: "South Korea",
        timezone: "Asia/Seoul",
        utcOffset: "+09:00",
        coordinates: { latitude: 37.5665, longitude: 126.9780 }
    },
    {
        city: "Busan",
        country: "South Korea",
        timezone: "Asia/Seoul",
        utcOffset: "+09:00",
        coordinates: { latitude: 35.1796, longitude: 129.0756 }
    },
    {
        city: "Beijing",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 39.9042, longitude: 116.4074 }
    },
    {
        city: "Shanghai",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 31.2304, longitude: 121.4737 }
    },
    {
        city: "Guangzhou",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 23.1291, longitude: 113.2644 }
    },
    {
        city: "Shenzhen",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.5431, longitude: 114.0579 }
    },
    {
        city: "Taipei",
        country: "Taiwan",
        timezone: "Asia/Taipei",
        utcOffset: "+08:00",
        coordinates: { latitude: 25.0330, longitude: 121.5654 }
    },
    {
        city: "Kaohsiung",
        country: "Taiwan",
        timezone: "Asia/Taipei",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.6273, longitude: 120.3014 }
    },
    {
        city: "Hong Kong",
        country: "Hong Kong",
        timezone: "Asia/Hong_Kong",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.3193, longitude: 114.1694 }
    },
    {
        city: "Macau",
        country: "Macau",
        timezone: "Asia/Macau",
        utcOffset: "+08:00",
        coordinates: { latitude: 22.1987, longitude: 113.5439 }
    },
    {
        city: "Ulaanbaatar",
        country: "Mongolia",
        timezone: "Asia/Ulaanbaatar",
        utcOffset: "+08:00",
        coordinates: { latitude: 47.8864, longitude: 106.9057 }
    },
    {
        city: "Pyongyang",
        country: "North Korea",
        timezone: "Asia/Pyongyang",
        utcOffset: "+09:00",
        coordinates: { latitude: 39.0392, longitude: 125.7625 }
    },
    {
        city: "Vladivostok",
        country: "Russia",
        timezone: "Asia/Vladivostok",
        utcOffset: "+10:00",
        coordinates: { latitude: 43.1332, longitude: 131.9113 }
    },
    {
        city: "Khabarovsk",
        country: "Russia",
        timezone: "Asia/Vladivostok",
        utcOffset: "+10:00",
        coordinates: { latitude: 48.4814, longitude: 135.0718 }
    },
    {
        city: "Yakutsk",
        country: "Russia",
        timezone: "Asia/Yakutsk",
        utcOffset: "+09:00",
        coordinates: { latitude: 62.0355, longitude: 129.6755 }
    },
    {
        city: "Irkutsk",
        country: "Russia",
        timezone: "Asia/Irkutsk",
        utcOffset: "+08:00",
        coordinates: { latitude: 52.2870, longitude: 104.3050 }
    }
];
