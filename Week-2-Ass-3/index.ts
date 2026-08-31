interface AccountInterface {
    customerId: number
    customerName: string
    accountNumber: number
    currentBalance: number
}

// SAVINGS ACCOUNT
class SavingsAccount {

    acct: AccountInterface

    constructor (acct: AccountInterface) {
        this.acct = acct;
    }

    checkBalance() {
        console.log("YOUR BALANCE IS: ", this.acct.currentBalance);

        return this.acct.currentBalance;
    }

    deposit(amount: number) {
        if (amount > 0) {
            const newBalance: number = this.acct.currentBalance + (amount + (0.05 * amount));
            this.acct.currentBalance = newBalance;
            console.log(`AMOUNT DEPOSITED: ${amount}.\nCURRENT BALANCE: ${this.acct.currentBalance}`);
        } else {
            console.log("Deposit amount must be more than zero!");
        }
    }

    withdrawal(amount: number) {
        if (amount <= this.acct.currentBalance) {
            const newBalance: number = this.acct.currentBalance - amount;
            this.acct.currentBalance = newBalance;
            console.log(`AMOUNT WITHDRAWN: ${amount}.\nCURRENT BALANCE: ${this.acct.currentBalance}`);
        } else if (amount === 0 || !amount) {
            console.log("Enter a valid amount!")
        } else {
            console.log("Insufficient Balance!");
        }
    }

    displayAcct() {
        console.log(`
            CUSTOMER ID: ${this.acct.customerId}\n
            CUSTOMER NAME: ${this.acct.customerName}\n
            ACCOUNT NUMBER: ${this.acct.accountNumber}\n
            CURRENT BALANCE: ${this.acct.currentBalance}\n`);
    }
}

const customer1 = new SavingsAccount({
    customerId: 1,
    customerName: "JJ",
    accountNumber: 543210,
    currentBalance: 25000
});

//customer1.deposit(40000);
//customer1.checkBalance();
//customer1.withdrawal(25001);
//customer1.displayAcct();


// BUSINESS ACCOUNT
class BusinessAccount extends SavingsAccount {

    constructor (acct: AccountInterface) {
        super(acct);
    }

    override deposit(amount: number) {
        if (amount > 0) {
            const newBal = this.acct.currentBalance + amount;
            this.acct.currentBalance = newBal;
            console.log(`AMOUNT DEPOSITED: ${amount}\nNEW BALANCE: ${this.acct.currentBalance}`);
        } else {
            console.log("Amount must be above zero. Try again!");
        }
    }

    override withdrawal(amount: number) {
        if (amount <= 0) {
            console.log("Amount must be a valid number greater than zero!");
        } else {
            const totalDeductable = amount + 500;
            if (this.acct.currentBalance >= totalDeductable) {
                const newBal = this.acct.currentBalance - totalDeductable;
                this.acct.currentBalance = newBal;
                console.log(`AMOUNT WITHDRAWN: ${amount}.\nFEE: 500\nCURRENT BALANCE: ${this.acct.currentBalance}`);
            } else {
                console.log("Transaction Unsuccessful. Insufficient Balance!");
            }
        }
    }
}

const customer2 = new BusinessAccount({
    customerId: 2,
    customerName: "Peter",
    accountNumber: 12345,
    currentBalance: 1500000
});

// customer2.displayAcct();
// customer2.deposit(500000);
// customer2.withdrawal(950000);

class PremiumAccount extends BusinessAccount {

    constructor (acct: AccountInterface) {
        super(acct);
    }

    override withdrawal(amount: number) {
        if (amount <= 0) {
            console.log("Amount must be a valid number greater than zero!");
        } else {
            if (amount > 500000) {
                const processingFee = amount * 0.02;
                const totalDeductable = amount + processingFee;
                if (totalDeductable > this.acct.currentBalance) {
                    console.log("Transaction Unsuccessful! Insufficient Balance.")
                } else {
                    const newBal = this.acct.currentBalance - totalDeductable;
                    this.acct.currentBalance = newBal;
                    console.log(`AMOUNT WITHDRAWN: ${amount}.\nPROCESSING FEE: ${processingFee}\nCURRENT BALANCE: ${this.acct.currentBalance}`);
                }
            } else {
                if (amount > this.acct.currentBalance) {
                    console.log("Transaction Unsuccessful! Insufficient Balance.")
                } else {
                    const newBalance = this.acct.currentBalance - amount;
                    this.acct.currentBalance = newBalance;
                    console.log(`AMOUNT WITHDRAWN: ${amount}.\nCURRENT BALANCE: ${this.acct.currentBalance}`);
                }
            }
        }
    }
}

const customer3 = new PremiumAccount({
    customerId: 2,
    customerName: "John",
    accountNumber: 98765,
    currentBalance: 50000000
});

// customer3.checkBalance();
// customer3.displayAcct();
// customer3.deposit(0);
// customer3.deposit(1000000);
// customer3.withdrawal(0);
// customer3.withdrawal(250000);
// customer3.withdrawal(500000);
// customer3.withdrawal(500001);
// customer3.withdrawal(15000000);
// customer3.withdrawal(100000000);
