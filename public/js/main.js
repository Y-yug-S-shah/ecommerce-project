// Main JavaScript file for ElectroShop

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Bootstrap popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Auto-hide alerts after 5 seconds
  setTimeout(function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }, 5000);

  // Quantity input controls
  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(function(input) {
    const minusBtn = input.parentElement.querySelector('.quantity-minus');
    const plusBtn = input.parentElement.querySelector('.quantity-plus');
    
    if (minusBtn) {
      minusBtn.addEventListener('click', function() {
        let value = parseInt(input.value);
        if (value > 1) {
          input.value = value - 1;
        }
      });
    }
    
    if (plusBtn) {
      plusBtn.addEventListener('click', function() {
        let value = parseInt(input.value);
        const max = parseInt(input.getAttribute('max') || 99);
        if (value < max) {
          input.value = value + 1;
        }
      });
    }
  });

  // Product image gallery
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  
  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(function(thumbnail) {
      thumbnail.addEventListener('click', function() {
        const newSrc = this.getAttribute('data-src');
        mainImage.src = newSrc;
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Filter toggle on mobile
  const filterToggleBtn = document.getElementById('filter-toggle');
  const filterSection = document.getElementById('filter-section');
  
  if (filterToggleBtn && filterSection) {
    filterToggleBtn.addEventListener('click', function() {
      filterSection.classList.toggle('show');
    });
  }

  // Price range slider
  const priceRange = document.getElementById('price-range');
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  
  if (priceRange && priceMin && priceMax) {
    noUiSlider.create(priceRange, {
      start: [parseInt(priceMin.value) || 0, parseInt(priceMax.value) || 5000],
      connect: true,
      step: 100,
      range: {
        'min': 0,
        'max': 5000
      },
      format: {
        to: function(value) {
          return Math.round(value);
        },
        from: function(value) {
          return value;
        }
      }
    });
    
    priceRange.noUiSlider.on('update', function(values, handle) {
      if (handle === 0) {
        priceMin.value = values[0];
      } else {
        priceMax.value = values[1];
      }
    });
  }

  // Add specification fields in admin product form
  const addSpecBtn = document.getElementById('add-spec-btn');
  const specContainer = document.getElementById('specifications-container');
  
  if (addSpecBtn && specContainer) {
    let specCount = document.querySelectorAll('.spec-row').length;
    
    addSpecBtn.addEventListener('click', function() {
      const newRow = document.createElement('div');
      newRow.className = 'row spec-row mb-3';
      newRow.innerHTML = `
        <div class="col-5">
          <input type="text" class="form-control" name="spec_key_${specCount}" placeholder="Specification name">
        </div>
        <div class="col-5">
          <input type="text" class="form-control" name="spec_value_${specCount}" placeholder="Specification value">
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-danger remove-spec-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
      
      specContainer.appendChild(newRow);
      
      // Add event listener to remove button
      const removeBtn = newRow.querySelector('.remove-spec-btn');
      removeBtn.addEventListener('click', function() {
        specContainer.removeChild(newRow);
      });
      
      specCount++;
    });
    
    // Add event listeners to existing remove buttons
    const removeButtons = document.querySelectorAll('.remove-spec-btn');
    removeButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const row = btn.closest('.spec-row');
        specContainer.removeChild(row);
      });
    });
  }
});
