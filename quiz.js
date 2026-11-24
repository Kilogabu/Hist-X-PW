(() => {
  const questions = [
    {
      question: '1) Qual foi a primeira forma de governo de Roma?',
      answers: ['República', 'Monarquia', 'Império', 'Democracia moderna'],
      correct: 1,
      explanation: 'Roma começou sua história política sob uma monarquia, antes da criação da República.'
    },
    {
      question: '2) Assinale a alternativa incorreta sobre a história de Rômulo e Remo:',
      answers: ['Segundo a tradição romana, Rômulo e Remo foram os dois últimos reis de Roma.', 'A história de Rômulo e Remo foi desenvolvida como forma de explicar a formação inicial de Roma.', 'Uma loba teria encontrado os meninos na margem do rio Tibre após eles terem sido atirados em um cesto para morrer afogados.', 'Após adultos, Rômulo teria matado Remo.', 'Há uma famosa estátua, em bronze, representando a loba Capitolina cuidando dos dois irmãos. Atualmente, ela encontra-se exposta em um museu em Roma.'],
      correct: 0,
      explanation: 'A alternativa está incorreta porque Rômulo e Remo não foram os dois últimos reis de Roma.'
    },
    {
      question: '3) Quem é considerado o primeiro rei de Roma?',
      answers: ['Numa Pompílio', 'Tarquínio, o Soberbo', 'Rômulo', 'Sérvio Túlio'],
      correct: 2,
      explanation: 'Rômulo é apresentado pela tradição como fundador e primeiro rei de Roma.'
    },
    {
      question: '4) Qual era uma das principais funções do Senado durante a Monarquia?',
      answers: ['Escolher todos os trabalhadores', 'Aconselhar o rei', 'Comandar todas as cidades da Itália', 'Substituir o exército'],
      correct: 1,
      explanation: 'O Senado reunia membros de famílias importantes e atuava como conselho do rei, expressando especialmente os interesses da aristocracia.'
    },
    {
      question: '5) Quem eram os patrícios?',
      answers: ['Membros de famílias tradicionais e influentes', 'Somente soldados estrangeiros', 'Pessoas que viviam fora da Itália', 'Os reis derrotados'],
      correct: 0,
      explanation: 'Os patrícios eram ligados a famílias tradicionais que concentravam prestígio, riqueza e influência social e política.'
    },
    {
      question: '6) Qual atividade tinha grande importância na economia dos primeiros tempos de Roma?',
      answers: ['Extração de petróleo', 'Produção industrial em fábricas', 'Agricultura e criação de animais', 'Comércio marítimo em escala global'],
      correct: 2,
      explanation: 'A agricultura e a criação de animais eram atividades fundamentais para a alimentação e o sustento da população.'
    },
    {
      question: '7) A qual rei a tradição atribui a organização de práticas religiosas romanas?',
      answers: ['Túlio Hostílio', 'Anco Márcio', 'Tarquínio Prisco', 'Numa Pompílio'],
      correct: 3,
      explanation: 'Numa Pompílio é tradicionalmente associado à organização de rituais, costumes e funções religiosas.'
    },
    {
      question: '8) A cidade de Roma foi fundada em meados do século VIII a.C. sobre colinas nas margens do rio Tibre. Os materiais diversos depositados pelo rio nas suas margens formaram colinas ou rochedos escarpados. Considerando o local escolhido para a fundação de Roma, percebe-se que os primeiros romanos:',
      answers: ['Buscaram edificar a cidade longe de rotas comerciais e militares.', 'Preocuparam-se com a proteção militar da cidade e com a prática da agricultura.', 'Escolheram espaços adequados para a instalação de monumentos públicos.', 'Visavam a organização de uma República pacífica e democrática.', 'Pretendiam iniciar a conquista das cidades gregas instaladas na Itália.'],
      correct: 1,
      explanation: 'Roma foi fundada sobre sete colinas, em uma região próxima ao rio Tibre. As colinas facilitavam a defesa contra invasores, enquanto o rio fornecia água, favorecia o transporte e o comércio, e as terras férteis ao redor eram adequadas para a agricultura.'
    }
  ];

  const pontuacaoValue = document.getElementById('pontuacaoValue');
  const quizList = document.getElementById('quizList');

  if (!pontuacaoValue || !quizList) return;

  let pontuacao = 0;

  function createCard(item, questionIndex) {
    const state = { selected: null, answered: false };

    const card = document.createElement('section');
    card.className = 'quiz-card';
    card.setAttribute('aria-labelledby', `questionText${questionIndex}`);
    

    const title = document.createElement('h2');
    title.className = 'question-title';
    title.id = `questionText${questionIndex}`;
    title.textContent = item.question;

    const answerList = document.createElement('div');
    answerList.className = 'answer-list';

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.hidden = true;

    const actions = document.createElement('div');
    actions.className = 'quiz-actions';


    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'primary-link submit-button';
    submitButton.disabled = true;
    submitButton.innerHTML = 'Enviar resposta <span aria-hidden="true">→</span>';

    const options = item.answers.map((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-option';
      button.dataset.index = String(index);
      button.setAttribute('aria-pressed', 'false');


      const letter = document.createElement('span');
      letter.className = 'answer-letter';
      letter.textContent = String.fromCharCode(65 + index);

      const answerText = document.createElement('span');
      answerText.className = 'answer-text';
      answerText.textContent = answer;

      button.append(letter, answerText);
      button.addEventListener('click', () => selectAnswer(index));
      answerList.appendChild(button);
      return button;
    });

    function selectAnswer(index) {
      if (state.answered) return;
      state.selected = index;

      options.forEach((option, optionIndex) => {
        const isSelected = optionIndex === index;

        option.classList.toggle('is-selected', isSelected);
        option.setAttribute('aria-pressed', String(isSelected));
      });

      submitButton.disabled = false;
      
    }

    function submitAnswer() {
      if (state.answered || state.selected === null) return;
      state.answered = true;


      const isCorrect = state.selected === item.correct;

      options.forEach((option, index) => {
        option.disabled = true;
        option.classList.remove('is-selected');

        if (index === item.correct) option.classList.add('is-correct');

        if (index === state.selected && !isCorrect) option.classList.add('is-wrong');
      });


      if (isCorrect) {
        pontuacao += 1;
        pontuacaoValue.textContent = String(pontuacao);
        feedback.textContent = `Correto! ${item.explanation}`;
        feedback.classList.add('correct');
        
      } 
      
      else {
        feedback.textContent = `Não foi dessa vez. ${item.explanation}`;
        feedback.classList.add('incorrect');
        
      }

      feedback.hidden = false;
      submitButton.disabled = true;
    }

    submitButton.addEventListener('click', submitAnswer);

    actions.append(submitButton);
    card.append(title, answerList, feedback, actions);
    return card;
  }

  function renderQuiz() {
    pontuacao = 0;
    pontuacaoValue.textContent = '0';

    quizList.replaceChildren();
    questions.forEach((item, index) => {
      quizList.appendChild(createCard(item, index));
    });
  }

  renderQuiz();
})();