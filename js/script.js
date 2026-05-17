function atualizarUsuario() {
  var area = document.getElementById('area-usuario');
  if (!area) return;

  var autenticado = localStorage.getItem('pethub_autenticado');
  var login = localStorage.getItem('pethub_login');

  if (autenticado === 'true' && login) {
    area.innerHTML =
      '<div class="usuario-autenticado">' +
        '<a href="cadastro.html">' +
          '<div class="foto-usuario-placeholder">🐾</div>' +
          '<span class="nome-usuario">' + login + '</span>' +
        '</a>' +
        '<button class="btn-sair" id="btn-sair">Sair</button>' +
      '</div>';

    document.getElementById('btn-sair').addEventListener('click', function() {
      localStorage.removeItem('pethub_autenticado');
      window.location.reload();
    });
  } else {
    area.innerHTML = '<span class="usuario-nao-autenticado">Usuário não autenticado</span>';
  }
}

function toggleSenha(inputId, btn) {
  var input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

function mostrarErro(campoId, msg) {
  var erro = document.getElementById('erro-' + campoId);
  if (erro) {
    erro.textContent = msg;
    erro.style.display = msg ? 'block' : 'none';
  }
}

function validarSenha(senha) {
  if (senha.length < 13) return 'A senha deve ter pelo menos 13 caracteres.';
  if (!/[a-z]/.test(senha)) return 'Inclua pelo menos uma letra minúscula.';
  if (!/[A-Z]/.test(senha)) return 'Inclua pelo menos uma letra maiúscula.';
  if (!/[0-9]/.test(senha)) return 'Inclua pelo menos um número.';
  return '';
}

function validarEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? '' : 'Digite um e-mail válido (ex: nome@email.com).';
}

function iniciarLogin() {
  var btn = document.getElementById('btn-autenticar');
  if (!btn) return;

  var btnOlho = document.getElementById('olho-senha-login');
  if (btnOlho) {
    btnOlho.addEventListener('click', function() {
      toggleSenha('campo-senha', btnOlho);
    });
  }

  btn.addEventListener('click', function() {
    var loginDigitado = document.getElementById('campo-login').value.trim();
    var senhaDigitada = document.getElementById('campo-senha').value.trim();

    mostrarErro('campo-login', '');
    mostrarErro('campo-senha', '');

    var ok = true;

    if (!loginDigitado) {
      mostrarErro('campo-login', 'Preencha o login.');
      ok = false;
    }

    if (!senhaDigitada) {
      mostrarErro('campo-senha', 'Preencha a senha.');
      ok = false;
    }

    if (!ok) return;

    var loginSalvo = localStorage.getItem('pethub_login');
    var senhaSalva = localStorage.getItem('pethub_senha');

    if (!loginSalvo || !senhaSalva) {
      mostrarErro('campo-login', 'Nenhum cadastro encontrado. Faça seu cadastro primeiro.');
      return;
    }

    if (loginDigitado !== loginSalvo) {
      mostrarErro('campo-login', 'Login incorreto.');
      return;
    }

    if (senhaDigitada !== senhaSalva) {
      mostrarErro('campo-senha', 'Senha incorreta.');
      return;
    }

    localStorage.setItem('pethub_autenticado', 'true');
    window.location.href = 'index.html';
  });
}

function iniciarTema() {
  var radios = document.querySelectorAll('input[name="tema"]');
  if (!radios.length) return;

  radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.value === 'custom') {
        document.body.classList.add('tema-custom');
      } else {
        document.body.classList.remove('tema-custom');
      }
    });
  });
}

function iniciarCadastro() {
  var btn = document.getElementById('btn-cadastrar');
  if (!btn) return;

  var loginSalvo = localStorage.getItem('pethub_login');
  if (loginSalvo) {
    var campos = {
      'nome': 'pethub_nome',
      'email': 'pethub_email',
      'login-cadastro': 'pethub_login',
      'senha-cadastro': 'pethub_senha'
    };
    Object.keys(campos).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = localStorage.getItem(campos[id]) || '';
    });
  }

  var olhoSenha = document.getElementById('olho-senha-cadastro');
  if (olhoSenha) {
    olhoSenha.addEventListener('click', function() {
      toggleSenha('senha-cadastro', olhoSenha);
    });
  }

  var campoDeSenha = document.getElementById('senha-cadastro');
  if (campoDeSenha) {
    campoDeSenha.addEventListener('input', function() {
      var msg = validarSenha(this.value);
      mostrarErro('senha-cadastro', msg);
    });
  }

  var campoDeEmail = document.getElementById('email');
  if (campoDeEmail) {
    campoDeEmail.addEventListener('blur', function() {
      var msg = validarEmail(this.value.trim());
      mostrarErro('email', msg);
    });
  }

  btn.addEventListener('click', function() {
    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var loginCad = document.getElementById('login-cadastro').value.trim();
    var senhaCad = document.getElementById('senha-cadastro').value.trim();

    mostrarErro('nome', '');
    mostrarErro('email', '');
    mostrarErro('login-cadastro', '');
    mostrarErro('senha-cadastro', '');

    var ok = true;

    if (!nome) { mostrarErro('nome', 'Preencha o nome.'); ok = false; }

    var erroEmail = validarEmail(email);
    if (erroEmail) { mostrarErro('email', erroEmail); ok = false; }

    if (!loginCad) { mostrarErro('login-cadastro', 'Escolha um login.'); ok = false; }

    var erroSenha = validarSenha(senhaCad);
    if (erroSenha) { mostrarErro('senha-cadastro', erroSenha); ok = false; }

    if (!ok) return;

    localStorage.setItem('pethub_nome', nome);
    localStorage.setItem('pethub_email', email);
    localStorage.setItem('pethub_login', loginCad);
    localStorage.setItem('pethub_senha', senhaCad);

    btn.textContent = 'Cadastro salvo!';
    setTimeout(function() {
      btn.textContent = 'Salvar cadastro';
    }, 2500);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarUsuario();
  iniciarLogin();
  iniciarTema();
  iniciarCadastro();
});
