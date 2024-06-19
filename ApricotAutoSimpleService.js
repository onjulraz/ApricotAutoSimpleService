// ==UserScript==
// @name         Auto-fill Attendance Data
// @namespace    http://onjulraz.me
// @version      0.1
// @description  Auto-select dropdown options for attendance data entry
// @author       onjulraz
// @match        *://apricot.socialsolutions.com/document/edit/form_id/155/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function createCustomEvent(type) {
        const event = document.createEvent('Event');
        event.initEvent(type, true, true);
        return event;
    }

    async function setDropdownValue(selector, value) {
        const element = document.querySelector(selector);
        if (element) {
            const option = Array.from(element.options).find(opt => opt.text === value);
            if (option) {
                element.value = option.value;
                const inputEvent = createCustomEvent('input');
                const changeEvent = createCustomEvent('change');
                element.dispatchEvent(inputEvent);
                element.dispatchEvent(changeEvent);
                console.log(`Set ${selector} to ${value}`);
                await delay(2000); // Wait for the change to be processed
            } else {
                console.error(`Option ${value} not found for ${selector}`);
            }
        } else {
            console.error(`Element ${selector} not found`);
        }
    }

    async function autoFillForm() {
        await setDropdownValue('#field_3803', 'Office Visit / Walk-in');
        //await delay(2000);

        await setDropdownValue('#field_3797', 'Education and training');
        //await delay(500);

        await setDropdownValue('#field_3798', 'Secondary Education');
        //await delay(500);

        await setDropdownValue('#field_3801', 'ABE classes - Adult');
        //await delay(2000);

        await setDropdownValue('#field_3805', '60');
    }

    window.addEventListener('load', autoFillForm);
})();