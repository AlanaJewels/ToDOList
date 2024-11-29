document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressFill = document.getElementById('progress-fill');
    const themeToggle = document.getElementById('theme-toggle');

    // Handle theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme')
            ? '☀️ Light Mode'
            : '🌙 Dark Mode';
    });

    // Form Submit Event to add a task
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        const priority = document.querySelector('input[name="priority"]:checked')?.value || 'Low'; // Get selected priority
        const category = categoryFilter.value || 'Work'; // Get selected category

        if (!taskText) {
            alert('Please enter a task!');
            return;
        }

        addTask(taskText, priority, category); // Add the task with selected priority and category
        todoInput.value = ''; // Clear input after adding
    });

    // Filter tasks based on search input and category filter
    searchInput.addEventListener('input', filterTasks);
    categoryFilter.addEventListener('change', filterTasks);

    // Function to add a task
    function addTask(taskText, priority = 'Low', category = 'Work', dueDate = null) {
        const listItem = document.createElement('li');
        
        // Task Text
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        listItem.appendChild(taskTextElement);

        // Priority Badge
        const priorityBadge = document.createElement('span');
        priorityBadge.textContent = ` (${priority})`;
        priorityBadge.classList.add(`priority-${priority.toLowerCase()}`);
        listItem.appendChild(priorityBadge);

        // Category Badge
        const categoryBadge = document.createElement('span');
        categoryBadge.textContent = `[${category}]`;
        listItem.appendChild(categoryBadge);

        // Checkbox for task completion
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        listItem.appendChild(checkBox);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        listItem.appendChild(deleteButton);

        checkBox.addEventListener('change', updateProgress);
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            updateProgress();
        });

        todoList.appendChild(listItem);
        updateProgress(); // Update progress when a new task is added
    }

    // Function to filter tasks based on search input and selected category
    function filterTasks() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        Array.from(todoList.children).forEach((task) => {
            const taskText = task.querySelector('span').textContent.toLowerCase();
            const taskCategory = task.querySelector('span:nth-child(3)').textContent;
            const matchesSearch = taskText.includes(searchQuery);
            const matchesCategory = !selectedCategory || taskCategory.includes(selectedCategory);
            task.style.display = matchesSearch && matchesCategory ? '' : 'none';
        });
    }

    // Function to update progress
    function updateProgress() {
        const tasks = todoList.children;
        const completedTasks = todoList.querySelectorAll('input:checked').length;
        const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
        progressPercentage.textContent = `${Math.round(progress)}% 🐢`;
        progressFill.style.width = `${progress}%`;
    }
});
