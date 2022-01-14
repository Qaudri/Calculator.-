class Calculator{
    constructor(previousInputTextElement, currentInputTextElement){
        this.previousInputTextField = previousInputTextElement
        this.currentInputTextField = currentInputTextElement
        this.clear()
    }

    clear() {
        this.previousInputValue = ''
        this.currentInputValue = ''
        this.operation = ''
    }

    appendNumber(number) {
        this.currentInputValue = this.currentInputValue.toString() + number.toString()
    }

    deleteNumber() {
        this.currentInputValue = this.currentInputValue.toString().slice(0,-1)
    }

    chooseOperation(operation) {
        if (this.currentInputValue === '') return
        if (this.previousInputValue !== '') {
            
            this.compute()
        }

        this.operation = operation
        this.previousInputValue = this.currentInputValue
        this.currentInputValue = ''
    }

    compute() {
        let computation

        const prev = parseFloat(this.previousInputValue)
        const current = parseFloat(this.currentInputValue)

        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
        
            case '-':
                computation = prev - current
                break;

            case '*':
                computation = prev * current
                break;

            case '/':
                computation = prev / current
                break;


            default:
                return;
        }

        this.currentInputValue = computation
        this.operation = undefined
        this.previousInputValue = ''
    }

    setDisplay(){
        this.currentInputTextField.innerText = this.currentInputValue
        this.previousInputTextField.innerText = this.previousInputValue
    }
}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousInputTextElement = document.querySelector('[data-previous-input]');
const currentInputTextElement = document.querySelector('[data-current-input]');

const simpleCalc = new Calculator(previousInputTextElement,currentInputTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        simpleCalc.appendNumber(button.innerText)
        simpleCalc.setDisplay()
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        simpleCalc.chooseOperation(button.innerText)
        simpleCalc.setDisplay()
    })
});

deleteButton.addEventListener('click', ()=>{
    simpleCalc.deleteNumber()
    simpleCalc.setDisplay()
});

allClearButton.addEventListener('click', ()=>{
    simpleCalc.clear()
    simpleCalc.setDisplay()
});

equalsButton.addEventListener('click', ()=>{
    simpleCalc.compute()
    simpleCalc.setDisplay()
});

