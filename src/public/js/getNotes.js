async function getNotes() {
    const response = await fetch('/api/notes');
    const data = await response.json();
    console.log(data);
    const showNotes = document.getElementById('show-notes');

    if (data.notes.length == 0) {

        $('#message').text('No existen notas que mostrar');

    } else {
        $('#message').text('');

        for (let i = 0; i < data.notes.length; i++) {

            const id = data.notes[i]._id;
            const title = document.createElement('h5');
            const date = document.createElement('small');
            const description = document.createElement('p');
            const btnDelete = document.createElement('button');
            const btnShow = document.createElement('button');
            const btnEdit = document.createElement('button');
            const note = document.createElement('div');
            const btnDiv = document.createElement('div');
            const btnForm = document.createElement('form');

            note.className = 'card mb-3 px-2 py-2 card-note';
            btnDiv.className = 'd-flex flex-row mt-2';

            title.textContent = data.notes[i].title;

            date.textContent = data.notes[i].date.substring(8, 10) + data.notes[i].date.substring(4, 8) + data.notes[i].date.substring(0, 4);
            date.className = 'date';

            //Características de los botones del DOM:

            btnShow.className = 'btn btn-primary btn-sm';
            btnShow.id = "show" + i;
            btnShow.textContent = 'Mostrar';
            btnDelete.type = "button";

            btnEdit.className = 'btn btn-success btn-sm mx-3';
            btnEdit.id = "edit" + i;
            btnEdit.textContent = 'Editar';
            btnEdit.type = "button";

            btnDelete.className = 'btn btn-danger btn-sm';
            btnDelete.id = "delete" + i;
            btnDelete.textContent = 'Eliminar';
            btnDelete.type = "submit";

            description.textContent = data.notes[i].description;

            //Añadimos los elementos del DOM

            note.append(title);
            note.append(date);
            btnDiv.append(btnShow);
            btnForm.append(btnEdit);
            btnForm.append(btnDelete);
            btnDiv.append(btnForm);

            note.append(btnDiv);
            showNotes.append(note);

            //Botón mostrar modal
            btnShow.onclick = () => {

                $('#myModal').modal('show');
                $('#modal-title').text(data.notes[i].title);
                $('#content-body').html(description);


            }

            //Botón de eliminar:      
            btnDelete.onclick = () => {
                console.log(id);
                deleteNote(id);
            }

            //Botón de editar:      
            btnEdit.onclick = () => {
                const title = data.notes[i].title;
                const description = data.notes[i].description;
                window.location.href = 'edit.html?id=' + id + '&title=' + title + '&description=' + description;

            }
        }
    }

}


//Función para eliminar una nota

async function deleteNote(id) {
    await fetch('/api/delete/' + id, {
        method: 'DELETE'
    }).then(res => res.text()).then(res => console.log(res))
}

getNotes();