
Feature('Unit Test Cases');

Scenario('arrive at homepage and get instructions', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.see('You must login to use the system');
});


Scenario('Forgot password feature', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.see('Sign in');
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



Scenario('Create new account', (I) => {
    I.amOnPage('http://localhost:3000/');
I.see('You must login to use the system');
I.see('Sign in');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.click('Create account');
I.fillField('Email', 'aka11511@test.com');
I.fillField('Password', '123456');
I.click('Create account');
I.seeElement({id: 'placeOrder'});
});



Scenario('cannot login from the homepage if entered credentials are incorrect', (I) => {
    I.amOnPage('http://localhost:3000/');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.fillField('Email', 'aka11@test.com');
I.fillField('Password', '1234561');
I.click('#login-buttons-password');
I.see('You must login to use the system');
I.see('Sign in');

});

Scenario('can login from the homepage- when a valid user exists with given credentials', (I) => {
    I.amOnPage('http://localhost:3000/');
    I.click('Sign in');
    I.see('Email');
    I.see('Password');
    I.fillField('Email', 'aka@test.com');
    I.fillField('Password', '123456');
    I.click('#login-buttons-password');
    I.seeElement({id: 'placeOrder'});

});

Scenario('Place trade', (I) => {
    I.amOnPage('http://localhost:3000/');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.fillField('Email', 'aka@test.com');
I.fillField('Password', '123456');
I.click('#login-buttons-password');
I.seeElement({id: 'placeOrder'});
I.click({id: 'placeOrder'});
I.click({id: 'sell_button'});
I.see('Parent Trade ID Quantity Side Average Price Execution Status Time');
});






Scenario('Logout from the system', (I) => {
    I.amOnPage('http://localhost:3000/');
I.amOnPage('http://localhost:3000/');
I.click('Sign in');
I.see('Email');
I.see('Password');
I.fillField('Email', 'aka@test.com');
I.fillField('Password', '123456');
I.click('#login-buttons-password');
I.click('#login-dropdown-list');

});
