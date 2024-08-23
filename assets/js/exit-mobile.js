/*function detectMobileExitIntent(callback) {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var scrollSpeedThreshold = -200; // Customize the scroll speed threshold as needed
    var scrollDirectionThreshold = 0; // Customize the scroll direction threshold as needed
    var backButtonThreshold = 0; // Customize the back button threshold as needed

    if (isMobile) {
        var scrollPosition = 0;
        var isScrollingUp = false;

        window.addEventListener('scroll', function() {
            var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > scrollPosition) {
                // Scrolling down
                isScrollingUp = false;
            } else {
                // Scrolling up
                isScrollingUp = true;
            }
            scrollPosition = currentScroll;
        });

        window.addEventListener('popstate', function(event) {
            if (isScrollingUp || event.state || scrollPosition <= backButtonThreshold) {
                // Call the callback function when the user intends to exit
                callback();
            }
        });
    }
}

// Callback function to add "is-open" class to elements with classes "popup" and "on-exit"
function addIsOpenClass() {
    var elements = document.querySelectorAll('.popup.on-exit');
    elements.forEach(function(element) {
        element.classList.add('is-open');
    });
}

// Example usage:
detectMobileExitIntent(addIsOpenClass);*/
window.onLoad(function() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        console.log("It's Mobile")
    } else {
        console.log("Not Mobile")
    }
})();

// Most promising so far
window.setTimeout(function() {
    /*DiviArea.show('#test')*/
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        console.log("It's Mobile");
        DiviArea.addAction('ready', function(area) {
            function detectMobileExitIntent(callback) {
                var scrollSpeedThreshold = -200; // Customize the scroll speed threshold as needed
                var backButtonThreshold = 0; // Customize the back button threshold as needed
                var isScrollingUp = false;

                window.addEventListener('scroll', function() {
                    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    if (currentScroll < scrollSpeedThreshold) {
                        // Scrolling up rapidly
                        isScrollingUp = true;
                    } else {
                        isScrollingUp = false;
                    }
                });

                window.addEventListener('popstate', function(event) {
                    if (isScrollingUp || event.state || window.pageYOffset <= backButtonThreshold) {
                        // Call the callback function when the user intends to exit
                        callback();
                    }
                });
            }

            function showExitIntentPopup() {
                // Your code to show the popup goes here
                console.log('Exit intent popup triggered on mobile');
                DiviArea.show('#test');
            }
            // Call the detectMobileExitIntent function with the showExitIntentPopup callback
            detectMobileExitIntent(showExitIntentPopup);
        });
    } else {
        console.log("Not Mobile");
    }
}, 1000);

window.setTimeout(function() {
    /*DiviArea.show('#test')*/
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        console.log("It's Mobile");
        DiviArea.addAction('ready', function(area) {
            function detectExitIntent() {
                var scrollSpeedThreshold = -200; // Customize the scroll speed threshold as needed
                var exitIntentTimeout = 3000; // Customize the timeout threshold as needed (e.g., 3000 milliseconds)
                var touchMoveThreshold = 50; // Customize the threshold as needed (e.g., 50 pixels)
                var touchStartTime = null;
                var exitIntentTimer = null;
                var isScrollingUp = false;

                function showExitIntentPopup() {
                    // Your code to show the popup goes here
                    console.log('Exit intent detected');
                    DiviArea.show('#test');
                    // Example: showPopup();
                }

                // Event listener for scroll behavior
                window.addEventListener('scroll', function() {
                    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    if (currentScroll < scrollSpeedThreshold) {
                        // Scrolling up rapidly
                        isScrollingUp = true;
                        console.log('Scrolling up detected');
                        showExitIntentPopup();
                    } else {
                        isScrollingUp = false;
                    }
                });

                // Event listener for page load timeout
                window.addEventListener('load', function() {
                    exitIntentTimer = setTimeout(function() {
                        // Show popup message after timeout
                        console.log('Exit intent timeout triggered');
                        showExitIntentPopup();
                    }, exitIntentTimeout);
                });

                // Event listener for touchstart
                window.addEventListener('touchstart', function(event) {
                    touchStartTime = Date.now();
                    console.log('Touch start detected');
                });

                // Event listener for touchmove
                window.addEventListener('touchmove', function(event) {
                    var deltaY = Math.abs(event.touches[0].clientY - event.changedTouches[0].clientY);
                    if (deltaY > touchMoveThreshold && Date.now() - touchStartTime < 1000) {
                        // Touch move detected indicating potential exit intent
                        console.log('Touch move detected');
                        showExitIntentPopup();
                    }
                });

                // Event listener for page visibility change
                document.addEventListener('visibilitychange', function() {
                    if (document.visibilityState === 'hidden') {
                        // Page is not visible (e.g., user switched to a different app or browser tab)
                        console.log('Page visibility change detected');
                        showExitIntentPopup();
                    }
                });

                window.addEventListener('popstate', function(event) {
                // Your code to show the popup goes here
                console.log('Back button pressed on Android device');
                // Example: showPopup();
                });
            }

            // Call the detectExitIntent function to start detecting exit intent
            detectExitIntent();
        });
    } else {
        console.log("Not Mobile");
    }
}, 1000);
