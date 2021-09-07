"use strict";
document.addEventListener('DOMContentLoaded', function(){

	const drawer = function () {
		// Trap Focus
		function trapFocus(element) {
			var focusableEls = element.querySelectorAll(
				'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
			);
			var firstFocusableEl = focusableEls[0];
			var lastFocusableEl = focusableEls[focusableEls.length - 1];
			var KEYCODE_TAB = 9;

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
		}

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
			document.body.classList.add("open-modal");

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
			}
			if (close) {
				closeDrawer(close);
			}
			if (open || close) {
				event.preventDefault();
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


// custom placeholder
	(function customPlaceholder() {
		function getInputFields() {
			let inputFields = document.getElementsByClassName("form-input");
			return [...inputFields];
		}

		function checkLabel() {
			let fieldParent = this.parentElement;
			if (this.value.length !== 0) {
				fieldParent.classList.add("filled");
			} else {
				fieldParent.classList.remove("filled");
			}
		}

		function focusLabel() {
			this.parentElement.classList.add("filled");
		}

		getInputFields().forEach(function (el) {
			el.addEventListener("focus", focusLabel);
			el.addEventListener("blur", checkLabel);
		});
	})();

	let formsChanged = document.querySelector('.drawer__form');
	if (formsChanged){
		[...formsChanged].forEach(function(el){
			el.addEventListener("keyup",function(){
				let inputs = formsChanged.querySelectorAll('.form-input[required]');
				let btn = formsChanged.querySelector('[type=submit]');

				let allValid = true;
				[...inputs].filter((inp) => {
					if (inp.value.trim() === ""){
						allValid = false;
					}
				});
				if (!allValid){
					btn.classList.add("btn--disabled");
				} else {
					btn.classList.remove("btn--disabled");
				}
			});
		});
	};
});