class TimeZoneManager {
    constructor() {
        this.initialized = false;
        this.timezones = new Set();
        this.use24Hour = true;
        this.selectedDate = new Date();
        this.timeUpdateInterval = null;
        this.activeSlider = null;  // Track the currently active slider
        this.isUpdating = false;   // Guard against recursive updates
        
        // Get DOM elements
        this.container = document.querySelector('.container');
        this.searchInput = document.getElementById('timezoneSearch');
        this.searchResults = document.getElementById('searchResults');
        this.timezonesContainer = document.getElementById('timezoneList');
        this.timeFormatEl = document.getElementById('timeFormat');
        this.timeFormatTextEl = document.getElementById('timeFormatText');
        this.removeAllButton = document.getElementById('removeAll');
        this.timeGridBody = document.getElementById('timeGridBody');
        
        // Initialize tabs
        this.initializeTabs();
        
        // Initialize event listeners
        this.initializeEventListeners();
        this.initializeDatePicker();
        
        // Start the current time update interval
        this.startCurrentTimeUpdate();
        
        this.initialized = true;
    }
    
    initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        // Initialize hours header
        const hoursHeader = document.querySelector('.hours-header');
        if (hoursHeader) {
            for (let i = 0; i < 24; i++) {
                const th = document.createElement('th');
                th.textContent = this.use24Hour ? 
                    i.toString().padStart(2, '0') : 
                    (i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i-12}pm`);
                hoursHeader.appendChild(th);
            }
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Update button states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update content visibility
                tabContents.forEach(content => {
                    if (content.id === tabId) {
                        content.classList.add('active');
                        if (tabId === 'meeting-planner') {
                            this.updateTimeGrid();
                        }
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
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
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });
        
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

        // Add global slider event handlers
        if (this.timezonesContainer) {
            this.timezonesContainer.addEventListener('input', (e) => {
                if (e.target.classList.contains('timeline-slider')) {
                    this.handleSliderEvent(e);
                }
            });

            this.timezonesContainer.addEventListener('change', (e) => {
                if (e.target.classList.contains('timeline-slider')) {
                    this.handleSliderEvent(e);
                }
            });
        }
    }

    handleSliderEvent(e) {
        if (this.isUpdating) {
            console.log('[handleSliderEvent] Blocked by isUpdating guard');
            return;
        }
        
        const slider = e.target;
        const entry = slider.closest('.timezone-entry');
        if (!entry) {
            console.error('[handleSliderEvent] No timezone entry found for slider');
            return;
        }
        
        const timezone = entry.getAttribute('data-timezone');
        if (!timezone) {
            console.error('[handleSliderEvent] No timezone attribute found');
            return;
        }
        
        const value = parseInt(slider.value);
        const minutes = value * 15;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        console.log('[handleSliderEvent] Processing slider event:', {
            timezone,
            sliderValue: value,
            totalMinutes: minutes,
            hours,
            mins
        });

        try {
            // Get the current date in the source timezone
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
            const localDate = new Date(Date.UTC(year, month, day, hours, mins));

            console.log('[handleSliderEvent] Created local date:', {
                timezone,
                localDate: localDate.toISOString(),
                components: { year, month, day, hours, mins }
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
            const offset = (hours * 60 + mins) - (sourceHours * 60 + sourceMinutes);
            const utcDate = new Date(localDate.getTime() + offset * 60 * 1000);

            console.log('[handleSliderEvent] Time conversion results:', {
                timezone,
                sourceTime: `${sourceHours}:${sourceMinutes}`,
                targetTime: `${hours}:${mins}`,
                offset,
                utcDate: utcDate.toISOString()
            });

            // Update all timezones with the new UTC time
            this.updateOtherTimezones(timezone, utcDate);
        } catch (error) {
            console.error('[handleSliderEvent] Error processing slider event:', error);
            // Revert the slider to its previous position
            this.updateOtherTimezones(timezone, this.selectedDate);
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
                    const sliderValue = Math.round((hours * 60 + minutes) / 15);

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
                    this.timezones.add(result.timezone);
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
        
        element.addEventListener('mouseup', () => {
            // Remove draggable after drag is done
            element.setAttribute('draggable', false);
        });
        
        element.addEventListener('dragstart', (e) => {
            this.draggedElement = element;
            element.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', timezone);
        });
        
        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
            element.setAttribute('draggable', false);
            this.draggedElement = null;
            
            // Save the new order and re-render the entire list
            const timezonesArray = Array.from(this.timezonesContainer.children).map(el => {
                return el.getAttribute('data-timezone');
            });
            this.timezones = new Set(timezonesArray);
            
            // Force a complete re-render to update all time differences
            this.render();
        });
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (this.draggedElement === element) return;
            
            const rect = element.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            const isAfter = e.clientY > midpoint;
            
            // Remove drag-over class from all elements
            Array.from(this.timezonesContainer.children).forEach(el => {
                el.classList.remove('drag-over');
            });
            
            // Add drag-over class to the current element
            element.classList.add('drag-over');
            
            if (this.draggedElement && this.draggedElement !== element) {
                const referenceElement = isAfter ? element.nextSibling : element;
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
            
            // Force a re-render after drop to update time differences
            const timezonesArray = Array.from(this.timezonesContainer.children).map(el => {
                return el.getAttribute('data-timezone');
            });
            this.timezones = new Set(timezonesArray);
            this.render();
        });
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

    toggleTimeFormat() {
        this.use24Hour = !this.use24Hour;
        if (this.timeFormatTextEl) {
            this.timeFormatTextEl.textContent = this.use24Hour ? '24h' : '12h';
        }
        
        // Update time displays
        this.updateAllDisplays();
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
                const minutes = value * 15;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                
                const date = new Date(this.selectedDate);
                date.setHours(hours, mins, 0, 0);
                
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
    
    removeAllTimezones() {
        this.timezones.clear();
        this.render();
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
    
    render() {
        if (!this.timezonesContainer) return;
        
        this.timezonesContainer.innerHTML = '';
        Array.from(this.timezones).forEach(timezone => {
            const entry = this.createTimezoneEntry(timezone);
            this.timezonesContainer.appendChild(entry);
            this.initializeDragAndDrop(entry, timezone);
        });
        
        // Restart the time update interval after rendering
        this.startCurrentTimeUpdate();
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

        return entry;
    }

    removeTimezone(timezone) {
        this.timezones.delete(timezone);
        this.render();
    }
}

// Initialize the app
const timeZoneManager = new TimeZoneManager();
