function updateSeats() {
    const n = parseInt(document.getElementById('n').value);
    const seatsContainer = document.getElementById('seatsContainer');
    
    seatsContainer.innerHTML = '';

    // Create input for each seat state
    for (let i = 0; i < n; i++) {
        const seatGroup = document.createElement('div');
        seatGroup.className = 'form-group';
        
        const seatLabel = document.createElement('label');
        seatLabel.htmlFor = `seat-${i}`;
        seatLabel.innerText = `Seat ${i + 1} state`;

        const seatInput = document.createElement('input');
        seatInput.type = 'number';
        seatInput.id = `seat-${i}`;
        seatInput.min = '0';
        seatInput.placeholder = '0 for unpainted';
        seatInput.required = true;

        seatGroup.appendChild(seatLabel);
        seatGroup.appendChild(seatInput);
        seatsContainer.appendChild(seatGroup);
    }

    updateColors();  // Call to update costs based on the number of colors
}

function updateColors() {
    const n = parseInt(document.getElementById('n').value);
    const m = parseInt(document.getElementById('m').value);
    const seatsContainer = document.getElementById('seatsContainer');

    // Remove previous cost inputs if they exist
    const costInputs = document.querySelectorAll('.color-cost');
    costInputs.forEach(input => input.remove());

    // Create input for each seat's paint cost based on the number of colors
    for (let i = 0; i < n; i++) {
        const seatGroup = document.querySelector(`#seat-${i}`).parentElement;

        const colorGroup = document.createElement('div');
        colorGroup.className = 'color-group';

        for (let j = 0; j < m; j++) {
            const costLabel = document.createElement('label');
            costLabel.htmlFor = `cost-${i}-${j}`;
            costLabel.innerText = `Color ${j + 1}`;
            costLabel.className = 'color-cost';

            const costInput = document.createElement('input');
            costInput.type = 'number';
            costInput.id = `cost-${i}-${j}`;
            costInput.placeholder = `Cost for color ${j + 1}`;
            costInput.required = true;
            costInput.className = 'color-cost';

            colorGroup.appendChild(costLabel);
            colorGroup.appendChild(costInput);
        }
        seatGroup.appendChild(colorGroup);
    }
}

function calculatePaint() {
    const k = parseInt(document.getElementById('k').value);  
    const n = parseInt(document.getElementById('n').value); 
    const m = parseInt(document.getElementById('m').value); 

    const seats = [];
    for (let i = 0; i < n; i++) {
        seats.push(parseInt(document.getElementById(`seat-${i}`).value) || 0);
    }

    const costs = [];
    for (let i = 0; i < n; i++) {
        const seatCosts = [];
        for (let j = 0; j < m; j++) {
            seatCosts.push(parseInt(document.getElementById(`cost-${i}-${j}`).value) || 0);
        }
        costs.push(seatCosts);
    }

    const input = `${n} ${m} ${k}\n${seats.join(' ')}\n` + costs.map(row => row.join(' ')).join('\n');

    const result = main(input);

    const outputElement = document.getElementById('output');
    outputElement.innerHTML = `Result: ${result}`;
    document.getElementById('result').style.display = 'block';
}


