
Feature('Unit Test Cases');

Scenario('Arrive at homepage and get instructions', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.see('You must login to use the system');
});


Scenario('Forgot password feature', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.click('Sign in');
I.click('Forgot password');
I.see('Reset password');
});

Scenario('Create new account-user already exists', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.fillField('Email', 'aka@test.com');
I.fillField('Password', '123456');
I.click('Create account');
I.see('You must login to use the system');
});

Scenario('Cannot login from the homepage if entered credentials are incorrect', (I) => {
    I.amOnPage('http://localhost:3000/');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.fillField('Email', 'akacheck11@test.com');
I.fillField('Password', '1234561');
I.click('#login-buttons-password');
I.see('You must login to use the system');
I.see('Sign in');
});



Scenario('Can login from the homepage- when a valid user exists with given credentials', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.click('Sign in');
    I.see('Email');
    I.see('Password');
    I.fillField('Email', 'aka@test.com');
    I.fillField('Password', '123456');
    I.click('#login-buttons-password');
    I.seeElement('#placeOrder');

});

Scenario('Place trade', (I) => {
    I.click('Sign in');
 I.see('Email');
 I.see('Password');
 I.fillField('Email', 'aka@test.com'); 
I.fillField('Password', '123456');
 I.click('#login-buttons-password');
I.seeElement('#placeOrder');
I.click('Place Order');
I.see('Parent Trade ID Quantity Side Average Price Execution Status Time');
});


Scenario('Create new account', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.see('Sign in');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.click('Create account');
I.fillField('Email', 'rdvvpem1@test.com');
I.fillField('Password', '1234567');
I.click('#login-buttons-password');
I.seeElement('#placeOrder');
});


Scenario('Logout from the system', (I) => {
    I.amOnPage('http://localhost:3000/');
I.click('#login-buttons');
I.click('#login-buttons-logout');
I.see('You must login to use the system');
});
