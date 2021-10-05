"use strict";
document.addEventListener('DOMContentLoaded', function(){
	const drawer = function () {
		// Trap Focus
		function trapFocus(element) {
			const focusableEls = element.querySelectorAll(
				'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
			);
			let firstFocusableEl = focusableEls[0];
			let lastFocusableEl = focusableEls[focusableEls.length - 1];
			const KEYCODE_TAB = 9;

			element.addEventListener("keydown", function (e) {
				var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

				if (!isTabPressed) {
					return;
				}
				if (e.shiftKey) {
					if (
						/* shift + tab */
						document.activeElement === firstFocusableEl
					) {
						lastFocusableEl.focus();
						e.preventDefault();
					}
				} else {
					/* tab */
					if (document.activeElement === lastFocusableEl) {
						firstFocusableEl.focus();
						e.preventDefault();
					}
				}
			});
		};

		const settings = {
			speedOpen: 50,
			speedClose: 350,
			activeClass: "is-active",
			visibleClass: "is-visible",
			selectorTarget: "[data-drawer-target]",
			selectorTrigger: "[data-drawer-trigger]",
			selectorClose: "[data-drawer-close]",
		};

		// Methods
		// Toggle accessibility
		let toggleAccessibility = function (event) {
			if (event.getAttribute("aria-expanded") === "true") {
				event.setAttribute("aria-expanded", false);
			} else {
				event.setAttribute("aria-expanded", true);
			}
		};

		// Open Drawer
		let openDrawer = function (trigger) {
			// Find target
			let target = document.getElementById(trigger.getAttribute("aria-controls"));

			// Make it active
			target.classList.add(settings.activeClass);

			if (document.body.scrollHeight !== window.innerHeight){
				document.body.classList.add("open-modal");
			}

			// Toggle accessibility
			toggleAccessibility(trigger);

			// Make it visible
			setTimeout(function () {
				target.classList.add(settings.visibleClass);
				trapFocus(target);
			}, settings.speedOpen);
		};

		// Close Drawer
		let closeDrawer = function (event) {
			// Find target
			var closestParent = event.closest(settings.selectorTarget),
				childrenTrigger = document.querySelector(
					'[aria-controls="' + closestParent.id + '"'
				);

			// Make it not visible
			closestParent.classList.remove(settings.visibleClass);

			// Remove body overflow hidden

			document.body.classList.remove("open-modal");

			// Toggle accessibility
			toggleAccessibility(childrenTrigger);

			// Make it not active
			setTimeout(function () {
				closestParent.classList.remove(settings.activeClass);
			}, settings.speedClose);
		};

		// Click Handler
		let clickHandler = function (event) {
			let toggle = event.target,
				 open = toggle.closest(settings.selectorTrigger),
				 close = toggle.closest(settings.selectorClose),
				 tabTarget = document.getElementById(toggle.getAttribute("data-tab-open"));

			if (open) {
				openDrawer(open);
				if (tabTarget) {
					tabTarget.setAttribute("data-tab", "active");
				}
				event.preventDefault();
				window.navigator.vibrate(30);
			}
			if (close) {
				closeDrawer(close);
				let activeTabs = document.querySelectorAll('.drawer__fieldset [data-tab=active]');
				let fields = document.querySelectorAll('.drawer__form .filled');
				[...activeTabs].forEach((all) => {
					all.setAttribute("data-tab", "hidden");
				});
				if (fields) {
					[...fields].forEach((all) => {
						all.classList.remove("filled");
					});
				}
				let forms = document.querySelectorAll(".drawer__form");
				if (forms) {
					[...forms].forEach((form) => {
						form.reset();
						let btn = form.querySelector('.drawer__footer [type=submit]');
						btn?.classList.add('btn--disabled');
					});
				}
				window.navigator.vibrate(30);
			}
		};

		// Keydown Handler, handle Escape button
		let keydownHandler = function (event) {
			if (event.key === "Escape" || event.keyCode === 27) {
				// Find all possible drawers
				var drawers = document.querySelectorAll(settings.selectorTarget),
					i;

				// Find active drawers and close them when escape is clicked
				for (i = 0; i < drawers.length; ++i) {
					if (drawers[i].classList.contains(settings.activeClass)) {
						closeDrawer(drawers[i]);
					}
				}
			}
		};

		// Inits & Event Listeners
		document.addEventListener("click", clickHandler, false);
		document.addEventListener("keydown", keydownHandler, false);
	};
	drawer();
});