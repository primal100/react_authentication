import {clearLocalStorage, getSuccessMessageText, url,} from "../pageObjects";
import { loadUserProfile, loadUserProfileNotLoggedIn } from "../pageObjects/userProfile"
import { getFormValues, getFormIsDisabled, clickEnableEditableFieldButton, fillForm, submitFieldTab, submitFormEnter } from "../pageObjects/forms"


const successMessages = ["Your details have been updated"]
const changeEmailSuccessMessages = ["A verification e-mail has been sent to the newly configured e-mail address. Please click the link in that e-mail to update your e-mail address."]


describe("test user profile view", () => {
    beforeEach(async () => {
        await loadUserProfile();
    });

    afterEach(async () => {
        await clearLocalStorage();
    });

    it("should show the user profile page, correct initial form values and fields disabled", async () => {
        expect(await url()).toBe(URL + "/profile");
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['test', 'user', 'a@a.com']);
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
    });

    it("should enable the first name form field, edit and submit values with tab, and disable the form field", async () => {
        await clickEnableEditableFieldButton('first_name');
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([false, true, true]);
        await fillForm({first_name: 'Jane'}, true);
        await submitFieldTab();
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['Jane', 'user', 'a@a.com']);
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
        expect(await getSuccessMessageText()).toEqual(successMessages);
    });

    it("should enable the last name form field, edit and submit values with enter, simulate first name being modified elsewhere, and disable the form fields", async () => {
        await clickEnableEditableFieldButton('last_name');
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, false, true]);
        await fillForm({last_name: 'Doe'}, true);
        await submitFormEnter();
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['Jane', 'Doe', 'a@a.com']);
        expect(await getSuccessMessageText()).toEqual(successMessages);
    });

    it("should enable the email form field, edit and submit, disable the form field, and show success message", async () => {
        await clickEnableEditableFieldButton('email');
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, false]);
        await fillForm({email: 'a@c.com'}, true);
        await submitFieldTab();
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['test', 'user', 'a@c.com']);
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
        expect(await getSuccessMessageText()).toEqual(changeEmailSuccessMessages);
    });

    it("should submit first name, last name and email fields", async () => {
        await clickEnableEditableFieldButton('first_name');
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([false, true, true]);
        await fillForm({first_name: 'Jane'}, true);
        await submitFieldTab();
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['Jane', 'user', 'a@a.com']);
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
        expect(await getSuccessMessageText()).toEqual(successMessages);
        await clickEnableEditableFieldButton('last_name');
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, false, true]);
        await fillForm({last_name: 'Doe'}, true);
        await submitFormEnter();
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['Jane', 'Doe', 'a@a.com']);
        expect(await getSuccessMessageText()).toEqual(successMessages);
        await clickEnableEditableFieldButton('email');
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, false]);
        await fillForm({email: 'a@c.com'}, true);
        await submitFieldTab();
        expect(await getFormValues(['first_name', 'last_name', 'email'])).toEqual(['Jane', 'Doe', 'a@c.com']);
        expect(await getFormIsDisabled(['first_name', 'last_name', 'email'])).toEqual([true, true, true]);
        expect(await getSuccessMessageText()).toEqual(changeEmailSuccessMessages);
    });
})


describe("test not logged in user profile view", () => {
    beforeEach(async () => {
        await loadUserProfileNotLoggedIn();
    });

    it("should redirect to sign-in page", async () => {
        expect(await url()).toBe(URL + "/sign-in");
    });
});