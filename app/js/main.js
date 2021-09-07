"use strict";

function setActiveMenuItem() {
	let current = location.pathname.split('/')[1];
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
			e.target.nextElementSibling.classList.toggle("shown");
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
		};
	 });

	 //sorting (grid | lines)
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

	// checkboxes
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
					// const index = [...el.parentElement.children].indexOf(el)
					const parentBox = this.parentElement;
					let id = this.getAttribute("data-show");
					let comingContent = document.getElementById(id);
					parentBox.setAttribute('hidden','');
					comingContent.removeAttribute('hidden');

					// console.log(index);
				});
			}
		);
	}

	// modal(tabs) inside the drawer
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
					}
				});
			}
		);
	};
	modalSwitcher();

	// tabs
	const tabSwitcher = function () {
		[].forEach.call(
			document.querySelectorAll("[data-trigger-tab]"),
			function (el) {
				el.addEventListener("click", function (e) {
					let id = this.getAttribute("data-trigger-tab"),
						 comingTab = document.getElementById(id),
						 parent = comingTab.closest('.tabs'),
						 currentTab = parent.querySelector('[data-tab="active"]');

					currentTab.setAttribute("data-tab", "hidden");
					comingTab.setAttribute("data-tab", "active");
					if (this.classList.contains('selector--tab')){
						let othersTabs = this.closest('.plan__tabs').querySelectorAll('.selector');
						[...othersTabs].forEach(item => {
							item.classList.remove('checked');
						});
						this.classList.add('checked');
					}
				});
			}
		);
	};
	tabSwitcher();

	// accordion
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
});