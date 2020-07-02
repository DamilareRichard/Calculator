class Calculator{
	constructor(prevOperandandTextElement, curOperandandTextElement) {
		this.prevOperandandTextElement = prevOperandandTextElement
		this.curOperandandTextElement = curOperandandTextElement
		this.clear()
	}

	clear() {
		this.curOperand = ''
		this.prevOperand = ''
		this.operation = undefined

	}
	delete() {
		this.curOperand = this.curOperand.toString().slice(0, -1)

	}
	appendNumber(number) {
		if (number === '.' && this.curOperand.includes('.')) return
		this.curOperand = this.curOperand.toString() + number.toString()

	}
	chooseOperation(operation) {
		if(this.curOperand === '') return
		if(this.prevOperand !== '') {
			this.compute()
		}
		this.operation = operation 
		this.prevOperand = this.curOperand
		this.curOperand = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.prevOperand)
		const cur = parseFloat(this.curOperand)
		if (isNaN(prev) || isNaN(cur)) return
		switch (this.operation) {
			case '+':
			computation = prev + cur
			break
			case '-':
			computation = prev - cur
			break
			case '*':
			computation = prev * cur
			break
			case '/':
			computation = prev / cur
			break
			default:
				return

		}
		this.curOperand = computation
		this.operation = undefined
		this.prevOperand = ''

	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		const floatNumber = parseFloat(number)
		let integerDisplay
		 if (isNaN(integerDigits)) {
		 	integerDisplay = ''
		 } else {
		 	integerDisplay = integerDigits.toLocaleString('en', { 
		 	maximumFraction: 0 })
		 		
		 	
		 }
		 if (decimalDigits != null) {
		 	return `${integerDisplay}.${decimalDigits}`
		 } else {
		 	return integerDisplay
		 }
	} 
	updateDisplay() {
		this.curOperandandTextElement.innerText = 
		this.getDisplayNumber(this.curOperand)
		if( this.operation != null) {
		this.prevOperandandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
		}  else{
			this.prevOperandandTextElement.innerText = ''
		}
		

	}
}


const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const equalBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-clear]')
const prevOperandandTextElement = document.querySelector('[data-prev-operand]')
const curOperandandTextElement = document.querySelector('[data-cur-operand]')


const calculator = new Calculator(prevOperandandTextElement, curOperandandTextElement)

numberBtn.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationBtn.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalBtn.addEventListener('click', button => {
	calculator.compute()
	calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})





