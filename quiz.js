// 1. Correct answer indices (0=A, 1=B, 2=C, 3=D)
const answers = [
  1, 2, 2, 3, 0, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2
];

// 2. Text content of all options
const options = [
  ["delay","launch","complain","refuse"],
  ["expect","avoid","complete","remind"],
  ["managers","employees","guests","partners"],
  ["protected","avoided","described","increased"],
  ["postponed","confused","damaged","promised"],
  ["profits","schedules","salaries","opinions"],
  ["usual","simple","private","central"],
  ["available","formal","confidential","temporary"],
  ["nervous","careless","ordinary","efficient"],
  ["rare","personal","equal","basic"],
  ["silent", "flexible", "empty", "detailed"],
  ["imagine","repair","publish","purchase"],
  ["direction","distance","pressure","increase"],
  ["suddenly","widely","closely","carefully"],
  ["prevent","depend","affect","reduce"]
];

// 3. Vocabulary Explanations (Now in English)
const explanations = [
  "Launch (v.) means to start or introduce something new, which correctly precedes 'a new marketing strategy'.",
  "Complete (v.) means to fill out or finish, which is the necessary action for a 'form'.",
  "Guests (n.) are people staying at a hotel, and offering a free breakfast is a common service for them.",
  "Increased (v.) means to become greater in size or amount. Sales are expected to 'increase significantly' after a product launch.",
  "Postponed (v.) means to put off to a later time. A meeting is often 'postponed' if key members are absent.",
  "Opinions (n.) are beliefs or judgments. Employees are encouraged to share their 'opinions' during a discussion.",
  "Central (adj.) describes a main or easily accessible location, often related to 'convenient transportation'.",
  "Confidential (adj.) means secret or private. Customer information must be kept 'confidential' and secure.",
  "Efficient (adj.) means achieving maximum productivity with minimum wasted effort. A manager would praise 'efficient' work.",
  "Basic (adj.) describes fundamental or entry-level training, typically provided to 'new staff members'.",
  "Detailed (adj.) means having many facts or pieces of information. A report should contain 'detailed' information about sales.",
  "Purchase (v.) means to buy. Customers can 'purchase' the product either online or in the store.",
  "Increase (n.) refers to a rise in amount or level, such as 'an increase' in ticket prices.",
  "Carefully (adv.) means with great attention or caution. Instructions should be read 'carefully' before using machinery.",
  "Affect (v.) means to have an influence on. A new policy will 'affect' all departments in the company."
];


/** This is the function to calculate and display the results **/
function checkAnswers() {
  const form = document.getElementById('vocabQuiz');
  const resultDiv = document.getElementById('result');
  let score = 0;
  const totalQuestions = answers.length;
  let resultHTML = '<h3>📊 Quiz Results and Detailed Explanations</h3><ol>';

  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = 'q' + i;
    const questionIndex = i - 1;

    const selectedElement = form.elements[questionName];
    let selectedOptionValue = "";
    
    if (selectedElement && selectedElement.length > 0) {
      for (let j = 0; j < selectedElement.length; j++) {
        if (selectedElement[j].checked) {
          selectedOptionValue = selectedElement[j].value;
          break;
        }
      }
    }
    
    const correctAnswerIndex = answers[questionIndex];
    const correctAnswerText = options[questionIndex][correctAnswerIndex];
    let isCorrect = false;
    
    if (selectedOptionValue !== "" && parseInt(selectedOptionValue) === correctAnswerIndex) {
      score++;
      isCorrect = true;
    }

    const statusClass = isCorrect ? 'correct' : 'incorrect';
    let statusText = isCorrect ? '✅ Correct' : '❌ Incorrect';
    let userSelectedText = 'Unanswered';
    
    if (selectedOptionValue !== "") {
      userSelectedText = options[questionIndex][parseInt(selectedOptionValue)];
    }
    
    if (selectedOptionValue === "") {
      statusText = '⚠️ Unanswered';
    } else if (!isCorrect) {
      statusText += ` (You selected: ${userSelectedText})`;
    }


    resultHTML += `
      <li>
        <span style="font-weight: bold;">Question ${i} Result:</span> <span class="${statusClass}">${statusText}</span><br>
        <strong>Correct Answer:</strong> <span class="correct">${correctAnswerText.toUpperCase()}</span>
        <div class="explanation">
          ${explanations[questionIndex]}
        </div>
      </li>
    `;
  }

  resultHTML += '</ol>';
  
  const finalScore = (score / totalQuestions) * 100;

  let scoreSummary = '';
  if (finalScore >= 80) {
    scoreSummary = `<span style="color: green;">Excellent performance!</span>`;
  } else if (finalScore >= 60) {
    scoreSummary = `<span style="color: orange;">Good performance!</span>`;
  } else {
    scoreSummary = `<span style="color: red;">Needs improvement.</span>`;
  }
  
  resultHTML = `<p style="font-size: 24px;">${scoreSummary} Total Score: **${score} / ${totalQuestions}** (${finalScore.toFixed(0)}%)</p><hr>` + resultHTML;


  resultDiv.innerHTML = resultHTML;
  resultDiv.style.display = 'block';
  resultDiv.style.borderColor = finalScore >= 80 ? '#2ECC71' : '#E74C3C';
  
  // Scroll to the result section
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}
