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
        this.draggedTimezone = null; // Store timezone during drag
        
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
        this.createCalendarButton = document.getElementById('createCalendarEvent');
        
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
            Intl.DateTimeFormat(undefined, { timeZone: timezone });
            return true;
        } catch (e) {
            return false;
        }
    }

    render() {
        if (!this.timezonesContainer) return;
        
        // Clear existing entries
        this.timezonesContainer.innerHTML = '';
        
        // Create new entries for each timezone
        Array.from(this.timezones).forEach((timezone, index) => {
            const entry = this.createTimezoneEntry(timezone);
            
            // Add primary location label to the first entry
            if (index === 0) {
                const primaryLabel = document.createElement('div');
                primaryLabel.className = 'primary-location-label';
                primaryLabel.textContent = 'PRIMARY LOCATION';
                entry.appendChild(primaryLabel);
            }
            
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
        // Initialize the onStateChange handler
        this.onStateChange = () => {
            if (this.initialized) {
                // Update URL
                this.debouncedUpdateUrl();
                
                // Update map markers if map is initialized
                if (this.mapInitialized) {
                    this.updateMapMarkers();
                }
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
                const entry = document.querySelector(`[data-timezone="${timezone}"]`);
                if (entry) {
                    const slider = entry.querySelector('input[type="range"]');
                    if (slider) {
                        const sliderValue = parseInt(slider.value);
                        const hours = Math.floor(sliderValue / 4);
                        const minutes = (sliderValue % 4) * 15;
                        return `${timezone}@${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    }
                }
                return timezone;
            });
            params.set('zones', timezones.join(','));
        }
        
        // Add date without timezone conversion
        if (this.selectedDate) {
            const dateStr = `${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth() + 1).padStart(2, '0')}-${String(this.selectedDate.getDate()).padStart(2, '0')}`;
            params.set('date', dateStr);
        }
        
        // Add time format
        params.set('format', this.use24Hour ? '24h' : '12h');
        
        // Add active tab
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
        
        this.mapInitialized = true;
    }
    
    updateMapMarkers() {
        console.log('Updating map markers...');
        
        // Only update markers if map is initialized
        if (!this.mapInitialized || !this.map || !this.markerIcon) {
            console.log('Map not initialized yet, skipping marker update');
            return;
        }
        
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
                weekday: 'short',
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

            // Add keyboard navigation for search results
            this.searchInput.addEventListener('keydown', (e) => {
                if (!this.searchResults || !this.searchResults.classList.contains('active')) return;
                
                const results = Array.from(this.searchResults.children).filter(div => !div.classList.contains('no-results'));
                if (results.length === 0) return;

                const currentIndex = results.findIndex(div => div.classList.contains('selected'));
                let newIndex = currentIndex;
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentIndex === -1) {
                            newIndex = 0;
                        } else {
                            newIndex = (currentIndex + 1) % results.length;
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentIndex === -1) {
                            newIndex = results.length - 1;
                        } else {
                            newIndex = currentIndex === 0 ? results.length - 1 : currentIndex - 1;
                        }
                        break;
                    case 'Enter':
                        e.preventDefault();
                        const selectedDiv = this.searchResults.querySelector('.selected');
                        if (selectedDiv) {
                            const timezone = selectedDiv.getAttribute('data-timezone');
                            if (timezone) {
                                this.addTimezone(timezone);
                                this.hideSearchResults();
                                this.searchInput.value = '';
                            }
                        }
                        return;
                    case 'Escape':
                        this.hideSearchResults();
                        return;
                    default:
                        return;
                }

                // Update selection
                results.forEach(div => div.classList.remove('selected'));
                results[newIndex].classList.add('selected');
                
                // Ensure the selected item is visible
                results[newIndex].scrollIntoView({ block: 'nearest' });
            });

            // Handle mouse interactions
            this.searchResults?.addEventListener('mouseover', (e) => {
                const resultDiv = e.target.closest('.search-results > div');
                if (resultDiv && !resultDiv.classList.contains('no-results')) {
                    // Remove selected class from all divs
                    this.searchResults.querySelectorAll('div').forEach(div => {
                        div.classList.remove('selected');
                    });
                    // Add selected class to hovered div
                    resultDiv.classList.add('selected');
                }
            });

            this.searchResults?.addEventListener('mouseleave', () => {
                // When mouse leaves the search results, remove all selections
                this.searchResults.querySelectorAll('div').forEach(div => {
                    div.classList.remove('selected');
                });
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

        // Copy URL button
        const copyUrlButton = document.getElementById('copyUrl');
        if (copyUrlButton) {
            copyUrlButton.addEventListener('click', () => {
                this.copyCurrentUrl();
            });
        }

        // Copy timezones button
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
        
        // Add event listener for the create calendar event button
        if (this.createCalendarButton) {
            this.createCalendarButton.addEventListener('click', () => {
                this.createCalendarEvent();
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

        try {
            let localDate;
            
            if (timezone === 'UTC') {
                // For UTC, create the date directly in UTC
                const utcDate = new Date(this.selectedDate);
                utcDate.setUTCHours(hours, minutes, 0, 0);
                localDate = utcDate;
            } else {
                // Get the timezone's UTC offset
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    timeZoneName: 'longOffset'
                });
                const tzOffset = formatter.format(this.selectedDate).match(/GMT([+-])(\d{2}):(\d{2})/);
                
                if (tzOffset) {
                    // Convert slider time to UTC
                    const sign = tzOffset[1] === '-' ? 1 : -1; // Invert sign for conversion to UTC
                    const tzHours = parseInt(tzOffset[2]);
                    const tzMinutes = parseInt(tzOffset[3]);
                    
                    // Create date in UTC
                    const utcDate = new Date(this.selectedDate);
                    const utcHours = (hours + (sign * tzHours) + 24) % 24;
                    const utcMinutes = (minutes + (sign * tzMinutes) + 60) % 60;
                    
                    if (utcMinutes < minutes && sign === 1) {
                        utcDate.setUTCHours(utcHours + 1, utcMinutes, 0, 0);
                    } else if (utcMinutes > minutes && sign === -1) {
                        utcDate.setUTCHours(utcHours - 1, utcMinutes, 0, 0);
                    } else {
                        utcDate.setUTCHours(utcHours, utcMinutes, 0, 0);
                    }
                    
                    localDate = utcDate;
                    
                    console.log('[handleSliderEvent] Converted to UTC:', {
                        timezone,
                        originalHours: hours,
                        originalMinutes: minutes,
                        utcHours,
                        utcMinutes,
                        tzOffset: `${tzOffset[1]}${tzHours}:${tzMinutes}`,
                        result: utcDate.toISOString()
                    });
                } else {
                    // Fallback to old method if offset parsing fails
                    const formatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: false
                    });

                    const parts = formatter.formatToParts(this.selectedDate);
                    const dateObj = {
                        year: parseInt(parts.find(p => p.type === 'year').value),
                        month: parseInt(parts.find(p => p.type === 'month').value) - 1,
                        day: parseInt(parts.find(p => p.type === 'day').value),
                        hour: hours,
                        minute: minutes
                    };

                    localDate = new Date(
                        dateObj.year,
                        dateObj.month,
                        dateObj.day,
                        dateObj.hour,
                        dateObj.minute
                    );
                }
            }

            // Update all other timezones based on this time
            this.updateOtherTimezones(timezone, localDate);
            
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

        const entries = document.querySelectorAll('.timezone-entry');
        entries.forEach(entry => {
            const timezone = entry.getAttribute('data-timezone');
            if (!timezone) return;

            // Create formatters for the target timezone
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: this.use24Hour ? '2-digit' : 'numeric',
                minute: '2-digit',
                hour12: !this.use24Hour
            });

            const dateFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            // Get hours and minutes in 24h format for slider calculation
            const hourFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const parts = hourFormatter.formatToParts(sourceDate);
            const hours24h = parseInt(parts.find(p => p.type === 'hour').value);
            const minutes = parseInt(parts.find(p => p.type === 'minute').value);

            console.log('[updateOtherTimezones] Time components:', {
                timezone,
                hours24h,
                minutes,
                sliderValue: (hours24h * 4) + Math.floor(minutes / 15)
            });

            const displayTime = timeFormatter.format(sourceDate);
            const displayDate = dateFormatter.format(sourceDate);

            console.log('[updateOtherTimezones] Updated timezone:', {
                timezone,
                sliderValue: (hours24h * 4) + Math.floor(minutes / 15),
                displayTime,
                displayDate
            });

            // Update UI elements
            const slider = entry.querySelector('.timeline-slider');
            if (slider) {
                // Only update the slider if it's not the source timezone or if it's a programmatic update
                if (timezone !== sourceTimezone || !this.activeSlider) {
                    slider.value = (hours24h * 4) + Math.floor(minutes / 15);
                }
            }

            const timeDisplay = entry.querySelector('.timezone-hour');
            const dateDisplay = entry.querySelector('.timezone-date');
            if (timeDisplay) timeDisplay.textContent = displayTime;
            if (dateDisplay) dateDisplay.textContent = displayDate;
        });

        console.log('[updateOtherTimezones] Finished update');
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
        this.searchResults.classList.add('active');
        
        if (results.length === 0) {
            const div = document.createElement('div');
            div.classList.add('no-results');
            div.textContent = 'No results found';
            this.searchResults.appendChild(div);
        } else {
            results.forEach(result => {
                const div = document.createElement('div');
                div.setAttribute('data-timezone', result.timezone);
                div.classList.add('search-result');
                
                const flag = document.createElement('span');
                const countryCode = countryFlags[result.country];
                if (countryCode) {
                    flag.className = `flag-icon flag-icon-${countryCode.toLowerCase()}`;
                } else {
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
                    this.hideSearchResults();
                    this.searchInput.value = '';
                });
                
                this.searchResults.appendChild(div);
            });

            // Select the first result by default
            this.searchResults.querySelector('.search-result')?.classList.add('selected');
        }
        
        // Add CSS for search results
        const style = document.createElement('style');
        style.textContent = `
            .search-results > div.selected {
                background-color: #eef2ff;
            }
            .search-results > div:hover {
                background-color: #f3f4f6;
            }
            .search-results > div {
                padding: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                cursor: pointer;
                transition: background-color 0.15s ease;
            }
        `;
        document.head.appendChild(style);
    }

    hideSearchResults() {
        if (!this.searchResults) return;
        this.searchResults.classList.remove('active');
        this.searchResults.innerHTML = '';
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

        // Get date from URL or use current date
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get('date');
        
        if (dateParam) {
            this.selectedDate = new Date(dateParam);
        } else {
            this.selectedDate = new Date();
        }
        
        // Create the native date input
        const nativeDateInput = document.createElement('input');
        nativeDateInput.type = 'date';
        nativeDateInput.style.cssText = 'position: absolute; opacity: 0; pointer-events: none;';
        datePickerButton.appendChild(nativeDateInput);
        
        // Set initial value
        nativeDateInput.value = this.selectedDate.toISOString().split('T')[0];
        
        // Create the date display
        const dateText = document.createElement('span');
        dateText.className = 'date-text';
        this.updateDateDisplay(dateText);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'date-wrapper';
        wrapper.appendChild(dateText);
        datePickerButton.appendChild(wrapper);

        // Handle button click to show native picker
        datePickerButton.addEventListener('click', (e) => {
            if (e.target === datePickerButton || e.target === wrapper || e.target === dateText) {
                e.preventDefault();
                nativeDateInput.showPicker();
            }
        });

        // Handle date selection
        nativeDateInput.addEventListener('change', (e) => {
            const newDate = new Date(e.target.value);
            newDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
            this.selectedDate = newDate;
            
            // Update the date display first
            this.updateDateDisplay(dateText);

            // Get the first timezone entry to use as a reference
            const firstEntry = document.querySelector('.timezone-entry');
            if (firstEntry) {
                const timezone = firstEntry.getAttribute('data-timezone');
                const slider = firstEntry.querySelector('.timeline-slider');
                if (slider && timezone) {
                    // Use the current slider value to maintain the selected time
                    this.handleSliderEvent(slider, timezone);
                }
            } else {
                // If no timezone entries exist, just update all timezones
                this.updateAllTimezones();
            }

            // Update the URL
            this.debouncedUpdateUrl();
        });
    }

    updateDateDisplay(dateText) {
        if (dateText) {
            const formattedDate = this.selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            dateText.textContent = formattedDate;
            console.log('[updateDateDisplay] Updated date display:', formattedDate);
        } else {
            const dateText = document.querySelector('.date-text');
            if (dateText) {
                const formattedDate = this.selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                dateText.textContent = formattedDate;
                console.log('[updateDateDisplay] Updated date display:', formattedDate);
            } else {
                console.error('[updateDateDisplay] Date text element not found');
            }
        }
    }
    
    initializeDragAndDrop(element, timezone) {
        const dragHandle = element.querySelector('.drag-handle');
        
        dragHandle.addEventListener('mousedown', () => {
            element.setAttribute('draggable', true);
        });
        
        dragHandle.addEventListener('mouseup', () => {
            element.setAttribute('draggable', false);
        });
        
        element.addEventListener('dragstart', (e) => {
            this.draggedElement = element;
            this.draggedTimezone = timezone;
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
            
            // Restore the slider value and update all timezones
            if (this.draggedElement && this.draggedSliderValue !== undefined && this.draggedTimezone) {
                const slider = this.draggedElement.querySelector('.timeline-slider');
                if (slider) {
                    slider.value = this.draggedSliderValue;
                    this.handleSliderEvent(slider, this.draggedTimezone);
                }
            }
            
            this.draggedElement = null;
            this.draggedSliderValue = undefined;
            this.draggedTimezone = null;
            
            // Update state and URL
            this.onStateChange();
        });
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (this.draggedElement === element) return;
            
            const rect = element.getBoundingClientRect();
            const midpoint = (rect.top + rect.bottom) / 2;
            const referenceElement = e.clientY < midpoint ? element : element.nextSibling;
            
            if (this.draggedElement && this.draggedElement !== element) {
                if (referenceElement !== this.draggedElement && referenceElement !== this.draggedElement.nextSibling) {
                    this.timezonesContainer.insertBefore(this.draggedElement, referenceElement);
                    // Update primary location label after reordering
                    this.updatePrimaryLocationLabel();
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

    updatePrimaryLocationLabel() {
        // Remove any existing primary location labels
        const existingLabels = document.querySelectorAll('.primary-location-label');
        existingLabels.forEach(label => label.remove());

        // Add label to the first timezone entry
        const firstEntry = this.timezonesContainer.firstElementChild;
        if (firstEntry) {
            const primaryLabel = document.createElement('div');
            primaryLabel.className = 'primary-location-label';
            primaryLabel.textContent = 'PRIMARY LOCATION';
            firstEntry.appendChild(primaryLabel);
        }

        // Update the timezones Set to match the new order
        const newOrder = Array.from(this.timezonesContainer.children).map(entry => 
            entry.getAttribute('data-timezone')
        );
        this.timezones = new Set(newOrder);
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
        
        if (!timeDisplay || !dateDisplay) return;
        
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: !this.use24Hour
        });
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const formattedTime = timeFormatter.format(date);
        const formattedDate = dateFormatter.format(date);
        
        dateDisplay.textContent = formattedDate;
        timeDisplay.textContent = formattedTime;
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
            
            if (currentTimeEl && currentDateEl && timezone && this.isValidTimezone(timezone)) {
                try {
                    const timeFormatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: !this.use24Hour
                    });
                    const dateFormatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    currentDateEl.textContent = dateFormatter.format(now);
                    currentTimeEl.textContent = timeFormatter.format(now);
                } catch (error) {
                    console.error('Error updating time for timezone:', timezone, error);
                }
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
        console.log('[toggleTimeFormat] Starting format switch:', {
            from: this.use24Hour ? '24h' : '12h',
            to: this.use24Hour ? '12h' : '24h'
        });

        this.use24Hour = !this.use24Hour;
        if (this.timeFormatTextEl) {
            this.timeFormatTextEl.textContent = this.use24Hour ? '24h' : '12h';
        }
        
        const entries = document.querySelectorAll('.timezone-entry');
        entries.forEach(entry => {
            const timezone = entry.getAttribute('data-timezone');
            const timeDisplay = entry.querySelector('.timezone-hour');
            const slider = entry.querySelector('.timeline-slider');
            
            if (timeDisplay && slider) {
                // Log initial state
                console.log('[toggleTimeFormat] Before conversion:', {
                    timezone,
                    sliderValue: slider.value,
                    sliderTime: `${Math.floor(parseInt(slider.value) / 4)}:${(parseInt(slider.value) % 4) * 15}`,
                    currentDisplay: timeDisplay.textContent
                });

                const value = parseInt(slider.value);
                const hours = Math.floor(value / 4);
                const minutes = (value % 4) * 15;

                // Get date components in the timezone
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

                // Create a UTC date using the timezone's local date components
                const localDate = new Date(Date.UTC(year, month, day, hours, minutes));

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

                // Format the time in both formats for logging
                const time24h = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).format(utcDate);

                const time12h = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).format(utcDate);

                // Update the display
                const timeFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: !this.use24Hour
                });

                const newTimeString = timeFormatter.format(utcDate);
                timeDisplay.textContent = newTimeString;

                console.log('[toggleTimeFormat] After conversion:', {
                    timezone,
                    sliderValue: slider.value,
                    sliderTime: `${hours}:${minutes}`,
                    time24h,
                    time12h,
                    newDisplay: newTimeString,
                    using24h: this.use24Hour
                });
            }
        });
        
        // Also update current times display
        this.updateCurrentTimes();

        // Update URL state to reflect new format
        this.onStateChange();
    }
    
    addTimezone(timezone) {
        if (this.isValidTimezone(timezone) && !this.timezones.has(timezone)) {
            this.timezones.add(timezone);
            this.render();
            this.onStateChange();
            
            // Update map markers if we're in the map view
            if (this.activeTab === 'world-map') {
                this.updateMapMarkers();
            }
        }
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
            // If no reference time set, use current time
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
                timeStr: 'Invalid timezone'
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
    
    createCalendarEvent() {
        try {
            // Get all timezone entries
            const entries = document.querySelectorAll('.timezone-entry');
            if (!entries.length) {
                console.warn('No timezone entries found');
                return;
            }

            // Get the date and time from the first timezone entry
            const firstEntry = entries[0];
            const timezone = firstEntry.getAttribute('data-timezone');
            const slider = firstEntry.querySelector('.timeline-slider');
            const value = parseInt(slider.value);
            const hours = Math.floor(value / 4);
            const minutes = (value % 4) * 15;

            // Create a date object for the event
            const eventDate = new Date(this.selectedDate);
            eventDate.setHours(hours, minutes, 0, 0);

            // Format timezone information for description
            let description = 'Event times in different timezones:\n\n';
            entries.forEach(entry => {
                const tz = entry.getAttribute('data-timezone');
                const timeDisplay = entry.querySelector('.timezone-hour').textContent;
                const dateDisplay = entry.querySelector('.timezone-date').textContent;
                description += `${tz}: ${dateDisplay} ${timeDisplay}\n`;
            });

            // Create calendar links
            const title = encodeURIComponent('New Event');
            const encodedDesc = encodeURIComponent(description);
            const dateString = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

            // Google Calendar
            const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateString}/${dateString}&details=${encodedDesc}`;

            // Outlook Calendar
            const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${dateString}&enddt=${dateString}&body=${encodedDesc}`;

            // Yahoo Calendar
            const yahooUrl = `https://calendar.yahoo.com/?v=60&title=${title}&st=${dateString}&desc=${encodedDesc}`;

            // Create and show the calendar selection dialog
            const dialog = document.createElement('div');
            dialog.className = 'calendar-dialog';
            dialog.innerHTML = `
                <div class="calendar-dialog-content">
                    <h3>Create Calendar Event</h3>
                    <p>Choose your calendar service:</p>
                    <div class="calendar-buttons">
                        <a href="${googleUrl}" target="_blank" class="calendar-button google">Google Calendar</a>
                        <a href="${outlookUrl}" target="_blank" class="calendar-button outlook">Outlook Calendar</a>
                        <a href="${yahooUrl}" target="_blank" class="calendar-button yahoo">Yahoo Calendar</a>
                    </div>
                    <button class="close-dialog">Close</button>
                </div>
            `;

            // Add dialog styles
            const style = document.createElement('style');
            style.textContent = `
                .calendar-dialog {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .calendar-dialog-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 400px;
                    width: 90%;
                }
                .calendar-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin: 20px 0;
                }
                .calendar-button {
                    padding: 10px;
                    border-radius: 4px;
                    text-decoration: none;
                    color: white;
                    text-align: center;
                    font-weight: bold;
                }
                .calendar-button.google {
                    background: #4285f4;
                }
                .calendar-button.outlook {
                    background: #0078d4;
                }
                .calendar-button.yahoo {
                    background: #6001d2;
                }
                .close-dialog {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    background: #e0e0e0;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .close-dialog:hover {
                    background: #d0d0d0;
                }
            `;

            document.head.appendChild(style);
            document.body.appendChild(dialog);

            // Handle dialog close
            dialog.querySelector('.close-dialog').addEventListener('click', () => {
                dialog.remove();
            });

            // Close dialog when clicking outside
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    dialog.remove();
                }
            });

        } catch (error) {
            console.error('Error creating calendar event:', error);
        }
    }
    
    createTimezoneEntry(timezone) {
        const tzData = this.getTimezoneData(timezone);
        if (!tzData) return null;

        const flagCode = countryFlags[tzData.country] || 'un'; // Use UN flag as fallback
        
        const entry = document.createElement('div');
        entry.className = 'timezone-entry';
        entry.setAttribute('data-timezone', timezone);
        
        // Add CSS for horizontal alignment
        const style = document.createElement('style');
        style.textContent = `
            .timezone-time {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .timezone-time-row {
                display: flex;
                align-items: baseline;
                gap: 8px;
            }
            .timezone-date {
                color: #666;
                font-size: 0.9em;
            }
            .current-time-container {
                display: flex;
                align-items: baseline;
                gap: 8px;
                font-size: 0.85em;
                color: #666;
                margin-top: 4px;
            }
            .current-time-label {
                color: #999;
                margin-right: 4px;
                font-size: 0.82em;
            }
            .current-time-container .current-date {
                font-size: 0.95em;
            }
            .timezone-date {
                color: #666;
                font-size: 1em;
            }
            .timezone-hour {
                font-size: 1.3em;
                font-weight: 500;
            }
            .search-results > div.selected {
                background-color: #eef2ff;
            }
            .search-results > div:hover {
                background-color: #f3f4f6;
            }
            .search-results > div {
                padding: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                cursor: pointer;
                transition: background-color 0.15s ease;
            }
        `;
        document.head.appendChild(style);
        
        entry.innerHTML = `
            <div class="drag-handle">⋮⋮</div>
            <div class="timezone-info">
                <div class="timezone-left">
                    ${flagCode === 'un' ? '<span>🕐</span>' : `<span class="flag-icon flag-icon-${flagCode.toLowerCase()}"></span>`}
                    <div>
                        <div class="timezone-name">${tzData.city}, ${tzData.country}</div>
                        <div class="timezone-details">${timezone} (UTC${tzData.utcOffset})</div>
                    </div>
                </div>
                <div class="timezone-time">
                    <div class="timezone-time-row">
                        <div class="timezone-date"></div>
                        <div class="timezone-hour">12:00</div>
                    </div>
                    <div class="current-time-container">
                        <span class="current-time-label">Current Time:</span>
                        <div class="current-date"></div>
                        <div class="current-time"></div>
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
