"use strict";

function setActiveMenuItem() {
	var current = location.pathname.split('/')[1];
	if (current === "") return;
	else {
		current = current.split('-')[0].split('.')[0] + '.html'
	}
	var menuItems = document.querySelectorAll('.menu__list a');
	for (var i = 0, len = menuItems.length; i < len; i++) {
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
		// this.classList.toggle("clicked");
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
			e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		};
	 });

	 //sorting (grid | lines)
	const sorting = document.querySelector('.sort__grid');

	if (sorting) {
		sorting.addEventListener('click', function(e) {
			const items = document.querySelectorAll('.btn');
			const target = e.target;
			[...items].forEach(item => {
				item.classList.remove('active');
			})
			target.classList.toggle('active');

			if (target.classList.contains('grid-trigger')) {
				target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("board--grid");
			} else {
				target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove("board--grid");
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

});