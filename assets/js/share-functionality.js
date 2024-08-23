document.addEventListener('DOMContentLoaded', function() {
                        jQuery(function($) {
                            // Check if the device is a mobile device
                            var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                            var showClickButton = $('.clicktoshow');
                            var closeClickButton = $('.closebutton');

                            showClickButton.click(function() {
                                var currentURL = window.location.href;
                                if (isMobileDevice && navigator.share) {
                                    // Web Share API is supported on mobile devices
                                    navigator.share({
                                        url: currentURL
                                    })
                                    .then(function() {
                                        console.log('Shared successfully via Web Share API');
                                        // Send analytics event if needed
                                        // sendAnalyticsEvent('share', platform);
                                    })
                                    .catch(function(error) {
                                        console.log('Error sharing via Web Share API:', error);
                                    });
                                } else {
                                    showCustomShareButtons();
                                }
                            });

                            closeClickButton.click(function() {
                                $('.showclick').hide();
                            });

                            $('.share-button').click(function(e) {
                                e.preventDefault();
                                var platform = $(this).data('platform');
                                var currentURL = window.location.href;
                                generateShareLink(platform, currentURL);
                            });

                            function isValidURL(url) {
                                var pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
                                return pattern.test(url);
                            }

                            function showCustomShareButtons() {
                                $('.showclick').show();
                                // You can perform additional actions or customizations for showing the custom share buttons
                            }

                            function generateShareLink(platform, currentURL) {
                            if (!isValidURL(currentURL)) {
                                console.log('Invalid URL:', currentURL);
                                return;
                            }

                            var shareURL;

                            switch (platform) {
                                case 'whatsapp':
                                    shareURL = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(currentURL);
                                    break;
                                case 'telegram':
                                    shareURL = 'https://t.me/share/url?url=' + encodeURIComponent(currentURL);
                                    break;
                                case 'linkedin':
                                    shareURL = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(currentURL);
                                    break;
                                case 'facebook':
                                    shareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentURL);
                                    break;
                                case 'twitter':
                                    shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(currentURL);
                                    break;
                                case 'email':
                                    shareURL = 'mailto:?subject=&body=' + encodeURIComponent('Mira está página web: ' + currentURL);
                                    break;
                                /*case 'messenger':
                                    // Use the Facebook SDK to share via Messenger
                                    FB.ui(
                                        {
                                            method: 'send',
                                            link: currentURL
                                        },
                                        function(response) {
                                            if (response && !response.error_code) {
                                                console.log('Shared successfully via Facebook Messenger');
                                                // Send analytics event if needed
                                                // sendAnalyticsEvent('share', platform);
                                            } else {
                                                console.log('Error sharing via Facebook Messenger:', response);
                                            }
                                        }
                                    );
                                    return;*/ // Avoid opening a new window/tab
                                case 'copy':
                                    var tempInput = document.createElement('input');
                                    tempInput.setAttribute('value', currentURL);
                                    document.body.appendChild(tempInput);
                                    tempInput.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(tempInput);
                                    alert('¡Link copiado y listo para compartir!');
                                    return;
                                default:
                                    shareURL = '#';
                            }

                            window.open(shareURL, '_blank');
                        }
                    });
                });