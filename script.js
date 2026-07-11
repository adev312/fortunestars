const state = {
    currentUser: null,
    currentRole: 'student',
    currentChild: 'emma',
    currentClass: 'math-g5-a',
    selectedTab: 'dashboard',
    unsavedChanges: 0,
    messages: {},
    grades: {}
};

// ==================== MOCK DATA ====================
const mockData = {
    students: {
        '2023456': {
            id: '2023456',
            name: 'John Doe',
            grade: 'Grade 5',
            level: 'Upper Primary',
            section: 'A',
            avatar: 'JD',
            subjects: [
                { name: 'Mathematics', teacher: 'Mr. Okello', score: 88, grade: 'Excellent' },
                { name: 'English Language', teacher: 'Mrs. Nakato', score: 92, grade: 'Excellent' },
                { name: 'Integrated Science', teacher: 'Mr. Mugisha', score: 85, grade: 'Good' },
                { name: 'Social Studies', teacher: 'Ms. Auma', score: 78, grade: 'Good' },
                { name: 'Creative Arts', teacher: 'Mr. Ssempija', score: 90, grade: 'Excellent' }
            ]
        },
        '2024001': {
            id: '2024001',
            name: 'Emma Johnson',
            grade: 'Grade 3',
            level: 'Lower Primary',
            section: 'A',
            avatar: 'EJ',
            subjects: [
                { name: 'Literacy (English)', teacher: 'Mrs. Namukasa', score: 94, grade: 'Excellent' },
                { name: 'Numeracy (Math)', teacher: 'Mr. Ochieng', score: 89, grade: 'Excellent' },
                { name: 'Reading', teacher: 'Mrs. Namukasa', score: 92, grade: 'Excellent' },
                { name: 'Environmental Science', teacher: 'Ms. Akello', score: 87, grade: 'Good' },
                { name: 'Creative Arts', teacher: 'Mr. Ssempija', score: 95, grade: 'Excellent' }
            ]
        },
        '2023012': {
            id: '2023012',
            name: 'Lucas Johnson',
            grade: 'Grade 7',
            level: 'Junior Secondary',
            section: 'B',
            avatar: 'LJ',
            subjects: [
                { name: 'Advanced Mathematics', teacher: 'Mr. Okello', score: 82, grade: 'Good' },
                { name: 'English Language', teacher: 'Mrs. Nakato', score: 88, grade: 'Excellent' },
                { name: 'Biology', teacher: 'Ms. Nambi', score: 79, grade: 'Good' },
                { name: 'Chemistry', teacher: 'Mr. Mukasa', score: 76, grade: 'Good' },
                { name: 'Physics', teacher: 'Mr. Kato', score: 74, grade: 'Average' }
            ]
        }
    },
    
    teachers: {
        'TCH001': {
            id: 'TCH001',
            name: 'Mr. Okello',
            subject: 'Mathematics',
            classes: ['math-g3-a', 'math-g5-a', 'math-g8-a']
        }
    },
    
    classes: {
        'math-g3-a': {
            id: 'math-g3-a',
            name: 'Mathematics',
            grade: 'Grade 3',
            level: 'Lower Primary',
            section: 'A',
            students: 32,
            average: 84,
            passing: 94
        },
        'math-g5-a': {
            id: 'math-g5-a',
            name: 'Mathematics',
            grade: 'Grade 5',
            level: 'Upper Primary',
            section: 'A',
            students: 35,
            average: 79,
            passing: 86
        },
        'math-g8-a': {
            id: 'math-g8-a',
            name: 'Advanced Mathematics',
            grade: 'Grade 8',
            level: 'Junior Secondary',
            section: 'A',
            students: 30,
            average: 76,
            passing: 83
        }
    },
    
    assignments: [
        {
            id: 1,
            title: 'Mathematics Worksheet - Fractions',
            subject: 'Mathematics',
            dueDate: '2026-03-20',
            status: 'pending',
            description: 'Complete exercises 1-20 on page 45'
        },
        {
            id: 2,
            title: 'English Essay',
            subject: 'English Language',
            dueDate: '2026-03-18',
            status: 'submitted',
            description: 'Write a 500-word essay on "My Favorite Holiday"'
        },
        {
            id: 3,
            title: 'Science Project',
            subject: 'Integrated Science',
            dueDate: '2026-03-15',
            status: 'graded',
            grade: 85,
            description: 'Create a model of the solar system'
        }
    ],
    
    timetable: {
        'Grade 5': [
            { time: '8:00 - 9:00', monday: 'Mathematics', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'Arts' },
            { time: '9:00 - 10:00', monday: 'English', tuesday: 'Math', wednesday: 'Social Studies', thursday: 'English', friday: 'PE' },
            { time: '10:00 - 10:30', monday: 'Break', tuesday: 'Break', wednesday: 'Break', thursday: 'Break', friday: 'Break' },
            { time: '10:30 - 11:30', monday: 'Science', tuesday: 'Social Studies', wednesday: 'Math', thursday: 'Science', friday: 'English' },
            { time: '11:30 - 12:30', monday: 'Arts', tuesday: 'Science', wednesday: 'English', thursday: 'Social Studies', friday: 'Math' }
        ]
    },
    
    gradebook: {
        'math-g5-a': [
            { id: '2023456', name: 'John Doe', currentScore: 85, newScore: '', letter: 'B', comments: '' },
            { id: '2023001', name: 'Alice Smith', currentScore: 92, newScore: '', letter: 'A', comments: '' },
            { id: '2023002', name: 'Bob Johnson', currentScore: 78, newScore: '', letter: 'C', comments: '' },
            { id: '2023003', name: 'Carol White', currentScore: 88, newScore: '', letter: 'B', comments: '' },
            { id: '2023004', name: 'David Brown', currentScore: 95, newScore: '', letter: 'A', comments: '' }
        ]
    }
};

// ==================== LOGIN FUNCTIONS ====================
function selectRole(role) {
    state.currentRole = role;
    
    // Update UI
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update label
    const label = document.getElementById('idLabel');
    const parentSelect = document.getElementById('parentSelect');
    
    switch(role) {
        case 'student':
            label.textContent = 'Student ID';
            parentSelect.style.display = 'none';
            break;
        case 'parent':
            label.textContent = 'Parent ID';
            parentSelect.style.display = 'block';
            break;
        case 'teacher':
            label.textContent = 'Teacher ID';
            parentSelect.style.display = 'none';
            break;
        case 'admin':
            label.textContent = 'Admin ID';
            parentSelect.style.display = 'none';
            break;
    }
}

function toggleProjectInfo() {
    const intro = document.querySelector('.portfolio-intro');
    const showcase = document.querySelector('.showcase-section');
    const toggleText = document.getElementById('infoToggleText');

    const isHidden = intro.classList.contains('hidden');
    intro.classList.toggle('hidden', !isHidden);
    showcase.classList.toggle('hidden', !isHidden);

    if (toggleText) {
        toggleText.textContent = isHidden ? 'Hide project info' : 'Show project info';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in real app, this would be an API call)
    if (password === 'password' || password === 'admin') {
        // Determine user based on ID prefix or role
        let user;
        
        if (state.currentRole === 'student') {
            user = mockData.students[userId] || mockData.students['2023456'];
        } else if (state.currentRole === 'parent') {
            const childId = document.getElementById('childSelect').value;
            user = mockData.students[childId];
        } else if (state.currentRole === 'teacher') {
            user = { name: 'Mr. Okello', avatar: 'MO', role: 'Teacher', grade: 'Mathematics Dept' };
        } else if (state.currentRole === 'admin') {
            user = { name: 'Admin User', avatar: 'AD', role: 'Administrator', grade: 'System Admin' };
        }
        
        if (user) {
            state.currentUser = user;
            showMainApp();
            showToast('Success', `Welcome back, ${user.name}!`);
        } else {
            showToast('Error', 'Invalid credentials', 'error');
        }
    } else {
        showToast('Error', 'Invalid password', 'error');
    }
}

function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    // Update user info in header
    document.getElementById('userName').textContent = state.currentUser.name;
    document.getElementById('userAvatar').textContent = state.currentUser.avatar;
    document.getElementById('userRole').textContent = state.currentUser.grade + (state.currentUser.level ? ` - ${state.currentUser.level}` : '');
    
    // Show appropriate view based on role
    document.querySelectorAll('.view-section').forEach(view => {
        view.style.display = 'none';
        view.classList.remove('active');
    });
    
    switch(state.currentRole) {
        case 'student':
            document.getElementById('studentView').style.display = 'block';
            document.getElementById('studentView').classList.add('active');
            document.getElementById('portalType').textContent = 'Student Portal';
            initializeStudentView();
            break;
        case 'parent':
            document.getElementById('parentView').style.display = 'block';
            document.getElementById('parentView').classList.add('active');
            document.getElementById('portalType').textContent = 'Parent Portal';
            initializeParentView();
            break;
        case 'teacher':
            document.getElementById('teacherView').style.display = 'block';
            document.getElementById('teacherView').classList.add('active');
            document.getElementById('portalType').textContent = 'Teacher Portal';
            initializeTeacherView();
            break;
        case 'admin':
            document.getElementById('adminView').style.display = 'block';
            document.getElementById('adminView').classList.add('active');
            document.getElementById('portalType').textContent = 'Admin Portal';
            break;
    }
}

function logout() {
    state.currentUser = null;
    state.currentRole = 'student';
    
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    
    // Reset form
    document.getElementById('loginForm').reset();
    document.querySelectorAll('.role-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === 0);
    });
    document.getElementById('parentSelect').style.display = 'none';
    
    showToast('Success', 'Logged out successfully');
}

// ==================== STUDENT VIEW FUNCTIONS ====================
function initializeStudentView() {
    // Set grade banner
    const user = state.currentUser;
    const banner = document.getElementById('studentGradeBanner');
    
    // Update banner colors based on level
    let levelColor, levelName;
    if (user.level === 'Lower Primary') {
        levelColor = 'var(--lower-primary)';
        levelName = 'Lower Primary';
    } else if (user.level === 'Upper Primary') {
        levelColor = 'var(--upper-primary)';
        levelName = 'Upper Primary';
    } else {
        levelColor = 'var(--junior-secondary)';
        levelName = 'Junior Secondary';
    }
    
    banner.style.background = `linear-gradient(135deg, ${levelColor} 0%, ${levelColor}dd 100%)`;
    banner.querySelector('.grade-level').textContent = levelName;
    banner.querySelector('.grade-specific').textContent = `${user.grade} - Section ${user.section}`;
    
    // Populate subjects table
    populateStudentResults();
    
    // Initialize other components
    populateTimetable();
    populateAssignments();
    initializeMessages();
}

function populateStudentResults() {
    const tbody = document.getElementById('studentResultsBody');
    const user = state.currentUser;
    
    if (!user || !user.subjects) return;
    
    tbody.innerHTML = user.subjects.map(subject => `
        <tr>
            <td>${subject.name}</td>
            <td>${subject.teacher}</td>
            <td>${subject.score}%</td>
            <td><span class="grade-badge ${subject.grade.toLowerCase().replace(' ', '-')}">${subject.grade}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${subject.score}%"></div>
                </div>
            </td>
        </tr>
    `).join('');
}

function populateTimetable() {
    const tbody = document.getElementById('timetableBody');
    const user = state.currentUser;
    
    if (!user) return;
    
    const schedule = mockData.timetable[user.grade] || mockData.timetable['Grade 5'];
    
    tbody.innerHTML = schedule.map(slot => `
        <tr>
            <td class="time-slot">${slot.time}</td>
            <td>${slot.monday}</td>
            <td>${slot.tuesday}</td>
            <td>${slot.wednesday}</td>
            <td>${slot.thursday}</td>
            <td>${slot.friday}</td>
        </tr>
    `).join('');
}

function populateAssignments() {
    const container = document.getElementById('assignmentsList');
    
    container.innerHTML = mockData.assignments.map(assignment => {
        const statusClass = assignment.status;
        const statusText = assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1);
        
        return `
            <div class="assignment-card ${statusClass}">
                <div class="assignment-info">
                    <h4>${assignment.title}</h4>
                    <div class="assignment-meta">${assignment.subject} • Due: ${assignment.dueDate}</div>
                    <div style="font-size: 0.85rem; color: var(--gray-600); margin-top: 4px;">${assignment.description}</div>
                </div>
                <div class="assignment-status ${statusClass}">${statusText}${assignment.grade ? ` (${assignment.grade}%)` : ''}</div>
            </div>
        `;
    }).join('');
}

function filterAssignments(filter) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter assignments
    const container = document.getElementById('assignmentsList');
    const filtered = filter === 'all' 
        ? mockData.assignments 
        : mockData.assignments.filter(a => a.status === filter);
    
    container.innerHTML = filtered.map(assignment => {
        const statusClass = assignment.status;
        const statusText = assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1);
        
        return `
            <div class="assignment-card ${statusClass}">
                <div class="assignment-info">
                    <h4>${assignment.title}</h4>
                    <div class="assignment-meta">${assignment.subject} • Due: ${assignment.dueDate}</div>
                </div>
                <div class="assignment-status ${statusClass}">${statusText}${assignment.grade ? ` (${assignment.grade}%)` : ''}</div>
            </div>
        `;
    }).join('');
}

// ==================== PARENT VIEW FUNCTIONS ====================
function initializeParentView() {
    // Default to first child
    selectChild('emma', document.querySelector('.child-card'));
}

function selectChild(childId, element) {
    state.currentChild = childId;
    
    // Update UI
    document.querySelectorAll('.child-card').forEach(card => {
        card.classList.remove('active');
    });
    element.classList.add('active');
    
    // Get child data
    const childData = childId === 'emma' 
        ? mockData.students['2024001'] 
        : mockData.students['2023012'];
    
    // Update grade banner
    const banner = document.getElementById('parentGradeBanner');
    banner.innerHTML = `
        <span class="level-tag ${getLevelClass(childData.level)}">${childData.level}</span>
        <h3>${childData.name} - ${childData.grade}</h3>
    `;
    
    // Update stats
    const avg = Math.round(childData.subjects.reduce((a, b) => a + b.score, 0) / childData.subjects.length);
    document.getElementById('childGpa').textContent = avg + '%';
    
    // Populate results table
    const tbody = document.getElementById('parentResultsBody');
    tbody.innerHTML = childData.subjects.map(subject => `
        <tr>
            <td>${subject.name}</td>
            <td><span class="score ${getScoreClass(subject.score)}">${subject.score}%</span></td>
            <td>${subject.teacher}</td>
            <td><span class="trend up">↗ Improving</span></td>
            <td><button onclick="viewSubjectDetails('${subject.name}')">Details</button></td>
        </tr>
    `).join('');
}

function getLevelClass(level) {
    if (level === 'Lower Primary') return 'lower-primary';
    if (level === 'Upper Primary') return 'upper-primary';
    return 'junior-secondary';
}

function getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'poor';
}

function addChild() {
    showModal('Add Child', `
        <div class="form-group">
            <label>Student ID</label>
            <input type="text" id="newChildId" placeholder="Enter student ID">
        </div>
        <div class="form-group">
            <label>Relationship</label>
            <select id="relationship">
                <option>Father</option>
                <option>Mother</option>
                <option>Guardian</option>
            </select>
        </div>
    `, () => {
        const id = document.getElementById('newChildId').value;
        if (id) {
            showToast('Success', 'Child added successfully');
            closeModal();
        }
    });
}

function messageTeacher() {
    switchTab('messages');
    showToast('Info', 'Select a teacher from the contacts list');
}

function scheduleMeeting() {
    showModal('Schedule Meeting', `
        <div class="form-group">
            <label>Teacher</label>
            <select>
                <option>Mr. Okello (Mathematics)</option>
                <option>Mrs. Nakato (English)</option>
                <option>Mr. Mugisha (Science)</option>
            </select>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="date" id="meetingDate">
        </div>
        <div class="form-group">
            <label>Time</label>
            <input type="time" id="meetingTime">
        </div>
        <div class="form-group">
            <label>Purpose</label>
            <textarea rows="3" placeholder="Brief description..."></textarea>
        </div>
    `, () => {
        showToast('Success', 'Meeting scheduled successfully');
        closeModal();
    });
}

function viewSubjectDetails(subject) {
    showModal(subject, `
        <div style="padding: 1rem 0;">
            <h4>Recent Assessments</h4>
            <table class="data-table" style="margin-top: 1rem;">
                <thead>
                    <tr>
                        <th>Assessment</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mid-term Exam</td>
                        <td>88%</td>
                        <td>2026-02-15</td>
                    </tr>
                    <tr>
                        <td>Class Quiz</td>
                        <td>92%</td>
                        <td>2026-03-01</td>
                    </tr>
                    <tr>
                        <td>Homework</td>
                        <td>85%</td>
                        <td>2026-03-10</td>
                    </tr>
                </tbody>
            </table>
            
            <h4 style="margin-top: 1.5rem;">Teacher Feedback</h4>
            <p style="color: var(--gray-600); font-size: 0.9rem; margin-top: 0.5rem;">
                "Excellent progress this term. Keep up the good work!"
            </p>
        </div>
    `);
}

// ==================== TEACHER VIEW FUNCTIONS ====================
function initializeTeacherView() {
    // Select first class by default
    const firstClass = document.querySelector('.class-card');
    if (firstClass) {
        selectClass('math-g5-a', firstClass);
    }
}

function selectClass(classId, element) {
    state.currentClass = classId;
    
    // Update UI
    document.querySelectorAll('.class-card').forEach(card => {
        card.classList.remove('active');
    });
    element.classList.add('active');
    
    // Get class data
    const classData = mockData.classes[classId];
    if (classData) {
        document.getElementById('gradebookTitle').textContent = 
            `Gradebook: ${classData.name} - ${classData.grade}${classData.section}`;
    }
    
    // Populate gradebook
    populateGradebook(classId);
}

function populateGradebook(classId) {
    const tbody = document.getElementById('gradebookBody');
    const grades = mockData.gradebook[classId] || mockData.gradebook['math-g5-a'];
    
    tbody.innerHTML = grades.map((student, index) => `
        <tr>
            <td><input type="checkbox" class="student-checkbox" data-id="${student.id}"></td>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.currentScore}%</td>
            <td><input type="number" min="0" max="100" placeholder="New" 
                onchange="updateGrade('${student.id}', this.value)"></td>
            <td>${student.letter}</td>
            <td><input type="text" placeholder="Add comment..." style="width: 150px;"></td>
            <td>
                <button onclick="viewStudentProfile('${student.id}')">View</button>
                <button onclick="messageStudent('${student.id}')">Message</button>
            </td>
        </tr>
    `).join('');
}

function updateGrade(studentId, value) {
    if (value) {
        state.unsavedChanges++;
        document.getElementById('unsavedCount').textContent = 
            `${state.unsavedChanges} unsaved changes`;
    }
}

function saveAllGrades() {
    state.unsavedChanges = 0;
    document.getElementById('unsavedCount').textContent = '0 unsaved changes';
    document.getElementById('lastSaved').textContent = 'Just now';
    showToast('Success', 'All grades saved successfully');
}

function addAssignment() {
    showModal('New Assignment', `
        <div class="form-group">
            <label>Assignment Name</label>
            <input type="text" id="assignmentName" placeholder="e.g., Mid-term Exam">
        </div>
        <div class="form-group">
            <label>Weight (%)</label>
            <input type="number" id="assignmentWeight" min="0" max="100" value="20">
        </div>
        <div class="form-group">
            <label>Due Date</label>
            <input type="date" id="assignmentDueDate">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea rows="3" placeholder="Instructions..."></textarea>
        </div>
    `, () => {
        showToast('Success', 'Assignment created successfully');
        closeModal();
    });
}

function publishGrades() {
    showModal('Publish Grades', `
        <p>Are you sure you want to publish grades for <strong>${document.getElementById('gradebookTitle').textContent}</strong>?</p>
        <p style="color: var(--gray-500); font-size: 0.9rem; margin-top: 1rem;">
            This will make grades visible to students and parents.
        </p>
    `, () => {
        showToast('Success', 'Grades published successfully');
        closeModal();
    });
}

function importGrades() {
    showModal('Import Grades', `
        <div style="border: 2px dashed var(--gray-300); padding: 2rem; text-align: center; border-radius: var(--radius-lg);">
            <div style="font-size: 2rem; margin-bottom: 1rem;">📁</div>
            <p>Drag and drop CSV file here</p>
            <p style="color: var(--gray-500); font-size: 0.875rem; margin-top: 0.5rem;">or click to browse</p>
        </div>
        <div style="margin-top: 1rem;">
            <a href="#" style="font-size: 0.875rem; color: var(--primary);">Download template</a>
        </div>
    `);
}

function exportGrades() {
    showToast('Success', 'Grades exported to CSV');
}

function viewStudentProfile(studentId) {
    const student = Object.values(mockData.students).find(s => s.id === studentId) || 
                   { name: 'Sample Student', grade: 'Grade 5', subjects: [] };
    
    showModal('Student Profile', `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="width: 80px; height: 80px; background: var(--primary); color: white; 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                        font-size: 1.5rem; margin: 0 auto 1rem;">${student.avatar || 'SS'}</div>
            <h3>${student.name}</h3>
            <p style="color: var(--gray-500);">ID: ${studentId} • ${student.grade}</p>
        </div>
        
        <h4>Performance Overview</h4>
        <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin: 1rem 0;">
            <div class="stat-card" style="padding: 1rem;">
                <div class="stat-value" style="font-size: 1.5rem;">85%</div>
                <div class="stat-label">Average</div>
            </div>
            <div class="stat-card" style="padding: 1rem;">
                <div class="stat-value" style="font-size: 1.5rem;">#12</div>
                <div class="stat-label">Rank</div>
            </div>
            <div class="stat-card" style="padding: 1rem;">
                <div class="stat-value" style="font-size: 1.5rem;">96%</div>
                <div class="stat-label">Attendance</div>
            </div>
        </div>
    `);
}

function messageStudent(studentId) {
    switchTab('messages');
    showToast('Info', 'Opening message composer...');
}

// ==================== TAB SWITCHING ====================
function switchTab(tabName) {
    state.selectedTab = tabName;
    
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('onclick').includes(tabName)) {
            tab.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// ==================== MESSAGING ====================
function initializeMessages() {
    // Populate teacher contacts
    const teacherContacts = document.getElementById('teacherContacts');
    if (teacherContacts) {
        const teachers = [
            { name: 'Mr. Okello', subject: 'Mathematics', color: '#2563eb' },
            { name: 'Mrs. Nakato', subject: 'English', color: '#8b5cf6' },
            { name: 'Mr. Mugisha', subject: 'Science', color: '#10b981' }
        ];
        
        teacherContacts.innerHTML = teachers.map(t => `
            <div class="contact-item" onclick="selectContact('${t.name}', '${t.subject}')">
                <div class="contact-avatar" style="background: ${t.color};">${t.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                    <div class="contact-name">${t.name}</div>
                    <div class="contact-role">${t.subject}</div>
                </div>
            </div>
        `).join('');
    }
}

function selectContact(name, role) {
    document.getElementById('chatHeader').innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 35px; height: 35px; background: var(--primary); color: white; 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                ${name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <div style="font-weight: 600;">${name}</div>
                <div style="font-size: 0.75rem; color: var(--gray-500);">${role}</div>
            </div>
        </div>
    `;
    
    // Load mock messages
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="message received">
            <div>Hello! How can I help you today?</div>
            <div class="message-time">10:30 AM</div>
        </div>
    `;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text) {
        const chatMessages = document.getElementById('chatMessages');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        chatMessages.innerHTML += `
            <div class="message sent">
                <div>${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate reply
        setTimeout(() => {
            chatMessages.innerHTML += `
                <div class="message received">
                    <div>Thanks for your message. I'll get back to you shortly.</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// ==================== MODAL FUNCTIONS ====================
function showModal(title, content, onConfirm = null) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    
    const footer = document.getElementById('modalFooter');
    if (onConfirm) {
        footer.innerHTML = `
            <button onclick="closeModal()">Cancel</button>
            <button class="primary" onclick="modalConfirmCallback()">Confirm</button>
        `;
        window.modalConfirmCallback = () => {
            onConfirm();
        };
    } else {
        footer.innerHTML = `
            <button onclick="closeModal()">Close</button>
        `;
    }
    
    document.getElementById('modal').classList.add('active');
}

function closeModal(event) {
    if (!event || event.target === document.getElementById('modal') || 
        event.target.closest('.modal-close') || event.target.textContent === 'Cancel' || 
        event.target.textContent === 'Close') {
        document.getElementById('modal').classList.remove('active');
    }
}

function confirmModal() {
    if (window.modalConfirmCallback) {
        window.modalConfirmCallback();
    }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Update icon based on type
    const icon = toast.querySelector('.toast-icon');
    if (type === 'error') {
        icon.textContent = '✕';
        toast.classList.add('error');
        toast.classList.remove('success');
    } else if (type === 'warning') {
        icon.textContent = '!';
        toast.classList.add('warning');
    } else {
        icon.textContent = '✓';
        toast.classList.remove('error', 'warning');
    }
    
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ==================== UTILITY FUNCTIONS ====================
function filterResults() {
    const term = document.getElementById('termFilter').value;
    showToast('Info', `Results filtered by: ${term}`);
}

function exportResults() {
    showToast('Success', 'Results exported to PDF');
}

function printSchedule() {
    window.print();
}

function downloadSchedule() {
    showToast('Success', 'Schedule downloaded as PDF');
}

function toggleProfileMenu() {
    // Could implement dropdown menu here
    showModal('Profile', `
        <div style="text-align: center;">
            <div style="width: 100px; height: 100px; background: var(--primary); color: white; 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                        font-size: 2rem; margin: 0 auto 1rem;">${state.currentUser?.avatar || 'U'}</div>
            <h3>${state.currentUser?.name || 'User'}</h3>
            <p style="color: var(--gray-500);">${state.currentUser?.role || 'Student'}</p>
            
            <div style="margin-top: 1.5rem; text-align: left;">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="user@fortunestars.edu" readonly>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" value="+256 700 123456">
                </div>
            </div>
        </div>
    `);
}

function searchClasses(query) {
    const cards = document.querySelectorAll('.class-card');
    cards.forEach(card => {
        const title = card.querySelector('.class-title').textContent.toLowerCase();
        const meta = card.querySelector('.class-meta').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || meta.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = query ? 'none' : 'block';
        }
    });
}

function changeAssignment(assignment) {
    showToast('Info', `Switched to: ${assignment}`);
}

function selectAll() {
    const checkboxes = document.querySelectorAll('.student-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });
}

function bulkEdit() {
    const selected = document.querySelectorAll('.student-checkbox:checked');
    if (selected.length === 0) {
        showToast('Warning', 'Please select students first', 'warning');
        return;
    }
    
    showModal('Bulk Edit', `
        <p>Editing ${selected.length} students</p>
        <div class="form-group" style="margin-top: 1rem;">
            <label>New Score</label>
            <input type="number" min="0" max="100" placeholder="Enter score">
        </div>
    `, () => {
        showToast('Success', `Updated ${selected.length} students`);
        closeModal();
    });
}

function toggleView(view) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    showToast('Info', `Switched to ${view} view`);
}

function saveGrades() {
    saveAllGrades();
}

// ==================== ADMIN FUNCTIONS ====================
function manageStudents() {
    showModal('Student Management', `
        <div style="display: grid; gap: 1rem;">
            <button class="primary" style="width: 100%; padding: 1rem;">➕ Enroll New Student</button>
            <button style="width: 100%; padding: 1rem;">📝 Bulk Enroll</button>
            <button style="width: 100%; padding: 1rem;">🔄 Transfer Student</button>
            <button style="width: 100%; padding: 1rem;">📊 Generate ID Cards</button>
        </div>
    `);
}

function manageStaff() {
    showModal('Staff Management', `
        <div style="display: grid; gap: 1rem;">
            <button class="primary" style="width: 100%; padding: 1rem;">➕ Add Teacher</button>
            <button style="width: 100%; padding: 1rem;">👥 View All Staff</button>
            <button style="width: 100%; padding: 1rem;">📅 Manage Schedules</button>
            <button style="width: 100%; padding: 1rem;">💰 Payroll</button>
        </div>
    `);
}

function manageClasses() {
    showModal('Class Management', `
        <div style="display: grid; gap: 1rem;">
            <button class="primary" style="width: 100%; padding: 1rem;">➕ Create New Class</button>
            <button style="width: 100%; padding: 1rem;">👨‍🏫 Assign Teachers</button>
            <button style="width: 100%; padding: 1rem;">📋 Class Lists</button>
            <button style="width: 100%; padding: 1rem;">🏫 Room Allocation</button>
        </div>
    `);
}

function viewReports() {
    showToast('Info', 'Opening reports dashboard...');
}

function manageFees() {
    showModal('Fee Management', `
        <div style="display: grid; gap: 1rem;">
            <button class="primary" style="width: 100%; padding: 1rem;">💵 Record Payment</button>
            <button style="width: 100%; padding: 1rem;">📄 Generate Invoices</button>
            <button style="width: 100%; padding: 1rem;">📊 Fee Reports</button>
            <button style="width: 100%; padding: 1rem;">🔔 Send Reminders</button>
        </div>
    `);
}

function systemSettings() {
    showModal('System Settings', `
        <div class="form-group">
            <label>School Name</label>
            <input type="text" value="Fortune Stars School">
        </div>
        <div class="form-group">
            <label>Academic Year</label>
            <select>
                <option>2025-2026</option>
                <option>2026-2027</option>
            </select>
        </div>
        <div class="form-group">
            <label>Grading Scale</label>
            <select>
                <option>Percentage (0-100)</option>
                <option>Letter Grades (A-F)</option>
                <option>GPA (0-4)</option>
            </select>
        </div>
    `, () => {
        showToast('Success', 'Settings saved');
        closeModal();
    });
}

function generateReport() {
    showToast('Success', 'Enrollment report generated');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Set default date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.value = today;
    });
    
    // Enter key for chat
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    console.log('Fortune Stars School Portal initialized');
});

