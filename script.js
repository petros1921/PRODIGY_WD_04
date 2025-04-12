// Custom Cursor
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })
  
    document.querySelectorAll("a, button, .btn").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorFollower.style.backgroundColor = "rgba(108, 99, 255, 0.1)"
        cursorFollower.style.border = "none"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
        cursorFollower.style.backgroundColor = "transparent"
        cursorFollower.style.border = "2px solid var(--primary-color)"
      })
    })
  })
  
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })
  
  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })
  
  // Active Navigation Link
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")
  
  window.addEventListener("scroll", () => {
    let current = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })
  
    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active")
      }
    })
  })
  
  // Scroll Animation
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    header.classList.toggle("scrolled", window.scrollY > 50)
  
    // Animate skill bars when in viewport
    const skillSection = document.querySelector(".skills")
    if (isInViewport(skillSection)) {
      document.querySelectorAll(".progress-line span").forEach((span) => {
        span.style.width = span.parentElement.parentElement.querySelector(".skill-info p:last-child").textContent
      })
    }
  })
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }
  
  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")
  
      const filterValue = button.getAttribute("data-filter")
  
      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })
  
  // Form Submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value
  
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show a success message
      console.log("Form submitted:", { name, email, subject, message })
  
      // Show success message (you can create a better UI for this)
      alert("Thank you for your message! I will get back to you soon.")
  
      // Reset form
      contactForm.reset()
    })
  }
  
  // Scroll Reveal Animation
  document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
      ".section-header, .about-content, .skills-content, .project-card, .contact-content",
    )
  
    const revealElement = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
          observer.unobserve(entry.target)
        }
      })
    }
  
    const options = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver(revealElement, options)
  
    revealElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(element)
    })
  
    // Add revealed class to observed elements when they come into view
    document.addEventListener("scroll", () => {
      revealElements.forEach((element) => {
        if (isInViewport(element)) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    })
  })
  