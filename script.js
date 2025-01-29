const btnPay = document.querySelector(".pay");
const btnSell = document.querySelector(".sell");
const btnRead = document.querySelector(".read");

class Account {
    constructor(money) {
        this.money = money;
    }

    pay(sum) {
        if (this.money >= sum) {
            this.money -= sum;
            console.log(this.money);

            const event = new Event("payment");
            document.dispatchEvent(event);
        }
    }

    sell(sum) {
        this.money += sum;
        console.log(this.money);

        const event = new Event("sell");
        document.dispatchEvent(event);
    }

    reading() {
        console.log("Прочитано");

        const event = new Event("read");
        document.dispatchEvent(event);
    }
}

const myAcc = new Account(1000);

document.addEventListener("payment", () => console.log("Перевод выполнен"));
document.addEventListener("read", () => console.log("Статься прочитана"));
document.addEventListener("sell", () => console.log("Продано"));

btnPay.addEventListener("click", () => myAcc.pay(50));
btnRead.addEventListener("click", () => myAcc.reading());
btnSell.addEventListener("click", () => myAcc.sell(50));
