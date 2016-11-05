
Feature('Locked out if logged out');

Scenario('arrive at homepage and get instructions', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.see('You must login to use the system');
    I.see('Sign in');
});

Scenario('can login from the homepage', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.click('Sign in');
    I.see('Email');
    I.see('Password');
    I.fillField('Email', 'user@test.com');
    I.fillField('Password', '123456');
    I.click('#login-buttons-password');
    I.seeElement({id: 'placeOrder'});

});