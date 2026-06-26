document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       PREMIUM LOADING SCREEN LIFECYCLE
       ========================================================================== */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }
        }, 800);
    });

    /* ==========================================================================
       THEME CONTROLLER (LOCAL STORAGE TRACKED)
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';

    htmlElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    /* ==========================================================================
       SCROLL INDICATOR & STICKY HEADER MATRIX
       ========================================================================== */
    const progressIndicator = document.getElementById('scroll-progress');
    const headerElement = document.querySelector('.main-header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScrollThrottled = () => {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const currentProgress = (window.scrollY / totalScrollHeight) * 100;
            progressIndicator.style.width = `${currentProgress}%`;
        }

        if (window.scrollY > 50) {
            headerElement.classList.add('scrolled');
        } else {
            headerElement.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScrollThrottled);
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================================
       MOBILE RESPONSIVE DRAWER OVERLAY
       ========================================================================== */
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const navigationLinksDrawer = document.querySelector('.nav-links');
    const navigationIndividualLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navigationLinksDrawer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navigationLinksDrawer.classList.toggle('active');
        });

        navigationIndividualLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navigationLinksDrawer.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       VANILLA TYPEWRITER SEQUENCER ENGINE
       ========================================================================== */
    const typewriterStringOutput = document.getElementById('typewriter');
    const semanticRoleArray = [
        "UI/UX Designer",
        "Web Developer"
    ];
    let activeStringArrayIndex = 0;
    let characterStringPointer = 0;
    let isDeletingFlag = false;

    const typewriterProcessingLoop = () => {
        const fullTargetString = semanticRoleArray[activeStringArrayIndex];
        
        if (isDeletingFlag) {
            typewriterStringOutput.textContent = fullTargetString.substring(0, characterStringPointer - 1);
            characterStringPointer--;
        } else {
            typewriterStringOutput.textContent = fullTargetString.substring(0, characterStringPointer + 1);
            characterStringPointer++;
        }

        let standardExecutionDelay = isDeletingFlag ? 50 : 120;

        if (!isDeletingFlag && characterStringPointer === fullTargetString.length) {
            standardExecutionDelay = 2000;
            isDeletingFlag = true;
        } else if (isDeletingFlag && characterStringPointer === 0) {
            isDeletingFlag = false;
            activeStringArrayIndex = (activeStringArrayIndex + 1) % semanticRoleArray.length;
            standardExecutionDelay = 500;
        }

        setTimeout(typewriterProcessingLoop, standardExecutionDelay);
    };

    if (typewriterStringOutput) {
        typewriterProcessingLoop();
    }

    /* ==========================================================================
     INTERSECTION OBSERVER MATRIX (REVEALS / STATS / BARS)
     ========================================================================== */
    const functionalSectionIntersectionObserver = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Active Section Tracking Matrix Trigger
                const activeId = entry.target.getAttribute('id');
                navigationIndividualLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });

                // Conditional Triggering if child elements exist
                if(entry.target.querySelectorAll('.skill-bar').length > 0) {
                    entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }

                if(entry.target.querySelectorAll('.stat-number').length > 0) {
                    entry.target.querySelectorAll('.stat-number').forEach(counter => {
                        if(counter.getAttribute('data-animated') !== 'true') {
                            triggerCountUpAnimationSequence(counter);
                        }
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, .scroll-reveal').forEach(section => {
        functionalSectionIntersectionObserver.observe(section);
    });

    const triggerCountUpAnimationSequence = (element) => {
        element.setAttribute('data-animated', 'true');
        const processingNumericalTarget = parseInt(element.getAttribute('data-target'), 10);
        let startingInteger = 0;
        const totalDurationFrameCount = 60;
        const incrementalValue = Math.ceil(processingNumericalTarget / totalDurationFrameCount);

        const executionTick = () => {
            startingInteger += incrementalValue;
            if (startingInteger >= processingNumericalTarget) {
                element.textContent = processingNumericalTarget;
            } else {
                element.textContent = startingInteger;
                requestAnimationFrame(executionTick);
            }
        };
        executionTick();
    };

    /* ==========================================================================
       PORTFOLIO REPOSITORY MODAL DATA MATRIX (EXPANDED matrix)
       ========================================================================== */
    const localProjectMetadata = {
        "1": {
            title: "Student Database Management System",
            badges: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
            description: "An enterprise institutional portal deployed across separate execution architectures. Built directly around transactional validation models, highly optimized processing schedules, and data structures.",
            details: [
                "Full Student Dashboards covering attendance registers and course schedules.",
                "Real-time processing parameters for internal grading evaluation criteria.",
                "Automated structural processing pathways for transaction compliance layers.",
                "Unified interface frameworks resolving complaints directly to academic boards.",
                "Instructor execution panels enabling dynamic grade sheets manipulation."
            ]
        },
        "2": {
            title: "Household Hardware & Electricals E-Commerce Website",
            badges: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
            description: "A secure, production-grade e-commerce application processing transactional logic parameters efficiently. Features a minimalist UI architecture alongside high responsiveness standards.",
            details: [
                "Real-time atomic product catalogue rendering and quick search filtering.",
                "Advanced tracking schemas validating ongoing dynamic inventory levels.",
                "Asynchronous manipulation vectors managing product processing carts.",
                "Strict order persistence structures and checkout procedures.",
                "Direct API calculations ensuring synchronized real-time multi-branch stocks."
            ]
        },
        "3": {
            title: "Face Recognition Cryptography Dashboard",
            badges: ["Figma", "Prototyping", "System Design", "User Flow"],
            description: "A high-fidelity interface case study transforming mathematical computer vision matrices into structured, intuitive user dashboard layouts.",
            details: [
                "Interactive desktop workflow maps validating localized user facial landmarks verification prompts.",
                "Clean security parameters UI alerting clients when unauthorized scanning shifts occur.",
                "Sleek light and dark mode adaptive layouts following material SaaS aesthetic systems.",
                "Simplified key extraction layout models presenting AES-GCM data vectors transparently."
            ]
        },
        "4": {
            title: "College Student & Teacher Portal Ecosystem",
            badges: ["Wireframing", "UI Kit", "User Research", "Figma"],
            description: "A comprehensive interface overhaul project balancing complicated relational university systems into fluid, clean component hierarchies.",
            details: [
                "Deconstructed complex multi-role dashboards for students and faculty tracking administrative indices.",
                "Engineered scalable component libraries mapping interactive grid alignments, font constraints, and uniform icons.",
                "Conducted deep persona workflow tracing optimization to simplify tracking metrics like fee payments.",
                "Applied strict Web Content Accessibility Guidelines (WCAG 2.1 AAA) color ratio criteria patterns."
            ]
        }
    };

    const projectTriggerCards = document.querySelectorAll('.portfolio-card');
    const systemModalOverlay = document.getElementById('portfolio-modal');
    const modalDynamicContainer = document.getElementById('modal-dynamic-content');
    const modalCloseTrigger = document.querySelector('.modal-close');

    projectTriggerCards.forEach(card => {
        card.addEventListener('click', () => {
            const associatedId = card.getAttribute('data-project');
            const targetData = localProjectMetadata[associatedId];
            
            if(targetData) {
                let generatedBadgesMarkup = '';
                targetData.badges.forEach(b => {
                    generatedBadgesMarkup += `<span class="badge">${b}</span>`;
                });

                let generatedBulletsMarkup = '';
                targetData.details.forEach(item => {
                    generatedBulletsMarkup += `<li>${item}</li>`;
                });

                modalDynamicContainer.innerHTML = `
                    <h2>${targetData.title}</h2>
                    <div class="project-badges">${generatedBadgesMarkup}</div>
                    <p>${targetData.description}</p>
                    <h4>Key Deliverables & Architectural Features</h4>
                    <ul>${generatedBulletsMarkup}</ul>
                `;
                systemModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeOverlayAction = () => {
        systemModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (modalCloseTrigger) {
        modalCloseTrigger.addEventListener('click', closeOverlayAction);
    }
    if (systemModalOverlay) {
        systemModalOverlay.addEventListener('click', (e) => {
            if(e.target === systemModalOverlay) closeOverlayAction();
        });
    }

    /* ==========================================================================
       CONTACT FORM LIVE STRUCTURAL VALIDATION PIPELINE
       ========================================================================== */
    const targetingContactForm = document.getElementById('portfolio-contact-form');
    const validationNameInput = document.getElementById('form-name');
    const validationEmailInput = document.getElementById('form-email');
    const validationPhoneInput = document.getElementById('form-phone');
    const validationMessageInput = document.getElementById('form-message');

    const validationRegexPatterns = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^[0-9]{10}$/
    };

    const evaluateInputFieldValidity = (inputRef, errorElementId, evaluationCondition) => {
        const errorDOMReference = document.getElementById(errorElementId);
        if (evaluationCondition) {
            errorDOMReference.style.display = 'none';
            inputRef.style.borderColor = 'var(--border-color)';
            return true;
        } else {
            errorDOMReference.style.display = 'block';
            inputRef.style.borderColor = '#EF4444';
            return false;
        }
    };

    if(targetingContactForm) {
        targetingContactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = evaluateInputFieldValidity(validationNameInput, 'err-name', validationNameInput.value.trim().length > 0);
            const isEmailValid = evaluateInputFieldValidity(validationEmailInput, 'err-email', validationRegexPatterns.email.test(validationEmailInput.value.trim()));
            const isPhoneValid = evaluateInputFieldValidity(validationPhoneInput, 'err-phone', validationRegexPatterns.phone.test(validationPhoneInput.value.trim().replace(/\s+/g, '')));
            const isMessageValid = evaluateInputFieldValidity(validationMessageInput, 'err-message', validationMessageInput.value.trim().length > 0);

            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                const targetSubmissionButton = targetingContactForm.querySelector('.form-submit');
                const systemSuccessBanner = document.getElementById('form-success');
                
                const targetPayloadData = {
                    name: validationNameInput.value.trim(),
                    email: validationEmailInput.value.trim(),
                    phone: validationPhoneInput.value.trim().replace(/\s+/g, ''),
                    message: validationMessageInput.value.trim()
                };

                if (targetSubmissionButton) {
                    targetSubmissionButton.disabled = true;
                    targetSubmissionButton.value = "Transmitting Request...";
                    targetSubmissionButton.style.opacity = "0.5";
                    targetSubmissionButton.style.cursor = "not-allowed";
                }
                // fetch('https://portfolio-backend-three-phi.vercel.app/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/json'
                //     },
                //     body: JSON.stringify(targetPayloadData)
                // })
                // fetch('https://portfolio-backend-three-phi.vercel.app/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/json'
                //     },
                //     body: JSON.stringify(targetPayloadData)
                // })
                // Verification Target for Live Production Website
                fetch('https://portfolio-backend-sigma-neon.vercel.app/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(targetPayloadData)
                })
                .then(async (networkResponse) => {
                    const parsedJsonData = await networkResponse.json();
                    if (!networkResponse.ok) {
                        throw new Error(parsedJsonData.message || 'Server structural constraints processing rejection.');
                    }
                    return parsedJsonData;
                })
                .then((successfulDataOutput) => {
                    systemSuccessBanner.textContent = successfulDataOutput.message || "Message transmitted successfully! I will reach out soon.";
                    systemSuccessBanner.style.display = 'block';
                    systemSuccessBanner.style.color = '#10B881';
                    systemSuccessBanner.style.background = 'rgba(16, 185, 129, 0.1)';
                    systemSuccessBanner.style.borderColor = '#10B881';
                    
                    targetingContactForm.reset();
                    
                    setTimeout(() => {
                        systemSuccessBanner.style.display = 'none';
                    }, 6000);
                })
                .catch((runtimeNetworkError) => {
                    console.error('API submission pipeline execution trace exception:', runtimeNetworkError);
                    systemSuccessBanner.textContent = `Submission Interrupted: ${runtimeNetworkError.message}`;
                    systemSuccessBanner.style.display = 'block';
                    systemSuccessBanner.style.color = '#EF4444';
                    systemSuccessBanner.style.background = 'rgba(239, 68, 68, 0.1)';
                    systemSuccessBanner.style.borderColor = '#EF4444';
                })
                .finally(() => {
                    if (targetSubmissionButton) {
                        targetSubmissionButton.disabled = false;
                        targetSubmissionButton.value = "Send Message";
                        targetSubmissionButton.style.opacity = "1";
                        targetSubmissionButton.style.cursor = "pointer";
                    }
                });
            }
        });
    }
});