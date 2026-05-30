            // ----- DATA (exactly from image: rooms, labs, areas with floor)
            const destinations = [{
                name: "Lecture Room (R54)",
                floor: "Fifth Floor",
                category: "Rooms",
                icon: "fa-chalkboard-user"
            }, {
                name: "Lecture Room (R53)",
                floor: "Fifth Floor",
                category: "Rooms",
                icon: "fa-chalkboard-user"
            }, {
                name: "Physics Laboratory (R44)",
                floor: "Fourth Floor",
                category: "Labs",
                icon: "fa-flask"
            }, {
                name: "Drafting Room-2 (R47)",
                floor: "Fourth Floor",
                category: "Rooms",
                icon: "fa-pen-ruler"
            }, {
                name: "Lecture Room (R46)",
                floor: "Fourth Floor",
                category: "Rooms",
                icon: "fa-chalkboard-user"
            }, {
                name: "Computer Room (Acl)",
                floor: "Second Floor",
                category: "Labs",
                icon: "fa-computer"
            }, {
                name: "Library",
                floor: "Ground floor",
                category: "Areas",
                icon: "fa-book"
            }, {
                name: "Criminology Lab 1 (Crim-1)",
                floor: "Fifth Floor",
                category: "Labs",
                icon: "fa-microscope"
            }, {
                name: "Assembly Point",
                floor: "Ground floor",
                category: "Areas",
                icon: "fa-people-arrows"
            }];

            // DOM elements
            const panel = document.getElementById('destinationPanel');
            const floorBtn = document.getElementById('floorMapsBtn');
            const chevron = document.getElementById('triggerChevron');
            const searchInput = document.getElementById('searchInput');
            const filterContainer = document.getElementById('filterTabs');
            const destinationListEl = document.getElementById('destinationList');

            let currentFilter = 'all'; // 'all', 'Rooms', 'Labs', 'Areas'
            let currentSearch = '';

            // Helper: render list based on filter + search
            function renderDestinationList() {
                // filter by category
                let filtered = destinations.filter(dest => {
                    if (currentFilter === 'all') return true;
                    return dest.category === currentFilter;
                });

                // filter by search query (case-insensitive)
                if (currentSearch.trim() !== '') {
                    const query = currentSearch.trim().toLowerCase();
                    filtered = filtered.filter(dest =>
                        dest.name.toLowerCase().includes(query) ||
                        dest.floor.toLowerCase().includes(query)
                    );
                }

                // render list or empty state
                if (filtered.length === 0) {
                    destinationListEl.innerHTML = `<div class="empty-state"><i class="fas fa-map-marked-alt"></i> <br /> No matching destinations found</div>`;
                    return;
                }

                // build items HTML
                let itemsHtml = '';
                filtered.forEach(dest => {
                    // choose icon based on category fallback
                    let iconClass = dest.icon || 'fa-location-dot';
                    // little variation for areas / specific
                    itemsHtml += `
        <div class="destination-item" data-dest='${JSON.stringify(dest)}'>
          <div class="destination-info">
            <div class="dest-name">
              <i class="fas ${iconClass}"></i>
              <span>${escapeHtml(dest.name)}</span>
              <span class="floor-badge">${escapeHtml(dest.floor)}</span>
            </div>
            <div class="dest-location">
              <i class="fas fa-location-arrow"></i>
              <span>${escapeHtml(dest.floor)}</span>
            </div>
          </div>
          <i class="fas fa-chevron-right direction-icon"></i>
        </div>
      `;
                });
                destinationListEl.innerHTML = itemsHtml;

                // attach click event to each destination item (direction simulation)
                document.querySelectorAll('.destination-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        const destData = item.getAttribute('data-dest');
                        if (destData) {
                            const destination = JSON.parse(destData);
                            // provide user feedback / alert for demo (navigation simulation)
                            alert(`🚶 Navigating to: ${destination.name}\n📍 ${destination.floor}\n✨ This would open turn-by-turn directions.`);
                            // optional: you can extend with actual routing
                        }
                    });
                });
            }

            // simple escape helper to avoid XSS
            function escapeHtml(str) {
                return str.replace(/[&<>]/g, function(m) {
                    if (m === '&') return '&amp;';
                    if (m === '<') return '&lt;';
                    if (m === '>') return '&gt;';
                    return m;
                });
            }

            // update active tab UI
            function setActiveFilterButton(filterValue) {
                const btns = document.querySelectorAll('.filter-btn');
                btns.forEach(btn => {
                    const btnFilter = btn.getAttribute('data-filter');
                    if (btnFilter === filterValue) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }

            // event: filter buttons
            function initFilters() {
                const filterBtns = document.querySelectorAll('.filter-btn');
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const filterValue = btn.getAttribute('data-filter');
                        if (filterValue === 'all') currentFilter = 'all';
                        else if (filterValue === 'Rooms') currentFilter = 'Rooms';
                        else if (filterValue === 'Labs') currentFilter = 'Labs';
                        else if (filterValue === 'Areas') currentFilter = 'Areas';
                        setActiveFilterButton(currentFilter === 'all' ? 'all' : currentFilter);
                        renderDestinationList();
                    });
                });
            }

            // search input handler
            function initSearch() {
                searchInput.addEventListener('input', (e) => {
                    currentSearch = e.target.value;
                    renderDestinationList();
                });
            }

            // open/close panel when clicking the floor maps button
            function initPanelToggle() {
                floorBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isOpen = panel.classList.contains('open');
                    if (isOpen) {
                        panel.classList.remove('open');
                        chevron.classList.remove('fa-chevron-up');
                        chevron.classList.add('fa-chevron-down');
                    } else {
                        panel.classList.add('open');
                        chevron.classList.remove('fa-chevron-down');
                        chevron.classList.add('fa-chevron-up');
                        // slight scroll into view for better mobile experience
                        setTimeout(() => {
                            panel.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 150);
                    }
                });
            }

            // extra: if user clicks outside the panel? not needed, but we keep it friendly
            // optional: close when clicking "Escape" key? not required but nice
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && panel.classList.contains('open')) {
                    panel.classList.remove('open');
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                }
            });

            // initialize everything
            function init() {
                renderDestinationList();
                initFilters();
                initSearch();
                initPanelToggle();
                // ensure that panel starts closed
                panel.classList.remove('open');
                chevron.classList.add('fa-chevron-down');
                chevron.classList.remove('fa-chevron-up');
                // prefill button icon consistency
            }

            init();