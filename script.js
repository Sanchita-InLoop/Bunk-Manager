const subjectNameInput = document.getElementById('subject-name');
const targetInput = document.getElementById('target-percent');
const attendedInput = document.getElementById('attended-count');
const totalInput = document.getElementById('total-count');
const addBtn = document.getElementById('add-btn');
const subjectList = document.getElementById('subject-list');

let subjects = JSON.parse(localStorage.getItem('bunkManagerData')) || [];

function renderSubjects() {
    subjectList.innerHTML = '';

    subjects.forEach((subject, index) => {
        
        const target = subject.minPercentage || 75; 

        const percentage = (subject.attended / subject.total) * 100;
        
        const result = calculateStatus(subject.attended, subject.total, target);
        
        const card = document.createElement('div');
        card.classList.add('card');
        
        if(result.isSafe) {
            card.classList.add('safe');
        } else {
            card.classList.add('danger');
        }

        card.innerHTML = `
            <div class="card-info">
                <h3>${subject.name} <span style="font-size:0.8em; opacity:0.7">(Target: ${target}%)</span></h3>
                <p>
                    ${subject.attended} / ${subject.total} 
                    <span style="margin-left:10px; color:${result.isSafe ? 'var(--success-green)' : 'var(--danger-red)'}">
                        (${percentage.toFixed(1)}%)
                    </span>
                </p>
                <div class="status-text ${result.isSafe ? 'safe' : 'danger'}">
                    ${result.message}
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="btn-attend" onclick="updateAttendance(${index}, 1)">Attended</button>
                <button class="btn-bunk" onclick="updateAttendance(${index}, 0)">Bunked</button>
                <button class="btn-delete" onclick="deleteSubject(${index})" title="Delete Subject">✕</button>
            </div>
        `;
        
        subjectList.appendChild(card);
    });
}

function calculateStatus(attended, total, target) {
    const threshold = target / 100; // Convert 75 to 0.75
    
    if (total === 0) return { isSafe: true, message: "Class hasn't started yet." };

    const currentPct = attended / total;

    if (currentPct >= threshold) {
        
        let bunkable = Math.floor((attended / threshold) - total);
        
        return { 
            isSafe: true, 
            message: `You can bunk ${bunkable} classes safely.` 
        };
    } else {
        let need = Math.ceil(((threshold * total) - attended) / (1 - threshold));
        
        return { 
            isSafe: false, 
            message: `Attend next ${need} classes to hit ${target}%.` 
        };
    }
}

addBtn.addEventListener('click', () => {
    const name = subjectNameInput.value;
    const attended = parseInt(attendedInput.value);
    const total = parseInt(totalInput.value);
    
    let target = parseInt(targetInput.value);
    if (isNaN(target)) target = 75;

    if (name && !isNaN(attended) && !isNaN(total)) {
        subjects.push({ 
            name, 
            attended, 
            total,
            minPercentage: target // <--- STORE THIS
        });
        
        saveAndRender();
        
        subjectNameInput.value = '';
        attendedInput.value = '';
        totalInput.value = '';
    
    } else {
        alert('Please fill in all fields correctly.');
    }
});

window.updateAttendance = function(index, type) {
    if (type === 1) {
        subjects[index].attended++;
        subjects[index].total++;
    } else {
        subjects[index].total++;
    }
    saveAndRender();
}

window.deleteSubject = function(index) {
    subjects.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('bunkManagerData', JSON.stringify(subjects));
    renderSubjects();
}
renderSubjects();