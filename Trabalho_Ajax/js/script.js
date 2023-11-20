function preencherTabela(dados) {
    $('#corpoTabela').empty();
    $.each(dados, function (i, obj) {
        var row = '<tr><td>' + obj.nome + '</td><td>' + obj.email + '</td><td><button onclick=\"removerDados(' +
            obj.id + ')\" type=\"button\" class=\"btn btn-danger\">Apagar</button></td></tr>';
        $('#corpoTabela').append(row);
    });
}

function lerDados() {
    $('#myForm').find('input').each(function () {
        $(this).removeClass('is-valid');
    });
    setTimeout(function () {
        $('#confirmacao').css('display', 'none');
    }, 2000);
    $.ajax({
        type: 'POST',
        url: 'https://epansani.com.br/2023/dw1s4/ajax/list.php',
        async: true,
        data: {
        }, success: function (data) {
            const dados = JSON.parse(data);
            preencherTabela(dados);
        }
    });
}

function validarDados() {
    $('#myForm').on('input', 'input', function (event) {
        var elemento = $(event.target);
        var isValid = elemento[0].checkValidity();

        if (isValid) {
            elemento.removeClass('is-invalid').addClass('is-valid');
        } else {
            elemento.removeClass('is-valid').addClass('is-invalid');
        }
    });
}

function inserirDados() {
    validarDados();
    var flag = true;
    $('#myForm').find('input').each(function () {
        if ($(this).hasClass('is-invalid')) {
            flag = false;
        }
        if (!$(this).val()) {
            flag = false;
        }
    });

    if (flag == true) {
        $('#erro').css('display', 'none');
        insert();
    } else {
        $('#erro').css('display', 'flex');
    }
}

function insert() {
    $.ajax({
        type: 'POST',
        url: 'https://epansani.com.br/2023/dw1s4/ajax/ins.php',
        async: true,
        data: {
            nome: $('#nome').val(),
            email: $('#email').val()
        }, success: function (data) {
            if (data) {
                $('#confirmacao').css('display', 'flex');
                $('#myForm')[0].reset();
                lerDados();
            } else {
                $('#confirmacao').css('display', 'none');
            }
        }
    });
}

function removerDados(id) {
    var isConfirm = confirm("Deseja mesmo remover os dados?");
    if (isConfirm) {
        $.ajax({
            type: 'POST',
            url: 'https://epansani.com.br/2023/dw1s4/ajax/rem.php',
            async: true,
            data: {
                id: id
            }, success: function (data) {
                if (data) {
                    alert("Dados removidos com sucesso!");
                    lerDados();
                } else {
                    alert("Erro ao remover dados!");
                }
            }
        });
    }
}