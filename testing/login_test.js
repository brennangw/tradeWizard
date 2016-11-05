
Feature('Locked out if logged out');

Scenario('arrive at homepage and get instructions', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.see('You must login to use the system');
    I.see('Sign in');
});