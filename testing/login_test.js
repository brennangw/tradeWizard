
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

Scenario('Forgot password feature-incorrect email id entered', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.click('Sign in');
I.click('Forgot password');
I.see('Reset password');
I.fillField('Email', 'akga@test.com');
I.click('Reset password');
I.see('You must login to use the system');
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
I.click('#placeOrder');
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
I.fillField('Email', '6ggg799hh@test.com');
I.fillField('Password', '1234567');
I.click('#login-buttons-password');
I.seeElement('#placeOrder');
});


Scenario('Logout from the system', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.see('Sign in');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.click('Create account');
I.fillField('Email', 'aka@test.com');
I.fillField('Password', '123456');
I.click('#login-buttons');
I.see('You must login to use the system');
});
