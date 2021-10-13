"use strict";

/**
 active menu point
**/
function setActiveMenuItem() {
	let current = location.pathname.split('/').reverse()[0];
	if (current === "") current = 'index.html';
	else {
		current = current.split('-')[0];
	}
	let menuItems = document.querySelectorAll('.menu__list a');
	for (let i = 0, len = menuItems.length; i < len; i++) {
		if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
			menuItems[i].closest('.menu__item').children[0].className += " active";
		}
	}
};

/**
 dialogs & menu
**/
document.addEventListener('DOMContentLoaded', function(){
	setActiveMenuItem();
	//big menu
	const menu = document.getElementById("dilator");
	const menuTrigger = document.querySelector(".menu__trigger");

	 menuTrigger.addEventListener("click", function() {
		menu.classList.toggle("open");
	 });

	//all dialogs
	 window.addEventListener('click', function(e) {
		if (e.target.classList.contains('submenu__trigger')) {
			e.preventDefault();
			const allDialogs = document.querySelectorAll('.shown');
			const needDialog = e.target.nextElementSibling;
			const showns = [...allDialogs].filter(item => item !== needDialog);
			[...showns].forEach(item => {
				item.classList.remove('shown');
			});
			needDialog.classList.toggle("shown")
			window.navigator.vibrate(30);
		}
		else if (!e.target.closest('.shown')){
			const dialogs = document.querySelectorAll(".dialog");
			Array.from(dialogs).forEach(item => {
				item.classList.remove('shown');
			});
		};

		if (e.target.classList.contains('dialog__link')) {
			e.target.closest(".dialog").classList.remove("shown");
		};
		if (e.target.classList.contains('btn--close')) {
			e.target.closest('.board__message').remove();
			window.navigator.vibrate(30);
		};
	 });

	/**
		 sorting (grid | lines)
	**/
	const sorting = document.querySelector('.sort__grid');

	if (sorting) {
		sorting.addEventListener('click', function(e) {
			const items = sorting.querySelectorAll('.btn');
			const target = e.target;
			[...items].forEach(item => {
				item.classList.remove('active');
			})
			target.classList.toggle('active');

			if (target.classList.contains('grid-trigger')) {
				target.closest('.board--lg').classList.add("board--grid");
			} else {
				target.closest('.board--lg').classList.remove("board--grid");
			}
		});
	};

	/**
		 temp link
	**/
	const tempLink = function () {
		[].forEach.call(
			document.querySelectorAll("[data-link]"),
			function (el) {
				el.addEventListener("click", function (e) {
					e.preventDefault();
					window.location.href = this.getAttribute('data-link');
				});
			});
		};
	tempLink();

	/**
		 checkboxes
	**/
	const checkboxMain = document.getElementById('checkbox-general');
	const checkboxes = document.querySelectorAll('.checkbox');

	if (checkboxMain) {
		checkboxMain.addEventListener('change', function(e) {
			for (let i=0; i < checkboxes.length; i++){
				if (e.target.checked) {
					checkboxes[i].checked = true;
				} else {
					checkboxes[i].checked = false;
				}
			}
		});
	};

	const form = document.querySelector('.sort');
	if (form) {
		form.addEventListener('change', function(e) {
			if (Array.from(checkboxes).every(elem => elem.checked)) {
				checkboxMain.checked = true;
			} else {checkboxMain.checked = false;}
		});
	};

	/**
		 Search fraction (temp solution)
	**/
	const search = document.getElementById('searchBtn');
	if (search) {
		search.addEventListener('click', function(e) {
			const searchField = e.target.previousElementSibling;
			const planDetails = document.querySelector('.plan__sidelong');
			const argums = document.querySelector('.plan__arguments');
			if (searchField.value.length >= 4) {
				planDetails.removeAttribute('hidden');
				argums.setAttribute('hidden','');
				e.preventDefault();
			}
		});
	};

	const showAddWindow = document.querySelectorAll("[data-show]");
	if (showAddWindow) {
		[].forEach.call(
			showAddWindow, function (el) {
				el.addEventListener("click", function (e) {
					e.preventDefault();
					const parentBox = this.parentElement;
					let id = this.getAttribute("data-show");
					let comingContent = document.getElementById(id);
					parentBox.setAttribute('hidden','');
					comingContent.removeAttribute('hidden');
				});
			}
		);
	};


	/**
		tabs inside the drawer (modal)
	**/
	const modalSwitcher = function () {
		[].forEach.call(
			document.querySelectorAll("[data-trigger-modal]"),
			function (el) {
				el.addEventListener("click", function (e) {
					let id = this.getAttribute("data-trigger-modal"),
						 comingTab = document.getElementById(id),
						 parent = comingTab.parentElement,
						 siblingsTab = parent.children,
						 currentTab = parent.querySelector('[data-tab="active"]');

					[...siblingsTab].forEach((sibling) => {
						if (sibling !== comingTab) {
							sibling.setAttribute("data-tab", "hidden");
						}
					});
					comingTab.setAttribute("data-tab", "active");

					if (this.getAttribute('type') === "reset" && currentTab) {
						let filled = currentTab.querySelectorAll(".form-field");
						let btn = currentTab.querySelector('[type=submit]');
						[...filled].forEach((f) => {
							f.classList.remove("filled");
						});
						btn.classList.add("btn--disabled");

						let fileInp = currentTab.querySelector('[type=file]');
						if (fileInp) {
							let label = fileInp.nextElementSibling,
								 span = label.querySelector('span'),
								 defaultText = span.getAttribute('data-text');
								 span.innerHTML = defaultText;
						}
					}
				});
			}
		);
	};
	modalSwitcher();

	/**
		tabs ordinary
	**/
	const tabSwitcher = function () {
		[].forEach.call(
			document.querySelectorAll("[data-trigger-tab]"),
			function (el) {
				el.addEventListener("click", function (e) {
					let id = this.getAttribute("data-trigger-tab"),
						 comingTab = document.getElementById(id),
						 parent = comingTab.closest('.tabs-content'),
						 currentTab = parent.querySelector('[data-tab="active"]');

					currentTab?.setAttribute("data-tab", "hidden");
					comingTab.setAttribute("data-tab", "active");
					if (this.classList.contains('selector--tab')){
						let othersTabs = this.closest('.tabs').querySelectorAll('.selector');
						[...othersTabs].forEach(item => {
							item.classList.remove('checked');
						});
						this.classList.add('checked');
					}
					if (this.getAttribute('data-counter')) {
						let step = document.querySelector('.step__current');
						let val = this.getAttribute('data-counter');
						step.innerHTML = val;
					}
				});
			}
		);
	};
	tabSwitcher();

	/**
		accordions
	**/
	const accordionOpen = function () {
		[].forEach.call(
			document.querySelectorAll("[data-collapse]"),
			function (el) {
				el.addEventListener("click", function (e) {
					e.preventDefault();
					let currentItem = this.closest(".accordion__item");
					let siblings = currentItem.parentElement.children;
					[...siblings].forEach((sibling) => {
						if (sibling !== currentItem) {
							sibling.classList.remove("expanded");
						}
					});
					currentItem.classList.toggle("expanded");
				});
			}
		);
	};
	accordionOpen();

	/**
		custom placeholder
	**/
	(function customPlaceholder() {
		function getInputFields() {
			let inputFields = document.getElementsByClassName("form-input");
			return [...inputFields];
		};

		function checkLabel() {
			let fieldParent = this.parentElement;
			if (this.value.length !== 0) {
				fieldParent.classList.add("filled");
			} else {
				fieldParent.classList.remove("filled");
			}
		};

		function focusLabel() {
			this.parentElement.classList.add("filled");
		};

		getInputFields().forEach(function (el) {
			el.addEventListener("focus", focusLabel);
			el.addEventListener("blur", checkLabel);
		});
	})();

	let formsChanged = document.querySelectorAll('.drawer__form');
	if (formsChanged){
		[...formsChanged].forEach(function(el){
			el.addEventListener("keyup",function(){
				let inputs = el.querySelectorAll('[required]');
				let btn = el.querySelector('[type=submit]');

				let allValid = true;
				if (!el.classList.contains('pay')) {
					[...inputs].forEach((inp) => {
						if (inp.value.length < 2){  // && inp.value.trim() !== ""
							allValid = false;
						}
					});
					if (!allValid){
						btn.classList.add("btn--disabled");
					} else {
						btn.classList.remove("btn--disabled");
					}
				}
			});
		});
	};
});