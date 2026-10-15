 document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookBtn = document.getElementById('bookserviceBtn');
  const bookingForm = document.getElementById('bookingForm');
  const transferAmount = document.getElementById('transferAmount');
  const serviceRadios = document.querySelectorAll('input[name="service_type"]');
  const copyAccBtn = document.getElementById('copyAccBtn');
  const accountNum = document.getElementById('accountNum');
  const receiptUpload = document.getElementById('receiptUpload');
  const fileLabelText = document.getElementById('fileLabelText');

  // 1. Update Transfer Price based on selected service
  const updateTransferPrice = () => {
    const selectedService = document.querySelector('input[name="service_type"]:checked');
    if (selectedService && transferAmount) {
      const price = selectedService.getAttribute('data-price');
      transferAmount.textContent = `$${price}`;
    }
  };

  serviceRadios.forEach(radio => {
    radio.addEventListener('change', updateTransferPrice);
  });

  // 2. Copy Account Number Functionality
  if (copyAccBtn && accountNum) {
    copyAccBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(accountNum.textContent.trim()).then(() => {
        copyAccBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyAccBtn.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  // 3. Show File Name when image is selected
  if (receiptUpload && fileLabelText) {
    receiptUpload.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        fileLabelText.textContent = `Attached: ${e.target.files[0].name}`;
      } else {
        fileLabelText.textContent = 'Choose Receipt Image / Screenshot';
      }
    });
  }

  // 4. Open/Close Modal Functions
  const openBookingModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateTransferPrice();
  };

  const closeBookingModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBookingModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) closeBookingModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeBookingModal();
  });

  // 5. Report that booking submission requires a server
  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showBookingStatus(
        'The booking form is currently unavailable. Please contact Mint Aura directly to arrange your service.',
        'error'
      );
    });
  }

  const showBookingStatus = (message, type = 'error') => {
    let notice = document.getElementById('bookingStatusNotice');

    if (!notice) {
      notice = document.createElement('div');
      notice.id = 'bookingStatusNotice';
      notice.style.position = 'fixed';
      notice.style.top = '20px';
      notice.style.left = '50%';
      notice.style.transform = 'translateX(-50%)';
      notice.style.zIndex = '9999';
      notice.style.padding = '14px 20px';
      notice.style.borderRadius = '10px';
      notice.style.fontWeight = '600';
      notice.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      notice.style.maxWidth = '90vw';
      notice.style.textAlign = 'center';
      document.body.prepend(notice);
    }

    notice.textContent = message;
    notice.style.background = type === 'success' ? '#dff7e8' : '#ffe5e5';
    notice.style.color = type === 'success' ? '#1d6b3f' : '#9b1c1c';
    notice.style.border = type === 'success' ? '1px solid #9ad0ae' : '1px solid #f2b4b4';
    notice.style.display = 'block';

    setTimeout(() => {
      notice.style.display = 'none';
    }, 5000);
  };

});


