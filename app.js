class TimeZoneManager {
    constructor() {
        this.initialized = false;
        this.timezones = new Set();
        this.use24Hour = true;
        this.selectedDate = new Date();
        this.timeUpdateInterval = null;
        this.activeSlider = null;
        this.isUpdating = false;
        this.pendingTimes = null; // New property to store pending times
        this.mapInitialized = false; // Track map initialization state
        this.activeTab = 'time-converter'; // Set default tab
        this.draggedElement = null;
        this.draggedSliderValue = undefined; // Store slider value during drag
        
        // Get DOM elements first
        this.container = document.querySelector('.container');
        this.searchInput = document.getElementById('timezoneSearch');
        this.searchResults = document.getElementById('searchResults');
        this.timezonesContainer = document.getElementById('timezoneList');
        this.timeFormatEl = document.getElementById('timeFormat');
        this.timeFormatTextEl = document.getElementById('timeFormatText');
        this.removeAllButton = document.getElementById('removeAll');
        this.copyUrlButton = document.getElementById('copyUrl');
        this.timeGridBody = document.getElementById('timeGridBody');
        
        // Create debounced update function
        this.debouncedUpdateUrl = this.debounce(() => {
            this.updateStateUrl();
        }, 500);
        
        // Set up URL state handling
        this.setupStateChangeHandlers();
        
        // Load state from URL if present and render
        if (window.location.search) {
            this.loadStateFromUrl();
        }
        
        // Initialize components
        this.initializeTabs();
        this.initializeEventListeners();
        this.initializeDatePicker();
        this.startCurrentTimeUpdate();
        
        // Initial render
        this.render();
        
        this.initialized = true;
    }
    
    loadStateFromUrl() {
        console.log('Loading state from URL');
        const params = new URLSearchParams(window.location.search);
        let stateChanged = false;
        
        // Load timezones and their times
        const zones = params.get('zones');
        console.log('URL zones:', zones);
        
        if (zones) {
            const zoneList = zones.split(',');
            console.log('Parsed zones:', zoneList);
            
            zoneList.forEach(zoneData => {
                // Handle both encoded and unencoded @ symbols
                const atIndex = zoneData.indexOf('@');
                if (atIndex === -1) {
                    const zone = decodeURIComponent(zoneData);
                    console.log('Processing zone without time:', zone);
                    if (this.isValidTimezone(zone)) {
                        console.log('Zone is valid:', zone);
                        this.timezones.add(zone);
                        stateChanged = true;
                    }
                } else {
                    const zone = decodeURIComponent(zoneData.substring(0, atIndex));
                    const time = decodeURIComponent(zoneData.substring(atIndex + 1));
                    console.log('Processing zone:', zone, 'time:', time);
                    
                    if (this.isValidTimezone(zone)) {
                        console.log('Zone is valid:', zone);
                        this.timezones.add(zone);
                        stateChanged = true;
                        
                        // If time is specified, set it after render
                        if (time) {
                            const [hours, minutes] = time.split(':').map(Number);
                            // Convert to slider intervals (15-minute intervals, 0-95)
                            const sliderValue = (hours * 4) + Math.floor(minutes / 15);
                            console.log('Storing time for', zone, ':', hours, ':', minutes, '=', sliderValue, 'intervals');
                            
                            // Store the time to be set after render
                            if (!this.pendingTimes) {
                                this.pendingTimes = new Map();
                            }
                            this.pendingTimes.set(zone, sliderValue);
                        }
                    } else {
                        console.log('Invalid timezone:', zone);
                    }
                }
            });
        }
        
        // Load date
        const date = params.get('date');
        if (date) {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) {
                this.selectedDate = parsedDate;
                stateChanged = true;
                console.log('Set date:', parsedDate);
            }
        }
        
        // Load time format
        const format = params.get('format');
        if (format) {
            const use24h = format === '24h';
            if (this.use24Hour !== use24h) {
                this.use24Hour = use24h;
                if (this.timeFormatTextEl) {
                    this.timeFormatTextEl.textContent = this.use24Hour ? '24h' : '12h';
                }
                stateChanged = true;
                console.log('Set time format:', use24h ? '24h' : '12h');
            }
        }
        
        // Load active tab
        const tab = params.get('tab');
        if (tab && tab !== 'undefined') {
            this.activeTab = tab;
            console.log('Set active tab:', tab);
        }
        
        // Render if state changed
        if (stateChanged) {
            console.log('State changed, rendering...');
            this.render();
            
            // Apply pending times after render
            if (this.pendingTimes && this.pendingTimes.size > 0) {
                console.log('Applying pending times:', this.pendingTimes);
                setTimeout(() => {
                    // Get first timezone as reference
                    const [refZone, refValue] = Array.from(this.pendingTimes.entries())[0];
                    console.log('Using reference timezone:', refZone, 'with value:', refValue);
                    
                    const entry = document.querySelector(`[data-timezone="${refZone}"]`);
                    if (entry) {
                        const slider = entry.querySelector('input[type="range"]');
                        if (slider) {
                            console.log('Setting reference slider value:', refValue);
                            
                            // Set as active slider and trigger input handler
                            this.activeSlider = slider;
                            slider.value = refValue;
                            this.handleSliderEvent(slider, refZone);
                        }
                    }
                    
                    this.pendingTimes.clear();
                    console.log('Cleared pending times');
                }, 100);
            }
        }
    }

    isValidTimezone(timezone) {
        try {
            console.log('Validating timezone:', timezone);
            Intl.DateTimeFormat(undefined, { timeZone: timezone });
            console.log('Timezone is valid:', timezone);
            return true;
        } catch (e) {
            console.log('Invalid timezone:', timezone);
            return false;
        }
    }

    render() {
        if (!this.timezonesContainer) return;
        
        // Clear existing entries
        this.timezonesContainer.innerHTML = '';
        
        // Create new entries for each timezone
        Array.from(this.timezones).forEach(timezone => {
            const entry = this.createTimezoneEntry(timezone);
            this.timezonesContainer.appendChild(entry);
        });
        
        // Update the time grid if we're in meeting planner mode
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab && activeTab.getAttribute('data-tab') === 'meeting-planner') {
            this.updateTimeGrid();
        }
    }

    findTimezoneData(timezone) {
        return timezoneData.find(tz => 
            tz.timezones.some(t => t === timezone)
        );
    }

    setupStateChangeHandlers() {
        // Debounce URL updates to avoid too many history entries
        let updateTimeout;
        const updateUrl = () => {
            if (!this.initialized) return;
            
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(() => {
                const params = new URLSearchParams();
                
                // Add timezones with their current times
                if (this.timezones.size > 0) {
                    const timezones = Array.from(this.timezones).map(timezone => {
                        let time = timezone;
                        const entry = document.querySelector(`[data-timezone="${timezone}"]`);
                        if (entry) {
                            const slider = entry.querySelector('input[type="range"]');
                            if (slider) {
                                const sliderValue = parseInt(slider.value);
                                const hours = Math.floor(sliderValue / 4);
                                const minutes = (sliderValue % 4) * 15;
                                time = `${timezone}@${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                            }
                        }
                        return time;
                    });
                    params.set('zones', timezones.join(','));
                }
                
                // Add date if not today
                if (this.selectedDate) {
                    params.set('date', this.selectedDate.toISOString().split('T')[0]);
                }
                
                // Add time format
                params.set('format', this.use24Hour ? '24h' : '12h');
                
                // Add active tab
                params.set('tab', this.activeTab);
                
                // Update URL without reloading
                const search = params.toString();
                const newUrl = `${window.location.pathname}${search ? '?' + search : ''}`;
                window.history.replaceState(null, '', newUrl);
            }, 500);
        };

        // Add state change listener
        this.onStateChange = () => {
            if (this.initialized) {
                this.debouncedUpdateUrl();
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    updateStateUrl() {
        console.log('[updateStateUrl] Updating URL state');
        const params = new URLSearchParams();
        
        // Add timezones with their current times
        if (this.timezones.size > 0) {
            const timezones = Array.from(this.timezones).map(timezone => {
                let time = timezone;
                const entry = document.querySelector(`[data-timezone="${timezone}"]`);
                if (entry) {
                    const slider = entry.querySelector('input[type="range"]');
                    if (slider) {
                        const sliderValue = parseInt(slider.value);
                        const hours = Math.floor(sliderValue / 4);
                        const minutes = (sliderValue % 4) * 15;
                        time = `${timezone}@${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    }
                }
                return time;
            });
            params.set('zones', timezones.join(','));
        }
        
        // Add date if not today
        if (this.selectedDate) {
            params.set('date', this.selectedDate.toISOString().split('T')[0]);
        }
        
        // Add time format
        params.set('format', this.use24Hour ? '24h' : '12h');
        
        // Add active tab, always ensuring a default value
        params.set('tab', this.activeTab || 'time-converter');
        
        // Update URL without reloading
        const search = params.toString();
        const newUrl = `${window.location.pathname}${search ? '?' + search : ''}`;
        window.history.replaceState(null, '', newUrl);
    }

    initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        const activateTab = (tabId) => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            const button = document.querySelector(`[data-tab="${tabId}"]`);
            if (button) {
                button.classList.add('active');
                const content = document.getElementById(tabId);
                if (content) {
                    content.classList.add('active');
                }
            }
            
            // Initialize specific tab content if needed
            if (tabId === 'world-map' && !this.mapInitialized) {
                this.initializeWorldMap();
            } else if (tabId === 'meeting-planner') {
                this.updateTimeGrid();
            }
            
            // Update active tab and URL state
            this.activeTab = tabId;
            this.onStateChange();
        };
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                activateTab(tabId);
            });
        });
        
        // Set initial active tab
        if (this.activeTab) {
            activateTab(this.activeTab);
        } else {
            this.activeTab = 'time-converter';
            activateTab('time-converter');
        }
    }

    initializeWorldMap() {
        console.log('Initializing world map...');
        
        // Initialize the map
        this.map = L.map('world-map').setView([20, 0], 2);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'OpenStreetMap contributors'
        }).addTo(this.map);

        // Create custom light blue marker icon
        this.markerIcon = L.divIcon({
            className: 'custom-marker',
            html: '<svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 24 12 24s12-15 12-24c0-6.617-5.383-12-12-12zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" fill="#1565C0"/></svg>',
            iconSize: [24, 36],
            iconAnchor: [12, 36],
            popupAnchor: [0, -36]
        });
        
        // Add markers for existing timezones
        this.updateMapMarkers();
        
        // Listen for timezone changes
        this.onStateChange = () => {
            if (this.initialized) {
                this.debouncedUpdateUrl();
                this.updateMapMarkers();
            }
        };
        
        this.mapInitialized = true;
    }
    
    updateMapMarkers() {
        console.log('Updating map markers...');
        
        // Clear existing markers
        if (this.markers) {
            this.markers.forEach(marker => marker.remove());
        }
        this.markers = [];
        
        // Add markers for each timezone
        this.timezones.forEach(timezone => {
            const city = timezone.split('/').pop().replace(/_/g, ' ');
            const coordinates = this.getTimezoneCoordinates(timezone);
            
            if (coordinates) {
                const marker = L.marker([coordinates.lat, coordinates.lng], {
                    icon: this.markerIcon
                }).bindPopup(`
                    <div class="map-popup">
                        <h3>${city}</h3>
                        <div class="time" data-timezone="${timezone}"></div>
                    </div>
                `).addTo(this.map);
                
                this.markers.push(marker);
                
                // Update popup time when opened
                marker.on('popupopen', () => {
                    const timeEl = marker.getPopup().getContent().querySelector('.time');
                    if (timeEl) {
                        const formatter = new Intl.DateTimeFormat('en-US', {
                            timeZone: timezone,
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: !this.use24Hour,
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        });
                        timeEl.textContent = formatter.format(this.selectedDate);
                    }
                });
            }
        });
    }
    
    getTimezoneCoordinates(timezone) {
        // Find the timezone entry in timezoneData
        const entry = timezoneData.find(entry => entry.timezone === timezone);
        if (entry && entry.coordinates) {
            return {
                lat: entry.coordinates.latitude,
                lng: entry.coordinates.longitude
            };
        }
        return null;
    }
    
    updateTimeGrid() {
        if (!this.timeGridBody) return;
        
        // Clear existing content
        this.timeGridBody.innerHTML = '';
        
        // Update location headers
        const locationHeadersRow = document.getElementById('locationHeaders');
        if (locationHeadersRow) {
            // Clear existing headers except the first empty cell
            while (locationHeadersRow.children.length > 1) {
                locationHeadersRow.removeChild(locationHeadersRow.lastChild);
            }
            
            // Add location headers with timezone offset
            Array.from(this.timezones).forEach(timezone => {
                const th = document.createElement('th');
                const tzData = this.getTimezoneData(timezone);
                const date = new Date();
                const offset = -date.getTimezoneOffset() / 60;
                const tzOffset = this.getTimezoneOffset(timezone);
                th.textContent = `${tzData.city}, ${tzData.country} (UTC${tzOffset >= 0 ? '+' : ''}${tzOffset})`;
                locationHeadersRow.appendChild(th);
            });
        }
        
        // Create 24 rows for each hour
        for (let i = 0; i < 24; i++) {
            const row = document.createElement('tr');
            
            // Calculate the UTC time for this row
            const utcDate = new Date(this.selectedDate);
            utcDate.setHours(i, 0, 0, 0);
            
            // Add UTC time cell with date
            const utcCell = document.createElement('td');
            utcCell.className = 'utc-time';
            const dateStr = utcDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            utcCell.textContent = `${dateStr} at ${i.toString().padStart(2, '0')}:00:00`;
            row.appendChild(utcCell);
            
            // Add cells for each timezone
            Array.from(this.timezones).forEach(timezone => {
                const cell = document.createElement('td');
                cell.className = 'time-cell';
                
                // Convert UTC time to timezone time using moment-timezone
                const tzTime = moment.utc(utcDate).tz(timezone);
                const tzHour = tzTime.hour();
                
                // Determine cell type based on hour
                if (tzHour >= 9 && tzHour < 17) {
                    cell.classList.add('working-hours');
                } else if ((tzHour >= 7 && tzHour < 9) || (tzHour >= 17 && tzHour < 19)) {
                    cell.classList.add('off-hours');
                } else {
                    cell.classList.add('sleeping-hours');
                }
                
                // Format the time
                cell.textContent = tzTime.format(this.use24Hour ? 'HH:mm' : 'hh:mm A');
                
                // Add click handler for time details
                cell.addEventListener('click', () => {
                    this.showTimeDetails(utcDate, timezone);
                });
                
                row.appendChild(cell);
            });
            
            this.timeGridBody.appendChild(row);
        }
    }

    getTimezoneOffset(timezone) {
        const date = new Date();
        const tzTime = moment.tz(date, timezone);
        return tzTime.utcOffset() / 60;
    }

    showTimeDetails(utcDate, timezone) {
        const allTimezones = Array.from(this.timezones);
        const details = allTimezones.map(tz => {
            const tzTime = moment.utc(utcDate).tz(tz);
            const tzData = this.getTimezoneData(tz);
            return `${tzData.city}: ${tzTime.format(this.use24Hour ? 'HH:mm' : 'hh:mm A')}`;
        }).join('\n');
        
        alert(`Meeting times:\n${details}`);
    }

    initializeEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => {
                this.handleSearch();
            });
        }

        if (this.timeFormatEl) {
            this.timeFormatEl.addEventListener('click', () => {
                this.toggleTimeFormat();
            });
        }

        if (this.removeAllButton) {
            this.removeAllButton.addEventListener('click', () => {
                this.removeAllTimezones();
            });
        }

        const copyUrlButton = document.getElementById('copyUrl');
        if (copyUrlButton) {
            copyUrlButton.addEventListener('click', () => {
                this.copyCurrentUrl();
            });
        }

        const copyTimezonesButton = document.getElementById('copyTimezones');
        if (copyTimezonesButton) {
            copyTimezonesButton.addEventListener('click', () => {
                this.copyTimezoneInformation();
            });
        }

        // Add global slider event handlers
        if (this.timezonesContainer) {
            this.timezonesContainer.addEventListener('input', (e) => {
                if (e.target.classList.contains('timeline-slider')) {
                    this.handleSliderEvent(e.target, e.target.closest('.timezone-entry').getAttribute('data-timezone'));
                }
            });

            this.timezonesContainer.addEventListener('change', (e) => {
                if (e.target.classList.contains('timeline-slider')) {
                    this.handleSliderEvent(e.target, e.target.closest('.timezone-entry').getAttribute('data-timezone'));
                }
            });
        }
        
        // Copy URL button
        if (this.copyUrlButton) {
            this.copyUrlButton.addEventListener('click', () => {
                this.copyCurrentUrl();
            });
        }
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });
        
        if (this.searchResults) {
            this.searchResults.addEventListener('click', (e) => {
                if (e.target.classList.contains('location-info')) {
                    const timezone = e.target.parentNode.getAttribute('data-timezone');
                    this.addTimezone(timezone);
                    this.searchInput.value = '';
                    this.hideSearchResults();
                    this.render();
                }
            });
        }
    }

    handleSliderEvent(slider, timezone) {
        console.log('[handleSliderEvent] Starting with:', {
            timezone,
            sliderValue: slider.value,
            selectedDate: this.selectedDate
        });

        if (!this.selectedDate) {
            console.warn('[handleSliderEvent] No selected date');
            return;
        }

        const value = parseInt(slider.value);
        const hours = Math.floor(value / 4);
        const minutes = (value % 4) * 15;

        console.log('[handleSliderEvent] Processing slider event:', {
            timezone,
            value,
            totalMinutes: hours * 60 + minutes,
            hours,
            mins: minutes
        });

        try {
            // Get the current date components in the source timezone
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            const dateParts = formatter.formatToParts(this.selectedDate);
            const year = parseInt(dateParts.find(p => p.type === 'year').value);
            const month = parseInt(dateParts.find(p => p.type === 'month').value) - 1;
            const day = parseInt(dateParts.find(p => p.type === 'day').value);

            // Create a date object representing the local time in the source timezone
            const localDate = new Date(Date.UTC(year, month, day, hours, minutes));

            console.log('[handleSliderEvent] Created local date:', {
                timezone,
                localDate: localDate.toISOString(),
                components: { year, month, day, hours, minutes }
            });

            // Convert to UTC by applying the timezone offset
            const tzFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const timeParts = tzFormatter.formatToParts(localDate);
            const sourceHours = parseInt(timeParts.find(p => p.type === 'hour').value);
            const sourceMinutes = parseInt(timeParts.find(p => p.type === 'minute').value);
            
            // Calculate offset from UTC
            const offset = (hours * 60 + minutes) - (sourceHours * 60 + sourceMinutes);
            const utcDate = new Date(localDate.getTime() + offset * 60 * 1000);

            console.log('[handleSliderEvent] Time conversion results:', {
                sourceTime: `${sourceHours}:${sourceMinutes}`,
                targetTime: `${hours}:${minutes}`,
                offset,
                utcDate: utcDate.toISOString()
            });

            // Update all other timezones based on the UTC time
            this.updateOtherTimezones(timezone, utcDate);
            
            // Update URL to reflect new time
            this.debouncedUpdateUrl();
        } catch (error) {
            console.error('[handleSliderEvent] Error:', error);
        }
    }

    updateOtherTimezones(sourceTimezone, sourceDate) {
        console.log('[updateOtherTimezones] Starting update', {
            sourceTimezone,
            sourceDate: sourceDate.toISOString()
        });

        if (this.isUpdating) {
            console.log('[updateOtherTimezones] Update already in progress, skipping');
            return;
        }

        this.isUpdating = true;
        try {
            const entries = document.querySelectorAll('.timezone-entry');
            entries.forEach(entry => {
                const targetTimezone = entry.getAttribute('data-timezone');
                if (!targetTimezone) {
                    console.error('[updateOtherTimezones] Missing timezone attribute');
                    return;
                }

                const timeDisplay = entry.querySelector('.timezone-hour');
                const dateDisplay = entry.querySelector('.timezone-date');
                const slider = entry.querySelector('.timeline-slider');

                if (!timeDisplay || !dateDisplay || !slider) {
                    console.error('[updateOtherTimezones] Missing UI elements for', targetTimezone);
                    return;
                }

                // Format the time and date for display
                const timeFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: targetTimezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: !this.use24Hour
                });
                const dateFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: targetTimezone,
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });

                // Always update the displays for all timezones
                const formattedTime = timeFormatter.format(sourceDate);
                const formattedDate = dateFormatter.format(sourceDate);
                
                timeDisplay.textContent = formattedTime;
                dateDisplay.textContent = formattedDate;

                console.log('[updateOtherTimezones] Updated displays:', {
                    timezone: targetTimezone,
                    time: formattedTime,
                    date: formattedDate
                });

                // Update slider position for non-source timezones
                if (targetTimezone !== sourceTimezone) {
                    const formatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: targetTimezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });

                    const timeParts = formatter.formatToParts(sourceDate);
                    const hours = parseInt(timeParts.find(p => p.type === 'hour').value);
                    const minutes = parseInt(timeParts.find(p => p.type === 'minute').value);
                    const sliderValue = (hours * 4) + Math.floor(minutes / 15);

                    console.log('[updateOtherTimezones] Updating slider:', {
                        timezone: targetTimezone,
                        hours,
                        minutes,
                        sliderValue,
                        previousValue: slider.value
                    });

                    slider.value = sliderValue;
                }
            });
        } catch (error) {
            console.error('[updateOtherTimezones] Error updating timezones:', error);
        } finally {
            console.log('[updateOtherTimezones] Finished update');
            this.isUpdating = false;
        }
    }
    
    initializeTimeSlider(element, timezone) {
        console.log('[initializeTimeSlider] Starting initialization', {
            timezone,
            selectedDate: this.selectedDate.toISOString()
        });

        const slider = element.querySelector('.timeline-slider');
        if (!slider) {
            console.error('[initializeTimeSlider] No slider found for timezone:', timezone);
            return;
        }

        // Initial update - only update this timezone's display
        const initialDate = new Date(this.selectedDate);
        this.updateTimezoneDisplay(element, timezone, parseInt(slider.value), initialDate);
    }
    
    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        if (!searchTerm) {
            this.hideSearchResults();
            return;
        }
        
        const results = timezoneData.filter(item => 
            item.city.toLowerCase().includes(searchTerm) ||
            item.country.toLowerCase().includes(searchTerm) ||
            item.timezone.toLowerCase().includes(searchTerm) ||
            item.utcOffset.toLowerCase().includes(searchTerm)
        );
        
        this.showSearchResults(results);
    }
    
    showSearchResults(results) {
        if (!this.searchResults) return;
        
        this.searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const div = document.createElement('div');
            div.textContent = 'No results found';
            this.searchResults.appendChild(div);
        } else {
            results.forEach(result => {
                const div = document.createElement('div');
                
                const flag = document.createElement('span');
                // Handle cases where country doesn't have a flag or is a timezone standard
                const countryCode = countryFlags[result.country];
                if (countryCode) {
                    flag.className = `flag-icon flag-icon-${countryCode.toLowerCase()}`;
                } else {
                    // For timezone standards and countries without flags, use a clock emoji
                    flag.textContent = '🕐';
                }
                
                const locationInfo = document.createElement('div');
                locationInfo.className = 'location-info';
                
                const city = document.createElement('div');
                city.className = 'city';
                city.textContent = `${result.city}, ${result.country}`;
                
                const timezone = document.createElement('div');
                timezone.className = 'timezone';
                timezone.textContent = `${result.timezone} (UTC${result.utcOffset})`;
                
                locationInfo.appendChild(city);
                locationInfo.appendChild(timezone);
                
                div.appendChild(flag);
                div.appendChild(locationInfo);
                
                div.addEventListener('click', () => {
                    this.addTimezone(result.timezone);
                    this.searchInput.value = '';
                    this.hideSearchResults();
                    this.render();
                });
                
                this.searchResults.appendChild(div);
            });
        }
        
        this.searchResults.classList.add('active');
    }

    hideSearchResults() {
        if (this.searchResults) {
            this.searchResults.classList.remove('active');
            this.searchResults.innerHTML = '';
        }
    }
    
    initializeDatePicker() {
        const controls = document.querySelector('.controls');
        if (!controls) return;

        // Remove any existing date pickers
        const existingPicker = controls.querySelector('.date-picker-button');
        if (existingPicker) {
            existingPicker.remove();
        }

        // Create the date picker button
        const datePickerButton = document.createElement('button');
        datePickerButton.className = 'date-picker-button';
        controls.insertBefore(datePickerButton, controls.firstChild);

        // Initialize with current date
        const today = new Date();
        this.selectedDate = today;
        
        // Create the date display and calendar icon
        const dateText = document.createElement('span');
        dateText.className = 'date-text';
        this.updateDatePickerDisplay(dateText);
        
        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'material-icons';
        calendarIcon.textContent = 'calendar_today';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'date-wrapper';
        wrapper.appendChild(dateText);
        wrapper.appendChild(calendarIcon);
        datePickerButton.appendChild(wrapper);

        // Create and configure the native date input
        const nativeDateInput = document.createElement('input');
        nativeDateInput.type = 'date';
        nativeDateInput.style.cssText = 'position: absolute; opacity: 0; pointer-events: none; width: 1px; height: 1px;';
        datePickerButton.appendChild(nativeDateInput);

        // Handle button click
        datePickerButton.addEventListener('click', (e) => {
            if (e.target === calendarIcon || e.target === datePickerButton || e.target === wrapper) {
                e.preventDefault();
                nativeDateInput.showPicker();
            }
        });

        // Handle date selection
        nativeDateInput.addEventListener('change', (e) => {
            // Get the selected date in the local timezone
            const selectedDate = new Date(e.target.value);
            // Set time to noon to avoid any timezone crossing issues
            selectedDate.setHours(12, 0, 0, 0);
            this.selectedDate = selectedDate;
            
            this.updateDatePickerDisplay(dateText);
            this.updateAllDisplays();
            this.onStateChange();
        });
    }

    updateDatePickerDisplay(dateText) {
        dateText.textContent = this.selectedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    updateDateDisplay() {
        const primaryDate = document.querySelector('.primary-date');
        if (primaryDate) {
            primaryDate.textContent = this.selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
    
    initializeDragAndDrop(element, timezone) {
        const dragHandle = element.querySelector('.drag-handle');
        
        dragHandle.addEventListener('mousedown', (e) => {
            // Only start drag if clicking on the handle
            element.setAttribute('draggable', true);
        });
        
        dragHandle.addEventListener('mouseup', () => {
            // Remove draggable after drag is done
            element.setAttribute('draggable', false);
        });
        
        element.addEventListener('dragstart', (e) => {
            this.draggedElement = element;
            element.classList.add('dragging');
            
            // Store the current slider value
            const slider = element.querySelector('.timeline-slider');
            if (slider) {
                this.draggedSliderValue = slider.value;
            }
            
            e.dataTransfer.effectAllowed = 'move';
        });
        
        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
            element.setAttribute('draggable', false);
            
            // Restore the slider value after drag
            if (this.draggedElement && this.draggedSliderValue !== undefined) {
                const slider = this.draggedElement.querySelector('.timeline-slider');
                if (slider) {
                    slider.value = this.draggedSliderValue;
                    // Trigger the input event to update times
                    slider.dispatchEvent(new Event('input'));
                }
            }
            
            this.draggedElement = null;
            this.draggedSliderValue = undefined;
            
            // Update state without re-rendering
            this.onStateChange(false);
        });
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (this.draggedElement === element) return;
            
            const rect = element.getBoundingClientRect();
            const midpoint = (rect.top + rect.bottom) / 2;
            const referenceElement = e.clientY < midpoint ? element : element.nextSibling;
            
            // Remove drag-over class from all elements
            const elements = this.timezonesContainer.querySelectorAll('.timezone-entry');
            elements.forEach(el => {
                el.classList.remove('drag-over');
            });
            
            // Add drag-over class to the current element
            element.classList.add('drag-over');
            
            if (this.draggedElement && this.draggedElement !== element) {
                // Only move if we're not trying to drop at the same spot
                if (referenceElement !== this.draggedElement && referenceElement !== this.draggedElement.nextSibling) {
                    this.timezonesContainer.insertBefore(this.draggedElement, referenceElement);
                }
            }
        });
        
        element.addEventListener('dragleave', () => {
            element.classList.remove('drag-over');
        });
        
        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('drag-over');
        });
    }

    onStateChange(shouldRender = true) {
        // Update URL state
        this.debouncedUpdateUrl();
        
        // Only render if explicitly requested
        if (shouldRender) {
            this.render();
        }
    }

    updateTimezoneDisplay(entry, timezone, sliderValue, date) {
        const timeDisplay = entry.querySelector('.timezone-hour');
        const dateDisplay = entry.querySelector('.timezone-date');
        const slider = entry.querySelector('.timeline-slider');

        if (!timeDisplay || !dateDisplay || !slider) {
            console.warn('Missing required elements for timezone:', timezone);
            return;
        }

        // Only update if the value has changed significantly
        if (Math.abs(parseFloat(slider.value) - sliderValue) < 0.1) {
            return;
        }

        // Update time display
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: !this.use24Hour
        });
        const timeString = timeFormatter.format(date);
        timeDisplay.textContent = timeString;

        // Update date display
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        dateDisplay.textContent = dateFormatter.format(date);

        // Update slider value without triggering events
        slider.value = Math.round(sliderValue);

        console.log('[updateTimezoneDisplay]', {
            timezone,
            sliderValue,
            time: timeString,
            date: dateDisplay.textContent
        });
    }
    
    updateAllTimezones() {
        const entries = document.querySelectorAll('.timezone-entry');
        entries.forEach(entry => {
            const timezone = entry.getAttribute('data-timezone');
            const slider = entry.querySelector('.timeline-slider');
            if (slider) {
                this.updateTimezoneDisplay(entry, timezone, parseInt(slider.value));
            }
        });
    }
    
    startCurrentTimeUpdate() {
        // Clear any existing interval
        if (this.timeUpdateInterval) {
            clearInterval(this.timeUpdateInterval);
        }
        
        // Update immediately
        this.updateCurrentTimes();
        
        // Then update every second
        this.timeUpdateInterval = setInterval(() => this.updateCurrentTimes(), 1000);
    }

    updateCurrentTimes() {
        const entries = document.querySelectorAll('.timezone-entry');
        const now = new Date();
        
        entries.forEach(entry => {
            const timezone = entry.getAttribute('data-timezone');
            const currentTimeEl = entry.querySelector('.current-time');
            const currentDateEl = entry.querySelector('.current-date');
            
            if (currentTimeEl && currentDateEl) {
                currentTimeEl.textContent = now.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: !this.use24Hour,
                    timeZone: timezone
                });
                
                currentDateEl.textContent = now.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    timeZone: timezone
                });
            }
        });
    }

    convertTime(date, fromTimezone, toTimezone) {
        // Create a formatter for the source timezone
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: fromTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        // Get the parts in the source timezone
        const parts = formatter.formatToParts(date);
        const sourceDate = new Date(
            parseInt(parts.find(p => p.type === 'year').value),
            parseInt(parts.find(p => p.type === 'month').value) - 1,
            parseInt(parts.find(p => p.type === 'day').value),
            parseInt(parts.find(p => p.type === 'hour').value),
            parseInt(parts.find(p => p.type === 'minute').value),
            parseInt(parts.find(p => p.type === 'second').value)
        );

        // Convert to the target timezone
        return sourceDate.toLocaleString('en-US', { timeZone: toTimezone });
    }

    convertToUTC(date, timezone) {
        const tzFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const timeParts = tzFormatter.formatToParts(date);
        const hours = parseInt(timeParts.find(p => p.type === 'hour').value);
        const minutes = parseInt(timeParts.find(p => p.type === 'minute').value);
        const offset = date.getTimezoneOffset();
        const utcDate = new Date(date.getTime() + offset * 60 * 1000);

        return utcDate;
    }

    convertFromUTC(date, timezone) {
        const tzFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const timeParts = tzFormatter.formatToParts(date);
        const hours = parseInt(timeParts.find(p => p.type === 'hour').value);
        const minutes = parseInt(timeParts.find(p => p.type === 'minute').value);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60 * 1000);

        return localDate;
    }

    toggleTimeFormat() {
        this.use24Hour = !this.use24Hour;
        if (this.timeFormatTextEl) {
            this.timeFormatTextEl.textContent = this.use24Hour ? '24h' : '12h';
        }
        
        // Update time displays
        this.updateAllDisplays();
        this.onStateChange();
    }

    updateAllDisplays() {
        // Update timezone displays
        const entries = document.querySelectorAll('.timezone-entry');
        entries.forEach(entry => {
            const timezone = entry.getAttribute('data-timezone');
            const timeDisplay = entry.querySelector('.timezone-hour');
            const slider = entry.querySelector('.timeline-slider');
            
            if (timeDisplay && slider) {
                const value = parseInt(slider.value);
                const hours = Math.floor(value / 4);
                const minutes = (value % 4) * 15;
                
                const date = new Date(this.selectedDate);
                date.setHours(hours, minutes, 0, 0);
                
                const timeFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: !this.use24Hour
                });
                
                timeDisplay.textContent = timeFormatter.format(date);
            }
        });

        // Update meeting planner grid if visible
        if (document.querySelector('#meeting-planner').classList.contains('active')) {
            this.updateTimeGrid();
        }
    }
    
    addTimezone(timezone) {
        if (this.timezones.has(timezone)) return;
        
        this.timezones.add(timezone);
        this.render();
        this.onStateChange();
    }

    removeTimezone(timezone) {
        this.timezones.delete(timezone);
        this.render();
        this.onStateChange();
    }

    removeAllTimezones() {
        this.timezones.clear();
        this.render();
        this.onStateChange();
    }

    getTimeDifference(timezone, referenceTimezone) {
        try {
            if (!referenceTimezone || timezone === referenceTimezone) {
                return '';
            }

            const now = new Date();
            
            // Get the time in the reference timezone (first timezone in list)
            const referenceOptions = { timeZone: referenceTimezone, hour12: false, hour: 'numeric', minute: 'numeric' };
            const referenceTime = new Date().toLocaleString('en-US', referenceOptions);
            const [referenceHour, referenceMinute] = referenceTime.split(':').map(Number);
            
            // Get the time in target timezone
            const targetOptions = { timeZone: timezone, hour12: false, hour: 'numeric', minute: '2-digit' };
            const targetTime = new Date().toLocaleString('en-US', targetOptions);
            const [targetHour, targetMinute] = targetTime.split(':').map(Number);
            
            // Calculate difference in minutes relative to reference timezone
            let diffMinutes = (targetHour * 60 + targetMinute) - (referenceHour * 60 + referenceMinute);
            
            // Adjust for day boundary cases
            if (diffMinutes > 12 * 60) diffMinutes -= 24 * 60;
            if (diffMinutes < -12 * 60) diffMinutes += 24 * 60;
            
            const hoursDiff = Math.abs(Math.floor(diffMinutes / 60));
            const minutesDiff = Math.abs(diffMinutes % 60);
            
            if (hoursDiff === 0 && minutesDiff === 0) return '';
            
            let diffText = '';
            if (hoursDiff > 0) {
                diffText += `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''}`;
            }
            if (minutesDiff > 0) {
                if (diffText) diffText += ' ';
                diffText += `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
            }
            
            return diffMinutes > 0 ? `+${diffText}` : `-${diffText}`;
        } catch (e) {
            console.error('Error calculating time difference:', e);
            return '';
        }
    }
    
    formatTimeForTimezone(timezone) {
        try {
            if (!this.selectedDate) {
                // If no reference time set, use current time
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-US', {
                    timeZone: timezone,
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
                const timeStr = now.toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: !this.use24Hour
                });
                return { dateStr, timeStr };
            }

            // Use the reference time to calculate time in this timezone
            const referenceDate = new Date(this.selectedDate);
            
            // Format the date and time in the target timezone
            const dateStr = referenceDate.toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            const timeStr = referenceDate.toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                hour12: !this.use24Hour
            });
            
            return { dateStr, timeStr };
        } catch (e) {
            console.error('Error formatting time for timezone:', timezone, e);
            return {
                dateStr: 'Invalid timezone',
                timeStr: '--:--'
            };
        }
    }
    
    getTimezoneData(timezone) {
        return timezoneData.find(item => item.timezone === timezone) || {
            city: timezone,
            country: '',
            timezone: timezone,
            utcOffset: ''
        };
    }
    
    calculateSunrise(timezone) {
        try {
            const now = new Date();
            const date = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            
            // Get timezone coordinates (approximate for major cities)
            const tzData = this.getTimezoneData(timezone);
            const coordinates = this.getCityCoordinates(tzData.city);
            
            if (!coordinates) {
                return null; // Return null if coordinates not found
            }
            
            // Calculate sunrise using astronomical formula
            const { latitude, longitude } = coordinates;
            
            // Day of the year (1-366)
            const start = new Date(date.getFullYear(), 0, 0);
            const diff = date - start;
            const dayOfYear = Math.floor(diff / 86400000);
            
            // Calculate approximate sunrise time
            // This is a simplified calculation that gives a reasonable approximation
            
            // Convert latitude to radians
            const latRad = latitude * Math.PI / 180;
            
            // Solar declination
            const declination = 0.4093 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365);
            
            // Hour angle
            const cosHourAngle = -Math.tan(latRad) * Math.tan(declination);
            
            // Handle polar day/night
            if (Math.abs(cosHourAngle) > 1) {
                return null; // No sunrise/sunset during polar day/night
            }
            
            // Sunrise hour angle in radians
            const hourAngle = Math.acos(cosHourAngle);
            
            // Convert to hours
            const sunriseHourUTC = 12 - (hourAngle * 180 / Math.PI) / 15;
            
            // Adjust for longitude
            const sunriseHourLocal = sunriseHourUTC + (longitude / 15);
            
            // Create date object for sunrise
            const sunriseDate = new Date(date);
            sunriseDate.setHours(sunriseHourLocal);
            sunriseDate.setMinutes((sunriseHourLocal % 1) * 60);
            sunriseDate.setSeconds(0);
            
            return sunriseDate;
            
        } catch (e) {
            console.error('Error calculating sunrise for', timezone, e);
            return null;
        }
    }
    
    getCityCoordinates(city) {
        // Approximate coordinates for major cities
        const coordinates = {
            'UTC': { latitude: 0, longitude: 0 },
            'London': { latitude: 51.5074, longitude: -0.1278 },
            'New York': { latitude: 40.7128, longitude: -74.0060 },
            'Los Angeles': { latitude: 34.0522, longitude: -118.2437 },
            'Tokyo': { latitude: 35.6762, longitude: 139.6503 },
            'Sydney': { latitude: -33.8688, longitude: 151.2093 },
            'Dubai': { latitude: 25.2048, longitude: 55.2708 },
            'Paris': { latitude: 48.8566, longitude: 2.3522 },
            'Berlin': { latitude: 52.5200, longitude: 13.4050 },
            'Singapore': { latitude: 1.3521, longitude: 103.8198 },
            'Mumbai': { latitude: 19.0760, longitude: 72.8777 },
            'Auckland': { latitude: -36.8509, longitude: 174.7645 },
            'São Paulo': { latitude: -23.5505, longitude: -46.6333 },
            'Hong Kong': { latitude: 22.3193, longitude: 114.1694 },
            'Moscow': { latitude: 55.7558, longitude: 37.6173 },
            'Istanbul': { latitude: 41.0082, longitude: 28.9784 },
            'Kyiv': { latitude: 50.4501, longitude: 30.5234 },
            'Islamabad': { latitude: 33.6844, longitude: 73.0479 },
            'Baku': { latitude: 40.4093, longitude: 49.8671 }
        };
        
        return coordinates[city];
    }
    
    copyTimezoneInformation() {
        const timezones = Array.from(this.timezones);
        if (timezones.length === 0) {
            this.showCopyAnimation('No timezones to copy');
            return;
        }

        let info = 'Current Time Zones:\n\n';
        
        // Get the date and timezone configurations from URL
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get('date');
        const zonesParam = params.get('zones') || '';
        const zoneConfigs = zonesParam.split(',');
        
        // Parse the reference date
        const referenceDate = dateParam ? new Date(dateParam) : new Date();
        
        timezones.forEach(timezone => {
            const tzData = this.getTimezoneData(timezone);
            
            // Find this timezone's configuration from URL
            const zoneConfig = zoneConfigs.find(config => config.startsWith(timezone + '@'));
            let timeValue = '00:00';
            
            if (zoneConfig) {
                // Extract time from zone config (format: timezone@HH:mm)
                timeValue = zoneConfig.split('@')[1];
            } else {
                // Fallback to slider value if URL config not found
                const slider = document.querySelector(`[data-timezone="${timezone}"] input[type="range"]`);
                if (slider) {
                    const value = parseInt(slider.value);
                    const hours = Math.floor(value / 4).toString().padStart(2, '0');
                    const minutes = (value % 4) * 15;
                    timeValue = `${hours}:${minutes.toString().padStart(2, '0')}`;
                }
            }

            // Create a date object for this timezone's time
            const [hours, minutes] = timeValue.split(':').map(Number);
            const tzDate = new Date(referenceDate);
            tzDate.setHours(hours, minutes, 0, 0);
            
            // Format the date and time
            const dateStr = tzDate.toLocaleDateString('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            
            const timeStr = this.use24Hour ? 
                timeValue :
                tzDate.toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });

            const offset = this.getTimezoneOffset(timezone);
            const offsetStr = `UTC${offset >= 0 ? '+' : ''}${offset}`;
            
            info += `${tzData.city}, ${tzData.country}\n`;
            info += `${timezone} (${offsetStr})\n`;
            info += `${dateStr} at ${timeStr}\n\n`;
        });

        // Add the shareable URL at the bottom
        info += '\nShare this configuration:\n';
        info += window.location.href;

        navigator.clipboard.writeText(info).then(() => {
            this.showCopyAnimation('Timezone information copied!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            this.showCopyAnimation('Failed to copy');
        });
    }
    
    showCopyAnimation(message, buttonId = 'copyTimezones') {
        const button = document.getElementById(buttonId);
        if (button) {
            // Add success class
            button.classList.add('copy-success');
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = message;
            
            // Position tooltip
            button.appendChild(tooltip);
            
            setTimeout(() => {
                button.classList.remove('copy-success');
                tooltip.remove();
            }, 1000);
        }
    }
    
    copyCurrentUrl() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showCopyAnimation('Link copied!', 'copyUrl');
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            this.showCopyAnimation('Failed to copy', 'copyUrl');
        });
    }
    
    createTimezoneEntry(timezone) {
        const tzData = this.getTimezoneData(timezone);
        if (!tzData) return null;

        const flagCode = countryFlags[tzData.country] || 'un'; // Use UN flag as fallback
        
        const entry = document.createElement('div');
        entry.className = 'timezone-entry';
        entry.setAttribute('data-timezone', timezone);
        
        entry.innerHTML = `
            <div class="drag-handle">⋮⋮</div>
            <div class="timezone-info">
                <div class="timezone-left">
                    ${flagCode === 'un' ? '<span>🕐</span>' : `<span class="flag-icon flag-icon-${flagCode.toLowerCase()}"></span>`}
                    <div>
                        <div class="timezone-name">${tzData.city}, ${tzData.country || 'Universal Time'}</div>
                        <div class="timezone-details">${timezone} (UTC${tzData.utcOffset})</div>
                    </div>
                </div>
                <div class="timezone-time">
                    <div class="timezone-hour">12:00</div>
                    <div class="timezone-date"></div>
                    <div class="current-time-container">
                        <div class="current-time"></div>
                        <div class="current-date"></div>
                    </div>
                </div>
            </div>
            <div class="timeline-container">
                <div class="timeline-hours">
                    ${Array.from({length: 25}, (_, i) => 
                        `<span>${i}</span>`
                    ).join('')}
                </div>
                <input type="range" 
                    min="0" 
                    max="95" 
                    value="48"
                    step="1" 
                    class="timeline-slider"
                    title="Adjust time">
            </div>
            <button class="more-button" title="Remove timezone">
                <span class="material-icons">close</span>
            </button>
        `;
        
        // Initialize the time slider
        this.initializeTimeSlider(entry, timezone);
        
        // Initialize the remove button
        const removeButton = entry.querySelector('.more-button');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                this.removeTimezone(timezone);
            });
        }
        
        // Initialize drag and drop
        this.initializeDragAndDrop(entry, timezone);
        
        return entry;
    }
}

// Initialize the app
const timeZoneManager = new TimeZoneManager();
