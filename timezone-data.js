const timezoneData = [
    {
        city: "UTC",
        country: "Universal Time Coordinated",
        timezone: "UTC",
        utcOffset: "+00:00"
    },
    // UTC Offsets
    {
        city: "UTC-12",
        country: "Baker Island Time",
        timezone: "Etc/GMT+12",
        utcOffset: "-12:00"
    },
    {
        city: "UTC-11",
        country: "Samoa Standard Time",
        timezone: "Pacific/Samoa",
        utcOffset: "-11:00"
    },
    {
        city: "UTC-10",
        country: "Hawaii-Aleutian Standard Time",
        timezone: "Pacific/Honolulu",
        utcOffset: "-10:00"
    },
    {
        city: "UTC-9:30",
        country: "Marquesas Islands Time",
        timezone: "Pacific/Marquesas",
        utcOffset: "-09:30"
    },
    {
        city: "UTC-9",
        country: "Alaska Standard Time",
        timezone: "America/Anchorage",
        utcOffset: "-09:00"
    },
    {
        city: "UTC-8",
        country: "Pacific Standard Time",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00"
    },
    {
        city: "UTC-7",
        country: "Mountain Standard Time",
        timezone: "America/Denver",
        utcOffset: "-07:00"
    },
    {
        city: "UTC-6",
        country: "Central Standard Time",
        timezone: "America/Chicago",
        utcOffset: "-06:00"
    },
    {
        city: "UTC-5",
        country: "Eastern Standard Time",
        timezone: "America/New_York",
        utcOffset: "-05:00"
    },
    {
        city: "UTC-4",
        country: "Atlantic Standard Time",
        timezone: "America/Halifax",
        utcOffset: "-04:00"
    },
    {
        city: "UTC-3:30",
        country: "Newfoundland Standard Time",
        timezone: "America/St_Johns",
        utcOffset: "-03:30"
    },
    {
        city: "UTC-3",
        country: "Argentina Standard Time",
        timezone: "America/Argentina/Buenos_Aires",
        utcOffset: "-03:00"
    },
    {
        city: "UTC-2",
        country: "Fernando de Noronha Time",
        timezone: "America/Noronha",
        utcOffset: "-02:00"
    },
    {
        city: "UTC-1",
        country: "Azores Standard Time",
        timezone: "Atlantic/Azores",
        utcOffset: "-01:00"
    },
    {
        city: "UTC+0",
        country: "Greenwich Mean Time",
        timezone: "Etc/GMT",
        utcOffset: "+00:00"
    },
    {
        city: "UTC+1",
        country: "Central European Time",
        timezone: "Europe/Paris",
        utcOffset: "+01:00"
    },
    {
        city: "UTC+2",
        country: "Eastern European Time",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00"
    },
    {
        city: "UTC+3",
        country: "Moscow Standard Time",
        timezone: "Europe/Moscow",
        utcOffset: "+03:00"
    },
    {
        city: "UTC+3:30",
        country: "Iran Standard Time",
        timezone: "Asia/Tehran",
        utcOffset: "+03:30"
    },
    {
        city: "UTC+4",
        country: "Gulf Standard Time",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00"
    },
    {
        city: "UTC+4:30",
        country: "Afghanistan Time",
        timezone: "Asia/Kabul",
        utcOffset: "+04:30"
    },
    {
        city: "UTC+5",
        country: "Pakistan Standard Time",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00"
    },
    {
        city: "UTC+5:30",
        country: "India Standard Time",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "UTC+5:45",
        country: "Nepal Time",
        timezone: "Asia/Kathmandu",
        utcOffset: "+05:45"
    },
    {
        city: "UTC+6",
        country: "Bangladesh Standard Time",
        timezone: "Asia/Dhaka",
        utcOffset: "+06:00"
    },
    {
        city: "UTC+6:30",
        country: "Myanmar Time",
        timezone: "Asia/Yangon",
        utcOffset: "+06:30"
    },
    {
        city: "UTC+7",
        country: "Indochina Time",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00"
    },
    {
        city: "UTC+8",
        country: "China Standard Time",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00"
    },
    {
        city: "UTC+8:45",
        country: "Australian Central Western Time",
        timezone: "Australia/Eucla",
        utcOffset: "+08:45"
    },
    {
        city: "UTC+9",
        country: "Japan Standard Time",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00"
    },
    {
        city: "UTC+9:30",
        country: "Australian Central Standard Time",
        timezone: "Australia/Darwin",
        utcOffset: "+09:30"
    },
    {
        city: "UTC+10",
        country: "Australian Eastern Standard Time",
        timezone: "Australia/Sydney",
        utcOffset: "+10:00"
    },
    {
        city: "UTC+10:30",
        country: "Lord Howe Standard Time",
        timezone: "Australia/Lord_Howe",
        utcOffset: "+10:30"
    },
    {
        city: "UTC+11",
        country: "Solomon Islands Time",
        timezone: "Pacific/Guadalcanal",
        utcOffset: "+11:00"
    },
    {
        city: "UTC+12",
        country: "New Zealand Standard Time",
        timezone: "Pacific/Auckland",
        utcOffset: "+12:00"
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
        utcOffset: "+13:00"
    },
    {
        city: "UTC+14",
        country: "Line Islands Time",
        timezone: "Pacific/Kiritimati",
        utcOffset: "+14:00"
    },
    // Common Timezone Standards
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
        utcOffset: "+03:00"
    },
    {
        city: "EST",
        country: "Eastern Standard Time",
        timezone: "America/New_York",
        utcOffset: "-05:00"
    },
    {
        city: "EDT",
        country: "Eastern Daylight Time",
        timezone: "America/New_York",
        utcOffset: "-04:00"
    },
    {
        city: "CST",
        country: "Central Standard Time",
        timezone: "America/Chicago",
        utcOffset: "-06:00"
    },
    {
        city: "CDT",
        country: "Central Daylight Time",
        timezone: "America/Chicago",
        utcOffset: "-05:00"
    },
    {
        city: "MST",
        country: "Mountain Standard Time",
        timezone: "America/Denver",
        utcOffset: "-07:00"
    },
    {
        city: "MDT",
        country: "Mountain Daylight Time",
        timezone: "America/Denver",
        utcOffset: "-06:00"
    },
    {
        city: "PST",
        country: "Pacific Standard Time",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00"
    },
    {
        city: "PDT",
        country: "Pacific Daylight Time",
        timezone: "America/Los_Angeles",
        utcOffset: "-07:00"
    },
    {
        city: "IST",
        country: "India Standard Time",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "JST",
        country: "Japan Standard Time",
        timezone: "Asia/Tokyo",
        utcOffset: "+09:00"
    },
    {
        city: "AEST",
        country: "Australian Eastern Standard Time",
        timezone: "Australia/Sydney",
        utcOffset: "+10:00"
    },
    {
        city: "AEDT",
        country: "Australian Eastern Daylight Time",
        timezone: "Australia/Sydney",
        utcOffset: "+11:00"
    },
    {
        city: "NZST",
        country: "New Zealand Standard Time",
        timezone: "Pacific/Auckland",
        utcOffset: "+12:00"
    },
    {
        city: "NZDT",
        country: "New Zealand Daylight Time",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00"
    },
    // Europe
    {
        city: "London",
        country: "United Kingdom",
        timezone: "Europe/London",
        utcOffset: "+00:00"
    },
    {
        city: "Manchester",
        country: "United Kingdom",
        timezone: "Europe/London",
        utcOffset: "+00:00"
    },
    {
        city: "Edinburgh",
        country: "United Kingdom",
        timezone: "Europe/London",
        utcOffset: "+00:00"
    },
    {
        city: "Paris",
        country: "France",
        timezone: "Europe/Paris",
        utcOffset: "+01:00"
    },
    {
        city: "Lyon",
        country: "France",
        timezone: "Europe/Paris",
        utcOffset: "+01:00"
    },
    {
        city: "Marseille",
        country: "France",
        timezone: "Europe/Paris",
        utcOffset: "+01:00"
    },
    {
        city: "Berlin",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00"
    },
    {
        city: "Munich",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00"
    },
    {
        city: "Hamburg",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00"
    },
    {
        city: "Frankfurt",
        country: "Germany",
        timezone: "Europe/Berlin",
        utcOffset: "+01:00"
    },
    {
        city: "Rome",
        country: "Italy",
        timezone: "Europe/Rome",
        utcOffset: "+01:00"
    },
    {
        city: "Milan",
        country: "Italy",
        timezone: "Europe/Rome",
        utcOffset: "+01:00"
    },
    {
        city: "Naples",
        country: "Italy",
        timezone: "Europe/Rome",
        utcOffset: "+01:00"
    },
    {
        city: "Madrid",
        country: "Spain",
        timezone: "Europe/Madrid",
        utcOffset: "+01:00"
    },
    {
        city: "Barcelona",
        country: "Spain",
        timezone: "Europe/Madrid",
        utcOffset: "+01:00"
    },
    {
        city: "Valencia",
        country: "Spain",
        timezone: "Europe/Madrid",
        utcOffset: "+01:00"
    },
    {
        city: "Amsterdam",
        country: "Netherlands",
        timezone: "Europe/Amsterdam",
        utcOffset: "+01:00"
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
        utcOffset: "+01:00"
    },
    {
        city: "Copenhagen",
        country: "Denmark",
        timezone: "Europe/Copenhagen",
        utcOffset: "+01:00"
    },
    {
        city: "Oslo",
        country: "Norway",
        timezone: "Europe/Oslo",
        utcOffset: "+01:00"
    },
    {
        city: "Stockholm",
        country: "Sweden",
        timezone: "Europe/Stockholm",
        utcOffset: "+01:00"
    },
    {
        city: "Helsinki",
        country: "Finland",
        timezone: "Europe/Helsinki",
        utcOffset: "+02:00"
    },
    {
        city: "Warsaw",
        country: "Poland",
        timezone: "Europe/Warsaw",
        utcOffset: "+01:00"
    },
    {
        city: "Prague",
        country: "Czech Republic",
        timezone: "Europe/Prague",
        utcOffset: "+01:00"
    },
    {
        city: "Vienna",
        country: "Austria",
        timezone: "Europe/Vienna",
        utcOffset: "+01:00"
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
        utcOffset: "+02:00"
    },
    {
        city: "Moscow",
        country: "Russia",
        timezone: "Europe/Moscow",
        utcOffset: "+03:00"
    },
    {
        city: "St. Petersburg",
        country: "Russia",
        timezone: "Europe/Moscow",
        utcOffset: "+03:00"
    },
    // Eastern Europe and Caucasus
    {
        city: "Kiev",
        country: "Ukraine",
        timezone: "Europe/Kiev",
        utcOffset: "+02:00"
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
    // Asia
    {
        city: "Dubai",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00"
    },
    {
        city: "Mumbai",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "Bangkok",
        country: "Thailand",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00"
    },
    {
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore",
        utcOffset: "+08:00"
    },
    {
        city: "Hong Kong",
        country: "China",
        timezone: "Asia/Hong_Kong",
        utcOffset: "+08:00"
    },
    {
        city: "Beijing",
        country: "China",
        timezone: "Asia/Shanghai",
        utcOffset: "+08:00"
    },
    {
        city: "Tokyo",
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
    // Central Asia
    {
        city: "Almaty",
        country: "Kazakhstan",
        timezone: "Asia/Almaty",
        utcOffset: "+06:00"
    },
    {
        city: "Nur-Sultan",
        country: "Kazakhstan",
        timezone: "Asia/Almaty",
        utcOffset: "+06:00"
    },
    {
        city: "Tashkent",
        country: "Uzbekistan",
        timezone: "Asia/Tashkent",
        utcOffset: "+05:00"
    },
    {
        city: "Samarkand",
        country: "Uzbekistan",
        timezone: "Asia/Samarkand",
        utcOffset: "+05:00"
    },
    {
        city: "Bishkek",
        country: "Kyrgyzstan",
        timezone: "Asia/Bishkek",
        utcOffset: "+06:00"
    },
    {
        city: "Dushanbe",
        country: "Tajikistan",
        timezone: "Asia/Dushanbe",
        utcOffset: "+05:00"
    },
    {
        city: "Ashgabat",
        country: "Turkmenistan",
        timezone: "Asia/Ashgabat",
        utcOffset: "+05:00"
    },
    // Oceania
    {
        city: "Sydney",
        country: "Australia",
        timezone: "Australia/Sydney",
        utcOffset: "+11:00"
    },
    {
        city: "Melbourne",
        country: "Australia",
        timezone: "Australia/Melbourne",
        utcOffset: "+11:00"
    },
    {
        city: "Brisbane",
        country: "Australia",
        timezone: "Australia/Brisbane",
        utcOffset: "+10:00"
    },
    {
        city: "Perth",
        country: "Australia",
        timezone: "Australia/Perth",
        utcOffset: "+08:00"
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
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true,
        displayName: "New Zealand Time"
    },
    {
        city: "Wellington",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true,
        displayName: "New Zealand Time"
    },
    {
        city: "Christchurch",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true,
        displayName: "New Zealand Time"
    },
    {
        city: "Hamilton",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true,
        displayName: "New Zealand Time"
    },
    {
        city: "Dunedin",
        country: "New Zealand",
        timezone: "Pacific/Auckland",
        utcOffset: "+13:00",
        standardOffset: "+12:00",
        dstOffset: "+13:00",
        usesDST: true,
        displayName: "New Zealand Time"
    },
    // Asia
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
        utcOffset: "+08:00"
    },
    {
        city: "Hong Kong",
        country: "China",
        timezone: "Asia/Hong_Kong",
        utcOffset: "+08:00"
    },
    {
        city: "Taipei",
        country: "Taiwan",
        timezone: "Asia/Taipei",
        utcOffset: "+08:00"
    },
    {
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore",
        utcOffset: "+08:00"
    },
    {
        city: "Bangkok",
        country: "Thailand",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00"
    },
    {
        city: "Phuket",
        country: "Thailand",
        timezone: "Asia/Bangkok",
        utcOffset: "+07:00"
    },
    {
        city: "Ho Chi Minh City",
        country: "Vietnam",
        timezone: "Asia/Ho_Chi_Minh",
        utcOffset: "+07:00"
    },
    {
        city: "Hanoi",
        country: "Vietnam",
        timezone: "Asia/Ho_Chi_Minh",
        utcOffset: "+07:00"
    },
    {
        city: "Jakarta",
        country: "Indonesia",
        timezone: "Asia/Jakarta",
        utcOffset: "+07:00"
    },
    {
        city: "Bali",
        country: "Indonesia",
        timezone: "Asia/Makassar",
        utcOffset: "+08:00"
    },
    {
        city: "Manila",
        country: "Philippines",
        timezone: "Asia/Manila",
        utcOffset: "+08:00"
    },
    {
        city: "Kuala Lumpur",
        country: "Malaysia",
        timezone: "Asia/Kuala_Lumpur",
        utcOffset: "+08:00"
    },
    {
        city: "Mumbai",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "Delhi",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "Bangalore",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "Chennai",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "Kolkata",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    {
        city: "Hyderabad",
        country: "India",
        timezone: "Asia/Kolkata",
        utcOffset: "+05:30"
    },
    // Middle East
    {
        city: "Dubai",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00"
    },
    {
        city: "Abu Dhabi",
        country: "United Arab Emirates",
        timezone: "Asia/Dubai",
        utcOffset: "+04:00"
    },
    {
        city: "Doha",
        country: "Qatar",
        timezone: "Asia/Qatar",
        utcOffset: "+03:00"
    },
    {
        city: "Riyadh",
        country: "Saudi Arabia",
        timezone: "Asia/Riyadh",
        utcOffset: "+03:00"
    },
    {
        city: "Istanbul",
        country: "Turkey",
        timezone: "Europe/Istanbul",
        utcOffset: "+03:00"
    },
    {
        city: "Tehran",
        country: "Iran",
        timezone: "Asia/Tehran",
        utcOffset: "+03:30"
    },
    // Middle East additions
    {
        city: "Baghdad",
        country: "Iraq",
        timezone: "Asia/Baghdad",
        utcOffset: "+03:00"
    },
    {
        city: "Basra",
        country: "Iraq",
        timezone: "Asia/Baghdad",
        utcOffset: "+03:00"
    },
    {
        city: "Beirut",
        country: "Lebanon",
        timezone: "Asia/Beirut",
        utcOffset: "+02:00"
    },
    {
        city: "Damascus",
        country: "Syria",
        timezone: "Asia/Damascus",
        utcOffset: "+02:00"
    },
    {
        city: "Aleppo",
        country: "Syria",
        timezone: "Asia/Damascus",
        utcOffset: "+02:00"
    },
    {
        city: "Amman",
        country: "Jordan",
        timezone: "Asia/Amman",
        utcOffset: "+02:00"
    },
    {
        city: "Muscat",
        country: "Oman",
        timezone: "Asia/Muscat",
        utcOffset: "+04:00"
    },
    {
        city: "Manama",
        country: "Bahrain",
        timezone: "Asia/Bahrain",
        utcOffset: "+03:00"
    },
    {
        city: "Kuwait City",
        country: "Kuwait",
        timezone: "Asia/Kuwait",
        utcOffset: "+03:00"
    },
    {
        city: "Sanaa",
        country: "Yemen",
        timezone: "Asia/Aden",
        utcOffset: "+03:00"
    },
    // Americas
    {
        city: "New York",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00"
    },
    {
        city: "Los Angeles",
        country: "United States",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00"
    },
    {
        city: "Chicago",
        country: "United States",
        timezone: "America/Chicago",
        utcOffset: "-06:00"
    },
    {
        city: "Houston",
        country: "United States",
        timezone: "America/Chicago",
        utcOffset: "-06:00"
    },
    {
        city: "Phoenix",
        country: "United States",
        timezone: "America/Phoenix",
        utcOffset: "-07:00"
    },
    {
        city: "Philadelphia",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00"
    },
    {
        city: "San Francisco",
        country: "United States",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00"
    },
    {
        city: "Boston",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00"
    },
    {
        city: "Seattle",
        country: "United States",
        timezone: "America/Los_Angeles",
        utcOffset: "-08:00"
    },
    {
        city: "Miami",
        country: "United States",
        timezone: "America/New_York",
        utcOffset: "-05:00"
    },
    {
        city: "Toronto",
        country: "Canada",
        timezone: "America/Toronto",
        utcOffset: "-05:00"
    },
    {
        city: "Vancouver",
        country: "Canada",
        timezone: "America/Vancouver",
        utcOffset: "-08:00"
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
        utcOffset: "-07:00"
    },
    {
        city: "Ottawa",
        country: "Canada",
        timezone: "America/Toronto",
        utcOffset: "-05:00"
    },
    {
        city: "Mexico City",
        country: "Mexico",
        timezone: "America/Mexico_City",
        utcOffset: "-06:00"
    },
    {
        city: "Guadalajara",
        country: "Mexico",
        timezone: "America/Mexico_City",
        utcOffset: "-06:00"
    },
    {
        city: "Monterrey",
        country: "Mexico",
        timezone: "America/Monterrey",
        utcOffset: "-06:00"
    },
    {
        city: "São Paulo",
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        utcOffset: "-03:00"
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        utcOffset: "-03:00"
    },
    {
        city: "Brasília",
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        utcOffset: "-03:00"
    },
    {
        city: "Buenos Aires",
        country: "Argentina",
        timezone: "America/Argentina/Buenos_Aires",
        utcOffset: "-03:00"
    },
    {
        city: "Lima",
        country: "Peru",
        timezone: "America/Lima",
        utcOffset: "-05:00"
    },
    {
        city: "Bogotá",
        country: "Colombia",
        timezone: "America/Bogota",
        utcOffset: "-05:00"
    },
    {
        city: "Santiago",
        country: "Chile",
        timezone: "America/Santiago",
        utcOffset: "-03:00"
    },
    // Africa
    {
        city: "Cairo",
        country: "Egypt",
        timezone: "Africa/Cairo",
        utcOffset: "+02:00"
    },
    {
        city: "Alexandria",
        country: "Egypt",
        timezone: "Africa/Cairo",
        utcOffset: "+02:00"
    },
    {
        city: "Lagos",
        country: "Nigeria",
        timezone: "Africa/Lagos",
        utcOffset: "+01:00"
    },
    {
        city: "Abuja",
        country: "Nigeria",
        timezone: "Africa/Lagos",
        utcOffset: "+01:00"
    },
    {
        city: "Nairobi",
        country: "Kenya",
        timezone: "Africa/Nairobi",
        utcOffset: "+03:00"
    },
    {
        city: "Mombasa",
        country: "Kenya",
        timezone: "Africa/Nairobi",
        utcOffset: "+03:00"
    },
    {
        city: "Johannesburg",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00"
    },
    {
        city: "Cape Town",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00"
    },
    {
        city: "Durban",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00"
    },
    {
        city: "Pretoria",
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        utcOffset: "+02:00"
    },
    {
        city: "Casablanca",
        country: "Morocco",
        timezone: "Africa/Casablanca",
        utcOffset: "+01:00"
    },
    {
        city: "Rabat",
        country: "Morocco",
        timezone: "Africa/Casablanca",
        utcOffset: "+01:00"
    },
    {
        city: "Addis Ababa",
        country: "Ethiopia",
        timezone: "Africa/Addis_Ababa",
        utcOffset: "+03:00"
    },
    {
        city: "Dar es Salaam",
        country: "Tanzania",
        timezone: "Africa/Dar_es_Salaam",
        utcOffset: "+03:00"
    },
    {
        city: "Kampala",
        country: "Uganda",
        timezone: "Africa/Kampala",
        utcOffset: "+03:00"
    },
    {
        city: "Kigali",
        country: "Rwanda",
        timezone: "Africa/Kigali",
        utcOffset: "+02:00"
    },
    {
        city: "Accra",
        country: "Ghana",
        timezone: "Africa/Accra",
        utcOffset: "+00:00"
    },
    {
        city: "Dakar",
        country: "Senegal",
        timezone: "Africa/Dakar",
        utcOffset: "+00:00"
    },
    {
        city: "Luanda",
        country: "Angola",
        timezone: "Africa/Luanda",
        utcOffset: "+01:00"
    },
    {
        city: "Khartoum",
        country: "Sudan",
        timezone: "Africa/Khartoum",
        utcOffset: "+02:00"
    },
    // South Asia additions
    {
        city: "Karachi",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00"
    },
    {
        city: "Lahore",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00"
    },
    {
        city: "Islamabad",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        utcOffset: "+05:00"
    },
    {
        city: "Dhaka",
        country: "Bangladesh",
        timezone: "Asia/Dhaka",
        utcOffset: "+06:00"
    },
    {
        city: "Chittagong",
        country: "Bangladesh",
        timezone: "Asia/Dhaka",
        utcOffset: "+06:00"
    },
    {
        city: "Colombo",
        country: "Sri Lanka",
        timezone: "Asia/Colombo",
        utcOffset: "+05:30"
    },
    {
        city: "Kathmandu",
        country: "Nepal",
        timezone: "Asia/Kathmandu",
        utcOffset: "+05:45"
    },
    {
        city: "Thimphu",
        country: "Bhutan",
        timezone: "Asia/Thimphu",
        utcOffset: "+06:00"
    },
    // Southeast Asia additions
    {
        city: "Yangon",
        country: "Myanmar",
        timezone: "Asia/Yangon",
        utcOffset: "+06:30"
    },
    {
        city: "Mandalay",
        country: "Myanmar",
        timezone: "Asia/Yangon",
        utcOffset: "+06:30"
    },
    {
        city: "Vientiane",
        country: "Laos",
        timezone: "Asia/Vientiane",
        utcOffset: "+07:00"
    },
    {
        city: "Phnom Penh",
        country: "Cambodia",
        timezone: "Asia/Phnom_Penh",
        utcOffset: "+07:00"
    },
    {
        city: "Siem Reap",
        country: "Cambodia",
        timezone: "Asia/Phnom_Penh",
        utcOffset: "+07:00"
    },
    // Pacific additions
    {
        city: "Port Moresby",
        country: "Papua New Guinea",
        timezone: "Pacific/Port_Moresby",
        utcOffset: "+10:00"
    },
    {
        city: "Suva",
        country: "Fiji",
        timezone: "Pacific/Fiji",
        utcOffset: "+12:00"
    },
    {
        city: "Honiara",
        country: "Solomon Islands",
        timezone: "Pacific/Guadalcanal",
        utcOffset: "+11:00"
    },
    {
        city: "Noumea",
        country: "New Caledonia",
        timezone: "Pacific/Noumea",
        utcOffset: "+11:00"
    },
    // Balkans
    {
        city: "Sofia",
        country: "Bulgaria",
        timezone: "Europe/Sofia",
        utcOffset: "+02:00"
    },
    {
        city: "Plovdiv",
        country: "Bulgaria",
        timezone: "Europe/Sofia",
        utcOffset: "+02:00"
    },
    {
        city: "Varna",
        country: "Bulgaria",
        timezone: "Europe/Sofia",
        utcOffset: "+02:00"
    },
    {
        city: "Belgrade",
        country: "Serbia",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00"
    },
    {
        city: "Novi Sad",
        country: "Serbia",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00"
    },
    {
        city: "Zagreb",
        country: "Croatia",
        timezone: "Europe/Zagreb",
        utcOffset: "+01:00"
    },
    {
        city: "Split",
        country: "Croatia",
        timezone: "Europe/Zagreb",
        utcOffset: "+01:00"
    },
    {
        city: "Dubrovnik",
        country: "Croatia",
        timezone: "Europe/Zagreb",
        utcOffset: "+01:00"
    },
    {
        city: "Ljubljana",
        country: "Slovenia",
        timezone: "Europe/Ljubljana",
        utcOffset: "+01:00"
    },
    {
        city: "Maribor",
        country: "Slovenia",
        timezone: "Europe/Ljubljana",
        utcOffset: "+01:00"
    },
    {
        city: "Sarajevo",
        country: "Bosnia and Herzegovina",
        timezone: "Europe/Sarajevo",
        utcOffset: "+01:00"
    },
    {
        city: "Mostar",
        country: "Bosnia and Herzegovina",
        timezone: "Europe/Sarajevo",
        utcOffset: "+01:00"
    },
    {
        city: "Skopje",
        country: "North Macedonia",
        timezone: "Europe/Skopje",
        utcOffset: "+01:00"
    },
    {
        city: "Ohrid",
        country: "North Macedonia",
        timezone: "Europe/Skopje",
        utcOffset: "+01:00"
    },
    {
        city: "Tirana",
        country: "Albania",
        timezone: "Europe/Tirane",
        utcOffset: "+01:00"
    },
    {
        city: "Durres",
        country: "Albania",
        timezone: "Europe/Tirane",
        utcOffset: "+01:00"
    },
    {
        city: "Podgorica",
        country: "Montenegro",
        timezone: "Europe/Podgorica",
        utcOffset: "+01:00"
    },
    {
        city: "Budva",
        country: "Montenegro",
        timezone: "Europe/Podgorica",
        utcOffset: "+01:00"
    },
    {
        city: "Pristina",
        country: "Kosovo",
        timezone: "Europe/Belgrade",
        utcOffset: "+01:00"
    },
    // Additional European Cities
    {
        city: "Reykjavik",
        country: "Iceland",
        timezone: "Atlantic/Reykjavik",
        utcOffset: "+00:00"
    },
    {
        city: "Malta",
        country: "Malta",
        timezone: "Europe/Malta",
        utcOffset: "+01:00"
    },
    {
        city: "Valletta",
        country: "Malta",
        timezone: "Europe/Malta",
        utcOffset: "+01:00"
    },
    {
        city: "Luxembourg",
        country: "Luxembourg",
        timezone: "Europe/Luxembourg",
        utcOffset: "+01:00"
    },
    {
        city: "Andorra la Vella",
        country: "Andorra",
        timezone: "Europe/Andorra",
        utcOffset: "+01:00"
    },
    {
        city: "Monaco",
        country: "Monaco",
        timezone: "Europe/Monaco",
        utcOffset: "+01:00"
    },
    {
        city: "San Marino",
        country: "San Marino",
        timezone: "Europe/San_Marino",
        utcOffset: "+01:00"
    },
    {
        city: "Vatican City",
        country: "Vatican City",
        timezone: "Europe/Vatican",
        utcOffset: "+01:00"
    },
    // Additional Caribbean Cities
    {
        city: "Nassau",
        country: "Bahamas",
        timezone: "America/Nassau",
        utcOffset: "-05:00"
    },
    {
        city: "Kingston",
        country: "Jamaica",
        timezone: "America/Jamaica",
        utcOffset: "-05:00"
    },
    {
        city: "Havana",
        country: "Cuba",
        timezone: "America/Havana",
        utcOffset: "-05:00"
    },
    {
        city: "Santo Domingo",
        country: "Dominican Republic",
        timezone: "America/Santo_Domingo",
        utcOffset: "-04:00"
    },
    {
        city: "Port-au-Prince",
        country: "Haiti",
        timezone: "America/Port-au-Prince",
        utcOffset: "-05:00"
    },
    {
        city: "San Juan",
        country: "Puerto Rico",
        timezone: "America/Puerto_Rico",
        utcOffset: "-04:00"
    },
    // Additional Central American Cities
    {
        city: "Panama City",
        country: "Panama",
        timezone: "America/Panama",
        utcOffset: "-05:00"
    },
    {
        city: "San Jose",
        country: "Costa Rica",
        timezone: "America/Costa_Rica",
        utcOffset: "-06:00"
    },
    {
        city: "Managua",
        country: "Nicaragua",
        timezone: "America/Managua",
        utcOffset: "-06:00"
    },
    {
        city: "Tegucigalpa",
        country: "Honduras",
        timezone: "America/Tegucigalpa",
        utcOffset: "-06:00"
    },
    {
        city: "San Salvador",
        country: "El Salvador",
        timezone: "America/El_Salvador",
        utcOffset: "-06:00"
    },
    {
        city: "Guatemala City",
        country: "Guatemala",
        timezone: "America/Guatemala",
        utcOffset: "-06:00"
    },
    {
        city: "Belmopan",
        country: "Belize",
        timezone: "America/Belize",
        utcOffset: "-06:00"
    },
    // Additional African Cities
    {
        city: "Tunis",
        country: "Tunisia",
        timezone: "Africa/Tunis",
        utcOffset: "+01:00"
    },
    {
        city: "Tripoli",
        country: "Libya",
        timezone: "Africa/Tripoli",
        utcOffset: "+02:00"
    },
    {
        city: "Benghazi",
        country: "Libya",
        timezone: "Africa/Tripoli",
        utcOffset: "+02:00"
    },
    {
        city: "Algiers",
        country: "Algeria",
        timezone: "Africa/Algiers",
        utcOffset: "+01:00"
    },
    {
        city: "Oran",
        country: "Algeria",
        timezone: "Africa/Algiers",
        utcOffset: "+01:00"
    },
    {
        city: "Bamako",
        country: "Mali",
        timezone: "Africa/Bamako",
        utcOffset: "+00:00"
    },
    {
        city: "Ouagadougou",
        country: "Burkina Faso",
        timezone: "Africa/Ouagadougou",
        utcOffset: "+00:00"
    },
    {
        city: "Niamey",
        country: "Niger",
        timezone: "Africa/Niamey",
        utcOffset: "+01:00"
    },
    {
        city: "Conakry",
        country: "Guinea",
        timezone: "Africa/Conakry",
        utcOffset: "+00:00"
    },
    {
        city: "Freetown",
        country: "Sierra Leone",
        timezone: "Africa/Freetown",
        utcOffset: "+00:00"
    },
    {
        city: "Monrovia",
        country: "Liberia",
        timezone: "Africa/Monrovia",
        utcOffset: "+00:00"
    },
    {
        city: "Abidjan",
        country: "Ivory Coast",
        timezone: "Africa/Abidjan",
        utcOffset: "+00:00"
    },
    {
        city: "Yamoussoukro",
        country: "Ivory Coast",
        timezone: "Africa/Abidjan",
        utcOffset: "+00:00"
    },
    {
        city: "Lome",
        country: "Togo",
        timezone: "Africa/Lome",
        utcOffset: "+00:00"
    },
    {
        city: "Cotonou",
        country: "Benin",
        timezone: "Africa/Porto-Novo",
        utcOffset: "+01:00"
    },
    {
        city: "Porto-Novo",
        country: "Benin",
        timezone: "Africa/Porto-Novo",
        utcOffset: "+01:00"
    },
    {
        city: "Yaounde",
        country: "Cameroon",
        timezone: "Africa/Douala",
        utcOffset: "+01:00"
    },
    {
        city: "Douala",
        country: "Cameroon",
        timezone: "Africa/Douala",
        utcOffset: "+01:00"
    }
];
