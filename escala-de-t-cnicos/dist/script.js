document.addEventListener('DOMContentLoaded', function() {
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const calendar = document.getElementById('calendar');
    const calendarHeader = document.getElementById('calendar-header');
    const employeeForm = document.getElementById('employee-form');
    const dayInput = document.getElementById('day');
    const employees = {};
    const exportButton = document.getElementById('export-button');

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Preencher seleção de meses
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Preencher seleção de anos
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // Função para gerar o calendário
    function generateCalendar() {
        // Atualizar o cabeçalho do calendário
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        calendarHeader.textContent = `${months[month]} ${year}`;

        // Limpar calendário e adicionar cabeçalhos dos dias da semana
        calendar.innerHTML = `
            <div class="day-name">Dom</div>
            <div class="day-name">Seg</div>
            <div class="day-name">Ter</div>
            <div class="day-name">Qua</div>
            <div class="day-name">Qui</div>
            <div class="day-name">Sex</div>
            <div class="day-name">Sáb</div>
        `;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Criar os dias do calendário
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendar.appendChild(emptyCell);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;

            const rmColumn = document.createElement('div');
            rmColumn.classList.add('employee-column');
            const rmHeader = document.createElement('h3');
            rmHeader.textContent = 'RM';
            rmColumn.appendChild(rmHeader);

            const tcColumn = document.createElement('div');
            tcColumn.classList.add('employee-column');
            const tcHeader = document.createElement('h3');
            tcHeader.textContent = 'TC';
            tcColumn.appendChild(tcHeader);

            if (employees[`${year}-${month}-${day}`]) {
                const [rmEmployees, tcEmployees] = employees[`${year}-${month}-${day}`];
                rmEmployees.forEach(employee => {
                    const listItem = document.createElement('div');
                    listItem.textContent = employee;
                    rmColumn.appendChild(listItem);
                });
                tcEmployees.forEach(employee => {
                    const listItem = document.createElement('div');
                    listItem.textContent = employee;
                    tcColumn.appendChild(listItem);
                });
            }

            dayCell.appendChild(rmColumn);
            dayCell.appendChild(tcColumn);
            calendar.appendChild(dayCell);
        }
    }

    // Adicionar evento para alterar o mês e o ano
    monthSelect.addEventListener('change', generateCalendar);
    yearSelect.addEventListener('change', generateCalendar);

    // Submeter o formulário de funcionários
    employeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        const day = parseInt(dayInput.value);
        const key = `${year}-${month}-${day}`;
        employees[key] = [
            [
                document.getElementById('employee1').value,
                document.getElementById('employee2').value,
                document.getElementById('employee3').value
            ],
            [
                document.getElementById('employee4').value,
                document.getElementById('employee5').value
            ]
        ];
        generateCalendar();
        employeeForm.reset();
    });

    // Função para exportar o calendário como JPEG
    exportButton.addEventListener('click', function() {
        html2canvas(calendar.parentNode).then(function(canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'calendario.jpeg';
            link.click();
        });
    });

    // Inicializar calendário
    generateCalendar();
});