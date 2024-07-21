document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.edit-task').forEach(function (editButton) {
        editButton.addEventListener('click', function () {
            let taskItem = this.closest('.divLi');
            taskItem.querySelector('.descricao-texto').style.display = 'none';
            taskItem.querySelector('.status-texto').style.display = 'none';
            taskItem.querySelector('.descricao-edit').style.display = 'inline';
            taskItem.querySelector('.status-edit').style.display = 'inline';
            taskItem.querySelector('.save-task').style.display = 'inline';
            taskItem.querySelector('.cancel-task').style.display = 'inline';
            this.style.display = 'none';
        });
    });

    document.querySelectorAll('.cancel-task').forEach(function (cancelButton) {
        cancelButton.addEventListener('click', function () {
            let taskItem = this.closest('.divLi');
            taskItem.querySelector('.descricao-texto').style.display = 'inline';
            taskItem.querySelector('.status-texto').style.display = 'inline';
            taskItem.querySelector('.descricao-edit').style.display = 'none';
            taskItem.querySelector('.status-edit').style.display = 'none';
            taskItem.querySelector('.save-task').style.display = 'none';
            taskItem.querySelector('.edit-task').style.display = 'inline';
            this.style.display = 'none';
        });
    });

    document.querySelectorAll('.save-task').forEach(function (saveButton) {
        saveButton.addEventListener('click', function () {
            let taskItem = this.closest('.divLi');
            let id = taskItem.getAttribute('data-id');
            let descricao = taskItem.querySelector('.descricao-edit').value;
            let status = taskItem.querySelector('.status-edit').value;

            fetch(`/List/Edit/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
                },
                body: JSON.stringify({ id, descricao, status })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        taskItem.querySelector('.descricao-texto').textContent = descricao;
                        taskItem.querySelector('.status-texto').textContent = status;
                        taskItem.querySelector('.descricao-texto').style.display = 'inline';
                        taskItem.querySelector('.status-texto').style.display = 'inline';
                        taskItem.querySelector('.descricao-edit').style.display = 'none';
                        taskItem.querySelector('.status-edit').style.display = 'none';
                        taskItem.querySelector('.save-task').style.display = 'none';
                        taskItem.querySelector('.edit-task').style.display = 'inline';
                        taskItem.querySelector('.cancel-task').style.display = 'none';
                    } else {
                        // Handle error
                    }
                });
        });
    });

    document.querySelectorAll('.delete-task').forEach(function (deleteButton) {
        deleteButton.addEventListener('click', function () {
            if (!confirm("Tem certeza que deseja excluir esta tarefa?")) {
                return;
            }

            let taskItem = this.closest('.divLi');
            let id = taskItem.getAttribute('data-id');

            fetch(`/List/Delete/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        taskItem.remove();
                    } else {
                        // Handle error
                    }
                });
        });
    });
});
