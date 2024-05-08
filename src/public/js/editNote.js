const update = document.getElementById('update');

//Obtenemos los parámetros enviados por la url ****************************
const values = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(values);
//Accedemos a los valores
var id = urlParams.get('id');
var titleParam = urlParams.get('title');
var descriptionParam = urlParams.get('description');

//Elemento del DOM *********************************************************
const title = document.getElementById('title');
const description = document.getElementById('description');

//Asignamos los valores ****************************************************
title.value = titleParam;
description.textContent = descriptionParam;

$(document).ready(function() {
    $("#alert-edit").hide();
});

$("#btn-alert-edit").click(function() {
    $("#alert-edit").hide();
});

update.onclick = () => {
    const titleValue = title.value;
    const descriptionValue = description.value;

    if (titleValue == '' || descriptionValue == '') {
        $("#alert-edit").show();
    } else {
        updateData(id, titleValue, descriptionValue);
        window.location.href = '/';
    }

}

//Función para actualizar una nota

async function updateData(id, title, description) {
    const response = await fetch('/api/update/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'description': description
        })

    });

    const data = await response.json();
    console.log(data);
}