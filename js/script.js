/**
 * JARECHA INVESTMENTS LIMITED — MASTER JAVASCRIPT
 * Pure Vanilla JavaScript — Zero Dependencies, Zero Build Step
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }
  }, { passive: true });

  // 2. Navbar Scroll Style & Active Navigation Tracker
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollPos = window.scrollY + 200;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}` || link.dataset.target === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile drawer when clicking any link inside it
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 4. Smooth Anchor Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Service Detail Modal System
  const modalBackdrop = document.getElementById('service-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalCaps = document.getElementById('modal-caps');
  const modalClose = document.getElementById('modal-close');
  const modalInquireBtn = document.getElementById('modal-inquire-btn');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

  // Service database dictionary for modal
  const serviceDetails = {
    "enterprise-networking": {
      category: "01 — Technology & Digital",
      title: "Enterprise Networking & Fiber",
      desc: "Comprehensive structured cabling (Cat6/Cat6A), single-mode & multi-mode optical fiber splicing, enterprise rack installations, switch/router provisioning, and corporate Wi-Fi mesh coverage.",
      caps: [
        "Cat6/Cat6A Structured Cabling",
        "Fiber Fusion Splicing & OTDR",
        "Enterprise Rack Architecture",
        "Managed Switching & Routing",
        "High-density Wi-Fi 6 Networks",
        "VLAN & Subnet Segmentation"
      ]
    },
    "data-center": {
      category: "01 — Technology & Digital",
      title: "Data Center & Server Infrastructure",
      desc: "Turnkey server room construction, precision climate control, dual-redundant UPS systems, rack mount chassis, server virtualization (VMware/Hyper-V), and enterprise cloud hybrid integrations.",
      caps: [
        "Tier II/III Architecture Standards",
        "Dual-bus Redundant UPS Units",
        "Precision Environmental Cooling",
        "VMware ESXi / Proxmox Virtualization",
        "Automated Backup & Replication",
        "Fire Suppression Integration"
      ]
    },
    "custom-software": {
      category: "01 — Technology & Digital",
      title: "Custom Software & Web Platforms",
      desc: "Bespoke corporate management systems, ERP custom modules, patient management records, secure client portals, high-performance web applications, and API integration with regional payment gateways.",
      caps: [
        "Modern Full-Stack Applications",
        "Bespoke Internal Web Portals",
        "Mobile App Development",
        "Zambian Payment API Integrations",
        "Microservice Architectures",
        "Role-Based Access Control"
      ]
    },
    "it-managed-support": {
      category: "01 — Technology & Digital",
      title: "Managed IT Support & SLA",
      desc: "Guaranteed uptime agreements, 24/7 helpdesk ticketing, remote infrastructure monitoring, periodic preventive maintenance cycles, and corporate hardware lifecycle asset replenishment.",
      caps: [
        "Rapid Critical Response SLAs",
        "Proactive Remote Fleet Monitoring",
        "Quarterly Preventive Maintenance",
        "Helpdesk Multi-tier Support",
        "Hardware Warranty Management",
        "Disaster Recovery Drills"
      ]
    },
    "electrical-power": {
      category: "02 — Engineering & Infrastructure",
      title: "Commercial & Industrial Electrical",
      desc: "EIZ-certified heavy 3-phase industrial power installations, transformer sub-stations, motor control centers (MCC), panel fabrication, power factor correction, and surge suppression.",
      caps: [
        "3-Phase Heavy Distribution",
        "Motor Control Centers (MCC)",
        "Automated Mains Failure (AMF)",
        "Power Factor Correction Panels",
        "Earth Resistance Testing",
        "Industrial Cable Tray Racks"
      ]
    },
    "solar-energy": {
      category: "02 — Engineering & Infrastructure",
      title: "Commercial Solar & Backup Microgrids",
      desc: "Grid-tied, hybrid, and off-grid high-capacity commercial solar systems, lithium iron phosphate (LiFePO4) storage banks, smart inverters, and automated generator sync panels.",
      caps: [
        "Commercial Roof & Ground Arrays",
        "High-cycle LiFePO4 Energy Storage",
        "Hybrid Multi-source Synchronization",
        "Solar Water Pumping Systems",
        "Remote Energy Telemetry",
        "Zero-emission Load Shaving"
      ]
    },
    "civil-telecom": {
      category: "02 — Engineering & Infrastructure",
      title: "Civil & Telecommunications Works",
      desc: "Telecom tower foundation casting, mast erection, shelter civil works, cable trenching, directional drilling, equipment pad construction, and perimeter site fencing.",
      caps: [
        "Lattice & Monopole Towers",
        "Concrete Equipment Pads",
        "Underground Trenching & Ducts",
        "Lightning Protection Rods",
        "Access Road Civil Grading",
        "Perimeter High-security Fencing"
      ]
    },
    "cctv-surveillance": {
      category: "03 — Security & Smart Office",
      title: "IP CCTV Surveillance & AI Analytics",
      desc: "High-definition 4K optical & thermal cameras, automated license plate recognition (ALPR), facial detection analytics, enterprise Network Video Recorders (NVR), and remote command center setup.",
      caps: [
        "4K Low-light & Starlight Optics",
        "Automated License Plate (ALPR)",
        "Thermal Perimeter Intrusion",
        "Centralized Video Command Centers",
        "Fisheye 360° Wide Coverage",
        "Encrypted Remote Mobile Streaming"
      ]
    },
    "access-control": {
      category: "03 — Security & Smart Office",
      title: "Biometric Access & Time Attendance",
      desc: "Facial recognition terminals, optical fingerprint sensors, RFID smart card turnstiles, electromagnetic locks, time & attendance software integration with Zambian payroll systems.",
      caps: [
        "Contactless Face Terminals",
        "Full-height Security Turnstiles",
        "Multi-door Interlock Mantrap",
        "Payroll Time-tracking Integration",
        "Visitor Registration Kiosks",
        "Anti-passback Enforcements"
      ]
    },
    "fire-detection": {
      category: "03 — Security & Smart Office",
      title: "Fire Detection & Smart Automation",
      desc: "Addressable smoke and heat detectors, automated sounder strobes, clean-agent FM-200 gas suppression for server rooms, smart lighting, and building automation controllers.",
      caps: [
        "Addressable Fire Panels",
        "FM-200 Clean Agent Gas Suppression",
        "Aspirating Smoke Detection (ASD)",
        "Smart Automated Office Lighting",
        "HVAC Energy Management",
        "Emergency Exit Strobe Alarms"
      ]
    },
    "corporate-procurement": {
      category: "04 — Business & Capacity Building",
      title: "Corporate Procurement & Supply",
      desc: "ZPPA-compliant direct institutional sourcing of OEM server hardware, genuine laptops, commercial displays, safety apparel (PPE), electrical components, and industrial machinery parts.",
      caps: [
        "ZPPA-compliant Supply Delivery",
        "Direct OEM Hardware Supply",
        "Industrial PPE & Safety Gear",
        "Heavy Duty Specialized Tools",
        "Commercial Printers & Consumables",
        "Complete Project Bill of Quantities"
      ]
    },
    "corporate-training": {
      category: "04 — Business & Capacity Building",
      title: "IT & Engineering Staff Capacity Building",
      desc: "Tailored professional on-site workshops, cybersecurity hygiene, network administration essentials, workplace safety protocols, and operational management certification training.",
      caps: [
        "Hands-on Network Labs",
        "Cybersecurity Awareness Seminars",
        "Industrial Equipment Safety",
        "ERP Software End-user Training",
        "Custom Corporate Syllabi",
        "Certified Completion Records"
      ]
    }
  };

  const openServiceModal = (serviceKey) => {
    const data = serviceDetails[serviceKey];
    if (!data || !modalBackdrop) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    if (modalCaps) {
      modalCaps.innerHTML = '';
      data.caps.forEach((cap) => {
        const div = document.createElement('div');
        div.className = 'modal-cap-item';
        div.innerHTML = `
          <svg style="width:16px;height:16px;color:#F5C400;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>${cap}</span>
        `;
        modalCaps.appendChild(div);
      });
    }

    // Set WhatsApp link for this specific service
    if (modalWhatsappBtn) {
      modalWhatsappBtn.href = `https://wa.me/260977325804?text=Hello%20Jarecha%20Investments,%20I%20am%20inquiring%20about%20${encodeURIComponent(data.title)}.`;
    }

    // Set Inquire button action
    if (modalInquireBtn) {
      modalInquireBtn.onclick = () => {
        closeModal();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const serviceSelect = document.getElementById('service-select');
          if (serviceSelect) {
            serviceSelect.value = data.title;
          }
        } else {
          window.location.href = `contact.html?service=${encodeURIComponent(data.title)}`;
        }
      };
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-service]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-service');
      openServiceModal(key);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });

  // 7. Contact Form Submission (Inline animated feedback, NO alert)
  const contactForm = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success-box');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && successBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Dispatching Inquiry...</span>
        `;
      }

      // Simulate reliable server transmission
      setTimeout(() => {
        contactForm.style.display = 'none';
        successBox.classList.add('show');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Submit Inquiry to Jarecha</span>`;
        }
      }, 700);
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        contactForm.reset();
        successBox.classList.remove('show');
        contactForm.style.display = 'block';
      });
    }
  }

  // 8. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 9. Pre-populate service dropdown if passed via URL parameter (?service=...)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase()) ||
            serviceParam.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
});
